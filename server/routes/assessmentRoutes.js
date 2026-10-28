import express from 'express';
import { AssessmentQuestion } from '../models/AssessmentQuestion.js';
import { AssessmentAttempt } from '../models/AssessmentAttempt.js';
import { assessmentQuestionsBank, assessmentPresetsList } from '../data/assessmentsSeed.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/assessments/presets - Return curated presets
router.get('/presets', (req, res) => {
  res.json(assessmentPresetsList);
});

// GET /api/assessments/questions - Query question bank
// SECURITY: Strips correctAnswers and explanation if mode=timed-assessment
router.get('/questions', async (req, res) => {
  try {
    const { track, subject, difficulty, type, mode = 'timed-assessment', limit = 20, search } = req.query;
    const query = {};

    if (track && track !== 'all') {
      query.trackSlug = track.toLowerCase();
    }
    if (subject && subject !== 'all') {
      query.subject = subject;
    }
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    if (type && type !== 'all') {
      query.questionType = type;
    }
    if (search && typeof search === 'string' && search.trim()) {
      const s = search.trim();
      query.$or = [
        { question: { $regex: s, $options: 'i' } },
        { topic: { $regex: s, $options: 'i' } },
        { tags: { $regex: s, $options: 'i' } }
      ];
    }

    let questions = [];
    try {
      questions = await AssessmentQuestion.find(query).limit(parseInt(limit, 10) || 20);
    } catch (dbErr) {
      console.warn('MongoDB query failed, using static fallback:', dbErr.message);
    }

    // Fallback to static seed data if DB is empty or waking up
    if (!questions || questions.length === 0) {
      questions = assessmentQuestionsBank.filter(q => {
        if (query.trackSlug && q.trackSlug !== query.trackSlug) return false;
        if (query.difficulty && q.difficulty !== query.difficulty) return false;
        if (query.questionType && q.questionType !== query.questionType) return false;
        return true;
      }).slice(0, parseInt(limit, 10) || 20);
    }

    // SECURITY ENFORCEMENT:
    // If timed-assessment mode, strip correctAnswers and explanation from client payload!
    if (mode === 'timed-assessment') {
      const secureQuestions = questions.map(q => {
        const doc = q.toObject ? q.toObject() : { ...q };
        delete doc.correctAnswers;
        delete doc.explanation;
        delete doc.explanationSource;
        return doc;
      });
      return res.json(secureQuestions);
    }

    res.json(questions);
  } catch (err) {
    console.error('Error fetching assessment questions:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/assessments/submit - Secure Server-Side Scoring & Submission Validation
router.post('/submit', optionalAuthMiddleware, async (req, res) => {
  try {
    const {
      trackSlug,
      assessmentTitle = 'Career Skill Assessment',
      mode = 'timed-assessment',
      difficulty = 'All Levels',
      timeSpentSeconds = 0,
      answers = []
    } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Answers payload must be a non-empty array.' });
    }

    const questionIds = answers.map(a => a.questionId);

    // Retrieve authoritative questions from MongoDB or static seed
    let dbQuestions = [];
    try {
      dbQuestions = await AssessmentQuestion.find({ id: { $in: questionIds } });
    } catch {
      // fallback
    }

    const questionMap = new Map();
    // Seed with static bank
    assessmentQuestionsBank.forEach(q => questionMap.set(q.id, q));
    // Override with DB data if present
    dbQuestions.forEach(q => questionMap.set(q.id, q));

    let score = 0;
    const evaluatedAnswers = [];
    const incorrectQuestionIds = [];
    const topicBreakdown = {};

    answers.forEach(userAns => {
      const q = questionMap.get(userAns.questionId);
      if (!q) {
        evaluatedAnswers.push({
          questionId: userAns.questionId,
          selectedAnswers: userAns.selectedAnswers || [],
          correctAnswers: [],
          isCorrect: false,
          explanation: 'Question information not found.'
        });
        return;
      }

      // Initialize topic in breakdown
      const topic = q.topic || q.subject || 'General';
      if (!topicBreakdown[topic]) {
        topicBreakdown[topic] = { total: 0, correct: 0, percent: 0 };
      }
      topicBreakdown[topic].total += 1;

      const userSelected = (userAns.selectedAnswers || []).slice().sort((a, b) => a - b);
      const actualCorrect = (q.correctAnswers || []).slice().sort((a, b) => a - b);

      let isCorrect = false;
      if (q.questionType === 'multiple-select') {
        // Multi-select requires exact match of all correct answers
        isCorrect = userSelected.length === actualCorrect.length &&
          userSelected.every((val, idx) => val === actualCorrect[idx]);
      } else {
        // Single MCQ or True/False
        isCorrect = userSelected.length > 0 && userSelected[0] === actualCorrect[0];
      }

      if (isCorrect) {
        score += 1;
        topicBreakdown[topic].correct += 1;
      } else {
        incorrectQuestionIds.push(q.id);
      }

      evaluatedAnswers.push({
        questionId: q.id,
        selectedAnswers: userAns.selectedAnswers || [],
        correctAnswers: q.correctAnswers,
        isCorrect,
        explanation: q.explanation,
        hint: q.hint
      });
    });

    const totalQuestions = answers.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const passed = percentage >= 70;

    // Calculate percentages for topic breakdown
    const recommendations = [];
    Object.keys(topicBreakdown).forEach(topic => {
      const stats = topicBreakdown[topic];
      stats.percent = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      if (stats.percent < 70) {
        recommendations.push(`Revise ${topic} concepts and review recommended track roadmaps.`);
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('Outstanding performance! You achieved proficiency across all evaluated topics.');
    }

    let attemptId = 'local-' + Date.now();

    // Persist attempt if user is authenticated
    if (req.user && req.user.id) {
      try {
        const attempt = new AssessmentAttempt({
          userId: req.user.id,
          trackSlug: trackSlug || 'general',
          assessmentTitle,
          mode,
          difficulty,
          totalQuestions,
          score,
          percentage,
          passed,
          timeSpentSeconds,
          topicBreakdown,
          answers: evaluatedAnswers.map(e => ({
            questionId: e.questionId,
            selectedAnswers: e.selectedAnswers,
            isCorrect: e.isCorrect,
            timeSpentSeconds: 0
          })),
          incorrectQuestionIds,
          recommendations
        });

        await attempt.save();
        attemptId = attempt._id.toString();
      } catch (saveErr) {
        console.error('Failed to save assessment attempt to DB:', saveErr.message);
      }
    }

    res.json({
      success: true,
      attemptId,
      score,
      totalQuestions,
      percentage,
      passed,
      timeSpentSeconds,
      topicBreakdown,
      evaluatedAnswers,
      recommendations
    });
  } catch (err) {
    console.error('Error submitting assessment:', err);
    res.status(500).json({ error: 'Scoring evaluation failed: ' + err.message });
  }
});

// GET /api/assessments/history - Authenticated user attempt history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const attempts = await AssessmentAttempt.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/assessments/history/:id - Specific attempt details
router.get('/history/:id', authMiddleware, async (req, res) => {
  try {
    const attempt = await AssessmentAttempt.findOne({ _id: req.params.id, userId: req.user.id });
    if (!attempt) {
      return res.status(404).json({ error: 'Assessment attempt not found.' });
    }
    res.json(attempt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
