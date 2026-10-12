import express from 'express';
import { UserProgress } from '../models/UserProgress.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Helper to format Map to object
const mapToObject = (map) => {
  if (!map) return {};
  if (map instanceof Map) {
    const obj = {};
    for (const [k, v] of map.entries()) {
      obj[k] = v;
    }
    return obj;
  }
  return map;
};

// GET current authenticated user's progress
router.get('/', authMiddleware, async (req, res) => {
  try {
    let progress = await UserProgress.findOne({ userId: req.user.id });

    if (!progress) {
      progress = await UserProgress.create({
        userId: req.user.id,
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

    res.json({
      userId: progress.userId,
      completedTopics: mapToObject(progress.completedTopics),
      completedDays: mapToObject(progress.completedDays),
      starredDays: progress.starredDays || [1, 7],
      bookmarkedConcepts: progress.bookmarkedConcepts || [],
      notes: mapToObject(progress.notes),
      revisionTasks: progress.revisionTasks || [],
      studySessions: progress.studySessions || [],
      quizAttempts: progress.quizAttempts || [],
      incorrectQuestions: progress.incorrectQuestions || [],
      flashcardMastery: mapToObject(progress.flashcardMastery),
      solvedCodingQuestions: progress.solvedCodingQuestions || [],
      bookmarkedCodingQuestions: progress.bookmarkedCodingQuestions || [],
      lastActiveDay: progress.lastActiveDay || 1,
      lastActiveTopicId: progress.lastActiveTopicId || 'day1-topic1'
    });
  } catch (err) {
    console.error('Error fetching user progress:', err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE current authenticated user's progress
router.put('/', authMiddleware, async (req, res) => {
  try {
    const {
      completedTopics,
      completedDays,
      starredDays,
      bookmarkedConcepts,
      notes,
      revisionTasks,
      studySessions,
      quizAttempts,
      incorrectQuestions,
      flashcardMastery,
      solvedCodingQuestions,
      bookmarkedCodingQuestions,
      lastActiveDay,
      lastActiveTopicId
    } = req.body;

    let progress = await UserProgress.findOne({ userId: req.user.id });

    if (!progress) {
      progress = new UserProgress({ userId: req.user.id });
    }

    if (completedTopics !== undefined) {
      progress.completedTopics = new Map(Object.entries(completedTopics));
    }
    if (completedDays !== undefined) {
      progress.completedDays = new Map(Object.entries(completedDays));
    }
    if (starredDays !== undefined) {
      progress.starredDays = starredDays;
    }
    if (bookmarkedConcepts !== undefined) {
      progress.bookmarkedConcepts = bookmarkedConcepts;
    }
    if (notes !== undefined) {
      progress.notes = new Map(Object.entries(notes));
    }
    if (revisionTasks !== undefined) {
      progress.revisionTasks = revisionTasks;
    }
    if (studySessions !== undefined) {
      progress.studySessions = studySessions;
    }
    if (quizAttempts !== undefined) {
      progress.quizAttempts = quizAttempts;
    }
    if (incorrectQuestions !== undefined) {
      progress.incorrectQuestions = incorrectQuestions;
    }
    if (flashcardMastery !== undefined) {
      progress.flashcardMastery = new Map(Object.entries(flashcardMastery));
    }
    if (solvedCodingQuestions !== undefined) {
      progress.solvedCodingQuestions = solvedCodingQuestions;
    }
    if (bookmarkedCodingQuestions !== undefined) {
      progress.bookmarkedCodingQuestions = bookmarkedCodingQuestions;
    }
    if (lastActiveDay !== undefined) {
      progress.lastActiveDay = lastActiveDay;
    }
    if (lastActiveTopicId !== undefined) {
      progress.lastActiveTopicId = lastActiveTopicId;
    }

    await progress.save();

    res.json({ message: 'User progress synced successfully' });
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: err.message });
  }
});

// RESET progress for current user
router.post('/reset', authMiddleware, async (req, res) => {
  try {
    await UserProgress.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
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
          bookmarkedCodingQuestions: [],
          lastActiveDay: 1,
          lastActiveTopicId: 'day1-topic1'
        }
      },
      { upsert: true }
    );

    res.json({ message: 'User progress reset successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EXPORT user data
router.get('/export', authMiddleware, async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ userId: req.user.id });
    res.json({
      exportDate: new Date().toISOString(),
      user: { id: req.user.id, email: req.user.email },
      progress: progress || {}
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
