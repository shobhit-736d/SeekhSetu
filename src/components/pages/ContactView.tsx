import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../services/apiService';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const ContactView: React.FC = () => {
  const { setActiveTab } = useStudy();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    category: 'general',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Contact Us — Let's Connect | SeekhSetu";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Autofill name and email if user profile loads
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required';
    } else if (formData.subject.trim().length < 4) {
      errs.subject = 'Subject must be at least 4 characters';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters so we can understand your request';
    } else if (formData.message.trim().length > 3000) {
      errs.message = 'Message cannot exceed 3,000 characters';
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
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        category: formData.category,
        pageUrl: window.location.href
      });

      setSubmitSuccess(true);
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        subject: '',
        category: 'general',
        message: ''
      });
      setErrors({});
    } catch (err: any) {
      setSubmitError(err.message || 'Unable to submit your message right now. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAnother = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <div className="w-full space-y-12 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FA4616]" />
          <span className="text-xs font-semibold text-aurora-text-primary tracking-wide">
            Support & Community
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-aurora-text-primary">
          Let&apos;s Connect
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-aurora-text-secondary leading-relaxed">
          Have a question, need help, or want to share feedback? Send us a message and we&apos;ll do our best to help.
        </p>
      </section>

      {/* 2. MAIN GRID (CONTACT FORM & INFO SIDEBAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-7 bg-aurora-bg-elevated border border-aurora-border rounded-2xl p-6 sm:p-8 shadow-sm">
          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-aurora-text-primary">
                  Message Received!
                </h2>
                <p className="text-sm text-aurora-text-secondary max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to SeekhSetu. Your message has been saved in our system.
                  Our team typically reviews and responds within 24 to 48 hours.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAnother}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-aurora-border text-xs font-semibold text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
                >
                  Send Another Message
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FA4616] text-white text-xs font-semibold hover:bg-[#e03d12] transition-colors shadow-sm"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-aurora-border">
                <h2 className="text-lg font-bold font-display text-aurora-text-primary flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#FA4616]" />
                  Direct Inquiries
                </h2>
                <span className="text-xs text-aurora-text-secondary">
                  * Required fields
                </span>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-aurora-text-primary">
                    Full Name <span className="text-[#FA4616]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Shobhit Yadav"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 transition-all ${
                      errors.name ? 'border-red-500' : 'border-aurora-border'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-aurora-text-primary">
                    Email Address <span className="text-[#FA4616]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 transition-all ${
                      errors.email ? 'border-red-500' : 'border-aurora-border'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Category & Subject Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-category" className="block text-xs font-semibold text-aurora-text-primary">
                    Topic Category
                  </label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Curriculum Feedback</option>
                    <option value="bug_report">Bug Report</option>
                    <option value="partnership">Collaboration</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-aurora-text-primary">
                    Subject Line <span className="text-[#FA4616]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your question"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 transition-all ${
                      errors.subject ? 'border-red-500' : 'border-aurora-border'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Area */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-aurora-text-primary">
                    Message <span className="text-[#FA4616]">*</span>
                  </label>
                  <span className={`text-[11px] ${formData.message.length > 2900 ? 'text-amber-500' : 'text-aurora-text-secondary'}`}>
                    {formData.message.length} / 3000
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about how we can help, what question you have, or what you experienced..."
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-aurora-bg-surface border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-[#FA4616]/40 resize-y transition-all ${
                    errors.message ? 'border-red-500' : 'border-aurora-border'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
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
                    <span>Submitting Securely...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: CONTACT DETAILS & FAQ HELPER */}
        <div className="lg:col-span-5 space-y-4">
          {/* Support Email Card */}
          <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-aurora-text-primary">
                Official Support Channel
              </h3>
              <p className="text-xs text-aurora-text-secondary">
                For account verification, technical issues, or curriculum inquiries:
              </p>
              <a
                href="mailto:seekhsetuteam@gmail.com"
                className="inline-block text-xs sm:text-sm font-mono font-semibold text-[#FA4616] hover:underline pt-1"
              >
                seekhsetuteam@gmail.com
              </a>
            </div>
          </div>

          {/* Turnaround Time Card */}
          <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-aurora-text-primary">
                Response Turnaround
              </h3>
              <p className="text-xs text-aurora-text-secondary leading-relaxed">
                We review every incoming communication. Inquiries are generally processed within <span className="font-semibold text-aurora-text-primary">24 to 48 business hours</span>.
              </p>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary">
              Helpful Resources
            </h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveTab('faq')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border text-xs text-aurora-text-primary transition-colors text-left"
              >
                <span className="flex items-center gap-2 font-medium">
                  <HelpCircle className="w-3.5 h-3.5 text-[#FA4616]" />
                  Frequently Asked Questions
                </span>
                <span className="text-[11px] text-aurora-text-secondary">View FAQs →</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('feedback')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border text-xs text-aurora-text-primary transition-colors text-left"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  Report a Bug or Feature
                </span>
                <span className="text-[11px] text-aurora-text-secondary">Feedback →</span>
              </button>

              <a
                href="https://github.com/shobhit-736d/SeekhSetu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border text-xs text-aurora-text-primary transition-colors"
              >
                <span className="flex items-center gap-2 font-medium">
                  <GithubIcon className="w-3.5 h-3.5 text-aurora-text-secondary" />
                  GitHub Repository
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-aurora-text-secondary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
