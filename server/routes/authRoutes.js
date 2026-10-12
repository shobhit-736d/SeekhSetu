import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { UserProgress } from '../models/UserProgress.js';
import { EmailVerification } from '../models/EmailVerification.js';
import { sendVerificationEmail } from '../services/emailService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'seekhsetu_super_secure_jwt_secret_key_2026_prod';
const CODE_EXPIRY_MINUTES = 10;

// Helper to sign user JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ==========================================
// 1. REGISTER - REQUEST VERIFICATION CODE
// ==========================================
router.post('/register-request', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide full name, email, and password.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please log in.' });
    }

    // Generate secure 6-digit numeric OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 10-minute expiration
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

    // Save pending verification (role is strictly student)
    await EmailVerification.deleteMany({ email: trimmedEmail, type: 'register' });
    await EmailVerification.create({
      email: trimmedEmail,
      code,
      type: 'register',
      registrationData: {
        name: name.trim(),
        passwordHash
      },
      expiresAt
    });

    // Send code asynchronously right away so user gets immediate response in <50ms
    sendVerificationEmail(trimmedEmail, code, 'register').catch(err => {
      console.error('Async verification email sending failed:', err.message);
    });

    res.json({
      message: `A 6-digit verification code has been sent to ${trimmedEmail}. Valid for ${CODE_EXPIRY_MINUTES} minutes.`,
      email: trimmedEmail,
      expiresInMinutes: CODE_EXPIRY_MINUTES
    });
  } catch (err) {
    console.error('Register request error:', err);
    res.status(500).json({ error: 'Failed to send registration verification code: ' + err.message });
  }
});

// ==========================================
// 2. VERIFY REGISTER - VERIFY CODE & CREATE ACCOUNT
// ==========================================
router.post('/verify-register', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and verification code are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCode = code.toString().trim();

    const verification = await EmailVerification.findOne({
      email: trimmedEmail,
      type: 'register'
    });

    if (!verification) {
      return res.status(400).json({
        error: 'No pending registration found for this email. Please request a verification code first.'
      });
    }

    // Check 10-minute expiry
    if (verification.expiresAt < new Date()) {
      await EmailVerification.deleteOne({ _id: verification._id });
      return res.status(400).json({
        error: 'Verification code has expired (10-minute validity exceeded). Please request a new code.'
      });
    }

    // Check code match
    if (verification.code !== trimmedCode) {
      verification.attempts = (verification.attempts || 0) + 1;
      await verification.save();
      return res.status(400).json({
        error: 'Invalid verification code. Please check your email and enter the correct code.'
      });
    }

    // Double check user doesn't already exist
    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) {
      await EmailVerification.deleteOne({ _id: verification._id });
      return res.status(400).json({ error: 'An account with this email already exists. Please log in.' });
    }

    // Strictly enforce role as 'student' - no admin creation allowed
    const user = new User({
      name: verification.registrationData.name,
      email: trimmedEmail,
      passwordHash: verification.registrationData.passwordHash,
      role: 'student',
      streakDays: 1,
      lastActiveDate: new Date()
    });

    await user.save();

    // Create fresh isolated UserProgress for this user
    await UserProgress.create({
      userId: user._id,
      completedTopics: new Map(),
      completedDays: new Map(),
      starredDays: [1, 7],
      bookmarkedConcepts: [],
      notes: new Map(),
      revisionTasks: [],
      studySessions: [],
      quizAttempts: [],
      incorrectQuestions: [],
      flashcardMastery: new Map(),
      solvedCodingQuestions: [],
      bookmarkedCodingQuestions: []
    });

    // Delete used verification record
    await EmailVerification.deleteOne({ _id: verification._id });

    const token = generateToken(user);

    res.status(201).json({
      message: 'Account successfully verified and created! Welcome to SeekhSetu.',
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        streakDays: user.streakDays,
        preferences: user.preferences
      }
    });
  } catch (err) {
    console.error('Verify register error:', err);
    res.status(500).json({ error: 'Verification failed: ' + err.message });
  }
});

// ==========================================
// 3. LOGIN - REQUEST VERIFICATION CODE
// ==========================================
router.post('/login-request', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter both email and password.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (!user.passwordHash) {
      return res.status(401).json({
        error: 'This account was registered using Google Sign-In. Please sign in with Google or reset your password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate secure 6-digit numeric OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

    // Save pending login verification
    await EmailVerification.deleteMany({ email: trimmedEmail, type: 'login' });
    await EmailVerification.create({
      email: trimmedEmail,
      code,
      type: 'login',
      userId: user._id,
      expiresAt
    });

    // Send code asynchronously right away so user gets immediate response in <50ms
    sendVerificationEmail(trimmedEmail, code, 'login').catch(err => {
      console.error('Async login verification email sending failed:', err.message);
    });

    res.json({
      requiresOtp: true,
      message: `A 6-digit verification code has been sent to ${trimmedEmail}. Valid for ${CODE_EXPIRY_MINUTES} minutes.`,
      email: trimmedEmail,
      expiresInMinutes: CODE_EXPIRY_MINUTES
    });
  } catch (err) {
    console.error('Login request error:', err);
    res.status(500).json({ error: 'Login request failed: ' + err.message });
  }
});

// ==========================================
// 4. VERIFY LOGIN - VERIFY CODE & COMPLETE LOGIN
// ==========================================
router.post('/verify-login', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and verification code are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCode = code.toString().trim();

    const verification = await EmailVerification.findOne({
      email: trimmedEmail,
      type: 'login'
    });

    if (!verification) {
      return res.status(400).json({
        error: 'No pending sign-in request found for this email. Please sign in again.'
      });
    }

    // Check 10-minute expiry
    if (verification.expiresAt < new Date()) {
      await EmailVerification.deleteOne({ _id: verification._id });
      return res.status(400).json({
        error: 'Verification code has expired (10-minute limit exceeded). Please sign in to receive a fresh code.'
      });
    }

    // Check code match
    if (verification.code !== trimmedCode) {
      verification.attempts = (verification.attempts || 0) + 1;
      await verification.save();
      return res.status(400).json({
        error: 'Invalid verification code. Please check your email and try again.'
      });
    }

    const user = await User.findById(verification.userId);
    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    // Update streak based on last active date
    const now = new Date();
    const lastActive = new Date(user.lastActiveDate || now);
    const diffHours = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

    if (diffHours >= 20 && diffHours <= 48) {
      user.streakDays = (user.streakDays || 0) + 1;
    } else if (diffHours > 48) {
      user.streakDays = 1;
    }
    user.lastActiveDate = now;
    await user.save();

    // Ensure UserProgress exists
    let progress = await UserProgress.findOne({ userId: user._id });
    if (!progress) {
      await UserProgress.create({
        userId: user._id,
        completedTopics: new Map(),
        completedDays: new Map(),
        starredDays: [1, 7]
      });
    }

    // Delete verification record
    await EmailVerification.deleteOne({ _id: verification._id });

    const token = generateToken(user);

    res.json({
      message: 'Verification successful! Welcome back to SeekhSetu.',
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        streakDays: user.streakDays,
        preferences: user.preferences
      }
    });
  } catch (err) {
    console.error('Verify login error:', err);
    res.status(500).json({ error: 'Sign-in verification failed: ' + err.message });
  }
});

// ==========================================
// 5. RESEND VERIFICATION CODE
// ==========================================
router.post('/resend-code', async (req, res) => {
  try {
    const { email, type = 'register' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const verification = await EmailVerification.findOne({
      email: trimmedEmail,
      type
    });

    if (!verification) {
      return res.status(400).json({
        error: `No pending ${type} request found for ${trimmedEmail}. Please start again.`
      });
    }

    // Generate fresh 6-digit code with fresh 10-minute expiry
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    verification.code = newCode;
    verification.attempts = 0;
    verification.expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);
    await verification.save();

    sendVerificationEmail(trimmedEmail, newCode, type).catch(err => {
      console.error('Async resend email sending failed:', err.message);
    });

    res.json({
      message: `A new 6-digit verification code has been sent to ${trimmedEmail}. Valid for ${CODE_EXPIRY_MINUTES} minutes.`,
      email: trimmedEmail,
      expiresInMinutes: CODE_EXPIRY_MINUTES
    });
  } catch (err) {
    console.error('Resend code error:', err);
    res.status(500).json({ error: 'Failed to resend verification code: ' + err.message });
  }
});

// Legacy direct endpoints for backwards compatibility - triggers OTP verification
router.post('/register', async (req, res) => {
  return res.redirect(307, '/api/auth/register-request');
});

router.post('/login', async (req, res) => {
  return res.redirect(307, '/api/auth/login-request');
});

// ==========================================
// 6. GOOGLE SIGN-IN / AUTH (STUDENT ONLY)
// ==========================================
router.post('/google-auth', async (req, res) => {
  try {
    const { email, name, googleId, avatar } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Google account email is required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      const randomPassword = crypto.randomBytes(24).toString('hex');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(randomPassword, salt);

      // Enforce role strictly as 'student'
      user = new User({
        name: name || trimmedEmail.split('@')[0],
        email: trimmedEmail,
        passwordHash,
        role: 'student',
        googleId: googleId || 'google_' + Date.now(),
        avatar: avatar || '',
        streakDays: 1,
        lastActiveDate: new Date()
      });
      await user.save();

      await UserProgress.create({
        userId: user._id,
        completedTopics: new Map(),
        completedDays: new Map(),
        starredDays: [1, 7]
      });
    } else {
      if (googleId && !user.googleId) {
        user.googleId = googleId;
      }
      if (avatar && !user.avatar) {
        user.avatar = avatar;
      }
      user.lastActiveDate = new Date();
      await user.save();
    }

    const token = generateToken(user);

    res.json({
      message: 'Google authentication successful!',
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        streakDays: user.streakDays,
        preferences: user.preferences
      }
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ error: 'Google authentication failed: ' + err.message });
  }
});

// ==========================================
// 7. FORGOT PASSWORD (10-MINUTE EXPIRY)
// ==========================================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Please enter your registered email address.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      return res.json({
        message: 'If this email is registered, a password reset code has been sent.',
        resetToken: null
      });
    }

    // Generate 6-digit numeric reset token with 10-minute expiry
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000); // 10 minutes
    await user.save();

    sendVerificationEmail(trimmedEmail, resetToken, 'reset').catch(err => {
      console.error('Async reset email sending failed:', err.message);
    });

    res.json({
      message: `Password reset code sent to ${trimmedEmail}. Valid for ${CODE_EXPIRY_MINUTES} minutes.`,
      resetToken,
      expiresInMinutes: CODE_EXPIRY_MINUTES
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Password reset request failed: ' + err.message });
  }
});

// ==========================================
// 8. RESET PASSWORD
// ==========================================
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Reset code and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const user = await User.findOne({
      resetPasswordToken: token.trim(),
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired password reset code (10-minute limit exceeded). Please request a new code.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: 'Password reset successful! You can now log in with your new password.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Password reset failed: ' + err.message });
  }
});

// ==========================================
// 9. GET CURRENT AUTHENTICATED USER
// ==========================================
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash -resetPasswordToken -resetPasswordExpires');
    if (!user) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      streakDays: user.streakDays,
      preferences: user.preferences,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 10. UPDATE USER PROFILE & PREFERENCES
// ==========================================
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, avatar, theme, dailyGoalMinutes } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (name) user.name = name.trim();
    if (avatar !== undefined) user.avatar = avatar;
    if (theme) user.preferences.theme = theme;
    if (dailyGoalMinutes) user.preferences.dailyGoalMinutes = dailyGoalMinutes;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        streakDays: user.streakDays,
        preferences: user.preferences
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 11. CHANGE PASSWORD (AUTHENTICATED)
// ==========================================
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both current and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
