import React, { useState } from 'react';
import {
  Compass,
  Search,
  Timer,
  Flame,
  Sun,
  Moon,
  Database,
  Download,
  RotateCcw,
  Menu,
  X
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { exportStorageJSON } from '../../services/storageService';

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

  const [dataMenuOpen, setDataMenuOpen] = useState(false);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingSeconds = Math.max(0, timerState.targetMinutes * 60 - timerState.elapsedSeconds);

  const handleExportData = () => {
    const jsonStr = exportStorageJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seekhsetu-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Progress exported as JSON backup', 'success');
    setDataMenuOpen(false);
  };

  const handleResetConfirm = () => {
    if (window.confirm('Are you sure you want to reset all study progress, sessions, and bookmarks? This cannot be undone.')) {
      resetAllData();
      setDataMenuOpen(false);
    }
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Timer Pill */}
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${timerState.isRunning
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
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-300 text-xs sm:text-sm font-bold"
            title={`${studyStreakDays} Day Study Streak`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{studyStreakDays}d</span>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={onOpenCommandPalette}
            className="p-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary md:hidden"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary hover:border-[#FA4616] transition-all shadow-sm bubble-card"
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
                    Data Integrity
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
                    <span>Reset All Data</span>
                  </button>
                </div>
              </>
            )}
          </div>

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
