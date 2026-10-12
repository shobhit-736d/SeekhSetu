import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  Bookmark,
  RevisionTask,
  StudySessionRecord,
  QuizAttemptRecord,
  IncorrectQuestionItem,
  FlashcardMastery
} from '../types/roadmap';
import { allDays, getDayByNumber } from '../data/roadmapData';
import { allFlashcards } from '../data/flashcardsData';
import { loadStorage, saveStorage, StorageSchema, resetStorage } from '../services/storageService';

export type ActiveTab = 'dashboard' | 'roadmap' | 'workspace' | 'practice' | 'timer' | 'revision' | 'analytics';

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

  // Flashcard & Active Recall Mastery (Studley AI Integration)
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
  // Load initial persistent storage
  const [store, setStore] = useState<StorageSchema>(() => loadStorage());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(() => store.lastActiveDay || 1);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(() => store.lastActiveTopicId || 'day1-topic1');
  const [activeWorkspaceViewMode, setActiveWorkspaceViewMode] = useState<'lesson' | 'flashcards' | 'quiz' | 'ai-coach' | 'notes'>('lesson');

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

  // Sync store to localStorage whenever store changes
  useEffect(() => {
    saveStorage(store);
  }, [store]);

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
  }, [store.theme]);

  // Accurate Timer execution using real timestamp difference
  useEffect(() => {
    let intervalId: any = null;

    if (timerState.isRunning && !timerState.isPaused) {
      intervalId = setInterval(() => {
        setTimerState(prev => {
          const nextElapsed = prev.elapsedSeconds + 1;
          const targetSeconds = prev.targetMinutes * 60;

          // Target reached!
          if (nextElapsed >= targetSeconds) {
            // Auto finish
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
  }, [timerState.isRunning, timerState.isPaused, timerState.targetMinutes]);

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

  const completeTimerSession = useCallback(() => {
    setTimerState(prev => {
      if (prev.elapsedSeconds >= 60) {
        // Record only if at least 1 minute elapsed
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

  const navigateToDay = useCallback((dayNumber: number, topicId?: string) => {
    setSelectedDayNumber(dayNumber);
    const day = getDayByNumber(dayNumber);
    const targetTopicId = topicId || (day?.topics[0]?.id ?? undefined);
    setSelectedTopicId(targetTopicId);
    setActiveTab('workspace');

    // Update last active in store
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

      // Check if all topics in this day are complete
      const day = getDayByNumber(dayNumber);
      let dayCompleted = prev.completedDays[dayNumber] || false;
      if (day && day.topics.length > 0) {
        const allDone = day.topics.every(t => updatedTopics[t.id]);
        dayCompleted = allDone;
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

      // Also set all topics of this day
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
        // Append new incorrect questions avoiding duplicate IDs
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

  const resetAllData = useCallback(() => {
    const fresh = resetStorage();
    setStore(fresh);
    showToast('All data reset to factory default', 'warning');
  }, [showToast]);

  // Real Analytics Calculations derived from actual saved data
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

    // Count topics across all 30 days
    let allTopicsTotal = 0;
    allDays.forEach(day => {
      allTopicsTotal += day.topics.length;
    });

    const doneCount = Object.values(store.completedTopics).filter(Boolean).length;
    const progressPercent = allTopicsTotal > 0 ? Math.round((doneCount / allTopicsTotal) * 100) : 0;

    // Study streak
    const sessionDates = new Set(
      store.studySessions.map(s => s.startTime.split('T')[0])
    );
    let streak = 0;
    let checkDate = new Date();
    while (true) {
      const dateKey = checkDate.toISOString().split('T')[0];
      if (sessionDates.has(dateKey)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If today has no session yet, allow check for yesterday before breaking streak
        if (streak === 0 && checkDate.toISOString().split('T')[0] === todayStr) {
          checkDate.setDate(checkDate.getDate() - 1);
          const yesterdayKey = checkDate.toISOString().split('T')[0];
          if (sessionDates.has(yesterdayKey)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
            continue;
          }
        }
        break;
      }
    }

    // Weak topics derived from quiz attempts with accuracy < 75%
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

    // Flashcard mastery counts
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
      inProgressTopicsCount: store.bookmarkedConcepts.length > 0 ? store.bookmarkedConcepts.length : 1,
      totalTopicsCount: allTopicsTotal,
      studyStreakDays: Math.max(1, streak), // at least 1 day active
      weakTopics: computedWeak,
      masteredCardsCount: masteredCount,
      familiarCardsCount: familiarCount,
      learningCardsCount: learningCount,
      unfamiliarCardsCount: unfamiliarCount,
      totalFlashcardsCount: allFlashcards.length
    };
  }, [store.studySessions, store.completedTopics, store.quizAttempts, store.bookmarkedConcepts, store.flashcardMastery]);

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

        // Studley-style Flashcard Active Recall
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
