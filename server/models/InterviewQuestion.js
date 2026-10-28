// server/models/InterviewQuestion.js
import mongoose from 'mongoose';

const interviewQuestionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    slug: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    trackSlug: {
      type: String,
      required: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'technical-core',
        'system-design',
        'scenario-troubleshooting',
        'live-coding-concept',
        'behavioral-star',
        'hr-culture-fit'
      ],
      index: true
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
      index: true
    },
    jobRoles: {
      type: [String],
      default: []
    },
    topic: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    question: {
      type: String,
      required: true,
      trim: true
    },
    intent: {
      type: String,
      required: true,
      trim: true
    },
    comprehensiveAnswer: {
      type: String,
      required: true
    },
    keyPointsToMention: {
      type: [String],
      default: []
    },
    codeExample: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: ''
    },
    followUpQuestions: {
      type: [String],
      default: []
    },
    commonMistakes: {
      type: [String],
      default: []
    },
    companies: {
      type: [String],
      default: []
    },
    tags: {
      type: [String],
      default: []
    },
    rubricCriteria: {
      correctness: { type: String, default: '' },
      clarity: { type: String, default: '' },
      problemSolving: { type: String, default: '' },
      communication: { type: String, default: '' }
    },
    isVerified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index for filtering
interviewQuestionSchema.index({ trackSlug: 1, category: 1, difficulty: 1 });

// Text index for search
interviewQuestionSchema.index({
  title: 'text',
  question: 'text',
  topic: 'text',
  tags: 'text'
});

export const InterviewQuestion =
  mongoose.models.InterviewQuestion ||
  mongoose.model('InterviewQuestion', interviewQuestionSchema);
