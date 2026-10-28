import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allDays, modulesMetadata } from '../../data/roadmapData';
import { careerTracksList, getCareerTrackBySlug } from '../../data/careerTracksData';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { RoadmapCard } from './RoadmapCard';
import { ModuleHeader } from './ModuleHeader';
import { ModuleCategory } from '../../types/roadmap';
import { CareerTrack, RoadmapStage, RoadmapMilestone } from '../../types/career';
import {
  Search,
  Zap,
  Star,
  Filter,
  CheckCircle2,
  Check,
  ChevronDown,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Compass,
  FileCode,
  FolderGit2,
  Library,
  ExternalLink,
  Target,
  MessagesSquare,
  Briefcase
} from 'lucide-react';

type FilterStatus = 'all' | 'not-started' | 'in-progress' | 'completed' | 'starred';

export const RoadmapView: React.FC = () => {
  const {
    navigateToDay,
    completedDays,
    completedTopics,
    starredDays,
    selectedTrackSlug,
    setSelectedTrackSlug,
    enrolledTracks,
    activeTrack,
    enrollInTrack,
    switchActiveTrack,
    completedTrackMilestones,
    toggleTrackMilestone,
    isMilestoneCompleted,
    showToast,
    setActiveTab,
    navigateToTrackResources,
    navigateToTrackProjects,
    navigateToTrackAssessments,
    navigateToTrackInterviews,
    navigateToTrackCertifications,
    navigateToTrackJobs
  } = useStudy();

  const { isAuthenticated, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  // Flagship 30-Day Track State
  const [active30DayMode, setActive30DayMode] = useState<'30-day' | '7-day'>('30-day');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [selectedModule, setSelectedModule] = useState<ModuleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Career Track (defaults to context selectedTrackSlug or 'fullstack-web')
  const currentTrack: CareerTrack = useMemo(() => {
    return getCareerTrackBySlug(selectedTrackSlug) || careerTracksList[0];
  }, [selectedTrackSlug]);

  const isFlagshipTrack = currentTrack.slug === 'fullstack-web';
  const isEnrolledInCurrent = enrolledTracks.includes(currentTrack.slug);

  // Milestone completion statistics for multi-track roadmaps
  const trackMilestoneStats = useMemo(() => {
    if (!currentTrack || isFlagshipTrack) return { total: 0, completed: 0, percent: 0 };
    let total = 0;
    currentTrack.roadmapStages?.forEach(stage => {
      total += stage.milestones.length;
    });
    const completedList = completedTrackMilestones[currentTrack.slug] || [];
    const completed = completedList.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  }, [currentTrack, isFlagshipTrack, completedTrackMilestones]);

  // Filter days for Flagship 30-day sprint
  const filteredDays = useMemo(() => {
    return allDays.filter(day => {
      if (active30DayMode === '7-day' && !day.isSevenDayTrack) return false;
      if (selectedModule !== 'all' && day.module !== selectedModule) return false;

      const isCompleted = completedDays[day.dayNumber] || false;
      const finishedTopicsCount = day.topics.filter(t => completedTopics[t.id]).length;
      const isInProgress = !isCompleted && finishedTopicsCount > 0;
      const isStarred = starredDays.includes(day.dayNumber);

      if (statusFilter === 'completed' && !isCompleted) return false;
      if (statusFilter === 'in-progress' && !isInProgress) return false;
      if (statusFilter === 'not-started' && (isCompleted || isInProgress)) return false;
      if (statusFilter === 'starred' && !isStarred) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = day.title.toLowerCase().includes(q);
        const matchesObj = day.primaryObjective.toLowerCase().includes(q);
        const matchesDay = `day ${day.dayNumber}`.includes(q);
        if (!matchesTitle && !matchesObj && !matchesDay) return false;
      }

      return true;
    });
  }, [active30DayMode, statusFilter, selectedModule, searchQuery, completedDays, completedTopics, starredDays]);

  const groupedModules = useMemo(() => {
    if (selectedModule !== 'all') {
      const mod = modulesMetadata.find(m => m.id === selectedModule);
      return mod ? [{ module: mod, days: filteredDays }] : [];
    }
    return modulesMetadata
      .map(mod => ({
        module: mod,
        days: filteredDays.filter(d => d.module === mod.id)
      }))
      .filter(g => g.days.length > 0);
  }, [filteredDays, selectedModule]);

  // Filter stages & milestones for multi-track roadmap
  const filteredStages = useMemo(() => {
    if (isFlagshipTrack || !currentTrack.roadmapStages) return [];
    if (!searchQuery.trim()) return currentTrack.roadmapStages;

    const q = searchQuery.toLowerCase().trim();
    return currentTrack.roadmapStages
      .map(stage => ({
        ...stage,
        milestones: stage.milestones.filter(
          m =>
            m.title.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.skills.some(s => s.toLowerCase().includes(q))
        )
      }))
      .filter(stage => stage.milestones.length > 0);
  }, [currentTrack, isFlagshipTrack, searchQuery]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      setAuthModalTab('register');
      setIsAuthModalOpen(true);
      showToast('Sign in to enroll and track your milestone progress!', 'info');
      return;
    }
    enrollInTrack(currentTrack.slug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-8 pb-12"
    >
      {/* 1. TOP BAR: CAREER TRACK SELECTOR & HERO */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FA4616]/15 text-[#FA4616] text-xs font-bold border border-[#FA4616]/30">
              <Compass className="w-3.5 h-3.5 text-[#FA4616]" />
              <span>Multi-Track Interactive Curriculum Architect</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-aurora-text-primary tracking-tight">
              {currentTrack.title}
            </h1>

            <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
              {currentTrack.shortDescription}
            </p>
          </div>

          {/* Right: Track Selector Dropdown & Enrollment */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <label htmlFor="track-selector" className="sr-only">
                Select Career Track
              </label>
              <select
                id="track-selector"
                value={currentTrack.slug}
                onChange={e => {
                  setSelectedTrackSlug(e.target.value);
                  setSearchQuery('');
                }}
                className="w-full sm:w-72 appearance-none pl-4 pr-10 py-3 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm font-bold text-aurora-text-primary focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 focus:border-[#FA4616] shadow-sm cursor-pointer"
              >
                {careerTracksList.map(track => (
                  <option key={track.slug} value={track.slug}>
                    {track.slug === 'fullstack-web'
                      ? `★ ${track.title} (Flagship 30-Day)`
                      : `${track.title} (${track.category})`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-aurora-text-secondary absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Enroll in Track Button */}
            <button
              onClick={handleEnroll}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                isEnrolledInCurrent
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-sm'
              }`}
            >
              {isEnrolledInCurrent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Enrolled Track</span>
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  <span>Enroll in Track</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Track Overview Meta Stats */}
        <div className="pt-4 border-t border-aurora-border/70 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-aurora-text-secondary">
            <span className="flex items-center gap-1.5 font-semibold text-aurora-text-primary">
              <Clock className="w-4 h-4 text-[#FA4616]" />
              <span>~{currentTrack.totalEstimatedHours} Study Hours</span>
            </span>
            <span className="text-aurora-border">•</span>
            <span>Estimated Market CTC: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{currentTrack.averageSalary.fresher}</strong></span>
            <span className="text-aurora-border">•</span>
            <span>Category: <strong className="text-aurora-text-primary">{currentTrack.category}</strong></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigateToTrackResources(currentTrack.slug)}
              className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Library className="w-3.5 h-3.5" />
              <span>Track Resources</span>
            </button>

            <button
              onClick={() => navigateToTrackProjects(currentTrack.slug)}
              className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/25 text-purple-700 dark:text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Track Projects</span>
            </button>

            <button
              onClick={() => navigateToTrackInterviews(currentTrack.slug)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessagesSquare className="w-3.5 h-3.5" />
              <span>Interview Prep</span>
            </button>

            <button
              onClick={() => navigateToTrackCertifications(currentTrack.slug)}
              className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/25 text-blue-700 dark:text-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certifications</span>
            </button>

            <button
              onClick={() => navigateToTrackJobs(currentTrack.slug)}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Verified Jobs</span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className="px-3 py-1.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-[#FA4616] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#FA4616]" />
              <span>18 Career Tracks</span>
            </button>
          </div>
        </div>

        {/* Milestone Completion Progress Bar (Multi-track mode) */}
        {!isFlagshipTrack && (
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-aurora-text-secondary">Track Milestone Progress</span>
              <span className="text-[#FA4616]">
                {trackMilestoneStats.completed} / {trackMilestoneStats.total} Milestones ({trackMilestoneStats.percent}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-aurora-bg-surface overflow-hidden border border-aurora-border">
              <div
                className="h-full bg-gradient-to-r from-[#FA4616] to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${trackMilestoneStats.percent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 2. MODE A: FLAGSHIP 30-DAY FULL STACK SPRINT ROADMAP           */}
      {/* Preserves 100% of existing functionality, day cards, & modules */}
      {/* ============================================================== */}
      {isFlagshipTrack ? (
        <div className="space-y-6">
          {/* Flagship Switcher: 30-Day Complete vs 7-Day Intensive */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-aurora-bg-secondary border border-aurora-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-aurora-text-secondary">Sprint Mode:</span>
              <div className="flex items-center p-1 rounded-xl bg-aurora-bg-surface border border-aurora-border gap-1">
                <button
                  onClick={() => setActive30DayMode('30-day')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    active30DayMode === '30-day'
                      ? 'bg-[#FA4616] text-white shadow-sm'
                      : 'text-aurora-text-secondary hover:text-aurora-text-primary'
                  }`}
                >
                  30-Day Comprehensive Sprint
                </button>
                <button
                  onClick={() => setActive30DayMode('7-day')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    active30DayMode === '7-day'
                      ? 'bg-[#1754D8] text-white shadow-sm'
                      : 'text-aurora-text-secondary hover:text-aurora-text-primary'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>7-Day High-Yield Mode</span>
                </button>
              </div>
            </div>

            {/* Quick Status Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(
                [
                  { id: 'all', label: 'All Days' },
                  { id: 'not-started', label: 'Not Started' },
                  { id: 'in-progress', label: 'In Progress' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'starred', label: 'Starred' }
                ] as const
              ).map(f => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    statusFilter === f.id
                      ? 'bg-[#FA4616]/15 text-[#FA4616] border border-[#FA4616]/40 font-bold'
                      : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Module Selector & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border">
            <div className="flex items-center gap-2">
              <span className="text-xs text-aurora-text-muted font-medium">Filter Module:</span>
              <select
                value={selectedModule}
                onChange={e => setSelectedModule(e.target.value as any)}
                className="bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs font-medium rounded-lg px-3 py-2 outline-none focus:border-[#FA4616]"
              >
                <option value="all">All Modules (Days 1–30)</option>
                {modulesMetadata.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.badge})
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-aurora-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search day by title or objective..."
                className="w-full bg-aurora-bg-surface border border-aurora-border rounded-lg pl-9 pr-3.5 py-2 text-xs text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
              />
            </div>
          </div>

          {/* Grouped Day Cards */}
          {groupedModules.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border">
              <Filter className="w-10 h-10 text-aurora-text-secondary mx-auto mb-3" />
              <h3 className="text-base font-bold text-aurora-text-primary">No days match your current filter</h3>
              <p className="text-xs text-aurora-text-secondary mt-1 max-w-md mx-auto">
                Try resetting your status filters or searching for different keywords.
              </p>
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSelectedModule('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#FA4616] text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedModules.map(({ module, days }) => {
                const completedCount = days.filter(d => completedDays[d.dayNumber]).length;
                return (
                  <div key={module.id} className="space-y-4">
                    <ModuleHeader
                      module={module}
                      completedDaysCount={completedCount}
                      totalDaysCount={days.length}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {days.map(day => (
                        <RoadmapCard
                          key={day.dayNumber}
                          day={day}
                          onOpen={() => navigateToDay(day.dayNumber)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* ============================================================== */
        /* 3. MODE B: MULTI-TRACK INTERACTIVE ROADMAP STAGES & MILESTONES  */
        /* Renders visual stages for Frontend, Backend, AI, Cloud, etc.   */
        /* ============================================================== */
        <div className="space-y-8">
          {/* Search Milestones Input */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-aurora-bg-secondary border border-aurora-border flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-aurora-text-secondary">Roadmap View:</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20">
                {currentTrack.roadmapStages?.length || 4} Sequential Mastery Phases
              </span>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-aurora-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search milestones & skills..."
                className="w-full bg-aurora-bg-surface border border-aurora-border rounded-xl pl-9 pr-3.5 py-2 text-xs text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
              />
            </div>
          </div>

          {/* Sequential Stage Cards */}
          {filteredStages.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-aurora-bg-secondary border border-aurora-border">
              <Search className="w-8 h-8 text-aurora-text-muted mx-auto mb-2" />
              <h3 className="text-sm font-bold text-aurora-text-primary">No milestones match your search</h3>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#FA4616] text-white"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-8 relative">
              {filteredStages.map((stage: RoadmapStage, stageIdx: number) => (
                <div
                  key={stage.stageNumber}
                  className="rounded-3xl bg-aurora-bg-secondary border border-aurora-border overflow-hidden shadow-sm"
                >
                  {/* Stage Header */}
                  <div className="p-5 sm:p-6 bg-gradient-to-r from-aurora-bg-elevated via-aurora-bg-surface to-aurora-bg-secondary border-b border-aurora-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FA4616] text-white uppercase tracking-wider">
                          Phase {stage.stageNumber}
                        </span>
                        <span className="text-xs font-semibold text-aurora-text-muted">
                          {stage.phase} • ~{stage.durationWeeks} Weeks
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-display text-aurora-text-primary">
                        {stage.title}
                      </h3>
                      {stage.subtitle && (
                        <p className="text-xs text-aurora-text-secondary">{stage.subtitle}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-xs text-aurora-text-muted font-mono hidden sm:block">
                        {stage.milestones.length} Milestones
                      </div>
                      <button
                        onClick={() => navigateToTrackAssessments(currentTrack.slug)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold transition-colors"
                        title={`Take skill assessment for ${currentTrack.title}`}
                      >
                        <Award className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Assess Skills</span>
                      </button>
                    </div>
                  </div>

                  {/* Milestones List */}
                  <div className="p-5 sm:p-6 divide-y divide-aurora-border/60">
                    {stage.milestones.map((milestone: RoadmapMilestone, mIdx: number) => {
                      const isDone = isMilestoneCompleted(currentTrack.slug, milestone.id);

                      return (
                        <div
                          key={milestone.id}
                          className={`py-4 first:pt-0 last:pb-0 transition-colors ${
                            isDone ? 'opacity-90' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                              {/* Checkbox Button */}
                              <button
                                onClick={() => toggleTrackMilestone(currentTrack.slug, milestone.id)}
                                className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                                  isDone
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                    : 'bg-aurora-bg-surface hover:border-[#FA4616] border-aurora-border text-transparent'
                                }`}
                                aria-label={isDone ? 'Mark milestone incomplete' : 'Mark milestone complete'}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </button>

                              <div className="space-y-2">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4
                                      className={`text-sm font-bold ${
                                        isDone
                                          ? 'line-through text-aurora-text-muted'
                                          : 'text-aurora-text-primary'
                                      }`}
                                    >
                                      {milestone.title}
                                    </h4>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary">
                                      ~{milestone.estimatedHours} hrs
                                    </span>
                                  </div>

                                  <p className="text-xs text-aurora-text-secondary mt-1 leading-relaxed">
                                    {milestone.description}
                                  </p>
                                </div>

                                {/* Skills Tags */}
                                {milestone.skills && milestone.skills.length > 0 && (
                                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                    {milestone.skills.map((skill, sIdx) => (
                                      <span
                                        key={sIdx}
                                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Links for This Track */}
          <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center lg:text-left">
              <h4 className="text-sm font-bold text-aurora-text-primary">
                Ready to accelerate your {currentTrack.title} career?
              </h4>
              <p className="text-xs text-aurora-text-secondary">
                Explore curated resources, build production-grade projects, and benchmark your readiness.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              <button
                onClick={() => navigateToTrackResources(currentTrack.slug)}
                className="px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Library className="w-3.5 h-3.5 text-indigo-500" />
                <span>Track Resources</span>
              </button>

              <button
                onClick={() => navigateToTrackProjects(currentTrack.slug)}
                className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-purple-500" />
                <span>Guided Projects</span>
              </button>

              <button
                onClick={() => navigateToTrackAssessments(currentTrack.slug)}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span>Assess Skills</span>
              </button>

              <button
                onClick={() => navigateToTrackInterviews(currentTrack.slug)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <MessagesSquare className="w-3.5 h-3.5 text-amber-500" />
                <span>Interview Prep</span>
              </button>

              <button
                onClick={() => navigateToTrackCertifications(currentTrack.slug)}
                className="px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-blue-500" />
                <span>Certifications</span>
              </button>

              <button
                onClick={() => navigateToTrackJobs(currentTrack.slug)}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-rose-500" />
                <span>Hiring Drives</span>
              </button>

              <button
                onClick={() => setActiveTab('coding')}
                className="px-3.5 py-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-xs font-semibold text-aurora-text-primary transition-colors flex items-center gap-1.5"
              >
                <FileCode className="w-3.5 h-3.5 text-[#FA4616]" />
                <span>Coding Arena</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
