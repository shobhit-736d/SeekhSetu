import express from 'express';
import { AptitudeAttempt } from '../models/AptitudeAttempt.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Record Aptitude Attempt (strictly binds to authenticated req.user.id)
router.post('/attempts', authMiddleware, async (req, res) => {
  try {
    const {
      category,
      subtopic,
      totalQuestions,
      score,
      accuracy,
      timeSpentSeconds,
      incorrectQuestionIds
    } = req.body;

    if (!category || !subtopic || totalQuestions === undefined || score === undefined) {
      return res.status(400).json({ error: 'Missing required attempt fields.' });
    }

    const attempt = new AptitudeAttempt({
      userId: req.user.id, // Strictly derived from JWT
      category,
      subtopic,
      totalQuestions,
      score,
      accuracy: accuracy !== undefined ? accuracy : Math.round((score / totalQuestions) * 100),
      timeSpentSeconds: timeSpentSeconds || 0,
      incorrectQuestionIds: Array.isArray(incorrectQuestionIds) ? incorrectQuestionIds : []
    });

    await attempt.save();

    res.status(201).json({
      message: 'Attempt saved successfully',
      attempt: {
        id: attempt._id.toString(),
        userId: attempt.userId,
        category: attempt.category,
        subtopic: attempt.subtopic,
        totalQuestions: attempt.totalQuestions,
        score: attempt.score,
        accuracy: attempt.accuracy,
        timeSpentSeconds: attempt.timeSpentSeconds,
        incorrectQuestionIds: attempt.incorrectQuestionIds,
        timestamp: attempt.createdAt
      }
    });
  } catch (err) {
    console.error('Aptitude attempt save error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get authenticated user attempt history (STRICT USER ISOLATION)
router.get('/attempts', authMiddleware, async (req, res) => {
  try {
    const attempts = await AptitudeAttempt.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    const formatted = attempts.map(a => ({
      id: a._id.toString(),
      userId: a.userId,
      category: a.category,
      subtopic: a.subtopic,
      totalQuestions: a.totalQuestions,
      score: a.score,
      accuracy: a.accuracy,
      timeSpentSeconds: a.timeSpentSeconds,
      incorrectQuestionIds: a.incorrectQuestionIds,
      timestamp: a.createdAt
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single attempt with ownership check
router.get('/attempts/:id', authMiddleware, async (req, res) => {
  try {
    const attempt = await AptitudeAttempt.findById(req.params.id);
    if (!attempt) {
      return res.status(404).json({ error: 'Aptitude attempt not found' });
    }

    if (attempt.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied: You do not own this aptitude attempt record.' });
    }

    res.json({
      id: attempt._id.toString(),
      userId: attempt.userId,
      category: attempt.category,
      subtopic: attempt.subtopic,
      totalQuestions: attempt.totalQuestions,
      score: attempt.score,
      accuracy: attempt.accuracy,
      timeSpentSeconds: attempt.timeSpentSeconds,
      incorrectQuestionIds: attempt.incorrectQuestionIds,
      timestamp: attempt.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete attempt with ownership check
router.delete('/attempts/:id', authMiddleware, async (req, res) => {
  try {
    const attempt = await AptitudeAttempt.findById(req.params.id);
    if (!attempt) {
      return res.status(404).json({ error: 'Aptitude attempt not found' });
    }

    if (attempt.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied: You cannot delete another user\'s test record.' });
    }

    await AptitudeAttempt.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attempt record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
