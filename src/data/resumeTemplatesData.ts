import { ResumeProfile } from '../types/placement';

export const actionVerbsDictionary = {
  technical: [
    'architected', 'engineered', 'implemented', 'refactored', 'deployed',
    'configured', 'integrated', 'constructed', 'programmed', 'automated'
  ],
  optimization: [
    'accelerated', 'optimized', 'reduced', 'streamlined', 'enhanced',
    'boosted', 'scaled', 'mitigated', 'consolidated', 'maximized'
  ],
  leadership: [
    'spearheaded', 'orchestrated', 'guided', 'mentored', 'championed',
    'coordinated', 'directed', 'facilitated', 'drove', 'established'
  ],
  delivery: [
    'delivered', 'shipped', 'launched', 'published', 'executed',
    'authored', 'designed', 'resolved', 'pioneered', 'standardized'
  ]
};

export const highValueTechKeywords = [
  // Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'HTML5', 'CSS3',
  // Frameworks
  'React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Redux', 'Spring Boot', 'FastAPI',
  // Databases & Cloud
  'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'Firebase',
  // Tools & Principles
  'Git', 'GitHub Actions', 'REST APIs', 'GraphQL', 'CI/CD', 'Microservices', 'Unit Testing', 'Jest', 'Agile/Scrum', 'Linux'
];

export const sampleStarterResume: ResumeProfile = {
  id: 'resume-sample-1',
  title: 'Full Stack Developer Resume (Targeting 85+ ATS Score)',
  lastUpdated: new Date().toISOString(),
  templateId: 'modern-tech',
  personalInfo: {
    fullName: 'Aarav Sharma',
    title: 'Full Stack Software Engineer',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    linkedin: 'linkedin.com/in/aarav-sharma-dev',
    github: 'github.com/aaravsharma',
    portfolio: 'aaravsharma.dev'
  },
  summary: 'Results-driven Full Stack Software Engineer with deep expertise in TypeScript, React, Node.js, and PostgreSQL. Proven track record of architecting scalable web applications, reducing API response latency by 35%, and maintaining 99.9% uptime. Passionate about clean code, test-driven development, and microservices.',
  skills: {
    languages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'SQL (PostgreSQL, MySQL)'],
    frameworks: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Redux Toolkit'],
    databasesAndCloud: ['PostgreSQL', 'MongoDB Atlas', 'Redis', 'AWS (S3, EC2)', 'Firebase'],
    toolsAndDevops: ['Git', 'GitHub Actions CI/CD', 'Docker', 'Jest', 'Postman', 'Webpack/Vite'],
    softSkills: ['Agile / Scrum', 'Technical Writing', 'Cross-functional Collaboration', 'Problem Solving']
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Full Stack Developer Intern',
      company: 'TechNovation Labs',
      location: 'Bengaluru, India',
      startDate: 'Jan 2025',
      endDate: 'Jun 2025',
      isCurrent: false,
      highlights: [
        'Architected and deployed responsive React/Node.js client portal serving 12,000+ monthly active users, improving page load speed by 42%.',
        'Implemented database indexing and query optimizations in PostgreSQL, reducing average query response time from 380ms to 95ms.',
        'Engineered secure JWT authentication and OAuth2 login workflows with automated refresh token rotation.',
        'Configured automated CI/CD pipelines using GitHub Actions, reducing deployment cycle time by 60%.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'PrepPilot — Placement Intelligence Platform',
      techStack: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      liveUrl: 'https://preppilot.demo.app',
      githubUrl: 'https://github.com/aaravsharma/preppilot',
      description: 'Comprehensive placement readiness portal featuring LeetCode-style code arena and AI-powered ATS resume analyzer.',
      highlights: [
        'Built LeetCode-inspired IDE using Monaco Editor supporting syntax highlighting and isolated sandboxed execution across 5 programming languages.',
        'Designed an explainable ATS resume scoring engine analyzing keyword density, action verbs, and section completeness across 500+ candidate benchmarks.',
        'Integrated Web Speech API for real-time interview transcription and speech clarity analytics.'
      ]
    },
    {
      id: 'proj-2',
      title: 'Distributed Real-Time Task Orchestrator',
      techStack: ['Node.js', 'Redis', 'Docker', 'WebSockets'],
      liveUrl: 'https://orchestrator-demo.io',
      githubUrl: 'https://github.com/aaravsharma/task-orchestrator',
      description: 'Fault-tolerant background job queue processing asynchronous events.',
      highlights: [
        'Implemented Redis BullMQ task queues sustaining 1,500 operations per second with automatic exponential-backoff retries.',
        'Achieved sub-50ms WebSocket broadcast latency for real-time dashboard notifications.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      institution: 'National Institute of Technology',
      location: 'India',
      startDate: '2021',
      endDate: '2025',
      grade: 'CGPA: 8.8 / 10.0'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      date: '2024'
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      date: '2024'
    }
  ],
  achievements: [
    'Secured Global Rank 412 out of 22,000+ participants in LeetCode Biweekly Contest.',
    'Finalist in Smart India Hackathon (SIH) 2024 out of 1,200 participating collegiate teams.',
    'Solved 450+ Data Structures & Algorithms problems across LeetCode and GeeksforGeeks.'
  ]
};
