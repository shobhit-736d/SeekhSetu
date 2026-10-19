import React from 'react';
import { modulesMetadata, getDaysByModule } from '../../data/roadmapData';
import { useStudy } from '../../context/StudyContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const VisualRoadmapPreview: React.FC = () => {
  const { completedDays, setActiveTab, navigateToDay } = useStudy();

  return (
    <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-aurora-text-primary tracking-tight">
            Curriculum Roadmap Preview
          </h2>
          <p className="text-xs text-aurora-text-secondary">
            30-day technical syllabus breakdown
          </p>
        </div>
        <button
          onClick={() => setActiveTab('roadmap')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FA4616] hover:text-primary-hover transition-colors"
        >
          <span>View All 30 Days</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {modulesMetadata.map(module => {
          const moduleDays = getDaysByModule(module.id);
          const completedCount = moduleDays.filter(d => completedDays[d.dayNumber]).length;
          const progressPercent = Math.round((completedCount / moduleDays.length) * 100);
          const isComplete = completedCount === moduleDays.length && moduleDays.length > 0;

          return (
            <div
              key={module.id}
              onClick={() => {
                const firstDay = moduleDays[0]?.dayNumber || 1;
                navigateToDay(firstDay);
              }}
              className="p-4 rounded-xl bg-aurora-bg-surface/80 border border-aurora-border hover:border-[#FA4616]/40 cursor-pointer transition-all hover:bg-aurora-bg-surface group bubble-card shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-aurora-bg-elevated border border-aurora-border text-[#FA4616]">
                  {module.badge}
                </span>
                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <span className="text-xs font-bold text-aurora-text-secondary">
                    {progressPercent}%
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-bold text-aurora-text-primary truncate group-hover:text-[#FA4616] transition-colors">
                {module.name}
              </h4>
              <p className="text-xs text-aurora-text-secondary line-clamp-1 mt-1 font-normal">
                {module.description}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-aurora-bg-primary rounded-full h-1.5 mt-3 overflow-hidden border border-aurora-border/30">
                <div
                  className="h-full bg-gradient-to-r from-[#FA4616] to-[#ED7649] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
