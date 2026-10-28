import mongoose from 'mongoose';

const learningResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
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
    enum: [
      'Official Documentation',
      'Interactive Course',
      'Video Series',
      'Cheatsheet & Reference',
      'Open Book',
      'Article & Guide',
      'Original SeekhSetu Guide'
    ],
    required: true,
    index: true
  },
  topic: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'English'
  },
  prerequisites: [{
    type: String
  }],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    default: 'Beginner'
  },
  pricing: {
    type: String,
    enum: ['Free', 'Freemium', 'Paid'],
    default: 'Free',
    index: true
  },
  authorOrProvider: {
    type: String,
    default: ''
  },
  isOfficial: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  isOriginalSeekhSetu: {
    type: Boolean,
    default: false,
    index: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  upvotes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

learningResourceSchema.index({ trackSlug: 1, category: 1 });

export const LearningResource = mongoose.model('LearningResource', learningResourceSchema);
