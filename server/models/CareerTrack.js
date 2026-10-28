import mongoose from 'mongoose';

const roadmapMilestoneSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  estimatedHours: { type: Number, default: 10 },
  skills: [{ type: String }],
  learningObjectives: [{ type: String }],
  suggestedProjects: [{ type: String }],
  checkpointQuizIds: [{ type: String }]
}, { _id: false });

const roadmapStageSchema = new mongoose.Schema({
  stageNumber: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  phase: { 
    type: String, 
    enum: ['Foundations', 'Core Concepts', 'Advanced Engineering', 'Job Ready & Capstone'], 
    default: 'Foundations' 
  },
  durationWeeks: { type: Number, default: 4 },
  milestones: [roadmapMilestoneSchema]
}, { _id: false });

const careerTrackSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
    enum: [
      'Software Engineering',
      'Data & AI',
      'Cloud & Infrastructure',
      'Security',
      'Design & Product',
      'Specialized Tech'
    ],
    index: true
  },
  icon: {
    type: String,
    default: 'Code2'
  },
  accentColor: {
    type: String,
    default: '#FA4616'
  },
  shortDescription: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    default: ''
  },
  marketDemand: {
    type: String,
    enum: ['Extremely High', 'Very High', 'High', 'Moderate'],
    default: 'Very High'
  },
  averageSalary: {
    fresher: { type: String, default: '₹6–12 LPA' },
    mid: { type: String, default: '₹14–26 LPA' },
    senior: { type: String, default: '₹28–45+ LPA' }
  },
  commonJobRoles: [{
    type: String
  }],
  prerequisites: [{
    type: String
  }],
  skills: {
    core: [{ type: String }],
    recommended: [{ type: String }],
    tools: [{ type: String }]
  },
  roadmapStages: [roadmapStageSchema],
  totalEstimatedHours: {
    type: Number,
    default: 120
  },
  isPublished: {
    type: Boolean,
    default: true,
    index: true
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true
  }
}, {
  timestamps: true
});

export const CareerTrack = mongoose.model('CareerTrack', careerTrackSchema);
