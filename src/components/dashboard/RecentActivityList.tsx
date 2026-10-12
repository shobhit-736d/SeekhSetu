import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { Clock, Trophy, BookOpen } from 'lucide-react';

export const RecentActivityList: React.FC = () => {
  const { studySessions, quizAttempts, navigateToDay } = useStudy();

  // Combine recent sessions and quiz attempts into sorted timeline
  const combinedActivities = [
    ...studySessions.map(s => ({
      id: s.id,
      type: 'session' as const,
      title: s.topicTitle || `Study Session (Day ${s.dayNumber})`,
      detail: `${s.durationMinutes} mins focused`,
      timestamp: new Date(s.startTime).getTime(),
      dayNumber: s.dayNumber
    })),
    ...quizAttempts.map(q => ({
      id: q.id,
      type: 'quiz' as const,
      title: q.topicTitle ? `${q.topicTitle} Quiz` : 'Practice Assessment',
      detail: `Score ${q.score}/${q.totalQuestions} (${q.accuracy}%)`,
      timestamp: new Date(q.timestamp).getTime(),
      dayNumber: q.dayNumber
    }))
  ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

  const formatTimeAgo = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col justify-between bubble-card shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FA4616]" />
            <h3 className="text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
              Recent Activity
            </h3>
          </div>
          <span className="text-xs text-aurora-text-secondary">
            Live History
          </span>
        </div>

        {combinedActivities.length === 0 ? (
          <div className="py-6 text-center text-sm text-aurora-text-secondary">
            No study sessions yet. Start a focus session above!
          </div>
        ) : (
          <div className="space-y-2.5">
            {combinedActivities.map(item => (
              <div
                key={item.id}
                onClick={() => item.dayNumber && navigateToDay(item.dayNumber)}
                className="flex items-center justify-between p-3 rounded-xl bg-aurora-bg-surface/70 border border-aurora-border hover:border-[#FA4616]/40 transition-all text-sm cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-2 rounded-lg ${
                    item.type === 'session'
                      ? 'bg-[#FA4616]/10 text-[#FA4616]'
                      : 'bg-[#1754D8]/10 text-[#1754D8]'
                  }`}>
                    {item.type === 'session' ? (
                      <BookOpen className="w-4 h-4" />
                    ) : (
                      <Trophy className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-aurora-text-primary truncate group-hover:text-[#FA4616] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-aurora-text-secondary">
                      {item.detail}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-aurora-text-secondary font-mono whitespace-nowrap ml-2">
                  {formatTimeAgo(item.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-aurora-border/60 flex items-center justify-between text-xs text-aurora-text-secondary font-medium">
        <span>Total Sessions: {studySessions.length}</span>
        <span>Quizzes Taken: {quizAttempts.length}</span>
      </div>
    </div>
  );
};
