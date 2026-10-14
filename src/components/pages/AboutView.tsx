import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Target,
  Compass,
  Award,
  BookOpen,
  Code2,
  Brain,
  MessageSquare,
  FileCheck,
  Bot,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useStudy();

  useEffect(() => {
    document.title = 'About Us — SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const coreValues = [
    {
      title: 'Continuous Learning',
      description: 'Education is an iterative journey. We provide structured daily milestones and spaced repetition flashcards that turn complex technical concepts into durable knowledge.',
      icon: BookOpen,
      accent: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Practical Skill Development',
      description: 'Theory without practice leads to interview anxiety. Our in-browser Coding Arena and company aptitude mocks simulate real online assessments from day one.',
      icon: Code2,
      accent: 'text-[#FA4616] bg-[#FA4616]/10 border-[#FA4616]/20'
    },
    {
      title: 'Accessibility',
      description: 'Every student deserves world-class placement preparation tools regardless of college tier, background, or economic circumstances. Essential tools remain openly accessible.',
      icon: Target,
      accent: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Consistent Improvement',
      description: 'Meaningful career breakthroughs stem from consistent daily effort. Streak tracking, focus timers, and empirical analytics keep learners motivated and accountable.',
      icon: Compass,
      accent: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    }
  ];

  const features = [
    {
      name: 'Structured 30-Day Curriculum',
      desc: 'Day-by-day full stack curriculum spanning web architecture, algorithmic patterns, system fundamentals, and database engineering.',
      icon: BookOpen
    },
    {
      name: 'In-Browser Coding Arena',
      desc: 'Monaco-based editor with real-time testcase execution, custom inputs, and asymptotic complexity feedback.',
      icon: Code2
    },
    {
      name: 'Company Aptitude & Reasoning',
      desc: 'Mock assessment banks for TCS NQT, Infosys, Accenture, and Wipro with 5-second mental math shortcuts.',
      icon: Brain
    },
    {
      name: 'STAR Interview & Pitch Coach',
      desc: 'Voice and text simulation for behavioral questions using Situation, Task, Action, Result methodology.',
      icon: MessageSquare
    },
    {
      name: 'AI Resume Studio & ATS Analyzer',
      desc: 'Real-time ATS parsing, keyword density breakdown, and bullet point optimizers with clean PDF export.',
      icon: FileCheck
    },
    {
      name: '24/7 AI Doubt Assistant',
      desc: 'Context-aware AI tutor to resolve code bugs, explain edge cases, and clarify mathematical theorems.',
      icon: Bot
    }
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Our Story & Vision
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary leading-[1.15]">
          Your Journey to Becoming Better <br />
          <span className="text-[#FA4616]">Starts Here.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
          SeekhSetu is designed to help students and aspiring developers build practical skills, strengthen their problem-solving abilities, and prepare confidently for their careers.
        </p>
      </section>

      {/* 2. ABOUT SEEKHSETU & PURPOSE */}
      <section className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-aurora-text-primary">
            About SeekhSetu
          </h2>
          <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
            Preparing for campus placements and technical interviews is often scattered across dozens of disjointed websites, YouTube tutorials, and unstructured notes. Students spend more time organizing what to study than actually learning.
          </p>
          <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
            SeekhSetu brings learning resources, coding practice, aptitude preparation, interview preparation, communication development, and AI-assisted guidance together in one cohesive, focused operating system. Whether you are practicing your first binary search or polishing your final STAR behavioral pitch, SeekhSetu guides every step.
          </p>
        </div>

        {/* Feature Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-2"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 flex items-center justify-center text-[#FA4616]">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary">
                  {feat.name}
                </h3>
                <p className="text-[11px] text-aurora-text-secondary leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] text-xs font-bold font-mono uppercase">
            Our Mission
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-aurora-text-primary">
            Accessible, Structured & Practical Learning
          </h3>
          <blockquote className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed italic border-l-2 border-[#FA4616] pl-3">
            "Our mission is to make skill development more accessible, structured, and practical, helping learners turn their ambitions into real progress."
          </blockquote>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold font-mono uppercase">
            Our Vision
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-aurora-text-primary">
            Continuous Improvement & Confidence
          </h3>
          <blockquote className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed italic border-l-2 border-blue-500 pl-3">
            "Our vision is to create a learning environment where students can continuously improve their skills, develop confidence, and become better prepared for real-world opportunities."
          </blockquote>
        </div>
      </section>

      {/* 4. FOUNDER SECTION (MANDATORY & PROMINENT) */}
      <section id="founder" className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-aurora-bg-elevated to-aurora-bg-secondary border border-aurora-border space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Founder Avatar Emblem */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FA4616]/10 border-2 border-[#FA4616] flex flex-col items-center justify-center shrink-0 shadow-md">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#FA4616] tracking-wider">
              SY
            </span>
            <span className="text-[10px] font-mono font-bold text-aurora-text-muted uppercase tracking-widest mt-0.5">
              Founder
            </span>
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="space-y-0.5">
              <span className="text-xs font-mono font-bold text-[#FA4616] uppercase tracking-wider">
                Leadership
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display text-aurora-text-primary">
                Shobhit Yadav
              </h2>
              <p className="text-xs font-semibold text-aurora-text-secondary">
                Founder, SeekhSetu
              </p>
            </div>

            <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
              SeekhSetu was founded by Shobhit Yadav with the vision of making learning and career preparation more accessible, organized, and practical for students. The platform aims to bring essential learning tools and skill-building resources together in one place, helping learners move forward with greater clarity and confidence.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="https://github.com/shobhit-736d/SeekhSetu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-xs font-semibold text-aurora-text-primary transition-colors"
              >
                <span>GitHub Repository</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FA4616]" />
              </a>
              <button
                onClick={() => setActiveTab('contact')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <span>Contact Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-aurora-text-primary">
            Our Core Values
          </h2>
          <p className="text-xs sm:text-sm text-aurora-text-secondary">
            The principles that shape everything we build at SeekhSetu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm hover:border-[#FA4616]/40 transition-colors"
              >
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${val.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-aurora-text-primary">
                  {val.title}
                </h3>
                <p className="text-xs text-aurora-text-secondary leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border text-center space-y-4 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold font-display text-aurora-text-primary">
          Ready to Start Preparing?
        </h3>
        <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-lg mx-auto">
          Explore the 30-day curriculum or practice in the browser coding arena today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('getting-started')}
            className="px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <span>Getting Started Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs font-semibold transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
