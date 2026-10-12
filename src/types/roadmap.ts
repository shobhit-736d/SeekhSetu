export type ModuleCategory =
  | 'javascript'
  | 'react'
  | 'node'
  | 'sql'
  | 'dsa'
  | 'git-testing'
  | 'projects'
  | 'interview-hr';

export type FlashcardMastery = 'unfamiliar' | 'learning' | 'familiar' | 'mastered';

export interface FlashcardItem {
  id: string;
  topicId?: string;
  dayNumber: number;
  front: string;
  back: string;
  codeSnippet?: string;
  keyTakeaway: string;
  category: string;
  tags?: string[];
}

export interface CodeSnippet {
  language: string;
  code: string;
  title?: string;
  explanation?: string;
  input?: string;
  output?: string;
}

export interface DebuggingExercise {
  title: string;
  brokenCode: string;
  fixedCode: string;
  bugExplanation: string;
}

export interface InterviewQnA {
  id: string;
  question: string;
  answer: string;
  keyPoints: string[];
  difficulty: 'Junior' | 'Associate' | 'Senior';
  frequency: 'Frequently Asked' | 'Core Standard' | 'Must Know';
}

export interface MCQQuestion {
  id: string;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  type?: 'mcq' | 'output' | 'debugging';
}

export interface CodingChallengeItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  starterCode: string;
  hints: string[];
  solution: string;
  explanation: string;
  testCases: Array<{ input: string; output: string }>;
}

export interface TopicItem {
  id: string;
  title: string;
  durationMinutes: number;
  summary: string;
  definitions: Array<{ term: string; explanation: string }>;
  codeExamples: CodeSnippet[];
  stepByStep?: Array<{ step: number; title: string; description: string; codeSnippet?: string }>;
  commonMistakes?: DebuggingExercise[];
  practicalUseCases?: string[];
  interviewQuestions: InterviewQnA[];
  quizQuestions: MCQQuestion[];
  codingChallenges?: CodingChallengeItem[];
  flashcards?: FlashcardItem[];
}

export interface StudyDay {
  dayNumber: number;
  title: string;
  module: ModuleCategory;
  moduleName: string;
  primaryObjective: string;
  estimatedMinutes: number;
  isSevenDayTrack: boolean;
  topics: TopicItem[];
  checklist: string[];
  finalAssessmentQuestions: MCQQuestion[];
  flashcards?: FlashcardItem[];
}

export interface Bookmark {
  id: string;
  dayNumber: number;
  topicId: string;
  title: string;
  snippet: string;
  createdAt: string;
}

export interface NoteItem {
  id: string;
  dayNumber: number;
  topicId?: string;
  content: string;
  updatedAt: string;
}

export interface RevisionTask {
  id: string;
  title: string;
  dayNumber: number;
  topicId?: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface StudySessionRecord {
  id: string;
  dayNumber?: number;
  topicTitle?: string;
  durationMinutes: number;
  type: 'study' | 'break';
  startTime: string;
  endTime: string;
}

export interface QuizAttemptRecord {
  id: string;
  dayNumber?: number;
  topicTitle?: string;
  quizType: 'topic' | 'assessment' | 'practice-arena';
  totalQuestions: number;
  score: number;
  accuracy: number;
  timestamp: string;
  incorrectQuestionIds: string[];
}

export interface IncorrectQuestionItem {
  questionId: string;
  dayNumber: number;
  topicTitle: string;
  question: string;
  code?: string;
  options: string[];
  selectedAnswer: number;
  correctAnswer: number;
  explanation: string;
  date: string;
}
