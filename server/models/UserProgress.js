import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  topicId: { type: String, required: true },
  topicTitle: { type: String, required: true },
  conceptTitle: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const revisionTaskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  topicId: { type: String, required: true },
  dueDate: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
}, { _id: false });

const studySessionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  topicTitle: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  type: { type: String, enum: ['study', 'review', 'practice'], default: 'study' },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
}, { _id: false });

const quizAttemptSchema = new mongoose.Schema({
  id: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  topicTitle: { type: String, required: true },
  quizType: { type: String, default: 'topic' },
  totalQuestions: { type: Number, required: true },
  score: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  timestamp: { type: String, required: true },
  incorrectQuestionIds: [{ type: String }]
}, { _id: false });

const incorrectQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  topicTitle: { type: String, required: true },
  question: { type: String, required: true },
  userAnswer: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  explanation: { type: String, default: '' },
  timestamp: { type: String, required: true }
}, { _id: false });

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  completedTopics: {
    type: Map,
    of: Boolean,
    default: () => new Map()
  },
  completedDays: {
    type: Map,
    of: Boolean,
    default: () => new Map()
  },
  starredDays: [{
    type: Number
  }],
  bookmarkedConcepts: [bookmarkSchema],
  notes: {
    type: Map,
    of: String,
    default: () => new Map()
  },
  revisionTasks: [revisionTaskSchema],
  studySessions: [studySessionSchema],
  quizAttempts: [quizAttemptSchema],
  incorrectQuestions: [incorrectQuestionSchema],
  flashcardMastery: {
    type: Map,
    of: String,
    default: () => new Map()
  },
  solvedCodingQuestions: [{
    type: String
  }],
  bookmarkedCodingQuestions: [{
    type: String
  }],
  lastActiveDay: {
    type: Number,
    default: 1
  },
  lastActiveTopicId: {
    type: String,
    default: 'day1-topic1'
  },
  trackMilestones: {
    type: Map,
    of: [String],
    default: () => new Map()
  }
}, {
  timestamps: true
});

export const UserProgress = mongoose.model('UserProgress', userProgressSchema);
