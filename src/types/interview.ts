// src/types/interview.ts
// Domain types for Technical Interviews, Mock Interview Simulator, and Soft Skills

import { TrackCategory } from './career';

export type InterviewCategory =
  | 'technical-core'
  | 'system-design'
  | 'scenario-troubleshooting'
  | 'live-coding-concept'
  | 'behavioral-star'
  | 'hr-culture-fit';

export type InterviewDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface RubricCriteria {
  correctness: string;
  clarity: string;
  problemSolving: string;
  communication: string;
}

export interface InterviewQuestion {
  id: string;
  _id?: string;
  slug: string;
  title: string;
  trackSlug: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  jobRoles: string[];
  topic: string;
  question: string;
  intent: string;
  comprehensiveAnswer: string;
  keyPointsToMention: string[];
  codeExample?: string;
  language?: string;
  followUpQuestions: string[];
  commonMistakes: string[];
  companies?: string[];
  tags: string[];
  rubricCriteria?: RubricCriteria;
  isVerified: boolean;
}

export interface MockInterviewRoundConfig {
  roundId: string;
  name: string;
  category: InterviewCategory;
  questionCount: number;
}

export interface MockInterviewPreset {
  id: string;
  slug: string;
  title: string;
  trackSlug: string;
  targetRole: string;
  difficulty: InterviewDifficulty;
  durationMinutes: number;
  rounds: MockInterviewRoundConfig[];
  description: string;
  rubricDimensions?: string[];
}

export interface MockInterviewUserAnswer {
  questionId: string;
  questionText: string;
  category: InterviewCategory;
  userAnswer: string;
  recordingDurationSeconds?: number;
  timeSpentSeconds?: number;
}

export interface MockInterviewQuestionEvaluation {
  questionId: string;
  questionText: string;
  score: number; // 0 - 100
  modelAnswer: string;
  userAnswer: string;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

export interface MockInterviewEvaluation {
  overallScore: number; // 0 - 100
  passed: boolean;
  rubricScores: {
    correctness: number; // 0 - 100
    clarity: number; // 0 - 100
    problemSolving: number; // 0 - 100
    communication: number; // 0 - 100
  };
  keyStrengths: string[];
  areasForImprovement: string[];
  questionEvaluations: MockInterviewQuestionEvaluation[];
  disclaimer: string;
}

export interface MockInterviewAttemptRecord {
  id: string;
  _id?: string;
  userId?: string;
  trackSlug: string;
  targetRole: string;
  difficulty: InterviewDifficulty;
  durationMinutes: number;
  timeSpentSeconds: number;
  overallScore: number;
  passed: boolean;
  rubricScores: {
    correctness: number;
    clarity: number;
    problemSolving: number;
    communication: number;
  };
  answers: MockInterviewUserAnswer[];
  evaluation: MockInterviewEvaluation;
  createdAt: string;
}

export interface SoftSkillGuide {
  id: string;
  title: string;
  category: 'presentation' | 'teamwork' | 'conflict-resolution' | 'leadership' | 'etiquette';
  summary: string;
  frameworkSteps: Array<{
    step: string;
    description: string;
    practicalExample: string;
  }>;
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
}
