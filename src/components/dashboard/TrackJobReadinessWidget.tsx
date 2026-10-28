import React, { useMemo } from 'react';
import { useStudy } from '../../context/StudyContext';
import { certificationsList } from '../../data/certificationsData';
import { jobListingsList } from '../../data/jobListingsData';
import { getCareerTrackBySlug } from '../../data/careerTracksData';
import {
  Award,
  Briefcase,
  FileCheck,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
  ChevronRight,
  Compass
} from 'lucide-react';

export const TrackJobReadinessWidget: React.FC = () => {
  const {
    activeTrack,
    jobApplications,
    latestAtsScore,
    opportunityBookmarks,
    navigateToTrackCertifications,
    navigateToTrackJobs,
    setActiveTab
  } = useStudy();

  const currentTrack = useMemo(() => {
    const slug = typeof activeTrack === 'string' ? activeTrack : 'fullstack-web';
    return getCareerTrackBySlug(slug) || {
      id: 'fullstack-web',
      slug: 'fullstack-web',
      title: 'Full Stack Development',
      category: 'Software Engineering'
    };
  }, [activeTrack]);

  const certBookmarksCount = useMemo(() => {
    return (opportunityBookmarks || []).filter((b: any) => b.itemType === 'certification').length;
  }, [opportunityBookmarks]);

  // Certifications matching current track or related
  const trackCerts = useMemo(() => {
    const direct = certificationsList.filter(c => c.trackSlug === currentTrack.slug);
    if (direct.length > 0) return direct;
    return certificationsList.slice(0, 3);
  }, [currentTrack.slug]);

  // Jobs matching current track or universal fresher roles
  const trackJobs = useMemo(() => {
    const direct = jobListingsList.filter(j => j.trackSlug === currentTrack.slug);
    if (direct.length > 0) return direct;
    return jobListingsList.slice(0, 3);
  }, [currentTrack.slug]);

  // Application Pipeline Stats
  const pipelineStats = useMemo(() => {
    const total = jobApplications.length;
    const applied = jobApplications.filter(a => a.status === 'Applied').length;
    const assessments = jobApplications.filter(a => a.status === 'Online Assessment').length;
    const interviews = jobApplications.filter(a => a.status === 'Technical Interview' || a.status === 'HR Round').length;
    const offers = jobApplications.filter(a => a.status === 'Offered').length;
    return { total, applied, assessments, interviews, offers };
  }, [jobApplications]);

  return (
    <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-5 bubble-card shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold border border-blue-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Job Readiness & Placement Hub</span>
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20">
              Active Track: {currentTrack.title}
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-aurora-text-primary tracking-tight font-display">
            Career Transition & Hiring Ecosystem
          </h3>
          <p className="text-xs text-aurora-text-secondary">
            Verified vendor credentials, official corporate hiring drives, multi-track ATS resume scoring, and live application tracking.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('careers')}
          className="flex items-center gap-1.5 text-xs font-bold text-aurora-text-secondary hover:text-[#FA4616] transition-colors self-start sm:self-center"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Switch Track</span>
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: Certifications Guide */}
        <div className="p-4 rounded-xl bg-aurora-bg-surface/90 border border-aurora-border hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-3 group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                {trackCerts.length} Credential{trackCerts.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-aurora-text-primary group-hover:text-blue-500 transition-colors">
                Industry Certifications Guide
              </h4>
              <p className="text-[11px] text-aurora-text-secondary mt-0.5 line-clamp-2">
                {trackCerts[0]?.name || 'Official vendor credentials with curriculum domain weights & exam guides.'}
              </p>
            </div>

            <div className="text-[10px] text-aurora-text-muted flex items-center gap-1.5 pt-1">
              <span>★ {certBookmarksCount} bookmarked</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Vendor Official</span>
            </div>
          </div>

          <button
            onClick={() => navigateToTrackCertifications(currentTrack.slug)}
            className="w-full flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline pt-2 border-t border-aurora-border"
          >
            <span>Explore Credentials</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CARD 2: Verified Opportunities */}
        <div className="p-4 rounded-xl bg-aurora-bg-surface/90 border border-aurora-border hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-3 group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                {jobListingsList.length} Active Drives
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-aurora-text-primary group-hover:text-rose-500 transition-colors">
                Verified Hiring Board
              </h4>
              <p className="text-[11px] text-aurora-text-secondary mt-0.5 line-clamp-2">
                TCS NQT, Infosys DSE, Amazon, Microsoft & top fresher recruitment drives.
              </p>
            </div>

            <div className="text-[10px] text-aurora-text-muted flex items-center gap-1.5 pt-1">
              <span className="text-rose-500 font-semibold">Direct Career Portals</span>
              <span>•</span>
              <span>0 Fake Listings</span>
            </div>
          </div>

          <button
            onClick={() => navigateToTrackJobs(currentTrack.slug)}
            className="w-full flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:underline pt-2 border-t border-aurora-border"
          >
            <span>View Hiring Drives</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CARD 3: Multi-Track Resume Studio */}
        <div className="p-4 rounded-xl bg-aurora-bg-surface/90 border border-aurora-border hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <FileCheck className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                latestAtsScore >= 80
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
              }`}>
                ATS: {latestAtsScore}/100
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-aurora-text-primary group-hover:text-amber-500 transition-colors">
                Multi-Track Resume Studio
              </h4>
              <p className="text-[11px] text-aurora-text-secondary mt-0.5 line-clamp-2">
                Tailored ATS keyword analysis, GitHub portfolio blueprints, and LinkedIn playbook for {currentTrack.title}.
              </p>
            </div>

            <div className="text-[10px] text-aurora-text-muted flex items-center gap-1.5 pt-1">
              <span>{latestAtsScore >= 80 ? '✓ Ready for applications' : '⚠️ Keyword gaps found'}</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('resume')}
            className="w-full flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:underline pt-2 border-t border-aurora-border"
          >
            <span>Launch Resume Studio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CARD 4: In-App Application Tracker */}
        <div className="p-4 rounded-xl bg-aurora-bg-surface/90 border border-aurora-border hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3 group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                {pipelineStats.total} Tracked
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-aurora-text-primary group-hover:text-purple-500 transition-colors">
                Application Pipeline
              </h4>
              <p className="text-[11px] text-aurora-text-secondary mt-0.5">
                {pipelineStats.total === 0 ? (
                  'Track hiring rounds, deadlines, and direct career portal links.'
                ) : (
                  `${pipelineStats.applied} Applied • ${pipelineStats.assessments} OA • ${pipelineStats.interviews} Rounds • ${pipelineStats.offers} Offers`
                )}
              </p>
            </div>

            {/* Pipeline Pills */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary">
                {pipelineStats.applied} Applied
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {pipelineStats.assessments} OA
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {pipelineStats.interviews} Intv
              </span>
              {pipelineStats.offers > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  {pipelineStats.offers} 🎉
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('jobs')}
            className="w-full flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:underline pt-2 border-t border-aurora-border"
          >
            <span>Manage Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
