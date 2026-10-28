// server/models/MockInterviewAttempt.js
import mongoose from 'mongoose';

const mockInterviewAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    trackSlug: {
      type: String,
      required: true,
      index: true
    },
    targetRole: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    durationMinutes: {
      type: Number,
      default: 20
    },
    timeSpentSeconds: {
      type: Number,
      default: 0
    },
    overallScore: {
      type: Number,
      required: true
    },
    passed: {
      type: Boolean,
      default: false
    },
    rubricScores: {
      correctness: { type: Number, default: 0 },
      clarity: { type: Number, default: 0 },
      problemSolving: { type: Number, default: 0 },
      communication: { type: Number, default: 0 }
    },
    keyStrengths: {
      type: [String],
      default: []
    },
    areasForImprovement: {
      type: [String],
      default: []
    },
    answers: [
      {
        questionId: String,
        questionText: String,
        category: String,
        userAnswer: String,
        score: Number,
        recordingDurationSeconds: Number
      }
    ],
    evaluation: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

mockInterviewAttemptSchema.index({ userId: 1, createdAt: -1 });

export const MockInterviewAttempt =
  mongoose.models.MockInterviewAttempt ||
  mongoose.model('MockInterviewAttempt', mockInterviewAttemptSchema);
