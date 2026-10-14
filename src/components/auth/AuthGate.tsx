import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  Code2,
  FileText,
  Bot,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';

export const AuthGate: React.FC = () => {
  const { setIsAuthModalOpen, setAuthModalTab } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 sm:py-16 text-center relative">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-[#FA4616]/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8"
      >
        {/* Purpose Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Campus & Off-Campus Placement Preparation System
          </span>
        </div>

        {/* Main Heading & Who It's For */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-aurora-text-primary leading-[1.15]">
            Master Tech Placements with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FA4616] via-orange-500 to-[#FA4616]">
              SeekhSetu Placement OS
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
            Designed for engineering students and aspiring software developers. Master the 30-day full-stack curriculum, practice company-style aptitude tests, optimize your ATS resume, and solve coding interview challenges with private, isolated progress tracking.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <button
            onClick={() => {
              setAuthModalTab('login');
              setIsAuthModalOpen(true);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#FA4616]/25 hover:shadow-xl transition-all"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setAuthModalTab('register');
              setIsAuthModalOpen(true);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-sm font-semibold transition-colors"
          >
            Create New Account
          </button>

          <button
            onClick={() => {
              setAuthModalTab('login');
              setIsAuthModalOpen(true);
            }}
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

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 text-left">
          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
              <Code2 className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary">Coding Arena</h3>
            <p className="text-xs text-aurora-text-secondary mt-1 leading-relaxed">
              Solve curated DSA challenges with in-browser editor, automated test cases, and runtime execution.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
              <BrainCircuit className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary">Aptitude Prep</h3>
            <p className="text-xs text-aurora-text-secondary mt-1 leading-relaxed">
              Crack TCS, Infosys, Wipro & Accenture mock tests with 5-second speed tricks and formula shortcuts.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 flex items-center justify-center mb-3">
              <FileText className="w-4 h-4 text-[#FA4616]" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary">AI Resume Studio</h3>
            <p className="text-xs text-aurora-text-secondary mt-1 leading-relaxed">
              Analyze your resume with real-time ATS scoring, keyword match breakdown, and bullet point optimizers.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm hover:border-[#FA4616]/40 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3">
              <Bot className="w-4 h-4 text-purple-500" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary">AI Doubt Assistant</h3>
            <p className="text-xs text-aurora-text-secondary mt-1 leading-relaxed">
              Ask doubt questions across coding, aptitude, and interview pitches with confidential session isolation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
