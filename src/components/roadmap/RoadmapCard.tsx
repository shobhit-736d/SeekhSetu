import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Clock, BookOpen, ArrowRight, Layers } from 'lucide-react';
import { StudyDay } from '../../types/roadmap';
import { useStudy } from '../../context/StudyContext';

interface RoadmapCardProps {
  day: StudyDay;
  onOpen: () => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ day, onOpen }) => {
  const {
    starredDays,
    toggleStarDay,
    completedDays,
    completedTopics,
    setActiveWorkspaceViewMode
  } = useStudy();

  const isStarred = starredDays.includes(day.dayNumber);
  const isCompleted = completedDays[day.dayNumber] || false;

  // Calculate day topic completion
  const finishedTopicsCount = day.topics.filter(t => completedTopics[t.id]).length;
  const totalTopics = day.topics.length;
  const progressPercent = totalTopics > 0 ? Math.round((finishedTopicsCount / totalTopics) * 100) : 0;

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening the day
    toggleStarDay(day.dayNumber);
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onOpen}
      className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border transition-all cursor-pointer bubble-card ${
        isCompleted
          ? 'border-emerald-500/40 bg-aurora-bg-elevated/90'
          : 'border-aurora-border hover:border-[#FA4616]/60 hover:shadow-studley-card'
      }`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-aurora-bg-surface border border-aurora-border text-[#FA4616]">
              Day {day.dayNumber}
            </span>
            {day.isSevenDayTrack && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 dark:text-amber-300">
                7-Day Track
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Star toggle button */}
            <button
              onClick={handleStarClick}
              className={`p-2 rounded-lg transition-colors ${
                isStarred
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-aurora-text-secondary hover:text-amber-400 hover:bg-aurora-bg-surface'
              }`}
              title={isStarred ? 'Unstar day' : 'Star day for priority review'}
              aria-label="Star day"
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-aurora-text-primary group-hover:text-[#FA4616] transition-colors leading-snug line-clamp-2">
          {day.title}
        </h3>

        {/* Primary Objective */}
        <p className="text-sm text-aurora-text-secondary line-clamp-2 mt-2.5 leading-relaxed">
          {day.primaryObjective}
        </p>
      </div>

      {/* Bottom Footer Info */}
      <div className="mt-5 pt-3.5 border-t border-aurora-border/70">
        <div className="flex items-center justify-between text-xs text-aurora-text-secondary font-medium mb-2.5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#FA4616]" />
            <span>{day.estimatedMinutes}m est.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#1754D8]" />
            <span>{totalTopics} topics</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-aurora-bg-surface rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isCompleted
                ? 'bg-emerald-400'
                : 'bg-gradient-to-r from-[#FA4616] to-[#ED7649]'
            }`}
            style={{ width: `${isCompleted ? 100 : progressPercent}%` }}
          />
        </div>

        {/* Bottom Status & CTA */}
        <div className="flex items-center justify-between mt-3 pt-0.5">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              Completed
            </span>
          ) : progressPercent > 0 ? (
            <span className="text-xs font-bold text-[#FA4616]">
              {progressPercent}% Complete
            </span>
          ) : (
            <span className="text-xs font-semibold text-aurora-text-secondary">
              Not Started
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={e => {
                e.stopPropagation();
                onOpen();
                setActiveWorkspaceViewMode('flashcards');
              }}
              className="p-1.5 rounded-lg text-aurora-text-secondary hover:text-[#FA4616] hover:bg-aurora-bg-surface transition-colors border border-aurora-border/60"
              title="Practice Active Recall Deck"
            >
              <Layers className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#FA4616] group-hover:text-primary-hover group-hover:translate-x-1 transition-all">
              <span>Study</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

