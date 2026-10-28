import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../services/apiService';
import { CareerTrack, TrackCategory } from '../../types/career';
import { careerTracksList } from '../../data/careerTracksData';
import {
  Search,
  Zap,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Check,
  Bookmark,
  ChevronRight,
  X,
  BookOpen,
  DollarSign,
  Briefcase,
  Cpu,
  Shield,
  Server,
  Cloud,
  Terminal,
  LineChart,
  PieChart,
  Palette,
  Smartphone,
  Network,
  Boxes,
  Gamepad2,
  ExternalLink,
  Info,
  Library,
  FolderGit2,
  MessagesSquare
} from 'lucide-react';

const CATEGORIES: Array<TrackCategory | 'All'> = [
  'All',
  'Software Engineering',
  'Data & AI',
  'Cloud & Infrastructure',
  'Security',
  'Design & Product',
  'Specialized Tech'
];

const POPULAR_SKILLS = [
  'React',
  'TypeScript',
  'Python',
  'Java',
  'Spring Boot',
  'AWS',
  'Docker',
  'Kubernetes',
  'SQL',
  'FastAPI',
  'Figma',
  'Solidity',
  'C++'
];

const getTrackIcon = (iconName: string) => {
  switch (iconName) {
    case 'Layers': return Layers;
    case 'Monitor': return Server;
    case 'Server': return Server;
    case 'Coffee': return Terminal;
    case 'Terminal': return Terminal;
    case 'Brain': return Sparkles;
    case 'LineChart': return LineChart;
    case 'PieChart': return PieChart;
    case 'Cloud': return Cloud;
    case 'GitBranch': return Zap;
    case 'Shield': return Shield;
    case 'Smartphone': return Smartphone;
    case 'Palette': return Palette;
    case 'CheckCircle2': return CheckCircle2;
    case 'Boxes': return Boxes;
    case 'Gamepad2': return Gamepad2;
    case 'Network': return Network;
    case 'Cpu': return Cpu;
    default: return Briefcase;
  }
};

export const CareersView: React.FC = () => {
  const {
    enrolledTracks,
    activeTrack,
    enrollInTrack,
    switchActiveTrack,
    navigateToTrackRoadmap,
    navigateToTrackResources,
    navigateToTrackProjects,
    navigateToTrackAssessments,
    navigateToTrackInterviews,
    navigateToTrackCertifications,
    navigateToTrackJobs,
    showToast
  } = useStudy();

  const { isAuthenticated, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  const [tracks, setTracks] = useState<CareerTrack[]>(careerTracksList);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TrackCategory | 'All'>('All');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);
  const [activeDetailTrack, setActiveDetailTrack] = useState<CareerTrack | null>(null);

  // Load tracks from backend with local fallback
  useEffect(() => {
    let isMounted = true;
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const data = await ApiService.getCareerTracks();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setTracks(data);
        }
      } catch {
        // Local fallback handled in apiService
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTracks();
    return () => { isMounted = false; };
  }, []);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return tracks.filter(t => {
      // Category filter
      if (selectedCategory !== 'All' && t.category !== selectedCategory) {
        return false;
      }

      // Skill filter
      if (selectedSkillFilter) {
        const skillLower = selectedSkillFilter.toLowerCase();
        const hasSkill =
          t.skills.core.some(s => s.toLowerCase().includes(skillLower)) ||
          t.skills.recommended.some(s => s.toLowerCase().includes(skillLower)) ||
          t.skills.tools.some(s => s.toLowerCase().includes(skillLower));
        if (!hasSkill) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesDesc = t.shortDescription.toLowerCase().includes(q);
        const matchesRoles = t.commonJobRoles.some(r => r.toLowerCase().includes(q));
        const matchesSkills = t.skills.core.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesRoles && !matchesSkills) {
          return false;
        }
      }

      return true;
    });
  }, [tracks, selectedCategory, selectedSkillFilter, searchQuery]);

  const handleEnrollClick = (trackSlug: string) => {
    if (!isAuthenticated) {
      setAuthModalTab('register');
      setIsAuthModalOpen(true);
      showToast('Sign in to enroll and sync your roadmap progress!', 'info');
      return;
    }
    enrollInTrack(trackSlug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
      className="space-y-8 pb-12"
    >
      {/* 1. HERO & EXPLORER HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aurora-bg-elevated via-aurora-bg-surface to-aurora-bg-secondary border border-aurora-border p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FA4616]/10 text-[#FA4616] text-xs font-bold border border-[#FA4616]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#FA4616]" />
            <span>18 Specialized Technology Career Tracks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-aurora-text-primary tracking-tight leading-tight">
            Explore Modern <span className="text-[#FA4616]">Tech Careers</span> & Roadmaps
          </h1>

          <p className="text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
            Discover verified career roles, prerequisite knowledge, market compensation bands, and step-by-step learning sequences engineered for college students and job seekers.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="mt-6 max-w-2xl">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-aurora-text-secondary pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by career title, role, or skill (e.g. React, Python, Cloud, DevOps, Cyber)..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-sm text-aurora-text-primary placeholder:text-aurora-text-muted focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 focus:border-[#FA4616] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 rounded-lg hover:bg-aurora-bg-elevated text-aurora-text-secondary transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 pt-6 border-t border-aurora-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-aurora-text-primary">18 Tracks</div>
            <div className="text-xs text-aurora-text-secondary">Curated Career Pathways</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-[#FA4616]">Beginner → Ready</div>
            <div className="text-xs text-aurora-text-secondary">Multi-Phase Sequences</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">100% Free</div>
            <div className="text-xs text-aurora-text-secondary">Curated Resources & Docs</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-blue-600 dark:text-blue-400">Industry Matched</div>
            <div className="text-xs text-aurora-text-secondary">Verified Compensation Data</div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS & SKILL CHIPS */}
      <div className="space-y-4">
        {/* Category Horizontal Scrolling Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(category => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#FA4616] text-white shadow-sm'
                    : 'bg-aurora-bg-elevated hover:bg-aurora-bg-surface text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Popular Skill Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-aurora-text-muted font-medium mr-1">Filter by Skill:</span>
          {POPULAR_SKILLS.map(skill => {
            const isSelected = selectedSkillFilter === skill;
            return (
              <button
                key={skill}
                onClick={() => setSelectedSkillFilter(isSelected ? null : skill)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-blue-500/15 border-blue-500/40 text-blue-600 dark:text-blue-400 font-bold'
                    : 'bg-aurora-bg-elevated/70 border-aurora-border text-aurora-text-secondary hover:border-aurora-border-focus'
                }`}
              >
                {skill}
                {isSelected && ' ✕'}
              </button>
            );
          })}
          {selectedSkillFilter && (
            <button
              onClick={() => setSelectedSkillFilter(null)}
              className="text-[11px] text-[#FA4616] hover:underline font-bold ml-1"
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* 3. TRACKS COUNT & ACTIVE FILTERS BAR */}
      <div className="flex items-center justify-between text-xs text-aurora-text-secondary">
        <div>
          Showing <strong className="text-aurora-text-primary">{filteredTracks.length}</strong> of{' '}
          <strong className="text-aurora-text-primary">{tracks.length}</strong> technology career tracks
        </div>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedSkillFilter(null); setSearchQuery(''); }}
            className="text-[#FA4616] hover:underline font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* 4. CAREER TRACKS GRID */}
      {filteredTracks.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-aurora-bg-elevated flex items-center justify-center text-aurora-text-muted">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-aurora-text-primary">No career tracks match your search</h3>
          <p className="text-xs text-aurora-text-secondary max-w-md mx-auto">
            Try adjusting your search keywords, clearing selected skill chips, or selecting "All Categories".
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedSkillFilter(null); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-semibold shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map(track => {
            const Icon = getTrackIcon(track.icon);
            const isEnrolled = enrolledTracks.includes(track.slug);
            const isActive = activeTrack === track.slug;

            return (
              <div
                key={track.slug}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-aurora-bg-secondary hover:bg-aurora-bg-elevated/90 border border-aurora-border hover:border-aurora-border-focus transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Top Bar: Category badge & Market Demand */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-md border"
                      style={{
                        backgroundColor: `${track.accentColor}15`,
                        borderColor: `${track.accentColor}30`,
                        color: track.accentColor
                      }}
                    >
                      {track.category}
                    </span>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{track.marketDemand} Demand</span>
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 pt-1">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: `${track.accentColor}15`,
                        borderColor: `${track.accentColor}30`,
                        color: track.accentColor
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-aurora-text-primary group-hover:text-[#FA4616] transition-colors leading-snug">
                        {track.title}
                      </h3>
                      <div className="text-[11px] text-aurora-text-muted mt-0.5">
                        ~{track.totalEstimatedHours} hours • {track.roadmapStages?.length || 4} Roadmap Phases
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-aurora-text-secondary leading-relaxed line-clamp-3">
                    {track.shortDescription}
                  </p>

                  {/* Salary Estimate Pill Box */}
                  <div className="p-3 rounded-2xl bg-aurora-bg-surface border border-aurora-border/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-aurora-text-secondary">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Estimated Salary (India/Global)</span>
                      </span>
                      <span className="text-aurora-text-primary font-bold">{track.averageSalary.fresher}</span>
                    </div>
                    <div className="text-[10px] text-aurora-text-muted flex justify-between">
                      <span>Fresher: {track.averageSalary.fresher}</span>
                      <span>Senior: {track.averageSalary.senior}</span>
                    </div>
                  </div>

                  {/* Core Skills Cluster */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-semibold text-aurora-text-secondary">Core Required Skills:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {track.skills.core.slice(0, 5).map(skill => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                      {track.skills.core.length > 5 && (
                        <span className="text-[10px] font-semibold text-aurora-text-muted px-1.5 py-0.5">
                          +{track.skills.core.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Job Roles */}
                  <div className="text-[11px] text-aurora-text-muted flex items-center gap-1.5 truncate">
                    <Briefcase className="w-3.5 h-3.5 shrink-0 text-aurora-text-secondary" />
                    <span className="truncate">
                      Roles: {track.commonJobRoles.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-5 border-t border-aurora-border/70 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveDetailTrack(track)}
                    className="text-xs font-semibold text-aurora-text-secondary hover:text-aurora-text-primary transition-colors flex items-center gap-1"
                  >
                    <span>Role Specs</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEnrollClick(track.slug)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        isEnrolled
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border-aurora-border'
                      }`}
                    >
                      {isEnrolled ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Enrolled</span>
                        </span>
                      ) : (
                        'Enroll'
                      )}
                    </button>

                    <button
                      onClick={() => navigateToTrackRoadmap(track.slug)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. DISCLAIMER FOOTNOTE */}
      <div className="p-4 rounded-2xl bg-aurora-bg-elevated/50 border border-aurora-border/70 text-center text-xs text-aurora-text-muted max-w-4xl mx-auto space-y-1">
        <p>
          * <strong>Compensation Disclaimer:</strong> Salary ranges represent aggregated industry estimates (AmbitionBox, Glassdoor, and campus placement reports 2025–2026) across product, service, and startup firms in India and remote positions. Actual compensation varies by candidate experience, problem-solving capability, company tier, and location.
        </p>
      </div>

      {/* 6. TRACK DETAILS MODAL / DRAWER */}
      <AnimatePresence>
        {activeDetailTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl bg-aurora-bg-surface border border-aurora-border shadow-2xl overflow-hidden"
            >
              {/* Fixed Header */}
              <div className="p-6 sm:px-8 pb-4 border-b border-aurora-border flex items-start justify-between gap-4 bg-aurora-bg-surface">
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20">
                      {activeDetailTrack.category}
                    </span>
                    <span className="text-[11px] font-semibold text-aurora-text-muted">
                      ~{activeDetailTrack.totalEstimatedHours} hours
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-aurora-text-primary">
                    {activeDetailTrack.title}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveDetailTrack(null)}
                  className="p-2 rounded-xl bg-aurora-bg-elevated text-aurora-text-secondary hover:text-aurora-text-primary transition-colors flex-shrink-0"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
                {/* Description */}
                <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
                  {activeDetailTrack.overview || activeDetailTrack.shortDescription}
                </p>

                {/* Salary Breakdown */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-aurora-bg-secondary border border-aurora-border text-center">
                  <div>
                    <div className="text-[11px] text-aurora-text-muted">Fresher Band</div>
                    <div className="text-sm font-bold text-aurora-text-primary mt-0.5">
                      {activeDetailTrack.averageSalary.fresher}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-aurora-text-muted">Mid-Career (3-5 Yrs)</div>
                    <div className="text-sm font-bold text-[#FA4616] mt-0.5">
                      {activeDetailTrack.averageSalary.mid}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-aurora-text-muted">Senior / Lead</div>
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {activeDetailTrack.averageSalary.senior}
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
                    Learning Prerequisites
                  </h4>
                  <ul className="text-xs text-aurora-text-secondary space-y-1.5 pl-4 list-disc">
                    {activeDetailTrack.prerequisites.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>

                {/* Skills Matrix */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
                    Complete Competency Matrix
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-aurora-text-primary">Core Skills: </span>
                      <span className="text-aurora-text-secondary">{activeDetailTrack.skills.core.join(' • ')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-aurora-text-primary">Recommended: </span>
                      <span className="text-aurora-text-secondary">{activeDetailTrack.skills.recommended.join(' • ')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-aurora-text-primary">Tools & Platforms: </span>
                      <span className="text-aurora-text-secondary">{activeDetailTrack.skills.tools.join(' • ')}</span>
                    </div>
                  </div>
                </div>

                {/* Common Job Roles */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
                    Target Industry Roles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDetailTrack.commonJobRoles.map((role, idx) => (
                      <span key={idx} className="text-xs font-medium px-3 py-1 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dedicated Learning Hub Pathways */}
                <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
                    Dedicated Learning Hub Pathways
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    <button
                      onClick={() => {
                        navigateToTrackResources(activeDetailTrack.slug);
                        setActiveDetailTrack(null);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 text-left transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Library className="w-4 h-4 text-indigo-500 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Study Resources</div>
                          <div className="text-[11px] text-aurora-text-secondary truncate">Docs & courses</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                    </button>

                    <button
                      onClick={() => {
                        navigateToTrackProjects(activeDetailTrack.slug);
                        setActiveDetailTrack(null);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/20 text-left transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FolderGit2 className="w-4 h-4 text-purple-500 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-purple-700 dark:text-purple-300">Guided Projects</div>
                          <div className="text-[11px] text-aurora-text-secondary truncate">Real-world builds</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-purple-500 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                    </button>

                    <button
                      onClick={() => {
                        navigateToTrackAssessments(activeDetailTrack.slug);
                        setActiveDetailTrack(null);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-left transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Skill Assessment</div>
                          <div className="text-[11px] text-aurora-text-secondary truncate">MCQs & benchmark</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                    </button>

                    <button
                      onClick={() => {
                        navigateToTrackInterviews(activeDetailTrack.slug);
                        setActiveDetailTrack(null);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 text-left transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MessagesSquare className="w-4 h-4 text-amber-500 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-amber-700 dark:text-amber-300">Interview Prep</div>
                          <div className="text-[11px] text-aurora-text-secondary truncate">Questions & mocks</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                    </button>

                    <button
                      onClick={() => {
                        navigateToTrackCertifications(activeDetailTrack.slug);
                        setActiveDetailTrack(null);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 text-left transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Award className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-blue-700 dark:text-blue-300">Industry Certifications</div>
                          <div className="text-[11px] text-aurora-text-secondary truncate">Vendor-verified credentials</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                    </button>

                    <button
                      onClick={() => {
                        navigateToTrackJobs(activeDetailTrack.slug);
                        setActiveDetailTrack(null);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-left transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Briefcase className="w-4 h-4 text-rose-500 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-rose-700 dark:text-rose-300">Verified Opportunities</div>
                          <div className="text-[11px] text-aurora-text-secondary truncate">Direct company hiring drives</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Action Footer */}
              <div className="p-4 sm:px-8 border-t border-aurora-border bg-aurora-bg-surface/95 backdrop-blur-md flex items-center justify-between gap-3 flex-shrink-0">
                <button
                  onClick={() => handleEnrollClick(activeDetailTrack.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    enrolledTracks.includes(activeDetailTrack.slug)
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-aurora-bg-secondary hover:bg-aurora-bg-elevated text-aurora-text-primary border-aurora-border'
                  }`}
                >
                  {enrolledTracks.includes(activeDetailTrack.slug) ? '✓ Enrolled in Track' : 'Enroll in Track'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveDetailTrack(null)}
                    className="px-3.5 py-2 rounded-xl bg-aurora-bg-secondary hover:bg-aurora-bg-elevated text-xs font-semibold text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      navigateToTrackRoadmap(activeDetailTrack.slug);
                      setActiveDetailTrack(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Launch Learning Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
