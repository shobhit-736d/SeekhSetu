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
  AiChatMessage
} from '../types/placement';

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

  // Placement Platform Extensions
  solvedCodingQuestions: string[];
  bookmarkedCodingQuestions: string[];
  codingSubmissions: CodingSubmission[];
  aptitudeAttempts: AptitudeAttemptRecord[];
  savedResumes: ResumeProfile[];
  activeResume: ResumeProfile | null;
  latestAtsScore: number;
  aiChatMessages: AiChatMessage[];
}

export const getSavedTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('seekhsetu_theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // ignore
  }
  return 'light';
};

export const getEmptyUserState = (): StorageSchema => ({
  version: 1,
  completedTopics: {},
  completedDays: {},
  starredDays: [1, 7],
  bookmarkedConcepts: [],
  notes: {},
  flashcardMastery: {},
  revisionTasks: [],
  studySessions: [],
  quizAttempts: [],
  incorrectQuestions: [],
  theme: getSavedTheme(),
  dailyGoalMinutes: 120,
  lastActiveDay: 1,
  lastActiveTopicId: 'day1-topic1',
  solvedCodingQuestions: [],
  bookmarkedCodingQuestions: [],
  codingSubmissions: [],
  aptitudeAttempts: [],
  savedResumes: [],
  activeResume: null,
  latestAtsScore: 0,
  aiChatMessages: []
});

const getStorageKey = (userId?: string): string => {
  return userId ? `seekhsetu_store_${userId}` : 'seekhsetu_guest_store';
};

export const loadUserStorage = (userId?: string): StorageSchema => {
  const empty = getEmptyUserState();
  if (!userId) return empty;

  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) {
      return empty;
    }
    const parsed = JSON.parse(raw);
    return {
      ...empty,
      ...parsed,
      completedTopics: parsed.completedTopics || {},
      completedDays: parsed.completedDays || {},
      starredDays: Array.isArray(parsed.starredDays) ? parsed.starredDays : [1, 7],
      bookmarkedConcepts: Array.isArray(parsed.bookmarkedConcepts) ? parsed.bookmarkedConcepts : [],
      notes: parsed.notes || {},
      revisionTasks: Array.isArray(parsed.revisionTasks) ? parsed.revisionTasks : [],
      studySessions: Array.isArray(parsed.studySessions) ? parsed.studySessions : [],
      quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
      incorrectQuestions: Array.isArray(parsed.incorrectQuestions) ? parsed.incorrectQuestions : [],
      flashcardMastery: parsed.flashcardMastery || {},
      solvedCodingQuestions: Array.isArray(parsed.solvedCodingQuestions) ? parsed.solvedCodingQuestions : [],
      bookmarkedCodingQuestions: Array.isArray(parsed.bookmarkedCodingQuestions) ? parsed.bookmarkedCodingQuestions : [],
      codingSubmissions: Array.isArray(parsed.codingSubmissions) ? parsed.codingSubmissions : [],
      aptitudeAttempts: Array.isArray(parsed.aptitudeAttempts) ? parsed.aptitudeAttempts : [],
      savedResumes: Array.isArray(parsed.savedResumes) ? parsed.savedResumes : [],
      activeResume: parsed.activeResume || null,
      latestAtsScore: typeof parsed.latestAtsScore === 'number' ? parsed.latestAtsScore : 0,
      aiChatMessages: Array.isArray(parsed.aiChatMessages) ? parsed.aiChatMessages : []
    };
  } catch (error) {
    console.error('Failed to load user storage from localStorage', error);
    return empty;
  }
};

export const saveUserStorage = (userId: string | undefined, data: StorageSchema): void => {
  try {
    if (data.theme) {
      localStorage.setItem('seekhsetu_theme', data.theme);
    }
    if (userId) {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(data));
    }
  } catch (error) {
    console.error('Failed to save user data to localStorage', error);
  }
};

export const clearUserStorage = (userId?: string): void => {
  if (userId) {
    localStorage.removeItem(getStorageKey(userId));
  }
};

export const exportUserStorageJSON = (userId?: string): string => {
  const data = loadUserStorage(userId);
  return JSON.stringify(data, null, 2);
};

export const importUserStorageJSON = (userId: string | undefined, jsonString: string): boolean => {
  if (!userId) return false;
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed === 'object' && parsed !== null) {
      saveUserStorage(userId, { ...getEmptyUserState(), ...parsed });
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
