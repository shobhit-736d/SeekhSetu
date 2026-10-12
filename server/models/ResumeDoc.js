import mongoose from 'mongoose';

const resumeDocSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  rawText: {
    type: String,
    required: true
  },
  targetJobDescription: {
    type: String,
    default: ''
  },
  atsScore: {
    type: Number,
    required: true
  },
  breakdown: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  improvedDraft: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  resumeProfile: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
}, {
  timestamps: true
});

export const ResumeDoc = mongoose.model('ResumeDoc', resumeDocSchema);
