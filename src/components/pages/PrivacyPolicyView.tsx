import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  Trash2,
  FileText,
  Mail,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const PrivacyPolicyView: React.FC = () => {
  const { setActiveTab } = useStudy();

  useEffect(() => {
    document.title = 'Privacy Policy — SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full space-y-10 py-4 sm:py-8 max-w-4xl mx-auto">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Legal & Data Transparency
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          Privacy Policy
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
          How SeekhSetu collects, utilizes, stores, and protects your personal educational information and learning records.
        </p>

        <div className="text-[11px] font-mono text-aurora-text-secondary pt-1">
          Effective Date: January 1, 2026 • Last Reviewed: October 2026
        </div>
      </section>

      {/* 2. SUMMARY CALLOUT */}
      <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-xs">
        <h2 className="text-sm font-bold text-aurora-text-primary flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Our Privacy Commitment in Brief
        </h2>
        <p className="text-xs text-aurora-text-secondary leading-relaxed">
          SeekhSetu is an educational platform designed to empower students. We do not sell, rent, or trade your personal data with third-party advertisers. We only collect the minimal information necessary to deliver authenticated placement prep, synchronize your learning streaks, and operate interactive coding and AI tools.
        </p>
      </div>

      {/* 3. POLICY CONTENT BLOCKS */}
      <div className="space-y-8 bg-aurora-bg-elevated border border-aurora-border rounded-2xl p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            1. Information We Collect
          </h2>
          <p>
            When you register, interact with, or study on SeekhSetu, we collect certain details to personalize and safeguard your learning experience:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>
              <strong className="text-aurora-text-primary">Account Credentials:</strong> Full name, email address, and an encrypted password hash when you register directly with an email and password.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Google OAuth Data:</strong> When signing in with Google, we receive your public Google display name, verified email address, and profile picture avatar. We do not receive or store your Google account password.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Learning & Progress Activity:</strong> Completed curriculum topics, study streak counts, focus timer sessions, flashcard recall mastery states, quiz attempt scores, and code submissions in the Coding Arena.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Resume & Interview Data:</strong> Resume drafts and bullet points you input into the Resume Studio, as well as STAR behavioral self-reflections.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Contact & Support Inquiries:</strong> Messages, feedback categories, and email addresses submitted through our Contact Us and Feedback portals.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            2. How We Store and Protect Your Data
          </h2>
          <p>
            We take modern engineering precautions to safeguard student data against unauthorized access, destruction, or disclosure:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>
              <strong className="text-aurora-text-primary">Database Infrastructure:</strong> Persistent records are stored in a managed MongoDB Atlas database cluster hosted in secure cloud data centers with automated encrypted backups.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Password Salting & Hashing:</strong> Direct account passwords are cryptographically salted and hashed using bcrypt (10 rounds) before storage. Plaintext passwords are never written to disk or logs.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Transport Layer Encryption:</strong> All communications between your browser, our API servers, and external third parties operate strictly over HTTPS/TLS encryption.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Authentication Tokens:</strong> Session state is authenticated through industry-standard JSON Web Tokens (JWT) stored in your browser&apos;s local storage.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            3. Third-Party Integrations & Service Providers
          </h2>
          <p>
            SeekhSetu utilizes verified third-party cloud infrastructure to operate its features:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>
              <strong className="text-aurora-text-primary">Google OAuth 2.0:</strong> Facilitates secure, one-click federated authentication without sharing Google passwords.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Google Generative AI (Gemini):</strong> Powers the 24/7 AI Doubt Assistant and interview coaching. Queries submitted to the AI assistant are transmitted via secure API to Google Cloud for immediate inference. User prompts are not sold, and we advise learners not to submit sensitive credentials or private corporate code.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Render Cloud Hosting:</strong> Our web servers and static client assets are deployed and executed on Render&apos;s managed cloud environment.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            4. Cookies and Local Browser Storage
          </h2>
          <p>
            SeekhSetu prioritizes clean, privacy-conscious engineering. We do not use third-party behavioral advertising cookies, tracker pixels, or marketing trackers.
          </p>
          <p>
            We use HTML5 Local Storage exclusively for functional operations:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li><code className="text-[#FA4616] font-mono">seekhsetu_jwt_token</code> — Your authenticated session authorization token.</li>
            <li><code className="text-[#FA4616] font-mono">seekhsetu_user</code> — Cached user profile details for fast navigation.</li>
            <li><code className="text-[#FA4616] font-mono">seekhsetu_theme</code> — Your chosen dark mode or light mode visual preference.</li>
            <li><code className="text-[#FA4616] font-mono">seekhsetu_storage_*</code> — Offline backup cache for curriculum checkmarks and notes.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            5. User Rights & Complete Account Deletion
          </h2>
          <p>
            You maintain full ownership and control over your educational records:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>
              <strong className="text-aurora-text-primary">Data Export:</strong> You can export a comprehensive JSON file containing all your topic completions, session logs, notes, and quiz histories at any time from the top header Data Menu.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Account Deletion:</strong> You can permanently delete your account and wipe all stored progress records directly through the User Profile modal in the platform, or by submitting an account deletion request to our support email.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Correction of Records:</strong> You can update your display name, email, or resume profiles directly within your dashboard.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            6. Contacting Us About Privacy
          </h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or how your personal learning data is processed, please contact our administrative team:
          </p>
          <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
            <div className="font-semibold text-aurora-text-primary">SeekhSetu Privacy & Data Governance</div>
            <div>Founder & Lead Maintainer: Shobhit Yadav</div>
            <div>
              Direct Support Email:{' '}
              <a href="mailto:seekhsetuteam@gmail.com" className="font-mono text-[#FA4616] hover:underline">
                seekhsetuteam@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* 4. FOOTER ASSISTANCE BANNER */}
      <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-aurora-text-secondary">
          Need to review our operational guidelines? Read our Terms of Service.
        </span>
        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          className="px-4 py-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border font-semibold text-aurora-text-primary transition-colors flex items-center gap-1.5"
        >
          <span>Terms of Service</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
