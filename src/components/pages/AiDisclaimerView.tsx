import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Brain,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const AiDisclaimerView: React.FC = () => {
  const { setActiveTab } = useStudy();

  useEffect(() => {
    document.title = 'AI Usage Disclaimer & Guidelines — SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const corePrinciples = [
    {
      title: 'Scaffolding, Not Cheating',
      desc: 'Our AI mentor is designed to guide your problem-solving through hints, edge-case analysis, and complexity reviews, rather than feeding raw copy-paste solutions without conceptual understanding.',
      icon: Brain,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Verification is Mandatory',
      desc: 'Large language models can hallucinate, omit subtle constraints, or generate non-optimal asymptotic solutions. Always verify algorithmic logic with compiler testcases and official documentation.',
      icon: AlertTriangle,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Strict Privacy & Zero Secrets',
      desc: 'Never enter confidential production credentials, private company source code, personal identity numbers, or passwords into any AI prompt interface.',
      icon: Lock,
      color: 'text-red-500 bg-red-500/10 border-red-500/20'
    }
  ];

  return (
    <div className="w-full space-y-10 py-4 sm:py-8 max-w-4xl mx-auto">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <Bot className="w-3.5 h-3.5 text-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Ethical AI & Educational Guidance
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          AI Usage Disclaimer
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
          Important disclosures, limitations, and best practices regarding AI-assisted learning, code explanations, and STAR interview coaching on SeekhSetu.
        </p>

        <div className="text-[11px] font-mono text-aurora-text-secondary pt-1">
          Effective: 2026 Edition • Educational Advisory
        </div>
      </section>

      {/* 2. 3 CORE PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {corePrinciples.map((principle, idx) => {
          const Icon = principle.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-xs"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${principle.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-aurora-text-primary">
                {principle.title}
              </h2>
              <p className="text-xs text-aurora-text-secondary leading-relaxed">
                {principle.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* 3. DETAILED POLICY & TECHNICAL ARCHITECTURE */}
      <div className="space-y-8 bg-aurora-bg-elevated border border-aurora-border rounded-2xl p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FA4616]" />
            1. Role of Generative AI on SeekhSetu
          </h2>
          <p>
            SeekhSetu integrates Google Gemini generative artificial intelligence models to serve as an on-demand virtual study companion. Current AI-enhanced features include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>
              <strong className="text-aurora-text-primary">24/7 AI Doubt Assistant:</strong> Explaining tricky data structures, translating mathematical intuition into pseudo-code, and clarifying compiler error traces.
            </li>
            <li>
              <strong className="text-aurora-text-primary">STAR Interview Feedback:</strong> Evaluating behavioral responses against Situation, Task, Action, and Result parameters to improve storytelling structure.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Resume ATS Feedback:</strong> Identifying keyword density patterns and suggesting stronger action-oriented bullet points.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            2. Inherent Limitations & Accuracy Notice
          </h2>
          <p>
            While generative models are trained on vast corpora of technical documentation, <strong className="text-aurora-text-primary">they do not guarantee mathematical or algorithmic infallibility</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>Responses may contain subtle errors, outdated library syntax, or unhandled edge cases.</li>
            <li>AI outputs should never replace independent debugging, compiler execution, or thorough algorithmic proof.</li>
            <li>SeekhSetu and its creators accept no liability for erroneous solutions produced by the AI model during real examinations or interviews.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-500" />
            3. Data Transmission & Privacy Safeguards
          </h2>
          <p>
            When you invoke the AI Doubt Assistant, your conversation prompt and contextual page parameters (such as the current problem description) are sent to our backend server and relayed to Google Gemini via encrypted HTTPS API requests.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>We do not attach your passwords, banking details, or full system state to AI queries.</li>
            <li>Per standard API commercial terms, customer API inputs are not used to train public base models.</li>
            <li>Users are strictly cautioned not to submit sensitive personally identifiable data (PII) or proprietary employer code.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-emerald-500" />
            4. Recommended Learning Approach
          </h2>
          <p>
            To build genuine problem-solving intuition for high-stakes technical placement interviews:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 marker:text-aurora-text-primary">
            <li>Attempt the problem on paper first for at least 15 to 20 minutes before requesting an AI hint.</li>
            <li>Ask the AI for time and space complexity trade-offs rather than the immediate full solution.</li>
            <li>Step through generated code line-by-line with a pen and notebook to trace variable mutations.</li>
          </ol>
        </section>
      </div>

      {/* 4. FOOTER RETURN */}
      <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-aurora-text-secondary">
          Ready to put your algorithmic skills into practice?
        </span>
        <button
          type="button"
          onClick={() => setActiveTab('coding')}
          className="px-4 py-2 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>Open Coding Arena</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
