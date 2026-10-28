import { learningResourcesList } from '../data/learningResourcesSeed.js';
import { guidedProjectsList } from '../data/guidedProjectsSeed.js';
import { careerTracksList } from '../data/careerTracksSeed.js';

async function runPhase3Tests() {
  console.log('🧪 Starting Phase 3 Learning Resources & Guided Projects Verification Suite...\n');

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

  const allTrackSlugs = careerTracksList.map(t => t.slug);

  // TEST 1: Resource counts and track coverage
  console.log('1. Verifying Learning Resources & Track Coverage across all 18 tracks...');
  assert(learningResourcesList.length >= 36, `At least 36 learning resources seeded (Found: ${learningResourcesList.length})`);

  const tracksWithResources = new Set(learningResourcesList.map(r => r.trackSlug));
  allTrackSlugs.forEach(slug => {
    assert(tracksWithResources.has(slug), `Learning resources exist for track "${slug}"`);
  });

  // TEST 2: Resource schema integrity
  console.log('\n2. Verifying Learning Resource Schema & Authentic Metadata...');
  learningResourcesList.forEach(r => {
    assert(r.title && r.title.length > 3, `${r.id}: title present (${r.title})`);
    assert(r.description && r.description.length > 10, `${r.id}: description is comprehensive`);
    assert(r.url && (r.url.startsWith('http://') || r.url.startsWith('https://') || r.url === '#seekhsetu-curriculum'), `${r.id}: valid URL (${r.url})`);
    assert(['Free', 'Freemium', 'Paid'].includes(r.pricing), `${r.id}: valid pricing (${r.pricing})`);
    assert(['Beginner', 'Intermediate', 'Advanced', 'All Levels'].includes(r.difficulty), `${r.id}: valid difficulty (${r.difficulty})`);
    assert(r.authorOrProvider && r.authorOrProvider.length > 1, `${r.id}: authorOrProvider present (${r.authorOrProvider})`);
    assert(r.topic && r.topic.length > 1, `${r.id}: topic present (${r.topic})`);
    assert(r.language && r.language.length >= 2, `${r.id}: language present (${r.language})`);
    assert(Array.isArray(r.tags) && r.tags.length > 0, `${r.id}: tags present`);
    assert(typeof r.isOriginalSeekhSetu === 'boolean', `${r.id}: isOriginalSeekhSetu flag present`);
  });

  // TEST 3: Original vs 3rd Party distinction
  console.log('\n3. Verifying SeekhSetu Original vs Curated 3rd-Party Resources Distinction...');
  const originalResources = learningResourcesList.filter(r => r.isOriginalSeekhSetu);
  const thirdPartyResources = learningResourcesList.filter(r => !r.isOriginalSeekhSetu);
  assert(originalResources.length >= 2, `Original SeekhSetu resources identified (${originalResources.length})`);
  assert(thirdPartyResources.length >= 20, `Curated 3rd party verified resources identified (${thirdPartyResources.length})`);

  // TEST 4: Guided Projects Coverage across all 18 tracks
  console.log('\n4. Verifying Guided Projects Coverage across all 18 tracks...');
  assert(guidedProjectsList.length >= 18, `At least 18 guided projects seeded (Found: ${guidedProjectsList.length})`);

  const tracksWithProjects = new Set(guidedProjectsList.map(p => p.trackSlug));
  allTrackSlugs.forEach(slug => {
    assert(tracksWithProjects.has(slug), `Guided project exists for track "${slug}"`);
  });

  // TEST 5: Guided Project schema & Blueprint depth
  console.log('\n5. Verifying Guided Project Blueprint Completeness & Interview Defense...');
  guidedProjectsList.forEach(p => {
    assert(p.title && p.title.length > 3, `${p.slug}: title present`);
    assert(p.summary && p.summary.length > 20, `${p.slug}: summary is comprehensive`);
    assert(p.objective && p.objective.length > 20, `${p.slug}: objective present`);
    assert(p.problemStatement && p.problemStatement.length > 20, `${p.slug}: problemStatement present`);
    assert(p.expectedOutcome && p.expectedOutcome.length > 20, `${p.slug}: expectedOutcome present`);
    assert(p.estimatedHours > 0, `${p.slug}: estimatedHours valid (${p.estimatedHours}h)`);
    assert(Array.isArray(p.techStack) && p.techStack.length >= 2, `${p.slug}: techStack has >= 2 technologies (${p.techStack.join(', ')})`);
    assert(Array.isArray(p.milestones) && p.milestones.length >= 2, `${p.slug}: milestones has >= 2 implementation steps`);
    p.milestones.forEach(m => {
      assert(m.title && Array.isArray(m.tasks) && m.tasks.length >= 2, `${p.slug} M${m.stepNumber}: tasks checklist defined`);
    });
    assert(Array.isArray(p.resumeBulletPoints) && p.resumeBulletPoints.length >= 2, `${p.slug}: at least 2 resume bullet points`);
    assert(Array.isArray(p.interviewDefenseQuestions) && p.interviewDefenseQuestions.length >= 1, `${p.slug}: technical interview defense Q&As present`);
  });

  // TEST 6: Backend API Endpoints (if server is up)
  console.log('\n6. Verifying Backend Career Endpoints on http://localhost:5000...');
  try {
    const resRes = await fetch('http://localhost:5000/api/careers/resources');
    if (resRes.ok) {
      const raw = await resRes.json();
      const items = Array.isArray(raw) ? raw : raw.data;
      assert(Array.isArray(items) && items.length >= 30, `GET /api/careers/resources returned ${items.length} items from MongoDB`);
    } else {
      console.log('  ⚠️ Server returned status:', resRes.status);
    }

    const filteredRes = await fetch('http://localhost:5000/api/careers/resources?track=frontend');
    if (filteredRes.ok) {
      const raw = await filteredRes.json();
      const items = Array.isArray(raw) ? raw : raw.data;
      assert(Array.isArray(items) && items.length >= 1, `GET /api/careers/resources?track=frontend returned ${items.length} items`);
      assert(items.every(r => r.trackSlug === 'frontend'), 'All returned resources match trackSlug: frontend');
    }

    const projRes = await fetch('http://localhost:5000/api/careers/projects');
    if (projRes.ok) {
      const raw = await projRes.json();
      const items = Array.isArray(raw) ? raw : raw.data;
      assert(Array.isArray(items) && items.length >= 18, `GET /api/careers/projects returned ${items.length} projects from MongoDB`);
    }

    const filteredProj = await fetch('http://localhost:5000/api/careers/projects?track=backend');
    if (filteredProj.ok) {
      const raw = await filteredProj.json();
      const items = Array.isArray(raw) ? raw : raw.data;
      assert(Array.isArray(items) && items.length >= 1, `GET /api/careers/projects?track=backend returned ${items.length} projects`);
      assert(items.every(p => p.trackSlug === 'backend'), 'All returned projects match trackSlug: backend');
    }
  } catch (err) {
    console.log('  ⚠️ Backend API test note (server might be starting or testing local fallback):', err.message);
  }

  console.log(`\n========================================`);
  console.log(`Phase 3 Test Results: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase3Tests();
