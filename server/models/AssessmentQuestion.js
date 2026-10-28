import mongoose from 'mongoose';

const assessmentQuestionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  trackSlug: {
    type: String,
    required: true,
    index: true
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  topic: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate',
    index: true
  },
  questionType: {
    type: String,
    enum: ['mcq', 'multiple-select', 'true-false', 'coding-challenge'],
    default: 'mcq',
    index: true
  },
  question: {
    type: String,
    required: true
  },
  codeSnippet: {
    type: String,
    default: ''
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswers: [{
    type: Number,
    required: true
  }],
  explanation: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: ''
  },
  codingQuestionId: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  isVerified: {
    type: Boolean,
    default: true
  },
  explanationSource: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

assessmentQuestionSchema.index({ trackSlug: 1, difficulty: 1 });
assessmentQuestionSchema.index({ trackSlug: 1, subject: 1 });
assessmentQuestionSchema.index({ question: 'text', subject: 'text', topic: 'text', tags: 'text' });

export const AssessmentQuestion = mongoose.model('AssessmentQuestion', assessmentQuestionSchema);
