import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { allDays, modulesMetadata, ModuleMetadata } from '../../data/roadmapData';
import { useStudy } from '../../context/StudyContext';
import { RoadmapCard } from './RoadmapCard';
import { ModuleHeader } from './ModuleHeader';
import { Search, Zap, Star, Filter } from 'lucide-react';
import { ModuleCategory } from '../../types/roadmap';

type FilterStatus = 'all' | 'not-started' | 'in-progress' | 'completed' | 'starred';

export const RoadmapView: React.FC = () => {
  const {
    navigateToDay,
    completedDays,
    completedTopics,
    starredDays
  } = useStudy();

  const [activeTrack, setActiveTrack] = useState<'30-day' | '7-day'>('30-day');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [selectedModule, setSelectedModule] = useState<ModuleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter days based on track, status, module, and search
  const filteredDays = useMemo(() => {
    return allDays.filter(day => {
      // Track filter
      if (activeTrack === '7-day' && !day.isSevenDayTrack) {
        return false;
      }

      // Module filter
      if (selectedModule !== 'all' && day.module !== selectedModule) {
        return false;
      }

      // Status filter
      const isCompleted = completedDays[day.dayNumber] || false;
      const finishedTopicsCount = day.topics.filter(t => completedTopics[t.id]).length;
      const isInProgress = !isCompleted && finishedTopicsCount > 0;
      const isStarred = starredDays.includes(day.dayNumber);

      if (statusFilter === 'completed' && !isCompleted) return false;
      if (statusFilter === 'in-progress' && !isInProgress) return false;
      if (statusFilter === 'not-started' && (isCompleted || isInProgress)) return false;
      if (statusFilter === 'starred' && !isStarred) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = day.title.toLowerCase().includes(q);
        const matchesObj = day.primaryObjective.toLowerCase().includes(q);
        const matchesDay = `day ${day.dayNumber}`.includes(q);
        if (!matchesTitle && !matchesObj && !matchesDay) return false;
      }

      return true;
    });
  }, [activeTrack, statusFilter, selectedModule, searchQuery, completedDays, completedTopics, starredDays]);

  // Group filtered days by module if "all" modules are selected
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Banner & Track Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card bubble-card">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FA4616]/15 text-[#FA4616] text-xs font-bold border border-[#FA4616]/30 mb-2">
            <Zap className="w-3.5 h-3.5 text-[#FA4616]" />
            Curriculum Architect
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
            Learning Roadmap & Track Explorer
          </h1>
          <p className="text-sm sm:text-base text-aurora-text-secondary mt-1.5 leading-relaxed">
            Choose between the comprehensive 30-day curriculum or fast-paced 7-day high-yield revision mode.
          </p>
        </div>

        {/* 30-Day vs 7-Day Track Toggle */}
        <div className="flex items-center p-1.5 rounded-xl bg-aurora-bg-surface border border-aurora-border self-start md:self-center gap-1.5">
          <button
            onClick={() => setActiveTrack('30-day')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTrack === '30-day'
                ? 'bg-[#FA4616] text-[#FCF6F5] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#344052]'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary'
            }`}
          >
            30-Day Complete Roadmap
          </button>
          <button
            onClick={() => setActiveTrack('7-day')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTrack === '7-day'
                ? 'bg-[#1754D8] text-white shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#344052]'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>7-Day Intensive Track</span>
          </button>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {(
            [
              { id: 'all', label: 'All Days' },
              { id: 'not-started', label: 'Not Started' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
              { id: 'starred', label: 'Starred Only' }
            ] as const
          ).map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                statusFilter === f.id
                  ? 'bg-[#FA4616]/15 text-[#FA4616] border border-[#FA4616]/40'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Right side: Module selector & search box */}
        <div className="flex items-center gap-2">
          {/* Module dropdown */}
          <div className="relative">
            <select
              value={selectedModule}
              onChange={e => setSelectedModule(e.target.value as any)}
              className="bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs sm:text-sm font-medium rounded-lg px-3 py-2 outline-none focus:border-aurora-indigo"
            >
              <option value="all">All Modules</option>
              {modulesMetadata.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search box */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-aurora-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter by title..."
              className="w-full bg-aurora-bg-surface border border-aurora-border rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-aurora-indigo"
            />
          </div>
        </div>
      </div>

      {/* Main Roadmap Content */}
      {groupedModules.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border bubble-card">
          <Filter className="w-10 h-10 text-aurora-text-secondary mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-bold text-aurora-text-primary">No days match your current filter</h3>
          <p className="text-sm text-aurora-text-secondary mt-1.5 max-w-md mx-auto">
            Try adjusting your search query, status filters, or track toggle.
          </p>
          <button
            onClick={() => {
              setStatusFilter('all');
              setSelectedModule('all');
              setSearchQuery('');
            }}
            className="mt-5 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FA4616] text-[#FCF6F5] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#344052] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
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
    </motion.div>
  );
};
