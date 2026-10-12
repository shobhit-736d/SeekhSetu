export type CodingDifficulty = 'Easy' | 'Medium' | 'Hard';

export type CodingTopic =
  | 'Arrays'
  | 'Strings'
  | 'Linked Lists'
  | 'Stacks & Queues'
  | 'Recursion'
  | 'Sorting & Searching'
  | 'Trees & Graphs'
  | 'Dynamic Programming'
  | 'SQL & Databases';

export type SupportedLanguage = 'javascript' | 'python' | 'java' | 'cpp' | 'sql';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
  isHidden?: boolean;
}

export interface CodingQuestion {
  id: string;
  title: string;
  slug: string;
  difficulty: CodingDifficulty;
  topic: CodingTopic;
  tags: string[];
  companies: string[];
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  starterTemplates: Record<SupportedLanguage, string>;
  testCases: TestCase[];
  hints: string[];
  solution: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
    code: Record<SupportedLanguage, string>;
  };
  acceptanceRate: number;
}

export interface CodeExecutionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compilation Error' | 'Runtime Error';
  output?: string;
  error?: string;
  runtimeMs?: number;
  memoryKb?: number;
  testCasesPassed: number;
  totalTestCases: number;
  details?: Array<{
    caseNumber: number;
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    error?: string;
  }>;
}

export interface CodingSubmission {
  id: string;
  questionId: string;
  questionTitle: string;
  difficulty: CodingDifficulty;
  topic: CodingTopic;
  language: SupportedLanguage;
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error';
  runtimeMs: number;
  memoryKb: number;
  testCasesPassed: number;
  totalTestCases: number;
  timestamp: string;
}

// ========================
// APTITUDE & REASONING TYPES
// ========================

export type AptitudeCategory =
  | 'Quantitative Aptitude'
  | 'Logical Reasoning'
  | 'Verbal Ability'
  | 'Data Interpretation'
  | 'Puzzles & Analytical'
  | 'Company Mock Test';

export interface AptitudeQuestion {
  id: string;
  category: AptitudeCategory;
  subtopic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  company?: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  shortcutTrick?: string;
  formula?: string;
}

export interface AptitudeAttemptRecord {
  id: string;
  category: AptitudeCategory | 'All Categories' | 'Company Mock Test';
  subtopic?: string;
  totalQuestions: number;
  score: number;
  accuracy: number;
  timeSpentSeconds: number;
  timestamp: string;
  incorrectQuestionIds: string[];
}

// ========================
// COMMUNICATION & INTERVIEW TYPES
// ========================

export type CommunicationModule =
  | 'elevator-pitch'
  | 'star-method'
  | 'hr-interview'
  | 'grammar-vocab'
  | 'email-writing'
  | 'group-discussion'
  | 'mock-interview';

export interface StarResponse {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  feedback?: string;
  createdAt: string;
}

export interface HrQuestion {
  id: string;
  question: string;
  intent: string;
  modelAnswer: string;
  framework: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  sampleFollowUps: string[];
}

export interface ElevatorPitchRecording {
  id: string;
  durationSeconds: number;
  transcript: string;
  wordsPerMinute: number;
  fillerWordsCount: number;
  feedback: {
    clarityScore: number;
    strengths: string[];
    improvementAreas: string[];
  };
  timestamp: string;
}

// ========================
// AI RESUME STUDIO TYPES
// ========================

export interface AtsScoreBreakdown {
  overallScore: number;
  sectionCompleteness: {
    score: number;
    maxScore: number;
    missingSections: string[];
    feedback: string;
  };
  skillsAndKeywords: {
    score: number;
    maxScore: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    feedback: string;
  };
  actionVerbsAndImpact: {
    score: number;
    maxScore: number;
    quantifiedMetricsCount: number;
    strongVerbsCount: number;
    feedback: string;
  };
  formattingAndReadability: {
    score: number;
    maxScore: number;
    issues: string[];
    feedback: string;
  };
  jobDescriptionMatch?: {
    score: number;
    maxScore: number;
    targetRole?: string;
    matchedJdKeywords: string[];
    missingJdKeywords: string[];
    relevanceRating: 'Low' | 'Moderate' | 'High' | 'Strong';
  };
  recommendations: Array<{
    id: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    title: string;
    action: string;
  }>;
}

export interface ResumeProfile {
  id: string;
  title: string;
  lastUpdated: string;
  templateId: 'modern-tech' | 'classic-executive' | 'minimal-clean' | 'ivy-compact' | 'two-column-sidebar' | 'faang-minimal';
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    leetcode?: string;
  };
  summary: string;
  skills: {
    languages: string[];
    frameworks: string[];
    databasesAndCloud: string[];
    toolsAndDevops: string[];
    coreCs?: string[];
    softSkills: string[];
  };
  experience: Array<{
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    highlights: string[];
  }>;
  projects: Array<{
    id: string;
    title: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    description: string;
    highlights: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    grade: string;
    coursework?: string[];
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  achievements: string[];
  extracurriculars?: string[];
}

export interface ResumeAnalysisRecord {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  rawText: string;
  targetJobDescription?: string;
  atsBreakdown: AtsScoreBreakdown;
  improvedDraft?: ResumeProfile;
}

// ========================
// GLOBAL AI ASSISTANT TYPES
// ========================

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  codeSnippet?: string;
  language?: string;
  timestamp: string;
  contextTag?: string;
}

export interface AiPageContext {
  page: string;
  subtopic?: string;
  problemTitle?: string;
  currentCode?: string;
  language?: string;
  questionText?: string;
  atsScore?: number;
}
