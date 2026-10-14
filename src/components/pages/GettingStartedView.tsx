import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  CheckCircle2,
  BookOpen,
  Code2,
  Brain,
  MessageSquare,
  FileCheck,
  Bot,
  Clock,
  ArrowRight,
  Sparkles,
  Target,
  Compass,
  Award
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const GettingStartedView: React.FC = () => {
  const { setActiveTab } = useStudy();

  useEffect(() => {
    document.title = 'Getting Started — Welcome to SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Review Your 30-Day Placement Roadmap',
      desc: 'Start by visiting the Roadmap tab. The curriculum is broken into structured daily modules spanning JavaScript internals, Data Structures & Algorithms, Frontend architecture, Backend engineering, and Database design.',
      tab: 'roadmap' as const,
      btnText: 'Explore Roadmap',
      icon: BookOpen,
      color: 'text-[#FA4616] bg-[#FA4616]/10 border-[#FA4616]/20'
    },
    {
      number: '02',
      title: 'Solve Your First Algorithmic Problem',
      desc: 'Jump into the Coding Arena. Write code in Monaco editor, test against sample inputs, and execute your logic against hidden boundary testcases. Track time and space complexity automatically.',
      tab: 'coding' as const,
      btnText: 'Open Coding Arena',
      icon: Code2,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      number: '03',
      title: 'Take a Company-Specific Aptitude Mock',
      desc: 'Most placement drives start with an online aptitude screening. Test your Quantitative Aptitude, Logical Reasoning, and Verbal Ability with timed questions modeled after TCS, Infosys, and Accenture assessments.',
      tab: 'aptitude' as const,
      btnText: 'Start Aptitude Test',
      icon: Brain,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      number: '04',
      title: 'Practice Behavioral STAR Responses',
      desc: 'Technical skills get you the interview; behavioral clarity secures the offer. Use the STAR Coach to frame responses around Situation, Task, Action, and Result for common managerial questions.',
      tab: 'communication' as const,
      btnText: 'Practice STAR Method',
      icon: MessageSquare,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    },
    {
      number: '05',
      title: 'Optimize Your Resume for ATS Parsers',
      desc: 'Paste your project and work experience bullets into the Resume Studio. Our ATS engine analyzes keyword density, action verbs, and formatting so your resume passes recruiter screenings.',
      tab: 'resume' as const,
      btnText: 'Open Resume Studio',
      icon: FileCheck,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      number: '06',
      title: 'Use the AI Doubt Assistant Anytime',
      desc: 'Stuck on a tricky edge case or need a plain-English explanation of a complex theorem? Open the AI Mentor drawer anywhere on the platform to get instant, contextual code walkthroughs.',
      tab: 'dashboard' as const,
      btnText: 'Go to Dashboard',
      icon: Bot,
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20'
    }
  ];

  return (
    <div className="w-full space-y-12 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <Rocket className="w-3.5 h-3.5 text-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Onboarding & Quick Start
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary leading-[1.15]">
          Welcome to SeekhSetu
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
          Your personal companion for learning, coding, and career preparation. Follow this quick 6-step walkthrough to get the absolute most out of your placement preparation.
        </p>
      </section>

      {/* 2. CORE PHILOSOPHY CALLOUT */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FA4616]/10 via-aurora-bg-elevated to-blue-500/10 border border-aurora-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-[#FA4616] uppercase tracking-wider">
            Daily Study Principle
          </span>
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            Consistency Over Intensity
          </h2>
          <p className="text-xs text-aurora-text-secondary max-w-xl">
            Spending 45 focused minutes every day on structured coding, active recall flashcards, and aptitude practice creates compound results by campus drive season.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('timer')}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-primary transition-colors flex items-center gap-2"
        >
          <Clock className="w-4 h-4 text-[#FA4616]" />
          <span>Launch Focus Timer</span>
        </button>
      </div>

      {/* 3. STEP-BY-STEP PROGRESSION */}
      <section className="space-y-4">
        <div className="border-b border-aurora-border pb-3">
          <h2 className="text-lg font-bold font-display text-aurora-text-primary flex items-center gap-2">
            <Target className="w-5 h-5 text-[#FA4616]" />
            Your Placement Preparation Playbook
          </h2>
          <p className="text-xs text-aurora-text-secondary mt-0.5">
            Step-by-step path designed to transition you from foundational concepts to interview confidence.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs hover:border-aurora-border/80 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${step.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#FA4616] px-1.5 py-0.5 rounded bg-[#FA4616]/10">
                        STEP {step.number}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-aurora-text-primary">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-aurora-text-secondary leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab(step.tab)}
                  className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border text-xs font-semibold text-aurora-text-primary hover:text-[#FA4616] transition-colors flex items-center justify-center gap-1.5 self-end sm:self-center"
                >
                  <span>{step.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FOUNDER NOTE & READY CALL TO ACTION */}
      <div className="p-6 sm:p-8 rounded-2xl bg-aurora-bg-elevated border border-aurora-border text-center space-y-4 shadow-sm">
        <Award className="w-10 h-10 text-[#FA4616] mx-auto" />
        <div className="space-y-1 max-w-xl mx-auto">
          <h2 className="text-lg sm:text-xl font-display font-bold text-aurora-text-primary">
            Ready to Begin Your Placement Journey?
          </h2>
          <p className="text-xs text-aurora-text-secondary leading-relaxed">
            Every coding test conquered, aptitude shortcut memorized, and behavioral answer polished moves you closer to your dream software role.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white text-xs font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Go to Learning Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-aurora-border text-xs font-semibold text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
          >
            Learn About SeekhSetu
          </button>
        </div>
      </div>
    </div>
  );
};
