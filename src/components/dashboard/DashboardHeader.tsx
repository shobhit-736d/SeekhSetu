import React from 'react';
import { Play, Sparkles, CheckCircle, ArrowRight, Target, Layers } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { getDayByNumber } from '../../data/roadmapData';
import { ProgressRing } from '../common/ProgressRing';

export const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const {
    selectedDayNumber,
    navigateToDay,
    overallSyllabusProgress,
    completedTopicsCount,
    totalTopicsCount,
    completedDays,
    setActiveWorkspaceViewMode,
    masteredCardsCount,
    familiarCardsCount,
    totalFlashcardsCount
  } = useStudy();

  const currentDay = getDayByNumber(selectedDayNumber) || getDayByNumber(1)!;

  // Contextual greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const isDayCompleted = completedDays[selectedDayNumber] || false;

  const handleOpenFlashcards = () => {
    navigateToDay(selectedDayNumber);
    setActiveWorkspaceViewMode('flashcards');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-aurora-bg-elevated border border-aurora-border p-6 sm:p-8 shadow-sm">
      {/* Decorative subtle ambient flare */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FA4616]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#1754D8]/08 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Editorial Welcome & Context */}
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#FA4616] animate-pulse" />
            <span>SeekhSetu • Learn Today Lead Tomorrow</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-aurora-text-primary">
              {getGreeting()}, <span className="text-[#FA4616]">{user?.name ? user.name.split(' ')[0] : 'Engineer'}</span>.
            </h1>
            {user && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                user.role === 'admin'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {user.role} Sandbox
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-aurora-text-secondary max-w-xl leading-relaxed">
            Welcome to <strong className="text-aurora-text-primary font-semibold">SeekhSetu</strong> — your personal learning operating system for the Full Stack Developer track. Follow the 30-day curriculum, master active recall flashcards, and drill technical interview questions.
          </p>

          {/* Daily Mission & Studley Mastery Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-aurora-text-primary bg-aurora-bg-surface/80 border border-aurora-border px-3.5 py-2 rounded-xl">
              <Target className="w-4 h-4 text-[#1754D8]" />
              <span>
                Daily Target: Complete <strong className="text-aurora-text-primary font-bold">Day {currentDay.dayNumber}</strong> ({currentDay.topics.length} topics)
              </span>
            </div>

            {isDayCompleted && (
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
            )}

            {/* Flashcard Active Recall Chip */}
            <button
              onClick={handleOpenFlashcards}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-aurora-text-primary bg-aurora-bg-surface border border-aurora-border px-3.5 py-2 rounded-xl hover:border-[#FA4616] transition-colors bubble-card"
              title="Practice Active Recall Deck"
            >
              <Layers className="w-4 h-4 text-[#FA4616]" />
              <span>
                Recall: <strong className="text-aurora-text-primary font-bold">{masteredCardsCount + familiarCardsCount}/{totalFlashcardsCount}</strong> Mastered
              </span>
            </button>
          </div>
        </div>

        {/* Continue Learning Hero Card */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-5 p-5 sm:p-6 rounded-2xl bg-aurora-bg-surface/90 border border-aurora-border backdrop-blur-md shadow-sm bubble-card">
          {/* Circular Progress Ring */}
          <div className="flex-shrink-0">
            <ProgressRing progress={overallSyllabusProgress} size={80} strokeWidth={8} />
          </div>

          {/* Day Metadata & CTA */}
          <div className="flex-1 min-w-[200px] text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FA4616]">
              Recommended Next
            </div>
            <div className="text-base sm:text-lg font-bold text-aurora-text-primary truncate max-w-xs mt-0.5">
              Day {currentDay.dayNumber}: {currentDay.title}
            </div>
            <div className="text-xs sm:text-sm text-aurora-text-secondary mt-0.5">
              {completedTopicsCount} of {totalTopicsCount} topics mastered ({overallSyllabusProgress}%)
            </div>

            <div className="flex items-center gap-2.5 mt-3.5">
              <button
                onClick={() => navigateToDay(currentDay.dayNumber)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Continue Lesson</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={handleOpenFlashcards}
                className="px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:border-[#FA4616] transition-colors"
                title="Open Active Recall Flashcard Deck"
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
