import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { ToastNotification } from './ToastNotification';
import { CommandPalette } from './CommandPalette';
import { GlobalAiAssistantDrawer } from '../ai-assistant/GlobalAiAssistantDrawer';
import { useStudy, ActiveTab } from '../../context/StudyContext';
import { LayoutDashboard, Map, Code2, Brain, FileCheck, Clock, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { activeTab, setActiveTab } = useStudy();

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
              <div className="p-4 border-b border-aurora-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
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
                    <span className="font-display font-extrabold text-base tracking-tight text-aurora-text-primary">
                      Seekh<span className="text-[#FA4616]">Setu</span>
                    </span>
                    <p className="text-[10px] text-aurora-text-secondary leading-none">Navigation Menu</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-xl text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <Navigation
                  isMobileDrawer
                  onItemClick={() => setMobileDrawerOpen(false)}
                />
              </div>

              <div className="p-3 border-t border-aurora-border/60 text-center">
                <p className="text-[11px] text-aurora-text-secondary">
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

      {/* Footer Branding */}
      <footer className="w-full border-t border-aurora-border py-6 text-center text-xs text-aurora-text-secondary z-10 bg-aurora-bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-aurora-text-primary">SeekhSetu</span>
            <span className="text-aurora-border">•</span>
            <span className="text-xs font-semibold text-[#FA4616] tracking-wide">Learn Today Lead Tomorrow</span>
          </div>
          <p className="text-xs text-aurora-text-secondary">
            Personal Learning Operating System for Full Stack Developer Track
          </p>
        </div>
      </footer>

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
