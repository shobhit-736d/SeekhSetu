import { JobOpportunity } from '../types/career';

export const jobListingsList: JobOpportunity[] = [
  // 1. TCS NEXTSTEP / NQT
  {
    id: 'job-tcs-ninja-digital',
    title: 'Graduate Trainee Engineer (Ninja & Digital Cadres)',
    company: 'Tata Consultancy Services (TCS)',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'fullstack-web',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Pan India (Bengaluru, Hyderabad, Pune, Mumbai, Chennai, Delhi NCR)',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹3.6–9.0 LPA (Ninja / Digital / Prime Cadres)',
    eligibility: 'B.Tech / B.E. / M.Tech / MCA / M.Sc from batches 2024, 2025 & 2026 with minimum 60% aggregate across academics.',
    batchesEligible: ['2024', '2025', '2026'],
    requiredSkills: ['Problem Solving', 'Data Structures & Algorithms', 'C / C++ / Java / Python', 'DBMS & SQL', 'Web Basics'],
    overview: 'TCS National Qualifier Test (NQT) and campus drives recruit fresh engineering graduates into Digital, Ninja, and Prime software development roles across cloud, backend, and enterprise digital solutions.',
    responsibilities: [
      'Design, develop, and maintain enterprise software components across global client engagements.',
      'Participate in agile sprints, write clean unit-tested code, and collaborate with QA and DevOps teams.',
      'Analyze business requirements and translate them into robust microservices and database queries.'
    ],
    selectionProcess: [
      'Online Cognitive & Technical Assessment (NQT Foundation + Advanced Sections)',
      'Technical Interview (Coding, Algorithms, OOP & Project Discussion)',
      'Managerial & HR Interview'
    ],
    deadline: '2026-12-31',
    directApplyUrl: 'https://nextstep.tcs.com/campus/#/',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official TCS NextStep Career Portal',
    postedDate: '2026-10-15'
  },

  // 2. INFOSYS SPECIALIST PROGRAMMER / DSE
  {
    id: 'job-infosys-dse',
    title: 'Digital Specialist Engineer (DSE) & Specialist Programmer (SP)',
    company: 'Infosys',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'backend',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Bengaluru, Hyderabad, Pune, Mysuru, Chandigarh',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹6.5–9.5 LPA (DSE) / ₹9.5–11.5 LPA (SP)',
    eligibility: 'B.E. / B.Tech / M.E. / M.Tech / MCA graduates with no active backlogs and passion for competitive programming.',
    batchesEligible: ['2025', '2026'],
    requiredSkills: ['Algorithms & Data Structures', 'Java / Python / C++', 'Dynamic Programming', 'SQL & Database Optimization'],
    overview: 'High-tier coding profile at Infosys focusing on high-complexity software engineering, distributed systems, algorithmic modeling, and modern cloud technologies.',
    responsibilities: [
      'Develop algorithmic cores and high-throughput backend services for cloud-native clients.',
      'Perform rigorous code reviews, automated unit testing, and architectural benchmarking.',
      'Implement data storage, caching layers, and asynchronous messaging pipelines.'
    ],
    selectionProcess: [
      'Round 1: Advanced Hands-on Coding Assessment (3 Algorithmic Problems)',
      'Round 2: Technical Deep-Dive Interview (DSA, System Principles, Academic Projects)',
      'Round 3: Behavioral & Culture Fit Discussion'
    ],
    deadline: '2026-11-30',
    directApplyUrl: 'https://career.infosys.com/joblist',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Infosys Career Portal',
    postedDate: '2026-10-10'
  },

  // 3. AMAZON SOFTWARE DEVELOPMENT ENGINEER INTERN
  {
    id: 'job-amazon-sde-intern',
    title: 'Software Development Engineer (SDE) Intern',
    company: 'Amazon',
    companyLogo: 'https://images.unsplash.com/photo-1523474253243-283a00d5a34e?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'fullstack-web',
    jobType: 'Internship',
    workplaceType: 'On-site',
    location: 'Bengaluru, Hyderabad, Chennai, Delhi NCR',
    experienceLevel: 'Internship',
    salaryRange: '₹80,000–1,10,000 / month Stipend (PPO to ₹28–45 LPA)',
    eligibility: 'Currently pursuing Bachelor or Master degree in Computer Science, Computer Engineering, or related technical discipline graduating in 2025 or 2026.',
    batchesEligible: ['2025', '2026'],
    requiredSkills: ['Data Structures & Algorithms', 'Java / C++ / Python', 'Object-Oriented Design', 'Time & Space Complexity Analysis'],
    overview: '6-month software development internship working directly with production Amazon teams building high-scale distributed systems and customer-facing features.',
    responsibilities: [
      'Collaborate with senior engineers to design, implement, test, and deploy software services.',
      'Write clean, robust, and maintainable production code following Amazon leadership principles.',
      'Participate in design reviews, operational excellence reviews, and bug triage.'
    ],
    selectionProcess: [
      'Online Coding Assessment (Debugging + 2 DSA Problems + Work Style Simulation)',
      'Technical Interview 1: Data Structures, Algorithms & Problem Solving',
      'Technical Interview 2: Algorithms, Problem Solving & Amazon Leadership Principles'
    ],
    deadline: '2026-11-15',
    directApplyUrl: 'https://www.amazon.jobs/en/job_categories/software-development',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Amazon Jobs Portal',
    postedDate: '2026-10-18'
  },

  // 4. MICROSOFT SOFTWARE ENGINEER (NEW GRADUATE)
  {
    id: 'job-microsoft-swe-newgrad',
    title: 'Software Engineer — University Graduate',
    company: 'Microsoft',
    companyLogo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'backend',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Hyderabad, Bengaluru, Noida',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹18–26 LPA Base + Stocks (CTC ₹40–50 LPA)',
    eligibility: 'Recent or upcoming graduate with a B.Tech / M.Tech in CS/IT or relevant technical field with consistent academic record.',
    batchesEligible: ['2025', '2026'],
    requiredSkills: ['Data Structures & Algorithms', 'C++ / C# / Java / Python', 'Distributed Systems', 'Computer Science Fundamentals'],
    overview: 'Join Microsoft engineering teams building global cloud services on Azure, Developer Tools, Windows, Office 365, or Security infrastructure.',
    responsibilities: [
      'Apply computer science principles to design, implement, and maintain scalable software components.',
      'Contribute to agile engineering workflows with automated test suites and continuous deployment.',
      'Collaborate cross-functionally with product managers and UX designers.'
    ],
    selectionProcess: [
      'Online Coding Assessment (Codility)',
      '3 to 4 Rounds of Technical Problem Solving, Live Coding & System Design Fundamentals'
    ],
    deadline: '2026-12-15',
    directApplyUrl: 'https://careers.microsoft.com/v2/global/en/home.html',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Microsoft Careers Portal',
    postedDate: '2026-10-12'
  },

  // 5. GOOGLE SOFTWARE ENGINEERING INTERN
  {
    id: 'job-google-intern',
    title: 'Software Engineering Intern — Summer 2026',
    company: 'Google',
    companyLogo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'systems-cpp',
    jobType: 'Internship',
    workplaceType: 'Hybrid',
    location: 'Bengaluru, Hyderabad',
    experienceLevel: 'Internship',
    salaryRange: '₹1,00,000–1,25,000 / month Stipend (PPO Available)',
    eligibility: 'Currently enrolled in an undergraduate or graduate degree in Computer Science or related technical field graduating between late 2026 and mid 2027.',
    batchesEligible: ['2026', '2027'],
    requiredSkills: ['C++ / Java / Python / Go', 'Algorithms & Data Structures', 'Complexity Analysis', 'Discrete Mathematics'],
    overview: 'Work on real-world engineering problems impacting billions of users across Search, Android, Cloud, YouTube, or Google Workspace.',
    responsibilities: [
      'Complete a technical project with assigned mentor and engineering team within 10–12 weeks.',
      'Participate in design docs, technical code reviews, and performance profiling.',
      'Present project outcomes to team stakeholders and engineering leadership.'
    ],
    selectionProcess: [
      'Resume Screening & Candidate Questionnaire',
      'Google Online Challenge (Coding & Problem Solving)',
      '2 Technical Phone / Google Meet Interviews (45 mins each focusing on DSA & Problem Solving)'
    ],
    deadline: '2026-11-20',
    directApplyUrl: 'https://www.google.com/about/careers/applications/jobs/results/',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Google Careers Portal',
    postedDate: '2026-10-19'
  },

  // 6. ACCENTURE ADVANCED APPLICATION ENGINEERING ANALYST
  {
    id: 'job-accenture-aase',
    title: 'Advanced Application Engineering Analyst (AASE)',
    company: 'Accenture',
    companyLogo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'cloud-computing',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Pan India (Bengaluru, Hyderabad, Pune, Gurgaon, Chennai, Kolkata)',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹6.5–8.5 LPA',
    eligibility: 'All branches of B.E./B.Tech/M.E./M.Tech/MCA/M.Sc (CS/IT) from 2024 & 2025 batches with min 65% aggregate.',
    batchesEligible: ['2024', '2025'],
    requiredSkills: ['Core Java / Python', 'Cloud Fundamentals (AWS/Azure)', 'SQL & RDBMS', 'Software Testing Basics', 'Aptitude & Verbal Skills'],
    overview: 'The AASE profile at Accenture works on modern application engineering, cloud migration, AI/ML integrations, and enterprise IT modernization projects.',
    responsibilities: [
      'Develop modern web applications and microservices using modern programming languages and cloud stacks.',
      'Participate in sprint planning, code reviews, and quality assurance cycles.',
      'Support cloud deployment and automated regression testing pipelines.'
    ],
    selectionProcess: [
      'Stage 1: Cognitive and Technical Assessment (Aptitude, Pseudocode, Common Applications)',
      'Stage 2: Hands-on Coding Assessment (2 Problems)',
      'Stage 3: Communication Assessment (Automated AI Voice Evaluation)',
      'Stage 4: Technical & HR Interview'
    ],
    deadline: '2026-12-20',
    directApplyUrl: 'https://www.accenture.com/in-en/careers/jobsearch',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Accenture Careers Portal',
    postedDate: '2026-10-16'
  },

  // 7. COGNIZANT GENC ELEVATE & PRO
  {
    id: 'job-cognizant-genc',
    title: 'Programmer Analyst Trainee (GenC Elevate & Pro)',
    company: 'Cognizant',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'java-enterprise',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Chennai, Bengaluru, Hyderabad, Coimbatore, Pune, Kolkata',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹4.5–6.75 LPA',
    eligibility: 'B.E./B.Tech/M.E./M.Tech/MCA/M.Sc (CS/IT/ECE) batches 2024 & 2025 with minimum 60% throughout academics.',
    batchesEligible: ['2024', '2025'],
    requiredSkills: ['Core Java & OOP', 'Spring Boot Basics', 'SQL / Relational Databases', 'Web Development Fundamentals', 'Data Structures'],
    overview: 'Cognizant GenC Elevate selects candidates with strong programming and full stack competencies for enterprise transformation projects.',
    responsibilities: [
      'Build scalable backend enterprise microservices using Java and Spring Boot.',
      'Write automated unit and integration tests and adhere to code quality metrics.',
      'Work alongside Scrum teams to deliver functional user stories within sprint milestones.'
    ],
    selectionProcess: [
      'Round 1: Skill-based Assessment (Technical MCQs + 2 Coding Problems)',
      'Round 2: Technical Interview (Core Java, Database Queries, System Concepts)',
      'Round 3: HR Discussion'
    ],
    deadline: '2026-12-10',
    directApplyUrl: 'https://careers.cognizant.com/global/en',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Cognizant Careers Portal',
    postedDate: '2026-10-14'
  },

  // 8. WIPRO ELITE NATIONAL TALENT HUNT
  {
    id: 'job-wipro-nth',
    title: 'Project Engineer (Elite National Talent Hunt)',
    company: 'Wipro',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'fullstack-web',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Bengaluru, Hyderabad, Chennai, Pune, Noida, Bhubaneswar',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹3.5–6.5 LPA (Elite / Turbo Cadres)',
    eligibility: 'B.E./B.Tech/5-year Integrated M.Tech (all engineering branches eligible) batches 2024 & 2025 with 60% or 6.0 CGPA.',
    batchesEligible: ['2024', '2025'],
    requiredSkills: ['Problem Solving', 'C++ / Java / Python', 'Basic Database Queries', 'Aptitude & Logical Reasoning'],
    overview: 'National recruitment initiative hiring engineering freshers into software engineering, cloud operations, and application maintenance roles.',
    responsibilities: [
      'Participate in project onboarding, requirement grooming, and technical architecture reviews.',
      'Develop, test, and debug software components in modern frameworks.',
      'Document architecture decisions and create automated test scripts.'
    ],
    selectionProcess: [
      'Online Assessment: Aptitude Test (Logical, Quantitative, English)',
      'Written Communication Test (Essay Writing)',
      'Online Coding Test (2 Coding Challenges in Java/C++/Python)',
      'Business Discussion & HR Review'
    ],
    deadline: '2026-12-25',
    directApplyUrl: 'https://careers.wipro.com/careers-home/',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Wipro Careers Portal',
    postedDate: '2026-10-15'
  },

  // 9. ADOBE INDIA SDE INTERN
  {
    id: 'job-adobe-sde-intern',
    title: 'Software Development Engineer Intern',
    company: 'Adobe',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'frontend',
    jobType: 'Internship',
    workplaceType: 'Hybrid',
    location: 'Noida, Bengaluru',
    experienceLevel: 'Internship',
    salaryRange: '₹1,00,000 / month Stipend (PPO to ₹35–44 LPA)',
    eligibility: 'B.Tech / Dual Degree students graduating in 2026 with strong CS fundamentals and passion for Creative Cloud / Document Cloud tools.',
    batchesEligible: ['2026'],
    requiredSkills: ['C++ / JavaScript / TypeScript', 'Data Structures & Algorithms', 'Web Standards (DOM, Canvas, WebGL)', 'Object-Oriented Design'],
    overview: 'Work with Adobe Photoshop Web, Acrobat Web, or Creative Cloud frontend performance teams building next-generation digital canvas engines.',
    responsibilities: [
      'Implement real-time collaborative canvas rendering and editing micro-interactions.',
      'Optimize WebAssembly / C++ / WebGL components inside modern browsers.',
      'Write automated unit and visual regression tests.'
    ],
    selectionProcess: [
      'Online Assessment (Technical & Algorithmic Problem Solving on HackerRank)',
      'Technical Interview 1: Data Structures, Algorithms & Memory Optimization',
      'Technical Interview 2: System Architecture & Web Performance',
      'Director / HR Round'
    ],
    deadline: '2026-11-25',
    directApplyUrl: 'https://adobe.wd5.myworkdayjobs.com/en-US/external_experienced',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Adobe Careers Portal',
    postedDate: '2026-10-18'
  },

  // 10. CISCO SYSTEMS GRADUATE ENGINEER
  {
    id: 'job-cisco-engineer',
    title: 'Consulting Engineer / Network Software Engineer',
    company: 'Cisco Systems',
    companyLogo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'networking-systems',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Bengaluru',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹14–18 LPA Base (CTC ₹20–24 LPA)',
    eligibility: 'B.E. / B.Tech in CS, IT, ECE, EEE from batch 2025 or 2026 with CGPA 7.0 or above.',
    batchesEligible: ['2025', '2026'],
    requiredSkills: ['Computer Networks (TCP/IP, OSPF, BGP)', 'Python Scripting & Network Automation', 'Linux Operating System', 'Basic C / C++'],
    overview: 'Design, configure, and automate large enterprise networks, data centers, and multi-cloud interconnect architectures.',
    responsibilities: [
      'Develop network automation scripts using Python, NETCONF, and REST APIs.',
      'Troubleshoot complex enterprise routing, switching, and cloud interconnect incidents.',
      'Collaborate with global service provider customers to architect secure network fabrics.'
    ],
    selectionProcess: [
      'Online Test: Network Concepts, Aptitude & 2 Coding Problems',
      'Technical Interview 1: Deep Networking Protocols & Python',
      'Technical Interview 2: Scenario Troubleshooting & System Design',
      'Managerial Interview'
    ],
    deadline: '2026-12-15',
    directApplyUrl: 'https://jobs.cisco.com/',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Cisco Careers Portal',
    postedDate: '2026-10-19'
  },

  // 11. IBM ASSOCIATE SYSTEM ENGINEER
  {
    id: 'job-ibm-ase',
    title: 'Associate System Engineer',
    company: 'IBM',
    companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'ai-ml',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Bengaluru, Hyderabad, Pune, Mumbai, Kochi, Ahmedabad',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹4.5–7.0 LPA',
    eligibility: 'B.E./B.Tech/M.E./M.Tech/MCA/M.Sc graduates from 2024 and 2025 batches with minimum 65% aggregate.',
    batchesEligible: ['2024', '2025'],
    requiredSkills: ['Python / Java', 'Linux / Unix Core', 'Data Science & Machine Learning Basics', 'SQL', 'Git'],
    overview: 'Work with IBM watsonx, enterprise hybrid cloud platforms, and data analytics pipelines for global clients.',
    responsibilities: [
      'Develop and integrate machine learning workflows and data transformation pipelines.',
      'Support cloud deployment on Red Hat OpenShift and IBM Cloud environments.',
      'Participate in agile sprints, bug fixes, and continuous testing.'
    ],
    selectionProcess: [
      'Online Coding Assessment & Cognitive Ability Test',
      'English Language Assessment',
      'Technical Interview',
      'HR Interview'
    ],
    deadline: '2026-12-28',
    directApplyUrl: 'https://www.ibm.com/careers/',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official IBM Careers Portal',
    postedDate: '2026-10-17'
  },

  // 12. CAPGEMINI EXCELLER RECRUITMENT
  {
    id: 'job-capgemini-exceller',
    title: 'Software Analyst / Senior Analyst (Exceller Drive)',
    company: 'Capgemini',
    companyLogo: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=120&h=120&q=80',
    trackSlug: 'software-testing-qa',
    jobType: 'Full-time',
    workplaceType: 'Hybrid',
    location: 'Pan India (Bengaluru, Pune, Mumbai, Hyderabad, Chennai, Noida, Kolkata)',
    experienceLevel: 'Fresher (0–1 Years)',
    salaryRange: '₹4.25–7.5 LPA',
    eligibility: 'B.E./B.Tech/MCA graduates from 2024 and 2025 batches with 60% or above in 10th, 12th, Diploma, and Graduation.',
    batchesEligible: ['2024', '2025'],
    requiredSkills: ['Core Java / Python', 'Software Testing Principles', 'SQL / Relational Databases', 'Pseudocode & Logical Aptitude'],
    overview: 'Capgemini Exceller hires talent for enterprise QA automation, software engineering, cloud testing, and full stack modernizations.',
    responsibilities: [
      'Build automated test scripts using Selenium / Playwright / Cucumber frameworks.',
      'Execute functional, regression, and performance test suites across client applications.',
      'Identify, document, and track software defects in Jira.'
    ],
    selectionProcess: [
      'Technical Assessment: Pseudocode, English & Behavioral Competencies',
      'Coding Challenge (2 Coding Questions)',
      'Spoken English Communication Assessment',
      'Technical & HR Interview'
    ],
    deadline: '2026-12-18',
    directApplyUrl: 'https://www.capgemini.com/in-en/careers/',
    isVerified: true,
    isActive: true,
    sourceNote: 'Official Capgemini Careers Portal',
    postedDate: '2026-10-15'
  }
];

export const getJobListingsByTrack = (trackSlug: string): JobOpportunity[] => {
  if (trackSlug === 'all') return jobListingsList;
  return jobListingsList.filter(j => j.trackSlug.toLowerCase() === trackSlug.toLowerCase());
};
