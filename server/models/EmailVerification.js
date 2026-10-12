import mongoose from 'mongoose';

const emailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['register', 'login', 'reset'],
    required: true
  },
  registrationData: {
    name: { type: String },
    passwordHash: { type: String }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  attempts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } // Automatically expires and gets removed by MongoDB TTL
  }
});

export const EmailVerification = mongoose.model('EmailVerification', emailVerificationSchema);
