import React, { useState } from 'react';
import {
  Copy,
  Check,
  Search,
  CheckCircle2
} from 'lucide-react';
import { linkedInPlaybookTemplates } from '../../data/jobReadinessData';

const Linkedin: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

export const LinkedInPlaybookTab: React.FC = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold">
          <Linkedin className="w-3.5 h-3.5" />
          <span>Technical LinkedIn & Recruiter Search Playbook</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
          Recruiter Keyword Optimization & Outreach Framework
        </h2>
        <p className="text-sm text-aurora-text-secondary max-w-2xl leading-relaxed">
          Over 87% of tech recruiters source entry-level and campus talent using LinkedIn Recruiter boolean search filters. Craft an algorithmic-ready technical headline and use proven outreach templates.
        </p>
      </div>

      {/* Templates & Formulas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {linkedInPlaybookTemplates.map((template, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-5 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold">
                  {template.category}
                </span>
                <span className="text-xs text-aurora-text-muted font-mono">Template #{idx + 1}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-display text-aurora-text-primary tracking-tight">{template.title}</h3>
                <div className="mt-2 p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary font-mono">
                  <span className="text-aurora-text-muted block mb-1 text-[11px] uppercase font-bold">
                    Formula:
                  </span>
                  {template.headlineFormula}
                </div>
              </div>

              {/* Example Headline */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold font-display text-aurora-text-muted uppercase tracking-wider block">
                  Live Example:
                </span>
                <p className="p-3 rounded-xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200 leading-relaxed font-medium">
                  &ldquo;{template.exampleHeadline}&rdquo;
                </p>
              </div>

              {/* Outreach Message */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-display text-aurora-text-muted uppercase tracking-wider">
                    Recruiter Outreach Message:
                  </span>
                  <button
                    onClick={() => handleCopy(template.outreachTemplate, idx)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#FA4616] hover:text-[#E03D0F] font-bold transition-colors"
                  >
                    {copiedIdx === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedIdx === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <pre className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary font-mono whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
                  {template.outreachTemplate}
                </pre>
              </div>
            </div>

            {/* Strategic Advice */}
            <div className="pt-4 border-t border-aurora-border/60 space-y-2">
              <span className="text-xs font-bold font-display text-aurora-text-muted uppercase tracking-wider block">
                Algorithmic Best Practices:
              </span>
              <ul className="space-y-1.5 text-xs text-aurora-text-secondary">
                {template.keySectionsAdvice.map((advice, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Recruiter Search Ranking Checklist */}
      <div className="p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
        <h3 className="text-base font-bold font-display text-aurora-text-primary flex items-center gap-2">
          <Search className="w-4 h-4 text-[#1754D8] dark:text-blue-400" />
          LinkedIn Recruiter Boolean Search Checklist
        </h3>
        <p className="text-xs text-aurora-text-secondary">
          Make sure your profile contains these essential keyword anchors so recruiters find you in search results:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary space-y-1">
            <span className="font-bold text-aurora-text-primary block">1. Location Tag</span>
            <span className="text-aurora-text-secondary">Set preferred metro tech hubs (Bengaluru, Hyderabad, Pune, NCR or Remote).</span>
          </div>

          <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary space-y-1">
            <span className="font-bold text-aurora-text-primary block">2. Exact Skills Match</span>
            <span className="text-aurora-text-secondary">List core languages &amp; frameworks in both Skills and Experience highlights.</span>
          </div>

          <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary space-y-1">
            <span className="font-bold text-aurora-text-primary block">3. Open To Work</span>
            <span className="text-aurora-text-secondary">Select target job titles (Software Engineer, Full Stack Developer, SDE Intern).</span>
          </div>

          <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary space-y-1">
            <span className="font-bold text-aurora-text-primary block">4. Featured Live Link</span>
            <span className="text-aurora-text-secondary">Add an external link to your deployed portfolio or verified GitHub profile.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
