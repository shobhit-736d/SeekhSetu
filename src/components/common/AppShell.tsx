import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { ToastNotification } from './ToastNotification';
import { CommandPalette } from './CommandPalette';
import { Footer } from './Footer';
import { GlobalAiAssistantDrawer } from '../ai-assistant/GlobalAiAssistantDrawer';
import { useStudy, ActiveTab } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Map, Code2, Brain, FileCheck, Clock, X, User, Flame, Sun, Moon, LogIn } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { activeTab, setActiveTab, theme, toggleTheme, studyStreakDays, timerState } = useStudy();
  const { user, isAuthenticated, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileDrawerOpen]);

  const mobileBottomNav: Array<{ id: ActiveTab; label: string; icon: any }> = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'coding', label: 'Coding', icon: Code2 },
    { id: 'aptitude', label: 'Aptitude', icon: Brain },
    { id: 'resume', label: 'Resume', icon: FileCheck },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'timer', label: 'Timer', icon: Clock }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-aurora-bg-primary text-aurora-text-primary selection:bg-[#FA4616] selection:text-white relative overflow-x-hidden transition-colors duration-250">
      {/* Ambient background mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 aurora-bg-mesh opacity-90" />

      {/* Top Header */}
      <Header
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        mobileMenuOpen={mobileDrawerOpen}
        setMobileMenuOpen={setMobileDrawerOpen}
      />

      {/* Desktop Sub Navigation */}
      <Navigation />

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Smooth Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-80 max-w-[85vw] bg-aurora-bg-elevated border-r border-aurora-border h-full shadow-2xl flex flex-col z-10"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              {/* Drawer Brand Header */}
              <div className="p-4 border-b border-aurora-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    setActiveTab('dashboard');
                  }}
                  className="flex items-center gap-2.5 text-left group"
                >
                  <img
                    src={theme === 'dark' ? '/brand/icon_emblem_dark_trans.png' : '/brand/icon_emblem_light_trans.png'}
                    alt="SeekhSetu Logo"
                    className="h-8 w-auto object-contain select-none group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <span className="font-display font-extrabold text-lg tracking-tight text-[#FA4616]">
                      SeekhSetu
                    </span>
                    <p className="text-[10px] text-aurora-text-secondary leading-none">Navigation Menu</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-xl text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Status Pill Bar */}
              <div className="px-3 py-2.5 bg-aurora-bg-surface/50 border-b border-aurora-border/60 flex items-center justify-between gap-2">
                {/* Streak */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{studyStreakDays}d Streak</span>
                </div>

                {/* Focus Timer */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    setActiveTab('timer');
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FA4616]/10 border border-[#FA4616]/20 text-xs font-mono font-bold text-[#FA4616] hover:bg-[#FA4616]/15 transition-colors"
                >
                  <Clock className="w-3 h-3 text-[#FA4616]" />
                  <span>{timerState.isRunning ? 'Active' : `${timerState.targetMinutes}m`}</span>
                </button>

                {/* Theme Toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary hover:border-[#FA4616] transition-colors"
                  title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                  )}
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <Navigation
                  isMobileDrawer
                  onItemClick={() => setMobileDrawerOpen(false)}
                />
              </div>

              {/* Drawer Bottom Controls */}
              <div className="p-3 border-t border-aurora-border/60 space-y-2">
                {isAuthenticated && user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      setActiveTab('profile');
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-aurora-bg-surface hover:bg-[#FA4616]/10 text-xs font-bold text-aurora-text-primary border border-aurora-border hover:border-[#FA4616]/40 transition-all shadow-sm"
                  >
                    <User className="w-4 h-4 text-[#FA4616]" />
                    <span>My Profile & Settings</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileDrawerOpen(false);
                        setAuthModalTab('login');
                        setIsAuthModalOpen(true);
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileDrawerOpen(false);
                        setAuthModalTab('register');
                        setIsAuthModalOpen(true);
                      }}
                      className="px-3 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-primary hover:bg-aurora-bg-elevated transition-all"
                    >
                      Register
                    </button>
                  </div>
                )}
                <p className="text-[11px] text-aurora-text-secondary text-center">
                  SeekhSetu • Learn Today Lead Tomorrow
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 lg:pb-12">
        {children}
      </main>

      {/* Footer Branding & Supporting Links */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-aurora-bg-secondary/95 backdrop-blur-lg border-t border-aurora-border lg:hidden px-2 sm:px-4 py-2 flex items-center justify-around">
        {mobileBottomNav.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 sm:px-3 rounded-xl transition-all ${isActive
                  ? 'text-[#FA4616] font-bold scale-105'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary'
                }`}
            >
              <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-[10px] sm:text-xs font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Global AI Doubt Assistant (Available across all pages) */}
      <GlobalAiAssistantDrawer />

      {/* Global Toast Container */}
      <ToastNotification />
    </div>
  );
};
