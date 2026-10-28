// server/routes/interviewRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import { InterviewQuestion } from '../models/InterviewQuestion.js';
import { MockInterviewAttempt } from '../models/MockInterviewAttempt.js';
import { interviewQuestionsSeed, mockInterviewPresets } from '../data/interviewsSeed.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/interviews/presets - List mock interview role configurations
router.get('/presets', (req, res) => {
  const presetsWithRubric = mockInterviewPresets.map(p => ({
    ...p,
    rubricDimensions: p.rubricDimensions || ['correctness', 'clarity', 'problemSolving', 'communication']
  }));
  res.json(presetsWithRubric);
});

// GET /api/interviews/questions - Filterable interview question bank
router.get('/questions', async (req, res) => {
  try {
    const {
      trackSlug,
      category,
      difficulty,
      topic,
      search,
      role,
      limit = 50,
      skip = 0
    } = req.query;

    const query = {};
    if (trackSlug && trackSlug !== 'all') {
      query.trackSlug = trackSlug;
    }
    if (category && category !== 'all') {
      query.category = category;
    }
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    if (topic && topic !== 'all') {
      query.topic = topic;
    }
    if (role && role !== 'all') {
      query.jobRoles = { $regex: role, $options: 'i' };
    }
    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { title: { $regex: term, $options: 'i' } },
        { question: { $regex: term, $options: 'i' } },
        { topic: { $regex: term, $options: 'i' } },
        { comprehensiveAnswer: { $regex: term, $options: 'i' } }
      ];
    }

    let questions = [];
    try {
      questions = await InterviewQuestion.find(query)
        .sort({ difficulty: 1, createdAt: -1 })
        .skip(parseInt(skip, 10) || 0)
        .limit(parseInt(limit, 10) || 50);
    } catch {
      // fallback
    }

    // In-memory fallback if database query returned empty
    if (!questions || questions.length === 0) {
      questions = interviewQuestionsSeed.filter(q => {
        if (query.trackSlug && q.trackSlug !== query.trackSlug) return false;
        if (query.category && q.category !== query.category) return false;
        if (query.difficulty && q.difficulty !== query.difficulty) return false;
        if (search && search.trim()) {
          const s = search.toLowerCase();
          const match =
            q.title.toLowerCase().includes(s) ||
            q.question.toLowerCase().includes(s) ||
            q.topic.toLowerCase().includes(s) ||
            (q.comprehensiveAnswer && q.comprehensiveAnswer.toLowerCase().includes(s)) ||
            (Array.isArray(q.tags) && q.tags.some(t => t.toLowerCase().includes(s)));
          if (!match) return false;
        }
        return true;
      }).slice(parseInt(skip, 10) || 0, (parseInt(skip, 10) || 0) + (parseInt(limit, 10) || 50));
    }

    res.json(questions);
  } catch (err) {
    console.error('Error fetching interview questions:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/interviews/questions/:id - Single question details
router.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orConditions = [{ id }, { slug: id }];
    if (mongoose.Types.ObjectId.isValid(id)) {
      orConditions.push({ _id: id });
    }
    let question = await InterviewQuestion.findOne({ $or: orConditions });
    if (!question) {
      question = interviewQuestionsSeed.find(q => q.id === id || q.slug === id || (q._id && q._id.toString() === id));
    }
    if (!question) {
      return res.status(404).json({ error: 'Interview question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/interviews/mock/evaluate - Structured Rubric Evaluation
router.post('/mock/evaluate', async (req, res) => {
  try {
    const { answers = [], trackSlug = 'fullstack-web', targetRole = 'Software Engineer' } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Answers payload must be a non-empty array.' });
    }

    // Build question map
    const questionIds = answers.map(a => a.questionId);
    let dbQuestions = [];
    try {
      dbQuestions = await InterviewQuestion.find({ id: { $in: questionIds } });
    } catch {
      // fallback
    }

    const questionMap = new Map();
    interviewQuestionsSeed.forEach(q => questionMap.set(q.id, q));
    dbQuestions.forEach(q => questionMap.set(q.id, q));

    const questionEvaluations = [];
    let totalScore = 0;
    let totalCorrectness = 0;
    let totalClarity = 0;
    let totalProblemSolving = 0;
    let totalCommunication = 0;

    const allKeyStrengths = new Set();
    const allAreasForImprovement = new Set();

    answers.forEach(ans => {
      const q = questionMap.get(ans.questionId) || {
        question: ans.questionText || 'Technical Question',
        comprehensiveAnswer: 'Thorough, structured explanation with technical precision.',
        keyPointsToMention: ['Core principles', 'Practical application', 'Edge cases']
      };

      const userText = (ans.userAnswer || '').trim();
      const wordCount = userText.split(/\s+/).filter(Boolean).length;

      // Rubric Scoring Logic
      let correctnessScore = 40;
      let clarityScore = 40;
      let problemSolvingScore = 40;
      let communicationScore = 40;

      const strengths = [];
      const improvements = [];

      if (wordCount < 10) {
        correctnessScore = 20;
        clarityScore = 30;
        problemSolvingScore = 20;
        communicationScore = 30;
        improvements.push('Answer was extremely brief. Elaborate with specific technical mechanics and frameworks.');
      } else {
        // Evaluate key concepts coverage
        const userTextLower = userText.toLowerCase();
        let matchedPoints = 0;
        if (Array.isArray(q.keyPointsToMention)) {
          q.keyPointsToMention.forEach(kp => {
            const keywords = kp.toLowerCase().split(' ').filter(w => w.length > 4);
            const matches = keywords.some(kw => userTextLower.includes(kw));
            if (matches) matchedPoints++;
          });
        }

        const pointRatio = q.keyPointsToMention && q.keyPointsToMention.length > 0
          ? matchedPoints / q.keyPointsToMention.length
          : 0.5;

        correctnessScore = Math.min(100, Math.round(50 + (pointRatio * 45)));
        clarityScore = Math.min(100, Math.round(55 + (Math.min(wordCount, 150) / 150) * 35));
        problemSolvingScore = Math.min(100, Math.round(50 + (pointRatio * 40)));
        communicationScore = Math.min(100, Math.round(60 + (wordCount >= 40 ? 30 : 15)));

        if (pointRatio >= 0.5) {
          strengths.push('Demonstrated solid grasp of core technical principles.');
          allKeyStrengths.add('High conceptual clarity and direct terminology');
        } else {
          improvements.push('Incorporate more domain-specific technical terminology.');
          allAreasForImprovement.add('Deepen depth by discussing tradeoffs and edge cases');
        }

        if (wordCount >= 60 && wordCount <= 250) {
          strengths.push('Concise pacing suitable for a 2-minute interview response.');
          allKeyStrengths.add('Well-paced delivery without rambling');
        } else if (wordCount > 300) {
          improvements.push('Response is slightly lengthy. Aim for high density in under 120 seconds.');
          allAreasForImprovement.add('Structure answers crisply: Concept -> Mechanism -> Tradeoff');
        }
      }

      const qOverall = Math.round(
        (correctnessScore * 0.35) +
        (problemSolvingScore * 0.25) +
        (clarityScore * 0.2) +
        (communicationScore * 0.2)
      );

      totalScore += qOverall;
      totalCorrectness += correctnessScore;
      totalClarity += clarityScore;
      totalProblemSolving += problemSolvingScore;
      totalCommunication += communicationScore;

      questionEvaluations.push({
        questionId: ans.questionId,
        questionText: q.question,
        score: qOverall,
        modelAnswer: q.comprehensiveAnswer,
        userAnswer: userText,
        strengths,
        improvements,
        feedback: qOverall >= 70
          ? 'Strong technical explanation with clear structure.'
          : 'Acceptable attempt, but review the model answer to deepen architectural precision.'
      });
    });

    const count = answers.length;
    const overallScore = Math.round(totalScore / count);
    const passed = overallScore >= 70;

    const rubricScores = {
      correctness: Math.round(totalCorrectness / count),
      clarity: Math.round(totalClarity / count),
      problemSolving: Math.round(totalProblemSolving / count),
      communication: Math.round(totalCommunication / count)
    };

    if (allKeyStrengths.size === 0) {
      allKeyStrengths.add('Attempted questions with professional tone');
    }
    if (allAreasForImprovement.size === 0) {
      allAreasForImprovement.add('Practice articulating real-world production tradeoffs');
    }

    const evaluation = {
      overallScore,
      passed,
      rubricScores,
      keyStrengths: Array.from(allKeyStrengths),
      strengths: Array.from(allKeyStrengths),
      areasForImprovement: Array.from(allAreasForImprovement),
      recommendations: Array.from(allAreasForImprovement),
      questionEvaluations,
      disclaimer: 'Note: Automated evaluations provide structured heuristic feedback based on technical keywords and communication length to assist interview practice. They are not definitive hiring judgments.'
    };

    res.json(evaluation);
  } catch (err) {
    console.error('Error evaluating mock interview:', err);
    res.status(500).json({ error: 'Evaluation failed: ' + err.message });
  }
});

// POST /api/interviews/mock/submit - Save Mock Interview Session (Protected)
router.post('/mock/submit', authMiddleware, async (req, res) => {
  try {
    const {
      trackSlug = 'fullstack-web',
      targetRole = 'Software Engineer',
      difficulty = 'Medium',
      durationMinutes = 20,
      timeSpentSeconds = 0,
      overallScore = 0,
      passed = false,
      rubricScores = {},
      keyStrengths = [],
      areasForImprovement = [],
      answers = [],
      evaluation = {}
    } = req.body;

    let recordId = 'local-mock-' + Date.now();

    if (req.user && req.user.id) {
      try {
        const record = new MockInterviewAttempt({
          userId: req.user.id,
          trackSlug,
          targetRole,
          difficulty,
          durationMinutes,
          timeSpentSeconds,
          overallScore,
          passed,
          rubricScores,
          keyStrengths,
          areasForImprovement,
          answers,
          evaluation
        });

        await record.save();
        recordId = record._id.toString();
      } catch (saveErr) {
        console.error('Failed to save mock interview to DB:', saveErr.message);
      }
    }

    res.json({
      success: true,
      recordId,
      overallScore,
      passed,
      message: 'Mock interview session recorded successfully.'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/interviews/mock/history - User Mock Interview History
router.get('/mock/history', authMiddleware, async (req, res) => {
  try {
    const attempts = await MockInterviewAttempt.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/interviews/stats - Track & category question totals
router.get('/stats', async (req, res) => {
  try {
    let totalQuestions = 0;
    const byTrack = {};
    try {
      totalQuestions = await InterviewQuestion.countDocuments();
      const trackCounts = await InterviewQuestion.aggregate([
        { $group: { _id: '$trackSlug', count: { $sum: 1 } } }
      ]);
      trackCounts.forEach(t => {
        byTrack[t._id] = t.count;
      });
    } catch {
      // fallback
    }

    if (totalQuestions === 0) {
      totalQuestions = interviewQuestionsSeed.length;
    }

    if (Object.keys(byTrack).length === 0) {
      interviewQuestionsSeed.forEach(q => {
        byTrack[q.trackSlug] = (byTrack[q.trackSlug] || 0) + 1;
      });
    }

    res.json({
      totalQuestions,
      byTrack,
      presetsCount: mockInterviewPresets.length,
      tracksCovered: 18,
      categories: [
        'technical-core',
        'system-design',
        'scenario-troubleshooting',
        'live-coding-concept',
        'behavioral-star',
        'hr-culture-fit'
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
