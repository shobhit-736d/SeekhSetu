import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Bookmark,
  RevisionTask,
  StudySessionRecord,
  QuizAttemptRecord,
  IncorrectQuestionItem,
  FlashcardMastery
} from '../types/roadmap';
import {
  CodingSubmission,
  AptitudeAttemptRecord,
  ResumeProfile,
  AiChatMessage,
  AiPageContext
} from '../types/placement';
import { allDays, getDayByNumber } from '../data/roadmapData';
import { allFlashcards } from '../data/flashcardsData';
import {
  loadUserStorage,
  saveUserStorage,
  getEmptyUserState,
  clearUserStorage,
  StorageSchema
} from '../services/storageService';
import { UserJobApplication } from '../types/career';
import { useAuth } from './AuthContext';
import { ApiService } from '../services/apiService';

export type ActiveTab =
  | 'dashboard'
  | 'careers'
  | 'roadmap'
  | 'resources'
  | 'projects'
  | 'certifications'
  | 'jobs'
  | 'workspace'
  | 'coding'
  | 'aptitude'
  | 'communication'
  | 'resume'
  | 'practice'
  | 'timer'
  | 'revision'
  | 'analytics'
  | 'profile'
  | 'about'
  | 'contact'
  | 'faq'
  | 'help'
  | 'feedback'
  | 'privacy-policy'
  | 'terms'
  | 'cookie-policy'
  | 'ai-disclaimer'
  | 'getting-started';

export const tabToPath = (tab: ActiveTab): string => {
  if (tab === 'dashboard') return '/';
  if (tab === 'profile') return '/profile';
  if (tab === 'careers') return '/careers';
  if (tab === 'roadmap') return '/roadmaps';
  if (tab === 'resources') return '/resources';
  if (tab === 'projects') return '/projects';
  if (tab === 'certifications') return '/certifications';
  if (tab === 'jobs') return '/jobs';
  if (tab === 'practice') return '/assessments';
  if (tab === 'communication') return '/interviews';
  return `/${tab}`;
};

export const pathToTab = (pathname: string): ActiveTab => {
  const segments = pathname.replace(/^\/+|\/+$/g, '').toLowerCase().split('/');
  const cleanPath = segments[0] || '';
  switch (cleanPath) {
    case '':
    case 'dashboard':
      return 'dashboard';
    case 'careers':
    case 'career':
    case 'career-explorer':
      return 'careers';
    case 'profile':
    case 'my-profile':
      return 'profile';
    case 'roadmap':
    case 'roadmaps':
      return 'roadmap';
    case 'resources':
    case 'resource':
    case 'learning-resources':
      return 'resources';
    case 'projects':
    case 'project':
    case 'guided-projects':
      return 'projects';
    case 'certifications':
    case 'certification':
    case 'industry-certifications':
      return 'certifications';
    case 'jobs':
    case 'job':
    case 'job-board':
    case 'opportunities':
    case 'campus-drives':
      return 'jobs';
    case 'workspace':
      return 'workspace';
    case 'coding':
      return 'coding';
    case 'aptitude':
      return 'aptitude';
    case 'communication':
    case 'interviews':
    case 'interview':
    case 'mock-interview':
      return 'communication';
    case 'resume':
      return 'resume';
    case 'practice':
    case 'assessments':
    case 'assessment':
    case 'quizzes':
    case 'quiz':
      return 'practice';
    case 'timer':
      return 'timer';
    case 'revision':
      return 'revision';
    case 'analytics':
      return 'analytics';
    case 'about':
      return 'about';
    case 'contact':
      return 'contact';
    case 'faq':
      return 'faq';
    case 'help':
      return 'help';
    case 'feedback':
      return 'feedback';
    case 'privacy-policy':
      return 'privacy-policy';
    case 'terms':
      return 'terms';
    case 'cookie-policy':
      return 'cookie-policy';
    case 'ai-disclaimer':
      return 'ai-disclaimer';
    case 'getting-started':
      return 'getting-started';
    default:
      return 'dashboard';
  }
};

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  mode: 'study' | 'break';
  targetMinutes: number;
  elapsedSeconds: number;
  dayNumber: number;
  topicTitle: string;
  startTimestamp: number | null;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface StudyContextType {
  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedDayNumber: number;
  setSelectedDayNumber: (day: number) => void;
  selectedTopicId: string | undefined;
  setSelectedTopicId: (topicId: string | undefined) => void;
  navigateToDay: (dayNumber: number, topicId?: string) => void;

  // Career Tracks & Multi-Track Roadmap Engine
  selectedTrackSlug: string;
  setSelectedTrackSlug: (slug: string) => void;
  enrolledTracks: string[];
  activeTrack: string;
  enrollInTrack: (slug: string) => Promise<void>;
  switchActiveTrack: (slug: string) => Promise<void>;
  completedTrackMilestones: Record<string, string[]>;
  toggleTrackMilestone: (trackSlug: string, milestoneId: string) => void;
  isMilestoneCompleted: (trackSlug: string, milestoneId: string) => boolean;
  navigateToTrackRoadmap: (trackSlug: string) => void;

  // Resources & Guided Projects Hub
  selectedResourceTrackFilter: string;
  setSelectedResourceTrackFilter: (slug: string) => void;
  selectedProjectTrackFilter: string;
  setSelectedProjectTrackFilter: (slug: string) => void;
  navigateToTrackResources: (trackSlug: string) => void;
  navigateToTrackProjects: (trackSlug: string) => void;
  opportunityBookmarks: any[];
  toggleOpportunityBookmark: (payload: { itemId: string; itemType: 'job' | 'project' | 'resource' | 'certification'; title?: string; trackSlug?: string }) => void;
  isOpportunityBookmarked: (itemId: string) => boolean;

  // Assessments & Practice Engine (Phase 4)
  selectedAssessmentTrackFilter: string;
  setSelectedAssessmentTrackFilter: (slug: string) => void;
  navigateToTrackAssessments: (trackSlug: string) => void;

  // Technical Interviews & Soft Skills (Phase 5)
  selectedInterviewTrackFilter: string;
  setSelectedInterviewTrackFilter: (slug: string) => void;
  navigateToTrackInterviews: (trackSlug: string) => void;
  bookmarkedInterviewQuestionIds: string[];
  toggleInterviewQuestionBookmark: (id: string) => void;
  isInterviewQuestionBookmarked: (id: string) => boolean;
  masteredInterviewQuestionIds: string[];
  toggleInterviewQuestionMastered: (id: string) => void;
  isInterviewQuestionMastered: (id: string) => boolean;

  // Certifications Guide & Verified Opportunities (Phase 6)
  selectedCertTrackFilter: string;
  setSelectedCertTrackFilter: (slug: string) => void;
  navigateToTrackCertifications: (trackSlug: string) => void;
  selectedJobTrackFilter: string;
  setSelectedJobTrackFilter: (slug: string) => void;
  navigateToTrackJobs: (trackSlug: string) => void;
  jobApplications: UserJobApplication[];
  trackJobApplication: (payload: any) => Promise<void>;
  deleteJobApplication: (appId: string) => Promise<void>;

  // Flashcard & Active Recall Mastery
  flashcardMastery: Record<string, FlashcardMastery>;
  updateFlashcardMastery: (cardId: string, status: FlashcardMastery) => void;
  resetFlashcardDeck: (dayNumber?: number) => void;
  activeWorkspaceViewMode: 'lesson' | 'flashcards' | 'quiz' | 'ai-coach' | 'notes';
  setActiveWorkspaceViewMode: (mode: 'lesson' | 'flashcards' | 'quiz' | 'ai-coach' | 'notes') => void;
  masteredCardsCount: number;
  familiarCardsCount: number;
  learningCardsCount: number;
  unfamiliarCardsCount: number;
  totalFlashcardsCount: number;

  // Storage State
  completedTopics: Record<string, boolean>;
  completedDays: Record<number, boolean>;
  starredDays: number[];
  bookmarkedConcepts: Bookmark[];
  notes: Record<string, string>;
  revisionTasks: RevisionTask[];
  studySessions: StudySessionRecord[];
  quizAttempts: QuizAttemptRecord[];
  incorrectQuestions: IncorrectQuestionItem[];
  theme: 'dark' | 'light';
  dailyGoalMinutes: number;

  // Placement Additions
  solvedCodingQuestions: string[];
  bookmarkedCodingQuestions: string[];
  codingSubmissions: CodingSubmission[];
  recordCodingSubmission: (sub: Omit<CodingSubmission, 'id' | 'timestamp'>) => void;
  toggleBookmarkCodingQuestion: (questionId: string) => void;
  isCodingQuestionBookmarked: (questionId: string) => boolean;
  isCodingQuestionSolved: (questionId: string) => boolean;
  selectedCodingQuestionId: string | null;
  setSelectedCodingQuestionId: (id: string | null) => void;
  navigateToCodingProblem: (questionId: string) => void;

  aptitudeAttempts: AptitudeAttemptRecord[];
  recordAptitudeAttempt: (attempt: Omit<AptitudeAttemptRecord, 'id' | 'timestamp'>) => void;

  savedResumes: ResumeProfile[];
  activeResume: ResumeProfile | null;
  latestAtsScore: number;
  saveResumeProfile: (profile: ResumeProfile) => void;
  setLatestAtsScore: (score: number) => void;

  aiChatMessages: AiChatMessage[];
  addAiChatMessage: (msg: Omit<AiChatMessage, 'id' | 'timestamp'>) => void;
  clearAiChatMessages: () => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  aiCurrentContext: AiPageContext;
  setAiCurrentContext: React.Dispatch<React.SetStateAction<AiPageContext>>;

  // Actions
  toggleTopicCompletion: (topicId: string, dayNumber: number) => void;
  toggleDayCompletion: (dayNumber: number) => void;
  toggleStarDay: (dayNumber: number) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (bookmarkId: string) => void;
  isBookmarked: (topicId: string) => boolean;
  saveNote: (key: string, content: string) => void;
  getNote: (key: string) => string;
  addRevisionTask: (task: Omit<RevisionTask, 'id'>) => void;
  toggleRevisionTask: (taskId: string) => void;
  deleteRevisionTask: (taskId: string) => void;
  recordQuizAttempt: (
    attempt: Omit<QuizAttemptRecord, 'id' | 'timestamp'>,
    incorrectItems?: IncorrectQuestionItem[]
  ) => void;
  removeIncorrectQuestion: (questionId: string) => void;
  toggleTheme: () => void;
  setDailyGoalMinutes: (mins: number) => void;
  resetAllData: () => void;

  // Focus Timer
  timerState: TimerState;
  startTimer: (dayNumber?: number, topicTitle?: string, minutes?: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  completeTimerSession: () => void;
  setTimerTargetMinutes: (minutes: number) => void;
  setTimerMode: (mode: 'study' | 'break') => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;

  // Computed Real Analytics
  todayStudyMinutes: number;
  weekStudyMinutes: number;
  totalFocusedSessions: number;
  overallSyllabusProgress: number;
  completedTopicsCount: number;
  inProgressTopicsCount: number;
  totalTopicsCount: number;
  studyStreakDays: number;
  weakTopics: Array<{ topic: string; accuracy: number; totalAttempts: number }>;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, setIsProfileModalOpen } = useAuth();

  // Load initial store based on whether user is logged in
  const [store, setStore] = useState<StorageSchema>(() => {
    return user ? loadUserStorage(user.id) : getEmptyUserState();
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined') {
      return pathToTab(window.location.pathname);
    }
    return 'dashboard';
  });

  const setActiveTab = useCallback((tab: ActiveTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const targetPath = tabToPath(tab);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  }, []);

  // Sync with browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const tab = pathToTab(window.location.pathname);
      setActiveTabState(tab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(() => store.lastActiveDay || 1);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(() => store.lastActiveTopicId || 'day1-topic1');
  const [activeWorkspaceViewMode, setActiveWorkspaceViewMode] = useState<'lesson' | 'flashcards' | 'quiz' | 'ai-coach' | 'notes'>('lesson');

  // Career Tracks State
  const [selectedTrackSlug, setSelectedTrackSlugState] = useState<string>(() => store.activeTrack || 'fullstack-web');

  const setSelectedTrackSlug = useCallback((slug: string) => {
    setSelectedTrackSlugState(slug);
  }, []);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const enrollInTrack = useCallback(async (trackSlug: string) => {
    setStore(prev => {
      const enrolled = prev.enrolledTracks || ['fullstack-web'];
      const updated = enrolled.includes(trackSlug) ? enrolled : [...enrolled, trackSlug];
      const nextState = {
        ...prev,
        enrolledTracks: updated,
        activeTrack: trackSlug
      };
      if (user?.id) saveUserStorage(user.id, nextState);
      return nextState;
    });
    setSelectedTrackSlugState(trackSlug);

    if (user?.id) {
      try {
        await ApiService.enrollCareerTrack(trackSlug);
      } catch (err: any) {
        console.warn('Backend enrollment sync warning:', err);
      }
    }
    showToast(`Enrolled in track!`, 'success');
  }, [user?.id, showToast]);

  const switchActiveTrack = useCallback(async (trackSlug: string) => {
    setStore(prev => {
      const nextState = { ...prev, activeTrack: trackSlug };
      if (user?.id) saveUserStorage(user.id, nextState);
      return nextState;
    });
    setSelectedTrackSlugState(trackSlug);

    if (user?.id) {
      try {
        await ApiService.switchActiveTrack(trackSlug);
      } catch (err: any) {
        console.warn('Backend track switch notice:', err);
      }
    }
    showToast(`Active track updated`, 'info');
  }, [user?.id, showToast]);

  const toggleTrackMilestone = useCallback((trackSlug: string, milestoneId: string) => {
    setStore(prev => {
      const currentMilestones = prev.completedTrackMilestones?.[trackSlug] || [];
      const isDone = currentMilestones.includes(milestoneId);
      const updated = isDone
        ? currentMilestones.filter(m => m !== milestoneId)
        : [...currentMilestones, milestoneId];

      const nextState = {
        ...prev,
        completedTrackMilestones: {
          ...prev.completedTrackMilestones,
          [trackSlug]: updated
        }
      };
      if (user?.id) saveUserStorage(user.id, nextState);
      return nextState;
    });
  }, [user?.id]);

  const isMilestoneCompleted = useCallback((trackSlug: string, milestoneId: string): boolean => {
    return (store.completedTrackMilestones?.[trackSlug] || []).includes(milestoneId);
  }, [store.completedTrackMilestones]);

  const navigateToTrackRoadmap = useCallback((trackSlug: string) => {
    setSelectedTrackSlugState(trackSlug);
    setActiveTab('roadmap');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setActiveTab]);

  // Phase 3 Resources & Projects Hub State
  const [selectedResourceTrackFilter, setSelectedResourceTrackFilter] = useState<string>('all');
  const [selectedProjectTrackFilter, setSelectedProjectTrackFilter] = useState<string>('all');

  const navigateToTrackResources = useCallback((trackSlug: string) => {
    setSelectedResourceTrackFilter(trackSlug);
    setActiveTab('resources');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setActiveTab]);

  const navigateToTrackProjects = useCallback((trackSlug: string) => {
    setSelectedProjectTrackFilter(trackSlug);
    setActiveTab('projects');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setActiveTab]);

  // Phase 4 Assessments Hub State
  const [selectedAssessmentTrackFilter, setSelectedAssessmentTrackFilter] = useState<string>('all');

  const navigateToTrackAssessments = useCallback((trackSlug: string) => {
    setSelectedAssessmentTrackFilter(trackSlug);
    setActiveTab('practice');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setActiveTab]);

  // Phase 5 Technical Interviews & Soft Skills State
  const [selectedInterviewTrackFilter, setSelectedInterviewTrackFilter] = useState<string>('all');

  const navigateToTrackInterviews = useCallback((trackSlug: string) => {
    setSelectedInterviewTrackFilter(trackSlug);
    setActiveTab('communication');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setActiveTab]);

  const isInterviewQuestionBookmarked = useCallback((id: string): boolean => {
    return (store.bookmarkedInterviewQuestionIds || []).includes(id);
  }, [store.bookmarkedInterviewQuestionIds]);

  const toggleInterviewQuestionBookmark = useCallback((id: string) => {
    setStore(prev => {
      const current = prev.bookmarkedInterviewQuestionIds || [];
      const updated = current.includes(id)
        ? current.filter((x: string) => x !== id)
        : [...current, id];

      const nextState = { ...prev, bookmarkedInterviewQuestionIds: updated };
      if (user?.id) saveUserStorage(user.id, nextState);
      return nextState;
    });
  }, [user?.id]);

  const isInterviewQuestionMastered = useCallback((id: string): boolean => {
    return (store.masteredInterviewQuestionIds || []).includes(id);
  }, [store.masteredInterviewQuestionIds]);

  const toggleInterviewQuestionMastered = useCallback((id: string) => {
    setStore(prev => {
      const current = prev.masteredInterviewQuestionIds || [];
      const updated = current.includes(id)
        ? current.filter((x: string) => x !== id)
        : [...current, id];

      const nextState = { ...prev, masteredInterviewQuestionIds: updated };
      if (user?.id) saveUserStorage(user.id, nextState);
      return nextState;
    });
  }, [user?.id]);

  const isOpportunityBookmarked = useCallback((itemId: string): boolean => {
    return (store.opportunityBookmarks || []).some((b: any) => b.itemId === itemId);
  }, [store.opportunityBookmarks]);

  const toggleOpportunityBookmark = useCallback(async (payload: { itemId: string; itemType: 'job' | 'project' | 'resource' | 'certification'; title?: string; trackSlug?: string }) => {
    const isCurrentlyBookmarked = (store.opportunityBookmarks || []).some((b: any) => b.itemId === payload.itemId);

    setStore(prev => {
      const current = prev.opportunityBookmarks || [];
      const updated = isCurrentlyBookmarked
        ? current.filter((b: any) => b.itemId !== payload.itemId)
        : [...current, { ...payload, createdAt: new Date().toISOString() }];

      const nextState = { ...prev, opportunityBookmarks: updated };
      if (user?.id) saveUserStorage(user.id, nextState);
      return nextState;
    });

    if (user?.id) {
      try {
        await ApiService.toggleOpportunityBookmark(payload);
      } catch (err) {
        console.warn('Backend bookmark sync warning:', err);
      }
    }
    showToast(!isCurrentlyBookmarked ? 'Saved to bookmarks' : 'Bookmark removed', 'info');
  }, [user?.id, store.opportunityBookmarks, showToast]);

  // Phase 6 Certifications & Job Readiness State
  const [selectedCertTrackFilter, setSelectedCertTrackFilter] = useState<string>('all');
  const [selectedJobTrackFilter, setSelectedJobTrackFilter] = useState<string>('all');

  const navigateToTrackCertifications = useCallback((trackSlug: string) => {
    setSelectedCertTrackFilter(trackSlug);
    setActiveTab('certifications');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setActiveTab]);

  const navigateToTrackJobs = useCallback((trackSlug: string) => {
    setSelectedJobTrackFilter(trackSlug);
    setActiveTab('jobs');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setActiveTab]);

  const trackJobApplication = useCallback(async (payload: any) => {
    const appId = payload.id || ('app_' + Date.now());
    const newOrUpdatedApp = {
      ...payload,
      id: appId,
      updatedAt: new Date().toISOString()
    };

    setStore(prev => {
      const current = prev.jobApplications || [];
      const existingIdx = current.findIndex((a: any) =>
        (payload.jobId && a.jobId === payload.jobId) ||
        (a.title === payload.title && a.company === payload.company) ||
        a.id === payload.id
      );
      let updated;
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = { ...updated[existingIdx], ...newOrUpdatedApp };
      } else {
        updated = [newOrUpdatedApp, ...current];
      }

      const nextState = { ...prev, jobApplications: updated };
      if (user?.id) saveUserStorage(user.id, nextState);
      return nextState;
    });

    if (user?.id) {
      try {
        await ApiService.trackJobApplication(payload);
      } catch (err: any) {
        console.warn('Backend application tracking sync error:', err);
      }
    }
    showToast(`Application tracked: ${payload.status || 'Updated'}`, 'success');
  }, [user?.id, showToast]);

  const deleteJobApplication = useCallback(async (appId: string) => {
    setStore(prev => {
      const current = prev.jobApplications || [];
      const updated = current.filter((a: any) => a.id !== appId && a._id !== appId);
      const nextState = { ...prev, jobApplications: updated };
      if (user?.id) saveUserStorage(user.id, nextState);
      return nextState;
    });

    if (user?.id) {
      try {
        await ApiService.deleteJobApplication(appId);
      } catch (err: any) {
        console.warn('Backend application delete notice:', err);
      }
    }
    showToast('Application removed from tracker', 'info');
  }, [user?.id, showToast]);

  // Placement States
  const [selectedCodingQuestionId, setSelectedCodingQuestionId] = useState<string | null>(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiCurrentContext, setAiCurrentContext] = useState<AiPageContext>({ page: 'dashboard' });

  // Multi-user data synchronization effect
  useEffect(() => {
    if (!user) {
      // User logged out: clear state to empty
      setStore(getEmptyUserState());
      return;
    }

    // 1. First populate with user's local cache
    const cached = loadUserStorage(user.id);
    setStore(cached);

    // 2. Fetch fresh user records from backend with strict userId derivation
    const fetchUserRecords = async () => {
      try {
        const [progressRes, submissionsRes, attemptsRes, resumeRes, aiRes, appsRes] = await Promise.allSettled([
          ApiService.getProgress(),
          ApiService.getSubmissions(),
          ApiService.getAptitudeAttempts(),
          ApiService.getResumeProfile(),
          ApiService.getAiConversations(),
          ApiService.getUserJobApplications()
        ]);

        setStore(prev => {
          let nextState = { ...prev };

          if (appsRes.status === 'fulfilled' && Array.isArray(appsRes.value)) {
            nextState.jobApplications = appsRes.value;
          }

          if (progressRes.status === 'fulfilled' && progressRes.value) {
            const p = progressRes.value;
            nextState = {
              ...nextState,
              completedTopics: p.completedTopics || {},
              completedDays: p.completedDays || {},
              starredDays: p.starredDays || [1, 7],
              bookmarkedConcepts: p.bookmarkedConcepts || [],
              notes: p.notes || {},
              revisionTasks: p.revisionTasks || [],
              studySessions: p.studySessions || [],
              quizAttempts: p.quizAttempts || [],
              incorrectQuestions: p.incorrectQuestions || [],
              flashcardMastery: p.flashcardMastery || {},
              solvedCodingQuestions: p.solvedCodingQuestions || [],
              bookmarkedCodingQuestions: p.bookmarkedCodingQuestions || [],
              lastActiveDay: p.lastActiveDay || 1,
              lastActiveTopicId: p.lastActiveTopicId || 'day1-topic1'
            };
          }

          if (submissionsRes.status === 'fulfilled' && Array.isArray(submissionsRes.value)) {
            nextState.codingSubmissions = submissionsRes.value;
            const solvedFromSubs = submissionsRes.value
              .filter((s: any) => s.status === 'Accepted')
              .map((s: any) => s.questionId);
            nextState.solvedCodingQuestions = Array.from(new Set([...nextState.solvedCodingQuestions, ...solvedFromSubs]));
          }

          if (attemptsRes.status === 'fulfilled' && Array.isArray(attemptsRes.value)) {
            nextState.aptitudeAttempts = attemptsRes.value;
          }

          if (resumeRes.status === 'fulfilled' && resumeRes.value?.profile) {
            nextState.activeResume = resumeRes.value.profile;
          }

          if (aiRes.status === 'fulfilled' && Array.isArray(aiRes.value?.messages)) {
            nextState.aiChatMessages = aiRes.value.messages;
          }

          saveUserStorage(user.id, nextState);
          return nextState;
        });
      } catch (err) {
        console.warn('Backend data sync notice:', err);
      }
    };

    fetchUserRecords();
  }, [user?.id]);

  // Synchronize store changes to user-isolated localStorage
  useEffect(() => {
    if (user?.id) {
      saveUserStorage(user.id, store);
    }
  }, [store, user?.id]);

  // Debounced backend progress sync
  useEffect(() => {
    if (!user?.id) return;
    const timer = setTimeout(() => {
      ApiService.updateProgress({
        completedTopics: store.completedTopics,
        completedDays: store.completedDays,
        starredDays: store.starredDays,
        bookmarkedConcepts: store.bookmarkedConcepts,
        notes: store.notes,
        revisionTasks: store.revisionTasks,
        studySessions: store.studySessions,
        quizAttempts: store.quizAttempts,
        incorrectQuestions: store.incorrectQuestions,
        flashcardMastery: store.flashcardMastery,
        solvedCodingQuestions: store.solvedCodingQuestions,
        bookmarkedCodingQuestions: store.bookmarkedCodingQuestions,
        lastActiveDay: store.lastActiveDay,
        lastActiveTopicId: store.lastActiveTopicId
      }).catch(err => console.warn('Progress sync warning:', err));
    }, 1200);

    return () => clearTimeout(timer);
  }, [
    user?.id,
    store.completedTopics,
    store.completedDays,
    store.starredDays,
    store.bookmarkedConcepts,
    store.notes,
    store.revisionTasks,
    store.studySessions,
    store.quizAttempts,
    store.incorrectQuestions,
    store.flashcardMastery,
    store.solvedCodingQuestions,
    store.bookmarkedCodingQuestions
  ]);

  // Apply Theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (store.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    try {
      localStorage.setItem('seekhsetu_theme', store.theme);
    } catch {
      // ignore
    }
  }, [store.theme]);

  // Flashcards mastery
  const updateFlashcardMastery = useCallback((cardId: string, status: FlashcardMastery) => {
    setStore(prev => ({
      ...prev,
      flashcardMastery: {
        ...prev.flashcardMastery,
        [cardId]: status
      }
    }));
  }, []);

  const resetFlashcardDeck = useCallback((dayNumber?: number) => {
    setStore(prev => {
      const nextMastery = { ...prev.flashcardMastery };
      if (dayNumber) {
        allFlashcards.filter(f => f.dayNumber === dayNumber).forEach(f => {
          delete nextMastery[f.id];
        });
      } else {
        Object.keys(nextMastery).forEach(k => delete nextMastery[k]);
      }
      return { ...prev, flashcardMastery: nextMastery };
    });
    showToast('Deck mastery reset', 'info');
  }, [showToast]);

  // Timer State with timestamp persistence
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    mode: 'study',
    targetMinutes: 25,
    elapsedSeconds: 0,
    dayNumber: 1,
    topicTitle: 'JavaScript Fundamentals',
    startTimestamp: null
  });

  const completeTimerSession = useCallback(() => {
    setTimerState(prev => {
      if (prev.elapsedSeconds >= 60) {
        const recordedMins = Math.round(prev.elapsedSeconds / 60);
        const newSession: StudySessionRecord = {
          id: 'sess-' + Date.now(),
          dayNumber: prev.dayNumber,
          topicTitle: prev.topicTitle,
          durationMinutes: recordedMins,
          type: prev.mode,
          startTime: new Date(Date.now() - prev.elapsedSeconds * 1000).toISOString(),
          endTime: new Date().toISOString()
        };

        setStore(s => ({
          ...s,
          studySessions: [newSession, ...s.studySessions]
        }));
      }

      return {
        ...prev,
        isRunning: false,
        isPaused: false,
        elapsedSeconds: 0,
        startTimestamp: null
      };
    });
  }, []);

  useEffect(() => {
    let intervalId: any = null;

    if (timerState.isRunning && !timerState.isPaused) {
      intervalId = setInterval(() => {
        setTimerState(prev => {
          const nextElapsed = prev.elapsedSeconds + 1;
          const targetSeconds = prev.targetMinutes * 60;

          if (nextElapsed >= targetSeconds) {
            setTimeout(() => {
              completeTimerSession();
              showToast(`Session complete! ${prev.targetMinutes} minutes of focused ${prev.mode} recorded.`, 'success');
            }, 0);
            return {
              ...prev,
              isRunning: false,
              isPaused: false,
              elapsedSeconds: targetSeconds,
              startTimestamp: null
            };
          }

          return {
            ...prev,
            elapsedSeconds: nextElapsed
          };
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerState.isRunning, timerState.isPaused, timerState.targetMinutes, completeTimerSession, showToast]);

  const startTimer = useCallback((dayNum?: number, topicTitle?: string, minutes?: number) => {
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      elapsedSeconds: 0,
      targetMinutes: minutes || prev.targetMinutes,
      dayNumber: dayNum || prev.dayNumber,
      topicTitle: topicTitle || prev.topicTitle,
      startTimestamp: Date.now()
    }));
    showToast(`Timer started: ${minutes || timerState.targetMinutes}m focus session`, 'info');
  }, [timerState.targetMinutes, showToast]);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isPaused: true }));
    showToast('Timer paused', 'info');
  }, [showToast]);

  const resumeTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isPaused: false }));
    showToast('Timer resumed', 'info');
  }, [showToast]);

  const resetTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      elapsedSeconds: 0,
      startTimestamp: null
    }));
    showToast('Timer reset', 'info');
  }, [showToast]);

  const setTimerTargetMinutes = useCallback((minutes: number) => {
    setTimerState(prev => ({
      ...prev,
      targetMinutes: minutes,
      elapsedSeconds: 0,
      isRunning: false,
      isPaused: false
    }));
  }, []);

  const setTimerMode = useCallback((mode: 'study' | 'break') => {
    setTimerState(prev => ({
      ...prev,
      mode,
      targetMinutes: mode === 'study' ? 25 : 5,
      elapsedSeconds: 0,
      isRunning: false,
      isPaused: false
    }));
  }, []);

  const navigateToDay = useCallback((dayNumber: number, topicId?: string) => {
    setSelectedDayNumber(dayNumber);
    const day = getDayByNumber(dayNumber);
    const targetTopicId = topicId || (day?.topics[0]?.id ?? undefined);
    setSelectedTopicId(targetTopicId);
    setActiveTab('workspace');

    setStore(s => ({
      ...s,
      lastActiveDay: dayNumber,
      lastActiveTopicId: targetTopicId
    }));
  }, []);

  // Completion controls
  const toggleTopicCompletion = useCallback((topicId: string, dayNumber: number) => {
    setStore(prev => {
      const isNowComplete = !prev.completedTopics[topicId];
      const updatedTopics = { ...prev.completedTopics, [topicId]: isNowComplete };

      const day = getDayByNumber(dayNumber);
      let dayCompleted = prev.completedDays[dayNumber] || false;
      if (day && day.topics.length > 0) {
        dayCompleted = day.topics.every(t => updatedTopics[t.id]);
      }

      const updatedDays = { ...prev.completedDays, [dayNumber]: dayCompleted };

      return {
        ...prev,
        completedTopics: updatedTopics,
        completedDays: updatedDays
      };
    });

    showToast('Topic progress updated', 'success');
  }, [showToast]);

  const toggleDayCompletion = useCallback((dayNumber: number) => {
    setStore(prev => {
      const isNowComplete = !prev.completedDays[dayNumber];
      const day = getDayByNumber(dayNumber);
      const updatedTopics = { ...prev.completedTopics };

      if (day) {
        day.topics.forEach(t => {
          updatedTopics[t.id] = isNowComplete;
        });
      }

      return {
        ...prev,
        completedDays: { ...prev.completedDays, [dayNumber]: isNowComplete },
        completedTopics: updatedTopics
      };
    });

    showToast(`Day ${dayNumber} marked as ${!store.completedDays[dayNumber] ? 'complete' : 'in progress'}`, 'success');
  }, [store.completedDays, showToast]);

  const toggleStarDay = useCallback((dayNumber: number) => {
    setStore(prev => {
      const isStarred = prev.starredDays.includes(dayNumber);
      const nextStarred = isStarred
        ? prev.starredDays.filter(d => d !== dayNumber)
        : [...prev.starredDays, dayNumber];

      return { ...prev, starredDays: nextStarred };
    });
  }, []);

  // Bookmarks
  const addBookmark = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: 'bm-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setStore(prev => ({
      ...prev,
      bookmarkedConcepts: [newBookmark, ...prev.bookmarkedConcepts]
    }));
    showToast('Concept bookmarked for revision', 'success');
  }, [showToast]);

  const removeBookmark = useCallback((bookmarkId: string) => {
    setStore(prev => ({
      ...prev,
      bookmarkedConcepts: prev.bookmarkedConcepts.filter(b => b.id !== bookmarkId)
    }));
    showToast('Bookmark removed', 'info');
  }, [showToast]);

  const isBookmarked = useCallback((topicId: string) => {
    return store.bookmarkedConcepts.some(b => b.topicId === topicId);
  }, [store.bookmarkedConcepts]);

  // Notes
  const saveNote = useCallback((key: string, content: string) => {
    setStore(prev => ({
      ...prev,
      notes: { ...prev.notes, [key]: content }
    }));
    showToast('Note saved', 'success');
  }, [showToast]);

  const getNote = useCallback((key: string) => {
    return store.notes[key] || '';
  }, [store.notes]);

  // Revision Tasks
  const addRevisionTask = useCallback((task: Omit<RevisionTask, 'id'>) => {
    const newTask: RevisionTask = {
      ...task,
      id: 'task-' + Date.now()
    };
    setStore(prev => ({
      ...prev,
      revisionTasks: [newTask, ...prev.revisionTasks]
    }));
    showToast('Revision task added', 'success');
  }, [showToast]);

  const toggleRevisionTask = useCallback((taskId: string) => {
    setStore(prev => ({
      ...prev,
      revisionTasks: prev.revisionTasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  }, []);

  const deleteRevisionTask = useCallback((taskId: string) => {
    setStore(prev => ({
      ...prev,
      revisionTasks: prev.revisionTasks.filter(t => t.id !== taskId)
    }));
    showToast('Task removed', 'info');
  }, [showToast]);

  // Quiz records
  const recordQuizAttempt = useCallback((
    attempt: Omit<QuizAttemptRecord, 'id' | 'timestamp'>,
    incorrectItems?: IncorrectQuestionItem[]
  ) => {
    const newAttempt: QuizAttemptRecord = {
      ...attempt,
      id: 'qa-' + Date.now(),
      timestamp: new Date().toISOString()
    };

    setStore(prev => {
      let nextIncorrect = [...prev.incorrectQuestions];
      if (incorrectItems && incorrectItems.length > 0) {
        const existingIds = new Set(prev.incorrectQuestions.map(q => q.questionId));
        const toAdd = incorrectItems.filter(item => !existingIds.has(item.questionId));
        nextIncorrect = [...toAdd, ...nextIncorrect];
      }

      return {
        ...prev,
        quizAttempts: [newAttempt, ...prev.quizAttempts],
        incorrectQuestions: nextIncorrect
      };
    });

    showToast(`Quiz completed! Score: ${attempt.score}/${attempt.totalQuestions} (${attempt.accuracy}%)`, 'success');
  }, [showToast]);

  const removeIncorrectQuestion = useCallback((questionId: string) => {
    setStore(prev => ({
      ...prev,
      incorrectQuestions: prev.incorrectQuestions.filter(q => q.questionId !== questionId)
    }));
    showToast('Question cleared from revision queue', 'info');
  }, [showToast]);

  // Theme
  const toggleTheme = useCallback(() => {
    setStore(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  }, []);

  const setDailyGoalMinutes = useCallback((mins: number) => {
    setStore(prev => ({ ...prev, dailyGoalMinutes: mins }));
    showToast(`Daily goal updated to ${mins} mins`, 'info');
  }, [showToast]);

  const resetAllData = useCallback(async () => {
    if (user?.id) {
      try {
        await ApiService.resetProgress();
      } catch (err) {
        console.warn('Backend reset notice:', err);
      }
      clearUserStorage(user.id);
    }
    const fresh = getEmptyUserState();
    setStore(fresh);
    showToast('Personal study data reset to factory default', 'warning');
  }, [user?.id, showToast]);

  // Coding Arena Actions
  const navigateToCodingProblem = useCallback((questionId: string) => {
    setSelectedCodingQuestionId(questionId);
    setActiveTab('coding');
  }, []);

  const recordCodingSubmission = useCallback(async (sub: Omit<CodingSubmission, 'id' | 'timestamp'>) => {
    const newSub: CodingSubmission = {
      ...sub,
      id: 'sub-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    setStore(prev => {
      const nextSolved = sub.status === 'Accepted' && !prev.solvedCodingQuestions.includes(sub.questionId)
        ? [...prev.solvedCodingQuestions, sub.questionId]
        : prev.solvedCodingQuestions;
      return {
        ...prev,
        solvedCodingQuestions: nextSolved,
        codingSubmissions: [newSub, ...prev.codingSubmissions]
      };
    });

    if (sub.status === 'Accepted') {
      showToast(`Solution Accepted! Problem marked as solved.`, 'success');
    } else {
      showToast(`Submission recorded: ${sub.status}`, 'warning');
    }

    // Persist to backend under authenticated user ID
    try {
      await ApiService.submitCode(sub);
    } catch (err) {
      console.warn('Coding submission backend note:', err);
    }
  }, [showToast]);

  const toggleBookmarkCodingQuestion = useCallback((questionId: string) => {
    setStore(prev => {
      const isBookmarked = prev.bookmarkedCodingQuestions.includes(questionId);
      const next = isBookmarked
        ? prev.bookmarkedCodingQuestions.filter(id => id !== questionId)
        : [...prev.bookmarkedCodingQuestions, questionId];
      return { ...prev, bookmarkedCodingQuestions: next };
    });
  }, []);

  const isCodingQuestionBookmarked = useCallback((questionId: string) => {
    return store.bookmarkedCodingQuestions.includes(questionId);
  }, [store.bookmarkedCodingQuestions]);

  const isCodingQuestionSolved = useCallback((questionId: string) => {
    return store.solvedCodingQuestions.includes(questionId);
  }, [store.solvedCodingQuestions]);

  // Aptitude Actions
  const recordAptitudeAttempt = useCallback(async (att: Omit<AptitudeAttemptRecord, 'id' | 'timestamp'>) => {
    const newAtt: AptitudeAttemptRecord = {
      ...att,
      id: 'apt-att-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    setStore(prev => ({
      ...prev,
      aptitudeAttempts: [newAtt, ...prev.aptitudeAttempts]
    }));
    showToast(`Assessment submitted: ${att.accuracy}% score`, 'success');

    // Persist to backend under authenticated user ID
    try {
      await ApiService.submitAptitudeAttempt(att);
    } catch (err) {
      console.warn('Aptitude backend note:', err);
    }
  }, [showToast]);

  // Resume Actions
  const saveResumeProfile = useCallback(async (profile: ResumeProfile) => {
    setStore(prev => {
      const existingIdx = prev.savedResumes.findIndex(r => r.id === profile.id);
      const updatedResumes = [...prev.savedResumes];
      if (existingIdx >= 0) {
        updatedResumes[existingIdx] = profile;
      } else {
        updatedResumes.push(profile);
      }
      return {
        ...prev,
        savedResumes: updatedResumes,
        activeResume: profile
      };
    });
    showToast('Resume profile saved successfully', 'success');

    // Persist to backend under authenticated user ID
    try {
      await ApiService.saveResumeProfile(profile);
    } catch (err) {
      console.warn('Resume backend note:', err);
    }
  }, [showToast]);

  const setLatestAtsScore = useCallback((score: number) => {
    setStore(prev => ({ ...prev, latestAtsScore: score }));
  }, []);

  // AI Assistant Chat Actions
  const addAiChatMessage = useCallback((msg: Omit<AiChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: AiChatMessage = {
      ...msg,
      id: 'ai-msg-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setStore(prev => ({
      ...prev,
      aiChatMessages: [...prev.aiChatMessages, newMsg]
    }));
  }, []);

  const clearAiChatMessages = useCallback(async () => {
    setStore(prev => ({
      ...prev,
      aiChatMessages: []
    }));
    showToast('AI chat history cleared', 'info');
    try {
      await ApiService.clearAiConversations();
    } catch (err) {
      console.warn('AI clear backend note:', err);
    }
  }, [showToast]);

  // Real Analytics Calculations derived strictly from current user's records
  const {
    todayStudyMinutes,
    weekStudyMinutes,
    totalFocusedSessions,
    overallSyllabusProgress,
    completedTopicsCount,
    inProgressTopicsCount,
    totalTopicsCount,
    studyStreakDays,
    weakTopics,
    masteredCardsCount,
    familiarCardsCount,
    learningCardsCount,
    unfamiliarCardsCount,
    totalFlashcardsCount
  } = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);

    let todayMins = 0;
    let weekMins = 0;

    store.studySessions.forEach(sess => {
      const sessDate = new Date(sess.startTime);
      const isToday = sess.startTime.startsWith(todayStr);

      if (isToday) {
        todayMins += sess.durationMinutes;
      }
      if (sessDate >= sevenDaysAgo) {
        weekMins += sess.durationMinutes;
      }
    });

    let allTopicsTotal = 0;
    allDays.forEach(day => {
      allTopicsTotal += day.topics.length;
    });

    const doneCount = Object.values(store.completedTopics).filter(Boolean).length;
    const progressPercent = allTopicsTotal > 0 ? Math.round((doneCount / allTopicsTotal) * 100) : 0;

    const sessionDates = new Set(
      store.studySessions.map(s => s.startTime.split('T')[0])
    );
    let streak = user?.streakDays || 0;
    if (streak === 0 && sessionDates.size > 0) {
      streak = 1;
    }

    const topicStats: Record<string, { totalAcc: number; count: number; correct: number; total: number }> = {};
    store.quizAttempts.forEach(qa => {
      const key = qa.topicTitle || 'General Assessment';
      if (!topicStats[key]) {
        topicStats[key] = { totalAcc: 0, count: 0, correct: 0, total: 0 };
      }
      topicStats[key].count += 1;
      topicStats[key].correct += qa.score;
      topicStats[key].total += qa.totalQuestions;
    });

    const computedWeak = Object.entries(topicStats)
      .map(([topic, stat]) => ({
        topic,
        accuracy: Math.round((stat.correct / (stat.total || 1)) * 100),
        totalAttempts: stat.count
      }))
      .filter(w => w.accuracy < 75)
      .sort((a, b) => a.accuracy - b.accuracy);

    let masteredCount = 0;
    let familiarCount = 0;
    let learningCount = 0;
    allFlashcards.forEach(card => {
      const status = store.flashcardMastery[card.id];
      if (status === 'mastered') masteredCount++;
      else if (status === 'familiar') familiarCount++;
      else if (status === 'learning') learningCount++;
    });
    const unfamiliarCount = Math.max(0, allFlashcards.length - (masteredCount + familiarCount + learningCount));

    return {
      todayStudyMinutes: todayMins,
      weekStudyMinutes: weekMins,
      totalFocusedSessions: store.studySessions.length,
      overallSyllabusProgress: progressPercent,
      completedTopicsCount: doneCount,
      inProgressTopicsCount: store.bookmarkedConcepts.length > 0 ? store.bookmarkedConcepts.length : (doneCount > 0 ? 1 : 0),
      totalTopicsCount: allTopicsTotal,
      studyStreakDays: Math.max(1, streak),
      weakTopics: computedWeak,
      masteredCardsCount: masteredCount,
      familiarCardsCount: familiarCount,
      learningCardsCount: learningCount,
      unfamiliarCardsCount: unfamiliarCount,
      totalFlashcardsCount: allFlashcards.length
    };
  }, [store.studySessions, store.completedTopics, store.quizAttempts, store.bookmarkedConcepts, store.flashcardMastery, user?.streakDays]);

  return (
    <StudyContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedDayNumber,
        setSelectedDayNumber,
        selectedTopicId,
        setSelectedTopicId,
        navigateToDay,

        // Career Tracks
        selectedTrackSlug,
        setSelectedTrackSlug,
        enrolledTracks: store.enrolledTracks || ['fullstack-web'],
        activeTrack: store.activeTrack || 'fullstack-web',
        enrollInTrack,
        switchActiveTrack,
        completedTrackMilestones: store.completedTrackMilestones || {},
        toggleTrackMilestone,
        isMilestoneCompleted,
        navigateToTrackRoadmap,

        // Resources & Projects Hub
        selectedResourceTrackFilter,
        setSelectedResourceTrackFilter,
        selectedProjectTrackFilter,
        setSelectedProjectTrackFilter,
        navigateToTrackResources,
        navigateToTrackProjects,
        opportunityBookmarks: store.opportunityBookmarks || [],
        toggleOpportunityBookmark,
        isOpportunityBookmarked,

        selectedAssessmentTrackFilter,
        setSelectedAssessmentTrackFilter,
        navigateToTrackAssessments,

        // Phase 5 Interviews & Soft Skills
        selectedInterviewTrackFilter,
        setSelectedInterviewTrackFilter,
        navigateToTrackInterviews,
        bookmarkedInterviewQuestionIds: store.bookmarkedInterviewQuestionIds || [],
        toggleInterviewQuestionBookmark,
        isInterviewQuestionBookmarked,
        masteredInterviewQuestionIds: store.masteredInterviewQuestionIds || [],
        toggleInterviewQuestionMastered,
        isInterviewQuestionMastered,

        // Phase 6 Certifications & Opportunities Hub
        selectedCertTrackFilter,
        setSelectedCertTrackFilter,
        navigateToTrackCertifications,
        selectedJobTrackFilter,
        setSelectedJobTrackFilter,
        navigateToTrackJobs,
        jobApplications: store.jobApplications || [],
        trackJobApplication,
        deleteJobApplication,

        flashcardMastery: store.flashcardMastery,
        updateFlashcardMastery,
        resetFlashcardDeck,
        activeWorkspaceViewMode,
        setActiveWorkspaceViewMode,
        masteredCardsCount,
        familiarCardsCount,
        learningCardsCount,
        unfamiliarCardsCount,
        totalFlashcardsCount,

        completedTopics: store.completedTopics,
        completedDays: store.completedDays,
        starredDays: store.starredDays,
        bookmarkedConcepts: store.bookmarkedConcepts,
        notes: store.notes,
        revisionTasks: store.revisionTasks,
        studySessions: store.studySessions,
        quizAttempts: store.quizAttempts,
        incorrectQuestions: store.incorrectQuestions,
        theme: store.theme,
        dailyGoalMinutes: store.dailyGoalMinutes,

        solvedCodingQuestions: store.solvedCodingQuestions,
        bookmarkedCodingQuestions: store.bookmarkedCodingQuestions,
        codingSubmissions: store.codingSubmissions,
        recordCodingSubmission,
        toggleBookmarkCodingQuestion,
        isCodingQuestionBookmarked,
        isCodingQuestionSolved,
        selectedCodingQuestionId,
        setSelectedCodingQuestionId,
        navigateToCodingProblem,

        aptitudeAttempts: store.aptitudeAttempts,
        recordAptitudeAttempt,

        savedResumes: store.savedResumes,
        activeResume: store.activeResume,
        latestAtsScore: store.latestAtsScore,
        saveResumeProfile,
        setLatestAtsScore,

        aiChatMessages: store.aiChatMessages,
        addAiChatMessage,
        clearAiChatMessages,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        aiCurrentContext,
        setAiCurrentContext,

        toggleTopicCompletion,
        toggleDayCompletion,
        toggleStarDay,
        addBookmark,
        removeBookmark,
        isBookmarked,
        saveNote,
        getNote,
        addRevisionTask,
        toggleRevisionTask,
        deleteRevisionTask,
        recordQuizAttempt,
        removeIncorrectQuestion,
        toggleTheme,
        setDailyGoalMinutes,
        resetAllData,

        timerState,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        completeTimerSession,
        setTimerTargetMinutes,
        setTimerMode,

        toasts,
        showToast,
        dismissToast,

        todayStudyMinutes,
        weekStudyMinutes,
        totalFocusedSessions,
        overallSyllabusProgress,
        completedTopicsCount,
        inProgressTopicsCount,
        totalTopicsCount,
        studyStreakDays,
        weakTopics
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
