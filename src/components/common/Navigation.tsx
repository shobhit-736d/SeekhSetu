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
        badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
      },
      {
        id: 'aptitude',
        label: 'Aptitude Prep',
        icon: Brain,
        badge: 'Mocks',
        badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20'
      },
      {
        id: 'communication',
        label: 'Interview & Pitch',
        icon: MessageSquare,
        badge: 'STAR Voice',
        badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20'
      },
      {
        id: 'resume',
        label: 'AI Resume Studio',
        icon: FileCheck,
        badge: `ATS ${latestAtsScore}`,
        badgeColor: 'bg-[#FA4616]/10 text-[#FA4616] border-[#FA4616]/20'
      },
      {
        id: 'roadmap',
        label: 'Learning Roadmap',
        icon: Map,
        badge: '30 Days',
        badgeColor: 'bg-aurora-bg-surface text-aurora-text-secondary border-aurora-border'
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
        badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
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
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                  ? 'bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/30 font-bold shadow-sm'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FA4616]' : 'text-aurora-text-secondary'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-aurora-bg-surface text-aurora-text-secondary border-aurora-border'}`}>
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
                className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${isActive
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
