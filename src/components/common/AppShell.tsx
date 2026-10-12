import React, { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { ToastNotification } from './ToastNotification';
import { CommandPalette } from './CommandPalette';
import { FloatingBubbles } from './FloatingBubbles';
import { GlobalAiAssistantDrawer } from '../ai-assistant/GlobalAiAssistantDrawer';
import { useStudy, ActiveTab } from '../../context/StudyContext';
import { LayoutDashboard, Map, Code2, Brain, FileCheck, Clock } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { activeTab, setActiveTab } = useStudy();

  const mobileBottomNav: Array<{ id: ActiveTab; label: string; icon: any }> = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'coding', label: 'Coding', icon: Code2 },
    { id: 'aptitude', label: 'Aptitude', icon: Brain },
    { id: 'resume', label: 'Resume', icon: FileCheck },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'timer', label: 'Timer', icon: Clock }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-aurora-bg-primary text-aurora-text-primary selection:bg-[#FA4616] selection:text-white relative overflow-x-hidden transition-colors duration-300">
      {/* Environmental Lighting & Floating Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0 aurora-bg-mesh opacity-90" />
      <FloatingBubbles />

      {/* Top Header */}
      <Header
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        mobileMenuOpen={mobileDrawerOpen}
        setMobileMenuOpen={setMobileDrawerOpen}
      />

      {/* Desktop Sub Navigation */}
      <Navigation />

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-full bg-aurora-bg-elevated border-r border-aurora-border h-full shadow-2xl flex flex-col">
            <div className="p-4 border-b border-aurora-border flex items-center justify-between">
              <span className="font-extrabold text-sm tracking-tight text-white">Navigation</span>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="text-aurora-text-secondary hover:text-white text-xs px-2 py-1 rounded bg-aurora-bg-surface"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Navigation
                isMobileDrawer
                onItemClick={() => setMobileDrawerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-12">
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-aurora-bg-secondary/95 backdrop-blur-lg border-t border-aurora-border lg:hidden px-3 py-2 flex items-center justify-around">
        {mobileBottomNav.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-[#FA4616] font-bold scale-105'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium tracking-tight">{item.label}</span>
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
