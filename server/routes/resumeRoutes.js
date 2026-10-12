import express from 'express';
import multer from 'multer';
import { ResumeDoc } from '../models/ResumeDoc.js';
import { BackendAtsService } from '../services/atsService.js';
import { extractTextFromDocument } from '../services/documentParserService.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload and analyze resume document (attached to req.user.id if logged in)
router.post('/upload', optionalAuthMiddleware, upload.single('resume'), async (req, res) => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No resume file uploaded.' });
    }

    const rawText = await extractTextFromDocument(file.buffer, file.originalname);
    const evaluation = BackendAtsService.evaluateResume(rawText, jobDescription);

    let docId = null;
    let createdAt = new Date().toISOString();

    if (req.user && req.user.id) {
      const doc = new ResumeDoc({
        userId: req.user.id, // Derived strictly from verified JWT
        fileName: file.originalname,
        fileSize: file.size,
        rawText,
        targetJobDescription: jobDescription || '',
        atsScore: evaluation.overallScore,
        breakdown: evaluation
      });

      await doc.save();
      docId = doc._id.toString();
      createdAt = doc.createdAt;
    }

    res.status(200).json({
      message: 'Resume analyzed successfully',
      docId,
      fileName: file.originalname,
      rawText,
      atsScore: evaluation.overallScore,
      evaluation,
      createdAt
    });
  } catch (err) {
    console.error('Resume upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Analyze raw text directly
router.post('/analyze', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required.' });
    }

    const evaluation = BackendAtsService.evaluateResume(resumeText, jobDescription);
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List authenticated user's resume documents (STRICT USER ISOLATION)
router.get('/documents', authMiddleware, async (req, res) => {
  try {
    const docs = await ResumeDoc.find({ userId: req.user.id })
      .select('-rawText') // Exclude heavy raw text for list performance
      .sort({ createdAt: -1 });

    res.json(docs.map(d => ({
      id: d._id.toString(),
      fileName: d.fileName,
      fileSize: d.fileSize,
      targetJobDescription: d.targetJobDescription,
      atsScore: d.atsScore,
      breakdown: d.breakdown,
      createdAt: d.createdAt
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single resume document by ID with ownership verification
router.get('/documents/:id', authMiddleware, async (req, res) => {
  try {
    const doc = await ResumeDoc.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Resume document not found.' });
    }

    // Ownership check
    if (doc.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied: You do not have permission to view or download this resume.' });
    }

    res.json({
      id: doc._id.toString(),
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      rawText: doc.rawText,
      targetJobDescription: doc.targetJobDescription,
      atsScore: doc.atsScore,
      breakdown: doc.breakdown,
      improvedDraft: doc.improvedDraft,
      createdAt: doc.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a resume document with ownership verification
router.delete('/documents/:id', authMiddleware, async (req, res) => {
  try {
    const doc = await ResumeDoc.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Resume document not found.' });
    }

    // Ownership check
    if (doc.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied: You cannot delete another user\'s resume.' });
    }

    await ResumeDoc.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume document deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save or update active interactive resume profile for user
router.post('/profile', authMiddleware, async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile) {
      return res.status(400).json({ error: 'Resume profile data is required.' });
    }

    // Store in a ResumeDoc with a designated flag or title
    let resumeDoc = await ResumeDoc.findOne({
      userId: req.user.id,
      fileName: 'Active Resume Profile'
    });

    if (!resumeDoc) {
      resumeDoc = new ResumeDoc({
        userId: req.user.id,
        fileName: 'Active Resume Profile',
        fileSize: JSON.stringify(profile).length,
        rawText: JSON.stringify(profile),
        atsScore: 85,
        resumeProfile: profile
      });
    } else {
      resumeDoc.resumeProfile = profile;
      resumeDoc.fileSize = JSON.stringify(profile).length;
      resumeDoc.rawText = JSON.stringify(profile);
    }

    await resumeDoc.save();
    res.json({ message: 'Resume profile saved successfully', profile: resumeDoc.resumeProfile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get active interactive resume profile for current user
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const resumeDoc = await ResumeDoc.findOne({
      userId: req.user.id,
      fileName: 'Active Resume Profile'
    });

    res.json({ profile: resumeDoc ? resumeDoc.resumeProfile : null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
