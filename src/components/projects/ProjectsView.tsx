import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FolderGit2,
  Filter,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Compass,
  Layers,
  Clock,
  Code2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ListChecks,
  HelpCircle,
  FileText,
  Workflow,
  Award,
  MessagesSquare
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../services/apiService';
import { GuidedProject, ProjectMilestone } from '../../types/career';
import { guidedProjectsList, getProjectTypes } from '../../data/guidedProjectsData';
import { careerTracksList } from '../../data/careerTracksData';

const PAGE_SIZE = 9;

export const ProjectsView: React.FC = () => {
  const {
    selectedProjectTrackFilter,
    setSelectedProjectTrackFilter,
    navigateToTrackRoadmap,
    navigateToTrackResources,
    navigateToTrackAssessments,
    navigateToTrackInterviews,
    toggleOpportunityBookmark,
    isOpportunityBookmarked,
    showToast
  } = useStudy();

  const { isAuthenticated, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  const [projects, setProjects] = useState<GuidedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('All Types');
  const [sortBy, setSortBy] = useState<'featured' | 'hours' | 'difficulty' | 'title'>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeProjectModal, setActiveProjectModal] = useState<GuidedProject | null>(null);

  // Local task check state within the active project blueprint
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  // Fetch projects from API with resilient fallback
  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await ApiService.getGuidedProjects({
          track: selectedProjectTrackFilter !== 'all' ? selectedProjectTrackFilter : undefined,
          difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
          projectType: selectedProjectType !== 'All Types' ? selectedProjectType : undefined,
          search: searchQuery.trim() || undefined
        });
        if (isMounted) {
          setProjects(data && data.length > 0 ? data : guidedProjectsList);
        }
      } catch (err) {
        console.warn('API error, falling back to bundled projects:', err);
        if (isMounted) {
          setProjects(guidedProjectsList);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, [selectedProjectTrackFilter, selectedDifficulty, selectedProjectType, searchQuery]);

  // Client-side filtering & sorting
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedProjectTrackFilter && selectedProjectTrackFilter !== 'all') {
      result = result.filter(p => p.trackSlug.toLowerCase() === selectedProjectTrackFilter.toLowerCase());
    }

    if (selectedDifficulty && selectedDifficulty !== 'All') {
      result = result.filter(p => p.difficulty === selectedDifficulty);
    }

    if (selectedProjectType && selectedProjectType !== 'All Types') {
      result = result.filter(p => p.projectType === selectedProjectType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.objective && p.objective.toLowerCase().includes(q)) ||
        p.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'hours') {
        return b.estimatedHours - a.estimatedHours;
      }
      if (sortBy === 'difficulty') {
        const order: Record<string, number> = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Capstone': 4 };
        return (order[b.difficulty] || 0) - (order[a.difficulty] || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [projects, selectedProjectTrackFilter, selectedDifficulty, selectedProjectType, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE) || 1;
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProjects.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProjects, currentPage]);

  const handleTrackChange = (slug: string) => {
    setSelectedProjectTrackFilter(slug);
    setCurrentPage(1);
  };

  const handleBookmarkClick = (e: React.MouseEvent, proj: GuidedProject) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setAuthModalTab('register');
      setIsAuthModalOpen(true);
      showToast('Sign in to save project blueprints to your profile!', 'info');
      return;
    }
    toggleOpportunityBookmark({
      itemId: proj.id,
      itemType: 'project',
      title: proj.title,
      trackSlug: proj.trackSlug
    });
  };

  const toggleTaskCheck = (taskKey: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const handleCopyBullet = (text: string, idx: number) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedBulletIdx(idx);
      showToast('Resume bullet copied to clipboard!', 'success');
      setTimeout(() => setCopiedBulletIdx(null), 2500);
    }
  };

  const getTrackTitle = (slug: string) => {
    const track = careerTracksList.find(t => t.slug === slug);
    return track ? track.title : slug;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20';
      case 'Advanced':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20';
      case 'Capstone':
        return 'bg-[#FA4616]/10 text-[#FA4616] border-[#FA4616]/30';
      default:
        return 'bg-aurora-bg-elevated text-aurora-text-secondary border-aurora-border';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
      className="space-y-8 pb-16"
    >
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aurora-bg-elevated via-aurora-bg-surface to-aurora-bg-secondary border border-aurora-border p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FA4616]/10 text-[#FA4616] text-xs font-bold border border-[#FA4616]/20">
            <FolderGit2 className="w-3.5 h-3.5 text-[#FA4616]" />
            <span>Guided Technical Portfolio Blueprints</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-aurora-text-primary tracking-tight leading-tight">
            Guided <span className="text-[#FA4616]">Project Blueprints</span> & Capstones
          </h1>

          <p className="text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
            Build production-grade applications that stand out on your resume. Complete with user stories, system architecture diagrams, step-by-step implementation milestones, and interview defense questions.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="mt-6 max-w-2xl">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-aurora-text-secondary pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by project name, tech stack, keyword (e.g. React, Kafka, Docker, RAG, PyTorch)..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-sm text-aurora-text-primary placeholder:text-aurora-text-muted focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 focus:border-[#FA4616] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
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
            <div className="text-xl sm:text-2xl font-extrabold font-display text-aurora-text-primary">
              18 Blueprints
            </div>
            <div className="text-xs text-aurora-text-secondary">Across Every Tech Track</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-[#FA4616]">
              Milestone Driven
            </div>
            <div className="text-xs text-aurora-text-secondary">Step-by-Step Task Checklists</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">
              Resume Ready
            </div>
            <div className="text-xs text-aurora-text-secondary">Quantified Impact Bullets</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-blue-600 dark:text-blue-400">
              Interview Defense
            </div>
            <div className="text-xs text-aurora-text-secondary">Technical Q&A Frameworks</div>
          </div>
        </div>
      </div>

      {/* 2. FILTERS & DISCIPLINE CONTROLS */}
      <div className="space-y-4">
        {/* Track Selection Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#FA4616]" />
            <span className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary">
              Career Track:
            </span>
            <select
              value={selectedProjectTrackFilter}
              onChange={e => handleTrackChange(e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs font-semibold text-aurora-text-primary focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
            >
              <option value="all">★ All 18 Career Tracks</option>
              {careerTracksList.map(track => (
                <option key={track.slug} value={track.slug}>
                  {track.title} ({track.category})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Track Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {['all', 'fullstack-web', 'frontend', 'backend', 'ai-ml', 'cloud-computing', 'devops-sre'].map(slug => {
              const isSelected = selectedProjectTrackFilter === slug;
              const label = slug === 'all' ? 'All' : slug.replace('-sre', '').replace('-dev', '');
              return (
                <button
                  key={slug}
                  onClick={() => handleTrackChange(slug)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#FA4616] text-white shadow-sm'
                      : 'bg-aurora-bg-elevated hover:bg-aurora-bg-secondary text-aurora-text-secondary'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Type, Difficulty & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Project Type Horizontal Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['All Types', 'Full-Stack Web', 'Frontend SPA', 'Microservice API', 'AI & Deep Learning System', 'Cloud Infrastructure & IaC', 'Mobile Application'].map(type => {
              const isSelected = selectedProjectType === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedProjectType(type);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#FA4616] text-white shadow-sm'
                      : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Dropdown Filters (Difficulty, Sort) */}
          <div className="flex items-center gap-2 ml-auto">
            <select
              value={selectedDifficulty}
              onChange={e => {
                setSelectedDifficulty(e.target.value);
                setCurrentPage(1);
              }}
              className="py-1.5 px-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border font-semibold text-aurora-text-secondary focus:outline-none"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Capstone">Capstone</option>
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="py-1.5 px-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border font-semibold text-aurora-text-primary focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="hours">Estimated Hours (High to Low)</option>
              <option value="difficulty">Difficulty (High to Low)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE FILTERS SUMMARY */}
      <div className="flex items-center justify-between text-xs text-aurora-text-secondary px-1">
        <div>
          Showing <span className="font-bold text-aurora-text-primary">{filteredProjects.length}</span> guided project blueprints
          {selectedProjectTrackFilter !== 'all' && (
            <span> for <span className="text-[#FA4616] font-semibold">{getTrackTitle(selectedProjectTrackFilter)}</span></span>
          )}
        </div>

        {(searchQuery || selectedDifficulty !== 'All' || selectedProjectType !== 'All Types' || selectedProjectTrackFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDifficulty('All');
              setSelectedProjectType('All Types');
              setSelectedProjectTrackFilter('all');
              setCurrentPage(1);
            }}
            className="text-[#FA4616] hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* 4. PROJECT CARDS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 rounded-3xl bg-aurora-bg-surface border border-aurora-border animate-pulse p-6 space-y-4">
              <div className="h-4 bg-aurora-bg-elevated rounded w-1/3" />
              <div className="h-6 bg-aurora-bg-elevated rounded w-3/4" />
              <div className="h-20 bg-aurora-bg-elevated rounded w-full" />
              <div className="h-8 bg-aurora-bg-elevated rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : paginatedProjects.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-aurora-bg-surface border border-aurora-border p-8 space-y-4">
          <FolderGit2 className="w-12 h-12 text-aurora-text-muted mx-auto" />
          <h3 className="text-lg font-bold text-aurora-text-primary">No project blueprints found</h3>
          <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-md mx-auto">
            We couldn't find any guided projects matching your current filters. Try searching for other technologies or reset your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDifficulty('All');
              setSelectedProjectType('All Types');
              setSelectedProjectTrackFilter('all');
            }}
            className="px-5 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-bold hover:bg-[#E03D0F] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map(proj => {
            const isBookmarked = isOpportunityBookmarked(proj.id);

            return (
              <div
                key={proj.id}
                onClick={() => setActiveProjectModal(proj)}
                className={`group relative flex flex-col justify-between p-6 rounded-3xl bg-aurora-bg-surface border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  proj.isFeatured
                    ? 'border-[#FA4616]/40 hover:border-[#FA4616] bg-gradient-to-b from-[#FA4616]/5 via-aurora-bg-surface to-aurora-bg-surface'
                    : 'border-aurora-border hover:border-aurora-border/80 hover:bg-aurora-bg-elevated/40'
                }`}
              >
                {/* Top Badges & Bookmark */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getDifficultyColor(proj.difficulty)}`}>
                        {proj.difficulty}
                      </span>

                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FA4616]" />
                        <span>~{proj.estimatedHours}h</span>
                      </span>

                      {proj.isFeatured && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={e => handleBookmarkClick(e, proj)}
                      className={`p-1.5 rounded-xl border transition-colors ${
                        isBookmarked
                          ? 'bg-[#FA4616] text-white border-[#FA4616]'
                          : 'bg-aurora-bg-elevated text-aurora-text-secondary hover:text-[#FA4616] border-aurora-border'
                      }`}
                      aria-label="Bookmark project"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold font-display text-aurora-text-primary group-hover:text-[#FA4616] transition-colors leading-snug line-clamp-2">
                    {proj.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-aurora-text-secondary leading-relaxed line-clamp-3">
                    {proj.summary}
                  </p>
                </div>

                {/* Tech Stack & Milestone Meta */}
                <div className="pt-4 mt-4 border-t border-aurora-border/70 space-y-3">
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {proj.techStack.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-aurora-bg-secondary border border-aurora-border/60 text-aurora-text-secondary font-mono text-[10px]">
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-aurora-bg-secondary text-[10px] text-aurora-text-muted">
                        +{proj.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Milestones count and Track Link */}
                  <div className="flex items-center justify-between text-xs text-aurora-text-muted pt-1">
                    <span className="flex items-center gap-1">
                      <ListChecks className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{proj.milestones.length} Milestones</span>
                    </span>

                    <span className="font-bold text-[#FA4616] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>View Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-aurora-border">
          <div className="text-xs text-aurora-text-secondary">
            Page <span className="font-bold text-aurora-text-primary">{currentPage}</span> of <span className="font-bold text-aurora-text-primary">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-colors ${
                  currentPage === pageNum
                    ? 'bg-[#FA4616] text-white shadow-sm'
                    : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border border-aurora-border'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 6. FULL PROJECT BLUEPRINT DRAWER / MODAL */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-aurora-bg-surface border border-aurora-border shadow-2xl overflow-hidden"
            >
              {/* Fixed Header */}
              <div className="p-6 sm:px-8 pb-4 border-b border-aurora-border flex items-start justify-between gap-4 bg-aurora-bg-surface">
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${getDifficultyColor(activeProjectModal.difficulty)}`}>
                      {activeProjectModal.difficulty}
                    </span>
                    <span className="text-[11px] font-semibold text-aurora-text-muted">
                      ~{activeProjectModal.estimatedHours} hours
                    </span>
                    <span className="text-[11px] font-bold text-[#FA4616]">
                      {getTrackTitle(activeProjectModal.trackSlug)}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-display text-aurora-text-primary">
                    {activeProjectModal.title}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-2 rounded-xl bg-aurora-bg-elevated text-aurora-text-secondary hover:text-aurora-text-primary transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
                {/* Objective & Problem Statement */}
                <div className="space-y-3 p-4 rounded-2xl bg-aurora-bg-secondary border border-aurora-border text-xs">
                  <div>
                    <span className="font-bold text-[#FA4616] uppercase tracking-wider block mb-1">
                      Project Objective
                    </span>
                    <p className="text-aurora-text-primary leading-relaxed">
                      {activeProjectModal.objective || activeProjectModal.summary}
                    </p>
                  </div>

                  {activeProjectModal.problemStatement && (
                    <div className="pt-2 border-t border-aurora-border/70">
                      <span className="font-bold text-aurora-text-secondary uppercase tracking-wider block mb-1">
                        Real-World Problem Statement
                      </span>
                      <p className="text-aurora-text-secondary leading-relaxed">
                        {activeProjectModal.problemStatement}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-[#FA4616]" />
                    <span>Technology Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProjectModal.techStack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs font-mono font-medium text-aurora-text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* System Architecture Overview */}
                {activeProjectModal.systemArchitectureOverview && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary flex items-center gap-1.5">
                      <Workflow className="w-4 h-4 text-[#FA4616]" />
                      <span>System Architecture Overview</span>
                    </h4>
                    <div className="p-4 rounded-2xl bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-secondary leading-relaxed">
                      {activeProjectModal.systemArchitectureOverview}
                    </div>
                  </div>
                )}

                {/* Implementation Milestones / Steps */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4 text-emerald-500" />
                    <span>Implementation Milestones & Actionable Steps</span>
                  </h4>

                  <div className="space-y-3">
                    {activeProjectModal.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-[#FA4616]">
                            Step {m.stepNumber}: {m.title}
                          </span>
                          {m.deliverable && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                              Deliverable: {m.deliverable}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5 pl-2">
                          {m.tasks.map((task, tIdx) => {
                            const taskKey = `${activeProjectModal.id}-m${m.stepNumber}-t${tIdx}`;
                            const isChecked = !!checkedTasks[taskKey];

                            return (
                              <label
                                key={tIdx}
                                className="flex items-start gap-2.5 text-xs text-aurora-text-secondary hover:text-aurora-text-primary cursor-pointer select-none"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleTaskCheck(taskKey)}
                                  className="mt-0.5 rounded text-[#FA4616] focus:ring-[#FA4616] bg-aurora-bg-surface border-aurora-border cursor-pointer"
                                />
                                <span className={isChecked ? 'line-through opacity-60' : ''}>
                                  {task}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resume-Ready Bullet Points */}
                {activeProjectModal.resumeBulletPoints && activeProjectModal.resumeBulletPoints.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span>Resume-Ready Bullet Points (Click to Copy)</span>
                    </h4>

                    <div className="space-y-2">
                      {activeProjectModal.resumeBulletPoints.map((bullet, idx) => {
                        const isCopied = copiedBulletIdx === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => handleCopyBullet(bullet, idx)}
                            className="p-3 rounded-2xl bg-aurora-bg-elevated hover:bg-aurora-bg-secondary border border-aurora-border flex items-start justify-between gap-3 text-xs cursor-pointer transition-colors group"
                          >
                            <p className="text-aurora-text-secondary group-hover:text-aurora-text-primary leading-relaxed">
                              • {bullet}
                            </p>
                            <button
                              className="p-1 rounded-lg bg-aurora-bg-surface text-aurora-text-muted group-hover:text-aurora-text-primary flex-shrink-0"
                              aria-label="Copy resume bullet point"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Interview Defense Questions */}
                {activeProjectModal.interviewDefenseQuestions && activeProjectModal.interviewDefenseQuestions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-purple-500" />
                      <span>Technical Interview Defense Questions</span>
                    </h4>

                    <div className="space-y-2.5">
                      {activeProjectModal.interviewDefenseQuestions.map((qa, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-1.5 text-xs">
                          <strong className="text-aurora-text-primary block font-semibold">
                            Q: {qa.question}
                          </strong>
                          <p className="text-aurora-text-secondary leading-relaxed pl-3 border-l-2 border-[#FA4616]/60">
                            <strong>Key Points to Explain: </strong>
                            {qa.keyDiscussionPoints}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Fixed Footer */}
              <div className="p-4 sm:px-8 border-t border-aurora-border bg-aurora-bg-surface/95 backdrop-blur-md flex items-center justify-between gap-3 flex-shrink-0">
                <button
                  onClick={e => handleBookmarkClick(e, activeProjectModal)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                    isOpportunityBookmarked(activeProjectModal.id)
                      ? 'bg-[#FA4616] text-white border-[#FA4616]'
                      : 'bg-aurora-bg-secondary hover:bg-aurora-bg-elevated text-aurora-text-primary border-aurora-border'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isOpportunityBookmarked(activeProjectModal.id) ? 'Bookmarked' : 'Save Project'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigateToTrackResources(activeProjectModal.trackSlug);
                      setActiveProjectModal(null);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-aurora-bg-secondary hover:bg-aurora-bg-elevated text-xs font-semibold text-aurora-text-primary border border-aurora-border transition-colors"
                  >
                    Track Resources
                  </button>

                  <button
                    onClick={() => {
                      navigateToTrackAssessments(activeProjectModal.trackSlug);
                      setActiveProjectModal(null);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 transition-colors flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Assess Skills</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateToTrackInterviews(activeProjectModal.trackSlug);
                      setActiveProjectModal(null);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-700 dark:text-amber-300 border border-amber-500/20 transition-colors flex items-center gap-1.5"
                  >
                    <MessagesSquare className="w-3.5 h-3.5 text-amber-500" />
                    <span>Interview Prep</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateToTrackRoadmap(activeProjectModal.trackSlug);
                      setActiveProjectModal(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Track Roadmap</span>
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
