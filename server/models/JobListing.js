import mongoose from 'mongoose';

const jobListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  company: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  companyLogo: {
    type: String,
    default: ''
  },
  trackSlug: {
    type: String,
    required: true,
    index: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Internship', 'Contract', 'Apprenticeship'],
    default: 'Full-time',
    index: true
  },
  workplaceType: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    default: 'Hybrid',
    index: true
  },
  location: {
    type: String,
    required: true,
    default: 'India / Remote'
  },
  experienceLevel: {
    type: String,
    enum: ['Internship', 'Fresher (0–1 Years)', 'Early Career (1–3 Years)', 'Experienced (3+ Years)'],
    default: 'Fresher (0–1 Years)',
    index: true
  },
  salaryRange: {
    type: String,
    default: 'Disclosed during screening'
  },
  eligibility: {
    type: String,
    default: 'B.Tech / B.E. / BCA / MCA / B.Sc (CS/IT) graduates or final-year students'
  },
  batchesEligible: [{
    type: String
  }],
  requiredSkills: [{
    type: String
  }],
  overview: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String
  }],
  selectionProcess: [{
    type: String
  }],
  deadline: {
    type: Date,
    default: null
  },
  directApplyUrl: {
    type: String,
    required: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  sourceNote: {
    type: String,
    default: 'Official Career Portal'
  }
}, {
  timestamps: true
});

jobListingSchema.index({ isActive: 1, trackSlug: 1, experienceLevel: 1 });

export const JobListing = mongoose.model('JobListing', jobListingSchema);
