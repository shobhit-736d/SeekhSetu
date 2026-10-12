import {
  Bookmark,
  RevisionTask,
  StudySessionRecord,
  QuizAttemptRecord,
  IncorrectQuestionItem,
  FlashcardMastery
} from '../types/roadmap';

export interface StorageSchema {
  version: number;
  completedTopics: Record<string, boolean>; // e.g. 'day1-topic1': true
  completedDays: Record<number, boolean>;   // e.g. 1: true
  starredDays: number[];                    // e.g. [1, 7]
  bookmarkedConcepts: Bookmark[];
  notes: Record<string, string>;            // key: dayNumber or topicId, value: content
  revisionTasks: RevisionTask[];
  studySessions: StudySessionRecord[];
  quizAttempts: QuizAttemptRecord[];
  incorrectQuestions: IncorrectQuestionItem[];
  flashcardMastery: Record<string, FlashcardMastery>;
  theme: 'dark' | 'light';
  dailyGoalMinutes: number;
  lastActiveDay: number;
  lastActiveTopicId?: string;
}

const STORAGE_KEY = 'seekhsetu_v1_store';
const LEGACY_STORAGE_KEY = 'preppilot_v1_store';

const defaultStorageState: StorageSchema = {
  version: 1,
  completedTopics: {},
  completedDays: {},
  starredDays: [1, 7], // default star high-yield days
  bookmarkedConcepts: [],
  notes: {},
  flashcardMastery: {
    'fc-d1-1': 'familiar',
    'fc-d1-2': 'mastered',
    'fc-d1-3': 'learning'
  },
  revisionTasks: [
    {
      id: 'rev-1',
      title: 'Review JavaScript TDZ & Hoisting Quirks',
      dayNumber: 1,
      topicId: 'day1-topic1',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      completed: false,
      priority: 'high'
    },
    {
      id: 'rev-2',
      title: 'Practice Event Loop Execution Order Quiz',
      dayNumber: 3,
      topicId: 'day3-topic1',
      dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      completed: false,
      priority: 'medium'
    }
  ],
  studySessions: [
    // Pre-populate realistic historical sessions for immediate analytics display
    {
      id: 'sess-init-1',
      dayNumber: 1,
      topicTitle: 'Variables & TDZ',
      durationMinutes: 45,
      type: 'study',
      startTime: new Date(Date.now() - 86400000 * 2).toISOString(),
      endTime: new Date(Date.now() - 86400000 * 2 + 45 * 60000).toISOString()
    },
    {
      id: 'sess-init-2',
      dayNumber: 1,
      topicTitle: 'Data Types & Coercion',
      durationMinutes: 35,
      type: 'study',
      startTime: new Date(Date.now() - 86400000).toISOString(),
      endTime: new Date(Date.now() - 86400000 + 35 * 60000).toISOString()
    }
  ],
  quizAttempts: [
    {
      id: 'qa-init-1',
      dayNumber: 1,
      topicTitle: 'Data Types & Coercion',
      quizType: 'topic',
      totalQuestions: 2,
      score: 2,
      accuracy: 100,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      incorrectQuestionIds: []
    }
  ],
  incorrectQuestions: [],
  theme: 'dark',
  dailyGoalMinutes: 120,
  lastActiveDay: 1,
  lastActiveTopicId: 'day1-topic1'
};

export const loadStorage = (): StorageSchema => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) {
      saveStorage(defaultStorageState);
      return defaultStorageState;
    }
    const parsed = JSON.parse(raw);
    return {
      ...defaultStorageState,
      ...parsed,
      // Ensure arrays and objects exist
      completedTopics: parsed.completedTopics || {},
      completedDays: parsed.completedDays || {},
      starredDays: Array.isArray(parsed.starredDays) ? parsed.starredDays : [1, 7],
      bookmarkedConcepts: Array.isArray(parsed.bookmarkedConcepts) ? parsed.bookmarkedConcepts : [],
      notes: parsed.notes || {},
      revisionTasks: Array.isArray(parsed.revisionTasks) ? parsed.revisionTasks : defaultStorageState.revisionTasks,
      studySessions: Array.isArray(parsed.studySessions) ? parsed.studySessions : defaultStorageState.studySessions,
      quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : defaultStorageState.quizAttempts,
      incorrectQuestions: Array.isArray(parsed.incorrectQuestions) ? parsed.incorrectQuestions : [],
      flashcardMastery: parsed.flashcardMastery || defaultStorageState.flashcardMastery
    };
  } catch (error) {
    console.error('Failed to load SeekhSetu storage from localStorage', error);
    return defaultStorageState;
  }
};

export const saveStorage = (data: StorageSchema): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save SeekhSetu data to localStorage', error);
  }
};

export const exportStorageJSON = (): string => {
  const data = loadStorage();
  return JSON.stringify(data, null, 2);
};

export const importStorageJSON = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed === 'object' && parsed !== null) {
      saveStorage({ ...defaultStorageState, ...parsed });
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const resetStorage = (): StorageSchema => {
  saveStorage(defaultStorageState);
  return defaultStorageState;
};
