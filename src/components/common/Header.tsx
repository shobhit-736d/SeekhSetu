import React, { useState } from 'react';
import {
  Search,
  Timer,
  Flame,
  Sun,
  Moon,
  Database,
  Download,
  RotateCcw,
  Menu,
  X,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Copy,
  Check,
  Sparkles,
  Settings
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { exportUserStorageJSON } from '../../services/storageService';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const {
    timerState,
    setActiveTab,
    studyStreakDays,
    theme,
    toggleTheme,
    resetAllData,
    showToast
  } = useStudy();

  const {
    user,
    isAuthenticated,
    logout,
    setIsAuthModalOpen,
    setAuthModalTab,
    setIsProfileModalOpen,
    setIsAdminModalOpen
  } = useAuth();

  const [dataMenuOpen, setDataMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingSeconds = Math.max(0, timerState.targetMinutes * 60 - timerState.elapsedSeconds);

  const handleExportData = () => {
    const jsonStr = exportUserStorageJSON(user?.id);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seekhsetu-${user ? user.name.replace(/\s+/g, '_') : 'user'}-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Personal data exported as JSON backup', 'success');
    setDataMenuOpen(false);
  };

  const handleResetConfirm = () => {
    if (window.confirm('Are you sure you want to reset your personal study progress, sessions, and bookmarks? This cannot be undone.')) {
      resetAllData();
      setDataMenuOpen(false);
    }
  };

  const handleCopyId = () => {
    if (!user) return;
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    showToast('User ID copied to clipboard', 'info');
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-aurora-border bg-aurora-bg-primary/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity with Custom Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center bg-black/40 border border-white/10">
              <img
                src="/brand/favicon_dark.png"
                alt="SeekhSetu Logo"
                className="w-full h-full object-cover hidden dark:block"
              />
              <img
                src="/brand/favicon_light.png"
                alt="SeekhSetu Logo"
                className="w-full h-full object-cover block dark:hidden"
              />
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-aurora-text-primary">
                  Seekh<span className="text-[#FA4616]">Setu</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#FA4616] font-semibold leading-none hidden sm:block tracking-wide mt-0.5">
                Learn Today Lead Tomorrow
              </p>
            </div>
          </button>
        </div>

        {/* Center: Command Palette Trigger Button */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-aurora-bg-elevated/70 border border-aurora-border hover:border-[#FA4616]/50 text-sm text-aurora-text-secondary hover:text-aurora-text-primary transition-all shadow-sm group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#FA4616] group-hover:text-[#FA4616] transition-colors" />
              <span>Search topics, algorithms, or jump to day...</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono bg-aurora-bg-surface px-2 py-0.5 rounded border border-aurora-border text-aurora-text-secondary">
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Active Timer Pill */}
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              timerState.isRunning
                ? 'bg-[#FA4616]/20 border-[#FA4616] text-[#FA4616] animate-pulse shadow-sm'
                : 'bg-aurora-bg-elevated border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:border-[#FA4616]/40'
            }`}
            title="Focus Timer"
          >
            <Timer className={`w-4 h-4 ${timerState.isRunning ? 'text-[#FA4616]' : 'text-aurora-text-secondary'}`} />
            <span className="font-mono">
              {timerState.isRunning ? formatTimer(remainingSeconds) : `${timerState.targetMinutes}m`}
            </span>
          </button>

          {/* Study Streak Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-300 text-xs sm:text-sm font-bold"
            title={`${studyStreakDays} Day Study Streak`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{studyStreakDays}d</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary hover:border-[#FA4616] transition-all shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="w-4 h-4 text-[#1754D8] fill-[#1754D8]/20" />
            )}
          </button>

          {/* Data Management Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDataMenuOpen(!dataMenuOpen)}
              className="p-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:border-aurora-indigo/40 transition-colors"
              title="Data & Backup Options"
              aria-label="Data settings"
            >
              <Database className="w-4 h-4" />
            </button>

            {dataMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDataMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-aurora-bg-elevated border border-aurora-border rounded-xl shadow-xl py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-aurora-text-secondary border-b border-aurora-border/60 mb-1">
                    Personal Data
                  </div>
                  <button
                    onClick={handleExportData}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-aurora-indigo" />
                    <span>Export JSON Backup</span>
                  </button>
                  <button
                    onClick={handleResetConfirm}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-red-400" />
                    <span>Reset My Data</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* User Account / Identity Dropdown */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border hover:border-[#FA4616]/50 transition-all text-xs font-semibold text-aurora-text-primary"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FA4616] to-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <div className="font-bold text-aurora-text-primary truncate max-w-[90px]">{user.name}</div>
                  <div className="text-[10px] text-aurora-text-secondary uppercase tracking-wider">
                    {user.role}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-aurora-text-secondary shrink-0" />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-aurora-bg-elevated border border-aurora-border rounded-2xl shadow-2xl py-2 z-50 text-xs">
                    {/* User info card */}
                    <div className="px-4 py-2 border-b border-aurora-border/60">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-aurora-text-primary text-sm truncate">{user.name}</div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          user.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-aurora-text-secondary truncate mt-0.5">{user.email}</div>

                      {/* Unique User ID */}
                      <div className="mt-2 pt-2 border-t border-aurora-border/40 flex items-center justify-between text-[10px] text-aurora-text-secondary">
                        <span className="font-mono">ID: {user.id.substring(0, 10)}...</span>
                        <button
                          onClick={handleCopyId}
                          className="text-[#FA4616] hover:underline flex items-center gap-1"
                        >
                          {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-[#FA4616]" />
                        <span>My Profile & Settings</span>
                      </button>

                      {user.role === 'admin' && (
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setIsAdminModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-purple-400 hover:bg-purple-500/10 transition-colors"
                        >
                          <Shield className="w-3.5 h-3.5 text-purple-400" />
                          <span>Admin Control Center</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                          showToast('Signed out of SeekhSetu', 'info');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs font-semibold transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthModalTab('register');
                  setIsAuthModalOpen(true);
                }}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary lg:hidden"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
