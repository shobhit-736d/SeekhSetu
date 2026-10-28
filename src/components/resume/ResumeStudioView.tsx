import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeAtsChecker } from './ResumeAtsChecker';
import { ResumeBuilder } from './ResumeBuilder';
import { PortfolioGuideTab } from './PortfolioGuideTab';
import { LinkedInPlaybookTab } from './LinkedInPlaybookTab';
import { ResumeProfile } from '../../types/placement';
import { FileCheck, Edit3, FolderGit2, Sparkles } from 'lucide-react';

const Linkedin: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

export const ResumeStudioView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ats' | 'builder' | 'portfolio' | 'linkedin'>('ats');
  const [builderProfile, setBuilderProfile] = useState<ResumeProfile | undefined>(undefined);

  const handleLoadProfileIntoBuilder = (profile: ResumeProfile) => {
    setBuilderProfile(profile);
    setActiveTab('builder');
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Sub-navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-aurora-border/60">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex-wrap">
          <button
            onClick={() => setActiveTab('ats')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'ats'
                ? 'bg-[#FA4616] text-white shadow-sm'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>ATS Compatibility</span>
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'builder'
                ? 'bg-[#FA4616] text-white shadow-sm'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>AI Resume Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'portfolio'
                ? 'bg-[#FA4616] text-white shadow-sm'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <span>Portfolio & GitHub Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'linkedin'
                ? 'bg-[#FA4616] text-white shadow-sm'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
            }`}
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn & Recruiter Playbook</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-aurora-text-secondary">
          <Sparkles className="w-4 h-4 text-[#FA4616]" />
          <span className="hidden sm:inline">Multi-track job readiness & recruiter optimization engine.</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ats' && (
          <motion.div
            key="ats"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ResumeAtsChecker onLoadIntoBuilder={handleLoadProfileIntoBuilder} />
          </motion.div>
        )}

        {activeTab === 'builder' && (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ResumeBuilder initialProfile={builderProfile} />
          </motion.div>
        )}

        {activeTab === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <PortfolioGuideTab />
          </motion.div>
        )}

        {activeTab === 'linkedin' && (
          <motion.div
            key="linkedin"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <LinkedInPlaybookTab />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
