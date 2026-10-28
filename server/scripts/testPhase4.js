// server/scripts/testPhase4.js
// Automated verification test suite for Phase 4: Practice Quizzes & Assessments Engine

import http from 'http';

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}/api/assessments`;

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
        } catch (e) {
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
  console.log('====================================================');
  console.log('🚀 RUNNING PHASE 4 AUTOMATED TEST SUITE: ASSESSMENTS');
  console.log('====================================================\n');

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
    // 1. Presets endpoint test
    console.log('--- 1. Testing Assessment Presets Endpoint ---');
    const presetsRes = await makeRequest('/api/assessments/presets');
    assert(presetsRes.status === 200, 'GET /api/assessments/presets returns status 200');
    assert(Array.isArray(presetsRes.data), 'Presets response is an array');
    assert(presetsRes.data.length >= 18, `Presets include at least 18 tracks (found ${presetsRes.data.length})`);

    const tracksInPresets = new Set(presetsRes.data.map(p => p.trackSlug));
    assert(tracksInPresets.has('fullstack-web'), 'Presets include Full Stack Web Development');
    assert(tracksInPresets.has('ai-ml'), 'Presets include AI / ML Engineering (ai-ml)');
    assert(tracksInPresets.has('cybersecurity'), 'Presets include Cybersecurity (cybersecurity)');
    assert(tracksInPresets.has('devops-sre'), 'Presets include DevOps & Cloud (devops-sre)');
    assert(tracksInPresets.has('cloud-computing'), 'Presets include Cloud Solutions (cloud-computing)');

    // 2. Question Bank endpoint & Security Stripping
    console.log('\n--- 2. Testing Question Bank Security & Stripping ---');
    
    // 2a. Practice mode questions (includes correctAnswers and explanation for instant feedback)
    const practiceQuestionsRes = await makeRequest('/api/assessments/questions?mode=practice&limit=10');
    assert(practiceQuestionsRes.status === 200, 'GET /api/assessments/questions?mode=practice returns status 200');
    assert(Array.isArray(practiceQuestionsRes.data) && practiceQuestionsRes.data.length > 0, 'Practice mode returns array of questions');
    
    const firstPracticeQ = practiceQuestionsRes.data[0];
    assert(Array.isArray(firstPracticeQ.correctAnswers), 'Practice mode provides correctAnswers for instant feedback');
    assert(typeof firstPracticeQ.explanation === 'string' && firstPracticeQ.explanation.length > 0, 'Practice mode provides verified explanation');

    // 2b. Timed Assessment mode questions (CRITICAL: MUST STRIP correctAnswers and explanation)
    const timedQuestionsRes = await makeRequest('/api/assessments/questions?mode=timed-assessment&limit=10');
    assert(timedQuestionsRes.status === 200, 'GET /api/assessments/questions?mode=timed-assessment returns status 200');
    assert(Array.isArray(timedQuestionsRes.data) && timedQuestionsRes.data.length > 0, 'Timed assessment returns array of questions');
    
    let answerLeaked = false;
    let explanationLeaked = false;
    for (const q of timedQuestionsRes.data) {
      if (q.correctAnswers !== undefined) answerLeaked = true;
      if (q.explanation !== undefined) explanationLeaked = true;
    }
    assert(!answerLeaked, 'SECURITY: Timed assessment mode stripped all correctAnswers to prevent DevTools inspection');
    assert(!explanationLeaked, 'SECURITY: Timed assessment mode stripped all explanations to prevent DevTools inspection');

    // 3. Question Types Coverage
    console.log('\n--- 3. Testing Question Types Coverage ---');
    const allQuestionsRes = await makeRequest('/api/assessments/questions?mode=practice&limit=100');
    const qTypes = new Set(allQuestionsRes.data.map(q => q.questionType));
    assert(qTypes.has('mcq'), 'Question bank supports Single-Choice MCQs (mcq)');
    assert(qTypes.has('multiple-select'), 'Question bank supports Multiple-Select Questions (multiple-select)');
    assert(qTypes.has('true-false'), 'Question bank supports True/False Questions (true-false)');
    assert(qTypes.has('coding-challenge'), 'Question bank supports Coding Challenges linked to Arena (coding-challenge)');

    // 4. Server-Side Scoring & Submission Evaluation
    console.log('\n--- 4. Testing Server-Side Scoring Evaluation ---');
    
    // Pick two questions from practice mode where we know the answers
    const testQ1 = practiceQuestionsRes.data[0];
    const testQ2 = practiceQuestionsRes.data[1];

    // Perfect submission
    const perfectSubmission = {
      presetSlug: 'frontend-benchmark',
      trackSlug: testQ1.trackSlug,
      timeSpentSeconds: 120,
      answers: [
        { questionId: testQ1.id, selectedAnswers: testQ1.correctAnswers },
        { questionId: testQ2.id, selectedAnswers: testQ2.correctAnswers }
      ]
    };

    const submitRes = await makeRequest('/api/assessments/submit', 'POST', perfectSubmission);
    assert(submitRes.status === 200, 'POST /api/assessments/submit returns status 200');
    assert(submitRes.data.score === 2, `Scored correctly: 2/2 correct (received ${submitRes.data.score}/${submitRes.data.totalQuestions})`);
    assert(submitRes.data.percentage === 100, `Percentage calculated correctly: 100% (received ${submitRes.data.percentage}%)`);
    assert(submitRes.data.passed === true, 'Passed status is true for 100%');
    assert(typeof submitRes.data.topicBreakdown === 'object' && Object.keys(submitRes.data.topicBreakdown).length > 0, 'Response returns topic competency breakdown');
    assert(Array.isArray(submitRes.data.recommendations) && submitRes.data.recommendations.length > 0, 'Response returns targeted recommendations');
    assert(Array.isArray(submitRes.data.evaluatedAnswers) && submitRes.data.evaluatedAnswers.length === 2, 'Response provides post-submission evaluated answers with explanations');

    // Incorrect submission test
    const wrongSubmission = {
      presetSlug: 'frontend-benchmark',
      trackSlug: testQ1.trackSlug,
      timeSpentSeconds: 90,
      answers: [
        { questionId: testQ1.id, selectedAnswers: [999] }, // intentionally wrong
        { questionId: testQ2.id, selectedAnswers: [888] }  // intentionally wrong
      ]
    };

    const wrongRes = await makeRequest('/api/assessments/submit', 'POST', wrongSubmission);
    assert(wrongRes.status === 200, 'POST /api/assessments/submit with incorrect answers returns status 200');
    assert(wrongRes.data.score === 0, `Scored 0/2 for wrong answers (received ${wrongRes.data.score})`);
    assert(wrongRes.data.percentage === 0, 'Percentage is 0%');
    assert(wrongRes.data.passed === false, 'Passed status is false for 0%');
    assert(Array.isArray(wrongRes.data.recommendations) && wrongRes.data.recommendations.length > 0, 'Generated targeted improvement recommendations for failed topics');

    // 5. Malformed payload error handling
    console.log('\n--- 5. Testing Error Handling & Malformed Payloads ---');
    const badSubmitRes = await makeRequest('/api/assessments/submit', 'POST', { answers: 'not-an-array' });
    assert(badSubmitRes.status === 400, 'POST /api/assessments/submit with invalid answers array returns 400 Bad Request');
    assert(badSubmitRes.data.error !== undefined, 'Response provides descriptive error message');

    // 6. History Endpoint Auth Check
    console.log('\n--- 6. Testing History Endpoint Security ---');
    const unauthHistoryRes = await makeRequest('/api/assessments/history');
    assert(unauthHistoryRes.status === 401, 'GET /api/assessments/history without JWT token returns 401 Unauthorized');

    console.log('\n====================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Test suite failed with exception:', err);
    process.exit(1);
  }
}

runTests();
