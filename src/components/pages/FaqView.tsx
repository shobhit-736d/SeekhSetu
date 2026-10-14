import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  BookOpen,
  Code2,
  Brain,
  Bot,
  ShieldCheck,
  Wrench,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FaqView: React.FC = () => {
  const { setActiveTab } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('gs-1');

  useEffect(() => {
    document.title = 'Frequently Asked Questions (FAQ) — SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'getting_started', label: 'Getting Started', icon: BookOpen },
    { id: 'coding_practice', label: 'Coding Arena', icon: Code2 },
    { id: 'aptitude_interview', label: 'Aptitude & Interview', icon: Brain },
    { id: 'ai_features', label: 'AI Mentor & Coach', icon: Bot },
    { id: 'account_privacy', label: 'Account & Privacy', icon: ShieldCheck },
    { id: 'technical_support', label: 'Technical Support', icon: Wrench }
  ];

  const faqs: FaqItem[] = [
    // 1. Getting Started
    {
      id: 'gs-1',
      category: 'getting_started',
      question: 'What is SeekhSetu and how does it help with campus placements?',
      answer:
        'SeekhSetu is an all-in-one placement and skill acceleration platform tailored for engineering students and aspiring developers. It bridges the gap between academic theory and industry placement assessments by unifying a 30-day structured roadmap, in-browser Coding Arena, company-specific aptitude mocks, STAR interview practice, and an ATS resume studio.'
    },
    {
      id: 'gs-2',
      category: 'getting_started',
      question: 'Is SeekhSetu free to use for students?',
      answer:
        'Yes. SeekhSetu was created by Shobhit Yadav to democratize placement preparation for students across all college tiers. Core learning roadmaps, coding practice questions, aptitude mock banks, and flashcard recall tools are openly accessible.'
    },
    {
      id: 'gs-3',
      category: 'getting_started',
      question: 'How do I follow the 30-Day Full Stack Curriculum?',
      answer:
        'Head over to the Roadmap tab. Each day introduces core conceptual lessons, active recall flashcards, practice quizzes, and direct coding challenges. As you complete topics, your progress is tracked on the personal dashboard and synced to your cloud account.'
    },

    // 2. Coding Practice
    {
      id: 'cp-1',
      category: 'coding_practice',
      question: 'What programming languages are supported in the Coding Arena?',
      answer:
        'The Coding Arena provides an integrated Monaco-based code editor with syntax highlighting, auto-completion, and real-time execution. JavaScript and algorithmic problem solving are supported directly in-browser with automated testcase validation and time complexity analysis.'
    },
    {
      id: 'cp-2',
      category: 'coding_practice',
      question: 'How are testcases evaluated when I submit my solution?',
      answer:
        'When you click "Run Code" or "Submit Solution", your code executes inside an isolated sandbox against both public sample inputs and hidden boundary testcases. Execution time, edge-case handling, and return values are verified immediately.'
    },
    {
      id: 'cp-3',
      category: 'coding_practice',
      question: 'Are coding problems categorized by company pattern and difficulty?',
      answer:
        'Yes. Problems are cataloged across Easy, Medium, and Hard tiers, covering Two Pointers, Sliding Window, Dynamic Programming, Trees, and Graph traversals, mapping directly to patterns asked in FAANG and tier-1 product assessments.'
    },

    // 3. Aptitude and Interview Preparation
    {
      id: 'ai-prep-1',
      category: 'aptitude_interview',
      question: 'Which companies are covered in the Aptitude Preparation module?',
      answer:
        'SeekhSetu features targeted mock question banks structured around the recruitment patterns of major mass and differential recruiters, including TCS NQT, Infosys, Accenture, and Wipro. Topics span Quantitative Aptitude, Logical Reasoning, and Verbal Ability with step-by-step mathematical explanations.'
    },
    {
      id: 'ai-prep-2',
      category: 'aptitude_interview',
      question: 'What is the STAR Interview Coach?',
      answer:
        'The STAR Interview Coach helps you prepare structured answers for behavioral and HR rounds using the Situation, Task, Action, and Result framework. You can practice with common behavioral prompts, record your responses, and receive constructive guidance on clarity and impact.'
    },
    {
      id: 'ai-prep-3',
      category: 'aptitude_interview',
      question: 'How does the AI Resume Studio work?',
      answer:
        'Our Resume Studio analyzes your technical resume text against Applicant Tracking System (ATS) guidelines, identifying missing keyword clusters, weak action verbs, and formatting pitfalls. You can fine-tune bullet points and export clean, recruiter-ready resumes.'
    },

    // 4. AI Features
    {
      id: 'ai-feat-1',
      category: 'ai_features',
      question: 'What powers the SeekhSetu AI Doubt Assistant?',
      answer:
        'Our doubt assistant leverages Google Gemini generative AI models to deliver contextual explanations for complex data structures, diagnose syntax or logical bugs in your code, and clarify mathematical formulas.'
    },
    {
      id: 'ai-feat-2',
      category: 'ai_features',
      question: 'Can the AI make mistakes in its explanations?',
      answer:
        'Yes. While generative AI is capable and knowledgeable, it can occasionally produce inaccuracies, subtle logical errors, or hallucinations. We strongly encourage cross-verifying complex algorithms with compiler results and our verified lesson notes. See our AI Usage Disclaimer for details.'
    },
    {
      id: 'ai-feat-3',
      category: 'ai_features',
      question: 'Should I enter private credentials or passwords into the AI assistant?',
      answer:
        'No. Never enter sensitive personal data, company confidential source code, passwords, or private API keys into the AI assistant prompt window.'
    },

    // 5. Account and Privacy
    {
      id: 'ap-1',
      category: 'account_privacy',
      question: 'How do I create an account or sign in?',
      answer:
        'You can register with your email and password, or use Google OAuth for instant one-click sign in. Your authentication session is preserved securely with JSON Web Tokens (JWT).'
    },
    {
      id: 'ap-2',
      category: 'account_privacy',
      question: 'How is my learning data stored and protected?',
      answer:
        'Your account and progress records are securely hosted in a managed MongoDB Atlas database cluster with TLS encryption in transit. Passwords are salted and hashed using bcrypt (10 rounds). We do not sell or monetize personal student data.'
    },
    {
      id: 'ap-3',
      category: 'account_privacy',
      question: 'Can I export my learning records or delete my account?',
      answer:
        'Yes! You can export a complete JSON backup of your progress, quiz attempts, and bookmarks anytime from the Data Management menu in the top header. You can also permanently delete your account and all associated records from your Profile Settings or by emailing privacy support.'
    },

    // 6. Technical Support
    {
      id: 'ts-1',
      category: 'technical_support',
      question: 'What browsers are recommended for SeekhSetu?',
      answer:
        'SeekhSetu works best on modern evergreen browsers such as Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari on desktop and mobile devices.'
    },
    {
      id: 'ts-2',
      category: 'technical_support',
      question: 'Why is the code editor slow or not responding?',
      answer:
        'If you encounter editor lag, ensure you do not have infinite loops in your code (such as while loops without counter increments). Clearing browser cache or refreshing the page typically resolves editor rendering issues.'
    },
    {
      id: 'ts-3',
      category: 'technical_support',
      question: 'How do I report a bug or suggest a new feature?',
      answer:
        'Use our dedicated Feedback & Issue page (/feedback) or Contact Us (/contact). You can also open an issue on our GitHub repository.'
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-10 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Knowledge Base
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          Frequently Asked Questions
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
          Quick answers to common questions about our coding sandbox, aptitude mocks, AI tutor, privacy practices, and student tools.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-2 relative">
          <Search className="w-4 h-4 text-aurora-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., Coding Arena, AI, account deletion)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 shadow-sm"
          />
        </div>
      </section>

      {/* 2. CATEGORY PILL SELECTOR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#FA4616] text-white border-[#FA4616] shadow-sm'
                  : 'bg-aurora-bg-elevated border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:border-aurora-border/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. ACCORDION LIST */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 rounded-2xl bg-aurora-bg-elevated border border-aurora-border text-center space-y-3">
            <HelpCircle className="w-8 h-8 text-aurora-text-secondary mx-auto" />
            <p className="text-sm font-semibold text-aurora-text-primary">
              No matching questions found
            </p>
            <p className="text-xs text-aurora-text-secondary">
              Try searching with different keywords or submit a question directly to our team.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FA4616] text-white hover:bg-[#e03d12] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-aurora-border bg-aurora-bg-elevated overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-aurora-bg-surface/50 transition-colors"
                >
                  <span className="font-display font-semibold text-xs sm:text-sm text-aurora-text-primary">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-aurora-text-secondary shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#FA4616]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="border-t border-aurora-border/60 bg-aurora-bg-surface/30"
                    >
                      <div className="p-4 sm:p-5 pt-3 text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* 4. STILL HAVE QUESTIONS BANNER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            Still have questions?
          </h2>
          <p className="text-xs text-aurora-text-secondary max-w-lg">
            Can&apos;t find what you are looking for? Reach out to our team directly or browse our Help Center.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('help')}
            className="px-4 py-2.5 rounded-xl border border-aurora-border text-xs font-semibold text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
          >
            Help Center
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className="px-4 py-2.5 rounded-xl bg-[#FA4616] text-white text-xs font-semibold hover:bg-[#e03d12] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
