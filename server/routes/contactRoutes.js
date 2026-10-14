import express from 'express';
import rateLimit from 'express-rate-limit';
import { ContactMessage } from '../models/ContactMessage.js';
import { authMiddleware, adminMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';
import { sendContactNotificationEmail } from '../services/emailService.js';

const router = express.Router();

// Rate limiter: 10 contact/feedback submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many messages submitted from this IP address. Please wait a few minutes before trying again.'
  }
});

// Basic sanitize helper to prevent HTML/script injection
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_CATEGORIES = [
  'general',
  'support',
  'feedback',
  'bug_report',
  'feature_request',
  'content_issue',
  'ui_ux',
  'partnership'
];

/**
 * POST /api/contact
 * Public endpoint to submit a contact or feedback message
 * Rate limited and sanitized. Supports optional authentication.
 */
router.post('/', contactLimiter, optionalAuthMiddleware, async (req, res) => {
  try {
    const { name, email, subject, message, category, pageUrl } = req.body;

    const cleanName = sanitizeString(name);
    const cleanEmail = sanitizeString(email).toLowerCase();
    const cleanSubject = sanitizeString(subject);
    const cleanMessage = sanitizeString(message);
    const cleanPageUrl = sanitizeString(pageUrl).slice(0, 500);

    // Validation
    if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        error: 'Please provide a valid name between 2 and 100 characters.'
      });
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({
        error: 'Please provide a valid email address.'
      });
    }

    if (!cleanSubject || cleanSubject.length < 3 || cleanSubject.length > 150) {
      return res.status(400).json({
        error: 'Subject must be between 3 and 150 characters.'
      });
    }

    if (!cleanMessage || cleanMessage.length < 10 || cleanMessage.length > 3000) {
      return res.status(400).json({
        error: 'Message must be between 10 and 3,000 characters.'
      });
    }

    const safeCategory = ALLOWED_CATEGORIES.includes(category) ? category : 'general';

    // Store in MongoDB
    const contactDoc = await ContactMessage.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      category: safeCategory,
      pageUrl: cleanPageUrl,
      userId: req.user?.id || null,
      status: 'unread',
      ip: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || ''
    });

    // Asynchronously dispatch email notification if configured
    sendContactNotificationEmail({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      category: safeCategory,
      pageUrl: cleanPageUrl
    }).catch(err => {
      console.warn('Contact email dispatch notice:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received by the SeekhSetu team.',
      id: contactDoc._id
    });
  } catch (err) {
    console.error('Contact Submission Error:', err);
    return res.status(500).json({
      error: 'An unexpected error occurred while saving your message. Please try again.'
    });
  }
});

/**
 * GET /api/contact
 * Admin endpoint to list all contact/feedback messages
 */
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { category, status, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (category && ALLOWED_CATEGORIES.includes(category)) {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [messages, total] = await Promise.all([
      ContactMessage.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      ContactMessage.countDocuments(filter)
    ]);

    return res.json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      messages
    });
  } catch (err) {
    console.error('Admin List Contact Error:', err);
    return res.status(500).json({ error: 'Failed to retrieve messages.' });
  }
});

/**
 * PATCH /api/contact/:id/status
 * Admin endpoint to update message status
 */
router.patch('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['unread', 'read', 'in_progress', 'resolved', 'archived'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    return res.json({
      success: true,
      message: 'Status updated successfully.',
      data: updated
    });
  } catch (err) {
    console.error('Update Contact Status Error:', err);
    return res.status(500).json({ error: 'Failed to update message status.' });
  }
});

export default router;
