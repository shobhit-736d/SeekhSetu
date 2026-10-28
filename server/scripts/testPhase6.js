// server/scripts/testPhase6.js
// Automated verification test suite for Phase 6: Career Tools, Multi-Track Resume Preparation & Job Readiness Ecosystem

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
  console.log('🚀 RUNNING PHASE 6 TEST SUITE: CERTIFICATIONS, JOBS & READINESS');
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
    // -------------------------------------------------------------
    // 1. INDUSTRY CERTIFICATIONS GUIDE API & VERIFIED CREDENTIALS
    // -------------------------------------------------------------
    console.log('--- 1. Testing Industry Certifications Guide API ---');
    const allCertsRes = await makeRequest('/api/careers/certifications');
    assert(allCertsRes.status === 200, 'GET /api/careers/certifications returns status 200');
    assert(Array.isArray(allCertsRes.data), 'Certifications response is an array');
    assert(allCertsRes.data.length >= 15, `Contains at least 15 verified credentials (found ${allCertsRes.data.length})`);

    // 1a. Filter by trackSlug
    const cloudCertsRes = await makeRequest('/api/careers/certifications?track=cloud-computing');
    assert(cloudCertsRes.status === 200, 'Filtering by track=cloud-computing returns status 200');
    assert(cloudCertsRes.data.length > 0 && cloudCertsRes.data.every(c => c.trackSlug === 'cloud-computing'), 'All returned certs match cloud-computing');

    // 1b. Filter by issuer
    const awsCertsRes = await makeRequest('/api/careers/certifications?issuer=Amazon Web Services');
    assert(awsCertsRes.status === 200, 'Filtering by issuer=Amazon Web Services returns status 200');
    assert(awsCertsRes.data.length >= 2, 'Found at least 2 AWS certifications');

    // 1c. Filter by level
    const assocCertsRes = await makeRequest('/api/careers/certifications?level=Associate');
    assert(assocCertsRes.status === 200, 'Filtering by level=Associate returns status 200');
    assert(assocCertsRes.data.length > 0 && assocCertsRes.data.every(c => c.level === 'Associate'), 'All returned certs have level Associate');

    // 1d. Search query
    const searchCertRes = await makeRequest('/api/careers/certifications?search=Kubernetes');
    assert(searchCertRes.status === 200, 'Searching for "Kubernetes" returns status 200');
    assert(searchCertRes.data.length > 0, 'Search for "Kubernetes" returned CKA / CNCF credential');

    // 1e. Pedagogy & Domain Weights Completeness Check
    console.log('\n--- 2. Testing Certification Curriculum & Official Domain Weights ---');
    const sampleCert = allCertsRes.data.find(c => c.code === 'SAA-C03') || allCertsRes.data[0];
    assert(Array.isArray(sampleCert.domains) && sampleCert.domains.length >= 3, 'Certification includes structured exam domains');
    
    const domainWeightSum = sampleCert.domains.reduce((acc, d) => acc + (d.weightPercentage || 0), 0);
    assert(domainWeightSum === 100, `Domain weights correctly sum to 100% (sum=${domainWeightSum}%)`);

    assert(typeof sampleCert.officialUrl === 'string' && sampleCert.officialUrl.startsWith('https://'), 'Includes HTTPS official vendor exam URL');
    assert(typeof sampleCert.officialFreeStudyGuideUrl === 'string' && sampleCert.officialFreeStudyGuideUrl.startsWith('https://'), 'Includes official vendor exam guide PDF URL');
    assert(typeof sampleCert.durationMinutes === 'number' && sampleCert.durationMinutes > 0, 'Includes official exam duration in minutes');
    assert(typeof sampleCert.costUsd === 'number' && sampleCert.costUsd >= 0, 'Includes authentic registration fee in USD');

    // -------------------------------------------------------------
    // 2. VERIFIED OPPORTUNITIES BOARD & ANTI-FABRICATION AUDIT
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Verified Opportunities Board & Anti-Fabrication Audit ---');
    const allJobsRes = await makeRequest('/api/careers/jobs');
    assert(allJobsRes.status === 200, 'GET /api/careers/jobs returns status 200');
    assert(Array.isArray(allJobsRes.data), 'Jobs response is an array');
    assert(allJobsRes.data.length >= 12, `Contains at least 12 authentic campus/fresher hiring drives (found ${allJobsRes.data.length})`);

    // 2a. Filter by track
    const fullstackJobsRes = await makeRequest('/api/careers/jobs?track=fullstack-web');
    assert(fullstackJobsRes.status === 200, 'Filtering by track=fullstack-web returns status 200');
    assert(fullstackJobsRes.data.length > 0 && fullstackJobsRes.data.every(j => j.trackSlug === 'fullstack-web'), 'All returned jobs match fullstack-web');

    // 2b. Filter by workplaceType
    const hybridJobsRes = await makeRequest('/api/careers/jobs?workplaceType=Hybrid');
    assert(hybridJobsRes.status === 200, 'Filtering by workplaceType=Hybrid returns status 200');
    assert(hybridJobsRes.data.length > 0 && hybridJobsRes.data.every(j => j.workplaceType === 'Hybrid'), 'All returned jobs have workplaceType Hybrid');

    // 2c. Search query
    const tcsSearchRes = await makeRequest('/api/careers/jobs?search=TCS');
    assert(tcsSearchRes.status === 200, 'Searching for "TCS" returns status 200');
    assert(tcsSearchRes.data.length > 0, 'Search for "TCS" returns TCS NQT / Ninja Digital drive');

    // 2d. Anti-Fabrication Domain Whitelist Verification
    console.log('\n--- 4. Anti-Fabrication Audit: Direct Career Portal URLs ---');
    const allowedCompanyDomains = [
      'tcs.com',
      'infosys.com',
      'amazon.jobs',
      'microsoft.com',
      'google.com',
      'accenture.com',
      'cognizant.com',
      'wipro.com',
      'myworkdayjobs.com',
      'cisco.com',
      'ibm.com',
      'capgemini.com'
    ];

    let allUrlsVerified = true;
    for (const job of allJobsRes.data) {
      assert(job.isVerified === true, `Job [${job.company}] has isVerified=true`);
      assert(Array.isArray(job.selectionProcess) && job.selectionProcess.length >= 2, `Job [${job.company}] specifies official selection process stages`);
      assert(Array.isArray(job.batchesEligible) && job.batchesEligible.length > 0, `Job [${job.company}] specifies eligible graduating batches`);

      const hasOfficialDomain = allowedCompanyDomains.some(domain => job.directApplyUrl && job.directApplyUrl.includes(domain));
      if (!hasOfficialDomain) {
        allUrlsVerified = false;
        console.error(`  ❌ Suspicious URL for ${job.company}: ${job.directApplyUrl}`);
      }
    }
    assert(allUrlsVerified, 'All 12 hiring opportunities point directly to authentic corporate career portals (0 fake scrapers)');

    // -------------------------------------------------------------
    // 3. IN-APP APPLICATION TRACKER ENDPOINTS & USER SYNC
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Application Tracker & Authentication Guard ---');
    // 3a. Unauthenticated check
    const unauthTrackerRes = await makeRequest('/api/careers/my-applications');
    assert(unauthTrackerRes.status === 401, 'GET /api/careers/my-applications without JWT returns 401 Unauthorized');

    const unauthSaveRes = await makeRequest('/api/careers/track-application', 'POST', {
      title: 'Software Development Engineer',
      company: 'Amazon'
    });
    assert(unauthSaveRes.status === 401, 'POST /api/careers/track-application without JWT returns 401 Unauthorized');

    // 3b. Authenticate with test student user via Google Auth test token
    console.log('\n--- 6. Testing Authenticated Application Tracking Lifecycle ---');
    const testSubNew = `test_phase6_${Date.now()}`;
    const testEmailNew = `student_phase6_${Date.now()}@testseekhsetu.com`;
    const mockToken = `test-mock-token:${JSON.stringify({
      sub: testSubNew,
      email: testEmailNew,
      name: 'Phase 6 Test Student',
      avatar: 'https://lh3.googleusercontent.com/test_avatar.jpg',
      email_verified: true,
      iss: 'accounts.google.com',
      aud: 'mock-client-id',
      exp: Math.floor(Date.now() / 1000) + 3600
    })}`;

    const authRes = await makeRequest('/api/auth/google-auth', 'POST', { idToken: mockToken });
    let token = null;
    if ((authRes.status === 200 || authRes.status === 201) && authRes.data.token) {
      token = authRes.data.token;
      assert(true, 'Test student authenticated successfully via Google Auth (JWT obtained)');
    } else {
      assert(false, `Google auth failed: ${authRes.status} ${JSON.stringify(authRes.data)}`);
    }

    if (token) {
      const authHeaders = { Authorization: `Bearer ${token}` };

      // Step 1: Track an application (Wishlist -> Applied)
      const testJob = allJobsRes.data[0];
      const createPayload = {
        jobId: testJob.id,
        title: testJob.title,
        company: testJob.company,
        location: testJob.location,
        workplaceType: testJob.workplaceType,
        status: 'Applied',
        notes: 'Submitted via official portal on Day 1.',
        directApplyUrl: testJob.directApplyUrl
      };

      const trackRes = await makeRequest('/api/careers/track-application', 'POST', createPayload, authHeaders);
      assert(trackRes.status === 200, 'POST /api/careers/track-application returns status 200');
      assert(Array.isArray(trackRes.data.applications), 'Returns updated applications array');

      const savedApp = trackRes.data.applications.find(a => a.company === testJob.company);
      assert(savedApp && savedApp.status === 'Applied', 'Application status saved as "Applied"');

      // Step 2: Fetch my applications
      const getMyAppsRes = await makeRequest('/api/careers/my-applications', 'GET', null, authHeaders);
      assert(getMyAppsRes.status === 200, 'GET /api/careers/my-applications returns status 200');
      assert(Array.isArray(getMyAppsRes.data) && getMyAppsRes.data.some(a => a.company === testJob.company), 'Tracked application retrieved from MongoDB');

      // Step 3: Update status to "Online Assessment"
      const updatePayload = {
        ...createPayload,
        status: 'Online Assessment',
        notes: 'Received OA link. Scheduled for Friday.'
      };
      const updateRes = await makeRequest('/api/careers/track-application', 'POST', updatePayload, authHeaders);
      assert(updateRes.status === 200, 'Updating application returns status 200');
      const updatedApp = updateRes.data.applications.find(a => a.company === testJob.company);
      assert(updatedApp && updatedApp.status === 'Online Assessment', 'Application status advanced to "Online Assessment"');

      // Step 4: Delete the test application
      const deleteRes = await makeRequest(`/api/careers/my-applications/${savedApp.id || savedApp._id}`, 'DELETE', null, authHeaders);
      assert(deleteRes.status === 200, 'DELETE /api/careers/my-applications/:appId returns status 200');

      // Verify deletion
      const postDeleteRes = await makeRequest('/api/careers/my-applications', 'GET', null, authHeaders);
      const stillExists = postDeleteRes.data.some(a => a.id === savedApp.id);
      assert(!stillExists, 'Application successfully purged from user profile');
    } else {
      console.warn('  ⚠️ Skipping authenticated tracking test (Unable to obtain test JWT)');
    }

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
