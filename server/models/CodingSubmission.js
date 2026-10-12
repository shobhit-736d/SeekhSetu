import mongoose from 'mongoose';

const codingSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  questionId: {
    type: String,
    required: true,
    index: true
  },
  questionTitle: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['javascript', 'python', 'java', 'cpp', 'sql'],
    required: true
  },
  code: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Compilation Error', 'Runtime Error'],
    required: true
  },
  runtimeMs: {
    type: Number,
    default: 0
  },
  memoryKb: {
    type: Number,
    default: 0
  },
  testCasesPassed: {
    type: Number,
    required: true
  },
  totalTestCases: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export const CodingSubmission = mongoose.model('CodingSubmission', codingSubmissionSchema);
