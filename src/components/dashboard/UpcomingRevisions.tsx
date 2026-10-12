import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { Square, ArrowRight, Flame } from 'lucide-react';

export const UpcomingRevisions: React.FC = () => {
  const { revisionTasks, toggleRevisionTask, navigateToDay, setActiveTab } = useStudy();

  const pendingTasks = revisionTasks.filter(t => !t.completed).slice(0, 4);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col justify-between bubble-card shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <h3 className="text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
              Revision Backlog
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('revision')}
            className="text-xs font-bold text-[#FA4616] hover:text-primary-hover transition-colors"
          >
            Manage ({revisionTasks.length})
          </button>
        </div>

        {pendingTasks.length === 0 ? (
          <div className="py-6 text-center text-sm text-aurora-text-secondary">
            No pending revisions! You're fully caught up.
          </div>
        ) : (
          <div className="space-y-2.5">
            {pendingTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-xl bg-aurora-bg-surface/70 border border-aurora-border hover:border-[#FA4616]/30 transition-all text-sm"
              >
                <button
                  onClick={() => toggleRevisionTask(task.id)}
                  className="flex items-center gap-2.5 text-left text-aurora-text-primary flex-1 min-w-0 font-medium"
                >
                  <Square className="w-4 h-4 text-aurora-text-secondary flex-shrink-0" />
                  <span className="truncate">{task.title}</span>
                </button>

                <button
                  onClick={() => navigateToDay(task.dayNumber, task.topicId)}
                  className="p-1 text-aurora-text-secondary hover:text-[#FA4616] transition-colors ml-2"
                  title="Open topic"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-aurora-border/60 flex items-center justify-between text-xs text-aurora-text-secondary font-medium">
        <span>Spaced Repetition Active</span>
        <span>{revisionTasks.filter(t => t.completed).length} items reviewed</span>
      </div>
    </div>
  );
};
