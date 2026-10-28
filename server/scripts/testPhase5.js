// server/scripts/testPhase5.js
// Automated verification test suite for Phase 5: Technical Interview & Soft Skills Module

import http from 'http';

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

function makeRequest(path, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('================================================================');
  console.log('🚀 RUNNING PHASE 5 AUTOMATED TEST SUITE: INTERVIEW & SOFT SKILLS');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Mock Presets Endpoint
    console.log('--- 1. Testing Mock Interview Presets ---');
    const presetsRes = await makeRequest('/api/interviews/presets');
    assert(presetsRes.status === 200, 'GET /api/interviews/presets returns status 200');
    assert(Array.isArray(presetsRes.data), 'Presets response is an array');
    assert(presetsRes.data.length >= 8, `Presets contain at least 8 enterprise roles (found ${presetsRes.data.length})`);

    const presetSlugs = new Set(presetsRes.data.map(p => p.trackSlug));
    assert(presetSlugs.has('fullstack-web'), 'Presets include Full Stack Web Developer');
    assert(presetSlugs.has('ai-ml'), 'Presets include AI / Machine Learning Engineer');
    assert(presetSlugs.has('devops-sre'), 'Presets include Cloud & DevOps Engineer (devops-sre)');
    assert(presetSlugs.has('cybersecurity'), 'Presets include Cybersecurity Analyst');

    const firstPreset = presetsRes.data[0];
    assert(Array.isArray(firstPreset.rounds) && firstPreset.rounds.length >= 3, 'Preset includes multi-round breakdown (>= 3 rounds)');
    assert(Array.isArray(firstPreset.rubricDimensions) && firstPreset.rubricDimensions.length === 4, 'Preset specifies 4 evaluation rubric dimensions');

    // 2. Question Bank Endpoint & Filtering
    console.log('\n--- 2. Testing Technical Question Bank & Filters ---');
    const allQuestionsRes = await makeRequest('/api/interviews/questions');
    assert(allQuestionsRes.status === 200, 'GET /api/interviews/questions returns status 200');
    assert(Array.isArray(allQuestionsRes.data), 'Questions response is an array');
    assert(allQuestionsRes.data.length >= 22, `Question bank returns at least 22 seeded questions (found ${allQuestionsRes.data.length})`);

    // 2a. Filter by trackSlug
    const fullstackRes = await makeRequest('/api/interviews/questions?trackSlug=fullstack-web');
    assert(fullstackRes.status === 200, 'Filtering by trackSlug=fullstack-web returns status 200');
    assert(fullstackRes.data.length > 0 && fullstackRes.data.every(q => q.trackSlug === 'fullstack-web'), 'All returned questions match fullstack-web');

    // 2b. Filter by category
    const sysDesignRes = await makeRequest('/api/interviews/questions?category=system-design');
    assert(sysDesignRes.status === 200, 'Filtering by category=system-design returns status 200');
    assert(sysDesignRes.data.length > 0 && sysDesignRes.data.every(q => q.category === 'system-design'), 'All returned questions match system-design');

    // 2c. Filter by difficulty
    const hardRes = await makeRequest('/api/interviews/questions?difficulty=Hard');
    assert(hardRes.status === 200, 'Filtering by difficulty=Hard returns status 200');
    assert(hardRes.data.length > 0 && hardRes.data.every(q => q.difficulty === 'Hard'), 'All returned questions have difficulty Hard');

    // 2d. Search query
    const searchRes = await makeRequest('/api/interviews/questions?search=DOM');
    assert(searchRes.status === 200, 'Searching for "DOM" returns status 200');
    assert(searchRes.data.length > 0, 'Search for "DOM" returned matching questions');

    // 3. Question Detail & Pedagogy Elements
    console.log('\n--- 3. Testing Question Pedagogical Completeness ---');
    const sampleQuestion = allQuestionsRes.data[0];
    const detailRes = await makeRequest(`/api/interviews/questions/${sampleQuestion._id || sampleQuestion.id}`);
    assert(detailRes.status === 200, `GET /api/interviews/questions/:id returns status 200`);
    assert(typeof detailRes.data.comprehensiveAnswer === 'string' && detailRes.data.comprehensiveAnswer.length > 50, 'Question includes authoritative comprehensive model answer');
    assert(Array.isArray(detailRes.data.keyPointsToMention) && detailRes.data.keyPointsToMention.length > 0, 'Question includes key scoring checklist points');
    assert(Array.isArray(detailRes.data.followUpQuestions) && detailRes.data.followUpQuestions.length > 0, 'Question includes interviewer follow-up questions');
    assert(Array.isArray(detailRes.data.commonMistakes) && detailRes.data.commonMistakes.length > 0, 'Question includes common traps to avoid');

    // 4. Mock Interview Rubric Evaluation API
    console.log('\n--- 4. Testing Mock Evaluation Rubric & Transparency ---');
    const evalPayload = {
      presetId: 'mock-fullstack-dev',
      answers: [
        {
          questionId: sampleQuestion.id || sampleQuestion._id,
          questionText: sampleQuestion.question,
          userAnswer: 'The Virtual DOM is an in-memory lightweight representation of the actual DOM. React uses a reconciliation algorithm with a heuristic O(n) diffing approach to calculate minimal DOM patches and batches updates via Fiber.',
          timeSpentSeconds: 65,
          inputMode: 'speech'
        }
      ]
    };

    const evalRes = await makeRequest('/api/interviews/mock/evaluate', 'POST', evalPayload);
    assert(evalRes.status === 200, 'POST /api/interviews/mock/evaluate returns status 200');
    assert(typeof evalRes.data.overallScore === 'number' && evalRes.data.overallScore >= 0 && evalRes.data.overallScore <= 100, `Overall score calculated (${evalRes.data.overallScore}%)`);
    assert(typeof evalRes.data.rubricScores === 'object', 'Rubric scores object returned');
    assert(typeof evalRes.data.rubricScores.correctness === 'number', `Rubric correctness score: ${evalRes.data.rubricScores.correctness}/100`);
    assert(typeof evalRes.data.rubricScores.clarity === 'number', `Rubric clarity score: ${evalRes.data.rubricScores.clarity}/100`);
    assert(typeof evalRes.data.rubricScores.problemSolving === 'number', `Rubric problemSolving score: ${evalRes.data.rubricScores.problemSolving}/100`);
    assert(typeof evalRes.data.rubricScores.communication === 'number', `Rubric communication score: ${evalRes.data.rubricScores.communication}/100`);
    assert(Array.isArray(evalRes.data.strengths) && evalRes.data.strengths.length > 0, 'Provides constructive strengths');
    assert(Array.isArray(evalRes.data.recommendations) && evalRes.data.recommendations.length > 0, 'Provides actionable improvement recommendations');

    // Critical Requirement: Transparency & Disclaimer
    assert(typeof evalRes.data.disclaimer === 'string' && evalRes.data.disclaimer.includes('heuristic'), 'Evaluation includes clear disclaimer explaining automated rubric limitations');

    // 5. Protected Endpoint Authorization Check
    console.log('\n--- 5. Testing Authorization Checks ---');
    const unauthHistoryRes = await makeRequest('/api/interviews/mock/history');
    assert(unauthHistoryRes.status === 401, 'GET /api/interviews/mock/history without JWT returns 401 Unauthorized');

    const unauthSubmitRes = await makeRequest('/api/interviews/mock/submit', 'POST', evalPayload);
    assert(unauthSubmitRes.status === 401, 'POST /api/interviews/mock/submit without JWT returns 401 Unauthorized');

    // 6. Track Statistics
    console.log('\n--- 6. Testing Career Track Statistics ---');
    const statsRes = await makeRequest('/api/interviews/stats');
    assert(statsRes.status === 200, 'GET /api/interviews/stats returns status 200');
    assert(statsRes.data.totalQuestions >= 22, `Total question count verified in stats (${statsRes.data.totalQuestions})`);
    assert(typeof statsRes.data.byTrack === 'object', 'Stats breakdown by track returned');

  } catch (err) {
    console.error('Test execution threw error:', err);
    failed++;
  }

  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
