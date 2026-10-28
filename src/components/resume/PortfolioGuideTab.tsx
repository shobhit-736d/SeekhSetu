import React, { useState } from 'react';
import {
  FolderGit2,
  Copy,
  Check,
  Sparkles,
  Terminal,
  CheckCircle2,
  Server
} from 'lucide-react';
import { careerTracksList } from '../../data/careerTracksData';
import { getPortfolioGuideByTrack, TrackPortfolioGuide } from '../../data/jobReadinessData';
import { useStudy } from '../../context/StudyContext';

export const PortfolioGuideTab: React.FC = () => {
  const { activeTrack } = useStudy();
  const [selectedTrack, setSelectedTrack] = useState<string>(activeTrack || 'fullstack-web');
  const [copiedReadme, setCopiedReadme] = useState<boolean>(false);

  const guide: TrackPortfolioGuide = getPortfolioGuideByTrack(selectedTrack);

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(guide.readmeTemplate);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header & Track Selector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] text-xs font-bold">
              <FolderGit2 className="w-3.5 h-3.5 text-[#FA4616]" />
              <span>GitHub & Portfolio Engineering Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
              Production-Grade Portfolio Architecture
            </h2>
            <p className="text-sm text-aurora-text-secondary max-w-2xl leading-relaxed">
              Recruiters and engineering hiring managers evaluate your GitHub code hygiene, architectural clarity, and live deployments. Tailor your repository structure for your chosen career track.
            </p>
          </div>

          {/* Track Filter */}
          <div className="w-full md:w-72 space-y-1.5">
            <label className="text-xs font-semibold text-aurora-text-secondary block">
              Select Career Track:
            </label>
            <select
              value={selectedTrack}
              onChange={e => setSelectedTrack(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#FA4616]"
            >
              {careerTracksList.map(t => (
                <option key={t.slug} value={t.slug}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Recommended Projects & Deployment Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Project Types */}
        <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
          <h3 className="text-base font-bold font-display text-aurora-text-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FA4616]" />
            High-Impact Project Archetypes for {guide.trackTitle}
          </h3>
          <p className="text-xs text-aurora-text-secondary leading-relaxed">
            Hiring managers prefer 2-3 deep, deployed projects with real architecture over dozens of cloned tutorials:
          </p>
          <div className="space-y-3 pt-1">
            {guide.recommendedProjectTypes.map((type, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm font-medium text-aurora-text-primary leading-snug">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Deployment & Quality Standards */}
        <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
          <h3 className="text-base font-bold font-display text-aurora-text-primary flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Recommended Deployment & Hosting
          </h3>
          <p className="text-xs text-aurora-text-secondary leading-relaxed">
            Every technical recruiter expects a live, functioning URL with automated deployment:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {guide.recommendedDeploymentPlatforms.map((platform, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {platform}
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-aurora-border/60 space-y-2">
            <span className="text-xs font-bold font-display text-aurora-text-muted uppercase tracking-wider block">
              Repository Code Hygiene:
            </span>
            <ul className="space-y-2 text-xs text-aurora-text-secondary">
              {guide.codeQualityChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FA4616] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended README Template Box */}
      <div className="p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-lg font-bold font-display text-aurora-text-primary flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FA4616]" />
              Standard Production README Blueprint ({guide.trackTitle})
            </h3>
            <p className="text-xs text-aurora-text-secondary mt-1">
              Engineered according to GitHub open-source best practices. Click copy and replace placeholders.
            </p>
          </div>

          <button
            onClick={handleCopyReadme}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold transition-all shadow-sm"
          >
            {copiedReadme ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            {copiedReadme ? 'Copied to Clipboard!' : 'Copy README Template'}
          </button>
        </div>

        <pre className="p-4 sm:p-5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
          {guide.readmeTemplate}
        </pre>
      </div>

      {/* Key Repo Elements Checklist */}
      <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
        <h4 className="text-xs font-bold font-display text-aurora-text-muted uppercase tracking-wider">
          Must-Have Repository Checklist Before Submitting Applications:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {guide.keyRepoElements.map((el, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-secondary flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{el}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
