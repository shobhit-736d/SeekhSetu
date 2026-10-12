import mongoose from 'mongoose';

const communicationSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  module: {
    type: String,
    enum: ['pitch', 'star', 'hr', 'gd', 'email'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  promptOrQuestion: {
    type: String,
    default: ''
  },
  userResponse: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: 0
  },
  durationSeconds: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const CommunicationSession = mongoose.model('CommunicationSession', communicationSessionSchema);
