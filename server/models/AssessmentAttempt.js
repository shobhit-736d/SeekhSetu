import mongoose from 'mongoose';

const assessmentAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },
  trackSlug: {
    type: String,
    required: true,
    index: true
  },
  subject: {
    type: String,
    default: 'General'
  },
  assessmentTitle: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ['practice', 'timed-assessment'],
    default: 'timed-assessment',
    index: true
  },
  difficulty: {
    type: String,
    default: 'All Levels'
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  passed: {
    type: Boolean,
    default: false
  },
  timeSpentSeconds: {
    type: Number,
    default: 0
  },
  topicBreakdown: {
    type: Map,
    of: new mongoose.Schema({
      total: Number,
      correct: Number,
      percent: Number
    }, { _id: false }),
    default: {}
  },
  answers: [{
    questionId: {
      type: String,
      required: true
    },
    selectedAnswers: [{
      type: Number
    }],
    isCorrect: {
      type: Boolean,
      required: true
    },
    timeSpentSeconds: {
      type: Number,
      default: 0
    }
  }],
  incorrectQuestionIds: [{
    type: String
  }],
  recommendations: [{
    type: String
  }]
}, {
  timestamps: true
});

assessmentAttemptSchema.index({ userId: 1, createdAt: -1 });
assessmentAttemptSchema.index({ trackSlug: 1, createdAt: -1 });

export const AssessmentAttempt = mongoose.model('AssessmentAttempt', assessmentAttemptSchema);
