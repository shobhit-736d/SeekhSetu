import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../services/apiService';
import { careerTracksList } from '../../data/careerTracksData';
import { assessmentPresetsList, assessmentQuestionsBank } from '../../data/assessmentsData';
import {
  AssessmentQuestion,
  AssessmentPreset,
  AssessmentAttempt,
  AssessmentSubmitResponse,
  AssessmentDifficulty,
  AssessmentQuestionType
} from '../../types/assessment';
import {
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Filter,
  Search,
  BookOpen,
  Award,
  Sparkles,
  Zap,
  Flag,
  CheckSquare,
  Square,
  HelpCircle,
  ExternalLink,
  Code2,
  ChevronRight,
  ChevronDown,
  Layers,
  History,
  AlertTriangle,
  Flame,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_SESSION_KEY = 'seekhsetu_active_assessment_v1';

export const AssessmentsView: React.FC = () => {
  const {
    activeTrack,
    selectedAssessmentTrackFilter,
    setSelectedAssessmentTrackFilter,
    navigateToTrackResources,
    navigateToTrackProjects,
    navigateToCodingProblem,
    showToast
  } = useStudy();

  const { isAuthenticated, user } = useAuth();

  // Navigation / Mode: 'presets' | 'test' | 'practice' | 'results' | 'history'
  const [viewMode, setViewMode] = useState<'presets' | 'test' | 'practice' | 'results' | 'history'>('presets');

  // Filters for questions / presets
  const [selectedTrack, setSelectedTrack] = useState<string>(() => {
    return selectedAssessmentTrackFilter !== 'all' ? selectedAssessmentTrackFilter : 'all';
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Test / Practice Session State
  const [currentQuestions, setCurrentQuestions] = useState<AssessmentQuestion[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1200);
  const [totalAllocatedSeconds, setTotalAllocatedSeconds] = useState<number>(1200);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [testTitle, setTestTitle] = useState<string>('Career Benchmark Assessment');
  const [testTrackSlug, setTestTrackSlug] = useState<string>('general');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Practice Mode on-the-fly feedback
  const [practiceChecked, setPracticeChecked] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  // Results State
  const [lastResult, setLastResult] = useState<AssessmentSubmitResponse | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');

  // History State
  const [historyList, setHistoryList] = useState<AssessmentAttempt[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  // Question Navigator Drawer on Mobile / Desktop
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);

  // Sync track filter if changed from outside
  useEffect(() => {
    if (selectedAssessmentTrackFilter && selectedAssessmentTrackFilter !== 'all') {
      setSelectedTrack(selectedAssessmentTrackFilter);
    }
  }, [selectedAssessmentTrackFilter]);

  // Check for saved in-progress test on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.questions && parsed.questions.length > 0 && parsed.timeRemainingSeconds > 0) {
          // Valid in-progress test found
          setCurrentQuestions(parsed.questions);
          setUserAnswers(parsed.userAnswers || {});
          setFlaggedQuestions(parsed.flaggedQuestions || {});
          setActiveQuestionIdx(parsed.activeQuestionIdx || 0);
          setTimeRemainingSeconds(parsed.timeRemainingSeconds);
          setTotalAllocatedSeconds(parsed.totalAllocatedSeconds || 1200);
          setTestTitle(parsed.testTitle || 'Restored Assessment');
          setTestTrackSlug(parsed.testTrackSlug || 'general');
          setViewMode('test');
          showToast('Resumed previous in-progress test session', 'info');
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  }, [showToast]);

  // Save in-progress test to localStorage
  useEffect(() => {
    if (viewMode === 'test' && currentQuestions.length > 0) {
      const sessionData = {
        questions: currentQuestions,
        userAnswers,
        flaggedQuestions,
        activeQuestionIdx,
        timeRemainingSeconds,
        totalAllocatedSeconds,
        testTitle,
        testTrackSlug
      };
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionData));
    } else if (viewMode !== 'test') {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  }, [viewMode, currentQuestions, userAnswers, flaggedQuestions, activeQuestionIdx, timeRemainingSeconds, totalAllocatedSeconds, testTitle, testTrackSlug]);

  // Timer Tick
  useEffect(() => {
    if (viewMode !== 'test' || isTimerPaused) return;

    if (timeRemainingSeconds <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [viewMode, isTimerPaused, timeRemainingSeconds]);

  // Filtered Presets
  const filteredPresets = useMemo(() => {
    return assessmentPresetsList.filter(preset => {
      if (selectedTrack !== 'all' && preset.trackSlug !== selectedTrack) return false;
      if (selectedDifficulty !== 'all' && preset.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = preset.title.toLowerCase().includes(q);
        const matchesDesc = preset.description.toLowerCase().includes(q);
        const matchesTags = preset.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }
      return true;
    });
  }, [selectedTrack, selectedDifficulty, searchQuery]);

  // Filtered Practice Questions
  const filteredPracticeQuestions = useMemo(() => {
    return assessmentQuestionsBank.filter(q => {
      if (selectedTrack !== 'all' && q.trackSlug !== selectedTrack) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedQuestionType !== 'all' && q.questionType !== selectedQuestionType) return false;
      if (searchQuery.trim()) {
        const s = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(s);
        const matchesTopic = q.topic.toLowerCase().includes(s);
        const matchesSubject = q.subject.toLowerCase().includes(s);
        const matchesTags = q.tags.some(t => t.toLowerCase().includes(s));
        if (!matchesQ && !matchesTopic && !matchesSubject && !matchesTags) return false;
      }
      return true;
    });
  }, [selectedTrack, selectedDifficulty, selectedQuestionType, searchQuery]);

  // Load User Attempt History
  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const attempts = await ApiService.getUserAssessmentHistory();
      setHistoryList(attempts);
    } catch {
      // fallback
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  // START PRESET TEST
  const handleStartPresetTest = async (preset: AssessmentPreset) => {
    try {
      showToast(`Loading ${preset.title}...`, 'info');
      const questions = await ApiService.getAssessmentQuestions({
        track: preset.trackSlug,
        mode: 'timed-assessment',
        limit: preset.questionCount
      });

      if (!questions || questions.length === 0) {
        showToast('No questions currently available for this track filter.', 'warning');
        return;
      }

      setCurrentQuestions(questions);
      setActiveQuestionIdx(0);
      setUserAnswers({});
      setFlaggedQuestions({});
      setTestTitle(preset.title);
      setTestTrackSlug(preset.trackSlug);
      setTotalAllocatedSeconds(preset.durationMinutes * 60);
      setTimeRemainingSeconds(preset.durationMinutes * 60);
      setIsTimerPaused(false);
      setViewMode('test');
    } catch (err: any) {
      showToast('Failed to start assessment: ' + err.message, 'warning');
    }
  };

  // START CUSTOM PRACTICE MODE
  const handleStartPracticeMode = () => {
    if (filteredPracticeQuestions.length === 0) {
      showToast('No practice questions match the current filters.', 'warning');
      return;
    }
    setCurrentQuestions(filteredPracticeQuestions);
    setActiveQuestionIdx(0);
    setUserAnswers({});
    setPracticeChecked({});
    setRevealedHints({});
    setTestTitle(`${selectedTrack !== 'all' ? selectedTrack : 'Multi-Track'} Topic Practice Quiz`);
    setTestTrackSlug(selectedTrack);
    setViewMode('practice');
  };

  // ANSWER SELECTION HANDLERS
  const handleSelectOption = (questionId: string, optionIdx: number, type: AssessmentQuestionType) => {
    setUserAnswers(prev => {
      const current = prev[questionId] || [];
      if (type === 'multiple-select') {
        const next = current.includes(optionIdx)
          ? current.filter(i => i !== optionIdx)
          : [...current, optionIdx].sort((a, b) => a - b);
        return { ...prev, [questionId]: next };
      } else {
        // Single MCQ or True/False
        return { ...prev, [questionId]: [optionIdx] };
      }
    });
  };

  const toggleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // FINAL SUBMISSION HANDLER
  const handleFinalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const timeSpent = Math.max(0, totalAllocatedSeconds - timeRemainingSeconds);
      const submissionAnswers = currentQuestions.map(q => ({
        questionId: q.id,
        selectedAnswers: userAnswers[q.id] || []
      }));

      const result = await ApiService.submitAssessment({
        trackSlug: testTrackSlug,
        assessmentTitle: testTitle,
        mode: 'timed-assessment',
        timeSpentSeconds: timeSpent,
        answers: submissionAnswers
      });

      setLastResult(result);
      localStorage.removeItem(STORAGE_SESSION_KEY);
      setViewMode('results');

      if (result.passed) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast('Assessment Completed! You passed with proficiency.', 'success');
      } else {
        showToast('Assessment Completed. Review topics requiring improvement.', 'info');
      }
    } catch (err: any) {
      showToast('Submission failed: ' + err.message, 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Time format helper (mm:ss)
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeQ = currentQuestions[activeQuestionIdx];
  const answeredCount = Object.keys(userAnswers).filter(k => (userAnswers[k] || []).length > 0).length;
  const progressPercent = currentQuestions.length > 0 ? Math.round((answeredCount / currentQuestions.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* ============================================================== */}
      {/* 1. TOP HEADER & MODE NAVIGATION                                */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-aurora-bg-secondary via-aurora-bg-surface to-aurora-bg-secondary border border-aurora-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FA4616]/10 border border-[#FA4616]/20 text-xs font-bold text-[#FA4616]">
            <Award className="w-3.5 h-3.5" />
            <span>Practice Quizzes & Assessments Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-aurora-text-primary">
            Career Skill Benchmark & Quiz Arena
          </h1>
          <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-2xl leading-relaxed">
            Test and certify your competency across all 18 technology career tracks. Take timed benchmark exams, practice interactive topic quizzes, and review comprehensive performance analytics.
          </p>
        </div>

        {/* Global Action Switchers */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => { setViewMode('presets'); }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-2 ${
              viewMode === 'presets' || viewMode === 'test'
                ? 'bg-[#FA4616] text-white border-transparent shadow-sm'
                : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border-aurora-border'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Benchmark Exams</span>
          </button>

          <button
            onClick={() => { setViewMode('practice'); handleStartPracticeMode(); }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-2 ${
              viewMode === 'practice'
                ? 'bg-[#FA4616] text-white border-transparent shadow-sm'
                : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border-aurora-border'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Topic Practice</span>
          </button>

          <button
            onClick={() => { setViewMode('history'); loadHistory(); }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-2 ${
              viewMode === 'history'
                ? 'bg-[#FA4616] text-white border-transparent shadow-sm'
                : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border-aurora-border'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Past Attempts</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MODE: BENCHMARK PRESETS SELECTION                           */}
      {/* ============================================================== */}
      {viewMode === 'presets' && (
        <div className="space-y-6">
          {/* Controls & Filter Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              {/* Search Bar */}
              <div className="lg:col-span-6 relative">
                <Search className="w-4 h-4 text-aurora-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search exams, topics, tags (e.g. React, Kubernetes, Security)..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary focus:outline-none focus:border-[#FA4616]"
                />
              </div>

              {/* Track Selector */}
              <div className="lg:col-span-3 relative">
                <select
                  value={selectedTrack}
                  onChange={e => {
                    setSelectedTrack(e.target.value);
                    setSelectedAssessmentTrackFilter(e.target.value);
                  }}
                  className="w-full px-3 py-2 pr-8 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary focus:outline-none focus:border-[#FA4616] appearance-none"
                >
                  <option value="all">All 18 Career Tracks</option>
                  {careerTracksList.map(t => (
                    <option key={t.slug} value={t.slug}>{t.title}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-aurora-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Difficulty Selector */}
              <div className="lg:col-span-3 relative">
                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 pr-8 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary focus:outline-none focus:border-[#FA4616] appearance-none"
                >
                  <option value="all">All Difficulty Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <ChevronDown className="w-4 h-4 text-aurora-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Quick Track Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <button
                onClick={() => { setSelectedTrack('all'); setSelectedAssessmentTrackFilter('all'); }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedTrack === 'all'
                    ? 'bg-[#FA4616] text-white shadow-sm'
                    : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border border-aurora-border'
                }`}
              >
                All Tracks
              </button>
              {careerTracksList.map(t => (
                <button
                  key={t.slug}
                  onClick={() => {
                    setSelectedTrack(t.slug);
                    setSelectedAssessmentTrackFilter(t.slug);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedTrack === t.slug
                      ? 'bg-[#FA4616] text-white shadow-sm'
                      : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border border-aurora-border'
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPresets.map(preset => (
              <div
                key={preset.id}
                className="group p-5 rounded-3xl bg-aurora-bg-secondary hover:bg-aurora-bg-elevated border border-aurora-border hover:border-aurora-border-focus transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary">
                      {preset.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Pass: {preset.passingScorePercent}%
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-aurora-text-primary group-hover:text-[#FA4616] transition-colors leading-snug">
                    {preset.title}
                  </h3>

                  <p className="text-xs text-aurora-text-secondary leading-relaxed line-clamp-2">
                    {preset.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {preset.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-aurora-bg-surface text-aurora-text-secondary border border-aurora-border/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-aurora-border/70 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-aurora-text-secondary">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#FA4616]" />
                      <span>{preset.durationMinutes}m</span>
                    </span>
                    <span>•</span>
                    <span>{preset.questionCount} Questions</span>
                  </div>

                  <button
                    onClick={() => handleStartPresetTest(preset)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPresets.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-3">
              <HelpCircle className="w-8 h-8 text-aurora-text-muted mx-auto" />
              <h3 className="text-sm font-bold text-aurora-text-primary">No assessments found</h3>
              <p className="text-xs text-aurora-text-secondary">
                Try resetting your search query or selecting a different career track.
              </p>
              <button
                onClick={() => { setSelectedTrack('all'); setSelectedDifficulty('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. MODE: TIMED BENCHMARK EXAM / PRACTICE VIEW                  */}
      {/* ============================================================== */}
      {(viewMode === 'test' || viewMode === 'practice') && activeQ && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question Arena (Col 1-8 on desktop) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Session Top Bar */}
            <div className="p-4 rounded-2xl bg-aurora-bg-secondary border border-aurora-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to exit? Your current test progress will be saved.')) {
                      setViewMode('presets');
                    }
                  }}
                  className="p-1.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border border-aurora-border transition-colors"
                  title="Return to Presets"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-sm font-bold text-aurora-text-primary truncate max-w-xs sm:max-w-md">
                    {testTitle}
                  </h2>
                  <div className="text-[11px] text-aurora-text-secondary">
                    Question {activeQuestionIdx + 1} of {currentQuestions.length} • {activeQ.subject}
                  </div>
                </div>
              </div>

              {/* Live Timer (Timed Test Mode) */}
              {viewMode === 'test' && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs ${
                  timeRemainingSeconds <= 300
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30 animate-pulse'
                    : 'bg-aurora-bg-surface text-aurora-text-primary border-aurora-border'
                }`}>
                  <Clock className="w-4 h-4 text-[#FA4616]" />
                  <span>{formatTime(timeRemainingSeconds)}</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-aurora-bg-surface overflow-hidden border border-aurora-border">
              <div
                className="h-full bg-gradient-to-r from-[#FA4616] to-amber-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-5">
              {/* Question Metadata Header */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    activeQ.questionType === 'multiple-select'
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                      : activeQ.questionType === 'coding-challenge'
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {activeQ.questionType === 'multiple-select'
                      ? 'Multiple-Select'
                      : activeQ.questionType === 'coding-challenge'
                      ? 'Coding Challenge'
                      : activeQ.questionType === 'true-false'
                      ? 'True / False'
                      : 'Single Choice MCQ'}
                  </span>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-aurora-bg-surface text-aurora-text-secondary border border-aurora-border">
                    {activeQ.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => toggleFlagQuestion(activeQ.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-colors ${
                    flaggedQuestions[activeQ.id]
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border-aurora-border'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[activeQ.id] ? 'Flagged for Review' : 'Flag Question'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-semibold text-aurora-text-primary leading-relaxed">
                {activeQ.question}
              </div>

              {/* Optional Code Snippet */}
              {activeQ.codeSnippet && (
                <div className="rounded-2xl bg-[#0D1117] border border-white/10 p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed shadow-inner">
                  <pre>{activeQ.codeSnippet}</pre>
                </div>
              )}

              {/* Coding Challenge Helper (if coding question) */}
              {activeQ.questionType === 'coding-challenge' && activeQ.codingQuestionId && (
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                    <Code2 className="w-4 h-4 text-blue-500" />
                    <span>This problem has a live execution sandbox in the Coding Arena.</span>
                  </div>
                  <button
                    onClick={() => navigateToCodingProblem(activeQ.codingQuestionId!)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Open in Coding Arena</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Multiple Select instruction */}
              {activeQ.questionType === 'multiple-select' && (
                <div className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Select all options that apply (Multiple choices correct)</span>
                </div>
              )}

              {/* Options List */}
              <div className="space-y-2.5">
                {activeQ.options.map((opt, idx) => {
                  const selectedIndices = userAnswers[activeQ.id] || [];
                  const isSelected = selectedIndices.includes(idx);
                  const isPracticeRevealed = viewMode === 'practice' && practiceChecked[activeQ.id];
                  const isCorrectAnswer = activeQ.correctAnswers && activeQ.correctAnswers.includes(idx);

                  let borderClass = 'border-aurora-border hover:border-aurora-border-focus bg-aurora-bg-surface';
                  if (isSelected) {
                    borderClass = 'border-[#FA4616] bg-[#FA4616]/10 text-[#FA4616] font-semibold';
                  }

                  if (isPracticeRevealed) {
                    if (isCorrectAnswer) {
                      borderClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrectAnswer) {
                      borderClass = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(activeQ.id, idx, activeQ.questionType)}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${borderClass}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {activeQ.questionType === 'multiple-select' ? (
                          isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#FA4616]" />
                          ) : (
                            <Square className="w-4 h-4 text-aurora-text-muted" />
                          )
                        ) : (
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            isSelected
                              ? 'border-[#FA4616] bg-[#FA4616] text-white'
                              : 'border-aurora-border text-aurora-text-secondary'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 leading-relaxed text-aurora-text-primary">
                        {opt}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Practice Mode: Instant Check & Explanation */}
              {viewMode === 'practice' && (
                <div className="pt-4 border-t border-aurora-border/70 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <button
                      onClick={() => {
                        setPracticeChecked(prev => ({ ...prev, [activeQ.id]: true }));
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                    >
                      Check Answer
                    </button>

                    {activeQ.hint && (
                      <button
                        onClick={() => setRevealedHints(prev => ({ ...prev, [activeQ.id]: !prev[activeQ.id] }))}
                        className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>{revealedHints[activeQ.id] ? 'Hide Hint' : 'Show Hint'}</span>
                      </button>
                    )}
                  </div>

                  {revealedHints[activeQ.id] && activeQ.hint && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-700 dark:text-amber-300">
                      <strong>Hint: </strong>{activeQ.hint}
                    </div>
                  )}

                  {practiceChecked[activeQ.id] && (
                    <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                      <div className="text-xs font-bold text-aurora-text-primary flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Verified Explanation</span>
                      </div>
                      <p className="text-xs text-aurora-text-secondary leading-relaxed">
                        {activeQ.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Navigator Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                disabled={activeQuestionIdx === 0}
                onClick={() => setActiveQuestionIdx(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-aurora-bg-secondary hover:bg-aurora-bg-elevated disabled:opacity-40 text-xs font-bold text-aurora-text-primary border border-aurora-border transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPaletteOpen(prev => !prev)}
                  className="px-3.5 py-2 rounded-xl bg-aurora-bg-surface text-xs font-semibold text-aurora-text-secondary border border-aurora-border lg:hidden"
                >
                  Question Grid
                </button>

                {activeQuestionIdx < currentQuestions.length - 1 ? (
                  <button
                    onClick={() => setActiveQuestionIdx(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    disabled={isSubmitting}
                    onClick={handleFinalSubmit}
                    className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>{isSubmitting ? 'Evaluating...' : 'Submit & Review Score'}</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Palette Sidebar (Col 9-12 on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-primary">
                  Question Palette
                </h3>
                <span className="text-xs font-bold text-[#FA4616]">
                  {answeredCount} / {currentQuestions.length} Done
                </span>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-aurora-text-secondary pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" />
                  <span>Answered</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/40" />
                  <span>Flagged</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-aurora-bg-surface border border-aurora-border" />
                  <span>Unanswered</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded border-2 border-[#FA4616]" />
                  <span>Current</span>
                </span>
              </div>

              {/* Question Number Badges */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {currentQuestions.map((q, idx) => {
                  const isAnswered = (userAnswers[q.id] || []).length > 0;
                  const isFlagged = flaggedQuestions[q.id];
                  const isCurrent = idx === activeQuestionIdx;

                  let badgeClass = 'bg-aurora-bg-surface text-aurora-text-secondary border-aurora-border';
                  if (isAnswered) {
                    badgeClass = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 font-bold';
                  }
                  if (isFlagged) {
                    badgeClass = 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40 font-bold';
                  }
                  if (isCurrent) {
                    badgeClass += ' ring-2 ring-[#FA4616] text-[#FA4616] font-extrabold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestionIdx(idx)}
                      className={`h-9 rounded-xl border text-xs flex items-center justify-center transition-all ${badgeClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Final Submit CTA */}
              <div className="pt-4 border-t border-aurora-border/70">
                <button
                  disabled={isSubmitting}
                  onClick={handleFinalSubmit}
                  className="w-full py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] disabled:opacity-50 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  {isSubmitting ? 'Evaluating Submission...' : 'Submit Assessment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. MODE: RESULTS DASHBOARD                                     */}
      {/* ============================================================== */}
      {viewMode === 'results' && lastResult && (
        <div className="space-y-6">
          {/* Top Performance Scorecard */}
          <div className="p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>Verified Assessment Results</span>
              </div>
              <h2 className="text-2xl font-extrabold text-aurora-text-primary">
                {lastResult.passed ? 'Benchmark Passed — Proficient!' : 'Assessment Completed — Growth Required'}
              </h2>
              <p className="text-xs text-aurora-text-secondary max-w-xl leading-relaxed">
                {lastResult.passed
                  ? 'Congratulations! Your score meets the competency criteria for this technology track.'
                  : 'You scored below the 70% threshold. Review the topic breakdown below and reinforce your understanding with recommended guides.'}
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className="flex items-center gap-6">
              <div className="text-center p-6 rounded-3xl bg-aurora-bg-surface border border-aurora-border min-w-[140px]">
                <div className={`text-4xl font-extrabold ${lastResult.passed ? 'text-emerald-500' : 'text-[#FA4616]'}`}>
                  {lastResult.percentage}%
                </div>
                <div className="text-xs font-bold text-aurora-text-secondary mt-1">
                  {lastResult.score} / {lastResult.totalQuestions} Correct
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-aurora-text-secondary">Time Spent: </span>
                  <span className="font-bold text-aurora-text-primary">{formatTime(lastResult.timeSpentSeconds)}</span>
                </div>
                <div>
                  <span className="text-aurora-text-secondary">Track: </span>
                  <span className="font-bold text-aurora-text-primary capitalize">{testTrackSlug}</span>
                </div>
                <div>
                  <span className="text-aurora-text-secondary">Status: </span>
                  <span className={`font-bold ${lastResult.passed ? 'text-emerald-500' : 'text-red-500'}`}>
                    {lastResult.passed ? 'PASSED' : 'NEEDS PRACTICE'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Topic-Wise Breakdown & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Topic Breakdown Progress Bars */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
              <h3 className="text-sm font-bold text-aurora-text-primary flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FA4616]" />
                <span>Topic Competency Breakdown</span>
              </h3>

              <div className="space-y-3 pt-1">
                {Object.entries(lastResult.topicBreakdown || {}).map(([topicName, stats]) => (
                  <div key={topicName} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-aurora-text-primary truncate max-w-xs">{topicName}</span>
                      <span className={`font-bold ${stats.percent >= 70 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stats.correct}/{stats.total} ({stats.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-aurora-bg-surface overflow-hidden border border-aurora-border">
                      <div
                        className={`h-full transition-all ${stats.percent >= 70 ? 'bg-emerald-500' : 'bg-red-500'}`}
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Targeted Improvement Recommendations */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
              <h3 className="text-sm font-bold text-aurora-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Actionable Recommendations</span>
              </h3>

              <div className="space-y-2.5">
                {lastResult.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-secondary flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FA4616] shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => navigateToTrackResources(testTrackSlug)}
                  className="px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Track Resources</span>
                </button>

                <button
                  onClick={() => navigateToTrackProjects(testTrackSlug)}
                  className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/25 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Build Track Projects</span>
                </button>
              </div>
            </div>
          </div>

          {/* Question Review Section */}
          <div className="p-6 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 className="text-sm font-bold text-aurora-text-primary flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#FA4616]" />
                <span>Detailed Question Review ({lastResult.evaluatedAnswers.length})</span>
              </h3>

              <div className="flex items-center gap-1 bg-aurora-bg-surface p-1 rounded-xl border border-aurora-border text-xs">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    reviewFilter === 'all' ? 'bg-[#FA4616] text-white' : 'text-aurora-text-secondary hover:text-aurora-text-primary'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setReviewFilter('incorrect')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    reviewFilter === 'incorrect' ? 'bg-red-500 text-white' : 'text-aurora-text-secondary hover:text-aurora-text-primary'
                  }`}
                >
                  Incorrect Only
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {lastResult.evaluatedAnswers
                .filter(a => reviewFilter === 'all' || !a.isCorrect)
                .map((ans, idx) => {
                  const origQ = currentQuestions.find(q => q.id === ans.questionId) || assessmentQuestionsBank.find(q => q.id === ans.questionId);

                  return (
                    <div
                      key={ans.questionId}
                      className={`p-5 rounded-2xl border space-y-3 ${
                        ans.isCorrect
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : 'bg-red-500/5 border-red-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-aurora-text-primary">
                          Question {idx + 1}
                        </span>
                        <span className={`text-xs font-bold flex items-center gap-1 ${
                          ans.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {ans.isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Correct</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              <span>Incorrect</span>
                            </>
                          )}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm font-semibold text-aurora-text-primary">
                        {origQ?.question || 'Question content'}
                      </div>

                      {/* Display Options with verified highlights */}
                      {origQ?.options && (
                        <div className="space-y-1.5 pt-1">
                          {origQ.options.map((opt, optIdx) => {
                            const isUserSelected = (ans.selectedAnswers || []).includes(optIdx);
                            const isRight = (ans.correctAnswers || []).includes(optIdx);

                            let optStyle = 'border-aurora-border bg-aurora-bg-surface text-aurora-text-secondary';
                            if (isRight) {
                              optStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold';
                            } else if (isUserSelected && !isRight) {
                              optStyle = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300';
                            }

                            return (
                              <div key={optIdx} className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${optStyle}`}>
                                <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                                <span>{opt}</span>
                                {isUserSelected && <span className="text-[10px] ml-auto font-bold">(Your Answer)</span>}
                                {isRight && <span className="text-[10px] ml-auto font-bold text-emerald-600">✓ Correct Answer</span>}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-secondary space-y-1">
                        <span className="font-bold text-aurora-text-primary">Explanation: </span>
                        <span>{ans.explanation}</span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setViewMode('presets')}
                className="px-5 py-2.5 rounded-xl bg-[#FA4616] text-white text-xs font-bold transition-colors shadow-sm"
              >
                Back to Assessment Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. MODE: ATTEMPT HISTORY                                       */}
      {/* ============================================================== */}
      {viewMode === 'history' && (
        <div className="space-y-5">
          <div className="p-6 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
            <h3 className="text-base font-bold text-aurora-text-primary flex items-center gap-2">
              <History className="w-5 h-5 text-[#FA4616]" />
              <span>Assessment & Quiz History</span>
            </h3>

            {loadingHistory ? (
              <div className="py-12 text-center text-xs text-aurora-text-secondary">
                Loading your attempt records...
              </div>
            ) : historyList.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Trophy className="w-8 h-8 text-aurora-text-muted mx-auto" />
                <div className="text-sm font-bold text-aurora-text-primary">No completed attempts recorded yet</div>
                <p className="text-xs text-aurora-text-secondary max-w-sm mx-auto">
                  Take your first timed benchmark assessment to track your scores, accuracy, and topic-wise strengths.
                </p>
                <button
                  onClick={() => setViewMode('presets')}
                  className="px-4 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-bold"
                >
                  Browse Benchmark Exams
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {historyList.map(item => (
                  <div
                    key={item.id || item._id}
                    className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between gap-4 flex-wrap"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-aurora-text-primary">{item.assessmentTitle}</h4>
                      <div className="text-xs text-aurora-text-secondary mt-0.5">
                        Track: <span className="capitalize font-semibold">{item.trackSlug}</span> • {new Date(item.completedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-base font-extrabold ${item.passed ? 'text-emerald-500' : 'text-[#FA4616]'}`}>
                          {item.percentage}%
                        </div>
                        <div className="text-[11px] text-aurora-text-secondary">
                          {item.score}/{item.totalQuestions}
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.passed
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                      }`}>
                        {item.passed ? 'PASSED' : 'NEEDS PRACTICE'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
