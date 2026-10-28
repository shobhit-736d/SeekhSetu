import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Filter,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Compass,
  Layers,
  GraduationCap,
  Globe,
  Tag,
  ThumbsUp,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
  MessagesSquare
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../services/apiService';
import { LearningResource } from '../../types/career';
import { learningResourcesList, getResourceCategories } from '../../data/learningResourcesData';
import { careerTracksList } from '../../data/careerTracksData';

const PAGE_SIZE = 12;

export const ResourcesView: React.FC = () => {
  const {
    selectedResourceTrackFilter,
    setSelectedResourceTrackFilter,
    navigateToTrackRoadmap,
    navigateToTrackProjects,
    navigateToTrackAssessments,
    navigateToTrackInterviews,
    toggleOpportunityBookmark,
    isOpportunityBookmarked,
    showToast
  } = useStudy();

  const { isAuthenticated, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Types');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'title' | 'difficulty'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDetailResource, setActiveDetailResource] = useState<LearningResource | null>(null);

  // Fetch from API with graceful bundled fallback
  useEffect(() => {
    let isMounted = true;
    const fetchResources = async () => {
      setLoading(true);
      try {
        const data = await ApiService.getLearningResources({
          track: selectedResourceTrackFilter !== 'all' ? selectedResourceTrackFilter : undefined,
          category: selectedCategory !== 'All Types' ? selectedCategory : undefined,
          pricing: selectedPricing !== 'All' ? selectedPricing : undefined,
          difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
          search: searchQuery.trim() || undefined
        });
        if (isMounted) {
          setResources(data && data.length > 0 ? data : learningResourcesList);
        }
      } catch (err) {
        console.warn('API error, falling back to bundled resources:', err);
        if (isMounted) {
          setResources(learningResourcesList);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchResources();
    return () => {
      isMounted = false;
    };
  }, [selectedResourceTrackFilter, selectedCategory, selectedPricing, selectedDifficulty, searchQuery]);

  // Client-side filtering & sorting
  const filteredResources = useMemo(() => {
    let result = [...resources];

    if (selectedResourceTrackFilter && selectedResourceTrackFilter !== 'all') {
      result = result.filter(r => r.trackSlug.toLowerCase() === selectedResourceTrackFilter.toLowerCase());
    }

    if (selectedCategory && selectedCategory !== 'All Types') {
      result = result.filter(r => r.category === selectedCategory);
    }

    if (selectedDifficulty && selectedDifficulty !== 'All') {
      result = result.filter(r => r.difficulty === selectedDifficulty || r.difficulty === 'All Levels');
    }

    if (selectedPricing && selectedPricing !== 'All') {
      result = result.filter(r => r.pricing === selectedPricing);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.topic && r.topic.toLowerCase().includes(q)) ||
        r.authorOrProvider.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'popular') {
        // Original SeekhSetu guides prioritized, then upvotes
        if (a.isOriginalSeekhSetu && !b.isOriginalSeekhSetu) return -1;
        if (!a.isOriginalSeekhSetu && b.isOriginalSeekhSetu) return 1;
        return (b.upvotes || 0) - (a.upvotes || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'difficulty') {
        const order: Record<string, number> = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'All Levels': 0 };
        return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
      }
      return 0;
    });

    return result;
  }, [resources, selectedResourceTrackFilter, selectedCategory, selectedDifficulty, selectedPricing, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredResources.length / PAGE_SIZE) || 1;
  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredResources.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredResources, currentPage]);

  const handleTrackChange = (slug: string) => {
    setSelectedResourceTrackFilter(slug);
    setCurrentPage(1);
  };

  const handleBookmarkClick = (e: React.MouseEvent, res: LearningResource) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setAuthModalTab('register');
      setIsAuthModalOpen(true);
      showToast('Sign in to save resources to your profile!', 'info');
      return;
    }
    toggleOpportunityBookmark({
      itemId: res.id,
      itemType: 'resource',
      title: res.title,
      trackSlug: res.trackSlug
    });
  };

  // Map track slug to title
  const getTrackTitle = (slug: string) => {
    const track = careerTracksList.find(t => t.slug === slug);
    return track ? track.title : slug;
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
            <BookOpen className="w-3.5 h-3.5 text-[#FA4616]" />
            <span>Curated Tech Learning Vault</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-aurora-text-primary tracking-tight leading-tight">
            Curated <span className="text-[#FA4616]">Learning Resources</span> & Guides
          </h1>

          <p className="text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
            Discover verified official documentation, open-source textbooks, interactive courses, and original SeekhSetu curricula structured across 18 tech disciplines.
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
              placeholder="Search by topic, keyword, author, or tech (e.g. React, Python, Docker, Algorithms)..."
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
              {learningResourcesList.length}+ Curated
            </div>
            <div className="text-xs text-aurora-text-secondary">Official & Verified Entries</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-[#FA4616]">
              18 Tracks
            </div>
            <div className="text-xs text-aurora-text-secondary">Complete Discipline Coverage</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">
              100% Free / Open
            </div>
            <div className="text-xs text-aurora-text-secondary">Zero Paywalled Roadblocks</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-display text-blue-600 dark:text-blue-400">
              Verified Links
            </div>
            <div className="text-xs text-aurora-text-secondary">Authentic Industry Sources</div>
          </div>
        </div>
      </div>

      {/* 2. MULTI-LEVEL FILTERS & CONTROLS */}
      <div className="space-y-4">
        {/* Track Dropdown & Quick Track Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#FA4616]" />
            <span className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary">
              Career Track:
            </span>
            <select
              value={selectedResourceTrackFilter}
              onChange={e => handleTrackChange(e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs font-semibold text-aurora-text-primary focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
            >
              <option value="all">★ All 18 Tech Career Tracks</option>
              {careerTracksList.map(track => (
                <option key={track.slug} value={track.slug}>
                  {track.title} ({track.category})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Track Switcher Pills for top tracks */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {['all', 'fullstack-web', 'frontend', 'backend', 'ai-ml', 'cloud-computing', 'devops-sre'].map(slug => {
              const isSelected = selectedResourceTrackFilter === slug;
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

        {/* Secondary Category, Difficulty, Pricing & Sort Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {getResourceCategories().map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#FA4616] text-white shadow-sm'
                      : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Dropdown Filters (Difficulty, Pricing, Sort) */}
          <div className="flex items-center gap-2 ml-auto">
            <select
              value={selectedDifficulty}
              onChange={e => {
                setSelectedDifficulty(e.target.value);
                setCurrentPage(1);
              }}
              className="py-1.5 px-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border font-semibold text-aurora-text-secondary focus:outline-none"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              value={selectedPricing}
              onChange={e => {
                setSelectedPricing(e.target.value);
                setCurrentPage(1);
              }}
              className="py-1.5 px-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border font-semibold text-aurora-text-secondary focus:outline-none"
            >
              <option value="All">All Pricing</option>
              <option value="Free">100% Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="py-1.5 px-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border font-semibold text-aurora-text-primary focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="title">Title (A-Z)</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE FILTERS SUMMARY & COUNT */}
      <div className="flex items-center justify-between text-xs text-aurora-text-secondary px-1">
        <div>
          Showing <span className="font-bold text-aurora-text-primary">{filteredResources.length}</span> verified resources
          {selectedResourceTrackFilter !== 'all' && (
            <span> in <span className="text-[#FA4616] font-semibold">{getTrackTitle(selectedResourceTrackFilter)}</span></span>
          )}
        </div>

        {(searchQuery || selectedCategory !== 'All Types' || selectedDifficulty !== 'All' || selectedPricing !== 'All' || selectedResourceTrackFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Types');
              setSelectedDifficulty('All');
              setSelectedPricing('All');
              setSelectedResourceTrackFilter('all');
              setCurrentPage(1);
            }}
            className="text-[#FA4616] hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* 4. RESOURCE CARDS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 rounded-3xl bg-aurora-bg-surface border border-aurora-border animate-pulse p-6 space-y-4">
              <div className="h-4 bg-aurora-bg-elevated rounded w-1/3" />
              <div className="h-6 bg-aurora-bg-elevated rounded w-3/4" />
              <div className="h-16 bg-aurora-bg-elevated rounded w-full" />
              <div className="h-8 bg-aurora-bg-elevated rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : paginatedResources.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-aurora-bg-surface border border-aurora-border p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-aurora-text-muted mx-auto" />
          <h3 className="text-lg font-bold text-aurora-text-primary">No learning resources found</h3>
          <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-md mx-auto">
            We couldn't find any resources matching your current filters. Try searching for broader terms or reset your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Types');
              setSelectedDifficulty('All');
              setSelectedPricing('All');
              setSelectedResourceTrackFilter('all');
            }}
            className="px-5 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-bold hover:bg-[#E03D0F] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedResources.map(res => {
            const isBookmarked = isOpportunityBookmarked(res.id);

            return (
              <div
                key={res.id}
                onClick={() => setActiveDetailResource(res)}
                className={`group relative flex flex-col justify-between p-6 rounded-3xl bg-aurora-bg-surface border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
                  res.isOriginalSeekhSetu
                    ? 'border-[#FA4616]/40 hover:border-[#FA4616] bg-gradient-to-b from-[#FA4616]/5 via-aurora-bg-surface to-aurora-bg-surface'
                    : 'border-aurora-border hover:border-aurora-border/80 hover:bg-aurora-bg-elevated/40'
                }`}
              >
                {/* Top Badges & Bookmark */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {res.isOriginalSeekhSetu ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FA4616] text-white flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3" />
                          <span>SeekhSetu Original</span>
                        </span>
                      ) : res.isOfficial ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Official Spec</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          Verified Open Source
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary">
                        {res.category}
                      </span>
                    </div>

                    <button
                      onClick={e => handleBookmarkClick(e, res)}
                      className={`p-1.5 rounded-xl border transition-colors ${
                        isBookmarked
                          ? 'bg-[#FA4616] text-white border-[#FA4616]'
                          : 'bg-aurora-bg-elevated text-aurora-text-secondary hover:text-[#FA4616] border-aurora-border'
                      }`}
                      aria-label="Bookmark resource"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold font-display text-aurora-text-primary group-hover:text-[#FA4616] transition-colors leading-snug line-clamp-2">
                    {res.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-aurora-text-secondary leading-relaxed line-clamp-3">
                    {res.description}
                  </p>
                </div>

                {/* Bottom Meta & Action */}
                <div className="pt-4 mt-4 border-t border-aurora-border/70 space-y-3">
                  {/* Topic & Provider */}
                  <div className="flex items-center justify-between text-[11px] text-aurora-text-muted">
                    <span className="truncate max-w-[150px]">
                      By <strong className="text-aurora-text-secondary">{res.authorOrProvider}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary font-medium">
                      {res.difficulty}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 overflow-hidden text-[10px]">
                    {res.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-aurora-bg-secondary text-aurora-text-muted whitespace-nowrap">
                        #{tag}
                      </span>
                    ))}
                    {res.tags.length > 3 && (
                      <span className="text-aurora-text-muted">+{res.tags.length - 3}</span>
                    )}
                  </div>

                  {/* Action Link & Upvotes */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-aurora-text-muted flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-[#FA4616]" />
                      <span>{res.upvotes || 250}+ learners</span>
                    </span>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#FA4616] hover:text-[#E03D0F] transition-colors"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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

      {/* 6. IN-DEPTH RESOURCE BLUEPRINT MODAL */}
      <AnimatePresence>
        {activeDetailResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl bg-aurora-bg-surface border border-aurora-border shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 sm:px-8 pb-4 border-b border-aurora-border flex items-start justify-between gap-4 bg-aurora-bg-surface">
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    {activeDetailResource.isOriginalSeekhSetu ? (
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-[#FA4616] text-white">
                        SeekhSetu Original
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                        {activeDetailResource.category}
                      </span>
                    )}

                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary">
                      {activeDetailResource.difficulty}
                    </span>

                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {activeDetailResource.pricing}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-display text-aurora-text-primary">
                    {activeDetailResource.title}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveDetailResource(null)}
                  className="p-2 rounded-xl bg-aurora-bg-elevated text-aurora-text-secondary hover:text-aurora-text-primary transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
                {/* Description */}
                <p className="text-sm text-aurora-text-secondary leading-relaxed">
                  {activeDetailResource.description}
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-aurora-bg-secondary border border-aurora-border text-xs">
                  <div>
                    <span className="text-[11px] text-aurora-text-muted block">Provider / Author</span>
                    <strong className="text-aurora-text-primary">{activeDetailResource.authorOrProvider}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-aurora-text-muted block">Primary Track</span>
                    <strong className="text-aurora-text-primary">{getTrackTitle(activeDetailResource.trackSlug)}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-aurora-text-muted block">Language</span>
                    <strong className="text-aurora-text-primary">{activeDetailResource.language || 'English'}</strong>
                  </div>
                </div>

                {/* Topic & Prerequisites */}
                {activeDetailResource.topic && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
                      Primary Learning Objective
                    </h4>
                    <p className="text-xs text-aurora-text-secondary">
                      {activeDetailResource.topic}
                    </p>
                  </div>
                )}

                {activeDetailResource.prerequisites && activeDetailResource.prerequisites.length > 0 && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
                      Recommended Prerequisites
                    </h4>
                    <ul className="text-xs text-aurora-text-secondary space-y-1 pl-4 list-disc">
                      {activeDetailResource.prerequisites.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
                    Associated Skills & Concepts
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetailResource.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-secondary font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cross-linking to Roadmap, Projects & Assessments */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-aurora-bg-elevated to-aurora-bg-surface border border-aurora-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-aurora-text-primary block font-display">Preparing for this track?</strong>
                    <span className="text-aurora-text-secondary">Explore guided projects, roadmap milestones, and benchmark assessments for {getTrackTitle(activeDetailResource.trackSlug)}.</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => {
                        navigateToTrackProjects(activeDetailResource.trackSlug);
                        setActiveDetailResource(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary font-bold whitespace-nowrap transition-colors"
                    >
                      Track Projects
                    </button>
                    <button
                      onClick={() => {
                        navigateToTrackAssessments(activeDetailResource.trackSlug);
                        setActiveDetailResource(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 font-bold whitespace-nowrap transition-colors flex items-center gap-1"
                    >
                      <Award className="w-3 h-3 text-emerald-500" />
                      <span>Take Assessment</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateToTrackInterviews(activeDetailResource.trackSlug);
                        setActiveDetailResource(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 font-bold whitespace-nowrap transition-colors flex items-center gap-1"
                    >
                      <MessagesSquare className="w-3 h-3 text-amber-500" />
                      <span>Interview Prep</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateToTrackRoadmap(activeDetailResource.trackSlug);
                        setActiveDetailResource(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#FA4616]/10 text-[#FA4616] hover:bg-[#FA4616]/20 border border-[#FA4616]/30 font-bold whitespace-nowrap transition-colors"
                    >
                      Track Roadmap
                    </button>
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="p-4 sm:px-8 border-t border-aurora-border bg-aurora-bg-surface/95 backdrop-blur-md flex items-center justify-between gap-3 flex-shrink-0">
                <button
                  onClick={e => handleBookmarkClick(e, activeDetailResource)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                    isOpportunityBookmarked(activeDetailResource.id)
                      ? 'bg-[#FA4616] text-white border-[#FA4616]'
                      : 'bg-aurora-bg-secondary hover:bg-aurora-bg-elevated text-aurora-text-primary border-aurora-border'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isOpportunityBookmarked(activeDetailResource.id) ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveDetailResource(null)}
                    className="px-4 py-2 rounded-xl bg-aurora-bg-secondary hover:bg-aurora-bg-elevated text-xs font-semibold text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={activeDetailResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Launch Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
