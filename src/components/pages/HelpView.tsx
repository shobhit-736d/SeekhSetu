import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LifeBuoy,
  Compass,
  Zap,
  AlertTriangle,
  Bug,
  Mail,
  ArrowRight,
  Sparkles,
  Command,
  BookOpen,
  Code2,
  Brain,
  FileCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const HelpView: React.FC = () => {
  const { setActiveTab } = useStudy();

  useEffect(() => {
    document.title = 'Help & Support Center — SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigationSteps = [
    {
      title: 'Top Navigation & Quick Access',
      desc: 'Use the top navigation bar to switch between the Dashboard, 30-Day Roadmap, Coding Arena, Aptitude mocks, STAR Interview, Resume Studio, and Analytics.',
      icon: Compass
    },
    {
      title: 'Global Command Palette (Ctrl + K)',
      desc: 'Press Ctrl+K (or Cmd+K on Mac) anywhere to search topics, jump to problems, toggle theme, or start a focus timer instantaneously.',
      icon: Command
    },
    {
      title: 'AI Doubt Assistant (Floating Button)',
      desc: 'Click the floating AI sparkle button in the bottom right corner of any page to ask coding questions, get algorithm hints, or clarify concepts.',
      icon: Sparkles
    },
    {
      title: 'Data & Account Controls',
      desc: 'Access your profile avatar in the header to view your student ID, export complete JSON data backups, or manage authentication.',
      icon: LifeBuoy
    }
  ];

  const troubleshootingItems = [
    {
      issue: 'Google Sign-In Popup Closes or Fails',
      solution:
        'Check if your browser has third-party cookies or popup windows disabled. If using Brave or aggressive ad-blockers, allow popups for seekhsetu.onrender.com and accounts.google.com, or sign in using your email and password.'
    },
    {
      issue: 'Code Editor Lag or Testcase Timeout',
      solution:
        'Verify your solution does not contain unintentional infinite loops (such as while (left < right) without pointer updates). If the editor freezes, refresh the page — your code persists in local storage.'
    },
    {
      issue: 'Study Streak or Topic Checkmarks Not Updating',
      solution:
        'Ensure you are connected to the internet and signed in so changes sync to MongoDB Atlas. You can also export your local storage as a JSON backup from the header data menu.'
    },
    {
      issue: 'Aptitude Timer Resets on Refresh',
      solution:
        'Mock assessments run on active timed sessions. We recommend completing tests in an uninterrupted tab to preserve your empirical pacing metrics.'
    }
  ];

  return (
    <div className="w-full space-y-12 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Support & Platform Guide
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          Help & Support Center
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
          Everything you need to master SeekhSetu&apos;s learning environment, troubleshoot unexpected glitches, and connect with our team.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('getting-started')}
            className="px-4 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-semibold hover:bg-[#e03d12] transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Getting Started Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className="px-4 py-2 rounded-xl border border-aurora-border bg-aurora-bg-elevated text-xs font-semibold text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
          >
            Browse FAQs
          </button>
        </div>
      </section>

      {/* 2. PLATFORM NAVIGATION GUIDE */}
      <section className="space-y-4">
        <div className="border-b border-aurora-border pb-3">
          <h2 className="text-lg font-bold font-display text-aurora-text-primary flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#FA4616]" />
            How to Navigate SeekhSetu
          </h2>
          <p className="text-xs text-aurora-text-secondary mt-0.5">
            Key areas of the workspace designed to keep your preparation structured and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navigationSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-2.5 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-aurora-text-secondary leading-relaxed pl-12">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ACCESSING LEARNING FEATURES */}
      <section className="p-6 sm:p-8 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-lg font-bold font-display text-aurora-text-primary flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Accessing Available Learning Features
          </h2>
          <p className="text-xs text-aurora-text-secondary">
            Jump directly into core preparation tools from your personal dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-aurora-text-primary">
              <Code2 className="w-4 h-4 text-[#FA4616]" />
              Coding Arena
            </div>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              Monaco-powered IDE with automated testcase runner, Big-O analysis, and algorithmic patterns.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('coding')}
              className="text-xs font-semibold text-[#FA4616] hover:underline pt-1 inline-flex items-center gap-1"
            >
              Open Coding Arena →
            </button>
          </div>

          <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-aurora-text-primary">
              <Brain className="w-4 h-4 text-blue-500" />
              Aptitude & Mocks
            </div>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              Timed company assessment banks for TCS NQT, Infosys, and Accenture with step-by-step logic.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('aptitude')}
              className="text-xs font-semibold text-blue-500 hover:underline pt-1 inline-flex items-center gap-1"
            >
              Practice Aptitude →
            </button>
          </div>

          <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-aurora-text-primary">
              <FileCheck className="w-4 h-4 text-emerald-500" />
              Resume Studio
            </div>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              ATS keyword density scanner, action verb enhancements, and clean single-page PDF output.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('resume')}
              className="text-xs font-semibold text-emerald-500 hover:underline pt-1 inline-flex items-center gap-1"
            >
              Analyze Resume →
            </button>
          </div>
        </div>
      </section>

      {/* 4. TROUBLESHOOTING COMMON ISSUES */}
      <section className="space-y-4">
        <div className="border-b border-aurora-border pb-3">
          <h2 className="text-lg font-bold font-display text-aurora-text-primary flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Troubleshooting Common Issues
          </h2>
          <p className="text-xs text-aurora-text-secondary mt-0.5">
            Quick steps to resolve common authentication, browser, or rendering difficulties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {troubleshootingItems.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-2 shadow-xs"
            >
              <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {item.issue}
              </h3>
              <p className="text-xs text-aurora-text-secondary leading-relaxed pl-3.5">
                {item.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. REPORTING TECHNICAL PROBLEMS & CONTACT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-aurora-text-primary">
                Reporting Technical Problems
              </h3>
              <p className="text-xs text-aurora-text-secondary">
                Found a bug, broken link, or testcase flaw?
              </p>
            </div>
          </div>

          <p className="text-xs text-aurora-text-secondary leading-relaxed">
            When reporting an issue, please specify what action you were taking, the expected result vs what actually occurred, and optionally paste the problem URL.
          </p>

          <button
            type="button"
            onClick={() => setActiveTab('feedback')}
            className="w-full py-2.5 px-4 rounded-xl border border-aurora-border bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 text-xs font-semibold text-aurora-text-primary transition-colors flex items-center justify-center gap-2"
          >
            <span>Open Issue Reporter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-aurora-text-primary">
                Contact the SeekhSetu Team
              </h3>
              <p className="text-xs text-aurora-text-secondary">
                Direct help from the founder and maintainers.
              </p>
            </div>
          </div>

          <p className="text-xs text-aurora-text-secondary leading-relaxed">
            Send us a message through our secure contact portal or email our dedicated support desk directly at <span className="font-mono font-semibold text-[#FA4616]">seekhsetuteam@gmail.com</span>.
          </p>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Go to Contact Us Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
