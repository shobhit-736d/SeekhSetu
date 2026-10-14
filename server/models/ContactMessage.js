import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 150
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 3000
  },
  category: {
    type: String,
    enum: [
      'general',
      'support',
      'feedback',
      'bug_report',
      'feature_request',
      'content_issue',
      'ui_ux',
      'partnership'
    ],
    default: 'general',
    index: true
  },
  pageUrl: {
    type: String,
    trim: true,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'in_progress', 'resolved', 'archived'],
    default: 'unread',
    index: true
  },
  ip: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
