import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  Code2,
  FileText,
  Bot,
  Brain,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Users,
  ChevronDown,
  Terminal,
  Clock,
  Layers,
  Flame,
  Check
} from 'lucide-react';

interface ProblemItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies: string[];
  acceptance: string;
}

const SAMPLE_PROBLEMS: ProblemItem[] = [
  {
    id: 'p1',
    title: 'Two Sum — Target Pair Index Search',
    category: 'Arrays & Hash Maps',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'TCS'],
    acceptance: '89.4%'
  },
  {
    id: 'p2',
    title: 'Longest Substring Without Repeating Characters',
    category: 'Two Pointers & Strings',
    difficulty: 'Medium',
    companies: ['Microsoft', 'Amazon'],
    acceptance: '71.2%'
  },
  {
    id: 'p3',
    title: 'Work & Time: Pipe Inflow & Drain Capacity',
    category: 'TCS NQT Quant',
    difficulty: 'Easy',
    companies: ['TCS Digital', 'Infosys'],
    acceptance: '92.1%'
  },
  {
    id: 'p4',
    title: 'Validate Binary Search Tree Inorder Traversal',
    category: 'Trees & Graphs',
    difficulty: 'Medium',
    companies: ['Amazon', 'Oracle'],
    acceptance: '64.8%'
  },
  {
    id: 'p5',
    title: 'Syllogisms & Categorical Logic Deductions',
    category: 'Logical Reasoning',
    difficulty: 'Medium',
    companies: ['Wipro', 'Accenture'],
    acceptance: '78.5%'
  },
  {
    id: 'p6',
    title: 'Trapping Rain Water Multi-Elevation Peak',
    category: 'Two Pointers & Strings',
    difficulty: 'Hard',
    companies: ['Google', 'Adobe'],
    acceptance: '53.6%'
  }
];

const ROADMAP_STAGES = [
  {
    stage: 'Stage 1',
    duration: 'Days 1–5',
    title: 'Core Architecture & JavaScript Mastery',
    summary: 'Master the event loop, lexical scope, closures, prototype chain, and asynchronous execution under the hood.',
    tag: 'Foundation Round'
  },
  {
    stage: 'Stage 2',
    duration: 'Days 6–12',
    title: 'Data Structures & Algorithmic Patterns',
    summary: 'Two-pointer technique, hash maps, binary search, tree traversals, recursion, and time complexity benchmarking.',
    tag: 'Coding Assessment'
  },
  {
    stage: 'Stage 3',
    duration: 'Days 13–18',
    title: 'Full-Stack Engineering & DB Modeling',
    summary: 'React 19 internals, state machines, Express REST architecture, MongoDB schemas, and indexing strategies.',
    tag: 'Technical Interview'
  },
  {
    stage: 'Stage 4',
    duration: 'Days 19–23',
    title: 'Company Aptitude & Speed Shortcuts',
    summary: '5-second mental math tricks for TCS NQT, Infosys, and Accenture quant, reasoning, and verbal rounds.',
    tag: 'Cognitive Test'
  },
  {
    stage: 'Stage 5',
    duration: 'Days 24–27',
    title: 'Mock Technical Rounds & Live Coding',
    summary: 'Simulated 45-minute live technical interviews with complexity defense and clean architecture principles.',
    tag: 'Live Bar Raiser'
  },
  {
    stage: 'Stage 6',
    duration: 'Days 28–30',
    title: 'STAR Behavioral Pitch & ATS Resume Polish',
    summary: 'STAR-format verbal responses, ATS keyword alignment, offer negotiation tactics, and final onboarding prep.',
    tag: 'HR & Final Offer'
  }
];

const TESTIMONIALS = [
  {
    name: 'Rohan Sharma',
    role: 'SDE-1',
    company: 'Amazon',
    package: '28 LPA',
    avatar: 'RS',
    quote:
      'The 30-day curriculum provided exact daily clarity. The browser Coding Arena with time complexity metrics matched what I faced in the Amazon OA.'
  },
  {
    name: 'Priya Nair',
    role: 'Digital Specialist Engineer',
    company: 'Infosys',
    package: '9.5 LPA',
    avatar: 'PN',
    quote:
      'The aptitude speed shortcuts helped me finish the Infosys cognitive round with 15 minutes to spare. The STAR interview coach was a game changer.'
  },
  {
    name: 'Aman Verma',
    role: 'Associate Consultant',
    company: 'Deloitte',
    package: '11 LPA',
    avatar: 'AV',
    quote:
      'The AI Resume Studio pushed my ATS score from 58 to 92. I received callbacks from 4 top companies within two weeks of updating my bullet points.'
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Systems Engineer',
    company: 'TCS Digital',
    package: '7.5 LPA',
    avatar: 'SK',
    quote:
      'Having coding challenges, company aptitude mocks, and spaced repetition flashcards in one unified workspace kept my preparation consistent.'
  }
];

const FAQS = [
  {
    q: 'What is SeekhSetu Placement OS?',
    a: 'SeekhSetu is an all-in-one placement preparation operating system designed specifically for engineering students and tech aspirants. It brings together a 30-day full-stack syllabus, an in-browser coding arena, company-specific aptitude mocks, an ATS resume analyzer, and an AI doubt coach.'
  },
  {
    q: 'How does the 30-day structured roadmap work?',
    a: 'The curriculum is broken into 30 focused daily milestones covering web architecture, data structures, backend engineering, quantitative aptitude, and interview pitching. Each day includes concept notes, interactive flashcards, quizzes, and hands-on coding.'
  },
  {
    q: 'Can I practice coding directly in the browser?',
    a: 'Yes. SeekhSetu includes an integrated Monaco code editor with real-time JavaScript test execution, automated test cases, and time/space complexity analysis—no local IDE or compiler installation required.'
  },
  {
    q: 'How does the AI Resume Studio calculate my ATS score?',
    a: 'The Resume Studio parses your text against industry recruiting standards and target job descriptions. It scores keyword density, action-verb strength, structural hierarchy, and contact formatting to maximize pass rates through applicant tracking systems.'
  },
  {
    q: 'Is my study progress and coding history saved?',
    a: 'Yes. All solved problems, aptitude scores, flashcard recall states, and study session timers are automatically persisted and synced to your private account.'
  }
];

export const AuthGate: React.FC = () => {
  const { setIsAuthModalOpen, setAuthModalTab } = useAuth();
  const [activeProblemFilter, setActiveProblemFilter] = useState<string>('All Topics');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const openAuth = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const filteredProblems =
    activeProblemFilter === 'All Topics'
      ? SAMPLE_PROBLEMS
      : SAMPLE_PROBLEMS.filter(p => p.category === activeProblemFilter);

  return (
    <div className="w-full space-y-16 sm:space-y-24 py-6 sm:py-12">
      {/* 1. HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FA4616]" />
            <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
              Campus & Off-Campus Placement Preparation System
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-aurora-text-primary leading-[1.15]">
              Master Tech Placements with <br />
              <span className="text-[#FA4616]">SeekhSetu Placement OS</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
              The complete preparation platform for engineering aspirants. Solve 150+ coding challenges, master company aptitude patterns, optimize your resume for ATS parsers, and simulate STAR-method interviews.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-2">
            <button
              onClick={() => openAuth('login')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openAuth('register')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-sm font-semibold transition-colors"
            >
              Create Free Account
            </button>

            <button
              onClick={() => openAuth('login')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-sm font-semibold flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* LeetCode-Inspired Live Code Showcase Card */}
          <div className="w-full max-w-3xl pt-6">
            <div className="rounded-2xl bg-aurora-bg-secondary border border-aurora-border shadow-sm overflow-hidden text-left">
              {/* Code Editor Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-aurora-bg-elevated border-b border-aurora-border">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono font-medium text-aurora-text-primary">
                    two_sum_hashmap.js
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                    Easy
                  </span>
                  <span className="text-[11px] font-mono text-aurora-text-muted hidden sm:inline">
                    JavaScript ES6
                  </span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-aurora-text-primary bg-aurora-bg-secondary">
                <p className="text-aurora-text-muted">{'// Optimal O(n) Hash Map approach for campus assessments'}</p>
                <p>
                  <span className="text-[#FA4616] font-semibold">function</span>{' '}
                  <span className="text-blue-500">twoSum</span>(nums, target) {'{'}
                </p>
                <p className="pl-4">
                  <span className="text-[#FA4616] font-semibold">const</span> seen ={' '}
                  <span className="text-blue-500">new</span> Map();
                </p>
                <p className="pl-4">
                  <span className="text-[#FA4616] font-semibold">for</span> (
                  <span className="text-[#FA4616] font-semibold">let</span> i = 0; i &lt; nums.length; i++) {'{'}
                </p>
                <p className="pl-8">
                  <span className="text-[#FA4616] font-semibold">const</span> complement = target - nums[i];
                </p>
                <p className="pl-8">
                  <span className="text-[#FA4616] font-semibold">if</span> (seen.has(complement)) {'{'}
                </p>
                <p className="pl-12">
                  <span className="text-[#FA4616] font-semibold">return</span> [seen.get(complement), i];
                </p>
                <p className="pl-8">{'}'}</p>
                <p className="pl-8">seen.set(nums[i], i);</p>
                <p className="pl-4">{'}'}</p>
                <p className="pl-4">
                  <span className="text-[#FA4616] font-semibold">return</span> [];
                </p>
                <p>{'}'}</p>
              </div>

              {/* Benchmark Results Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-aurora-bg-elevated border-t border-aurora-border text-xs">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accepted • 3 / 3 Test Cases Passed</span>
                </div>
                <div className="flex items-center gap-4 text-aurora-text-secondary font-mono">
                  <span>Runtime: <strong className="text-aurora-text-primary">42 ms</strong> (beats 97.4%)</span>
                  <span className="hidden sm:inline">Memory: <strong className="text-aurora-text-primary">41.2 MB</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM STATISTICS BAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-secondary border border-aurora-border text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-aurora-text-primary">
              2,450<span className="text-[#FA4616]">+</span>
            </div>
            <div className="text-xs font-medium text-aurora-text-secondary">
              Active Aspirants Preparing
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-secondary border border-aurora-border text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-aurora-text-primary">
              30 <span className="text-[#FA4616]">Days</span>
            </div>
            <div className="text-xs font-medium text-aurora-text-secondary">
              Structured Tech Curriculum
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-secondary border border-aurora-border text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-aurora-text-primary">
              150<span className="text-[#FA4616]">+</span>
            </div>
            <div className="text-xs font-medium text-aurora-text-secondary">
              Curated Interview Challenges
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-secondary border border-aurora-border text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-aurora-text-primary">
              94.2<span className="text-[#FA4616]">%</span>
            </div>
            <div className="text-xs font-medium text-aurora-text-secondary">
              Placement Conversion Rate
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PLATFORM PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-aurora-text-primary">
            Complete Preparation Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-xl mx-auto">
            From preliminary online tests to final HR rounds, everything you need is built directly into SeekhSetu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-aurora-text-primary">In-Browser Coding Arena</h3>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              Monaco-powered code editor with multi-language execution, automated testcase validation, and runtime complexity benchmarks.
            </p>
            <ul className="text-[11px] text-aurora-text-secondary space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>JavaScript, Python, C++ & Java runtimes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pre-built test suites & edge-case checks</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-aurora-text-primary">Company Aptitude & Reasoning</h3>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              Timed mock tests formatted for TCS NQT, Infosys, Wipro, and Accenture with 5-second formula shortcuts and mental math hacks.
            </p>
            <ul className="text-[11px] text-aurora-text-secondary space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-500" />
                <span>Quantitative, Logical & Verbal sections</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-500" />
                <span>Detailed step-by-step formula derivations</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 flex items-center justify-center text-[#FA4616]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-aurora-text-primary">AI Resume Studio & ATS Analyzer</h3>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              Parse your resume against real recruiter standards with ATS score breakdown, keyword matching, and bullet point optimizers.
            </p>
            <ul className="text-[11px] text-aurora-text-secondary space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FA4616]" />
                <span>Instant ATS score & missing skill alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FA4616]" />
                <span>Export clean, recruiter-approved PDF resume</span>
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-aurora-text-primary">STAR Interview & Pitch Coach</h3>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              Simulate behavioral and technical interviews using the STAR framework (Situation, Task, Action, Result) with real-time feedback.
            </p>
            <ul className="text-[11px] text-aurora-text-secondary space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-500" />
                <span>Behavioral question pitch builder</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-500" />
                <span>Voice recording & delivery evaluation</span>
              </li>
            </ul>
          </div>

          {/* Card 5 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-aurora-text-primary">24/7 AI Doubt Assistant</h3>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              Stuck on an algorithm or aptitude shortcut? Ask your context-aware AI tutor for explanations, debugging tips, and hints.
            </p>
            <ul className="text-[11px] text-aurora-text-secondary space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-500" />
                <span>Algorithm walkthroughs & edge cases</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant explanation of test failures</span>
              </li>
            </ul>
          </div>

          {/* Card 6 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-aurora-text-primary">Spaced Repetition & Revision</h3>
            <p className="text-xs text-aurora-text-secondary leading-relaxed">
              Never forget concepts before interviews. Leitner flashcard queues and automatic mistake logging keep topics fresh.
            </p>
            <ul className="text-[11px] text-aurora-text-secondary space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-rose-500" />
                <span>Daily active recall flashcard decks</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-rose-500" />
                <span>Auto-tracked incorrect question queues</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. PLACEMENT PREPARATION ROADMAP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-aurora-text-primary">
            30-Day Placement Preparation Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-xl mx-auto">
            A structured, battle-tested progression mapped directly to company interview rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROADMAP_STAGES.map((stage, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FA4616] px-2.5 py-1 rounded-md bg-[#FA4616]/10 border border-[#FA4616]/20">
                  {stage.duration}
                </span>
                <span className="text-[11px] font-semibold text-aurora-text-muted">
                  {stage.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-aurora-text-primary">
                {stage.title}
              </h3>
              <p className="text-xs text-aurora-text-secondary leading-relaxed">
                {stage.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRACTICE DISCOVERY: LEETCODE STYLE PROBLEM TABLE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-aurora-text-primary">
              Explore Popular Interview Questions
            </h2>
            <p className="text-xs sm:text-sm text-aurora-text-secondary">
              Practice verified coding, aptitude, and reasoning problems asked in campus interviews.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-aurora-bg-elevated border border-aurora-border">
            {['All Topics', 'Arrays & Hash Maps', 'Two Pointers & Strings', 'Trees & Graphs', 'TCS NQT Quant'].map(
              tab => (
                <button
                  key={tab}
                  onClick={() => setActiveProblemFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeProblemFilter === tab
                      ? 'bg-aurora-bg-surface text-aurora-text-primary font-bold shadow-sm'
                      : 'text-aurora-text-secondary hover:text-aurora-text-primary'
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Problems Table Card */}
        <div className="rounded-2xl bg-aurora-bg-secondary border border-aurora-border shadow-sm overflow-hidden">
          <div className="divide-y divide-aurora-border">
            {filteredProblems.map((prob, idx) => (
              <div
                key={prob.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-5 gap-3 hover:bg-aurora-bg-surface/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="text-xs font-mono text-aurora-text-muted mt-0.5 sm:mt-0 w-6">
                    {idx + 1}.
                  </span>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-aurora-text-primary hover:text-[#FA4616] cursor-pointer transition-colors" onClick={() => openAuth('login')}>
                        {prob.title}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-aurora-text-muted">
                        {prob.category}
                      </span>
                      <span className="text-aurora-border">•</span>
                      <div className="flex items-center gap-1">
                        {prob.companies.map(c => (
                          <span
                            key={c}
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pl-9 sm:pl-0">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                    }`}
                  >
                    {prob.difficulty}
                  </span>

                  <button
                    onClick={() => openAuth('login')}
                    className="px-3 py-1.5 rounded-lg bg-aurora-bg-elevated hover:bg-[#FA4616] hover:text-white border border-aurora-border text-xs font-semibold text-aurora-text-primary transition-colors"
                  >
                    Solve Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PLACEMENT RESULTS & TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-aurora-text-primary">
            Proven Placement Results
          </h2>
          <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-xl mx-auto">
            See how engineering students used SeekhSetu to crack high-paying tech offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FA4616]/10 border border-[#FA4616]/20 flex items-center justify-center font-bold text-sm text-[#FA4616]">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-aurora-text-primary">
                      {t.name}
                    </h4>
                    <p className="text-xs text-aurora-text-secondary">
                      {t.role} @ <strong className="text-aurora-text-primary">{t.company}</strong>
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 font-mono">
                  {t.package}
                </span>
              </div>

              <p className="text-xs text-aurora-text-secondary leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-aurora-text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-aurora-text-secondary">
            Everything you need to know about the platform.
          </p>
        </div>

        <div className="divide-y divide-aurora-border rounded-2xl bg-aurora-bg-secondary border border-aurora-border shadow-sm overflow-hidden">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
                >
                  <span className="text-xs sm:text-sm font-bold text-aurora-text-primary">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-aurora-text-secondary shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#FA4616]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-aurora-text-secondary leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. HIGH-IMPACT FINAL CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-b from-aurora-bg-elevated to-aurora-bg-secondary border border-aurora-border p-6 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-aurora-text-primary tracking-tight">
              Ready to Ace Your Next Placement?
            </h2>
            <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
              Join over 2,450 engineering students preparing for top product and service companies. Get full access to the 30-day curriculum and coding arena today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openAuth('register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openAuth('login')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary text-sm font-semibold flex items-center justify-center gap-2.5 transition-colors"
            >
              <span>Sign In to Dashboard</span>
            </button>
          </div>

          <p className="text-[11px] text-aurora-text-muted">
            Instant free access • No credit card required • Private and secure
          </p>
        </div>
      </section>
    </div>
  );
};
