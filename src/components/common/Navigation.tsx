import React from 'react';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Code2,
  Brain,
  MessageSquare,
  FileCheck,
  Target,
  Clock,
  Flame,
  BarChart3
} from 'lucide-react';
import { useStudy, ActiveTab } from '../../context/StudyContext';

interface NavigationProps {
  isMobileDrawer?: boolean;
  onItemClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobileDrawer = false, onItemClick }) => {
  const {
    activeTab,
    setActiveTab,
    selectedDayNumber,
    starredDays,
    revisionTasks,
    bookmarkedConcepts,
    incorrectQuestions,
    solvedCodingQuestions,
    latestAtsScore
  } = useStudy();

  const totalRevisionQueueCount =
    starredDays.length +
    revisionTasks.filter(t => !t.completed).length +
    bookmarkedConcepts.length +
    incorrectQuestions.length;

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    badgeColor?: string;
  }> = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'coding',
      label: 'Coding Arena',
      icon: Code2,
      badge: `${solvedCodingQuestions.length} Solved`,
      badgeColor: 'bg-emerald-500/15 text-emerald-300'
    },
    {
      id: 'aptitude',
      label: 'Aptitude Prep',
      icon: Brain,
      badge: 'Mocks',
      badgeColor: 'bg-blue-500/15 text-blue-300'
    },
    {
      id: 'communication',
      label: 'Interview & Pitch',
      icon: MessageSquare,
      badge: 'STAR Voice',
      badgeColor: 'bg-purple-500/15 text-purple-300'
    },
    {
      id: 'resume',
      label: 'AI Resume Studio',
      icon: FileCheck,
      badge: `ATS ${latestAtsScore}`,
      badgeColor: 'bg-[#FA4616]/15 text-[#FA4616]'
    },
    {
      id: 'roadmap',
      label: 'Learning Roadmap',
      icon: Map,
      badge: '30 Days',
      badgeColor: 'bg-aurora-bg-surface text-aurora-text-secondary'
    },
    {
      id: 'workspace',
      label: `Day ${selectedDayNumber} Study`,
      icon: BookOpen
    },
    {
      id: 'timer',
      label: 'Focus Timer',
      icon: Clock
    },
    {
      id: 'revision',
      label: 'Revision Center',
      icon: Flame,
      badge: totalRevisionQueueCount > 0 ? totalRevisionQueueCount : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3
    }
  ];

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onItemClick) onItemClick();
  };

  if (isMobileDrawer) {
    return (
      <nav className="flex flex-col gap-1.5 p-4">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#FA4616]/15 text-[#FA4616] border border-[#FA4616]/30 font-bold'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FA4616]' : 'text-aurora-text-secondary'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-aurora-border ${item.badgeColor || 'bg-aurora-bg-surface text-aurora-text-secondary'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    );
  }

  // Desktop horizontal sub-header navigation bar with rich pills
  return (
    <nav className="w-full border-b border-aurora-border/70 bg-aurora-bg-secondary/70 backdrop-blur-md hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 py-2 overflow-x-auto no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all bubble-card ${
                  isActive
                    ? 'bg-aurora-bg-elevated text-aurora-text-primary shadow-sm border border-[#FA4616]/40'
                    : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FA4616]' : 'text-aurora-text-secondary'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border border-aurora-border/60 ${item.badgeColor || 'bg-aurora-bg-surface text-aurora-text-secondary'}`}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#FA4616] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
