// src/data/jobReadinessData.ts
// Comprehensive multi-track job readiness, portfolio blueprints, and LinkedIn optimization

export interface TrackPortfolioGuide {
  trackSlug: string;
  trackTitle: string;
  recommendedProjectTypes: string[];
  readmeTemplate: string;
  keyRepoElements: string[];
  recommendedDeploymentPlatforms: string[];
  codeQualityChecklist: string[];
}

export interface LinkedInTemplate {
  category: string;
  title: string;
  headlineFormula: string;
  exampleHeadline: string;
  outreachTemplate: string;
  keySectionsAdvice: string[];
}

export const trackPortfolioGuides: Record<string, TrackPortfolioGuide> = {
  'fullstack-web': {
    trackSlug: 'fullstack-web',
    trackTitle: 'Full Stack Web Development',
    recommendedProjectTypes: [
      'Multi-tenant SaaS with Authentication & Stripe billing',
      'Real-time Collaborative Workspace with WebSockets',
      'High-throughput E-Commerce Engine with Redis caching'
    ],
    readmeTemplate: `# Project Title
> High-performance full-stack web application built with Next.js 14, Node.js, and PostgreSQL.

## 🚀 Live Demo & Deployment
- **Live URL:** [https://my-app.vercel.app](https://my-app.vercel.app)
- **API Documentation:** [https://my-app.vercel.app/docs](https://my-app.vercel.app/docs)

## 🛠️ Architecture & Tech Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS, TanStack Query
- **Backend:** Node.js, Express, Prisma ORM, Redis (BullMQ queues)
- **Database:** PostgreSQL (Supabase / RDS)
- **Authentication:** JWT with HTTP-only refresh tokens & RBAC

## ⚡ Key Engineering Highlights
- Optimized database queries with composite B-tree indexes, reducing p95 latency from 450ms to 68ms.
- Implemented rate limiting and CSRF protection to handle 1,000+ req/sec.`,
    keyRepoElements: [
      'Clean directory layout (client/ and server/ or Next.js App Router)',
      'Automated CI/CD pipeline using GitHub Actions (lint, test, build)',
      'Docker Compose file for one-command local reproduction',
      'Comprehensive unit & integration test coverage (Jest / Vitest)',
      'High-quality animated GIF or live screenshot demonstrating key flows'
    ],
    recommendedDeploymentPlatforms: ['Vercel', 'Render', 'Railway', 'AWS ECS / Amplify'],
    codeQualityChecklist: [
      'Zero secrets or API keys in git history (use .env.example)',
      'Strict TypeScript configuration with zero `any` types',
      'Consistent code formatting with ESLint & Prettier',
      'Semantic commit messages (feat:, fix:, docs:, chore:)'
    ]
  },
  'ai-ml': {
    trackSlug: 'ai-ml',
    trackTitle: 'AI & Machine Learning Engineering',
    recommendedProjectTypes: [
      'RAG (Retrieval-Augmented Generation) Pipeline with Vector Database',
      'Computer Vision Edge Classifier with TensorRT optimization',
      'Production MLOps Pipeline with MLflow & DVC model versioning'
    ],
    readmeTemplate: `# Model/Pipeline Title
> End-to-end Machine Learning pipeline with real-time inference API and model drift monitoring.

## 📊 Dataset & Benchmark Results
- **Dataset:** 50,000 annotated enterprise records
- **Evaluation Metrics:** Precision: 94.2%, Recall: 92.8%, F1-Score: 93.5%
- **Inference Latency:** 22ms per batch on NVIDIA T4

## 🧠 Model Architecture & Stack
- **Core Frameworks:** PyTorch 2.3, HuggingFace Transformers, LangChain
- **Vector Index:** Qdrant / Pinecone
- **Serving:** FastAPI, Triton Inference Server, Docker`,
    keyRepoElements: [
      'Jupyter Notebooks cleanly organized in notebooks/ with exported findings',
      'Reproducible environment (environment.yml or poetry.lock)',
      'Data versioning configuration with DVC or HuggingFace Datasets',
      'FastAPI serving wrapper with Swagger interactive documentation',
      'Confusion matrix and training loss/validation curves embedded in README'
    ],
    recommendedDeploymentPlatforms: ['Hugging Face Spaces', 'Modal', 'AWS SageMaker', 'GCP Vertex AI'],
    codeQualityChecklist: [
      'Deterministic random seeds set across PyTorch and NumPy',
      'Type annotations and docstrings for all mathematical algorithms',
      'Proper test harness for input schema validation (Pydantic)'
    ]
  },
  'cloud-computing': {
    trackSlug: 'cloud-computing',
    trackTitle: 'Cloud Computing & Infrastructure',
    recommendedProjectTypes: [
      'Multi-Tier Resilient AWS Architecture with Terraform IaC',
      'Serverless Event-Driven Microservices with AWS Lambda & SQS',
      'Cross-Cloud Multi-Region Disaster Recovery Automation'
    ],
    readmeTemplate: `# Infrastructure As Code (Terraform)
> Production-grade, highly available multi-AZ cloud infrastructure deployed via Terraform.

## 🏛️ Architecture Overview
- **VPC Design:** 2 Public Subnets (NAT Gateway, ALB), 2 Private Subnets (ECS Tasks), 2 Database Subnets (RDS Multi-AZ).
- **Security:** Strict IAM least-privilege roles, KMS customer-managed keys, AWS WAF.
- **Monitoring:** CloudWatch metric alarms with SNS notification webhooks.`,
    keyRepoElements: [
      'Modular Terraform structure (modules/vpc, modules/ecs, modules/rds)',
      'Architecture diagram created with diagrams.net or Cloudcraft',
      'Cost estimation breakdown via Infracost',
      'GitHub Actions workflow with terraform fmt, validate, and tflint'
    ],
    recommendedDeploymentPlatforms: ['AWS (Terraform Cloud)', 'GCP Cloud Build', 'Azure DevOps'],
    codeQualityChecklist: [
      'No hardcoded AWS credentials or account IDs',
      'Remote state backend with S3 and DynamoDB state locking',
      'Security compliance checks with tfsec or checkov'
    ]
  },
  'cybersecurity': {
    trackSlug: 'cybersecurity',
    trackTitle: 'Cybersecurity & Defense',
    recommendedProjectTypes: [
      'Automated Vulnerability Scanner & Report Generator',
      'SIEM Threat Detection Lab with Suricata & Elastic Stack',
      'Secure Authentication Proxy with Zero Trust MFA'
    ],
    readmeTemplate: `# Security Lab / Tool Title
> Automated network vulnerability assessment and telemetry log analyzer.

## 🛡️ Scope & Attack Vectors Tested
- OWASP Top 10 web vulnerabilities (SQLi, XSS, SSRF, Broken Object Level Auth)
- Network port scan detection and automated iptables blacklisting
- Threat intelligence feed aggregation via MISP APIs`,
    keyRepoElements: [
      'Detailed ethical hacking disclaimer and legal notice',
      'Mitre ATT&CK matrix technique mapping (T1190, T1059)',
      'Sample sanitized incident response report PDF',
      'Setup scripts for isolated Docker virtual network sandbox'
    ],
    recommendedDeploymentPlatforms: ['Local Sandbox (Proxmox/VirtualBox)', 'AWS Kali Linux AMI', 'DigitalOcean Private VPC'],
    codeQualityChecklist: [
      'Never commit live credentials, exploits, or proprietary payloads',
      'Include safe mock targets for demonstration testing',
      'Code linted with Bandit (Python security linter)'
    ]
  },
  'default': {
    trackSlug: 'general-tech',
    trackTitle: 'General Engineering Track',
    recommendedProjectTypes: [
      'Full-featured Domain-Specific Application with Real User Value',
      'Open Source Tool / CLI Utility published to NPM or PyPI',
      'Performance Benchmarked System with Quantified Metrics'
    ],
    readmeTemplate: `# Project Name
> Clear one-sentence summary of the problem this software solves.

## 🚀 Live Demo & Documentation
- **Demo Link:** [https://demo.example.com](https://demo.example.com)

## 📦 Features & Architecture
- Modular codebase with separated concerns and high test coverage.
- Thorough documentation for setup, configuration, and API usage.`,
    keyRepoElements: [
      'Clean README with problem statement, architecture, and live links',
      'License file (MIT / Apache 2.0)',
      'Automated test suite with passing status badge',
      'Contributing guidelines (CONTRIBUTING.md)'
    ],
    recommendedDeploymentPlatforms: ['Vercel', 'Render', 'GitHub Pages', 'AWS Free Tier'],
    codeQualityChecklist: [
      'Clean git commit history with meaningful messages',
      'Zero secrets or environment variables committed',
      'Responsive design and cross-platform compatibility'
    ]
  }
};

export const getPortfolioGuideByTrack = (trackSlug: string): TrackPortfolioGuide => {
  return trackPortfolioGuides[trackSlug] || trackPortfolioGuides['default'];
};

export const linkedInPlaybookTemplates: LinkedInTemplate[] = [
  {
    category: 'Technical Headline Formulas',
    title: 'Recruiter-Optimized Engineering Headline',
    headlineFormula: '[Target Role] | [Core Technologies] | [Key Engineering Value Proposition / Achievement]',
    exampleHeadline: 'Full Stack Software Engineer | React, TypeScript, Node.js, PostgreSQL | Built Scalable SaaS Platform Handling 50K+ Monthly Requests | Seeking SDE-1 / Graduate Trainee Opportunities',
    outreachTemplate: `Hi [Recruiter/Engineering Manager Name],

I noticed [Company] is expanding its [Engineering/Platform] team and hiring for [Target Role/Campus Drive].

As an engineer specializing in [Your Core Tech Stack, e.g. TypeScript, React, and distributed Node.js APIs], I recently developed [Project Name], which [mention quantifiable metric, e.g. reduced query latency by 35% with Redis caching].

I would love to learn more about the engineering challenges your team is solving. My portfolio and code repositories are available at [Your Portfolio / GitHub URL].

Thank you for your time and consideration!

Best regards,
[Your Name]`,
    keySectionsAdvice: [
      'Turn on "Open to Work" with visibility set to "Recruiters only" or public banner.',
      'Featured Section: Pin your best live project link with a high-res cover image and your ATS-optimized resume PDF.',
      'About Section: 3 concise paragraphs covering: (1) Technical Identity & Passion, (2) Key Engineering Projects & Technologies, (3) What you are currently building & looking for.',
      'Skills Section: Add top 10 verified skills matching your career track to rank in LinkedIn Recruiter search algorithms.'
    ]
  },
  {
    category: 'Cold Outreach To Tech Leads',
    title: 'Peer Engineering Connection Request',
    headlineFormula: '[Role Specialization] | [Specialized Tech, e.g. AWS & Terraform] | [Academic / Degree]',
    exampleHeadline: 'Cloud & DevOps Engineer | AWS, Kubernetes, Terraform, CI/CD | B.Tech Computer Science 2025',
    outreachTemplate: `Hi [Name],

I came across your work on [Company]'s cloud architecture and was really impressed by how your team manages [mention specific tech, e.g. multi-region Kubernetes clusters].

I'm an aspiring cloud engineer focused on IaC with Terraform and container orchestration. I recently published an open-source architecture simulating [mention project].

I would love to connect and follow your engineering insights!

Best,
[Your Name]`,
    keySectionsAdvice: [
      'Personalize every message with a reference to the company tech blog or recent feature.',
      'Keep connection requests under 300 characters to fit LinkedIn mobile prompt.',
      'Never ask for a job or referral in the very first message; build genuine technical rapport first.'
    ]
  }
];

export const trackSpecificKeywordsBank: Record<string, string[]> = {
  'fullstack-web': ['TypeScript', 'JavaScript', 'React', 'Node.js', 'Express', 'Next.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL', 'Tailwind CSS', 'Redux', 'Git', 'Docker', 'CI/CD'],
  'frontend': ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js', 'Redux', 'Webpack', 'Vite', 'Responsive Design', 'Web Performance', 'Jest', 'Accessibility (WCAG)'],
  'backend': ['Node.js', 'Express', 'Java', 'Python', 'Go', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Microservices', 'REST APIs', 'gRPC', 'Docker', 'Kafka', 'System Design'],
  'cloud-computing': ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes', 'IAM', 'VPC', 'S3', 'EC2', 'Lambda', 'CloudFormation', 'Linux', 'CI/CD'],
  'devops-sre': ['Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Prometheus', 'Grafana', 'Linux', 'Ansible', 'Helm', 'Bash', 'AWS'],
  'cybersecurity': ['Network Security', 'Penetration Testing', 'SIEM', 'Vulnerability Assessment', 'OWASP Top 10', 'Wireshark', 'Cryptography', 'Firewalls', 'Incident Response', 'Linux'],
  'ai-ml': ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Deep Learning', 'Computer Vision', 'NLP', 'Transformers', 'FastAPI', 'MLOps', 'Docker'],
  'data-analytics': ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel', 'Data Modeling', 'ETL', 'Pandas', 'Data Visualization', 'Statistics', 'Snowflake', 'Business Intelligence'],
  'data-science': ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'Statistical Modeling', 'Scikit-learn', 'Data Wrangling', 'Hypothesis Testing', 'Tableau'],
  'software-testing-qa': ['Selenium', 'Playwright', 'Cypress', 'Cucumber', 'Java', 'Python', 'Postman', 'TestNG', 'JUnit', 'API Testing', 'Automation Frameworks', 'Jira', 'CI/CD'],
  'ui-ux': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Information Architecture', 'Design Systems', 'Mobile App Design', 'WCAG Accessibility'],
  'java-enterprise': ['Java 21', 'Spring Boot', 'Spring Cloud', 'Hibernate', 'Microservices', 'REST APIs', 'PostgreSQL', 'Maven', 'Kafka', 'JUnit', 'Docker', 'Multithreading'],
  'python': ['Python 3', 'Django', 'FastAPI', 'Flask', 'PostgreSQL', 'Celery', 'Redis', 'Pytest', 'REST APIs', 'Docker', 'Asyncio', 'OOP'],
  'mobile-app': ['Flutter', 'React Native', 'Kotlin', 'Swift', 'iOS', 'Android', 'Dart', 'State Management', 'REST APIs', 'Firebase', 'App Store Deployment'],
  'networking-systems': ['TCP/IP', 'OSPF', 'BGP', 'VLANs', 'Cisco IOS', 'Network Automation', 'Python Scripting', 'Wireshark', 'Subnetting', 'Firewalls', 'Linux'],
  'systems-cpp': ['C++', 'Modern C++ (C++20)', 'Data Structures & Algorithms', 'Memory Management', 'Pointers', 'RAII', 'Multithreading', 'Linux', 'CMake', 'Valgrind', 'OOP']
};
