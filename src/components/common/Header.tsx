import React, { useState, useEffect } from 'react';
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
  Check
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
    setIsAdminModalOpen
  } = useAuth();

  const [dataMenuOpen, setDataMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDataMenuOpen(false);
        setUserMenuOpen(false);
        setMobileUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    setMobileUserMenuOpen(false);
  };

  const handleResetConfirm = () => {
    if (window.confirm('Are you sure you want to reset your personal study progress, sessions, and bookmarks? This cannot be undone.')) {
      resetAllData();
      setDataMenuOpen(false);
      setMobileUserMenuOpen(false);
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
    <header className="sticky top-0 z-40 w-full bg-aurora-bg-primary/90 backdrop-blur-md md:bg-aurora-bg-primary/85 md:border-b md:border-aurora-border transition-colors">
      {/* ============================================================== */}
      {/* MOBILE HEADER (< md)                                          */}
      {/* Matches attached reference: Floating pill card with centered   */}
      {/* logo, left hamburger button, right search & orange S avatar   */}
      {/* ============================================================== */}
      <div className="md:hidden w-full px-3.5 pt-2.5 pb-2 max-w-lg mx-auto">
        <div className="relative w-full h-[58px] bg-white dark:bg-[#1E1E1E] border border-slate-200/90 dark:border-white/10 rounded-2xl shadow-sm shadow-slate-200/50 dark:shadow-none px-2.5 flex items-center justify-between transition-colors">
          {/* Left: Hamburger menu toggle button */}
          <button
            type="button"
            id="mobile-nav-toggle-btn"
            onClick={() => {
              setMobileUserMenuOpen(false);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="w-10 h-10 rounded-xl bg-[#F1F3F5] dark:bg-[#2C2C2C] hover:bg-[#E9ECEF] dark:hover:bg-[#383838] border border-transparent dark:border-white/5 flex items-center justify-center text-slate-800 dark:text-slate-100 transition-all active:scale-95 shrink-0 z-10"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-800 dark:text-slate-100" strokeWidth={2.2} />
            ) : (
              <Menu className="w-5 h-5 text-slate-800 dark:text-slate-100" strokeWidth={2.2} />
            )}
          </button>

          {/* Center: Mathematically Centered SeekhSetu Logo (Option F. Centered Logo) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto z-10">
            <button
              type="button"
              onClick={() => {
                setMobileUserMenuOpen(false);
                setActiveTab('dashboard');
              }}
              className="flex items-center gap-1.5 sm:gap-2 group active:scale-95 transition-transform"
              aria-label="SeekhSetu Home"
            >
              <img
                src={theme === 'dark' ? '/brand/icon_emblem_dark_trans.png' : '/brand/icon_emblem_light_trans.png'}
                alt="SeekhSetu Logo"
                className="h-8 w-auto object-contain select-none drop-shadow-sm"
              />
              <span className="font-display font-extrabold text-[19px] sm:text-xl tracking-tight text-[#FA4616] select-none leading-none">
                SeekhSetu
              </span>
            </button>
          </div>

          {/* Right: Search button + Orange 'S' Profile button */}
          <div className="flex items-center gap-2 shrink-0 z-10">
            {/* Mobile Search Button */}
            <button
              type="button"
              id="mobile-search-btn"
              onClick={() => {
                setMobileUserMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-10 h-10 rounded-xl bg-[#F1F3F5] dark:bg-[#2C2C2C] hover:bg-[#E9ECEF] dark:hover:bg-[#383838] border border-transparent dark:border-white/5 flex items-center justify-center text-slate-800 dark:text-slate-100 transition-all active:scale-95 shrink-0"
              title="Search topics and questions"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5 text-slate-700 dark:text-slate-200" strokeWidth={2.2} />
            </button>

            {/* Profile / Account 'S' Button */}
            <div className="relative">
              <button
                type="button"
                id="mobile-profile-btn"
                onClick={() => setMobileUserMenuOpen(!mobileUserMenuOpen)}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FA4616] via-[#FF5722] to-[#FF7043] hover:brightness-105 active:scale-95 shadow-sm shadow-[#FA4616]/30 flex items-center justify-center shrink-0 transition-all border border-orange-400/20"
                title={isAuthenticated && user ? user.name : 'Account & Quick Settings'}
                aria-label="Account menu"
                aria-expanded={mobileUserMenuOpen}
              >
                <span className="text-white font-display font-black text-base sm:text-lg select-none leading-none drop-shadow-sm">
                  {isAuthenticated && user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </span>
              </button>

              {/* Mobile Profile & Settings Popover Dropdown */}
              {mobileUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
                    onClick={() => setMobileUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-[48px] w-72 max-w-[calc(100vw-28px)] bg-white dark:bg-[#1E1E1E] border border-slate-200/90 dark:border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                    {isAuthenticated && user ? (
                      /* Authenticated User Menu */
                      <div className="space-y-3">
                        {/* Profile header card */}
                        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/10">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FA4616] to-amber-500 text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm shadow-[#FA4616]/30">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                {user.name}
                              </span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                                user.role === 'admin'
                                  ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                                  : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              }`}>
                                {user.role}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        {/* Quick Stats: Study Streak & Focus Timer */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Streak</div>
                              <div className="font-bold text-amber-700 dark:text-amber-300">{studyStreakDays} Days</div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setMobileUserMenuOpen(false);
                              setActiveTab('timer');
                            }}
                            className="flex items-center gap-2 p-2 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 text-xs text-left hover:bg-[#FA4616]/15 transition-colors"
                          >
                            <Timer className="w-4 h-4 text-[#FA4616] shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[10px] text-[#FA4616] font-medium">Timer</div>
                              <div className="font-bold text-[#FA4616] font-mono">
                                {timerState.isRunning ? formatTimer(remainingSeconds) : `${timerState.targetMinutes}m`}
                              </div>
                            </div>
                          </button>
                        </div>

                        {/* Navigation & Preferences Links */}
                        <div className="space-y-1 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setMobileUserMenuOpen(false);
                              setActiveTab('profile');
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-left"
                          >
                            <User className="w-4 h-4 text-[#FA4616]" />
                            <span>My Profile & Settings</span>
                          </button>

                          {user.role === 'admin' && (
                            <button
                              type="button"
                              onClick={() => {
                                setMobileUserMenuOpen(false);
                                setIsAdminModalOpen(true);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 transition-colors text-left"
                            >
                              <Shield className="w-4 h-4" />
                              <span>Admin Control Center</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={toggleTheme}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-left"
                          >
                            <div className="flex items-center gap-2.5">
                              {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-amber-400" />
                              ) : (
                                <Moon className="w-4 h-4 text-slate-600" />
                              )}
                              <span>Appearance</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={handleExportData}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-left"
                          >
                            <Download className="w-4 h-4 text-slate-500" />
                            <span>Export JSON Backup</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleCopyId}
                            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-left font-mono"
                          >
                            <span>ID: {user.id.substring(0, 10)}...</span>
                            <span className="text-[#FA4616] font-sans font-semibold flex items-center gap-1">
                              {copiedId ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId ? 'Copied' : 'Copy'}</span>
                            </span>
                          </button>
                        </div>

                        {/* Sign Out Action */}
                        <div className="pt-2 border-t border-slate-100 dark:border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              setMobileUserMenuOpen(false);
                              logout();
                              showToast('Signed out of SeekhSetu', 'info');
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Guest / Not Authenticated Menu */
                      <div className="space-y-3">
                        <div className="text-center pb-2 border-b border-slate-100 dark:border-white/10">
                          <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-[#FA4616] via-[#FF5722] to-[#FF7043] text-white font-extrabold text-base flex items-center justify-center shadow-sm shadow-[#FA4616]/30 mb-2">
                            S
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            Welcome to SeekhSetu
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Sign in to track progress & study streak
                          </p>
                        </div>

                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => {
                              setMobileUserMenuOpen(false);
                              setAuthModalTab('login');
                              setIsAuthModalOpen(true);
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-sm transition-all text-center"
                          >
                            Sign In to Your Account
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setMobileUserMenuOpen(false);
                              setAuthModalTab('register');
                              setIsAuthModalOpen(true);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all text-center"
                          >
                            Create Free Account
                          </button>
                        </div>

                        {/* Quick Appearance & Timer controls */}
                        <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-1">
                          <button
                            type="button"
                            onClick={toggleTheme}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-left"
                          >
                            <div className="flex items-center gap-2.5">
                              {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-amber-400" />
                              ) : (
                                <Moon className="w-4 h-4 text-slate-600" />
                              )}
                              <span>Appearance</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {theme === 'dark' ? 'Dark' : 'Light'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setMobileUserMenuOpen(false);
                              setActiveTab('timer');
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-left"
                          >
                            <div className="flex items-center gap-2.5">
                              <Timer className="w-4 h-4 text-[#FA4616]" />
                              <span>Focus Timer</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#FA4616]">
                              {timerState.isRunning ? formatTimer(remainingSeconds) : `${timerState.targetMinutes}m`}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP & TABLET HEADER (>= md)                                */}
      {/* High-fidelity full navigation bar with search bar & actions    */}
      {/* ============================================================== */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 items-center justify-between gap-4">
        {/* Left: Brand Identity with Transparent Emblem */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="/brand/icon_emblem_dark_trans.png"
                alt="SeekhSetu Logo"
                className="w-full h-full object-contain hidden dark:block"
              />
              <img
                src="/brand/icon_emblem_light_trans.png"
                alt="SeekhSetu Logo"
                className="w-full h-full object-contain block dark:hidden"
              />
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-aurora-text-primary">
                  Seekh<span className="text-[#FA4616]">Setu</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#FA4616] font-semibold leading-none tracking-wide mt-0.5">
                Learn Today Lead Tomorrow
              </p>
            </div>
          </button>
        </div>

        {/* Center: Command Palette Trigger Button */}
        <div className="flex-1 max-w-md">
          <button
            type="button"
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
            type="button"
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              timerState.isRunning
                ? 'bg-[#FA4616]/20 border-[#FA4616] text-[#FA4616] animate-pulse shadow-sm'
                : 'bg-aurora-bg-elevated border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:border-[#FA4616]/40'
            }`}
            title="Focus Timer"
          >
            <Timer className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${timerState.isRunning ? 'text-[#FA4616]' : 'text-aurora-text-secondary'}`} />
            <span className="font-mono">
              {timerState.isRunning ? formatTimer(remainingSeconds) : `${timerState.targetMinutes}m`}
            </span>
          </button>

          {/* Study Streak Badge */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 text-xs sm:text-sm font-bold"
            title={`${studyStreakDays} Day Study Streak`}
          >
            <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-500 fill-amber-500" />
            <span>{studyStreakDays}d</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary hover:border-[#FA4616] transition-all shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Data Management Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDataMenuOpen(!dataMenuOpen)}
              className="p-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:border-[#FA4616]/40 transition-colors"
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
                    type="button"
                    onClick={handleExportData}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FA4616]" />
                    <span>Export JSON Backup</span>
                  </button>
                  <button
                    type="button"
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
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border hover:border-[#FA4616]/50 transition-all text-xs font-semibold text-aurora-text-primary"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FA4616] to-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm shadow-[#FA4616]/30">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left leading-tight">
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
                          type="button"
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
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          setActiveTab('profile');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-[#FA4616]" />
                        <span>My Profile & Settings</span>
                      </button>

                      {user.role === 'admin' && (
                        <button
                          type="button"
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
                        type="button"
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
                type="button"
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs font-semibold transition-colors"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthModalTab('register');
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Register
              </button>
            </div>
          )}

          {/* Tablet Hamburger (hidden on lg where full horizontal navigation is present) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary lg:hidden transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
