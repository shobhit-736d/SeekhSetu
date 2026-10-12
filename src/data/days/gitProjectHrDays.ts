import { StudyDay } from '../../types/roadmap';

export const gitProjectHrDays: StudyDay[] = [
  {
    dayNumber: 25,
    title: "Git Internals, Branching Workflows & Conflict Resolution",
    module: "git-testing",
    moduleName: "Git, Testing & DevOps",
    primaryObjective: "Master Git object database (Blobs, Trees, Commits, Annotated Tags), Merge vs Rebase, interactive rebase, cherry-pick, and resolving merge conflicts cleanly.",
    estimatedMinutes: 120,
    isSevenDayTrack: false,
    checklist: [
      "Understand Git object storage in .git/objects using SHA-1 / SHA-256 hashes",
      "Contrast 'git merge' (preserves history, creates merge commit) vs 'git rebase' (linear history)",
      "Squash messy commits with git rebase -i HEAD~N",
      "Safely recover lost commits using git reflog",
      "Set up pre-commit validation hooks with Husky and lint-staged"
    ],
    topics: [
      {
        id: "day25-topic1",
        title: "Git Merge vs Rebase & Reflog Recovery",
        durationMinutes: 40,
        summary: "Maintaining a clean team git history and recovering lost work with reflog.",
        definitions: [
          {
            term: "git rebase",
            explanation: "Re-applies commits from current branch onto top of another base tip, creating a clean linear project history."
          },
          {
            term: "git reflog",
            explanation: "Reference log recording every single time HEAD changed in local repository, allowing recovery of dropped commits."
          }
        ],
        codeExamples: [
          {
            language: "bash",
            title: "Interactive Rebase and Reflog Rescue",
            code: `# 1. Squash last 3 commits into 1 clean commit
git rebase -i HEAD~3
# In editor: pick first commit, squash (or s) the rest

# 2. Rescuing an accidental hard reset
git reset --hard HEAD~2 # Oops! Lost 2 commits
git reflog              # Find previous commit hash e.g. e4a9b1c
git checkout -b rescue-branch e4a9b1c # Recovered!`,
            output: "Commits safely restored"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d25-1",
            question: "When should you NOT use git rebase?",
            answer: "Never rebase commits that have already been pushed to a public/shared branch that other developers are actively branching from. Rebasing rewrites commit hashes, forcing collaborators to reconcile divergent duplicate histories.",
            keyPoints: ["The Golden Rule of Rebase: never rebase public shared history", "Rebasing creates new commit hashes", "Use rebase on private feature branches before merging"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d25-1",
            question: "Which command lists local HEAD pointer movements to help recover deleted commits?",
            options: ["git log --all", "git reflog", "git status --history", "git fsck"],
            correctAnswer: 1,
            explanation: "git reflog records every update to HEAD, providing an immutable safety net for recovering uncommitted or reset commits."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d25-1",
        question: "What is git cherry-pick used for?",
        options: [
          "Deleting untracked files",
          "Applying a specific commit from one branch onto your current branch",
          "Merging all branches simultaneously",
          "Pushing tags to remote repository"
        ],
        correctAnswer: 1,
        explanation: "git cherry-pick <commit-hash> applies the changes introduced by a specific existing commit onto the currently checked-out branch."
      }
    ]
  },
  {
    dayNumber: 26,
    title: "Automated Testing (Jest, RTL) & CI/CD Pipelines",
    module: "git-testing",
    moduleName: "Git, Testing & DevOps",
    primaryObjective: "Master Unit, Integration, and End-to-End testing testing pyramid, React Testing Library user-centric queries, Supertest API testing, and GitHub Actions CI pipelines.",
    estimatedMinutes: 140,
    isSevenDayTrack: true,
    checklist: [
      "Distinguish Unit vs Integration vs E2E tests in the Testing Pyramid",
      "Write RTL tests querying by accessible roles (getByRole, findByRole) rather than test IDs",
      "Mock API network calls using Mock Service Worker (MSW) or jest.mock",
      "Write Supertest integration tests for Express API endpoints",
      "Configure a GitHub Actions CI pipeline running lint, test, and build on pull requests"
    ],
    topics: [
      {
        id: "day26-topic1",
        title: "React Testing Library Guiding Principles",
        durationMinutes: 45,
        summary: "Testing software the way real users interact with it rather than testing implementation details.",
        definitions: [
          {
            term: "Accessible Query Priority",
            explanation: "1. getByRole, 2. getByLabelText, 3. getByPlaceholderText, 4. getByText, 5. getByTestId (only as last resort)."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Component Test with React Testing Library",
            code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments counter on button click', async () => {
  const user = userEvent.setup();
  render(<Counter initialCount={0} />);

  // Query by accessible role and accessible text
  const button = screen.getByRole('button', { name: /increment/i });
  const countDisplay = screen.getByText(/count: 0/i);

  expect(countDisplay).toBeInTheDocument();

  // Simulate user click
  await user.click(button);

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});`,
            output: "User-centric resilient test that survives refactors"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d26-1",
            question: "Why does React Testing Library discourage testing component state directly?",
            answer: "Testing implementation details (like internal state variable names) creates brittle tests that break when refactoring code even if the user experience remains identical. RTL tests user interactions (clicking buttons, typing into inputs) and observable UI outputs, ensuring confidence that the application works for actual users.",
            keyPoints: ["Avoid brittle tests that break on refactor", "Test what the user sees and interacts with", "Prioritize accessible roles and text"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d26-1",
            question: "Which query should you use in React Testing Library when waiting for an async element to appear?",
            options: ["getByRole", "queryByRole", "findByRole", "selectByRole"],
            correctAnswer: 2,
            explanation: "findBy* queries return a Promise that waits up to 1000ms for the element to appear in the DOM."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d26-1",
        question: "What is the primary benefit of a CI (Continuous Integration) pipeline?",
        options: [
          "It writes tests automatically",
          "It automatically runs linters, tests, and builds on code commits to catch bugs before merging into production",
          "It replaces the database",
          "It generates UI designs"
        ],
        correctAnswer: 1,
        explanation: "Continuous Integration automates code validation, ensuring that all proposed changes compile and pass tests before deployment."
      }
    ]
  },
  {
    dayNumber: 27,
    title: "Full-Stack System Architecture, Caching & Scalability",
    module: "projects",
    moduleName: "Full-Stack Projects & Architecture",
    primaryObjective: "Master web architecture, client-server models, HTTP caching (ETags, Cache-Control), Redis caching patterns (Cache-Aside), and horizontal vs vertical scalability.",
    estimatedMinutes: 145,
    isSevenDayTrack: false,
    checklist: [
      "Diagram 3-tier architecture: Presentation (Client), Application (API), Data (DB/Cache)",
      "Implement Cache-Aside pattern with Redis for database read offloading",
      "Configure HTTP response caching with Cache-Control: public, max-age, stale-while-revalidate",
      "Compare Vertical Scaling (Scale Up) vs Horizontal Scaling (Scale Out) with Load Balancers",
      "Explain Stateless Application design and session offloading to Redis"
    ],
    topics: [
      {
        id: "day27-topic1",
        title: "Redis Caching Strategies & HTTP Cache-Control",
        durationMinutes: 45,
        summary: "Accelerating response latencies from 200ms to 5ms with strategic caching tiers.",
        definitions: [
          {
            term: "Cache-Aside (Lazy Loading)",
            explanation: "Application checks cache first. On cache miss, reads from database, populates cache with TTL, and returns data."
          },
          {
            term: "stale-while-revalidate",
            explanation: "Client serves cached stale data immediately while asynchronously fetching fresh content in the background."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Cache-Aside Pattern with Redis in Express",
            code: `async function getProductById(productId) {
  const cacheKey = \`product:\${productId}\`;
  
  // 1. Check Redis cache
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData); // Cache hit!
  }

  // 2. Cache miss: Query primary SQL database
  const product = await db.query('SELECT * FROM products WHERE id = $1', [productId]);
  if (!product) return null;

  // 3. Store in Redis with 10-minute TTL (Time-To-Live)
  await redisClient.setEx(cacheKey, 600, JSON.stringify(product));
  return product;
}`,
            output: "High-speed caching with automatic expiration"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d27-1",
            question: "What is the Cache Stampede (Thundering Herd) problem and how do you prevent it?",
            answer: "When a heavily accessed cache key expires, thousands of concurrent requests all experience a cache miss simultaneously and hit the database at once, potentially crashing the database. It is prevented by: 1. Mutex locking (only one request queries DB and repopulates cache), 2. Probabilistic early expiration (XFetch), or 3. Background pre-warming before expiry.",
            keyPoints: ["Simultaneous cache misses overwhelm primary DB", "Happens on high-traffic expired keys", "Solve using mutex locks or background pre-warming"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d27-1",
            question: "Which Cache-Control header directive allows serving cached content while checking for updates asynchronously in the background?",
            options: ["no-cache", "stale-while-revalidate", "must-revalidate", "private"],
            correctAnswer: 1,
            explanation: "stale-while-revalidate instructs the client or CDN to serve stale content instantly while updating the cache in the background."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d27-1",
        question: "Why must backend application servers be stateless to scale horizontally?",
        options: [
          "Stateless servers don't need CPU",
          "Any server in the load balancer pool can handle any request without relying on local server memory for session state",
          "Stateless servers don't use databases",
          "It is required by Docker"
        ],
        correctAnswer: 1,
        explanation: "Statelessness allows load balancers to distribute traffic across any node without sticky sessions."
      }
    ]
  },
  {
    dayNumber: 28,
    title: "Production Project Deep-Dive & Architecture Defense",
    module: "projects",
    moduleName: "Full-Stack Projects & Architecture",
    primaryObjective: "Conduct a comprehensive architectural defense for your portfolio project: Database schema, state management, API security, performance bottlenecks, and trade-offs.",
    estimatedMinutes: 135,
    isSevenDayTrack: false,
    checklist: [
      "Articulate your project's high-level architecture in 90 seconds using an elevator pitch",
      "Justify technology choices (e.g., PostgreSQL vs MongoDB, Context vs Redux)",
      "Defend database indexing and schema foreign key choices under questioning",
      "Describe the hardest bug encountered during development and how you diagnosed and resolved it",
      "Review the production readiness checklist (security headers, compression, bundle size, monitoring)"
    ],
    topics: [
      {
        id: "day28-topic1",
        title: "Defending Project Decisions in Technical Interviews",
        durationMinutes: 45,
        summary: "Communicating engineering trade-offs, architecture diagrams, and problem resolution under scrutiny.",
        definitions: [
          {
            term: "Engineering Trade-off",
            explanation: "A conscious technical choice where advantages in one dimension (e.g. speed, simplicity) are chosen over disadvantages in another (e.g. storage, initial complexity)."
          }
        ],
        codeExamples: [
          {
            language: "markdown",
            title: "Project Architecture Defense Structure",
            code: `1. Problem Statement: What real user problem does the platform solve?
2. Architecture Overview: Client (React/Vite/Tailwind) -> API Gateway (Node/Express) -> Database (PostgreSQL) + Cache (Redis).
3. Critical Technical Challenges:
   - Challenge: Optimistic UI updates with offline rollback.
   - Solution: TanStack Query mutation with onMutate context snapshot and onError rollback.
4. Scale & Bottlenecks:
   - Database connection limits managed via connection pooling (pg-pool, max: 20).
   - Rate limiting applied with sliding window algorithm to safeguard against spam.`,
            output: "Clear, structured engineering narrative"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d28-1",
            question: "Why did you choose PostgreSQL over MongoDB for your full-stack application?",
            answer: "Our domain data exhibits clear relational structure with foreign key dependencies (Users -> Orders -> OrderItems). PostgreSQL provides strict relational integrity, ACID transaction guarantees for payments, and powerful JOIN queries. Additionally, PostgreSQL's native JSONB data type allows storing flexible semi-structured data without sacrificing relational constraints.",
            keyPoints: ["Clear relational schema with foreign key integrity", "ACID transactions essential for payments", "JSONB provides flexible document capabilities when needed"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d28-1",
            question: "When explaining a bug you solved to an interviewer, which format is most impactful?",
            options: [
              "Blame the library documentation",
              "Symptom -> Root Cause Diagnosis -> Solution -> Prevention Strategy",
              "Explain that you copy-pasted code from StackOverflow",
              "Say you never had any bugs"
            ],
            correctAnswer: 1,
            explanation: "Describing the symptom, root cause analysis, fix, and automated testing prevention shows mature engineering capability."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d28-1",
        question: "What does an Optimistic UI update do?",
        options: [
          "Shows a positive motivational message to the user",
          "Updates the UI immediately assuming server success, rolling back only if the API rejects",
          "Disables user buttons during requests",
          "Runs the API on the client machine"
        ],
        correctAnswer: 1,
        explanation: "Optimistic UI provides instantaneous responsive feedback, improving perceived performance while handling rollback on failure."
      }
    ]
  },
  {
    dayNumber: 29,
    title: "Live Coding Interviews, UMPIRE & Communication Mastery",
    module: "interview-hr",
    moduleName: "Technical & HR Interview Mastery",
    primaryObjective: "Master the UMPIRE problem-solving framework, thinking out loud during live coding, edge-case elicitation, and recovering gracefully from mental blocks.",
    estimatedMinutes: 130,
    isSevenDayTrack: true,
    checklist: [
      "Execute the 6 steps of UMPIRE: Understand, Match, Plan, Implement, Review, Evaluate",
      "Practice vocalizing your thought process without awkward silence ('Think Out Loud')",
      "Systematically ask clarifying questions regarding input size, duplicates, and invalid types",
      "Dry-run your code manually with a small test case before running it",
      "Analyze Big-O Time and Space complexities proactively without waiting to be prompted"
    ],
    topics: [
      {
        id: "day29-topic1",
        title: "The UMPIRE Framework for Live Coding",
        durationMinutes: 45,
        summary: "A reliable structured framework to solve any coding interview problem under pressure.",
        definitions: [
          {
            term: "U - Understand",
            explanation: "Ask clarifying questions: input constraints, negative numbers, empty arrays, return format."
          },
          {
            term: "M - Match",
            explanation: "Recognize patterns: Is it Two Pointers? Sliding Window? Hash Map? BFS/DFS? Binary Search?"
          },
          {
            term: "P - Plan",
            explanation: "Write out step-by-step pseudo-code or bullet points BEFORE writing a single line of real code."
          },
          {
            term: "I - Implement",
            explanation: "Translate plan into clean, idiomatic code with meaningful variable names."
          },
          {
            term: "R - Review",
            explanation: "Dry run line by line with sample input, catching off-by-one errors."
          },
          {
            term: "E - Evaluate",
            explanation: "State time and space complexity with clear justification."
          }
        ],
        codeExamples: [
          {
            language: "markdown",
            title: "Live Coding Clarifying Questions Checklist",
            code: `- "Can the input array be empty or null?"
- "Can the array contain negative numbers or duplicates?"
- "What is the expected maximum size of the input (to determine required Big-O)?"
- "Are we expected to modify the array in place, or can we allocate auxiliary memory?"
- "How should we handle invalid inputs or edge conditions?"`,
            output: "Demonstrates senior engineering rigor before coding"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d29-1",
            question: "What should you do if you freeze or get stuck during a live coding interview?",
            answer: "1. Do not remain silent. Vocalize where you are stuck: 'I'm thinking through how to handle duplicate elements here.'\n2. Propose a brute force solution first: 'We can solve this naively in O(n²) with nested loops, which gives us a baseline, and then optimize.'\n3. Walk through a concrete small example manually on screen.\n4. Ask for a subtle hint or validation: 'Does this two-pointer approach align with what you're expecting?'",
            keyPoints: ["Never stay silent", "State brute force first", "Trace small concrete example", "Ask targeted collaborative questions"],
            difficulty: "Associate",
            frequency: "Must Know"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d29-1",
            question: "When in the live coding interview should you write out the solution plan?",
            options: [
              "After writing all the code",
              "Before writing any code, verbally and in bullet points",
              "Only if the interviewer requests it",
              "Never, jump straight to code"
            ],
            correctAnswer: 1,
            explanation: "Planning before coding ensures alignment with the interviewer, prevents wasting time on incorrect approaches, and demonstrates structured problem-solving."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d29-1",
        question: "When should you discuss Big-O Time and Space complexity?",
        options: [
          "Only if the interviewer explicitly asks",
          "Proactively: first when proposing your plan, and again after implementing the solution",
          "Never, complexity doesn't matter for associates",
          "At the very end of the interview during Q&A"
        ],
        correctAnswer: 1,
        explanation: "Proactively stating complexity shows technical fluency and structured analytical reasoning."
      }
    ]
  },
  {
    dayNumber: 30,
    title: "Behavioral Mastery, STAR Stories & Final Negotiation",
    module: "interview-hr",
    moduleName: "Technical & HR Interview Mastery",
    primaryObjective: "Master behavioral interview questions using the STAR framework, demonstrating culture fit, resolving technical disagreements, and navigating offer evaluation.",
    estimatedMinutes: 120,
    isSevenDayTrack: false,
    checklist: [
      "Structure compelling answers using the STAR method (Situation, Task, Action, Result)",
      "Prepare a story regarding technical disagreement and finding collaborative compromise",
      "Prepare a story regarding a production outage or critical mistake and lessons learned",
      "Formulate insightful reverse-interview questions to ask the hiring manager",
      "Understand offer evaluation criteria (base salary, bonus, equity, mentorship, growth)"
    ],
    topics: [
      {
        id: "day30-topic1",
        title: "The STAR Framework & Impactful Storytelling",
        durationMinutes: 40,
        summary: "Turning past experiences into clear, structured demonstrations of ownership, collaboration, and resilience.",
        definitions: [
          {
            term: "S - Situation",
            explanation: "Set the context in 1-2 sentences: team, project, challenge, and timeframe."
          },
          {
            term: "T - Task",
            explanation: "Your explicit role and responsibility in resolving that challenge."
          },
          {
            term: "A - Action",
            explanation: "The specific technical and interpersonal actions YOU took (spend 60% of time here; use 'I', not just 'we')."
          },
          {
            term: "R - Result",
            explanation: "Quantifiable outcome: latency reduced by 40%, zero downtime migration, positive user feedback."
          }
        ],
        codeExamples: [
          {
            language: "markdown",
            title: "STAR Example: Handling a Production Bug",
            code: `Situation: During our final milestone demo, an unhandled async race condition caused cart data to duplicate on rapid clicks.
Task: As the lead associate developer on the order flow, I needed to eliminate the race condition within 24 hours.
Action: I diagnosed the issue using browser network throttling, reproduced it with concurrent automated tests, and implemented a double defense: client-side debounce with button disable, and database-level unique constraint on idempotency keys.
Result: The duplication was completely resolved. We added automated regression tests, deployed on schedule, and received an A grade / client signoff.`,
            output: "Compelling demonstration of technical ownership"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d30-1",
            question: "How do you answer: 'What is your greatest technical weakness?'",
            answer: "Pick a genuine technical skill you were previously lacking, explain how you recognized the gap, and showcase the proactive steps you took to improve it with measurable evidence. Example: 'Earlier, I struggled with deep SQL query tuning and relied solely on ORMs. I recognized this was causing slow queries, so I spent several weeks studying EXPLAIN ANALYZE, indexing strategies, and connection pooling. Now I write optimized queries and actively analyze execution plans.'",
            keyPoints: ["Choose a real technical area, not a cliché like 'I work too hard'", "Show self-awareness and proactive learning", "Demonstrate current competence with evidence"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d30-1",
            question: "What percentage of your STAR response should focus on the 'Action' step?",
            options: ["10%", "30%", "60%", "90%"],
            correctAnswer: 2,
            explanation: "The Action step is where interviewers evaluate your specific contribution, critical thinking, and technical execution."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d30-1",
        question: "What is an excellent question to ask the interviewer at the end of the interview?",
        options: [
          "'What does a typical day look like for a high-performing developer on this team?'",
          "'How much vacation time do I get?'",
          "'Did I pass the interview?'",
          "'What does your company do?'"
        ],
        correctAnswer: 0,
        explanation: "Asking what defines high performance on the specific team demonstrates dedication, curiosity, and high standards."
      }
    ]
  }
];
