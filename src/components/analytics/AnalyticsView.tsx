import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../../context/StudyContext';
import { modulesMetadata, getDaysByModule } from '../../data/roadmapData';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  BarChart3,
  Clock,
  CheckCircle2,
  Trophy,
  PieChart as PieIcon
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const {
    studySessions,
    quizAttempts,
    completedTopics,
    todayStudyMinutes,
    weekStudyMinutes,
    overallSyllabusProgress,
    revisionTasks
  } = useStudy();

  // 1. Daily Study Duration for the past 7 days
  const dailyStudyData = useMemo(() => {
    const daysArr = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

      const dayMins = studySessions
        .filter(s => s.startTime.startsWith(dateStr))
        .reduce((acc, s) => acc + s.durationMinutes, 0);

      daysArr.push({
        day: dayName,
        date: dateStr,
        minutes: dayMins
      });
    }
    return daysArr;
  }, [studySessions]);

  // 2. Subject / Module Time & Completion Distribution
  const moduleDistributionData = useMemo(() => {
    const colors = ['#FA4616', '#1754D8', '#22C55E', '#F59E0B', '#ED7649', '#EC4899', '#38BDF8', '#8B5CF6'];

    return modulesMetadata.map((m, idx) => {
      const mDays = getDaysByModule(m.id);
      const dayNumbers = new Set(mDays.map(d => d.dayNumber));

      // Calculate minutes logged on this module
      const mins = studySessions
        .filter(s => s.dayNumber && dayNumbers.has(s.dayNumber))
        .reduce((acc, s) => acc + s.durationMinutes, 0);

      // Calculate topic completion
      let topicsDone = 0;
      let topicsTotal = 0;
      mDays.forEach(d => {
        topicsTotal += d.topics.length;
        d.topics.forEach(t => {
          if (completedTopics[t.id]) topicsDone++;
        });
      });

      return {
        name: m.name.split(' ')[0], // short name
        fullName: m.name,
        minutes: mins > 0 ? mins : 10, // provide minimal baseline for visual chart
        topicsDone,
        topicsTotal,
        color: colors[idx % colors.length]
      };
    });
  }, [studySessions, completedTopics]);

  // 3. Quiz Performance & Accuracy Trend over attempts
  const quizAccuracyData = useMemo(() => {
    if (quizAttempts.length === 0) {
      return [
        { attempt: 'Start', accuracy: 0 }
      ];
    }

    return quizAttempts
      .slice(-8)
      .map((qa, idx) => ({
        attempt: `Quiz ${idx + 1}`,
        accuracy: qa.accuracy,
        score: `${qa.score}/${qa.totalQuestions}`
      }));
  }, [quizAttempts]);

  // Total estimated hours vs actual study hours
  const actualHours = (studySessions.reduce((acc, s) => acc + s.durationMinutes, 0) / 60).toFixed(1);
  const estimatedHours = "72.5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card bubble-card">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FA4616]/15 text-[#FA4616] text-xs font-bold border border-[#FA4616]/30 mb-2">
            <BarChart3 className="w-4 h-4 text-[#FA4616]" />
            Empirical Performance Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
            Learning Metrics & Analytics
          </h1>
          <p className="text-sm sm:text-base text-aurora-text-secondary mt-1.5 leading-relaxed">
            Real visualizations derived from your genuine study logs, quiz scores, and roadmap progression.
          </p>
        </div>

        {/* Aggregate KPI */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <div className="px-4 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-left md:text-right text-xs sm:text-sm">
            <span className="text-xs text-aurora-text-secondary uppercase font-bold">Actual vs Estimated</span>
            <div className="font-mono text-base font-bold text-aurora-text-primary mt-0.5">
              {actualHours}h <span className="text-aurora-text-secondary font-normal text-xs sm:text-sm">/ {estimatedHours}h</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border bubble-card">
          <div className="text-xs sm:text-sm font-semibold text-aurora-text-secondary mb-1">Today's Study Time</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#FA4616] font-mono">{todayStudyMinutes}m</div>
          <div className="text-xs text-aurora-text-secondary mt-1">Across active sessions</div>
        </div>
        <div className="p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border bubble-card">
          <div className="text-xs sm:text-sm font-semibold text-aurora-text-secondary mb-1">This Week Total</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1754D8] font-mono">{(weekStudyMinutes / 60).toFixed(1)}h</div>
          <div className="text-xs text-aurora-text-secondary mt-1">7-day rolling window</div>
        </div>
        <div className="p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border bubble-card">
          <div className="text-xs sm:text-sm font-semibold text-aurora-text-secondary mb-1">Overall Completion</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 dark:text-emerald-400 font-mono">{overallSyllabusProgress}%</div>
          <div className="text-xs text-aurora-text-secondary mt-1">Across 30 days</div>
        </div>
        <div className="p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border bubble-card">
          <div className="text-xs sm:text-sm font-semibold text-aurora-text-secondary mb-1">Pending Revisions</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 dark:text-amber-400 font-mono">
            {revisionTasks.filter(t => !t.completed).length}
          </div>
          <div className="text-xs text-aurora-text-secondary mt-1">In revision queue</div>
        </div>
      </div>

      {/* Charts Row 1: Daily Study Duration + Subject Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Study Duration Chart */}
        <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-4 bubble-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                Daily Study Duration (Minutes)
              </h3>
              <p className="text-xs text-aurora-text-secondary mt-0.5">
                Focus sessions recorded over the last 7 days
              </p>
            </div>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#FA4616]" />
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyStudyData}>
                <defs>
                  <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FA4616" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FA4616" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#A8A29E"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                />
                <YAxis
                  stroke="#A8A29E"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                  unit="m"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="#FA4616"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#area-grad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject-wise Time Distribution Donut */}
        <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-4 bubble-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                Subject Focus Distribution
              </h3>
              <p className="text-xs text-aurora-text-secondary mt-0.5">
                Relative proportion of study time by module
              </p>
            </div>
            <PieIcon className="w-4 h-4 sm:w-5 sm:h-5 text-aurora-indigo" />
          </div>

          <div className="h-64 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moduleDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="minutes"
                >
                  {moduleDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: 'var(--text-primary)'
                  }}
                  formatter={(value: any, name: any, item: any) => [
                    `${item.payload.minutes} mins`,
                    item.payload.fullName
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2: Topic Completion Bar Chart + Quiz Accuracy Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Completion Bar Chart */}
        <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-4 bubble-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                Topic Completion by Module
              </h3>
              <p className="text-xs text-aurora-text-secondary mt-0.5">
                Finished topics vs total curriculum scope
              </p>
            </div>
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleDistributionData}>
                <XAxis
                  dataKey="name"
                  stroke="#A8A29E"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                />
                <YAxis
                  stroke="#A8A29E"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Bar dataKey="topicsDone" name="Completed" fill="#FA4616" radius={[4, 4, 0, 0]} />
                <Bar dataKey="topicsTotal" name="Total Scope" fill="rgba(150, 150, 150, 0.2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Accuracy Trend */}
        <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-4 bubble-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                Quiz Accuracy Performance (%)
              </h3>
              <p className="text-xs text-aurora-text-secondary mt-0.5">
                Accuracy percentage over recent assessments
              </p>
            </div>
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quizAccuracyData}>
                <defs>
                  <linearGradient id="quiz-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="attempt"
                  stroke="#A8A29E"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                />
                <YAxis
                  stroke="#A8A29E"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#quiz-grad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
