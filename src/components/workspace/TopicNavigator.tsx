import React from 'react';
import { CheckCircle2, Circle, Clock, Bookmark, Award } from 'lucide-react';
import { StudyDay } from '../../types/roadmap';
import { useStudy } from '../../context/StudyContext';

interface TopicNavigatorProps {
  day: StudyDay;
  activeTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onOpenAssessment: () => void;
}

export const TopicNavigator: React.FC<TopicNavigatorProps> = ({
  day,
  activeTopicId,
  onSelectTopic,
  onOpenAssessment
}) => {
  const {
    completedTopics,
    toggleTopicCompletion,
    isBookmarked,
    completedDays,
    toggleDayCompletion
  } = useStudy();

  const isDayCompleted = completedDays[day.dayNumber] || false;
  const completedCount = day.topics.filter(t => completedTopics[t.id]).length;
  const totalCount = day.topics.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Day Overview Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border bubble-card">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FA4616]">
            Day {day.dayNumber} Progress
          </span>
          <span className="text-xs sm:text-sm font-bold text-aurora-text-primary">
            {completedCount}/{totalCount} ({progressPercent}%)
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-aurora-bg-surface rounded-full h-2 overflow-hidden mb-3.5">
          <div
            className="h-full bg-gradient-to-r from-[#FA4616] to-[#ED7649] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <button
          onClick={() => toggleDayCompletion(day.dayNumber)}
          className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            isDayCompleted
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary hover:border-emerald-500/40'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isDayCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-aurora-text-secondary'}`} />
          <span>{isDayCompleted ? 'Day Marked Complete' : 'Mark Entire Day as Complete'}</span>
        </button>
      </div>

      {/* Topics List */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
          Lesson Topics ({day.topics.length})
        </div>

        {day.topics.map((topic, idx) => {
          const isDone = completedTopics[topic.id] || false;
          const isActive = topic.id === activeTopicId;
          const bookmarked = isBookmarked(topic.id);

          return (
            <div
              key={topic.id}
              className={`group flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-aurora-bg-elevated border-[#FA4616] text-aurora-text-primary shadow-sm ring-1 ring-[#FA4616]/30'
                  : 'bg-aurora-bg-surface/70 border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
              }`}
            >
              {/* Checkbox toggle */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleTopicCompletion(topic.id, day.dayNumber);
                }}
                className="mt-0.5 text-aurora-text-secondary hover:text-emerald-500 transition-colors p-0.5"
                title={isDone ? 'Mark as incomplete' : 'Mark topic complete'}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-aurora-text-secondary" />
                )}
              </button>

              {/* Title & metadata (clicking switches topic) */}
              <div
                onClick={() => onSelectTopic(topic.id)}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className={`text-xs sm:text-sm truncate leading-snug ${
                    isActive ? 'font-bold text-aurora-text-primary' : 'font-semibold text-aurora-text-secondary group-hover:text-aurora-text-primary'
                  }`}>
                    {idx + 1}. {topic.title}
                  </span>
                  {bookmarked && (
                    <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2.5 text-xs text-aurora-text-secondary mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {topic.durationMinutes}m
                  </span>
                  <span>•</span>
                  <span>{topic.interviewQuestions?.length || 0} Q&As</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assessment Button */}
      {day.finalAssessmentQuestions && day.finalAssessmentQuestions.length > 0 && (
        <button
          onClick={onOpenAssessment}
          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          <Award className="w-4 h-4 text-white" />
          <span>Day {day.dayNumber} Final Assessment Quiz</span>
        </button>
      )}
    </div>
  );
};
