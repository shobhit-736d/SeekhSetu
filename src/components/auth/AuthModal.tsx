import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';
import {
  Lock,
  Mail,
  User,
  Shield,
  KeyRound,
  X,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Clock,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    loginRequest,
    verifyLogin,
    registerRequest,
    verifyRegister,
    resendCode,
    loginWithGoogle,
    requestPasswordReset,
    resetPassword
  } = useAuth();
  const { showToast } = useStudy();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // OTP Verification state
  const [otpStep, setOtpStep] = useState<'none' | 'verify-register' | 'verify-login'>('none');
  const [otpCode, setOtpCode] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 minutes
  const [resendCooldown, setResendCooldown] = useState(60); // 60 seconds

  // Password reset step states
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState<'request' | 'submit'>('request');

  // UI status
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 10-minute countdown timer & resend cooldown
  useEffect(() => {
    if (otpStep === 'none') return;

    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
      setResendCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [otpStep]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setError(null);
    setOtpStep('none');
    setOtpCode('');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // STEP 1: LOGIN REQUEST (Sends code from SeekhSetu)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    setSubmitting(true);
    try {
      const res = await loginRequest(cleanEmail, password);
      setOtpStep('verify-login');
      setOtpEmail(cleanEmail);
      setOtpCode('');
      setTimerSeconds(180); // 3 minutes
      setResendCooldown(60);
      showToast(res.message || 'Verification code sent to your email.', 'info');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  // STEP 2: REGISTER REQUEST (Sends code from SeekhSetu)
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('Please fill in all registration fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please retype carefully.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    // ⚡ Instantly transition to the code entry view with zero delay!
    setOtpStep('verify-register');
    setOtpEmail(cleanEmail);
    setOtpCode('');
    setTimerSeconds(180); // 3 minutes
    setResendCooldown(60);
    setSubmitting(true);

    try {
      const res = await registerRequest(name, cleanEmail, password);
      showToast(res.message || 'Verification code sent to your email.', 'info');
    } catch (err: any) {
      setOtpStep('none');
      setError(err.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  // STEP 3: VERIFY OTP (for both register and login)
  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode || otpCode.trim().length !== 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    if (timerSeconds <= 0) {
      setError('This verification code has expired after 3 minutes. Please request a new code.');
      return;
    }

    setSubmitting(true);
    try {
      if (otpStep === 'verify-register') {
        await verifyRegister(otpEmail, otpCode.trim());
        showToast(`Welcome ${name}! Your account has been verified and created.`, 'success');
      } else {
        await verifyLogin(otpEmail, otpCode.trim());
        showToast('Verification successful! Welcome back to SeekhSetu.', 'success');
      }
      setOtpStep('none');
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setSubmitting(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    setSubmitting(true);
    try {
      const type = otpStep === 'verify-register' ? 'register' : 'login';
      const msg = await resendCode(otpEmail, type);
      setTimerSeconds(180); // Reset 3 minutes
      setResendCooldown(60);
      showToast(msg || 'A fresh verification code has been sent from SeekhSetu (seekhsetuteam@gmail.com).', 'info');
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification code.');
    } finally {
      setSubmitting(false);
    }
  };

  // GOOGLE SIGN IN
  const handleGoogleSignIn = async () => {
    setError(null);
    if (!email || !email.includes('@')) {
      setError('Please enter your Google account email address in the email field above to proceed.');
      return;
    }
    setSubmitting(true);
    try {
      const googleEmail = email.trim().toLowerCase();
      const googleName = name?.trim() || googleEmail.split('@')[0];
      await loginWithGoogle(googleEmail, googleName, `google_${Date.now()}`);
      showToast('Successfully signed in with Google!', 'success');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  // FORGOT PASSWORD
  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }

    setSubmitting(true);
    try {
      await requestPasswordReset(email);
      setResetStep('submit');
      showToast('Password reset code sent to your email. Valid for 3 minutes.', 'info');
    } catch (err: any) {
      setError(err.message || 'Failed to request password reset.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!resetCode || !newPassword) {
      setError('Please enter the reset code and your new password.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(resetCode, newPassword);
      showToast('Password reset successful! Please log in with your new password.', 'success');
      setPassword(newPassword);
      setAuthModalTab('login');
      setResetStep('request');
    } catch (err: any) {
      setError(err.message || 'Password reset failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-aurora-bg-surface border border-aurora-border shadow-2xl"
      >
        {/* Header gradient banner */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-[#FA4616]/15 via-indigo-600/10 to-transparent border-b border-aurora-border">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#FA4616]/20 border border-[#FA4616]/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FA4616]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FA4616]">
              SeekhSetu Identity & Access
            </span>
          </div>

          <h2 className="text-xl font-display font-bold text-aurora-text-primary">
            {otpStep !== 'none' && (otpStep === 'verify-register' ? 'Verify Email & Create Account' : 'Confirm Your Sign-In')}
            {otpStep === 'none' && authModalTab === 'login' && 'Sign in to your account'}
            {otpStep === 'none' && authModalTab === 'register' && 'Create student account'}
            {otpStep === 'none' && authModalTab === 'forgot' && 'Reset your account password'}
          </h2>
          <p className="text-xs text-aurora-text-secondary mt-1">
            {otpStep !== 'none' && 'Enter the 6-digit verification code sent to your email to verify your identity.'}
            {otpStep === 'none' && authModalTab === 'login' && 'A verification code will be sent to your email to confirm sign in.'}
            {otpStep === 'none' && authModalTab === 'register' && 'Every account starts with an isolated database sandbox for students.'}
            {otpStep === 'none' && authModalTab === 'forgot' && 'Recover account access securely using a verified 10-minute code.'}
          </p>

          {/* Tab selector (hidden during OTP view) */}
          {otpStep === 'none' && authModalTab !== 'forgot' && (
            <div className="flex p-1 mt-4 rounded-xl bg-aurora-bg-primary/80 border border-aurora-border">
              <button
                type="button"
                onClick={() => { setAuthModalTab('login'); setError(null); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  authModalTab === 'login'
                    ? 'bg-[#FA4616] text-white shadow-sm'
                    : 'text-aurora-text-secondary hover:text-aurora-text-primary'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthModalTab('register'); setError(null); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  authModalTab === 'register'
                    ? 'bg-[#FA4616] text-white shadow-sm'
                    : 'text-aurora-text-secondary hover:text-aurora-text-primary'
                }`}
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Error notification */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Body content based on tab / OTP state */}
        <div className="p-6">
          {/* ========================================================= */}
          {/* OTP VERIFICATION VIEW (Active for Register & Login) */}
          {/* ========================================================= */}
          {otpStep !== 'none' ? (
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
              <div className="text-center py-1">
                <p className="text-xs text-aurora-text-secondary">
                  Verification code sent to
                </p>
                <p className="text-sm font-semibold text-aurora-text-primary mt-0.5">
                  {otpEmail}
                </p>
              </div>

              {/* 3-Minute Expiry Timer Banner */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                  timerSeconds > 0
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>
                    {timerSeconds > 0
                      ? 'Code expires in:'
                      : 'Verification code has expired!'}
                  </span>
                </div>
                <div className="font-mono text-sm font-extrabold tracking-wider">
                  {timerSeconds > 0 ? formatTimer(timerSeconds) : '00:00'}
                </div>
              </div>

              {/* 6-Digit Code Input */}
              <div>
                <label className="block text-xs font-semibold text-aurora-text-secondary mb-1.5 text-center">
                  Enter 6-Digit Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    className="w-full py-3 text-center font-mono text-2xl font-extrabold tracking-[0.4em] rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary focus:border-[#FA4616] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || otpCode.length !== 6 || timerSeconds === 0}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FA4616]/20 transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <span>Verifying Code...</span>
                ) : (
                  <>
                    <span>Verify Code & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Resend & Back buttons */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setOtpStep('none');
                    setOtpCode('');
                    setError(null);
                  }}
                  className="text-aurora-text-secondary hover:text-aurora-text-primary flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back / Edit Info</span>
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={submitting || resendCooldown > 0}
                  className="text-[#FA4616] hover:underline font-semibold flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${submitting ? 'animate-spin' : ''}`} />
                  <span>
                    {resendCooldown > 0
                      ? `Resend Code (${resendCooldown}s)`
                      : 'Resend Code'}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* ========================================================= */}
              {/* TAB 1: LOGIN */}
              {/* ========================================================= */}
              {authModalTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-aurora-text-secondary mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:border-[#FA4616] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-aurora-text-secondary">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => { setAuthModalTab('forgot'); setError(null); }}
                        className="text-[11px] text-[#FA4616] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:border-[#FA4616] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FA4616]/20 transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Verification Code...</span>
                    ) : (
                      <>
                        <span>Sign In with Verification</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-aurora-border" />
                    </div>
                    <span className="relative px-3 bg-aurora-bg-surface text-[11px] uppercase tracking-wider text-aurora-text-secondary">
                      or continue with
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={submitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </form>
              )}

              {/* ========================================================= */}
              {/* TAB 2: REGISTER (STUDENT ONLY) */}
              {/* ========================================================= */}
              {authModalTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-aurora-text-secondary mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:border-[#FA4616] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-aurora-text-secondary mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:border-[#FA4616] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-aurora-text-secondary mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:border-[#FA4616] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-aurora-text-secondary mb-1">
                        Confirm
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:border-[#FA4616] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FA4616]/20 transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Verification Code...</span>
                    ) : (
                      <>
                        <span>Send Email Verification Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="relative my-3 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-aurora-border" />
                    </div>
                    <span className="relative px-3 bg-aurora-bg-surface text-[11px] uppercase tracking-wider text-aurora-text-secondary">
                      or continue with
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={submitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </form>
              )}

              {/* ========================================================= */}
              {/* TAB 3: FORGOT PASSWORD */}
              {/* ========================================================= */}
              {authModalTab === 'forgot' && (
                <div>
                  <button
                    type="button"
                    onClick={() => { setAuthModalTab('login'); setError(null); setResetStep('request'); }}
                    className="text-xs text-[#FA4616] hover:underline flex items-center gap-1 mb-4"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to sign in</span>
                  </button>

                  {resetStep === 'request' ? (
                    <form onSubmit={handleForgotPasswordRequest} className="space-y-4">
                      <p className="text-xs text-aurora-text-secondary leading-relaxed">
                        Enter your registered email address. SeekhSetu (seekhsetuteam@gmail.com) will send a 6-digit code valid for 3 minutes to reset your password.
                      </p>

                      <div>
                        <label className="block text-xs font-semibold text-aurora-text-secondary mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary focus:border-[#FA4616] focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      >
                        {submitting ? 'Sending Reset Code...' : 'Send 3-Minute Reset Code'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-aurora-text-secondary mb-1">
                          Reset Code (Valid for 3 minutes)
                        </label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                          <input
                            type="text"
                            required
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary font-mono focus:border-[#FA4616] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-aurora-text-secondary mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 w-4 h-4 text-aurora-text-secondary" />
                          <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-primary focus:border-[#FA4616] focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      >
                        {submitting ? 'Updating Password...' : 'Save New Password & Sign In'}
                      </button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setResetStep('request')}
                          className="text-xs text-aurora-text-secondary hover:text-aurora-text-primary underline"
                        >
                          Request another code
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
