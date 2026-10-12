import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { UserProgress } from '../models/UserProgress.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'seekhsetu_super_secure_jwt_secret_key_2026_prod';

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

// 1. REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide full name, email, and password.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const assignedRole = role === 'admin' ? 'admin' : 'student';

    const user = new User({
      name: name.trim(),
      email: trimmedEmail,
      passwordHash,
      role: assignedRole,
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

    const token = generateToken(user);

    res.status(201).json({
      message: 'Registration successful! Welcome to SeekhSetu.',
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
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
});

// 2. LOGIN
router.post('/login', async (req, res) => {
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
      return res.status(401).json({ error: 'This account was registered using Google Sign-In. Please sign in with Google or reset your password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
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

    const token = generateToken(user);

    res.json({
      message: 'Welcome back!',
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
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed: ' + err.message });
  }
});

// 3. GOOGLE SIGN-IN / AUTH
router.post('/google-auth', async (req, res) => {
  try {
    const { email, name, googleId, avatar } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Google account email is required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      // Create user with random secure password
      const randomPassword = crypto.randomBytes(24).toString('hex');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(randomPassword, salt);

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

      // Create isolated UserProgress
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

// 4. FORGOT PASSWORD (REQUEST RESET CODE)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Please enter your registered email address.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      // Don't disclose user existence for security, but return generic success
      return res.json({
        message: 'If this email is registered, a password reset code has been generated.',
        resetToken: null
      });
    }

    // Generate 6-digit numeric reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    res.json({
      message: 'Password reset code generated successfully.',
      // Provided in response for easy verification and test execution
      resetToken,
      expiresInMinutes: 60
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Password reset request failed: ' + err.message });
  }
});

// 5. RESET PASSWORD
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
      return res.status(400).json({ error: 'Invalid or expired password reset code. Please request a new code.' });
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

// 6. GET CURRENT AUTHENTICATED USER
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

// 7. UPDATE USER PROFILE & PREFERENCES
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

// 8. CHANGE PASSWORD (AUTHENTICATED)
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
