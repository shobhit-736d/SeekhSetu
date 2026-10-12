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
  const { user, isProfileModalOpen, setIsProfileModalOpen, logout, changePassword, updateProfile } = useAuth();
  const { showToast, studyStreakDays, completedTopicsCount } = useStudy();

  const [copiedId, setCopiedId] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPw, setChangingPw] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  if (!isProfileModalOpen || !user) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    showToast('User ID copied to clipboard', 'info');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (!currentPassword || !newPassword) {
      setPwError('Please fill in both current and new passwords.');
      return;
    }
    if (newPassword.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }

    setChangingPw(true);
    try {
      await changePassword(currentPassword, newPassword);
      showToast('Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPwError(err.message || 'Failed to change password.');
    } finally {
      setChangingPw(false);
    }
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

          {/* Change Password Section */}
          <div className="p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary mb-3 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#FA4616]" />
              <span>Security & Password</span>
            </h3>

            {pwError && (
              <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-[11px] text-red-400">
                {pwError}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-aurora-text-secondary mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-1.5 rounded-lg bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary focus:border-[#FA4616] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-aurora-text-secondary mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-1.5 rounded-lg bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary focus:border-[#FA4616] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={changingPw}
                className="py-1.5 px-4 rounded-lg bg-aurora-bg-surface hover:bg-aurora-bg-primary border border-aurora-border text-xs font-semibold text-aurora-text-primary transition-colors disabled:opacity-50"
              >
                {changingPw ? 'Updating...' : 'Update Password'}
              </button>
            </form>
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
