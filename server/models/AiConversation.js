import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contextTag: {
    type: String,
    default: 'general'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const aiConversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'Placement Doubt Session'
  },
  messages: [messageSchema]
}, {
  timestamps: true
});

export const AiConversation = mongoose.model('AiConversation', aiConversationSchema);
