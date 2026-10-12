import express from 'express';
import { CommunicationSession } from '../models/CommunicationSession.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Record communication practice session (elevator pitch, STAR method, HR answers)
router.post('/sessions', authMiddleware, async (req, res) => {
  try {
    const { module, title, promptOrQuestion, userResponse, feedback, score, durationSeconds } = req.body;

    if (!module || !title || !userResponse) {
      return res.status(400).json({ error: 'Module, title, and response are required.' });
    }

    const session = new CommunicationSession({
      userId: req.user.id, // Strictly derived from JWT
      module,
      title,
      promptOrQuestion: promptOrQuestion || '',
      userResponse,
      feedback: feedback || '',
      score: score || 0,
      durationSeconds: durationSeconds || 0
    });

    await session.save();

    res.status(201).json({
      message: 'Communication practice session saved',
      session: {
        id: session._id.toString(),
        userId: session.userId,
        module: session.module,
        title: session.title,
        promptOrQuestion: session.promptOrQuestion,
        userResponse: session.userResponse,
        feedback: session.feedback,
        score: session.score,
        durationSeconds: session.durationSeconds,
        timestamp: session.createdAt
      }
    });
  } catch (err) {
    console.error('Communication session save error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get user's communication practice sessions (STRICT ISOLATION)
router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await CommunicationSession.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(sessions.map(s => ({
      id: s._id.toString(),
      userId: s.userId,
      module: s.module,
      title: s.title,
      promptOrQuestion: s.promptOrQuestion,
      userResponse: s.userResponse,
      feedback: s.feedback,
      score: s.score,
      durationSeconds: s.durationSeconds,
      timestamp: s.createdAt
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a session with ownership verification
router.delete('/sessions/:id', authMiddleware, async (req, res) => {
  try {
    const session = await CommunicationSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Session record not found' });
    }

    if (session.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied: You cannot delete another user\'s session.' });
    }

    await CommunicationSession.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
