import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';
import {
  User,
  Mail,
  Shield,
  Copy,
  Check,
  Lock,
  LogOut,
  X,
  Flame,
  Award,
  KeyRound
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { user, isProfileModalOpen, setIsProfileModalOpen, logout } = useAuth();
  const { showToast, studyStreakDays, completedTopicsCount } = useStudy();

  const [copiedId, setCopiedId] = useState(false);

  if (!isProfileModalOpen || !user) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    showToast('User ID copied to clipboard', 'info');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-aurora-bg-surface border border-aurora-border shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-600/15 via-[#FA4616]/10 to-transparent border-b border-aurora-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FA4616] to-amber-500 text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-[#FA4616]/20">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-aurora-text-primary flex items-center gap-2">
                <span>{user.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  user.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {user.role}
                </span>
              </h2>
              <p className="text-xs text-aurora-text-secondary">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 rounded-xl text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Identity ID pill */}
          <div className="p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-aurora-text-secondary font-semibold">Unique Database User ID</span>
              <button
                onClick={handleCopyId}
                className="flex items-center gap-1 text-[#FA4616] hover:underline font-mono text-[11px]"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-aurora-text-primary select-all break-all bg-aurora-bg-surface p-2 rounded-lg border border-aurora-border/60">
              {user.id}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-aurora-text-primary">{studyStreakDays} Days</div>
                <div className="text-[11px] text-aurora-text-secondary">Study Streak</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-aurora-text-primary">{completedTopicsCount} Topics</div>
                <div className="text-[11px] text-aurora-text-secondary">Mastered & Solved</div>
              </div>
            </div>
          </div>

          {/* Google Authentication & Security Section */}
          <div className="p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#FA4616]" />
                <span>Authentication & Security</span>
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Check className="w-3 h-3" />
                Google Verified
              </span>
            </div>

            <div className="p-3 rounded-lg bg-aurora-bg-surface border border-aurora-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <div>
                  <div className="text-xs font-semibold text-aurora-text-primary">Google Single Sign-On (SSO)</div>
                  <div className="text-[11px] text-aurora-text-secondary">{user.email}</div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-aurora-text-secondary leading-relaxed">
              Your account is secured exclusively via Google identity verification. Security settings and 2-step verification are managed directly through your Google Account.
            </p>
          </div>

          {/* Logout Action */}
          <div className="pt-2 flex justify-between items-center border-t border-aurora-border">
            <span className="text-xs text-aurora-text-secondary">
              End this session on this device
            </span>
            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold text-xs flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
