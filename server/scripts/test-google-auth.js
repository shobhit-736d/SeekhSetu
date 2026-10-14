import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { UserProgress } from '../models/UserProgress.js';

dotenv.config();

const API_BASE = 'http://localhost:5000/api';

async function runTestSuite() {
  console.log('====================================================');
  console.log('🧪 RUNNING SEEKHSETU EXCLUSIVE GOOGLE AUTH TEST SUITE');
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
    await mongoose.connect(process.env.MONGODB_URI);
    // 1. Check server health
    const healthRes = await fetch(`${API_BASE}/health`);
    assert(healthRes.ok, 'Backend server is running and healthy');

    // 2. TEST: Invalid Tokens Rejected
    console.log('\n--- 1. Testing Invalid Google ID Tokens ---');
    
    // 2a. Missing token
    const missingRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert(missingRes.status === 400, 'Rejects missing idToken with status 400');

    // 2b. Malformed token
    const malformedRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: 'malformed_invalid_jwt_token_xyz' })
    });
    assert(malformedRes.status === 401, 'Rejects malformed Google token with status 401');

    // 2c. Token with invalid signature
    const invalidSigToken = `test-mock-token:${JSON.stringify({
      sub: 'test_sub_invalid_sig',
      email: 'hacker@example.com',
      signatureValid: false
    })}`;
    const invalidSigRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: invalidSigToken })
    });
    assert(invalidSigRes.status === 401, 'Rejects token with invalid signature');

    // 2d. Expired token
    const expiredToken = `test-mock-token:${JSON.stringify({
      sub: 'test_sub_expired',
      email: 'expired@example.com',
      exp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
      email_verified: true
    })}`;
    const expiredRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: expiredToken })
    });
    assert(expiredRes.status === 401, 'Rejects expired Google token');

    // 2e. Unverified email
    const unverifiedEmailToken = `test-mock-token:${JSON.stringify({
      sub: 'test_sub_unverified',
      email: 'unverified@example.com',
      email_verified: false
    })}`;
    const unverifiedRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: unverifiedEmailToken })
    });
    assert(unverifiedRes.status === 401, 'Rejects Google account with unverified email');

    // 2f. Invalid Issuer
    const wrongIssuerToken = `test-mock-token:${JSON.stringify({
      sub: 'test_sub_wrong_iss',
      email: 'wrongiss@example.com',
      email_verified: true,
      iss: 'rogue-issuer.com'
    })}`;
    const wrongIssuerRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: wrongIssuerToken })
    });
    assert(wrongIssuerRes.status === 401, 'Rejects Google token with invalid issuer');

    // 3. TEST: New User Registration via Google
    console.log('\n--- 2. Testing New User Registration via Google ---');
    const testSubNew = `test_google_sub_${Date.now()}`;
    const testEmailNew = `student_${Date.now()}@testseekhsetu.com`;
    const testNameNew = 'Ananya Sharma';
    const testAvatarNew = 'https://lh3.googleusercontent.com/test_avatar.jpg';

    const validNewUserToken = `test-mock-token:${JSON.stringify({
      sub: testSubNew,
      email: testEmailNew,
      name: testNameNew,
      avatar: testAvatarNew,
      email_verified: true,
      iss: 'https://accounts.google.com'
    })}`;

    const newRegisterRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: validNewUserToken })
    });
    const newRegisterData = await newRegisterRes.json();

    assert(newRegisterRes.status === 201, 'New user successfully created with status 201');
    assert(newRegisterData.isNewUser === true, 'Response flags isNewUser: true');
    assert(!!newRegisterData.token, 'Returns valid JWT token');
    assert(newRegisterData.user.email === testEmailNew, 'User email matches token email');
    assert(newRegisterData.user.name === testNameNew, 'User name correctly populated');
    assert(newRegisterData.user.role === 'student', 'User role strictly assigned as student');

    const newUserJwt = newRegisterData.token;
    const newUserId = newRegisterData.user.id;

    // Verify DB persistence of User and UserProgress
    const savedUser = await User.findById(newUserId);
    assert(!!savedUser, 'User record verified in MongoDB');
    assert(savedUser.googleId === testSubNew, 'User googleId correctly stores Google sub identifier');
    assert(savedUser.passwordHash === null || savedUser.passwordHash === undefined, 'No password stored for Google user');

    const savedProgress = await UserProgress.findOne({ userId: newUserId });
    assert(!!savedProgress, 'Isolated UserProgress document created for new user in MongoDB');

    // 4. TEST: Returning User Login (Same Google Account)
    console.log('\n--- 3. Testing Returning User Login (Idempotent, No Duplicate) ---');
    const returningLoginRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: validNewUserToken })
    });
    const returningLoginData = await returningLoginRes.json();

    assert(returningLoginRes.status === 200, 'Returning user login succeeds with status 200');
    assert(returningLoginData.isNewUser === false, 'Response correctly flags isNewUser: false');
    assert(returningLoginData.user.id === newUserId, 'Authenticated same existing account ID (no duplicate)');

    // Count users in DB with this sub
    const countWithSub = await User.countDocuments({ googleId: testSubNew });
    assert(countWithSub === 1, 'Exactly 1 user document exists in MongoDB (no duplicates created)');

    // 5. TEST: Protected Routes Access
    console.log('\n--- 4. Testing Protected Routes & Session Handling ---');
    
    // 5a. Access with valid JWT
    const meRes = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${newUserJwt}` }
    });
    assert(meRes.ok, 'Protected /api/auth/me accessible with valid JWT session token');
    const meData = await meRes.json();
    assert(meData.id === newUserId, 'Profile matches authenticated user');

    // 5b. Access with progress route
    const progressRes = await fetch(`${API_BASE}/progress`, {
      headers: { 'Authorization': `Bearer ${newUserJwt}` }
    });
    assert(progressRes.ok, 'Protected /api/progress accessible with user JWT');

    // 5c. Access without token -> blocked
    const unauthRes = await fetch(`${API_BASE}/auth/me`);
    assert(unauthRes.status === 401, 'Access denied without token (status 401)');

    // 5d. Access with bad token -> blocked
    const badTokenRes = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': 'Bearer bad_invalid_token' }
    });
    assert(badTokenRes.status === 403 || badTokenRes.status === 401, 'Access denied with invalid token');

    // 6. TEST: Secure Account Linking (Existing Email Without Google ID)
    console.log('\n--- 5. Testing Secure Account Linking ---');
    const linkEmail = `legacy_user_${Date.now()}@testseekhsetu.com`;
    const linkSub = `google_sub_for_link_${Date.now()}`;

    // Create a legacy user in DB (simulating legacy user without googleId)
    const legacyUser = new User({
      name: 'Legacy User',
      email: linkEmail,
      role: 'student',
      streakDays: 5,
      lastActiveDate: new Date()
    });
    await legacyUser.save();
    console.log(`  ℹ️ Created pre-existing user without googleId: ${linkEmail}`);

    const linkToken = `test-mock-token:${JSON.stringify({
      sub: linkSub,
      email: linkEmail,
      name: 'Legacy User Google',
      email_verified: true,
      iss: 'accounts.google.com'
    })}`;

    // 6a. Attempt sign in WITHOUT confirmLink -> must NOT automatically link!
    const unconfirmedLinkRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: linkToken })
    });
    const unconfirmedLinkData = await unconfirmedLinkRes.json();
    assert(unconfirmedLinkData.requiresLinkingConfirmation === true, 'Does NOT automatically link; requests explicit confirmation');
    assert(unconfirmedLinkData.email === linkEmail, 'Confirmation contains email to be linked');

    // Check DB: verify googleId is still untouched
    const userBeforeConfirm = await User.findById(legacyUser._id);
    assert(!userBeforeConfirm.googleId, 'googleId was NOT modified before confirmation');

    // 6b. Confirm account linking
    const confirmedLinkRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: linkToken, confirmLink: true })
    });
    const confirmedLinkData = await confirmedLinkRes.json();
    assert(confirmedLinkRes.status === 200, 'Linking confirmation succeeds with status 200');
    assert(confirmedLinkData.linked === true, 'Response flags linked: true');
    assert(confirmedLinkData.user.id === legacyUser._id.toString(), 'Linked to the exact existing legacy account');
    assert(confirmedLinkData.user.streakDays === 5, 'Preserved previous study streak of 5 days');

    // Check DB: googleId is now securely attached to legacy user
    const userAfterConfirm = await User.findById(legacyUser._id);
    assert(userAfterConfirm.googleId === linkSub, 'Legacy user in MongoDB now has the verified Google sub ID');

    // 6c. Now subsequent sign in with this sub resolves immediately without prompt
    const returningLinkedRes = await fetch(`${API_BASE}/auth/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: linkToken })
    });
    const returningLinkedData = await returningLinkedRes.json();
    assert(returningLinkedData.isNewUser === false, 'Subsequent login resolves existing linked account directly');

    // 7. TEST: Retired Legacy Endpoints
    console.log('\n--- 6. Testing Retired Legacy Auth Endpoints ---');
    const retiredEndpoints = [
      { path: '/auth/register-request', body: { name: 'Test', email: 'test@test.com', password: 'password123' } },
      { path: '/auth/login-request', body: { email: 'test@test.com', password: 'password123' } },
      { path: '/auth/verify-register', body: { email: 'test@test.com', code: '123456' } },
      { path: '/auth/verify-login', body: { email: 'test@test.com', code: '123456' } },
      { path: '/auth/forgot-password', body: { email: 'test@test.com' } },
      { path: '/auth/reset-password', body: { token: '123456', newPassword: 'password123' } },
      { path: '/auth/register', body: {} },
      { path: '/auth/login', body: {} }
    ];

    for (const ep of retiredEndpoints) {
      const res = await fetch(`${API_BASE}${ep.path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ep.body)
      });
      const data = await res.json();
      assert(res.status === 400, `Legacy endpoint ${ep.path} returns 400 Retired`);
      assert(data.error.includes('Google Sign-In'), `${ep.path} response directs users to Google Sign-In`);
    }

    // Clean up test users
    console.log('\n--- 7. Cleanup Test Records ---');
    await User.deleteOne({ _id: newUserId });
    await UserProgress.deleteOne({ userId: newUserId });
    await User.deleteOne({ _id: legacyUser._id });
    await UserProgress.deleteOne({ userId: legacyUser._id });
    console.log('  🧹 Cleaned up temporary test users and progress records');

    console.log('\n====================================================');
    console.log(`🎉 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

  } catch (err) {
    console.error('Fatal test error:', err);
    failed++;
  } finally {
    await mongoose.disconnect().catch(() => {});
    process.exit(failed === 0 ? 0 : 1);
  }
}

runTestSuite();
