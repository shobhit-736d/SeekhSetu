import React from 'react';
import { ModuleMetadata } from '../../data/roadmapData';
import { Zap, Layers, Server, Database, Cpu, GitBranch, Box, Award } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Layers,
  Server,
  Database,
  Cpu,
  GitBranch,
  Box,
  Award
};

interface ModuleHeaderProps {
  module: ModuleMetadata;
  completedDaysCount: number;
  totalDaysCount: number;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  module,
  completedDaysCount,
  totalDaysCount
}) => {
  const Icon = iconMap[module.iconName] || Zap;
  const isAllComplete = completedDaysCount === totalDaysCount && totalDaysCount > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-xl bg-aurora-bg-surface/70 border border-aurora-border bubble-card">
      <div className="flex items-center gap-3.5">
        <div className="p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-[#1754D8] shadow-sm">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg font-bold text-aurora-text-primary tracking-tight">
              {module.name}
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-aurora-bg-elevated border border-aurora-border text-[#FA4616]">
              {module.badge}
            </span>
          </div>
          <p className="text-sm text-aurora-text-secondary mt-1">
            {module.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-center">
        <span className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg border ${
          isAllComplete
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 dark:text-emerald-300'
            : 'bg-aurora-bg-elevated border-aurora-border text-aurora-text-secondary'
        }`}>
          {completedDaysCount}/{totalDaysCount} Days Completed
        </span>
      </div>
    </div>
  );
};
