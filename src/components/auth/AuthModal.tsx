import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';
import {
  Shield,
  X,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Link2,
  Info
} from 'lucide-react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          prompt: (notification?: any) => void;
          cancel: () => void;
        };
      };
    };
  }
}

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    loginWithGoogle
  } = useAuth();
  const { showToast } = useStudy();

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);

  // Secure account linking state
  const [linkingState, setLinkingState] = useState<{
    email: string;
    name?: string;
    idToken: string;
  } | null>(null);

  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Read Google Client ID from Vite env
  const googleClientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '';
  const isDev = (import.meta as any).env?.DEV;

  // Reset state on close
  const handleClose = () => {
    setIsAuthModalOpen(false);
    setError(null);
    setLinkingState(null);
  };

  // Submit verified Google token to backend
  const handleGoogleTokenSubmit = async (idToken: string, confirmLink = false) => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await loginWithGoogle(idToken, confirmLink);

      if (res.requiresLinkingConfirmation) {
        // Backend securely requires explicit confirmation before linking
        setLinkingState({
          email: res.email || '',
          name: res.name || '',
          idToken
        });
        return;
      }

      if (res.isNewUser) {
        showToast('Welcome to SeekhSetu! Your student workspace is ready.', 'success');
      } else if (res.linked) {
        showToast('Google account successfully linked! Study history preserved.', 'success');
      } else {
        showToast('Signed in successfully! Welcome back to SeekhSetu.', 'success');
      }

      setLinkingState(null);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Google authentication failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Initialize Google Identity Services (GIS)
  useEffect(() => {
    if (!isAuthModalOpen) return;

    let checkInterval: any = null;

    const initGIS = () => {
      if (window.google?.accounts?.id && googleClientId) {
        setGisLoaded(true);

        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: (response: { credential?: string }) => {
              if (response?.credential) {
                handleGoogleTokenSubmit(response.credential);
              } else {
                setError('Google did not return credentials. Please try again.');
              }
            },
            auto_select: false,
            cancel_on_tap_outside: true
          });

          if (googleButtonRef.current) {
            googleButtonRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(googleButtonRef.current, {
              type: 'standard',
              theme: 'filled_black',
              size: 'large',
              text: 'continue_with',
              shape: 'rectangular',
              logo_alignment: 'left',
              width: 320
            });
          }
        } catch (err: any) {
          console.warn('Google Identity Services initialization warning:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGIS();
    } else {
      // Poll briefly if script is still loading asynchronously
      let retries = 0;
      checkInterval = setInterval(() => {
        retries++;
        if (window.google?.accounts?.id) {
          clearInterval(checkInterval);
          initGIS();
        } else if (retries > 25) {
          clearInterval(checkInterval);
        }
      }, 150);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [isAuthModalOpen, googleClientId, authModalTab, linkingState]);

  // Click handler for prominent button
  const triggerGoogleSignIn = () => {
    setError(null);

    // 1. If Google GIS rendered iframe button is present, trigger click on it
    if (googleButtonRef.current) {
      const iframeBtn = googleButtonRef.current.querySelector('div[role="button"]') as HTMLElement | null;
      if (iframeBtn) {
        iframeBtn.click();
        return;
      }
    }

    // 2. Fallback to GIS prompt()
    if (window.google?.accounts?.id && googleClientId) {
      try {
        window.google.accounts.id.prompt();
        return;
      } catch (err) {
        console.warn('GIS prompt error:', err);
      }
    }

    // 3. If no client ID configured yet
    if (!googleClientId) {
      setError(
        'Google OAuth Client ID is not configured. Please add VITE_GOOGLE_CLIENT_ID to your .env file or Render environment variables.'
      );
    }
  };

  // Dev test login simulation (for automated tests and rapid local dev when no Google Client ID is configured yet)
  const handleDevTestLogin = async () => {
    const mockEmail = authModalTab === 'register' 
      ? `student_${Date.now()}@example.com` 
      : 'student@example.com';
    const mockSub = `test_google_sub_${authModalTab === 'register' ? Date.now() : 'default_12345'}`;
    const mockToken = `test-mock-token:${JSON.stringify({
      sub: mockSub,
      email: mockEmail,
      name: 'Test Student',
      email_verified: true,
      iss: 'accounts.google.com'
    })}`;

    await handleGoogleTokenSubmit(mockToken);
  };

  if (!isAuthModalOpen) return null;

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
            aria-label="Close authentication modal"
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
            {linkingState
              ? 'Confirm Account Linking'
              : authModalTab === 'login'
              ? 'Sign in to your account'
              : 'Create student account'}
          </h2>
          <p className="text-xs text-aurora-text-secondary mt-1">
            {linkingState
              ? 'Merge your Google sign-in with your existing SeekhSetu profile.'
              : authModalTab === 'login'
              ? 'Continue your 30-day placement preparation journey with 1-click Google Sign-In.'
              : 'Start preparing with private database sandbox isolation and full interview prep.'}
          </p>

          {/* Tab selector (Sign In vs Register) - Hidden during account linking */}
          {!linkingState && (
            <div className="flex p-1 mt-4 rounded-xl bg-aurora-bg-primary/80 border border-aurora-border">
              <button
                type="button"
                onClick={() => {
                  setAuthModalTab('login');
                  setError(null);
                }}
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
                onClick={() => {
                  setAuthModalTab('register');
                  setError(null);
                }}
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
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* Body content */}
        <div className="p-6">
          {linkingState ? (
            /* ========================================================= */
            /* ACCOUNT LINKING CONFIRMATION STEP                         */
            /* ========================================================= */
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
                <Link2 className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <div className="leading-relaxed">
                  An existing SeekhSetu profile was found for{' '}
                  <strong className="text-white">{linkingState.email}</strong>.
                  Confirm linking to securely attach your Google account and retain all your completed topics, coding submissions, and study streaks.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border space-y-2">
                <div className="text-xs text-aurora-text-secondary">Account to Link:</div>
                <div className="text-sm font-semibold text-aurora-text-primary">
                  {linkingState.email}
                </div>
                {linkingState.name && (
                  <div className="text-xs text-aurora-text-secondary">
                    Profile: {linkingState.name}
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setLinkingState(null)}
                  disabled={submitting}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleGoogleTokenSubmit(linkingState.idToken, true)}
                  disabled={submitting}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white text-xs font-semibold shadow-lg shadow-[#FA4616]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {submitting ? 'Linking Account...' : 'Confirm & Link'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* EXCLUSIVE GOOGLE SIGN-IN / REGISTER                       */
            /* ========================================================= */
            <div className="space-y-5">
              {/* Context Callout */}
              <div className="p-3.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#FA4616]" />
                </div>
                <div className="text-xs text-aurora-text-secondary leading-relaxed">
                  {authModalTab === 'register' ? (
                    <span>
                      <strong className="text-aurora-text-primary">Fast & Passwordless:</strong> One click creates your private student account, initial quiz progress, and resume history.
                    </span>
                  ) : (
                    <span>
                      <strong className="text-aurora-text-primary">Seamless Access:</strong> Sign in with Google to resume your practice tests, roadmap progress, and AI coaching sessions.
                    </span>
                  )}
                </div>
              </div>

              {/* Prominent Continue with Google Button */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={triggerGoogleSignIn}
                  disabled={submitting}
                  className="w-full py-3 px-4 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border-2 border-aurora-border hover:border-[#FA4616]/50 text-aurora-text-primary text-sm font-semibold flex items-center justify-center gap-3 shadow-lg shadow-black/20 hover:shadow-xl transition-all cursor-pointer group disabled:opacity-50"
                >
                  <svg className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
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
                  <span>{submitting ? 'Authenticating with Google...' : 'Continue with Google'}</span>
                </button>

                {/* Google Identity Services Hidden/Inline Mount Container */}
                <div
                  ref={googleButtonRef}
                  className="flex justify-center overflow-hidden h-0 opacity-0 pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Informative Missing Client ID Banner & Dev Bypass */}
              {!googleClientId && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-2">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
                    <span>
                      <strong>Setup Note:</strong> Configure <code className="px-1 py-0.5 rounded bg-blue-900/40 text-blue-200">VITE_GOOGLE_CLIENT_ID</code> in your <code className="text-white">.env</code> to connect live Google Cloud credentials.
                    </span>
                  </div>
                  {isDev && (
                    <button
                      type="button"
                      onClick={handleDevTestLogin}
                      disabled={submitting}
                      className="w-full py-2 px-3 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                      <span>{authModalTab === 'register' ? 'Simulate New User Registration (Dev)' : 'Simulate Existing User Login (Dev)'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Security Trust Badges */}
              <div className="pt-2 border-t border-aurora-border/60 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-aurora-text-secondary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Google verified identity with token signature check</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-aurora-text-secondary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Isolated MongoDB Atlas sandbox for your study data</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-aurora-text-secondary">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Encrypted 7-day session token — zero passwords stored</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
