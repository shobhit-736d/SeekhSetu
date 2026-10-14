import React from 'react';
import {
  Code2,
  Brain,
  MessageSquare,
  FileCheck,
  Map,
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  LifeBuoy,
  MessageSquarePlus,
  Info,
  Mail,
  ShieldCheck,
  FileText,
  Cookie,
  Bot,
  Trash2,
  ExternalLink,
  Heart,
  Sparkles
} from 'lucide-react';
import { useStudy, ActiveTab } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { setActiveTab } = useStudy();
  const { isAuthenticated, setIsProfileModalOpen, setIsAuthModalOpen } = useAuth();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccountDeletionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      setIsProfileModalOpen(true);
    } else {
      handleNavClick('privacy-policy');
    }
  };

  return (
    <footer className="w-full border-t border-aurora-border bg-aurora-bg-elevated/70 backdrop-blur-md text-aurora-text-primary z-10 relative mt-auto transition-colors">
      {/* TOP COMPREHENSIVE MULTI-COLUMN SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* BRAND COLUMN (Col 1-4 on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo and Name */}
            <button
              type="button"
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center bg-black/40 border border-white/10">
                <img
                  src="/brand/favicon_dark.png"
                  alt="SeekhSetu Logo"
                  className="w-full h-full object-cover hidden dark:block"
                />
                <img
                  src="/brand/favicon_light.png"
                  alt="SeekhSetu Logo"
                  className="w-full h-full object-cover block dark:hidden"
                />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl tracking-tight text-aurora-text-primary">
                  Seekh<span className="text-[#FA4616]">Setu</span>
                </span>
                <span className="block text-xs font-semibold text-[#FA4616] tracking-wide">
                  Learn Today. Lead Tomorrow.
                </span>
              </div>
            </button>

            {/* Tagline & Purpose Description */}
            <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed max-w-sm">
              Your personal companion for learning, coding, and career preparation. Built to empower students across every college tier with world-class placement engineering tools.
            </p>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://github.com/shobhit-736d/SeekhSetu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border flex items-center justify-center text-aurora-text-secondary hover:text-aurora-text-primary transition-colors"
                aria-label="SeekhSetu GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/shobhit-736d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border flex items-center justify-center text-aurora-text-secondary hover:text-aurora-text-primary transition-colors"
                aria-label="Founder GitHub Profile"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="mailto:seekhsetuteam@gmail.com"
                className="w-9 h-9 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border flex items-center justify-center text-aurora-text-secondary hover:text-[#FA4616] transition-colors"
                aria-label="Contact via Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-aurora-text-secondary/80">
              Conceived & Built by <span className="font-semibold text-aurora-text-primary">Shobhit Yadav</span>
            </div>
          </div>

          {/* PLATFORM LINKS (Col 5-6 on desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
              Platform
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('coding')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Coding Practice
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('aptitude')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5" />
                  Aptitude Preparation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('communication')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Interview Preparation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('resume')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  ATS Resume Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('roadmap')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <Map className="w-3.5 h-3.5" />
                  30-Day Curriculum
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('dashboard')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Learning Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* RESOURCES (Col 7-8 on desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
              Resources
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('getting-started')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Getting Started
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('faq')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('help')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <LifeBuoy className="w-3.5 h-3.5" />
                  Help & Support
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('feedback')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  Feedback & Issues
                </button>
              </li>
            </ul>
          </div>

          {/* COMPANY (Col 9-10 on desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('about')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5" />
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Us
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/shobhit-736d/SeekhSetu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-aurora-text-secondary/70" />
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL & PRIVACY (Col 11-12 on desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
              Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('privacy-policy')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('terms')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('cookie-policy')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <Cookie className="w-3.5 h-3.5" />
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('ai-disclaimer')}
                  className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors text-left flex items-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5" />
                  AI Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleAccountDeletionClick}
                  className="text-aurora-text-secondary hover:text-red-500 transition-colors text-left flex items-center gap-1.5"
                  title="Manage or permanently erase your user account"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Account Deletion
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR WITH DYNAMIC YEAR & QUICK LINKS */}
      <div className="w-full border-t border-aurora-border/70 py-6 text-xs text-aurora-text-secondary bg-aurora-bg-surface/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="font-medium text-aurora-text-primary">
              &copy; {currentYear} SeekhSetu. All rights reserved.
            </span>
            <span className="hidden sm:inline text-aurora-border">•</span>
            <span className="text-xs text-aurora-text-secondary">
              Built to help you learn and grow.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => handleNavClick('privacy-policy')}
              className="hover:text-aurora-text-primary transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-aurora-border">•</span>
            <button
              type="button"
              onClick={() => handleNavClick('terms')}
              className="hover:text-aurora-text-primary transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-aurora-border">•</span>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#FA4616] transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
