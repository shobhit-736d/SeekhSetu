import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  Scale,
  Code2,
  Bot,
  AlertTriangle,
  Mail,
  ArrowRight
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const TermsView: React.FC = () => {
  const { setActiveTab } = useStudy();

  useEffect(() => {
    document.title = 'Terms of Service — SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full space-y-10 py-4 sm:py-8 max-w-4xl mx-auto">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <Scale className="w-3.5 h-3.5 text-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Agreement & Platform Rules
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          Terms of Service
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
          Please read these terms carefully before accessing or using the SeekhSetu placement operating platform.
        </p>

        <div className="text-[11px] font-mono text-aurora-text-secondary pt-1">
          Effective Date: January 1, 2026 • Last Updated: October 2026
        </div>
      </section>

      {/* 2. SUMMARY CALLOUT */}
      <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-xs">
        <h2 className="text-sm font-bold text-aurora-text-primary flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Key Terms at a Glance
        </h2>
        <p className="text-xs text-aurora-text-secondary leading-relaxed">
          SeekhSetu is dedicated to honest, student-first learning. By using our services, you agree to respect our community, protect your account credentials, use the platform solely for lawful educational purposes, and acknowledge that educational materials and AI outputs are intended for learning guidance rather than commercial or legal warranties.
        </p>
      </div>

      {/* 3. DETAILED TERMS SECTIONS */}
      <div className="space-y-8 bg-aurora-bg-elevated border border-aurora-border rounded-2xl p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
        {/* 1. Acceptance */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using SeekhSetu (including its website, API services, coding sandboxes, and learning resources), you signify that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must discontinue use of the platform immediately.
          </p>
        </section>

        {/* 2. Eligibility & Accounts */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            2. Eligibility & Account Security
          </h2>
          <p>
            SeekhSetu is open to students, developers, and educators. When creating an account:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>You agree to provide accurate and complete registration details.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials and password.</li>
            <li>You are responsible for all activities that occur under your authenticated session.</li>
            <li>You agree to immediately notify SeekhSetu of any unauthorized access or security breach.</li>
          </ul>
        </section>

        {/* 3. Acceptable Use & Restrictions */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            3. Acceptable Use & Prohibited Conduct
          </h2>
          <p>
            SeekhSetu provides educational infrastructure for personal growth and placement preparation. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>Reverse engineer, decompile, disassemble, or scrape the platform&apos;s curriculum or databases.</li>
            <li>Transmit malicious code, viruses, automated bots, or exploit scripts against our API endpoints.</li>
            <li>Attempt to bypass rate limits, authentication gates, or role-based security boundaries.</li>
            <li>Execute harmful, infinite-looping, or resource-exhaustive code intentionally to disrupt server infrastructure.</li>
            <li>Impersonate any person, entity, or founder associated with SeekhSetu.</li>
          </ul>
        </section>

        {/* 4. Educational & Coding Content Disclaimer */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#FA4616]" />
            4. Educational Materials & Placement Preparation Disclaimer
          </h2>
          <p>
            The roadmaps, mock questions, algorithmic problems, aptitude test banks, and interview advice on SeekhSetu are curated for educational practice and interview confidence.
          </p>
          <p>
            While we strive for extreme rigor and alignment with industry standards, SeekhSetu makes no guarantee of employment, specific placement outcomes, campus hiring offers, or identical questions appearing in real hiring drives. Success in recruitment drives ultimately depends on the learner&apos;s independent effort, academic standing, and interview performance.
          </p>
        </section>

        {/* 5. AI Features & Generative Limitations */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <Bot className="w-4 h-4 text-purple-500" />
            5. AI-Assisted Features & Output Disclaimers
          </h2>
          <p>
            SeekhSetu incorporates generative artificial intelligence to aid in code explanations, behavioral feedback, and doubt resolution. You acknowledge and accept that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>AI-generated answers may contain factual inaccuracies, omissions, or suboptimal code logic.</li>
            <li>AI features are provided strictly as conceptual learning assistants, not as infallible authorities.</li>
            <li>You should never submit confidential credentials, private corporate code, or sensitive personally identifiable information into the AI assistant prompt interface.</li>
          </ul>
        </section>

        {/* 6. Intellectual Property */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            6. Intellectual Property
          </h2>
          <p>
            The SeekhSetu name, logo, branding, visual designs, curriculum structure, and software codebase are protected by copyright and intellectual property laws. You may not reproduce, redistribute, or create derivative commercial works from SeekhSetu&apos;s proprietary assets without explicit written authorization from the founder.
          </p>
        </section>

        {/* 7. Limitation of Liability */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            7. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, SeekhSetu, its founder Shobhit Yadav, and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to access the platform, unexpected service interruptions, or data loss.
          </p>
        </section>

        {/* 8. Modifications and Contact */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            8. Modifications to Terms & Contact Information
          </h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Significant updates will be accompanied by an updated effective date at the top of this document.
          </p>
          <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
            <div className="font-semibold text-aurora-text-primary">SeekhSetu Inquiries</div>
            <div>Founder: Shobhit Yadav</div>
            <div>
              Email:{' '}
              <a href="mailto:seekhsetuteam@gmail.com" className="font-mono text-[#FA4616] hover:underline">
                seekhsetuteam@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* 4. FOOTER PRIVACY BANNER */}
      <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-aurora-text-secondary">
          Want to know how we handle and protect your personal data? Read our Privacy Policy.
        </span>
        <button
          type="button"
          onClick={() => setActiveTab('privacy-policy')}
          className="px-4 py-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border font-semibold text-aurora-text-primary transition-colors flex items-center gap-1.5"
        >
          <span>Privacy Policy</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
