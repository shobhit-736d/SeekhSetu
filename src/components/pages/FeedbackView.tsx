import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquarePlus,
  Bug,
  Lightbulb,
  FileQuestion,
  Palette,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Link as LinkIcon
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../services/apiService';

export const FeedbackView: React.FC = () => {
  const { setActiveTab } = useStudy();
  const { user } = useAuth();

  const [category, setCategory] = useState<'bug' | 'feature' | 'content' | 'ui_ux' | 'general'>('bug');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Feedback & Issue Reporting — SeekhSetu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (user) {
      setName(prev => prev || user.name || '');
      setEmail(prev => prev || user.email || '');
    }
  }, [user]);

  const categories = [
    {
      id: 'bug',
      label: 'Bug Report',
      desc: 'Something is broken or not working as intended',
      icon: Bug,
      color: 'text-red-500 bg-red-500/10 border-red-500/20'
    },
    {
      id: 'feature',
      label: 'Feature Request',
      desc: 'Suggest a new tool, assessment, or feature',
      icon: Lightbulb,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'content',
      label: 'Question / Content Issue',
      desc: 'Typo, outdated answer, or incorrect testcase',
      icon: FileQuestion,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'ui_ux',
      label: 'UI & Usability',
      desc: 'Improvements to styling, navigation, or mobile layout',
      icon: Palette,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    },
    {
      id: 'general',
      label: 'General Feedback',
      desc: 'Share your overall learning experience with us',
      icon: MessageSquarePlus,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim()) {
      errs.name = 'Your name or handle is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email address is required for follow-up';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email format';
    }

    if (!subject.trim()) {
      errs.subject = 'Subject is required';
    } else if (subject.trim().length < 4) {
      errs.subject = 'Subject must be at least 4 characters';
    }

    if (!description.trim()) {
      errs.description = 'Please describe the issue or suggestion in detail';
    } else if (description.trim().length < 10) {
      errs.description = 'Please provide at least 10 characters so we have sufficient context';
    } else if (description.trim().length > 3000) {
      errs.description = 'Description cannot exceed 3,000 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await ApiService.submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        subject: `[${category.toUpperCase()}] ${subject.trim()}`,
        message: description.trim(),
        category: category,
        pageUrl: pageUrl.trim()
      });

      setSubmitSuccess(true);
      setSubject('');
      setDescription('');
      setErrors({});
    } catch (err: any) {
      setSubmitError(err.message || 'Unable to submit feedback at this time. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-10 py-4 sm:py-8 max-w-4xl mx-auto">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Platform Improvement
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          Feedback & Issue Reporting
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
          Found an error in a problem testcase, spotted a UI bug, or have an idea to make SeekhSetu more impactful? We review every submission.
        </p>
      </section>

      {/* 2. FEEDBACK FORM OR SUCCESS */}
      <div className="bg-aurora-bg-elevated border border-aurora-border rounded-2xl p-6 sm:p-8 shadow-sm">
        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-aurora-text-primary">
                Thank You for Helping Us Improve!
              </h2>
              <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-md mx-auto leading-relaxed">
                Your feedback has been logged in our internal engineering pipeline. Community feedback directly shapes our curriculum and coding platform updates.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-aurora-border text-xs font-semibold text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
              >
                Submit More Feedback
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('coding')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FA4616] text-white text-xs font-semibold hover:bg-[#e03d12] transition-colors shadow-sm"
              >
                Continue Practice
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {submitError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Category Selector Grid */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-aurora-text-primary">
                Select Feedback Category <span className="text-[#FA4616]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        isSelected
                          ? 'border-[#FA4616] bg-[#FA4616]/5 ring-1 ring-[#FA4616]/30 shadow-xs'
                          : 'border-aurora-border bg-aurora-bg-surface hover:border-aurora-border/80'
                      }`}
                    >
                      <div className={`p-2 rounded-lg border shrink-0 ${cat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-aurora-text-primary truncate">
                          {cat.label}
                        </div>
                        <div className="text-[11px] text-aurora-text-secondary leading-snug line-clamp-2">
                          {cat.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reporter details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label htmlFor="fb-name" className="block text-xs font-semibold text-aurora-text-primary">
                  Your Name <span className="text-[#FA4616]">*</span>
                </label>
                <input
                  id="fb-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Shobhit"
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 ${
                    errors.name ? 'border-red-500' : 'border-aurora-border'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fb-email" className="block text-xs font-semibold text-aurora-text-primary">
                  Your Email <span className="text-[#FA4616]">*</span>
                </label>
                <input
                  id="fb-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 ${
                    errors.email ? 'border-red-500' : 'border-aurora-border'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label htmlFor="fb-subject" className="block text-xs font-semibold text-aurora-text-primary">
                Subject Summary <span className="text-[#FA4616]">*</span>
              </label>
              <input
                id="fb-subject"
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g., Two Sum testcase 3 output mismatch, or Add Python 3.12 syntax highlighting"
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 ${
                  errors.subject ? 'border-red-500' : 'border-aurora-border'
                }`}
              />
              {errors.subject && (
                <p className="text-[11px] text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Relevant Page URL (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="fb-url" className="block text-xs font-semibold text-aurora-text-primary flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-aurora-text-secondary" />
                Relevant Page URL <span className="text-aurora-text-secondary font-normal">(Optional)</span>
              </label>
              <input
                id="fb-url"
                type="url"
                value={pageUrl}
                onChange={e => setPageUrl(e.target.value)}
                placeholder="https://seekhsetu-h7j4.onrender.com/coding"
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="fb-desc" className="block text-xs font-semibold text-aurora-text-primary">
                  Detailed Explanation <span className="text-[#FA4616]">*</span>
                </label>
                <span className={`text-[11px] ${description.length > 2900 ? 'text-amber-500' : 'text-aurora-text-secondary'}`}>
                  {description.length} / 3000
                </span>
              </div>
              <textarea
                id="fb-desc"
                rows={5}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Steps to reproduce the issue, expected behavior vs actual outcome, browser version, or suggestions for enhancement..."
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 resize-y ${
                  errors.description ? 'border-red-500' : 'border-aurora-border'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Feedback...</span>
                </>
              ) : (
                <>
                  <span>Submit Issue / Suggestion</span>
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Info Notice */}
      <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border flex items-start gap-3 text-xs text-aurora-text-secondary">
        <HelpCircle className="w-4 h-4 shrink-0 text-[#FA4616] mt-0.5" />
        <p>
          Need urgent account assistance or immediate troubleshooting? You can also email us directly at{' '}
          <a href="mailto:seekhsetuteam@gmail.com" className="font-semibold text-[#FA4616] hover:underline">
            seekhsetuteam@gmail.com
          </a>{' '}
          or visit our{' '}
          <button
            type="button"
            onClick={() => setActiveTab('help')}
            className="font-semibold text-aurora-text-primary hover:underline"
          >
            Help & Support Center
          </button>
          .
        </p>
      </div>
    </div>
  );
};
