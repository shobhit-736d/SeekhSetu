import express from 'express';
import { CareerTrack } from '../models/CareerTrack.js';
import { LearningResource } from '../models/LearningResource.js';
import { GuidedProject } from '../models/GuidedProject.js';
import { Certification } from '../models/Certification.js';
import { JobListing } from '../models/JobListing.js';
import { User } from '../models/User.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// ==========================================
// 1. CAREER TRACKS (PUBLIC & ADMIN)
// ==========================================

// GET /api/careers/tracks - List all tracks
router.get('/tracks', async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search && typeof search === 'string' && search.trim()) {
      const s = search.trim();
      query.$or = [
        { title: { $regex: s, $options: 'i' } },
        { shortDescription: { $regex: s, $options: 'i' } },
        { 'skills.core': { $regex: s, $options: 'i' } },
        { commonJobRoles: { $regex: s, $options: 'i' } }
      ];
    }

    const tracks = await CareerTrack.find(query)
      .select('-roadmapStages.milestones.learningObjectives -roadmapStages.milestones.checkpointQuizIds')
      .sort({ displayOrder: 1, title: 1 });

    res.json(tracks);
  } catch (err) {
    console.error('Error fetching career tracks:', err);
    res.status(500).json({ error: 'Failed to retrieve career tracks: ' + err.message });
  }
});

// GET /api/careers/tracks/:slug - Full track details with roadmaps
router.get('/tracks/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const track = await CareerTrack.findOne({ slug: slug.toLowerCase() });

    if (!track) {
      return res.status(404).json({ error: `Career track '${slug}' not found.` });
    }

    res.json(track);
  } catch (err) {
    console.error('Error fetching track details:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/careers/tracks - Create or upsert track (Admin only)
router.post('/tracks', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { slug, title, category, shortDescription, overview, marketDemand, averageSalary, commonJobRoles, skills, roadmapStages, totalEstimatedHours, isPublished, displayOrder } = req.body;

    if (!slug || !title || !category || !shortDescription) {
      return res.status(400).json({ error: 'slug, title, category, and shortDescription are required.' });
    }

    const track = await CareerTrack.findOneAndUpdate(
      { slug: slug.toLowerCase().trim() },
      {
        slug: slug.toLowerCase().trim(),
        title,
        category,
        shortDescription,
        overview: overview || '',
        marketDemand: marketDemand || 'Very High',
        averageSalary: averageSalary || {},
        commonJobRoles: commonJobRoles || [],
        skills: skills || { core: [], recommended: [], tools: [] },
        roadmapStages: roadmapStages || [],
        totalEstimatedHours: totalEstimatedHours || 120,
        isPublished: isPublished !== undefined ? isPublished : true,
        displayOrder: displayOrder || 0
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ message: 'Career track saved successfully', track });
  } catch (err) {
    console.error('Error saving career track:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/careers/tracks/:slug - Delete track (Admin only)
router.delete('/tracks/:slug', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deleted = await CareerTrack.findOneAndDelete({ slug: req.params.slug.toLowerCase() });
    if (!deleted) {
      return res.status(404).json({ error: 'Career track not found.' });
    }
    res.json({ message: `Track '${req.params.slug}' deleted successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. LEARNING RESOURCES (PUBLIC & ADMIN)
// ==========================================

// GET /api/careers/resources
router.get('/resources', async (req, res) => {
  try {
    const { track, category, pricing, difficulty, search } = req.query;
    const query = {};

    if (track && track !== 'all') {
      query.trackSlug = track.toLowerCase();
    }
    if (category && category !== 'all') {
      query.category = category;
    }
    if (pricing && pricing !== 'all') {
      query.pricing = pricing;
    }
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    if (search && typeof search === 'string' && search.trim()) {
      const s = search.trim();
      query.$or = [
        { title: { $regex: s, $options: 'i' } },
        { description: { $regex: s, $options: 'i' } },
        { tags: { $regex: s, $options: 'i' } },
        { authorOrProvider: { $regex: s, $options: 'i' } }
      ];
    }

    const resources = await LearningResource.find(query)
      .sort({ isOfficial: -1, upvotes: -1, createdAt: -1 })
      .limit(100);

    res.json(resources);
  } catch (err) {
    console.error('Error fetching learning resources:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/careers/resources - Create resource (Admin only)
router.post('/resources', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const resource = new LearningResource(req.body);
    await resource.save();
    res.status(201).json({ message: 'Resource added successfully', resource });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. GUIDED PROJECTS (PUBLIC & ADMIN)
// ==========================================

// GET /api/careers/projects
router.get('/projects', async (req, res) => {
  try {
    const { track, difficulty, projectType, search } = req.query;
    const query = {};

    if (track && track !== 'all') {
      query.trackSlug = track.toLowerCase();
    }
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    if (projectType && projectType !== 'all') {
      query.projectType = projectType;
    }
    if (search && typeof search === 'string' && search.trim()) {
      const s = search.trim();
      query.$or = [
        { title: { $regex: s, $options: 'i' } },
        { summary: { $regex: s, $options: 'i' } },
        { techStack: { $regex: s, $options: 'i' } }
      ];
    }

    const projects = await GuidedProject.find(query)
      .sort({ isFeatured: -1, createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error('Error fetching guided projects:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/careers/projects - Create project (Admin only)
router.post('/projects', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const project = new GuidedProject(req.body);
    await project.save();
    res.status(201).json({ message: 'Guided project created successfully', project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 4. CERTIFICATIONS (PUBLIC & ADMIN)
// ==========================================

// GET /api/careers/certifications
router.get('/certifications', async (req, res) => {
  try {
    const { track, issuer, level, search } = req.query;
    const query = {};

    if (track && track !== 'all') {
      query.trackSlug = track.toLowerCase();
    }
    if (issuer && issuer !== 'all') {
      query.issuer = issuer;
    }
    if (level && level !== 'all') {
      query.level = level;
    }
    if (search && typeof search === 'string' && search.trim()) {
      const s = search.trim();
      query.$or = [
        { name: { $regex: s, $options: 'i' } },
        { code: { $regex: s, $options: 'i' } },
        { issuer: { $regex: s, $options: 'i' } },
        { skillsAssessed: { $regex: s, $options: 'i' } }
      ];
    }

    const certs = await Certification.find(query).sort({ isHighValueForFreshers: -1, issuer: 1 });
    res.json(certs);
  } catch (err) {
    console.error('Error fetching certifications:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/careers/certifications - Create certification (Admin only)
router.post('/certifications', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const cert = new Certification(req.body);
    await cert.save();
    res.status(201).json({ message: 'Certification added successfully', cert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. JOBS & INTERNSHIPS (PUBLIC & ADMIN)
// ==========================================

// GET /api/careers/jobs
router.get('/jobs', async (req, res) => {
  try {
    const { track, jobType, workplaceType, experience, search } = req.query;
    const query = { isActive: true };

    if (track && track !== 'all') {
      query.trackSlug = track.toLowerCase();
    }
    if (jobType && jobType !== 'all') {
      query.jobType = jobType;
    }
    if (workplaceType && workplaceType !== 'all') {
      query.workplaceType = workplaceType;
    }
    if (experience && experience !== 'all') {
      query.experienceLevel = experience;
    }
    if (search && typeof search === 'string' && search.trim()) {
      const s = search.trim();
      query.$or = [
        { title: { $regex: s, $options: 'i' } },
        { company: { $regex: s, $options: 'i' } },
        { location: { $regex: s, $options: 'i' } },
        { requiredSkills: { $regex: s, $options: 'i' } }
      ];
    }

    const jobs = await JobListing.find(query).sort({ isVerified: -1, createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching job listings:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/careers/jobs - Create job listing (Admin only)
router.post('/jobs', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const job = new JobListing(req.body);
    await job.save();
    res.status(201).json({ message: 'Job listing posted successfully', job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. USER TRACK ENROLLMENT & ACTIONS (AUTH REQUIRED)
// ==========================================

// POST /api/careers/enroll - Enroll in a track
router.post('/enroll', authMiddleware, async (req, res) => {
  try {
    const { trackSlug } = req.body;
    if (!trackSlug) {
      return res.status(400).json({ error: 'trackSlug is required.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (!user.studentProfile) user.studentProfile = {};
    if (!Array.isArray(user.studentProfile.enrolledTracks)) {
      user.studentProfile.enrolledTracks = ['fullstack-web'];
    }

    if (!user.studentProfile.enrolledTracks.includes(trackSlug)) {
      user.studentProfile.enrolledTracks.push(trackSlug);
    }
    user.studentProfile.activeTrack = trackSlug;
    await user.save();

    res.json({
      message: `Enrolled in track '${trackSlug}' successfully`,
      enrolledTracks: user.studentProfile.enrolledTracks,
      activeTrack: user.studentProfile.activeTrack
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/careers/switch-active-track
router.post('/switch-active-track', authMiddleware, async (req, res) => {
  try {
    const { trackSlug } = req.body;
    if (!trackSlug) return res.status(400).json({ error: 'trackSlug is required.' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (!user.studentProfile) user.studentProfile = {};
    user.studentProfile.activeTrack = trackSlug;

    if (!Array.isArray(user.studentProfile.enrolledTracks)) {
      user.studentProfile.enrolledTracks = ['fullstack-web'];
    }
    if (!user.studentProfile.enrolledTracks.includes(trackSlug)) {
      user.studentProfile.enrolledTracks.push(trackSlug);
    }

    await user.save();
    res.json({
      message: `Active track switched to '${trackSlug}'`,
      activeTrack: user.studentProfile.activeTrack,
      enrolledTracks: user.studentProfile.enrolledTracks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/careers/track-application - Add or update a job application status
router.post('/track-application', authMiddleware, async (req, res) => {
  try {
    const { jobId, title, company, location, workplaceType, status, notes, deadline, directApplyUrl } = req.body;
    if (!title || !company) {
      return res.status(400).json({ error: 'Job title and company are required.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (!user.studentProfile) user.studentProfile = {};
    if (!Array.isArray(user.studentProfile.jobApplications)) {
      user.studentProfile.jobApplications = [];
    }

    const existingIdx = user.studentProfile.jobApplications.findIndex(
      app => (jobId && app.jobId === jobId) || (app.title === title && app.company === company)
    );

    const appData = {
      id: existingIdx >= 0 ? user.studentProfile.jobApplications[existingIdx].id : 'app_' + Date.now(),
      jobId: jobId || '',
      title,
      company,
      location: location || 'Remote',
      workplaceType: workplaceType || 'Hybrid',
      status: status || 'Applied',
      notes: notes !== undefined ? notes : (existingIdx >= 0 ? user.studentProfile.jobApplications[existingIdx].notes : ''),
      deadline: deadline || null,
      directApplyUrl: directApplyUrl || '',
      updatedAt: new Date()
    };

    if (existingIdx >= 0) {
      user.studentProfile.jobApplications[existingIdx] = {
        ...user.studentProfile.jobApplications[existingIdx].toObject(),
        ...appData
      };
    } else {
      user.studentProfile.jobApplications.push(appData);
    }

    await user.save();

    res.json({
      message: 'Application status saved successfully',
      applications: user.studentProfile.jobApplications
    });
  } catch (err) {
    console.error('Error saving application tracker:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/careers/my-applications
router.get('/my-applications', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('studentProfile.jobApplications');
    const applications = user?.studentProfile?.jobApplications || [];
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/careers/my-applications/:appId
router.delete('/my-applications/:appId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (user.studentProfile?.jobApplications) {
      user.studentProfile.jobApplications = user.studentProfile.jobApplications.filter(
        a => a.id !== req.params.appId && a._id?.toString() !== req.params.appId
      );
      await user.save();
    }

    res.json({ message: 'Application removed', applications: user.studentProfile?.jobApplications || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/careers/bookmark - Toggle bookmark
router.post('/bookmark', authMiddleware, async (req, res) => {
  try {
    const { itemId, itemType, title, trackSlug } = req.body;
    if (!itemId || !itemType) {
      return res.status(400).json({ error: 'itemId and itemType are required.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (!user.studentProfile) user.studentProfile = {};
    if (!Array.isArray(user.studentProfile.bookmarkedOpportunities)) {
      user.studentProfile.bookmarkedOpportunities = [];
    }

    const existingIdx = user.studentProfile.bookmarkedOpportunities.findIndex(
      b => b.itemId === itemId && b.itemType === itemType
    );

    let isBookmarked = false;
    if (existingIdx >= 0) {
      user.studentProfile.bookmarkedOpportunities.splice(existingIdx, 1);
      isBookmarked = false;
    } else {
      user.studentProfile.bookmarkedOpportunities.push({
        itemId,
        itemType,
        title: title || '',
        trackSlug: trackSlug || '',
        bookmarkedAt: new Date()
      });
      isBookmarked = true;
    }

    await user.save();
    res.json({
      message: isBookmarked ? 'Bookmarked' : 'Bookmark removed',
      isBookmarked,
      bookmarks: user.studentProfile.bookmarkedOpportunities
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/careers/my-bookmarks
router.get('/my-bookmarks', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('studentProfile.bookmarkedOpportunities');
    res.json(user?.studentProfile?.bookmarkedOpportunities || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
