import express from 'express';
import mongoose from 'mongoose';
import careerRoutes from '../routes/careerRoutes.js';
import { CareerTrack } from '../models/CareerTrack.js';
import { LearningResource } from '../models/LearningResource.js';
import { GuidedProject } from '../models/GuidedProject.js';
import { Certification } from '../models/Certification.js';
import { JobListing } from '../models/JobListing.js';
import { User } from '../models/User.js';
import { UserProgress } from '../models/UserProgress.js';

async function runTests() {
  console.log('🧪 Starting Phase 1 Architecture & Schema Verification Suite...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // TEST 1: Model Initialization
  console.log('1. Checking Mongoose Model Registration...');
  assert(CareerTrack && CareerTrack.modelName === 'CareerTrack', 'CareerTrack model initialized');
  assert(LearningResource && LearningResource.modelName === 'LearningResource', 'LearningResource model initialized');
  assert(GuidedProject && GuidedProject.modelName === 'GuidedProject', 'GuidedProject model initialized');
  assert(Certification && Certification.modelName === 'Certification', 'Certification model initialized');
  assert(JobListing && JobListing.modelName === 'JobListing', 'JobListing model initialized');

  // TEST 2: Schema Backward Compatibility
  console.log('\n2. Verifying Backward-Compatible Extensions on User & UserProgress...');
  const testUser = new User({
    name: 'Test Student',
    email: 'test@seekhsetu.test',
    studentProfile: {}
  });
  assert(Array.isArray(testUser.studentProfile.enrolledTracks), 'User studentProfile.enrolledTracks is an array');
  assert(testUser.studentProfile.activeTrack === 'fullstack-web', 'User studentProfile.activeTrack default is fullstack-web');
  assert(Array.isArray(testUser.studentProfile.jobApplications), 'User studentProfile.jobApplications is an array');
  assert(Array.isArray(testUser.studentProfile.bookmarkedOpportunities), 'User studentProfile.bookmarkedOpportunities is an array');

  const testProgress = new UserProgress({
    userId: new mongoose.Types.ObjectId()
  });
  assert(testProgress.trackMilestones instanceof Map, 'UserProgress trackMilestones is a Map');
  assert(testProgress.completedTopics instanceof Map, 'UserProgress completedTopics (existing) preserved as Map');
  assert(testProgress.completedDays instanceof Map, 'UserProgress completedDays (existing) preserved as Map');

  // TEST 3: Express Router Mounting & Route Registration
  console.log('\n3. Verifying Express Career Routes Mounting...');
  const app = express();
  app.use(express.json());
  app.use('/api/careers', careerRoutes);

  // Check router stack
  const routePaths = careerRoutes.stack
    .filter(r => r.route)
    .map(r => `${Object.keys(r.route.methods).join(',').toUpperCase()} ${r.route.path}`);

  assert(routePaths.includes('GET /tracks'), 'Router has GET /tracks');
  assert(routePaths.includes('GET /tracks/:slug'), 'Router has GET /tracks/:slug');
  assert(routePaths.includes('GET /resources'), 'Router has GET /resources');
  assert(routePaths.includes('GET /projects'), 'Router has GET /projects');
  assert(routePaths.includes('GET /certifications'), 'Router has GET /certifications');
  assert(routePaths.includes('GET /jobs'), 'Router has GET /jobs');
  assert(routePaths.includes('POST /enroll'), 'Router has POST /enroll');
  assert(routePaths.includes('POST /track-application'), 'Router has POST /track-application');
  assert(routePaths.includes('POST /bookmark'), 'Router has POST /bookmark');

  console.log(`\n========================================`);
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All Phase 1 Backend & Schema checks passed cleanly!');
    process.exit(0);
  }
}

runTests();
