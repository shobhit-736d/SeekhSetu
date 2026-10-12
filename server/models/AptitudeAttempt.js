import mongoose from 'mongoose';

const aptitudeAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true
  },
  subtopic: {
    type: String,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  },
  timeSpentSeconds: {
    type: Number,
    default: 0
  },
  incorrectQuestionIds: [{
    type: String
  }]
}, {
  timestamps: true
});

export const AptitudeAttempt = mongoose.model('AptitudeAttempt', aptitudeAttemptSchema);
