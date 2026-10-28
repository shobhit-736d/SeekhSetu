import mongoose from 'mongoose';

const userStorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  acceptanceCriteria: [{ type: String }]
}, { _id: false });

const milestoneStepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  tasks: [{ type: String }],
  deliverable: { type: String, default: '' }
}, { _id: false });

const guidedProjectSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    default: ''
  },
  problemStatement: {
    type: String,
    default: ''
  },
  expectedOutcome: {
    type: String,
    default: ''
  },
  projectType: {
    type: String,
    default: 'Full-Stack Web',
    index: true
  },
  trackSlug: {
    type: String,
    required: true,
    index: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Capstone'],
    default: 'Intermediate',
    index: true
  },
  estimatedHours: {
    type: Number,
    default: 20
  },
  techStack: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String
  }],
  systemArchitectureOverview: {
    type: String,
    default: ''
  },
  keyFeatures: [{
    type: String
  }],
  userStories: [userStorySchema],
  milestones: [milestoneStepSchema],
  githubStarterUrl: {
    type: String,
    default: ''
  },
  liveDemoUrl: {
    type: String,
    default: ''
  },
  resumeBulletPoints: [{
    type: String
  }],
  interviewDefenseQuestions: [{
    question: { type: String },
    keyDiscussionPoints: { type: String }
  }],
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const GuidedProject = mongoose.model('GuidedProject', guidedProjectSchema);
