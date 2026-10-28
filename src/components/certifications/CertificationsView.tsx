import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Search,
  ExternalLink,
  Clock,
  CheckCircle,
  Bookmark,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle,
  Layers,
  GraduationCap
} from 'lucide-react';
import { CertificationItem, CertificationLevel } from '../../types/career';
import { careerTracksList } from '../../data/careerTracksData';
import { ApiService } from '../../services/apiService';
import { useStudy } from '../../context/StudyContext';

export const CertificationsView: React.FC = () => {
  const {
    activeTrack,
    selectedCertTrackFilter,
    setSelectedCertTrackFilter,
    navigateToTrackRoadmap,
    toggleOpportunityBookmark,
    isOpportunityBookmarked
  } = useStudy();

  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');
  const [fresherOnly, setFresherOnly] = useState<boolean>(false);
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null);

  // Sync selected track filter with context
  const selectedTrack = selectedCertTrackFilter || 'all';

  useEffect(() => {
    let isMounted = true;
    const fetchCerts = async () => {
      setLoading(true);
      try {
        const data = await ApiService.getCertifications({
          track: selectedTrack !== 'all' ? selectedTrack : undefined,
          issuer: selectedIssuer !== 'all' ? selectedIssuer : undefined,
          level: selectedLevel !== 'all' ? selectedLevel : undefined,
          search: searchQuery.trim() || undefined
        });
        if (isMounted) setCertifications(data);
      } catch (err) {
        console.error('Failed to load certifications:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCerts();
    return () => {
      isMounted = false;
    };
  }, [selectedTrack, selectedIssuer, selectedLevel, searchQuery]);

  // Extract unique issuers from list for filter dropdown
  const uniqueIssuers = useMemo(() => {
    const issuers = new Set<string>();
    certifications.forEach(c => issuers.add(c.issuer));
    return Array.from(issuers).sort();
  }, [certifications]);

  // Client-side filtering for freshers toggle
  const filteredCertifications = useMemo(() => {
    let result = certifications;
    if (fresherOnly) {
      result = result.filter(c => c.isHighValueForFreshers);
    }
    return result;
  }, [certifications, fresherOnly]);

  const toggleExpand = (id: string) => {
    setExpandedCertId(prev => (prev === id ? null : id));
  };

  const getLevelBadgeClass = (level: CertificationLevel) => {
    switch (level) {
      case 'Foundational':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'Associate':
        return 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20';
      case 'Professional':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      case 'Specialty':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-aurora-bg-elevated text-aurora-text-secondary border-aurora-border';
    }
  };

  const activeTrackObj = useMemo(() => {
    return careerTracksList.find(t => t.slug === activeTrack);
  }, [activeTrack]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
      className="space-y-8 pb-16"
    >
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aurora-bg-elevated via-aurora-bg-surface to-aurora-bg-secondary border border-aurora-border p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-[#FA4616]" />
            <span>Verified Industry Certifications Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-aurora-text-primary tracking-tight leading-tight">
            Global Vendor Credentials &amp; <span className="text-[#FA4616]">Exam Blueprints</span>
          </h1>
          <p className="text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
            Curated, high-ROI certifications recognized by global tech enterprises. Inspect exam domains, question breakdowns, pricing, and official study guides across all 18 technology career tracks.
          </p>

          {activeTrackObj && (
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
              <span className="text-aurora-text-secondary">Your Enrolled Track:</span>
              <button
                onClick={() => setSelectedCertTrackFilter(activeTrackObj.slug)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] hover:bg-[#FA4616]/20 font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FA4616]" />
                {activeTrackObj.title}
              </button>
              {selectedTrack !== 'all' && (
                <button
                  onClick={() => setSelectedCertTrackFilter('all')}
                  className="text-xs text-aurora-text-secondary hover:text-aurora-text-primary underline ml-2"
                >
                  View All Tracks
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-aurora-bg-surface border border-aurora-border rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="relative md:col-span-5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-aurora-text-secondary pointer-events-none" />
            <input
              type="text"
              placeholder="Search certification name, code (e.g. SAA-C03, CCNA), or vendor..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary placeholder:text-aurora-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 focus:border-[#FA4616] transition-all"
            />
          </div>

          {/* Career Track Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedTrack}
              onChange={e => setSelectedCertTrackFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
            >
              <option value="all">All Career Tracks (18 Tracks)</option>
              {careerTracksList.map(t => (
                <option key={t.slug} value={t.slug}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Certification Level Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
            >
              <option value="all">All Levels</option>
              <option value="Foundational">Foundational</option>
              <option value="Associate">Associate</option>
              <option value="Professional">Professional</option>
              <option value="Specialty">Specialty</option>
            </select>
          </div>

          {/* Issuer Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedIssuer}
              onChange={e => setSelectedIssuer(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
            >
              <option value="all">All Issuers</option>
              {uniqueIssuers.map(issuer => (
                <option key={issuer} value={issuer}>
                  {issuer}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filters & Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-aurora-border/60 text-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFresherOnly(!fresherOnly)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                fresherOnly
                  ? 'bg-[#FA4616]/10 border-[#FA4616]/30 text-[#FA4616]'
                  : 'bg-aurora-bg-elevated border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FA4616]" />
              High-Value For Freshers &amp; Campus Drives
            </button>
          </div>

          <span className="text-xs text-aurora-text-secondary">
            Showing <strong className="text-aurora-text-primary font-bold">{filteredCertifications.length}</strong> verified certifications
          </span>
        </div>
      </div>

      {/* Certifications Cards Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#FA4616] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-aurora-text-secondary text-sm">Loading verified industry certifications...</p>
        </div>
      ) : filteredCertifications.length === 0 ? (
        <div className="bg-aurora-bg-surface border border-aurora-border rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-aurora-text-muted mx-auto" />
          <h3 className="text-xl font-bold font-display text-aurora-text-primary">No certifications match your filters</h3>
          <p className="text-aurora-text-secondary text-sm">
            Try resetting your track filter, searching for an exam code, or clearing the level filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCertTrackFilter('all');
              setSelectedLevel('all');
              setSelectedIssuer('all');
              setFresherOnly(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold transition-colors shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCertifications.map(cert => {
            const isExpanded = expandedCertId === cert.id;
            const isBookmarked = isOpportunityBookmarked(cert.id || cert.code);

            return (
              <div
                key={cert.id || cert.code}
                className="bg-aurora-bg-surface border border-aurora-border hover:border-[#FA4616]/40 rounded-2xl p-6 transition-all duration-200 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Header Row: Issuer, Level, Code & Bookmark */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-aurora-bg-elevated border border-aurora-border text-xs font-semibold text-aurora-text-primary">
                        {cert.issuer}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${getLevelBadgeClass(
                          cert.level
                        )}`}
                      >
                        {cert.level}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] text-xs font-mono font-bold">
                        {cert.code}
                      </span>
                      {cert.isHighValueForFreshers && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-[11px] font-semibold">
                          <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          Fresher High ROI
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        toggleOpportunityBookmark({
                          itemId: cert.id || cert.code,
                          itemType: 'certification',
                          title: cert.name,
                          trackSlug: cert.trackSlug
                        })
                      }
                      title={isBookmarked ? 'Remove from bookmarks' : 'Save to bookmarks'}
                      className={`p-2 rounded-xl border transition-colors ${
                        isBookmarked
                          ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                          : 'bg-aurora-bg-elevated border-aurora-border text-aurora-text-muted hover:text-aurora-text-primary'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Cert Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold font-display text-aurora-text-primary tracking-tight leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-aurora-text-secondary mt-2 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-aurora-border/60 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-aurora-text-muted block font-medium">Exam Cost</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        ${cert.costUsd} USD
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-aurora-text-muted block font-medium">Duration</span>
                      <span className="font-semibold text-aurora-text-primary flex items-center gap-1">
                        <Clock className="w-3 h-3 text-aurora-text-muted" />
                        {cert.durationMinutes} mins
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-aurora-text-muted block font-medium">Passing Score</span>
                      <span className="font-semibold text-aurora-text-primary">
                        {cert.passingScore}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-aurora-text-muted block font-medium">Recommended Prep</span>
                      <span className="font-bold text-[#FA4616]">
                        ~{cert.recommendedPrepWeeks} Weeks
                      </span>
                    </div>
                  </div>

                  {/* Skills Assessed Chips */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold font-display text-aurora-text-muted uppercase tracking-wider block">
                      Assessed Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsAssessed.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-lg bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skillsAssessed.length > 4 && (
                        <span className="px-2 py-1 rounded-lg bg-aurora-bg-elevated text-aurora-text-muted text-xs">
                          +{cert.skillsAssessed.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expandable Exam Domains Blueprint */}
                  {cert.domains && cert.domains.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={() => toggleExpand(cert.id || cert.code)}
                        className="w-full flex items-center justify-between text-xs font-semibold text-[#FA4616] hover:text-[#E03D0F] py-1.5 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          {isExpanded ? 'Hide Exam Domains Blueprint' : `View ${cert.domains.length} Exam Domains`}
                        </span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border space-y-3 animate-in fade-in duration-200">
                          <h4 className="text-xs font-bold font-display text-aurora-text-secondary uppercase tracking-wider">
                            Official Exam Weight Distribution
                          </h4>
                          <div className="space-y-2.5">
                            {cert.domains.map((dom, dIdx) => (
                              <div key={dIdx} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-aurora-text-primary font-medium">{dom.name}</span>
                                  <span className="font-bold text-[#FA4616]">{dom.weightPercentage}%</span>
                                </div>
                                <div className="w-full bg-aurora-bg-surface border border-aurora-border rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="bg-[#FA4616] h-1.5 rounded-full"
                                    style={{ width: `${dom.weightPercentage}%` }}
                                  />
                                </div>
                                {dom.keyTopics && dom.keyTopics.length > 0 && (
                                  <div className="flex flex-wrap gap-1 pt-1 text-[11px] text-aurora-text-secondary">
                                    {dom.keyTopics.map((topic, tIdx) => (
                                      <span key={tIdx} className="text-aurora-text-secondary bg-aurora-bg-surface border border-aurora-border/60 px-1.5 py-0.5 rounded">
                                        • {topic}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-aurora-border/60 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => navigateToTrackRoadmap(cert.trackSlug)}
                    className="text-xs text-aurora-text-secondary hover:text-[#FA4616] font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#FA4616]" />
                    View Learning Roadmap
                  </button>

                  <div className="flex items-center gap-2">
                    {cert.officialFreeStudyGuideUrl && (
                      <a
                        href={cert.officialFreeStudyGuideUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface text-aurora-text-primary text-xs font-semibold border border-aurora-border transition-colors"
                        title="Official Vendor Exam Guide"
                      >
                        <FileText className="w-3.5 h-3.5 text-aurora-text-secondary" />
                        Study Guide
                      </a>
                    )}

                    <a
                      href={cert.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Official Portal
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Informational Disclaimer Footer */}
      <div className="rounded-2xl bg-aurora-bg-surface border border-aurora-border p-5 text-xs text-aurora-text-secondary space-y-2">
        <div className="flex items-center gap-2 font-bold font-display text-aurora-text-primary">
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Authentic Credential &amp; Examination Guarantee
        </div>
        <p className="leading-relaxed">
          All certification specifications, examination pricing, domain percentages, and blueprints listed in this guide are curated directly from the official issuing bodies (Amazon Web Services, Microsoft, Google Cloud, Cisco Systems, CompTIA, Oracle, Linux Foundation / CNCF, ISTQB, and Python Institute). SeekhSetu does not sell examination vouchers or issue unofficial certifications.
        </p>
      </div>
    </motion.div>
  );
};
