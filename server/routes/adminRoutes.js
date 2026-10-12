import express from 'express';
import { User } from '../models/User.js';
import { CodingSubmission } from '../models/CodingSubmission.js';
import { AptitudeAttempt } from '../models/AptitudeAttempt.js';
import { ResumeDoc } from '../models/ResumeDoc.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Apply auth and admin middleware to all admin endpoints
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/stats - System-wide aggregates
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalSubmissions, totalAttempts, totalResumes] = await Promise.all([
      User.countDocuments(),
      CodingSubmission.countDocuments(),
      AptitudeAttempt.countDocuments(),
      ResumeDoc.countDocuments()
    ]);

    res.json({
      totalUsers,
      totalSubmissions,
      totalAttempts,
      totalResumes,
      serverTime: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/users - List users with aggregate activity
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-passwordHash -resetPasswordToken -resetPasswordExpires')
      .sort({ createdAt: -1 });

    const userSummaries = await Promise.all(
      users.map(async (u) => {
        const [submissionsCount, attemptsCount, resumesCount] = await Promise.all([
          CodingSubmission.countDocuments({ userId: u._id }),
          AptitudeAttempt.countDocuments({ userId: u._id }),
          ResumeDoc.countDocuments({ userId: u._id })
        ]);

        return {
          id: u._id.toString(),
          name: u.name,
          email: u.email,
          role: u.role,
          streakDays: u.streakDays,
          lastActiveDate: u.lastActiveDate,
          createdAt: u.createdAt,
          metrics: {
            submissionsCount,
            attemptsCount,
            resumesCount
          }
        };
      })
    );

    res.json(userSummaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/users/:id/role - Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be either student or admin.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.role = role;
    await user.save();

    res.json({
      message: `User role successfully updated to ${role}`,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
