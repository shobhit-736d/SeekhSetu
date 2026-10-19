import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeAtsChecker } from './ResumeAtsChecker';
import { ResumeBuilder } from './ResumeBuilder';
import { ResumeProfile } from '../../types/placement';
import { useStudy } from '../../context/StudyContext';
import { FileCheck, Edit3, Sparkles } from 'lucide-react';

export const ResumeStudioView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ats' | 'builder'>('ats');
  const [builderProfile, setBuilderProfile] = useState<ResumeProfile | undefined>(undefined);

  const handleLoadProfileIntoBuilder = (profile: ResumeProfile) => {
    setBuilderProfile(profile);
    setActiveTab('builder');
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Sub-navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-aurora-border/60">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-aurora-bg-elevated border border-aurora-border">
          <button
            onClick={() => setActiveTab('ats')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'ats'
                ? 'bg-[#FA4616] text-white shadow-sm'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>ATS Compatibility Checker</span>
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'builder'
                ? 'bg-[#FA4616] text-white shadow-sm'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>AI Resume Builder & PDF Studio</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-aurora-text-secondary">
          <Sparkles className="w-4 h-4 text-[#FA4616]" />
          <span className="hidden sm:inline">Engineered to optimize recruiter screeners & applicant tracking algorithms.</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ats' ? (
          <motion.div
            key="ats"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ResumeAtsChecker onLoadIntoBuilder={handleLoadProfileIntoBuilder} />
          </motion.div>
        ) : (
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
      </AnimatePresence>
    </div>
  );
};
