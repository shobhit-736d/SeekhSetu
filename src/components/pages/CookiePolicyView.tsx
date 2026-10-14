import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cookie,
  CheckCircle2,
  HardDrive,
  ShieldCheck,
  Info,
  Trash2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const CookiePolicyView: React.FC = () => {
  const { setActiveTab } = useStudy();

  useEffect(() => {
    document.title = 'Cookie & Local Storage Policy — SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full space-y-10 py-4 sm:py-8 max-w-4xl mx-auto">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <Cookie className="w-3.5 h-3.5 text-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Browser Storage & Privacy
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          Cookie & Local Storage Policy
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
          Transparent disclosure of the client-side storage technologies SeekhSetu uses to keep you signed in and preserve your personal study progress.
        </p>

        <div className="text-[11px] font-mono text-aurora-text-secondary pt-1">
          Last Updated: October 2026
        </div>
      </section>

      {/* 2. CORE STATEMENT CALLOUT */}
      <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-xs">
        <h2 className="text-sm font-bold text-aurora-text-primary flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          No Third-Party Ad Trackers or Marketing Cookies
        </h2>
        <p className="text-xs text-aurora-text-secondary leading-relaxed">
          SeekhSetu does not utilize third-party behavioral advertising cookies, tracker pixels, or cross-site monitoring scripts. We rely strictly on standard web storage mechanisms (HTML5 LocalStorage and essential session tokens) to make the learning platform function seamlessly.
        </p>
      </div>

      {/* 3. POLICY BLOCKS */}
      <div className="space-y-8 bg-aurora-bg-elevated border border-aurora-border rounded-2xl p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#FA4616]" />
            1. Client-Side Storage Keys in Use
          </h2>
          <p>
            The table below lists the specific keys stored inside your browser&apos;s local storage and their direct technical purpose:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-aurora-border text-xs rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-aurora-bg-surface border-b border-aurora-border text-aurora-text-primary">
                  <th className="p-3 font-semibold">Storage Key</th>
                  <th className="p-3 font-semibold">Type</th>
                  <th className="p-3 font-semibold">Purpose</th>
                  <th className="p-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aurora-border">
                <tr>
                  <td className="p-3 font-mono text-[#FA4616]">seekhsetu_jwt_token</td>
                  <td className="p-3">LocalStorage</td>
                  <td className="p-3">Secures your authenticated user session with our backend API.</td>
                  <td className="p-3">Until sign out</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#FA4616]">seekhsetu_user</td>
                  <td className="p-3">LocalStorage</td>
                  <td className="p-3">Caches basic user profile info (name, role, email) to load navigation without network delay.</td>
                  <td className="p-3">Until sign out</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#FA4616]">seekhsetu_theme</td>
                  <td className="p-3">LocalStorage</td>
                  <td className="p-3">Remembers whether you prefer Dark Mode or Light Mode across visits.</td>
                  <td className="p-3">Persistent</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#FA4616]">seekhsetu_storage_*</td>
                  <td className="p-3">LocalStorage</td>
                  <td className="p-3">Local offline cache for completed topics, flashcard mastery, and study notes.</td>
                  <td className="p-3">Persistent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-500" />
            2. Google Identity Services
          </h2>
          <p>
            If you choose to log in using Google OAuth, Google Identity Services may issue essential security cookies on accounts.google.com to verify your Google identity and prevent cross-site request forgery. These cookies are governed directly by Google&apos;s Privacy Policy.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-amber-500" />
            3. How to Clear or Manage Browser Storage
          </h2>
          <p>
            You have complete autonomy over your browser storage:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#FA4616]">
            <li>
              <strong className="text-aurora-text-primary">Sign Out:</strong> Clicking &quot;Sign Out&quot; in the header automatically purges your JWT authentication tokens and session caches.
            </li>
            <li>
              <strong className="text-aurora-text-primary">Browser Settings:</strong> You can clear cookies and local site data anytime via your browser settings (e.g., Chrome Settings → Privacy and Security → Delete Browsing Data).
            </li>
            <li>
              <strong className="text-aurora-text-primary">Reset Data Tool:</strong> Use the Reset Data button in the top navigation Data Management menu to clear personal study progress and start fresh.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-aurora-border pt-6">
          <h2 className="text-base sm:text-lg font-display font-bold text-aurora-text-primary">
            4. Inquiries
          </h2>
          <p>
            If you have questions about how storage is handled on SeekhSetu, please reach out to us at{' '}
            <a href="mailto:seekhsetuteam@gmail.com" className="text-[#FA4616] font-mono hover:underline">
              seekhsetuteam@gmail.com
            </a>
            .
          </p>
        </section>
      </div>

      {/* 4. FOOTER RETURN */}
      <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-aurora-text-secondary">
          Return to the complete legal framework.
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
