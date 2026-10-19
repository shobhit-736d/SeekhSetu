import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: false,
    default: null
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: ''
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  preferences: {
    theme: { type: String, default: 'dark' },
    dailyGoalMinutes: { type: Number, default: 120 }
  },
  streakDays: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  },
  studentProfile: {
    collegeName: { type: String, default: '' },
    collegeRollNumber: { type: String, default: '' },
    degree: { type: String, default: '' },
    branch: { type: String, default: '' },
    semester: { type: String, default: '' },
    graduationYear: { type: String, default: '' },
    careerGoal: { type: String, default: '' },
    targetCompanyTier: { type: String, default: '' },
    targetPackage: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    portfolioUrl: { type: String, default: '' },
    uploadedResumeName: { type: String, default: '' },
    uploadedResumeDate: { type: String, default: '' },
    uploadedResumeSize: { type: String, default: '' },
    uploadedResumeData: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatarType: { type: String, default: 'preset' },
    notifications: {
      dailyStudyReminder: { type: Boolean, default: true },
      streakAlerts: { type: Boolean, default: true },
      weeklyProgressDigest: { type: Boolean, default: true },
      mockInterviewTips: { type: Boolean, default: true }
    },
    privacy: {
      isProfilePublic: { type: Boolean, default: true },
      showOnLeaderboard: { type: Boolean, default: true },
      shareActivityWithPeers: { type: Boolean, default: true },
      allowAiPersonalization: { type: Boolean, default: true }
    },
    mockInterviews: [{
      id: { type: String },
      role: { type: String },
      companyTarget: { type: String },
      date: { type: String },
      score: { type: Number },
      durationMinutes: { type: Number },
      feedback: { type: String },
      strengths: { type: String },
      areasToImprove: { type: String }
    }],
    certificates: [{
      id: { type: String },
      title: { type: String },
      credentialId: { type: String },
      issueDate: { type: String },
      recipientName: { type: String },
      module: { type: String },
      score: { type: Number },
      verificationUrl: { type: String }
    }],
    savedInterviewQuestions: [{
      id: { type: String },
      question: { type: String },
      topic: { type: String },
      difficulty: { type: String },
      frequency: { type: String },
      answerSummary: { type: String },
      savedAt: { type: String }
    }]
  }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);
