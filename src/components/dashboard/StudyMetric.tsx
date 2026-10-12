import React from 'react';
import { Clock, Calendar, CheckSquare, Trophy, TrendingUp } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const StudyMetric: React.FC = () => {
  const {
    todayStudyMinutes,
    weekStudyMinutes,
    totalFocusedSessions,
    completedTopicsCount,
    totalTopicsCount,
    quizAttempts
  } = useStudy();

  // Calculate average quiz accuracy
  const avgAccuracy = quizAttempts.length > 0
    ? Math.round(quizAttempts.reduce((acc, q) => acc + q.accuracy, 0) / quizAttempts.length)
    : 0;

  const todayHours = (todayStudyMinutes / 60).toFixed(1);
  const weekHours = (weekStudyMinutes / 60).toFixed(1);

  const metrics = [
    {
      title: "Today's Study",
      value: `${todayHours}h`,
      subtext: `${todayStudyMinutes} focused minutes`,
      icon: Clock,
      color: 'text-[#FA4616]',
      bgColor: 'bg-[#FA4616]/10 border-[#FA4616]/20'
    },
    {
      title: "This Week",
      value: `${weekHours}h`,
      subtext: 'Across all subjects',
      icon: Calendar,
      color: 'text-[#1754D8]',
      bgColor: 'bg-[#1754D8]/10 border-[#1754D8]/20'
    },
    {
      title: "Topics Completed",
      value: `${completedTopicsCount}/${totalTopicsCount}`,
      subtext: `${totalTopicsCount - completedTopicsCount} topics pending`,
      icon: CheckSquare,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: "Quiz Accuracy",
      value: quizAttempts.length > 0 ? `${avgAccuracy}%` : '0%',
      subtext: `${quizAttempts.length} quizzes completed`,
      icon: Trophy,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border hover:border-[#FA4616]/40 transition-all shadow-sm bubble-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-bold text-aurora-text-secondary uppercase tracking-wider">{m.title}</span>
              <div className={`p-2.5 rounded-xl border ${m.bgColor}`}>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-aurora-text-primary tracking-tight font-mono">
              {m.value}
            </div>
            <div className="text-xs sm:text-sm text-aurora-text-secondary mt-1.5 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#FA4616]" />
              <span>{m.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
