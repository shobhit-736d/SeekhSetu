export type TrackCategory =
  | 'Software Engineering'
  | 'Data & AI'
  | 'Cloud & Infrastructure'
  | 'Security'
  | 'Design & Product'
  | 'Specialized Tech';

export type MarketDemand = 'Extremely High' | 'Very High' | 'High' | 'Moderate';

export interface SalaryRange {
  fresher: string;
  mid: string;
  senior: string;
}

export interface SkillMatrix {
  core: string[];
  recommended: string[];
  tools: string[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  skills: string[];
  learningObjectives?: string[];
  suggestedProjects?: string[];
  checkpointQuizIds?: string[];
  isCompleted?: boolean;
}

export interface RoadmapStage {
  stageNumber: number;
  title: string;
  subtitle?: string;
  phase: 'Foundations' | 'Core Concepts' | 'Advanced Engineering' | 'Job Ready & Capstone';
  durationWeeks: number;
  milestones: RoadmapMilestone[];
}

export interface CareerTrack {
  slug: string;
  title: string;
  category: TrackCategory;
  icon: string;
  accentColor: string;
  shortDescription: string;
  overview?: string;
  marketDemand: MarketDemand;
  averageSalary: SalaryRange;
  commonJobRoles: string[];
  prerequisites: string[];
  skills: SkillMatrix;
  roadmapStages: RoadmapStage[];
  totalEstimatedHours: number;
  isPublished?: boolean;
  displayOrder?: number;
}

export type ResourceCategory =
  | 'Official Documentation'
  | 'Interactive Course'
  | 'Video Series'
  | 'Cheatsheet & Reference'
  | 'Open Book'
  | 'Article & Guide'
  | 'Original SeekhSetu Guide';

export type ResourcePricing = 'Free' | 'Freemium' | 'Paid';

export interface LearningResource {
  id: string;
  _id?: string;
  title: string;
  description: string;
  url: string;
  trackSlug: string;
  topic?: string;
  category: ResourceCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  pricing: ResourcePricing;
  authorOrProvider: string;
  language?: string;
  prerequisites?: string[];
  isOfficial: boolean;
  isVerified: boolean;
  isOriginalSeekhSetu?: boolean;
  tags: string[];
  upvotes?: number;
}

export interface UserStory {
  title: string;
  description: string;
  acceptanceCriteria: string[];
}

export interface ProjectMilestone {
  stepNumber: number;
  title: string;
  tasks: string[];
  deliverable?: string;
}

export interface GuidedProject {
  id: string;
  _id?: string;
  slug: string;
  title: string;
  summary: string;
  trackSlug: string;
  projectType?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Capstone';
  estimatedHours: number;
  techStack: string[];
  objective?: string;
  problemStatement?: string;
  expectedOutcome?: string;
  prerequisites?: string[];
  systemArchitectureOverview?: string;
  keyFeatures: string[];
  userStories: UserStory[];
  milestones: ProjectMilestone[];
  githubStarterUrl?: string;
  liveDemoUrl?: string;
  resumeBulletPoints: string[];
  interviewDefenseQuestions: Array<{
    question: string;
    keyDiscussionPoints: string;
  }>;
  isFeatured?: boolean;
}

export type CertificationLevel = 'Foundational' | 'Associate' | 'Professional' | 'Specialty';

export interface ExamDomain {
  name: string;
  weightPercentage: number;
  keyTopics: string[];
}

export interface CertificationItem {
  id: string;
  _id?: string;
  code: string;
  name: string;
  issuer: string;
  trackSlug: string;
  level: CertificationLevel;
  description: string;
  officialUrl: string;
  costUsd: number;
  durationMinutes: number;
  questionCount: string;
  passingScore: string;
  validityYears: number;
  recommendedPrepWeeks: number;
  skillsAssessed: string[];
  domains: ExamDomain[];
  officialFreeStudyGuideUrl?: string;
  isHighValueForFreshers: boolean;
}

export type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site';
export type JobType = 'Full-time' | 'Internship' | 'Contract' | 'Apprenticeship';
export type ExperienceLevel =
  | 'Internship'
  | 'Fresher (0–1 Years)'
  | 'Early Career (1–3 Years)'
  | 'Experienced (3+ Years)';

export interface JobOpportunity {
  id: string;
  _id?: string;
  title: string;
  company: string;
  companyLogo?: string;
  trackSlug: string;
  jobType: JobType;
  workplaceType: WorkplaceType;
  location: string;
  experienceLevel: ExperienceLevel;
  salaryRange: string;
  eligibility: string;
  batchesEligible?: string[];
  requiredSkills: string[];
  overview: string;
  responsibilities: string[];
  selectionProcess?: string[];
  deadline?: string | null;
  directApplyUrl: string;
  isVerified: boolean;
  isActive: boolean;
  sourceNote?: string;
  postedDate?: string;
}

export type ApplicationStatus =
  | 'Wishlist'
  | 'Applied'
  | 'Online Assessment'
  | 'Technical Interview'
  | 'HR Round'
  | 'Offered'
  | 'Rejected';

export interface UserJobApplication {
  id: string;
  jobId?: string;
  title: string;
  company: string;
  location: string;
  workplaceType: WorkplaceType;
  status: ApplicationStatus;
  appliedDate: string;
  deadline?: string;
  directApplyUrl?: string;
  notes?: string;
  updatedAt?: string;
}

export interface OpportunityBookmark {
  itemId: string;
  itemType: 'job' | 'project' | 'resource' | 'certification';
  title: string;
  trackSlug: string;
  bookmarkedAt: string;
}

export * from './assessment';
export * from './interview';
