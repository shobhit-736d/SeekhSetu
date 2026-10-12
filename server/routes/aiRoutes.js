import express from 'express';
import rateLimit from 'express-rate-limit';
import { AiConversation } from '../models/AiConversation.js';
import { BackendAiService } from '../services/aiService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Rate limiting: max 40 requests per minute
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
  message: { error: 'Too many AI requests. Please slow down.' }
});

// Chat with AI and persist in user's isolated history
router.post('/chat', authMiddleware, aiLimiter, async (req, res) => {
  try {
    const { prompt, history, context } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt string is required.' });
    }

    const reply = await BackendAiService.generateReply(prompt, history, context);

    // Save conversation to database under authenticated req.user.id
    let conv = await AiConversation.findOne({ userId: req.user.id });
    if (!conv) {
      conv = new AiConversation({
        userId: req.user.id,
        title: 'Placement Preparation Assistant',
        messages: []
      });
    }

    conv.messages.push({
      sender: 'user',
      content: prompt,
      contextTag: context?.page || 'general',
      timestamp: new Date()
    });

    conv.messages.push({
      sender: 'assistant',
      content: reply,
      contextTag: context?.page || 'general',
      timestamp: new Date()
    });

    // Keep last 100 messages to prevent document bloating
    if (conv.messages.length > 100) {
      conv.messages = conv.messages.slice(-100);
    }

    await conv.save();

    res.json({ reply });
  } catch (err) {
    console.error('AI chat route error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get authenticated user's chat history (STRICT ISOLATION)
router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const conv = await AiConversation.findOne({ userId: req.user.id });
    if (!conv) {
      return res.json({ messages: [] });
    }

    const formatted = conv.messages.map(m => ({
      id: m._id ? m._id.toString() : Date.now().toString(),
      sender: m.sender,
      content: m.content,
      contextTag: m.contextTag,
      timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    res.json({ messages: formatted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear authenticated user's chat history
router.delete('/conversations', authMiddleware, async (req, res) => {
  try {
    await AiConversation.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { messages: [] } },
      { upsert: true }
    );
    res.json({ message: 'Conversation history cleared successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
