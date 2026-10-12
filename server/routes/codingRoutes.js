import express from 'express';
import { CodingSubmission } from '../models/CodingSubmission.js';
import { UserProgress } from '../models/UserProgress.js';
import { BackendCodeExecutionService } from '../services/codeExecutionService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Run Code in isolated environment (playground runner)
router.post('/run', async (req, res) => {
  try {
    const { questionId, code, language, isSubmission } = req.body;
    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required.' });
    }

    const result = await BackendCodeExecutionService.execute(
      questionId,
      code,
      language,
      isSubmission
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Submission (Requires Authentication, strictly binds to req.user.id)
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const {
      questionId,
      questionTitle,
      difficulty,
      topic,
      language,
      code,
      status,
      runtimeMs,
      memoryKb,
      testCasesPassed,
      totalTestCases
    } = req.body;

    if (!questionId || !questionTitle || !code || !language) {
      return res.status(400).json({ error: 'Missing required submission fields.' });
    }

    const submission = new CodingSubmission({
      userId: req.user.id, // Derived strictly from verified auth token
      questionId,
      questionTitle,
      difficulty: difficulty || 'Medium',
      topic: topic || 'General',
      language,
      code,
      status: status || 'Accepted',
      runtimeMs: runtimeMs || 0,
      memoryKb: memoryKb || 0,
      testCasesPassed: testCasesPassed || 0,
      totalTestCases: totalTestCases || 0
    });

    await submission.save();

    // If accepted, record in user's solved questions list
    if (status === 'Accepted') {
      await UserProgress.findOneAndUpdate(
        { userId: req.user.id },
        { $addToSet: { solvedCodingQuestions: questionId } },
        { upsert: true }
      );
    }

    res.status(201).json({
      message: 'Submission recorded successfully',
      submission: {
        id: submission._id.toString(),
        userId: submission.userId,
        questionId: submission.questionId,
        questionTitle: submission.questionTitle,
        difficulty: submission.difficulty,
        topic: submission.topic,
        language: submission.language,
        code: submission.code,
        status: submission.status,
        runtimeMs: submission.runtimeMs,
        memoryKb: submission.memoryKb,
        testCasesPassed: submission.testCasesPassed,
        totalTestCases: submission.totalTestCases,
        timestamp: submission.createdAt
      }
    });
  } catch (err) {
    console.error('Submission save error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get user's submissions (STRICT USER ISOLATION)
router.get('/submissions', authMiddleware, async (req, res) => {
  try {
    const { questionId } = req.query;
    // Always enforce userId: req.user.id!
    const filter = { userId: req.user.id };
    if (questionId) {
      filter.questionId = questionId;
    }

    const submissions = await CodingSubmission.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    const formatted = submissions.map(s => ({
      id: s._id.toString(),
      userId: s.userId,
      questionId: s.questionId,
      questionTitle: s.questionTitle,
      difficulty: s.difficulty,
      topic: s.topic,
      language: s.language,
      code: s.code,
      status: s.status,
      runtimeMs: s.runtimeMs,
      memoryKb: s.memoryKb,
      testCasesPassed: s.testCasesPassed,
      totalTestCases: s.totalTestCases,
      timestamp: s.createdAt
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single submission by ID with ownership verification
router.get('/submissions/:id', authMiddleware, async (req, res) => {
  try {
    const submission = await CodingSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Ownership check
    if (submission.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied: You do not own this submission.' });
    }

    res.json({
      id: submission._id.toString(),
      userId: submission.userId,
      questionId: submission.questionId,
      questionTitle: submission.questionTitle,
      difficulty: submission.difficulty,
      topic: submission.topic,
      language: submission.language,
      code: submission.code,
      status: submission.status,
      runtimeMs: submission.runtimeMs,
      memoryKb: submission.memoryKb,
      testCasesPassed: submission.testCasesPassed,
      totalTestCases: submission.totalTestCases,
      timestamp: submission.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete submission with ownership verification
router.delete('/submissions/:id', authMiddleware, async (req, res) => {
  try {
    const submission = await CodingSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Ownership check
    if (submission.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied: You cannot delete another user\'s submission.' });
    }

    await CodingSubmission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
