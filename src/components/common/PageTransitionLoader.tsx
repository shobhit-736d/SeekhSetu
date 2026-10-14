import React from 'react';
import { motion } from 'framer-motion';
import { ActiveTab } from '../../context/StudyContext';
import { Sparkles, Compass, Map, BookOpen, Target, Clock, Flame, BarChart3, Code2, Brain, MessageSquare, FileCheck } from 'lucide-react';

interface PageTransitionLoaderProps {
  targetTab: ActiveTab;
}

const TAB_MESSAGES: Record<ActiveTab, { title: string; subtitle: string; icon: any }> = {
  dashboard: {
    title: 'Docking into Mission Control...',
    subtitle: 'Checking streaks, focus logs & progress rings',
    icon: Compass,
  },
  coding: {
    title: 'Initializing Coding Practice Arena...',
    subtitle: 'Mounting Monaco IDE, testcases & language runtime sandbox',
    icon: Code2,
  },
  aptitude: {
    title: 'Loading Aptitude & Reasoning Portal...',
    subtitle: 'Retrieving formula shortcuts & company mock assessment banks',
    icon: Brain,
  },
  communication: {
    title: 'Opening Interview & Communication Suite...',
    subtitle: 'Calibrating speech engine, STAR builder & HR frameworks',
    icon: MessageSquare,
  },
  resume: {
    title: 'Entering AI Resume Studio...',
    subtitle: 'Scanning ATS parsers, keyword density & template preview',
    icon: FileCheck,
  },
  roadmap: {
    title: 'Unfolding 30-Day Curriculum...',
    subtitle: 'Plotting full-stack milestones & track checkpoints',
    icon: Map,
  },
  workspace: {
    title: 'Opening Technical Workspace...',
    subtitle: 'Assembling definitions, code challenges & debugging labs',
    icon: BookOpen,
  },
  practice: {
    title: 'Powering up the Practice Arena...',
    subtitle: 'Sharpening prediction skills & interview traps',
    icon: Target,
  },
  timer: {
    title: 'Warming Up Focus Chamber...',
    subtitle: 'Minimizing distractions for hyper-learning',
    icon: Clock,
  },
  revision: {
    title: 'Opening Spaced Repetition Vault...',
    subtitle: 'Retrieving starred lessons & recall queue',
    icon: Flame,
  },
  analytics: {
    title: 'Computing Empirical Analytics...',
    subtitle: 'Crunching study hours, quiz scores & syllabus completion',
    icon: BarChart3,
  },
  about: {
    title: 'Loading About SeekhSetu...',
    subtitle: 'Founder story, platform vision & core values',
    icon: BookOpen,
  },
  contact: {
    title: 'Opening Direct Support...',
    subtitle: 'Connect with the SeekhSetu engineering desk',
    icon: MessageSquare,
  },
  faq: {
    title: 'Accessing Knowledge Base...',
    subtitle: 'Frequently asked questions & technical walkthroughs',
    icon: Sparkles,
  },
  help: {
    title: 'Loading Help Center...',
    subtitle: 'Troubleshooting guides & system diagnostics',
    icon: Compass,
  },
  feedback: {
    title: 'Opening Feedback Portal...',
    subtitle: 'Report a bug or submit feature enhancements',
    icon: Target,
  },
  'privacy-policy': {
    title: 'Loading Privacy Policy...',
    subtitle: 'Data governance, storage & student confidentiality',
    icon: BookOpen,
  },
  terms: {
    title: 'Loading Terms of Service...',
    subtitle: 'Educational guidelines & platform rules',
    icon: BookOpen,
  },
  'cookie-policy': {
    title: 'Loading Storage Policy...',
    subtitle: 'Client storage keys & zero ad-tracker disclosure',
    icon: BookOpen,
  },
  'ai-disclaimer': {
    title: 'Loading AI Usage Advisory...',
    subtitle: 'Generative capabilities, verification & boundaries',
    icon: Sparkles,
  },
  'getting-started': {
    title: 'Launching Onboarding Playbook...',
    subtitle: '6-step acceleration path for new learners',
    icon: Compass,
  },
};

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({ targetTab }) => {
  const meta = TAB_MESSAGES[targetTab] || TAB_MESSAGES.dashboard;
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-4 min-h-[380px]"
    >
      {/* Playful Bouncing Bubble Badge */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [-3, 3, -3],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#FA4616] flex items-center justify-center text-white shadow-lg border-2 border-white/20">
          <Icon className="w-8 h-8" />
        </div>

        {/* Floating mini bubble */}
        <motion.div
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#1754D8] flex items-center justify-center text-white text-[10px] shadow"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>

      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
          {meta.title}
        </h3>
        <p className="text-xs sm:text-sm text-aurora-text-secondary">
          {meta.subtitle}
        </p>
      </div>

      {/* Mini playful bouncing loader dots */}
      <div className="flex items-center gap-1.5 pt-2">
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
          className="w-2 h-2 rounded-full bg-[#FA4616]"
        />
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          className="w-2 h-2 rounded-full bg-[#1754D8]"
        />
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          className="w-2 h-2 rounded-full bg-amber-400"
        />
      </div>
    </motion.div>
  );
};
