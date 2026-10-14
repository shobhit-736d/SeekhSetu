import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { UserProgress } from '../models/UserProgress.js';
import { authMiddleware } from '../middleware/auth.js';
import { verifyGoogleIdToken, sanitizeEmail } from '../services/googleAuthService.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'seekhsetu_super_secure_jwt_secret_key_2026_prod';

// Helper to sign user JWT session token
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
// 1. EXCLUSIVE GOOGLE AUTHENTICATION
// Handles both Sign In and Register securely
// ==========================================
router.post('/google-auth', async (req, res) => {
  try {
    const { idToken, confirmLink } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Google ID token (idToken) is required.' });
    }

    // Cryptographically verify Google ID token with signature, issuer, audience, exp, and email_verified
    const googleUser = await verifyGoogleIdToken(idToken);
    const { sub, email, name, picture } = googleUser;

    // STEP 1: Search for existing user by Google sub identifier
    let user = await User.findOne({ googleId: sub });

    if (user) {
      // Returning user authenticated securely via Google sub!
      const now = new Date();
      const lastActive = new Date(user.lastActiveDate || now);
      const diffHours = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

      if (diffHours >= 20 && diffHours <= 48) {
        user.streakDays = (user.streakDays || 0) + 1;
      } else if (diffHours > 48) {
        user.streakDays = 1;
      }
      user.lastActiveDate = now;

      // Update avatar if provided and not set
      if (picture && !user.avatar) {
        user.avatar = picture;
      }
      await user.save();

      // Ensure isolated UserProgress exists for this user
      let progress = await UserProgress.findOne({ userId: user._id });
      if (!progress) {
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
      }

      const token = generateToken(user);

      return res.json({
        message: 'Google authentication successful! Welcome back to SeekhSetu.',
        token,
        isNewUser: false,
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
    }

    // STEP 2: User not found by googleId. Check if user exists with matching email
    const existingByEmail = await User.findOne({ email });

    if (existingByEmail) {
      // Account exists with this email. Handle account linking securely.
      // If it's already linked to a different real Google account sub, prevent account takeover.
      if (existingByEmail.googleId && !existingByEmail.googleId.startsWith('google_') && existingByEmail.googleId !== sub) {
        return res.status(409).json({
          error: 'An account with this email address is already linked to a different Google account. Please sign in with the original Google account.'
        });
      }

      // If user hasn't explicitly confirmed linking yet, prompt for confirmation
      if (confirmLink !== true) {
        return res.status(200).json({
          requiresLinkingConfirmation: true,
          email: existingByEmail.email,
          name: existingByEmail.name,
          message: `An existing SeekhSetu profile was found for ${existingByEmail.email}. Please confirm linking your Google account to retain your learning progress.`
        });
      }

      // User confirmed linking: securely attach the Google sub to the existing account
      existingByEmail.googleId = sub;
      if (picture && !existingByEmail.avatar) {
        existingByEmail.avatar = picture;
      }
      existingByEmail.lastActiveDate = new Date();
      await existingByEmail.save();

      // Ensure progress records exist
      let progress = await UserProgress.findOne({ userId: existingByEmail._id });
      if (!progress) {
        await UserProgress.create({
          userId: existingByEmail._id,
          completedTopics: new Map(),
          completedDays: new Map(),
          starredDays: [1, 7]
        });
      }

      const token = generateToken(existingByEmail);

      return res.json({
        message: 'Account successfully linked with Google! Welcome back to SeekhSetu.',
        token,
        isNewUser: false,
        linked: true,
        user: {
          id: existingByEmail._id.toString(),
          name: existingByEmail.name,
          email: existingByEmail.email,
          role: existingByEmail.role,
          avatar: existingByEmail.avatar,
          streakDays: existingByEmail.streakDays,
          preferences: existingByEmail.preferences
        }
      });
    }

    // STEP 3: Neither googleId nor email exists -> NEW USER REGISTRATION (STUDENT ONLY)
    user = new User({
      name: name.trim() || email.split('@')[0],
      email,
      googleId: sub,
      avatar: picture || '',
      role: 'student',
      streakDays: 1,
      lastActiveDate: new Date()
    });

    await user.save();

    // Create fresh isolated UserProgress for this new user
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

    return res.status(201).json({
      message: 'Account successfully registered with Google! Welcome to SeekhSetu.',
      token,
      isNewUser: true,
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
    console.error('Google auth error:', err.message);
    return res.status(401).json({ error: 'Google authentication failed: ' + err.message });
  }
});

// ==========================================
// 2. RETIRED LEGACY ENDPOINTS (EXCLUSIVELY GOOGLE)
// ==========================================
const retiredAuthHandler = (req, res) => {
  res.status(400).json({
    error: 'Manual passwords, registration forms, and email OTP verification have been retired. SeekhSetu now uses Google Sign-In exclusively for both Sign In and Register.'
  });
};

router.post('/register-request', retiredAuthHandler);
router.post('/verify-register', retiredAuthHandler);
router.post('/login-request', retiredAuthHandler);
router.post('/verify-login', retiredAuthHandler);
router.post('/resend-code', retiredAuthHandler);
router.post('/register', retiredAuthHandler);
router.post('/login', retiredAuthHandler);
router.post('/forgot-password', retiredAuthHandler);
router.post('/reset-password', retiredAuthHandler);

// ==========================================
// 3. GET CURRENT AUTHENTICATED USER
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
// 4. UPDATE USER PROFILE & PREFERENCES
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
// 5. CHANGE PASSWORD (RETIRED FOR GOOGLE SSO)
// ==========================================
router.put('/change-password', authMiddleware, (req, res) => {
  res.status(400).json({
    error: 'SeekhSetu accounts are secured with Google Single Sign-On (Google SSO). Password management is handled directly through your Google Account.'
  });
});

export default router;
