import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  MapPin,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  PlusCircle,
  Trash2,
  CheckCircle,
  FileCheck2,
  DollarSign
} from 'lucide-react';
import { JobOpportunity, ApplicationStatus } from '../../types/career';
import { careerTracksList } from '../../data/careerTracksData';
import { ApiService } from '../../services/apiService';
import { useStudy } from '../../context/StudyContext';

export const JobBoardView: React.FC = () => {
  const {
    activeTrack,
    selectedJobTrackFilter,
    setSelectedJobTrackFilter,
    jobApplications,
    trackJobApplication,
    deleteJobApplication,
    toggleOpportunityBookmark,
    isOpportunityBookmarked
  } = useStudy();

  const [activeTab, setActiveTab] = useState<'browse' | 'tracker'>('browse');
  const [jobListings, setJobListings] = useState<JobOpportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');

  // Tracking modal state
  const [trackingModalJob, setTrackingModalJob] = useState<JobOpportunity | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>('Applied');
  const [applicationNotes, setApplicationNotes] = useState<string>('');

  const selectedTrack = selectedJobTrackFilter || 'all';

  useEffect(() => {
    let isMounted = true;
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await ApiService.getJobListings({
          track: selectedTrack !== 'all' ? selectedTrack : undefined,
          jobType: selectedJobType !== 'all' ? selectedJobType : undefined,
          workplaceType: selectedWorkplace !== 'all' ? selectedWorkplace : undefined,
          experience: selectedExperience !== 'all' ? selectedExperience : undefined,
          search: searchQuery.trim() || undefined
        });
        if (isMounted) setJobListings(data);
      } catch (err) {
        console.error('Failed to load job listings:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, [selectedTrack, selectedJobType, selectedWorkplace, selectedExperience, searchQuery]);

  const activeTrackObj = useMemo(() => {
    return careerTracksList.find(t => t.slug === activeTrack);
  }, [activeTrack]);

  const handleOpenTrackModal = (job: JobOpportunity) => {
    const existing = jobApplications.find(
      a => (a.jobId && a.jobId === job.id) || (a.title === job.title && a.company === job.company)
    );
    setSelectedStatus(existing ? existing.status : 'Applied');
    setApplicationNotes(existing ? existing.notes || '' : '');
    setTrackingModalJob(job);
  };

  const handleSaveTrackApplication = async () => {
    if (!trackingModalJob) return;

    await trackJobApplication({
      jobId: trackingModalJob.id,
      title: trackingModalJob.title,
      company: trackingModalJob.company,
      location: trackingModalJob.location,
      workplaceType: trackingModalJob.workplaceType,
      status: selectedStatus,
      notes: applicationNotes,
      deadline: trackingModalJob.deadline || undefined,
      directApplyUrl: trackingModalJob.directApplyUrl
    });

    setTrackingModalJob(null);
  };

  // Status badge styling helper
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Wishlist':
        return 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20';
      case 'Applied':
        return 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20';
      case 'Online Assessment':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'Technical Interview':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      case 'HR Round':
        return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20';
      case 'Offered':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-aurora-bg-surface text-aurora-text-secondary border-aurora-border';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
      className="space-y-8 pb-16"
    >
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-aurora-bg-elevated via-aurora-bg-surface to-aurora-bg-secondary border border-aurora-border p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FA4616]" />
            <span>Verified Opportunities &amp; Campus Recruitment Board</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-aurora-text-primary tracking-tight leading-tight">
            Authentic Engineering &amp; <span className="text-[#FA4616]">Graduate Opportunities</span>
          </h1>
          <p className="text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
            Explore authentic entry-level positions, national talent hunts (TCS NQT, Infosys DSE, Wipro NTH, Accenture AASE), and summer internships linking directly to official company career portals with zero intermediaries.
          </p>

          {/* Navigation Tabs between Board and In-App Tracker */}
          <div className="flex items-center gap-3 pt-3 flex-wrap">
            <button
              onClick={() => setActiveTab('browse')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'browse'
                  ? 'bg-[#FA4616] text-white shadow-sm'
                  : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Verified Opportunities ({jobListings.length})
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'tracker'
                  ? 'bg-[#FA4616] text-white shadow-sm'
                  : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              My Application Pipeline ({jobApplications.length})
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Browse Verified Opportunities */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="bg-aurora-bg-surface border border-aurora-border rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search */}
              <div className="relative md:col-span-5">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-aurora-text-secondary pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by role, company (e.g. Amazon, TCS, Google), or location..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary placeholder:text-aurora-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 focus:border-[#FA4616] transition-all"
                />
              </div>

              {/* Track Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedTrack}
                  onChange={e => setSelectedJobTrackFilter(e.target.value)}
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

              {/* Job Type Filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedJobType}
                  onChange={e => setSelectedJobType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
                >
                  <option value="all">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Workplace Type */}
              <div className="md:col-span-2">
                <select
                  value={selectedWorkplace}
                  onChange={e => setSelectedWorkplace(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
                >
                  <option value="all">All Workplaces</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            {/* Status / Active Track Helper */}
            {activeTrackObj && selectedTrack === 'all' && (
              <div className="flex items-center gap-2 pt-2 text-xs text-aurora-text-secondary">
                <span>Tip: Quick filter for your enrolled track:</span>
                <button
                  onClick={() => setSelectedJobTrackFilter(activeTrackObj.slug)}
                  className="text-[#FA4616] hover:underline font-semibold"
                >
                  {activeTrackObj.title}
                </button>
              </div>
            )}
          </div>

          {/* Opportunities List */}
          {loading ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-10 h-10 border-4 border-[#FA4616] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-aurora-text-secondary text-sm">Fetching verified opportunities...</p>
            </div>
          ) : jobListings.length === 0 ? (
            <div className="bg-aurora-bg-surface border border-aurora-border rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <AlertCircle className="w-12 h-12 text-aurora-text-muted mx-auto" />
              <h3 className="text-xl font-bold font-display text-aurora-text-primary">No opportunities found</h3>
              <p className="text-aurora-text-secondary text-sm">
                Try adjusting your search keywords, track filter, or workplace preference.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedJobTrackFilter('all');
                  setSelectedJobType('all');
                  setSelectedWorkplace('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold transition-colors shadow-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {jobListings.map(job => {
                const isBookmarked = isOpportunityBookmarked(job.id || `${job.company}-${job.title}`);
                const trackedApp = jobApplications.find(
                  a => (a.jobId && a.jobId === job.id) || (a.title === job.title && a.company === job.company)
                );

                return (
                  <div
                    key={job.id || `${job.company}-${job.title}`}
                    className="bg-aurora-bg-surface border border-aurora-border hover:border-[#FA4616]/40 rounded-2xl p-6 sm:p-7 transition-all duration-200 shadow-sm space-y-6"
                  >
                    {/* Top Header: Company Info, Verified Badge, Bookmark & Track */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {job.companyLogo ? (
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            className="w-14 h-14 rounded-2xl object-cover border border-aurora-border bg-aurora-bg-elevated shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-aurora-bg-elevated flex items-center justify-center text-aurora-text-primary font-bold text-lg border border-aurora-border shrink-0">
                            {job.company.substring(0, 2).toUpperCase()}
                          </div>
                        )}

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-aurora-text-primary text-lg">{job.company}</span>
                            {job.isVerified && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                Official Verified Portal
                              </span>
                            )}
                            <span className="px-2.5 py-0.5 rounded-full bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary text-xs font-semibold">
                              {job.jobType}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20 text-xs font-semibold">
                              {job.workplaceType}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold font-display text-aurora-text-primary tracking-tight">
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      {/* Top Actions: Bookmark & Status Tracker */}
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        {trackedApp && (
                          <span
                            className={`px-3 py-1 rounded-xl border text-xs font-bold ${getStatusBadge(
                              trackedApp.status
                            )}`}
                          >
                            Status: {trackedApp.status}
                          </span>
                        )}

                        <button
                          onClick={() =>
                            toggleOpportunityBookmark({
                              itemId: job.id || `${job.company}-${job.title}`,
                              itemType: 'job',
                              title: `${job.title} at ${job.company}`,
                              trackSlug: job.trackSlug
                            })
                          }
                          title={isBookmarked ? 'Remove from bookmarks' : 'Bookmark opportunity'}
                          className={`p-2.5 rounded-xl border transition-colors ${
                            isBookmarked
                              ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                              : 'bg-aurora-bg-elevated border-aurora-border text-aurora-text-muted hover:text-aurora-text-primary'
                          }`}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>

                    {/* Location, Compensation & Deadline Pill Row */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-aurora-text-secondary py-3 border-y border-aurora-border/60">
                      <span className="flex items-center gap-1.5 text-aurora-text-secondary">
                        <MapPin className="w-4 h-4 text-aurora-text-muted" />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        {job.salaryRange}
                      </span>

                      {job.deadline && (
                        <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          Apply by: {job.deadline}
                        </span>
                      )}

                      {job.sourceNote && (
                        <span className="text-aurora-text-muted italic ml-auto hidden md:inline">
                          Source: {job.sourceNote}
                        </span>
                      )}
                    </div>

                    {/* Overview & Eligibility */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold font-display uppercase tracking-wider text-aurora-text-muted">
                          Role Overview
                        </h4>
                        <p className="text-aurora-text-secondary leading-relaxed text-xs sm:text-sm">
                          {job.overview}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold font-display uppercase tracking-wider text-aurora-text-muted">
                          Eligibility &amp; Target Batches
                        </h4>
                        <p className="text-aurora-text-secondary text-xs sm:text-sm">{job.eligibility}</p>
                        {job.batchesEligible && job.batchesEligible.length > 0 && (
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="text-xs text-aurora-text-muted">Batches:</span>
                            {job.batchesEligible.map(b => (
                              <span
                                key={b}
                                className="px-2 py-0.5 rounded-md bg-aurora-bg-elevated border border-aurora-border text-xs font-semibold text-aurora-text-primary"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Required Skills Chips */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold font-display uppercase tracking-wider text-aurora-text-muted block">
                        Evaluated Tech Skills:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Footer Actions */}
                    <div className="pt-4 border-t border-aurora-border/60 flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => handleOpenTrackModal(job)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-xs font-bold text-aurora-text-primary transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-[#FA4616]" />
                        {trackedApp ? 'Update Application Status' : 'Add to Application Tracker'}
                      </button>

                      <a
                        href={job.directApplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02]"
                      >
                        Direct Apply on {job.company}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: In-App Application Status Tracker */}
      {activeTab === 'tracker' && (
        <div className="space-y-8">
          <div className="bg-aurora-bg-surface border border-aurora-border rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div>
              <h3 className="text-xl font-bold font-display text-aurora-text-primary">Your Placement Pipeline</h3>
              <p className="text-sm text-aurora-text-secondary">
                Track every application from wishlist to offer letter with notes and interview milestones.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] text-xs font-bold">
                Total Tracked: {jobApplications.length}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                Offers: {jobApplications.filter(a => a.status === 'Offered').length}
              </span>
            </div>
          </div>

          {jobApplications.length === 0 ? (
            <div className="bg-aurora-bg-surface border border-aurora-border rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <Briefcase className="w-12 h-12 text-aurora-text-muted mx-auto" />
              <h4 className="text-lg font-bold font-display text-aurora-text-primary">No applications tracked yet</h4>
              <p className="text-sm text-aurora-text-secondary">
                Browse verified opportunities on the board and click &ldquo;Add to Application Tracker&rdquo; to log your progress.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold transition-colors shadow-sm"
              >
                Browse Verified Opportunities
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobApplications.map(app => (
                <div
                  key={app.id}
                  className="bg-aurora-bg-surface border border-aurora-border rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold font-display text-aurora-text-muted uppercase tracking-wider block">
                          {app.company}
                        </span>
                        <h4 className="text-lg font-bold font-display text-aurora-text-primary tracking-tight">{app.title}</h4>
                      </div>
                      <button
                        onClick={() => deleteJobApplication(app.id)}
                        title="Remove application"
                        className="p-1.5 text-aurora-text-muted hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-aurora-text-secondary">{app.location}</span>
                    </div>

                    {app.notes && (
                      <div className="p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-secondary">
                        <span className="text-[11px] text-aurora-text-muted block uppercase font-bold mb-1">
                          Notes / Next Steps:
                        </span>
                        {app.notes}
                      </div>
                    )}
                  </div>

                  {/* Quick Status Updater */}
                  <div className="space-y-2 pt-3 border-t border-aurora-border/60">
                    <label className="text-[11px] font-bold font-display text-aurora-text-muted uppercase block">
                      Update Status:
                    </label>
                    <select
                      value={app.status}
                      onChange={e =>
                        trackJobApplication({
                          ...app,
                          status: e.target.value as ApplicationStatus
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs font-semibold text-aurora-text-primary focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
                    >
                      <option value="Wishlist">Wishlist</option>
                      <option value="Applied">Applied</option>
                      <option value="Online Assessment">Online Assessment</option>
                      <option value="Technical Interview">Technical Interview</option>
                      <option value="HR Round">HR Round</option>
                      <option value="Offered">Offered 🎉</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    {app.directApplyUrl && (
                      <a
                        href={app.directApplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center inline-flex items-center justify-center gap-1.5 text-xs text-[#FA4616] hover:underline font-semibold pt-1"
                      >
                        Open Official Application Portal
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tracking Modal */}
      {trackingModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-aurora-bg-elevated border border-aurora-border rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-bold font-display text-[#FA4616] uppercase tracking-wider block">
                Track Application
              </span>
              <h3 className="text-xl font-bold font-display text-aurora-text-primary mt-1">
                {trackingModalJob.title} at {trackingModalJob.company}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold font-display text-aurora-text-secondary uppercase block mb-1.5">
                  Application Pipeline Stage
                </label>
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
                >
                  <option value="Wishlist">Wishlist</option>
                  <option value="Applied">Applied</option>
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Technical Interview">Technical Interview</option>
                  <option value="HR Round">HR Round</option>
                  <option value="Offered">Offered 🎉</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold font-display text-aurora-text-secondary uppercase block mb-1.5">
                  Notes &amp; Action Items (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Completed NQT cognitive round on Oct 20th; awaiting technical interview invite..."
                  value={applicationNotes}
                  onChange={e => setApplicationNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary placeholder:text-aurora-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 focus:border-[#FA4616] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setTrackingModalJob(null)}
                className="px-4 py-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTrackApplication}
                className="px-5 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-sm font-bold shadow-sm transition-colors"
              >
                Save to Pipeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Guarantee & Anti-Fabrication Notice */}
      <div className="rounded-2xl bg-aurora-bg-surface border border-aurora-border p-5 text-xs text-aurora-text-secondary space-y-2">
        <div className="flex items-center gap-2 font-bold font-display text-aurora-text-primary">
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Zero-Intermediary Verified Career Guarantee
        </div>
        <p className="leading-relaxed">
          SeekhSetu lists only genuine campus recruitment drives, graduate engineering traineeships, and official enterprise internship programs linking directly to verified company career portals. We do not host sponsored recruitment agency ads, scrape spam portals, or introduce third-party fees.
        </p>
      </div>
    </motion.div>
  );
};
