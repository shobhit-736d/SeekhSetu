import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { codingQuestionsList } from '../../data/codingQuestionsData';
import {
  Code2,
  Brain,
  MessageSquare,
  FileCheck,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export const PlacementReadinessWidget: React.FC = () => {
  const {
    setActiveTab,
    solvedCodingQuestions,
    aptitudeAttempts,
    latestAtsScore,
    setIsAiDrawerOpen,
    setAiCurrentContext
  } = useStudy();

  const totalQuestions = codingQuestionsList.length;
  const codingProgress = Math.round((solvedCodingQuestions.length / totalQuestions) * 100);

  const totalAptitudeScore = aptitudeAttempts.reduce((acc, a) => acc + a.score, 0);
  const totalAptitudeQs = aptitudeAttempts.reduce((acc, a) => acc + a.totalQuestions, 0);
  const aptitudeAccuracy = totalAptitudeQs > 0
    ? Math.round((totalAptitudeScore / totalAptitudeQs) * 100)
    : 80;

  const placementModules = [
    {
      id: 'coding',
      title: 'Coding Arena',
      subtitle: `${solvedCodingQuestions.length}/${totalQuestions} problems solved`,
      progress: codingProgress,
      progressColor: 'bg-[#FA4616]',
      icon: Code2,
      badge: 'LeetCode Style',
      actionLabel: 'Open Arena',
      color: 'text-[#FA4616]',
      bgColor: 'bg-[#FA4616]/10 border-[#FA4616]/20'
    },
    {
      id: 'aptitude',
      title: 'Aptitude & Reasoning',
      subtitle: `${aptitudeAccuracy}% accuracy across ${aptitudeAttempts.length} tests`,
      progress: aptitudeAccuracy,
      progressColor: 'bg-blue-500',
      icon: Brain,
      badge: 'TCS / Infosys Mocks',
      actionLabel: 'Practice Aptitude',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'communication',
      title: 'Communication & HR',
      subtitle: 'Voice pitch analysis & STAR method builder',
      progress: 65,
      progressColor: 'bg-emerald-500',
      icon: MessageSquare,
      badge: 'Speech & GD',
      actionLabel: 'Practice Speaking',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'resume',
      title: 'AI Resume Studio',
      subtitle: `Current ATS score: ${latestAtsScore}/100`,
      progress: latestAtsScore,
      progressColor: latestAtsScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500',
      icon: FileCheck,
      badge: latestAtsScore >= 80 ? '80+ Compatible' : 'Needs Optimization',
      actionLabel: 'Launch Studio',
      color: latestAtsScore >= 80 ? 'text-emerald-400' : 'text-amber-400',
      bgColor: latestAtsScore >= 80 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-5 bubble-card shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FA4616]/10 text-[#FA4616] text-[11px] font-bold border border-[#FA4616]/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Placement Readiness Hub</span>
          </div>
          <h3 className="text-lg font-extrabold text-aurora-text-primary tracking-tight font-display">
            Campus Placement Preparation Modules
          </h3>
        </div>

        <button
          onClick={() => {
            setAiCurrentContext({ page: 'placement-hub' });
            setIsAiDrawerOpen(true);
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-[#FA4616] hover:underline self-start sm:self-center"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI Placement Coach</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {placementModules.map(m => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className="p-4 rounded-xl bg-aurora-bg-surface/80 border border-aurora-border hover:border-aurora-borderStrong transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${m.bgColor}`}>
                    <Icon className={`w-4 h-4 ${m.color}`} />
                  </div>
                  <span className="text-[10px] font-bold text-aurora-text-secondary px-2 py-0.5 rounded-full bg-aurora-bg-primary border border-aurora-border">
                    {m.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-aurora-text-primary group-hover:text-[#FA4616] transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-aurora-text-secondary mt-0.5 leading-tight">
                    {m.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="w-full bg-aurora-bg-primary h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${m.progressColor} h-full rounded-full transition-all`}
                    style={{ width: `${Math.min(100, Math.max(10, m.progress))}%` }}
                  />
                </div>

                <button
                  onClick={() => setActiveTab(m.id as any)}
                  className="w-full flex items-center justify-between text-xs font-bold text-aurora-text-secondary group-hover:text-aurora-text-primary pt-1"
                >
                  <span>{m.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FA4616] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
