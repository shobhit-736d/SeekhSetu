import { TrackCategory } from './career';

export type AssessmentQuestionType = 'mcq' | 'multiple-select' | 'true-false' | 'coding-challenge';

export type AssessmentDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface AssessmentQuestion {
  id: string;
  _id?: string;
  trackSlug: string;
  subject: string;
  topic: string;
  difficulty: AssessmentDifficulty;
  questionType: AssessmentQuestionType;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswers: number[]; // 0-based indices
  explanation: string;
  hint?: string;
  codingQuestionId?: string; // Links to Coding Arena challenge
  tags: string[];
  isVerified: boolean;
  explanationSource?: string;
}

// Client-safe question (answers/explanations stripped for timed benchmark tests)
export interface AssessmentQuestionClient {
  id: string;
  trackSlug: string;
  subject: string;
  topic: string;
  difficulty: AssessmentDifficulty;
  questionType: AssessmentQuestionType;
  question: string;
  codeSnippet?: string;
  options: string[];
  hint?: string;
  codingQuestionId?: string;
  tags: string[];
}

export interface AssessmentPreset {
  id: string;
  slug: string;
  title: string;
  description: string;
  trackSlug: string;
  category: TrackCategory;
  difficulty: AssessmentDifficulty | 'Comprehensive';
  durationMinutes: number;
  questionCount: number;
  passingScorePercent: number;
  tags: string[];
}

export interface UserAnswerSubmission {
  questionId: string;
  selectedAnswers: number[];
  timeSpentSeconds?: number;
}

export interface TopicPerformance {
  topic: string;
  total: number;
  correct: number;
  percent: number;
}

export interface AssessmentAttempt {
  id: string;
  _id?: string;
  userId?: string;
  trackSlug: string;
  subject: string;
  assessmentTitle: string;
  mode: 'practice' | 'timed-assessment';
  difficulty: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  topicBreakdown: Record<string, { total: number; correct: number; percent: number }>;
  answers: Array<{
    questionId: string;
    selectedAnswers: number[];
    isCorrect: boolean;
    correctAnswers?: number[];
    explanation?: string;
    timeSpentSeconds?: number;
  }>;
  incorrectQuestionIds: string[];
  recommendations: string[];
  completedAt: string;
}

export interface AssessmentSubmitResponse {
  success: boolean;
  attemptId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  topicBreakdown: Record<string, { total: number; correct: number; percent: number }>;
  evaluatedAnswers: Array<{
    questionId: string;
    selectedAnswers: number[];
    correctAnswers: number[];
    isCorrect: boolean;
    explanation: string;
    hint?: string;
  }>;
  recommendations: string[];
}
