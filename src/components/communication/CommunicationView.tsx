// src/components/communication/CommunicationView.tsx
// Comprehensive Technical Interview, Mock Interview Simulator & Soft Skills Preparation Engine

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Sparkles,
  MessageSquare,
  Users,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Send,
  ChevronDown,
  ChevronUp,
  Volume2,
  Search,
  Filter,
  Award,
  Clock,
  Target,
  ArrowRight,
  Bookmark,
  Check,
  ShieldCheck,
  Code2,
  Briefcase,
  HelpCircle,
  TrendingUp,
  FileText,
  Flame,
  X,
  History,
  Layers,
  Info,
  Map,
  FolderGit2
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../services/apiService';
import { careerTracksList } from '../../data/careerTracksData';
import { interviewQuestionsList, mockInterviewPresets } from '../../data/interviewQuestionsData';
import { softSkillGuides, hrInterviewGuide } from '../../data/softSkillsData';
import {
  elevatorPitchFrameworks,
  starMethodTemplates,
  topHrQuestionsBank
} from '../../data/communicationData';
import {
  InterviewQuestion,
  InterviewCategory,
  InterviewDifficulty,
  MockInterviewPreset,
  MockInterviewEvaluation,
  MockInterviewAttemptRecord
} from '../../types/interview';

export const CommunicationView: React.FC = () => {
  const {
    showToast,
    selectedInterviewTrackFilter,
    setSelectedInterviewTrackFilter,
    bookmarkedInterviewQuestionIds,
    toggleInterviewQuestionBookmark,
    isInterviewQuestionBookmarked,
    masteredInterviewQuestionIds,
    toggleInterviewQuestionMastered,
    isInterviewQuestionMastered,
    navigateToTrackRoadmap,
    navigateToTrackProjects
  } = useStudy();

  const { isAuthenticated, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  // Primary Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'questions' | 'mock' | 'star' | 'hr' | 'soft-skills' | 'pitch' | 'history'
  >('questions');

  // ==========================================
  // 1. TECHNICAL QUESTION BANK STATE
  // ==========================================
  const [questions, setQuestions] = useState<InterviewQuestion[]>(interviewQuestionsList);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Sync track filter from context
  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      setLoadingQuestions(true);
      try {
        const data = await ApiService.getInterviewQuestions({
          trackSlug: selectedInterviewTrackFilter !== 'all' ? selectedInterviewTrackFilter : undefined,
          category: selectedCategoryFilter !== 'all' ? selectedCategoryFilter : undefined,
          difficulty: selectedDifficultyFilter !== 'all' ? selectedDifficultyFilter : undefined,
          search: searchQuery.trim() || undefined
        });
        if (isMounted && Array.isArray(data)) {
          setQuestions(data);
        }
      } catch {
        // Fallback handled in ApiService
      } finally {
        if (isMounted) setLoadingQuestions(false);
      }
    };

    fetchQuestions();
    return () => { isMounted = false; };
  }, [selectedInterviewTrackFilter, selectedCategoryFilter, selectedDifficultyFilter, searchQuery]);

  // Filtered Questions Memo
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (selectedInterviewTrackFilter !== 'all' && q.trackSlug !== selectedInterviewTrackFilter) {
        return false;
      }
      if (selectedCategoryFilter !== 'all' && q.category !== selectedCategoryFilter) {
        return false;
      }
      if (selectedDifficultyFilter !== 'all' && q.difficulty !== selectedDifficultyFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const s = searchQuery.toLowerCase();
        const match =
          q.title.toLowerCase().includes(s) ||
          q.question.toLowerCase().includes(s) ||
          q.topic.toLowerCase().includes(s) ||
          q.tags.some(t => t.toLowerCase().includes(s));
        if (!match) return false;
      }
      return true;
    });
  }, [questions, selectedInterviewTrackFilter, selectedCategoryFilter, selectedDifficultyFilter, searchQuery]);

  // ==========================================
  // 2. MOCK INTERVIEW SIMULATOR STATE
  // ==========================================
  const [presets, setPresets] = useState<MockInterviewPreset[]>(mockInterviewPresets);
  const [selectedPreset, setSelectedPreset] = useState<MockInterviewPreset>(mockInterviewPresets[0]);
  const [mockSessionActive, setMockSessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mockQuestions, setMockQuestions] = useState<InterviewQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [currentAnswerText, setCurrentAnswerText] = useState('');
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<MockInterviewEvaluation | null>(null);

  // Load presets
  useEffect(() => {
    ApiService.getInterviewPresets().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setPresets(data);
        // Pre-select preset matching track if available
        if (selectedInterviewTrackFilter !== 'all') {
          const match = data.find(p => p.trackSlug === selectedInterviewTrackFilter);
          if (match) setSelectedPreset(match);
        }
      }
    });
  }, [selectedInterviewTrackFilter]);

  // Session timer
  useEffect(() => {
    let interval: any = null;
    if (mockSessionActive && !evaluationResult) {
      interval = setInterval(() => {
        setSessionSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mockSessionActive, evaluationResult]);

  const handleStartMockInterview = (preset: MockInterviewPreset) => {
    setSelectedPreset(preset);
    // Find questions matching the preset track or relevant tracks
    let pool = interviewQuestionsList.filter(q => q.trackSlug === preset.trackSlug);
    if (pool.length < 3) {
      pool = interviewQuestionsList.filter(q => q.trackSlug === preset.trackSlug || q.trackSlug === 'fullstack-web');
    }
    // Pick 3-4 diverse questions
    const selected = pool.slice(0, 4);
    if (selected.length === 0) {
      selected.push(interviewQuestionsList[0]);
    }

    setMockQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCurrentAnswerText('');
    setSessionSeconds(0);
    setEvaluationResult(null);
    setMockSessionActive(true);
    showToast(`Starting mock interview for ${preset.targetRole}`, 'info');
  };

  const handleNextMockQuestion = () => {
    if (mockQuestions.length === 0) return;
    const currentQ = mockQuestions[currentQuestionIndex];
    const updatedAnswers = {
      ...userAnswers,
      [currentQ.id]: currentAnswerText.trim()
    };
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      const nextQ = mockQuestions[currentQuestionIndex + 1];
      setCurrentAnswerText(updatedAnswers[nextQ.id] || '');
    } else {
      // Completed last question, submit for evaluation
      handleSubmitMockInterview(updatedAnswers);
    }
  };

  const handleSubmitMockInterview = async (answersToSubmit: Record<string, string>) => {
    setIsEvaluating(true);
    showToast('Evaluating mock interview answers against technical rubrics...', 'info');

    const formattedAnswers = mockQuestions.map(q => ({
      questionId: q.id,
      questionText: q.question,
      category: q.category,
      userAnswer: answersToSubmit[q.id] || 'No answer provided.'
    }));

    try {
      const evaluation = await ApiService.evaluateMockInterview({
        answers: formattedAnswers,
        trackSlug: selectedPreset.trackSlug,
        targetRole: selectedPreset.targetRole
      });

      setEvaluationResult(evaluation);

      // Save record to backend if authenticated
      await ApiService.submitMockInterview({
        trackSlug: selectedPreset.trackSlug,
        targetRole: selectedPreset.targetRole,
        difficulty: selectedPreset.difficulty,
        durationMinutes: selectedPreset.durationMinutes,
        timeSpentSeconds: sessionSeconds,
        overallScore: evaluation.overallScore,
        passed: evaluation.passed,
        rubricScores: evaluation.rubricScores,
        keyStrengths: evaluation.keyStrengths,
        areasForImprovement: evaluation.areasForImprovement,
        answers: formattedAnswers,
        evaluation
      });

      showToast('Mock interview evaluated successfully!', 'success');
    } catch (err: any) {
      showToast('Failed to evaluate mock session: ' + err.message, 'warning');
    } finally {
      setIsEvaluating(false);
    }
  };

  // ==========================================
  // 3. ELEVATOR PITCH & SPEECH RECORDER
  // ==========================================
  const [selectedPitchId, setSelectedPitchId] = useState(elevatorPitchFrameworks[0].id);
  const [isRecording, setIsRecording] = useState(false);
  const [pitchTranscript, setPitchTranscript] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const activePitch = elevatorPitchFrameworks.find(p => p.id === selectedPitchId) || elevatorPitchFrameworks[0];

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript + ' ';
        }
        setPitchTranscript(currentText.trim());
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsRecording(false);
        clearInterval(timerRef.current);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
      showToast('Speech recognition not supported in this browser. You can type your response in the box below.', 'warning');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      showToast('Speech recorded and transcribed!', 'success');
    } else {
      setPitchTranscript('');
      setRecordingSeconds(0);
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        timerRef.current = setInterval(() => {
          setRecordingSeconds(prev => prev + 1);
        }, 1000);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        setIsRecording(false);
      }
    }
  };

  // Mock Interview Speech Recording
  const [isRecordingMock, setIsRecordingMock] = useState(false);
  const handleToggleMockRecording = () => {
    if (!recognitionRef.current) {
      showToast('Speech-to-text not supported in this browser. Please type your response directly.', 'warning');
      return;
    }

    if (isRecordingMock) {
      recognitionRef.current.stop();
      setIsRecordingMock(false);
      showToast('Speech answer captured!', 'success');
    } else {
      try {
        recognitionRef.current.onresult = (event: any) => {
          let text = '';
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript + ' ';
          }
          setCurrentAnswerText(prev => (prev ? prev + ' ' : '') + text.trim());
        };
        recognitionRef.current.start();
        setIsRecordingMock(true);
      } catch {
        setIsRecordingMock(false);
      }
    }
  };

  // ==========================================
  // 4. STAR METHOD BEHAVIORAL WORKSHEET
  // ==========================================
  const [selectedStarId, setSelectedStarId] = useState(starMethodTemplates[0].id);
  const [starSituation, setStarSituation] = useState('');
  const [starTask, setStarTask] = useState('');
  const [starAction, setStarAction] = useState('');
  const [starResult, setStarResult] = useState('');
  const [showStarSample, setShowStarSample] = useState(false);

  const activeStar = starMethodTemplates.find(s => s.id === selectedStarId) || starMethodTemplates[0];

  // ==========================================
  // 5. ATTEMPT HISTORY STATE
  // ==========================================
  const [historyAttempts, setHistoryAttempts] = useState<MockInterviewAttemptRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (activeTab === 'history' && isAuthenticated) {
      setLoadingHistory(true);
      ApiService.getUserMockInterviewHistory()
        .then(data => setHistoryAttempts(data))
        .finally(() => setLoadingHistory(false));
    }
  }, [activeTab, isAuthenticated]);

  const currentTrackTitle = useMemo(() => {
    if (selectedInterviewTrackFilter === 'all') return 'All Technology Careers';
    const found = careerTracksList.find(t => t.slug === selectedInterviewTrackFilter);
    return found ? found.title : selectedInterviewTrackFilter;
  }, [selectedInterviewTrackFilter]);

  const wordCount = pitchTranscript.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = recordingSeconds > 0 ? Math.round((wordCount / recordingSeconds) * 60) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-aurora-bg-elevated via-aurora-bg-surface to-aurora-bg-secondary border border-aurora-border shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FA4616]/10 border border-[#FA4616]/20 text-xs font-bold text-[#FA4616]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Technical Interview & Soft Skills Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
            Technical Interview Preparation & Soft Skills
          </h1>
          <p className="text-xs sm:text-sm text-aurora-text-secondary max-w-2xl leading-relaxed">
            Master rigorous technical questions across all 18 technology career tracks, practice with structured mock interview panels, refine your behavioral STAR responses, and elevate your workplace communication.
          </p>
        </div>

        {/* Global Track Filter */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-aurora-text-muted">
              Focus Career Track
            </label>
            <select
              value={selectedInterviewTrackFilter}
              onChange={e => setSelectedInterviewTrackFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-primary focus:border-[#FA4616] outline-none transition-colors"
            >
              <option value="all">All 18 Tracks</option>
              {careerTracksList.map(t => (
                <option key={t.slug} value={t.slug}>{t.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* PRIMARY NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border overflow-x-auto scrollbar-none">
        <button
          onClick={() => { setActiveTab('questions'); setMockSessionActive(false); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'questions'
              ? 'bg-[#FA4616] text-white shadow-sm'
              : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Technical Question Bank</span>
          <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">
            {filteredQuestions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('mock')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'mock'
              ? 'bg-[#FA4616] text-white shadow-sm'
              : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Mock Interview Simulator</span>
          <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
            Live
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('star'); setMockSessionActive(false); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'star'
              ? 'bg-[#FA4616] text-white shadow-sm'
              : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Behavioral STAR Method</span>
        </button>

        <button
          onClick={() => { setActiveTab('hr'); setMockSessionActive(false); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'hr'
              ? 'bg-[#FA4616] text-white shadow-sm'
              : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>HR & Culture Fit</span>
        </button>

        <button
          onClick={() => { setActiveTab('soft-skills'); setMockSessionActive(false); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'soft-skills'
              ? 'bg-[#FA4616] text-white shadow-sm'
              : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Soft Skills & Etiquette</span>
        </button>

        <button
          onClick={() => { setActiveTab('pitch'); setMockSessionActive(false); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'pitch'
              ? 'bg-[#FA4616] text-white shadow-sm'
              : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Voice Elevator Pitch</span>
        </button>

        <button
          onClick={() => { setActiveTab('history'); setMockSessionActive(false); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'history'
              ? 'bg-[#FA4616] text-white shadow-sm'
              : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Attempt History</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TECHNICAL QUESTION BANK */}
      {/* ========================================================================= */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-secondary border border-aurora-border flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-aurora-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search technical questions, concepts, topics (e.g. Virtual DOM, B+ Tree, GIL, Docker)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-muted focus:border-[#FA4616] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-aurora-text-muted hover:text-aurora-text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              <select
                value={selectedCategoryFilter}
                onChange={e => setSelectedCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-primary outline-none focus:border-[#FA4616]"
              >
                <option value="all">All Question Types</option>
                <option value="technical-core">Core Technical & Concepts</option>
                <option value="system-design">System Design & Architecture</option>
                <option value="scenario-troubleshooting">Scenario & Troubleshooting</option>
                <option value="behavioral-star">Behavioral & Leadership</option>
                <option value="hr-culture-fit">HR & Placement Fit</option>
              </select>

              <select
                value={selectedDifficultyFilter}
                onChange={e => setSelectedDifficultyFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-primary outline-none focus:border-[#FA4616]"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy / Foundational</option>
                <option value="Medium">Medium / Standard</option>
                <option value="Hard">Hard / Advanced</option>
              </select>
            </div>
          </div>

          {/* Quick Track Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedInterviewTrackFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedInterviewTrackFilter === 'all'
                  ? 'bg-[#FA4616] text-white shadow-sm'
                  : 'bg-aurora-bg-secondary hover:bg-aurora-bg-elevated text-aurora-text-secondary border border-aurora-border'
              }`}
            >
              All Tracks ({interviewQuestionsList.length})
            </button>
            {careerTracksList.map(t => {
              const count = interviewQuestionsList.filter(q => q.trackSlug === t.slug).length;
              return (
                <button
                  key={t.slug}
                  onClick={() => setSelectedInterviewTrackFilter(t.slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedInterviewTrackFilter === t.slug
                      ? 'bg-[#FA4616] text-white shadow-sm'
                      : 'bg-aurora-bg-secondary hover:bg-aurora-bg-elevated text-aurora-text-secondary border border-aurora-border'
                  }`}
                >
                  <span>{t.title}</span>
                  {count > 0 && (
                    <span className="text-[10px] opacity-75 font-mono">({count})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Questions List */}
          {loadingQuestions ? (
            <div className="p-12 text-center text-xs text-aurora-text-muted">
              Loading interview question bank...
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-3">
              <Search className="w-8 h-8 text-aurora-text-muted mx-auto" />
              <h3 className="text-sm font-bold text-aurora-text-primary">No questions match your filter</h3>
              <p className="text-xs text-aurora-text-secondary max-w-sm mx-auto">
                Try searching for broader keywords, clearing specific difficulty filters, or selecting All Tracks.
              </p>
              <button
                onClick={() => { setSelectedInterviewTrackFilter('all'); setSelectedCategoryFilter('all'); setSelectedDifficultyFilter('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((q: InterviewQuestion, index: number) => {
                const isExpanded = expandedQuestionId === q.id;
                const isBookmarked = isInterviewQuestionBookmarked(q.id);
                const isMastered = isInterviewQuestionMastered(q.id);

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border transition-all ${
                      isExpanded
                        ? 'bg-aurora-bg-secondary border-[#FA4616]/40 shadow-sm'
                        : 'bg-aurora-bg-secondary hover:bg-aurora-bg-elevated border-aurora-border'
                    }`}
                  >
                    {/* Header */}
                    <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20 uppercase tracking-wider">
                            {q.topic}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              q.difficulty === 'Easy'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                : q.difficulty === 'Medium'
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                          <span className="text-[10px] font-medium text-aurora-text-muted px-2 py-0.5 rounded bg-aurora-bg-surface border border-aurora-border">
                            {q.jobRoles.join(', ')}
                          </span>
                          {q.companies && q.companies.length > 0 && (
                            <span className="text-[10px] text-aurora-text-muted hidden md:inline-block">
                              Asked at: {q.companies.slice(0, 3).join(', ')}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-aurora-text-primary leading-snug">
                          {q.question}
                        </h3>

                        <p className="text-xs text-aurora-text-secondary leading-relaxed">
                          <strong className="text-aurora-text-primary font-semibold">Interviewer Intent: </strong>
                          {q.intent}
                        </p>
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                        <button
                          onClick={() => toggleInterviewQuestionBookmark(q.id)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isBookmarked
                              ? 'bg-[#FA4616] text-white border-[#FA4616]'
                              : 'bg-aurora-bg-surface text-aurora-text-secondary hover:text-aurora-text-primary border-aurora-border'
                          }`}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => toggleInterviewQuestionMastered(q.id)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isMastered
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'bg-aurora-bg-surface text-aurora-text-secondary hover:text-emerald-500 border-aurora-border'
                          }`}
                          title={isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </button>

                        <button
                          onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                          className="px-3.5 py-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-xs font-semibold text-aurora-text-primary flex items-center gap-1.5 transition-colors"
                        >
                          <span>{isExpanded ? 'Hide Answer' : 'Model Answer'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Model Answer & Breakdown */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-aurora-border/70 p-5 sm:p-6 bg-aurora-bg-surface/60 space-y-5"
                        >
                          {/* Comprehensive Model Answer */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FA4616] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Authoritative Model Answer</span>
                            </h4>
                            <div className="p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs sm:text-sm text-aurora-text-primary leading-relaxed whitespace-pre-line font-sans">
                              {q.comprehensiveAnswer}
                            </div>
                          </div>

                          {/* Code Example if present */}
                          {q.codeExample && (
                            <div className="space-y-1.5">
                              <span className="text-[11px] font-bold text-aurora-text-secondary uppercase tracking-wider">
                                Implementation / Architecture Snippet ({q.language || 'Code'})
                              </span>
                              <pre className="p-4 rounded-xl bg-black/40 border border-white/10 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                                <code>{q.codeExample}</code>
                              </pre>
                            </div>
                          )}

                          {/* Key Points to Mention */}
                          {q.keyPointsToMention && q.keyPointsToMention.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold text-aurora-text-primary">
                                Essential Checklist (What interviewers grade you on):
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.keyPointsToMention.map((point, pIdx) => (
                                  <div key={pIdx} className="flex items-start gap-2 p-2 rounded-lg bg-aurora-bg-elevated border border-aurora-border/70 text-xs text-aurora-text-secondary">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Follow-ups & Traps */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {q.followUpQuestions && q.followUpQuestions.length > 0 && (
                              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1.5">
                                <strong className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block">
                                  Anticipated Follow-up Questions:
                                </strong>
                                <ul className="list-disc list-inside text-[11px] text-aurora-text-secondary space-y-1">
                                  {q.followUpQuestions.map((f, fIdx) => (
                                    <li key={fIdx}>{f}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {q.commonMistakes && q.commonMistakes.length > 0 && (
                              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                                <strong className="text-xs font-bold text-amber-700 dark:text-amber-300 block">
                                  Common Traps to Avoid:
                                </strong>
                                <ul className="list-disc list-inside text-[11px] text-aurora-text-secondary space-y-1">
                                  {q.commonMistakes.map((m, mIdx) => (
                                    <li key={mIdx}>{m}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Deepen Track Preparation Cross-Links */}
                            <div className="pt-3 border-t border-aurora-border flex items-center justify-between flex-wrap gap-2 text-xs">
                              <span className="text-aurora-text-muted text-[11px]">
                                Deepen skills in <strong className="text-aurora-text-primary capitalize">{q.trackSlug.replace('-', ' ')}</strong>:
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => navigateToTrackRoadmap(q.trackSlug)}
                                  className="px-2.5 py-1 rounded-lg bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-[#FA4616] text-[11px] font-semibold flex items-center gap-1 transition-colors"
                                >
                                  <Map className="w-3 h-3 text-[#FA4616]" />
                                  <span>Track Roadmap</span>
                                </button>
                                <button
                                  onClick={() => navigateToTrackProjects(q.trackSlug)}
                                  className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                                >
                                  <FolderGit2 className="w-3 h-3 text-purple-500" />
                                  <span>Projects</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MOCK INTERVIEW SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'mock' && (
        <div className="space-y-6">
          {!mockSessionActive ? (
            /* Mock Setup Screen */
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold font-display text-aurora-text-primary">
                    Select a Mock Interview Role Specification
                  </h3>
                  <p className="text-xs text-aurora-text-secondary">
                    Choose from standard enterprise role presets covering core technical questioning, scenario troubleshooting, and behavioral leadership.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {presets.map(p => {
                    const isSelected = selectedPreset.id === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPreset(p)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-aurora-bg-elevated border-[#FA4616] shadow-md ring-2 ring-[#FA4616]/20'
                            : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated/70 border-aurora-border'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20">
                            {p.difficulty}
                          </span>
                          <span className="text-xs font-mono text-aurora-text-muted flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{p.durationMinutes}m</span>
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-aurora-text-primary mt-2.5">
                          {p.title}
                        </h4>
                        <p className="text-[11px] text-aurora-text-secondary mt-1 leading-relaxed line-clamp-2">
                          {p.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-aurora-border/60 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-aurora-text-muted">
                            {p.rounds.length} Interview Rounds
                          </span>
                          <span className={`text-xs font-bold flex items-center gap-1 ${isSelected ? 'text-[#FA4616]' : 'text-aurora-text-muted'}`}>
                            <span>{isSelected ? 'Selected' : 'Select'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Session Start Banner */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-aurora-border">
                  <div className="text-xs text-aurora-text-secondary">
                    Target Role: <strong className="text-aurora-text-primary">{selectedPreset.targetRole}</strong> • Session Duration: ~{selectedPreset.durationMinutes} mins
                  </div>
                  <button
                    onClick={() => handleStartMockInterview(selectedPreset)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Launch Mock Interview Simulation</span>
                  </button>
                </div>
              </div>
            </div>
          ) : !evaluationResult ? (
            /* Active Live Interview Stage */
            <div className="space-y-6">
              {/* Status Header */}
              <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-secondary border border-aurora-border flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-aurora-text-muted">
                      {selectedPreset.targetRole} • Round {currentQuestionIndex + 1} of {mockQuestions.length}
                    </span>
                    <h3 className="text-sm font-bold text-aurora-text-primary">
                      {mockQuestions[currentQuestionIndex]?.topic || 'Technical Assessment'}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="px-3.5 py-1.5 rounded-xl bg-aurora-bg-surface border border-aurora-border flex items-center gap-2 font-mono text-xs text-aurora-text-primary">
                    <Clock className="w-3.5 h-3.5 text-[#FA4616]" />
                    <span>{Math.floor(sessionSeconds / 60)}:{String(sessionSeconds % 60).padStart(2, '0')}</span>
                  </div>

                  <button
                    onClick={() => setMockSessionActive(false)}
                    className="px-3 py-1.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-secondary hover:text-aurora-text-primary"
                  >
                    Exit Session
                  </button>
                </div>
              </div>

              {/* Current Question Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FA4616]/10 text-[#FA4616] uppercase">
                      Interviewer Prompt
                    </span>
                    <span className="text-xs text-aurora-text-muted">
                      Difficulty: {mockQuestions[currentQuestionIndex]?.difficulty}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold font-display text-aurora-text-primary leading-snug">
                    "{mockQuestions[currentQuestionIndex]?.question}"
                  </h2>
                  <p className="text-xs text-aurora-text-secondary">
                    <strong>Intent:</strong> {mockQuestions[currentQuestionIndex]?.intent}
                  </p>
                </div>

                {/* Dual-Input Answering Area */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-aurora-text-primary">
                      Your Response (Type or Use Speech-to-Text):
                    </label>

                    <button
                      type="button"
                      onClick={handleToggleMockRecording}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isRecordingMock
                          ? 'bg-rose-500 text-white animate-pulse shadow-md'
                          : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary'
                      }`}
                    >
                      {isRecordingMock ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#FA4616]" />}
                      <span>{isRecordingMock ? 'Stop Speaking' : 'Record Voice Answer'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    value={currentAnswerText}
                    onChange={e => setCurrentAnswerText(e.target.value)}
                    placeholder="Articulate your structured response here. Begin with core definitions, explain architectural mechanics, and highlight production tradeoffs..."
                    className="w-full p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-muted outline-none focus:border-[#FA4616] leading-relaxed transition-colors font-sans"
                  />

                  <div className="flex items-center justify-between text-[11px] text-aurora-text-muted">
                    <span>
                      Words: {currentAnswerText.split(/\s+/).filter(Boolean).length} (~{Math.round(currentAnswerText.split(/\s+/).filter(Boolean).length / 2.2)}s spoken)
                    </span>
                    <span>Aim for structured brevity (1-2 minutes)</span>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="pt-4 flex items-center justify-between border-t border-aurora-border">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => {
                      if (currentQuestionIndex > 0) {
                        setCurrentQuestionIndex(prev => prev - 1);
                        const prevQ = mockQuestions[currentQuestionIndex - 1];
                        setCurrentAnswerText(userAnswers[prevQ.id] || '');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-secondary disabled:opacity-40"
                  >
                    Previous Question
                  </button>

                  <button
                    onClick={handleNextMockQuestion}
                    disabled={isEvaluating}
                    className="px-6 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <span>
                      {currentQuestionIndex === mockQuestions.length - 1
                        ? (isEvaluating ? 'Evaluating...' : 'Submit & Complete Session')
                        : 'Next Question'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results Scorecard & Feedback */
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-6">
                {/* Header score */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-aurora-border">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FA4616]">
                      Mock Interview Complete
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-aurora-text-primary">
                      Performance Evaluation Scorecard
                    </h2>
                    <p className="text-xs text-aurora-text-secondary">
                      {selectedPreset.targetRole} • Duration: {Math.floor(sessionSeconds / 60)}m {sessionSeconds % 60}s
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-aurora-bg-surface border-2 border-[#FA4616] flex flex-col items-center justify-center shadow-md">
                      <span className="text-2xl font-extrabold text-[#FA4616] font-display">
                        {evaluationResult.overallScore}%
                      </span>
                      <span className="text-[9px] uppercase font-bold text-aurora-text-secondary">
                        Overall
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                        evaluationResult.passed
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      }`}>
                        {evaluationResult.passed ? '✓ Strong Candidate Evaluation' : 'Developing Candidate'}
                      </span>
                      <div className="text-[11px] text-aurora-text-muted">
                        Passing benchmark: 70%
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4-Dimension Rubric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                    <span className="text-[10px] font-bold uppercase text-aurora-text-muted">Correctness</span>
                    <div className="text-lg font-bold text-aurora-text-primary">{evaluationResult.rubricScores.correctness}%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                    <span className="text-[10px] font-bold uppercase text-aurora-text-muted">Clarity</span>
                    <div className="text-lg font-bold text-aurora-text-primary">{evaluationResult.rubricScores.clarity}%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                    <span className="text-[10px] font-bold uppercase text-aurora-text-muted">Problem-Solving</span>
                    <div className="text-lg font-bold text-aurora-text-primary">{evaluationResult.rubricScores.problemSolving}%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                    <span className="text-[10px] font-bold uppercase text-aurora-text-muted">Communication</span>
                    <div className="text-lg font-bold text-aurora-text-primary">{evaluationResult.rubricScores.communication}%</div>
                  </div>
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Key Technical Strengths</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-aurora-text-secondary list-disc list-inside">
                      {evaluationResult.keyStrengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-amber-500" />
                      <span>Actionable Areas for Improvement</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-aurora-text-secondary list-disc list-inside">
                      {evaluationResult.areasForImprovement.map((imp, idx) => (
                        <li key={idx}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Detailed Question Review */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-bold text-aurora-text-primary">
                    Question-by-Question Model Answer Comparison
                  </h3>

                  <div className="space-y-4">
                    {evaluationResult.questionEvaluations.map((qe, qIdx) => (
                      <div key={qe.questionId} className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-aurora-text-primary">
                            Q{qIdx + 1}: {qe.questionText}
                          </span>
                          <span className="text-xs font-bold text-[#FA4616] px-2 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border">
                            {qe.score}%
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border/70 space-y-1">
                            <span className="text-[10px] font-bold text-aurora-text-muted uppercase">Your Answer</span>
                            <p className="text-aurora-text-secondary leading-relaxed line-clamp-4">
                              {qe.userAnswer || 'No response recorded.'}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase">Authoritative Golden Answer</span>
                            <p className="text-aurora-text-secondary leading-relaxed line-clamp-4">
                              {qe.modelAnswer}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transparency Disclaimer */}
                <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex items-start gap-3 text-xs text-aurora-text-muted">
                  <Info className="w-4 h-4 text-aurora-text-secondary shrink-0 mt-0.5" />
                  <p>{evaluationResult.disclaimer}</p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setMockSessionActive(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#FA4616] text-white text-xs font-bold shadow-sm"
                  >
                    Done & Return to Presets
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: BEHAVIORAL STAR METHOD */}
      {/* ========================================================================= */}
      {activeTab === 'star' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FA4616]">
                Structured Behavioral Storytelling
              </span>
              <h2 className="text-xl font-bold font-display text-aurora-text-primary">
                The STAR Framework (Situation, Task, Action, Result)
              </h2>
              <p className="text-xs text-aurora-text-secondary max-w-2xl leading-relaxed">
                Elite technology companies evaluate behavioral questions using the STAR framework. Select a classic engineering prompt or draft your own story.
              </p>
            </div>

            {/* Prompt Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {starMethodTemplates.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedStarId(s.id);
                    setShowStarSample(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedStarId === s.id
                      ? 'bg-[#FA4616] text-white shadow-sm'
                      : 'bg-aurora-bg-surface hover:bg-aurora-bg-elevated text-aurora-text-secondary border border-aurora-border'
                  }`}
                >
                  {s.category}
                </button>
              ))}
            </div>

            {/* Active Prompt Box */}
            <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-1">
              <span className="text-[10px] font-bold text-aurora-text-muted uppercase">Interview Prompt</span>
              <h3 className="text-sm font-bold text-aurora-text-primary">
                "{activeStar.prompt}"
              </h3>
            </div>

            {/* 4 STAR Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FA4616]">1. Situation (Context)</span>
                  <span className="text-[10px] text-aurora-text-muted">~20-30 seconds</span>
                </div>
                <textarea
                  rows={3}
                  value={starSituation}
                  onChange={e => setStarSituation(e.target.value)}
                  placeholder={activeStar.guide.situation}
                  className="w-full p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FA4616]">2. Task (Responsibility)</span>
                  <span className="text-[10px] text-aurora-text-muted">~15-20 seconds</span>
                </div>
                <textarea
                  rows={3}
                  value={starTask}
                  onChange={e => setStarTask(e.target.value)}
                  placeholder={activeStar.guide.task}
                  className="w-full p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FA4616]">3. Action (Your Concrete Steps)</span>
                  <span className="text-[10px] text-aurora-text-muted">~45-60 seconds (Heavyweight)</span>
                </div>
                <textarea
                  rows={3}
                  value={starAction}
                  onChange={e => setStarAction(e.target.value)}
                  placeholder={activeStar.guide.action}
                  className="w-full p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FA4616]">4. Result (Quantified Outcome)</span>
                  <span className="text-[10px] text-aurora-text-muted">~20-30 seconds</span>
                </div>
                <textarea
                  rows={3}
                  value={starResult}
                  onChange={e => setStarResult(e.target.value)}
                  placeholder={activeStar.guide.result}
                  className="w-full p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                />
              </div>
            </div>

            {/* Bottom Actions & Sample Toggle */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setShowStarSample(!showStarSample)}
                className="text-xs font-bold text-[#FA4616] hover:underline"
              >
                {showStarSample ? 'Hide Proven Model Response' : 'View Proven Model Response (FAANG Benchmark)'}
              </button>

              <button
                onClick={() => showToast('STAR draft saved! Practice speaking it aloud under 2 minutes.', 'success')}
                className="px-5 py-2.5 rounded-xl bg-[#FA4616] text-white text-xs font-bold shadow-sm"
              >
                Validate My Story
              </button>
            </div>

            {/* Proven Model Response */}
            {showStarSample && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3 text-xs"
              >
                <h4 className="font-bold text-indigo-700 dark:text-indigo-300">
                  Model Answer Breakdown: {activeStar.category}
                </h4>
                <div className="space-y-2 text-aurora-text-secondary leading-relaxed">
                  <p><strong>Situation:</strong> {activeStar.sampleModelAnswer.situation}</p>
                  <p><strong>Task:</strong> {activeStar.sampleModelAnswer.task}</p>
                  <p><strong>Action:</strong> {activeStar.sampleModelAnswer.action}</p>
                  <p><strong>Result:</strong> {activeStar.sampleModelAnswer.result}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: HR & CULTURE FIT */}
      {/* ========================================================================= */}
      {activeTab === 'hr' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left 2 Cols: Top HR Questions */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-aurora-text-primary">
                Essential HR & Cultural Interview Bank
              </h3>

              <div className="space-y-4">
                {topHrQuestionsBank.map(hr => (
                  <div key={hr.id} className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FA4616]">HR Round</span>
                      <h4 className="text-sm font-bold text-aurora-text-primary">{hr.question}</h4>
                      <p className="text-xs text-aurora-text-secondary">
                        <strong>Intent: </strong>{hr.intent}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary leading-relaxed">
                      <strong className="text-[#FA4616] block mb-1">Model Script:</strong>
                      "{hr.modelAnswer}"
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1">
                      <div className="space-y-1">
                        <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">✓ Best Practices:</strong>
                        <ul className="list-disc list-inside text-aurora-text-secondary space-y-0.5">
                          {hr.dosAndDonts.dos.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <strong className="text-rose-600 dark:text-rose-400 block font-bold">✗ Common Pitfalls:</strong>
                        <ul className="list-disc list-inside text-aurora-text-secondary space-y-0.5">
                          {hr.dosAndDonts.donts.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 1 Col: HR Strategy Playbook */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-aurora-text-primary">
                Placement Negotiation Playbook
              </h3>

              <div className="space-y-4">
                {hrInterviewGuide.sections.map(sec => (
                  <div key={sec.id} className="p-4 rounded-2xl bg-aurora-bg-secondary border border-aurora-border space-y-2 text-xs">
                    <h4 className="font-bold text-aurora-text-primary">{sec.title}</h4>
                    <p className="text-aurora-text-secondary text-[11px]">{sec.keyConcept}</p>
                    <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border/70 text-aurora-text-secondary text-[11px] leading-relaxed italic">
                      {sec.modelScript}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SOFT SKILLS & WORKPLACE ETIQUETTE */}
      {/* ========================================================================= */}
      {activeTab === 'soft-skills' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {softSkillGuides.map(guide => (
              <div key={guide.id} className="p-6 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FA4616]/10 text-[#FA4616] uppercase">
                      {guide.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-aurora-text-primary">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-aurora-text-secondary leading-relaxed">
                    {guide.summary}
                  </p>

                  <div className="space-y-2 pt-1">
                    {guide.frameworkSteps.map((step, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs space-y-1">
                        <strong className="text-aurora-text-primary block font-semibold">{step.step}</strong>
                        <p className="text-aurora-text-secondary text-[11px]">{step.description}</p>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono pt-1">
                          Ex: {step.practicalExample}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-aurora-border text-[11px]">
                  <div>
                    <strong className="text-emerald-500 block mb-1">Key Do's:</strong>
                    <ul className="list-disc list-inside text-aurora-text-secondary space-y-0.5">
                      {guide.dosAndDonts.dos.slice(0, 2).map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-rose-500 block mb-1">Key Don'ts:</strong>
                    <ul className="list-disc list-inside text-aurora-text-secondary space-y-0.5">
                      {guide.dosAndDonts.donts.slice(0, 2).map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: VOICE ELEVATOR PITCH */}
      {/* ========================================================================= */}
      {activeTab === 'pitch' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-aurora-text-primary">
                    Record Your Voice Elevator Pitch
                  </h3>
                  <p className="text-xs text-aurora-text-secondary">
                    Practice your 60-90 second introduction with live speech recognition and speech pacing analytics.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {elevatorPitchFrameworks.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedPitchId(f.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                        selectedPitchId === f.id
                          ? 'bg-[#FA4616] text-white border-[#FA4616]'
                          : 'bg-aurora-bg-surface text-aurora-text-secondary border-aurora-border'
                      }`}
                    >
                      {f.targetDuration}s Pitch
                    </button>
                  ))}
                </div>
              </div>

              {/* Record Button & Timer */}
              <div className="p-6 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex flex-col items-center justify-center gap-4 text-center">
                <button
                  type="button"
                  onClick={handleToggleRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse scale-110 shadow-lg ring-4 ring-rose-500/30'
                      : 'bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md hover:scale-105'
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>

                <div className="space-y-1">
                  <div className="text-xl font-bold font-mono text-aurora-text-primary">
                    {Math.floor(recordingSeconds / 60)}:{String(recordingSeconds % 60).padStart(2, '0')} / 0:{activePitch.targetDuration}
                  </div>
                  <div className="text-xs text-aurora-text-muted">
                    {isRecording ? 'Listening... Speak naturally' : 'Click microphone to record your pitch'}
                  </div>
                </div>
              </div>

              {/* Live Transcript Area */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-aurora-text-primary">
                  Live Spoken Transcript:
                </label>
                <textarea
                  rows={4}
                  value={pitchTranscript}
                  onChange={e => setPitchTranscript(e.target.value)}
                  placeholder="Your transcribed pitch will appear here in real time as you speak..."
                  className="w-full p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-muted outline-none focus:border-[#FA4616] leading-relaxed font-sans"
                />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                  <span className="text-[10px] text-aurora-text-muted uppercase">Word Count</span>
                  <div className="text-base font-bold text-aurora-text-primary">{wordCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                  <span className="text-[10px] text-aurora-text-muted uppercase">Speaking Speed</span>
                  <div className="text-base font-bold text-aurora-text-primary">{wordsPerMinute} WPM</div>
                  <span className="text-[10px] text-emerald-500">Target: 120-150 WPM</span>
                </div>
                <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                  <span className="text-[10px] text-aurora-text-muted uppercase">Duration</span>
                  <div className="text-base font-bold text-aurora-text-primary">{recordingSeconds}s</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Framework Guide */}
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4 text-xs">
              <h4 className="font-bold text-sm text-aurora-text-primary">
                Executive Structure ({activePitch.targetDuration}s)
              </h4>

              <div className="space-y-3">
                {activePitch.structure.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                    <strong className="text-xs font-bold text-[#FA4616] block">{item.section}</strong>
                    <p className="text-[11px] text-aurora-text-secondary italic leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: ATTEMPT HISTORY */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-aurora-bg-secondary border border-aurora-border space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-display text-aurora-text-primary">
                Mock Interview & Question Mastery History
              </h3>
              <p className="text-xs text-aurora-text-secondary">
                Review completed mock interview evaluation scorecards and tracked technical questions.
              </p>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                <span className="text-[10px] font-bold uppercase text-aurora-text-muted">Mastered Questions</span>
                <div className="text-xl font-bold text-emerald-500 font-display">
                  {masteredInterviewQuestionIds.length}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                <span className="text-[10px] font-bold uppercase text-aurora-text-muted">Bookmarked Questions</span>
                <div className="text-xl font-bold text-[#FA4616] font-display">
                  {bookmarkedInterviewQuestionIds.length}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                <span className="text-[10px] font-bold uppercase text-aurora-text-muted">Mock Sessions</span>
                <div className="text-xl font-bold text-aurora-text-primary font-display">
                  {historyAttempts.length}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-1">
                <span className="text-[10px] font-bold uppercase text-aurora-text-muted">Avg Rubric Score</span>
                <div className="text-xl font-bold text-indigo-500 font-display">
                  {historyAttempts.length > 0
                    ? Math.round(historyAttempts.reduce((acc, h) => acc + (h.overallScore || 0), 0) / historyAttempts.length) + '%'
                    : 'N/A'}
                </div>
              </div>
            </div>

            {/* List */}
            {!isAuthenticated ? (
              <div className="p-8 text-center rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-3">
                <p className="text-xs text-aurora-text-secondary">
                  Sign in to securely synchronize your mock interview attempts and review history across devices.
                </p>
                <button
                  onClick={() => { setAuthModalTab('login'); setIsAuthModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-semibold shadow-sm"
                >
                  Sign In to View History
                </button>
              </div>
            ) : loadingHistory ? (
              <div className="p-8 text-center text-xs text-aurora-text-muted">
                Loading history records...
              </div>
            ) : historyAttempts.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2 text-xs text-aurora-text-muted">
                No mock interview sessions recorded yet. Launch a session to test your readiness!
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                {historyAttempts.map(h => (
                  <div key={h._id || h.id} className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-aurora-text-primary">{h.targetRole}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-aurora-bg-elevated text-aurora-text-muted border border-aurora-border">
                          {h.difficulty}
                        </span>
                      </div>
                      <div className="text-[11px] text-aurora-text-muted mt-0.5">
                        {new Date(h.createdAt).toLocaleDateString()} • {Math.floor((h.timeSpentSeconds || 0) / 60)} mins
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                        h.overallScore >= 70
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      }`}>
                        {h.overallScore}% Score
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
