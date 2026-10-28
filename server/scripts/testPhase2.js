import careerRoutes from '../routes/careerRoutes.js';
import { careerTracksList } from '../data/careerTracksSeed.js';

async function runPhase2Tests() {
  console.log('🧪 Starting Phase 2 Career Explorer & Multi-Track Engine Verification Suite...\n');

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

  // TEST 1: All 18 Tracks Present and Validated
  console.log('1. Verifying 18 Required Tech Career Tracks...');
  assert(careerTracksList.length === 18, `Exact 18 career tracks loaded (Found: ${careerTracksList.length})`);

  const expectedTracks = [
    'fullstack-web',
    'frontend',
    'backend',
    'mobile-dev',
    'java-enterprise',
    'python-dev',
    'ai-ml',
    'data-science',
    'data-analytics',
    'devops-sre',
    'cloud-computing',
    'cybersecurity',
    'ui-ux',
    'software-testing-qa',
    'blockchain-web3',
    'game-dev',
    'networking-systems',
    'systems-cpp'
  ];

  const loadedSlugs = careerTracksList.map(t => t.slug);
  expectedTracks.forEach(slug => {
    assert(loadedSlugs.includes(slug), `Career track "${slug}" is present`);
  });

  // TEST 2: Data completeness on each career track
  console.log('\n2. Verifying Career Track Schema Integrity & Salary Context...');
  careerTracksList.forEach(track => {
    assert(track.title && track.title.length > 2, `${track.slug}: title present`);
    assert(track.category && track.category.length > 2, `${track.slug}: category present`);
    assert(track.averageSalary && track.averageSalary.fresher && track.averageSalary.senior, `${track.slug}: fresher & senior salary estimates present`);
    assert(Array.isArray(track.commonJobRoles) && track.commonJobRoles.length >= 2, `${track.slug}: at least 2 common job roles present`);
    assert(Array.isArray(track.prerequisites) && track.prerequisites.length >= 1, `${track.slug}: prerequisites present`);
    assert(track.skills && Array.isArray(track.skills.core) && track.skills.core.length >= 3, `${track.slug}: core skills present (>= 3)`);
    assert(Array.isArray(track.roadmapStages) && track.roadmapStages.length >= 3, `${track.slug}: roadmap stages present (>= 3 stages)`);
  });

  // TEST 3: Flagship Track Identification & Settings
  console.log('\n3. Verifying Flagship Track Settings...');
  const fullstackTrack = careerTracksList.find(t => t.slug === 'fullstack-web');
  assert(fullstackTrack !== undefined, 'Flagship track fullstack-web is registered');
  assert(fullstackTrack.title === 'Full Stack Web Development', 'Flagship title is Full Stack Web Development');
  assert(fullstackTrack.totalEstimatedHours >= 100, `Flagship estimated hours (${fullstackTrack.totalEstimatedHours}) meets curriculum standard`);

  // TEST 4: Roadmap Milestones Structure
  console.log('\n4. Verifying Roadmap Engine Stage & Milestone Hierarchy...');
  let totalMilestones = 0;
  careerTracksList.forEach(track => {
    track.roadmapStages.forEach(stage => {
      assert(stage.stageNumber > 0, `${track.slug} - Stage ${stage.stageNumber} has valid number`);
      assert(stage.milestones.length > 0, `${track.slug} - Stage "${stage.title}" has milestones`);
      totalMilestones += stage.milestones.length;
    });
  });
  assert(totalMilestones >= 70, `Rich milestone ecosystem verified (${totalMilestones} total milestone checkpoints across tracks)`);

  // TEST 5: Express Route Definitions for Careers
  console.log('\n5. Verifying Express /api/careers Routes...');
  const routePaths = careerRoutes.stack
    .filter(r => r.route)
    .map(r => `${Object.keys(r.route.methods).join(',').toUpperCase()} ${r.route.path}`);

  assert(routePaths.includes('GET /tracks'), 'Career router has GET /tracks');
  assert(routePaths.includes('GET /tracks/:slug'), 'Career router has GET /tracks/:slug');
  assert(routePaths.includes('POST /enroll'), 'Career router has POST /enroll');
  assert(routePaths.includes('POST /switch-active-track'), 'Career router has POST /switch-active-track');

  // TEST 6: Category Filter Coverage
  console.log('\n6. Verifying Category Coverage & Filters...');
  const categories = new Set(careerTracksList.map(t => t.category));
  assert(categories.has('Software Engineering'), 'Software Engineering category covered');
  assert(categories.has('Data & AI'), 'Data & AI category covered');
  assert(categories.has('Cloud & Infrastructure'), 'Cloud & Infrastructure category covered');
  assert(categories.has('Security'), 'Security category covered');
  assert(categories.has('Design & Product'), 'Design & Product category covered');
  assert(categories.has('Specialized Tech'), 'Specialized Tech category covered');

  console.log(`\n========================================`);
  console.log(`📊 Phase 2 Verification Summary: ${passed} passed, ${failed} failed.`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All Phase 2 Career Explorer & Multi-Track Engine checks passed cleanly!');
    process.exit(0);
  }
}

runPhase2Tests().catch(err => {
  console.error('Fatal error during Phase 2 tests:', err);
  process.exit(1);
});
