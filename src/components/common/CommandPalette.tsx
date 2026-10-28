import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Clock, Target, ArrowRight, Flame, Compass, Map, Library, FolderGit2, Award, MessageSquare, Briefcase, ShieldCheck } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { allDays } from '../../data/roadmapData';
import { careerTracksList } from '../../data/careerTracksData';
import { learningResourcesList } from '../../data/learningResourcesData';
import { guidedProjectsList } from '../../data/guidedProjectsData';
import { assessmentPresetsList } from '../../data/assessmentsData';
import { interviewQuestionsList } from '../../data/interviewQuestionsData';
import { certificationsList } from '../../data/certificationsData';
import { jobListingsList } from '../../data/jobListingsData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const {
    navigateToDay,
    setActiveTab,
    navigateToTrackRoadmap,
    navigateToTrackResources,
    navigateToTrackProjects,
    navigateToTrackAssessments,
    navigateToTrackInterviews,
    navigateToTrackCertifications,
    navigateToTrackJobs
  } = useStudy();

  const { isAuthenticated, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  const executeAction = (fn: () => void) => {
    onClose();
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setIsAuthModalOpen(true);
      return;
    }
    fn();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return {
        quickActions: [
          { label: 'Explore 18+ Tech Career Tracks', action: () => executeAction(() => setActiveTab('careers')), icon: Compass },
          { label: 'Multi-Track Visual Learning Roadmaps', action: () => executeAction(() => setActiveTab('roadmap')), icon: Map },
          { label: 'Curated Learning Resources Hub', action: () => executeAction(() => setActiveTab('resources')), icon: Library },
          { label: 'Guided Projects & Real-World Blueprints', action: () => executeAction(() => setActiveTab('projects')), icon: FolderGit2 },
          { label: 'Verified Industry Certifications Guide', action: () => executeAction(() => setActiveTab('certifications')), icon: Award },
          { label: 'Verified Opportunities & Campus Recruitment', action: () => executeAction(() => setActiveTab('jobs')), icon: Briefcase },
          { label: 'Career Skill Assessments & Practice Quizzes', action: () => executeAction(() => setActiveTab('practice')), icon: Award },
          { label: 'Open Coding Arena (LeetCode Style Problems)', action: () => executeAction(() => setActiveTab('coding')), icon: Target },
          { label: 'Technical Interview Prep & Mock Simulator', action: () => executeAction(() => setActiveTab('communication')), icon: MessageSquare },
          { label: 'Practice Placement Aptitude & Mock Tests', action: () => executeAction(() => setActiveTab('aptitude')), icon: BookOpen },
          { label: 'AI Resume Studio & Multi-Track ATS Scanner', action: () => executeAction(() => setActiveTab('resume')), icon: Target },
          { label: 'Start 25-min Focus Study Timer', action: () => executeAction(() => setActiveTab('timer')), icon: Clock },
          { label: 'Review Starred Days & Notes Backlog', action: () => executeAction(() => setActiveTab('revision')), icon: Flame },
        ],
        careerTracks: [],
        resources: [],
        projects: [],
        certifications: [],
        jobs: [],
        assessments: [],
        interviews: [],
        days: allDays.slice(0, 5),
        topics: []
      };
    }

    const q = query.toLowerCase();

    const matchedTracks = careerTracksList.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.commonJobRoles.some(r => r.toLowerCase().includes(q)) ||
      t.skills.core.some(s => s.toLowerCase().includes(q))
    ).slice(0, 5);

    const matchedResources = learningResourcesList.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.topic && r.topic.toLowerCase().includes(q)) ||
      r.tags.some(tag => tag.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedProjects = guidedProjectsList.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      (p.projectType && p.projectType.toLowerCase().includes(q)) ||
      p.techStack.some(t => t.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedAssessments = assessmentPresetsList.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.trackSlug.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t: string) => t.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedInterviews = interviewQuestionsList.filter(iq =>
      iq.question.toLowerCase().includes(q) ||
      iq.topic.toLowerCase().includes(q) ||
      iq.trackSlug.toLowerCase().includes(q) ||
      iq.jobRoles.some(r => r.toLowerCase().includes(q)) ||
      (iq.companies && iq.companies.some(c => c.toLowerCase().includes(q)))
    ).slice(0, 4);

    const matchedCertifications = certificationsList.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q) ||
      c.trackSlug.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedJobs = jobListingsList.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.trackSlug.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedDays = allDays.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.moduleName.toLowerCase().includes(q) ||
      `day ${d.dayNumber}`.includes(q)
    );

    const matchedTopics: Array<{ dayNumber: number; topicId: string; topicTitle: string; moduleName: string }> = [];
    allDays.forEach(day => {
      day.topics.forEach(topic => {
        if (topic.title.toLowerCase().includes(q) || topic.summary.toLowerCase().includes(q)) {
          matchedTopics.push({
            dayNumber: day.dayNumber,
            topicId: topic.id,
            topicTitle: topic.title,
            moduleName: day.moduleName
          });
        }
      });
    });

    return {
      quickActions: [],
      careerTracks: matchedTracks,
      resources: matchedResources,
      projects: matchedProjects,
      certifications: matchedCertifications,
      jobs: matchedJobs,
      assessments: matchedAssessments,
      interviews: matchedInterviews,
      days: matchedDays,
      topics: matchedTopics.slice(0, 6)
    };
  }, [query, setActiveTab, onClose, navigateToTrackResources, navigateToTrackProjects, navigateToTrackAssessments, navigateToTrackInterviews, navigateToTrackCertifications, navigateToTrackJobs]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-aurora-bg-elevated border border-aurora-border rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-aurora-border gap-3">
              <Search className="w-5 h-5 text-[#FA4616] flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search days, topics, algorithms, or concepts... (e.g. closures, ACID, day 1)"
                className="w-full bg-transparent text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-3.5 space-y-4">
              {/* Quick Actions if query empty */}
              {searchResults.quickActions.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Quick Actions
                  </div>
                  <div className="space-y-1">
                    {searchResults.quickActions.map((qa, idx) => {
                      const Icon = qa.icon;
                      return (
                        <button
                          key={idx}
                          onClick={qa.action}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-[#FA4616] group-hover:text-[#FA4616] transition-colors" />
                            <span>{qa.label}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matched Career Tracks */}
              {searchResults.careerTracks.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Career Tracks ({searchResults.careerTracks.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.careerTracks.map(track => (
                      <button
                        key={track.slug}
                        onClick={() => executeAction(() => navigateToTrackRoadmap(track.slug))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Compass className="w-4 h-4 text-[#FA4616] flex-shrink-0" />
                          <span className="truncate">{track.title}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary">
                            {track.category}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Learning Resources */}
              {searchResults.resources && searchResults.resources.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Learning Resources ({searchResults.resources.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.resources.map(res => (
                      <button
                        key={res.id}
                        onClick={() => executeAction(() => navigateToTrackResources(res.trackSlug))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Library className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          <span className="truncate">{res.title}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                            {res.category}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Guided Projects */}
              {searchResults.projects && searchResults.projects.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Guided Projects ({searchResults.projects.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.projects.map(proj => (
                      <button
                        key={proj.id}
                        onClick={() => executeAction(() => navigateToTrackProjects(proj.trackSlug))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FolderGit2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <span className="truncate">{proj.title}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                            {proj.difficulty}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Skill Assessments */}
              {searchResults.assessments && searchResults.assessments.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Skill Assessments ({searchResults.assessments.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.assessments.map(exam => (
                      <button
                        key={exam.id}
                        onClick={() => executeAction(() => navigateToTrackAssessments(exam.trackSlug))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-emerald-500/15 hover:text-emerald-500 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Award className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="truncate">{exam.title}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {exam.durationMinutes}m · {exam.difficulty}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Interview Questions */}
              {searchResults.interviews && searchResults.interviews.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Interview Questions ({searchResults.interviews.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.interviews.map(iq => (
                      <button
                        key={iq.id}
                        onClick={() => executeAction(() => navigateToTrackInterviews(iq.trackSlug))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-amber-500/15 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <MessageSquare className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span className="truncate">{iq.question}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 shrink-0">
                            {iq.difficulty} · {iq.topic}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Certifications */}
              {searchResults.certifications && searchResults.certifications.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Industry Certifications ({searchResults.certifications.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.certifications.map(cert => (
                      <button
                        key={cert.code}
                        onClick={() => executeAction(() => navigateToTrackCertifications(cert.trackSlug))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-amber-500/15 hover:text-amber-500 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span className="truncate">{cert.name}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            {cert.code} · ${cert.costUsd}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Verified Job Opportunities */}
              {searchResults.jobs && searchResults.jobs.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Verified Job Opportunities ({searchResults.jobs.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.jobs.map(job => (
                      <button
                        key={job.id}
                        onClick={() => executeAction(() => navigateToTrackJobs(job.trackSlug))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-sky-500/15 hover:text-sky-400 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Briefcase className="w-4 h-4 text-sky-400 flex-shrink-0" />
                          <span className="truncate">{job.title} at {job.company}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {job.jobType}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Days */}
              {searchResults.days.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Study Days ({searchResults.days.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.days.map(day => (
                      <button
                        key={day.dayNumber}
                        onClick={() => executeAction(() => navigateToDay(day.dayNumber))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 text-xs font-bold rounded bg-aurora-bg-surface border border-aurora-border text-[#FA4616]">
                            Day {day.dayNumber}
                          </span>
                          <span className="truncate">{day.title}</span>
                        </div>
                        <span className="text-xs text-aurora-text-secondary">
                          {day.estimatedMinutes}m
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Topics */}
              {searchResults.topics.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Specific Lessons ({searchResults.topics.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.topics.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => executeAction(() => navigateToDay(t.dayNumber, t.topicId))}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <BookOpen className="w-4 h-4 text-[#FA4616] flex-shrink-0" />
                          <span className="truncate">{t.topicTitle}</span>
                        </div>
                        <span className="text-xs text-aurora-text-secondary whitespace-nowrap ml-2">
                          Day {t.dayNumber}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {query &&
                searchResults.careerTracks.length === 0 &&
                searchResults.resources.length === 0 &&
                searchResults.projects.length === 0 &&
                searchResults.days.length === 0 &&
                searchResults.topics.length === 0 && (
                <div className="py-8 text-center text-sm text-aurora-text-secondary">
                  No matching tracks, resources, projects, or lessons found for <span className="text-aurora-text-primary font-semibold">"{query}"</span>.
                </div>
              )}
            </div>

            {/* Footer with hint */}
            <div className="px-4 py-2.5 bg-aurora-bg-surface/50 border-t border-aurora-border flex items-center justify-between text-xs text-aurora-text-secondary">
              <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border font-mono text-xs">ESC</kbd> to close</span>
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border font-mono text-xs">Ctrl+K</kbd> anytime</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
