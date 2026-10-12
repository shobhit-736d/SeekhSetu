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
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 sm:p-8 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#FA4616]/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative max-w-3xl mx-auto space-y-6"
      >
        {/* Security badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary">
            Secure Multi-User Architecture & Strict Data Isolation
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          Your Personal, Private <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FA4616] via-amber-400 to-[#FA4616]">
            Placement Preparation OS
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
          Sign in to access your individual coding submissions, private AI doubt conversations, customized aptitude analytics, and personal ATS resumes. Every account starts with an isolated database record.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setAuthModalTab('login');
              setIsAuthModalOpen(true);
            }}
            className="px-6 py-3 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white text-sm font-bold flex items-center gap-2 shadow-xl shadow-[#FA4616]/25 hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setAuthModalTab('register');
              setIsAuthModalOpen(true);
            }}
            className="px-6 py-3 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-sm font-semibold transition-all hover:scale-105"
          >
            Create New Account
          </button>

          <button
            onClick={() => {
              setAuthModalTab('login');
              setIsAuthModalOpen(true);
            }}
            className="px-5 py-3 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-sm font-semibold flex items-center gap-2.5 transition-all hover:scale-105"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Sign In with Google</span>
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-left">
          <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border">
            <Code2 className="w-5 h-5 text-emerald-400 mb-2" />
            <h3 className="text-xs font-bold text-aurora-text-primary">Coding Submissions</h3>
            <p className="text-[11px] text-aurora-text-secondary mt-1">
              Private test results, saved questions, and submission runtime history.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border">
            <BrainCircuit className="w-5 h-5 text-amber-400 mb-2" />
            <h3 className="text-xs font-bold text-aurora-text-primary">Aptitude Tests</h3>
            <p className="text-[11px] text-aurora-text-secondary mt-1">
              Personalized accuracy analytics and incorrect question revisions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border">
            <FileText className="w-5 h-5 text-[#FA4616] mb-2" />
            <h3 className="text-xs font-bold text-aurora-text-primary">ATS Resumes</h3>
            <p className="text-[11px] text-aurora-text-secondary mt-1">
              Uploaded resumes and ATS scores stored strictly under your User ID.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border">
            <Bot className="w-5 h-5 text-indigo-400 mb-2" />
            <h3 className="text-xs font-bold text-aurora-text-primary">Private AI Doubts</h3>
            <p className="text-[11px] text-aurora-text-secondary mt-1">
              Doubt assistant conversations confidential to your session.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
