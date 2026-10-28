import mongoose from 'mongoose';

const examDomainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weightPercentage: { type: Number, required: true },
  keyTopics: [{ type: String }]
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  trackSlug: {
    type: String,
    required: true,
    index: true
  },
  level: {
    type: String,
    enum: ['Foundational', 'Associate', 'Professional', 'Specialty'],
    default: 'Associate',
    index: true
  },
  description: {
    type: String,
    required: true
  },
  officialUrl: {
    type: String,
    required: true,
    trim: true
  },
  costUsd: {
    type: Number,
    default: 150
  },
  durationMinutes: {
    type: Number,
    default: 90
  },
  questionCount: {
    type: String,
    default: '50–65 questions'
  },
  passingScore: {
    type: String,
    default: '70% or 700/1000'
  },
  validityYears: {
    type: Number,
    default: 3
  },
  recommendedPrepWeeks: {
    type: Number,
    default: 6
  },
  skillsAssessed: [{
    type: String
  }],
  domains: [examDomainSchema],
  officialFreeStudyGuideUrl: {
    type: String,
    default: ''
  },
  isHighValueForFreshers: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Certification = mongoose.model('Certification', certificationSchema);
