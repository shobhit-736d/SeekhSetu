import { HrQuestion } from '../types/placement';

export const elevatorPitchFrameworks = [
  {
    id: 'pitch-fresher-60s',
    title: 'Fresher Software Engineer Pitch (60 Seconds)',
    targetRole: 'Full Stack Developer / SDE Associate',
    targetDuration: 60,
    structure: [
      {
        section: '1. Greeting & Identity (10s)',
        content: '"Hi [Interviewer Name], thank you for having me. My name is [Your Name], and I am a final-year Computer Science graduate from [Your College]."'
      },
      {
        section: '2. Core Technical Strengths (20s)',
        content: '"I specialize in full-stack web development with a strong foundation in JavaScript, React, Node.js, and relational databases. Over the last two years, I have built real-world applications focusing on clean code, responsive UX, and optimized database queries."'
      },
      {
        section: '3. Flagship Project Highlight (20s)',
        content: '"Most recently, I architected [Project Name], an e-commerce platform with real-time inventory tracking. I implemented JWT authentication, reduced query latency by 35% using database indexing, and integrated payment gateways."'
      },
      {
        section: '4. Alignment & Closing (10s)',
        content: '"I am eager to bring my problem-solving mindset and passion for scalable engineering to [Company Name], where I can contribute to high-impact products while growing with your engineering team."'
      }
    ],
    fillerWords: ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'sort of', 'kind of'],
    keyElementsToCheck: [
      'Name and educational background',
      'Primary tech stack explicitly stated',
      'At least one quantified project outcome',
      'Clear enthusiasm for the target company'
    ]
  },
  {
    id: 'pitch-lateral-90s',
    title: 'Lateral / Experienced Developer Pitch (90 Seconds)',
    targetRole: 'SDE-1 / Associate Engineer',
    targetDuration: 90,
    structure: [
      {
        section: '1. Career Snapshot (20s)',
        content: '"I am a Full Stack Developer with experience engineering scalable web applications. My core expertise is in TypeScript, Node.js, React, and PostgreSQL, with a continuous focus on API reliability and CI/CD automation."'
      },
      {
        section: '2. Professional Impact (35s)',
        content: '"In my recent role/internship, I spearheaded the refactoring of our core customer dashboard, migrating monolithic endpoints into decoupled microservices that handled 50,000+ daily requests with 99.9% uptime. I also implemented Redis caching that cut P95 response times from 420ms down to 85ms."'
      },
      {
        section: '3. Problem-Solving Methodology (20s)',
        content: '"What differentiates my workflow is thorough test coverage—writing robust unit and integration tests—alongside clean documentation and agile collaboration."'
      },
      {
        section: '4. Next Career Step (15s)',
        content: '"I am excited about this opportunity at [Company Name] because your team tackles large-scale distributed challenges where I can leverage my backend performance optimization skills."'
      }
    ],
    fillerWords: ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'sort of', 'kind of'],
    keyElementsToCheck: [
      'Concrete metrics (uptime, latency, users)',
      'Backend & architectural depth',
      'System design / testing philosophy',
      'Company alignment'
    ]
  }
];

export const starMethodTemplates = [
  {
    id: 'star-1',
    prompt: 'Tell me about a time you resolved a critical technical bug under pressure.',
    category: 'Technical Problem Solving',
    guide: {
      situation: 'Describe the context: What system was broken? What was the business impact and deadline?',
      task: 'Define your personal responsibility: What were you tasked to solve?',
      action: 'Detail the concrete steps: How did you diagnose the bug? What profiling, logging, or tools did you use?',
      result: 'Quantify the outcome: What was fixed? What metric improved? What post-mortem measure prevented recurrence?'
    },
    sampleModelAnswer: {
      situation: 'During our final semester capstone launch, our team noticed memory leaks crashing our Node.js backend server whenever more than 150 concurrent WebSocket users joined.',
      task: 'As the lead backend developer, I was responsible for identifying the bottleneck and stabilizing the server within 24 hours prior to our live jury evaluation.',
      action: 'I used Node.js heap snapshots via Chrome DevTools and Clinic.js to profile memory usage. I discovered that un-removed event listeners inside our chat subscription handler were retaining socket references in memory. I refactored the socket teardown handler to clean up listeners on client disconnect and implemented connection pooling.',
      result: 'Memory consumption stabilized from 1.4 GB back to a baseline of 110 MB under peak load, enabling the system to sustain 500+ simulated concurrent connections with zero crashes.'
    }
  },
  {
    id: 'star-2',
    prompt: 'Describe a situation where you had a disagreement with a team member and how you handled it.',
    category: 'Collaboration & Conflict Resolution',
    guide: {
      situation: 'Describe the project, team dynamic, and the specific disagreement.',
      task: 'What was your objective while preserving teamwork and project velocity?',
      action: 'What objective criteria or proof of concept did you use to reach consensus?',
      result: 'How did the project turn out and what did both of you learn?'
    },
    sampleModelAnswer: {
      situation: 'While building a college club management portal, a fellow developer insisted on storing complex JSON documents in MongoDB, whereas I advocated for PostgreSQL because our schema had strict relational constraints between members, events, and dues.',
      task: 'My goal was to prevent schema drift and data corruption while avoiding friction and respecting my colleague’s input.',
      action: 'Instead of debating opinion, I created a quick benchmark script modeling our anticipated join queries and transactional dues payments. We sat down together, analyzed ACID compliance requirements for financial transactions, and agreed that PostgreSQL provided the foreign key safety we needed.',
      result: 'We successfully delivered the project on schedule with zero relational inconsistencies, and my teammate appreciated the data-driven approach, which strengthened our collaboration.'
    }
  }
];

export const topHrQuestionsBank: HrQuestion[] = [
  {
    id: 'hr-1',
    question: 'Why should we hire you over other candidates?',
    intent: 'Testing self-awareness, confidence without arrogance, and specific value proposition.',
    modelAnswer: 'You should hire me because I combine solid computer science fundamentals with an execution-driven mindset. Beyond knowing data structures and writing code, I care deeply about building production-grade software that solves real business problems. During my projects, I have demonstrated the ability to self-learn new frameworks quickly, debug complex issues under tight deadlines, and communicate clearly across team members. I am eager to hit the ground running and contribute directly to your team’s delivery goals.',
    framework: [
      'Acknowledge strong competition respectfully',
      'Highlight 2-3 unique strengths (fundamentals + execution + adaptability)',
      'Tie back to company value and immediate contribution'
    ],
    dosAndDonts: {
      dos: [
        'Mention proven willingness to learn and adapt',
        'Tie your technical skills to business outcomes',
        'Demonstrate genuine enthusiasm for the role'
      ],
      donts: [
        'Do not put down other candidates',
        'Avoid generic clichés like "I am a hard worker" without examples',
        'Do not sound entitled or arrogant'
      ]
    },
    sampleFollowUps: [
      'What is one technical area where you feel you need improvement?',
      'How do you stay updated with emerging technologies?'
    ]
  },
  {
    id: 'hr-2',
    question: 'Where do you see yourself in 3 to 5 years?',
    intent: 'Checking ambition, career commitment, and whether you are likely to stay or jump ship immediately.',
    modelAnswer: 'In the next 3 to 5 years, I see myself growing into a Senior Full Stack Engineer who is trusted to take ownership of complex technical architectures from conception to deployment. In the first 1-2 years, my priority is mastering your tech stack, delivering high-velocity features, and understanding your product domain. By year 3 to 5, I aim to mentor junior developers, drive architectural decisions, and help design scalable systems that support company expansion.',
    framework: [
      'Years 1-2: Technical mastery, delivery excellence, domain understanding',
      'Years 3-5: System architecture ownership, mentorship, cross-team impact'
    ],
    dosAndDonts: {
      dos: [
        'Demonstrate realistic professional progression',
        'Show commitment to learning the company’s business domain',
        'Express interest in technical leadership and mentorship'
      ],
      donts: [
        'Do not say "I want to start my own startup in 2 years"',
        'Do not give vague answers like "I have not thought about it"',
        'Do not sound solely focused on job titles rather than skills'
      ]
    },
    sampleFollowUps: [
      'Are you interested in managerial roles or the individual contributor technical track?'
    ]
  },
  {
    id: 'hr-3',
    question: 'Tell me about a time you failed and what you learned from it.',
    intent: 'Assessing accountability, emotional resilience, and growth mindset.',
    modelAnswer: 'In my third semester, I was responsible for submitting our team’s automated test suite for a campus hackathon project. I underestimated the time needed for edge-case test fixtures and pushed untested code an hour before the deadline, which broke the CI pipeline. I immediately took full ownership, communicated transparently with my team, and stayed up to revert and patch the failing assertions. From that experience, I learned the critical discipline of test-driven development and never skipping continuous integration checks before merging.',
    framework: [
      'Admit a genuine failure without blaming external factors',
      'Explain immediate corrective action taken',
      'Share the lasting lesson that permanently improved your workflow'
    ],
    dosAndDonts: {
      dos: [
        'Pick a genuine failure with a positive learning trajectory',
        'Take personal responsibility',
        'Highlight the systematic habit you adopted as a result'
      ],
      donts: [
        'Do not claim "I have never failed"',
        'Do not blame teammates, professors, or managers',
        'Avoid catastrophic failures that demonstrate negligence'
      ]
    },
    sampleFollowUps: [
      'How do you handle deadlines when unforeseen bugs arise?'
    ]
  }
];

export const groupDiscussionTopics = [
  {
    id: 'gd-1',
    topic: 'Will Generative AI Replace Junior Developers or Empower Them?',
    category: 'Technology & Future of Work',
    overview: 'As AI copilots and automated code generation tools evolve, industry leaders debate whether entry-level developer positions will diminish or transform into higher-leverage architecture roles.',
    pros: [
      'AI acts as a personalized tutor, accelerating learning curves for syntax and boilerplate.',
      'Developers can shift focus from mundane code typing to higher-order system design and security.',
      'Productivity leaps allow small teams to ship complete products faster.'
    ],
    cons: [
      'Over-reliance on AI can hinder deep foundational problem-solving and algorithmic debugging skills.',
      'Junior candidates may struggle to identify subtle hallucinated security vulnerabilities.',
      'Entry-level job openings may consolidate as senior engineers become 3x more productive.'
    ],
    openingRemarks: '"Good morning everyone. The discussion on whether Generative AI will replace or empower junior software engineers is at the forefront of the tech industry today. In my view, AI does not replace programmers; rather, engineers who leverage AI effectively will replace those who do not..."',
    closingRemarks: '"To conclude, our group broadly agrees that while Generative AI automates repetitive boilerplate, fundamental engineering judgement—architectural design, business logic, and security verification—remains quintessentially human. Junior developers who cultivate strong fundamentals alongside AI tool fluency will thrive."'
  },
  {
    id: 'gd-2',
    topic: 'Work From Home (Remote) vs Office (Hybrid): What Is the Optimal Model for Tech Freshers?',
    category: 'Workplace Culture & Productivity',
    overview: 'Balancing flexibility with accelerated in-person mentorship, pair-programming, and company cultural assimilation for campus hires.',
    pros: [
      'Eliminates exhausting daily commutes, saving 2-3 hours daily for continuous upskilling.',
      'Access to global employment opportunities regardless of geographic location.',
      'Focus-intensive coding tasks often benefit from quiet home environments.'
    ],
    cons: [
      'Spontaneous learning and "hallway conversations" with senior architects are harder to replicate over Slack.',
      'Risk of isolation and delayed onboarding feedback for fresh graduates.',
      'Blurry boundaries between work and personal life leading to digital burnout.'
    ],
    openingRemarks: '"Hello team. As we debate remote versus in-office models, it is crucial to recognize that the needs of fresh college graduates transitioning to corporate life are distinctly different from experienced staff..."',
    closingRemarks: '"In conclusion, our consensus favors a structured Hybrid model—3 days in-office for mentorship and collaborative sprint planning, combined with 2 days remote for heads-down coding."'
  }
];

export const emailWritingExercises = [
  {
    id: 'email-1',
    scenario: 'Post-Interview Thank You & Follow-Up Note',
    prompt: 'You recently completed a technical interview for an Associate Software Engineer role at a top tech company. Draft a professional, courteous thank-you email to your interviewer recapping key discussions and reiterating your enthusiasm.',
    sampleSubject: 'Thank you for the interview — Associate Software Engineer role [Your Name]',
    modelTemplate: `Dear [Interviewer Name],

Thank you very much for taking the time to speak with me today regarding the Associate Software Engineer opportunity at [Company Name].

I thoroughly enjoyed our conversation, especially our discussion around [specific topic discussed, e.g., your team's migration to event-driven microservices / optimization of React render cycles]. It reinforced my excitement about the innovative work your engineering team is driving.

I am confident that my strong foundations in [Your Tech Stack] and my dedication to high-quality code would allow me to contribute meaningfully to [Company Name].

Please let me know if you need any additional code samples or references from my end. I look forward to hearing about the next steps.

Warm regards,
[Your Name]
[Your Phone Number] | [LinkedIn Profile Link]`,
    evaluationCriteria: [
      'Clear, professional subject line including candidate name and role',
      'Personalized reference to a specific discussion topic from the interview',
      'Concise expression of value and gratitude without being overly informal',
      'Professional sign-off and contact details'
    ]
  },
  {
    id: 'email-2',
    scenario: 'Professional Sprint Delay Escalation',
    prompt: 'You are working on an API integration task in a sprint. Due to third-party API rate limits and unexpected schema changes, your task will be delayed by 2 days. Write a professional update email to your Engineering Manager.',
    sampleSubject: 'Sprint Update: Blockers on Payment API Integration & Revised Timeline',
    modelTemplate: `Hi [Manager Name],

I am writing to provide an important update regarding the Payment Gateway integration task (TICKET-402) scheduled for completion by this Wednesday.

Due to unforeseen schema changes introduced in the third-party provider's v2 endpoint and intermittent sandbox rate limits, I anticipate a 48-hour delay. The revised delivery date is now Friday at 4 PM.

Steps I have taken to mitigate this:
1. Implemented a local mock server to unblock frontend teammates while the live sandbox syncs.
2. Escalated the rate-limiting ticket with the provider's technical support team (Case #8921).

I will share an update in tomorrow morning's standup. Please let me know if you would like me to adjust task priorities to minimize overall sprint impact.

Best regards,
[Your Name]
Software Engineer Intern / Associate`,
    evaluationCriteria: [
      'Direct, non-defensive explanation of the technical blocker',
      'Concrete revised timeline provided upfront',
      'Proactive mitigation steps already executed',
      'Offers alternative priority adjustments'
    ]
  }
];
