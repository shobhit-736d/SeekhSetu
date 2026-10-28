// server/data/interviewsSeed.js
// Seed dataset for Technical Interview Questions & Mock Interview Presets

export const mockInterviewPresets = [
  {
    id: 'preset-fullstack-engineer',
    slug: 'fullstack-engineer',
    title: 'Full Stack Software Engineer Mock Session',
    trackSlug: 'fullstack-web',
    targetRole: 'Full Stack Software Engineer',
    difficulty: 'Medium',
    durationMinutes: 25,
    description: 'Covers React hydration & reconciliation, REST/gRPC API architecture, database transaction isolation, and behavioral conflict resolution.',
    rounds: [
      { roundId: 'r1', name: 'Frontend Architecture & Lifecycle', category: 'technical-core', questionCount: 2 },
      { roundId: 'r2', name: 'Backend Scalability & Caching', category: 'system-design', questionCount: 2 },
      { roundId: 'r3', name: 'Behavioral & STAR Leadership', category: 'behavioral-star', questionCount: 1 }
    ]
  },
  {
    id: 'preset-frontend-specialist',
    slug: 'frontend-specialist',
    title: 'Senior Frontend & Web Performance Interview',
    trackSlug: 'frontend',
    targetRole: 'Frontend Engineer / React Specialist',
    difficulty: 'Hard',
    durationMinutes: 20,
    description: 'Deep dive into JavaScript Event Loop, Critical Rendering Path, Web Vitals, SSR/SSG hydration boundaries, and state management.',
    rounds: [
      { roundId: 'r1', name: 'JavaScript Engine & Event Loop', category: 'technical-core', questionCount: 2 },
      { roundId: 'r2', name: 'DOM Performance & Web Vitals', category: 'scenario-troubleshooting', questionCount: 2 },
      { roundId: 'r3', name: 'Cross-functional Collaboration', category: 'behavioral-star', questionCount: 1 }
    ]
  },
  {
    id: 'preset-backend-distributed',
    slug: 'backend-distributed',
    title: 'Backend Systems & API Architecture Interview',
    trackSlug: 'backend',
    targetRole: 'Backend Engineer / Distributed Systems',
    difficulty: 'Hard',
    durationMinutes: 25,
    description: 'Tests indexing B+ trees, ACID vs BASE, distributed locks, Redis caching strategies, connection pooling, and microservices.',
    rounds: [
      { roundId: 'r1', name: 'Database Internals & Concurrency', category: 'technical-core', questionCount: 2 },
      { roundId: 'r2', name: 'High-Throughput System Design', category: 'system-design', questionCount: 2 },
      { roundId: 'r3', name: 'Handling Production Outages', category: 'behavioral-star', questionCount: 1 }
    ]
  },
  {
    id: 'preset-aiml-engineer',
    slug: 'aiml-engineer',
    title: 'AI/ML & Deep Learning Technical Assessment',
    trackSlug: 'ai-ml',
    targetRole: 'Machine Learning Engineer',
    difficulty: 'Medium',
    durationMinutes: 25,
    description: 'Evaluates Transformer attention mechanisms, backpropagation calculus, overfitting regularizations, and model inference latency.',
    rounds: [
      { roundId: 'r1', name: 'Deep Learning & Math Foundations', category: 'technical-core', questionCount: 2 },
      { roundId: 'r2', name: 'ML Pipeline & Feature Drift', category: 'scenario-troubleshooting', questionCount: 2 },
      { roundId: 'r3', name: 'Explaining Complex Models to Stakeholders', category: 'hr-culture-fit', questionCount: 1 }
    ]
  },
  {
    id: 'preset-devops-cloud-sre',
    slug: 'devops-cloud-sre',
    title: 'DevOps, Cloud & SRE Mock Panel',
    trackSlug: 'devops-sre',
    targetRole: 'DevOps / SRE Engineer',
    difficulty: 'Hard',
    durationMinutes: 25,
    description: 'Focuses on Kubernetes pod scheduling, declarative GitOps, SLA/SLO error budgets, Docker multi-stage builds, and AWS VPC security.',
    rounds: [
      { roundId: 'r1', name: 'Containerization & Kubernetes', category: 'technical-core', questionCount: 2 },
      { roundId: 'r2', name: 'Infrastructure Reliability & Incident Triage', category: 'scenario-troubleshooting', questionCount: 2 },
      { roundId: 'r3', name: 'Blameless Post-Mortems', category: 'behavioral-star', questionCount: 1 }
    ]
  },
  {
    id: 'preset-cybersecurity-defense',
    slug: 'cybersecurity-defense',
    title: 'Cybersecurity Analyst & Threat Defense Panel',
    trackSlug: 'cybersecurity',
    targetRole: 'Cybersecurity Analyst / SecOps',
    difficulty: 'Medium',
    durationMinutes: 20,
    description: 'Examines OWASP Top 10 defenses, zero-trust network segmentation, public-key asymmetric cryptography, and incident response.',
    rounds: [
      { roundId: 'r1', name: 'Web Application Security & Cryptography', category: 'technical-core', questionCount: 2 },
      { roundId: 'r2', name: 'Threat Detection & Breach Mitigation', category: 'scenario-troubleshooting', questionCount: 2 },
      { roundId: 'r3', name: 'Ethical Security Mindset', category: 'hr-culture-fit', questionCount: 1 }
    ]
  },
  {
    id: 'preset-java-enterprise',
    slug: 'java-enterprise',
    title: 'Java 21 Enterprise & Spring Boot Interview',
    trackSlug: 'java-enterprise',
    targetRole: 'Java Backend Developer',
    difficulty: 'Hard',
    durationMinutes: 20,
    description: 'Tests Java 21 Virtual Threads, JVM garbage collection tuning, Spring Boot autoconfiguration, and JPA N+1 query avoidance.',
    rounds: [
      { roundId: 'r1', name: 'JVM Internals & Virtual Threads', category: 'technical-core', questionCount: 2 },
      { roundId: 'r2', name: 'Spring Boot Architecture & Data Access', category: 'system-design', questionCount: 2 },
      { roundId: 'r3', name: 'Enterprise Team Collaboration', category: 'behavioral-star', questionCount: 1 }
    ]
  },
  {
    id: 'preset-qa-automation',
    slug: 'qa-automation',
    title: 'SDET & QA Automation Engineering Panel',
    trackSlug: 'software-testing-qa',
    targetRole: 'Software Development Engineer in Test (SDET)',
    difficulty: 'Medium',
    durationMinutes: 20,
    description: 'Evaluates test pyramid strategies, Page Object Model design in Playwright, flaky test isolation, and contract testing.',
    rounds: [
      { roundId: 'r1', name: 'Test Architecture & Automation Frameworks', category: 'technical-core', questionCount: 2 },
      { roundId: 'r2', name: 'CI/CD Test Parallelization & Defect Defense', category: 'scenario-troubleshooting', questionCount: 2 },
      { roundId: 'r3', name: 'Pushing Back on Untested Releases', category: 'behavioral-star', questionCount: 1 }
    ]
  }
];

export const interviewQuestionsSeed = [
  {
    id: 'int-fs-01',
    slug: 'react-server-components-hydration',
    title: 'React Server Components (RSC) vs. Traditional Client Hydration',
    trackSlug: 'fullstack-web',
    category: 'technical-core',
    difficulty: 'Hard',
    jobRoles: ['Full Stack Engineer', 'Senior Frontend Engineer'],
    topic: 'React 19 & Architecture',
    question: 'How do React Server Components (RSC) fundamentally differ from traditional client-side SSR hydration, and how do they impact bundle size and data fetching waterfalls?',
    intent: 'Tests modern understanding of React 19 architecture, SSR overhead, component tree serialization, and bundle elimination.',
    comprehensiveAnswer: 'Traditional SSR renders HTML on the server and delivers both the HTML string and the entire JavaScript bundle to the client, where React must download, parse, and execute all component logic to attach event listeners ("hydration"). In contrast, React Server Components (RSC) execute exclusively on the server and are serialized into a special compact JSON-like stream (RSC payload) rather than shipping component code to the client bundle.',
    keyPointsToMention: [
      'Server components never bundle their code to the browser',
      'Hydration overhead is eliminated for server-only subtrees',
      'Client components are marked with "use client" directive at the leaf level',
      'Streaming HTML + RSC payload over chunked HTTP/2 responses'
    ],
    codeExample: `// Server Component\nimport db from '@/lib/db';\nexport default async function Products() {\n  const products = await db.product.findMany();\n  return <div>{products.map(p => <div key={p.id}>{p.name}</div>)}</div>;\n}`,
    language: 'typescript',
    followUpQuestions: [
      'When would you still need to mark a component with "use client"?',
      'How does React Suspense coordinate with streaming RSC over HTTP chunking?'
    ],
    commonMistakes: [
      'Confusing Server Components with standard SSR',
      'Attempting to use useState, useEffect, or browser DOM events inside an RSC'
    ],
    companies: ['Vercel', 'Meta', 'Netflix', 'Shopify'],
    tags: ['React 19', 'RSC', 'Hydration', 'Performance', 'Full Stack'],
    rubricCriteria: {
      correctness: 'Accurately distinguishes RSC payload from SSR HTML and client JS bundles.',
      clarity: 'Explains the mental model of server vs client execution boundaries clearly.',
      problemSolving: 'Demonstrates awareness of network latency and waterfall elimination.',
      communication: 'Uses crisp technical terminology.'
    },
    isVerified: true
  },
  {
    id: 'int-fs-02',
    slug: 'distributed-transaction-saga',
    title: 'Managing Distributed Transactions: Saga Pattern vs. Two-Phase Commit',
    trackSlug: 'fullstack-web',
    category: 'system-design',
    difficulty: 'Hard',
    jobRoles: ['Full Stack Engineer', 'Backend Architect'],
    topic: 'Microservices & Distributed Systems',
    question: 'In a microservices e-commerce platform, how do you handle distributed transactions across Order, Payment, and Inventory services without creating tight database coupling or deadlocks?',
    intent: 'Assesses distributed systems maturity, eventual consistency understanding, compensating transactions, and resilience engineering.',
    comprehensiveAnswer: 'In microservice architectures, traditional Two-Phase Commit (2PC) is strongly discouraged because it creates synchronous blocking across all participating database coordinators. The industry-standard solution is the Saga Pattern, which breaks a distributed transaction into a sequence of local transactions managed through choreography or orchestration.',
    keyPointsToMention: [
      '2PC causes blocking locks and poor fault tolerance across services',
      'Sagas maintain eventual consistency through compensating transactions',
      'Transactional Outbox Pattern guarantees at-least-once event delivery',
      'Idempotency keys prevent double-charging or duplicate inventory deduction'
    ],
    followUpQuestions: [
      'What happens if a compensating transaction itself fails?',
      'How does the Transactional Outbox pattern prevent lost updates when Kafka is unreachable?'
    ],
    commonMistakes: [
      'Claiming distributed transactions can easily maintain strict ACID across microservices',
      'Failing to specify how rollbacks occur in a Saga'
    ],
    companies: ['Amazon', 'Uber', 'Swiggy', 'Zomato'],
    tags: ['System Design', 'Saga Pattern', 'Distributed Systems', 'Kafka', 'Microservices'],
    rubricCriteria: {
      correctness: 'Identifies Saga pattern, compensating actions, and shortcomings of 2PC.',
      clarity: 'Distinguishes choreographed vs orchestrated sagas coherently.',
      problemSolving: 'Addresses failure modes, network retries, and idempotency.',
      communication: 'Structures response systematically from problem to architectural solution.'
    },
    isVerified: true
  },
  {
    id: 'int-fe-01',
    slug: 'event-loop-microtasks-macrotasks',
    title: 'JavaScript Event Loop: Microtasks, Macrotasks, and Render Phasing',
    trackSlug: 'frontend',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['Frontend Engineer', 'UI Architect'],
    topic: 'JavaScript Engine Mechanics',
    question: 'Given a code snippet mixing setTimeout, Promise.resolve, requestAnimationFrame, and synchronous code, in what order does the V8 engine execute them and why?',
    intent: 'Tests fundamental mastery of JavaScript single-threaded concurrency, Call Stack, Microtask Queue, Task Queue, and browser rendering lifecycle.',
    comprehensiveAnswer: 'The browser runtime operates an Event Loop where synchronous code runs first, followed immediately by draining the entire Microtask Queue (Promises, queueMicrotask). The browser then performs rendering and requestAnimationFrame callbacks before pulling the next Macrotask (setTimeout).',
    keyPointsToMention: [
      'Synchronous stack executes first',
      'Microtasks take strict priority over macrotasks',
      'Entire microtask queue is exhausted before the next task or render',
      'requestAnimationFrame runs before layout/paint, ahead of queued timer tasks'
    ],
    codeExample: `console.log('1: Sync');\nsetTimeout(() => console.log('2: Macrotask'), 0);\nPromise.resolve().then(() => console.log('3: Microtask'));\nconsole.log('4: Sync end');\n// Output: 1, 4, 3, 2`,
    language: 'javascript',
    followUpQuestions: [
      'What happens if a microtask recursively calls queueMicrotask indefinitely?',
      'Why is requestAnimationFrame preferred over setTimeout(fn, 16) for smooth animations?'
    ],
    commonMistakes: [
      'Thinking setTimeout(fn, 0) runs immediately after the current line of code',
      'Assuming Promise callbacks and setTimeout share the same queue'
    ],
    companies: ['Google', 'Meta', 'Atlassian', 'Microsoft'],
    tags: ['JavaScript', 'Event Loop', 'Microtasks', 'V8', 'rAF'],
    isVerified: true
  },
  {
    id: 'int-fe-02',
    slug: 'core-web-vitals-inp-lcp-cls',
    title: 'Diagnosing & Optimizing Core Web Vitals: LCP, INP, and CLS',
    trackSlug: 'frontend',
    category: 'scenario-troubleshooting',
    difficulty: 'Hard',
    jobRoles: ['Senior Frontend Engineer', 'Web Performance Specialist'],
    topic: 'Web Performance & Profiling',
    question: 'How do you diagnose and optimize Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS) in a heavy single-page application?',
    intent: 'Tests real-world production performance debugging, Chrome Performance tab profiling, and Google search ranking criteria.',
    comprehensiveAnswer: 'INP measures user input responsiveness across the entire page lifecycle (target <= 200ms). Break long main-thread tasks using scheduler.yield() or React startTransition. For CLS (target <= 0.1), reserve aspect ratios for images and advertisements, and use CSS font-display: swap with size-adjust to prevent text layout jumps.',
    keyPointsToMention: [
      'INP replaced FID as an official Core Web Vital',
      'Break long tasks (> 50ms) using scheduler.yield() or startTransition',
      'Always set explicit width/height or aspect-ratio on images/banners',
      'Reserve skeleton space for dynamic asynchronous content'
    ],
    followUpQuestions: [
      'How does INP differ from First Input Delay (FID)?',
      'How do you measure Core Web Vitals in field data (RUM) vs synthetic lab data?'
    ],
    commonMistakes: [
      'Thinking INP only measures JavaScript execution without including presentation delay',
      'Using CSS transitions that trigger layout/reflow instead of transform/opacity'
    ],
    companies: ['Airbnb', 'Stripe', 'Google', 'Flipkart'],
    tags: ['Web Vitals', 'INP', 'CLS', 'Performance Profiling', 'Frontend'],
    isVerified: true
  },
  {
    id: 'int-be-01',
    slug: 'database-indexing-b-trees',
    title: 'Database Indexing Mechanics: Why B+ Trees Outperform Hash & Binary Trees',
    trackSlug: 'backend',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['Backend Engineer', 'Database Administrator'],
    topic: 'Relational Database Internals',
    question: 'Why do relational databases like PostgreSQL and MySQL choose B+ Trees over Hash Tables or Balanced Binary Search Trees (AVL/Red-Black) for primary and secondary indexes?',
    intent: 'Tests understanding of disk I/O, block storage architecture, range queries, and tree fan-out.',
    comprehensiveAnswer: 'Databases operate over block storage where disk I/O is the bottleneck. B+ Trees have massive fan-out matching disk block pages (4KB-16KB), meaning 3-4 tree levels index billions of rows. Furthermore, leaf nodes are doubly linked, enabling lightning-fast sequential range scans which Hash indexes cannot perform.',
    keyPointsToMention: [
      'Disk block size alignment (4KB-16KB pages)',
      'High fan-out yields shallow tree depth (3-4 levels for millions of rows)',
      'Doubly-linked leaf nodes enable O(1) sequential range traversals',
      'Hash tables fail completely on range queries and prefix searches'
    ],
    followUpQuestions: [
      'When would a Hash index or GIN index be preferred over a B+ Tree in PostgreSQL?',
      'What are index covering queries (Index-Only Scans)?'
    ],
    commonMistakes: [
      'Saying B+ Trees are faster in pure memory than Hash tables',
      'Overlooking the disk block boundary constraint'
    ],
    companies: ['Oracle', 'Salesforce', 'Amazon', 'Microsoft'],
    tags: ['Databases', 'B+ Trees', 'PostgreSQL', 'Indexing', 'Disk I/O'],
    isVerified: true
  },
  {
    id: 'int-be-02',
    slug: 'redis-caching-patterns-stampede',
    title: 'Mitigating Cache Stampede, Cache Penetration, and Cache Breakdown',
    trackSlug: 'backend',
    category: 'scenario-troubleshooting',
    difficulty: 'Hard',
    jobRoles: ['Backend Engineer', 'Systems Architect'],
    topic: 'Caching & High Availability',
    question: 'How do you design high-throughput Redis caching to prevent Cache Stampede (Dogpile effect), Cache Penetration, and Cache Avalanche?',
    intent: 'Tests production caching resilience, probabilistic early expiration, bloom filters, and distributed locking.',
    comprehensiveAnswer: 'Prevent Cache Stampede using distributed mutex locks (Redlock) or probabilistic early expiration (XFetch). Prevent Cache Penetration using Bloom filters or caching null results with short TTLs. Prevent Cache Avalanche by appending randomized jitter to cache TTLs.',
    keyPointsToMention: [
      'Cache Stampede resolved via distributed locks or probabilistic early recomputation',
      'Cache Penetration resolved via Bloom Filters or caching null results',
      'Cache Avalanche mitigated by adding random TTL jitter',
      'Serve stale data while refreshing asynchronously'
    ],
    followUpQuestions: [
      'How does a Bloom filter guarantee no false negatives?',
      'What are the tradeoffs between Cache-Aside and Write-Through caching?'
    ],
    commonMistakes: [
      'Confusing Cache Penetration (key never exists) with Cache Breakdown (hot key expires)',
      'Setting hard-coded uniform TTLs across all cached records'
    ],
    companies: ['Twitter/X', 'Reddit', 'Uber', 'Netflix'],
    tags: ['Redis', 'Caching', 'Cache Stampede', 'Bloom Filter', 'Backend'],
    isVerified: true
  },
  {
    id: 'int-java-01',
    slug: 'java-21-virtual-threads-loom',
    title: 'Java 21 Virtual Threads (Project Loom) vs. OS Platform Threads',
    trackSlug: 'java-enterprise',
    category: 'technical-core',
    difficulty: 'Hard',
    jobRoles: ['Java Software Engineer', 'Enterprise Backend SDE'],
    topic: 'Java 21 Concurrency & JVM',
    question: 'How do Java 21 Virtual Threads work under the hood, why do they replace reactive programming (WebFlux) for I/O-bound services, and what is thread pinning?',
    intent: 'Evaluates cutting-edge Java 21 knowledge, Project Loom mechanics, carrier thread mounting, and JVM blocking.',
    comprehensiveAnswer: 'Virtual threads are lightweight user-mode threads managed by the JVM (~1KB memory). When a virtual thread blocks on I/O, the JVM unmounts it from its carrier thread and parks its stack on the heap, allowing the carrier thread to execute other tasks. This eliminates reactive complexity. Avoid synchronized blocks to prevent thread pinning.',
    keyPointsToMention: [
      '1:1 OS thread model vs M:N JVM virtual thread scheduling',
      'Virtual threads unmount on blocking I/O, parking stack frames on the heap',
      'Enables synchronous thread-per-request code with reactive-level concurrency',
      'Avoid thread pinning by replacing synchronized blocks with ReentrantLock'
    ],
    followUpQuestions: [
      'Should you pool virtual threads like traditional thread pools?',
      'Why are virtual threads NOT suitable for CPU-intensive parallel computing?'
    ],
    commonMistakes: [
      'Attempting to pool virtual threads',
      'Believing virtual threads make CPU-bound algorithms faster'
    ],
    companies: ['Oracle', 'Goldman Sachs', 'LinkedIn', 'JPMorgan Chase'],
    tags: ['Java 21', 'Virtual Threads', 'Project Loom', 'Concurrency', 'JVM'],
    isVerified: true
  },
  {
    id: 'int-py-01',
    slug: 'python-gil-and-asyncio',
    title: 'Python Global Interpreter Lock (GIL) and AsyncIO Concurrency',
    trackSlug: 'python-dev',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['Python Developer', 'Backend SDE'],
    topic: 'Python Internals & Concurrency',
    question: 'What is the Python Global Interpreter Lock (GIL), how does it affect CPU-bound vs I/O-bound tasks, and how does AsyncIO achieve concurrency without multiple OS threads?',
    intent: 'Tests understanding of CPython memory safety, reference counting, cooperative multitasking, and multiprocessing.',
    comprehensiveAnswer: 'The GIL is a mutex in CPython protecting reference counted memory. It restricts native threads to one bytecode at a time, limiting CPU-bound tasks to a single core unless using multiprocessing. AsyncIO achieves high I/O concurrency via an event loop and cooperative coroutine switching (await).',
    keyPointsToMention: [
      'CPython reference counting requires GIL mutex for thread safety',
      'CPU-bound tasks require multiprocessing to utilize multiple CPU cores',
      'AsyncIO uses cooperative multitasking with a single-threaded event loop',
      'PEP 703 introduces optional free-threaded Python (no-GIL) in Python 3.13+'
    ],
    followUpQuestions: [
      'How does multiprocessing communicate state between processes compared to multithreading?',
      'What is the difference between Python generators (yield) and coroutines (async/await)?'
    ],
    commonMistakes: [
      'Assuming multithreading in Python automatically runs across multiple CPU cores for heavy computing',
      'Using time.sleep() instead of asyncio.sleep() in async functions'
    ],
    companies: ['Dropbox', 'Instagram', 'Spotify', 'Google'],
    tags: ['Python', 'GIL', 'AsyncIO', 'Concurrency', 'CPython'],
    isVerified: true
  },
  {
    id: 'int-ai-01',
    slug: 'transformer-self-attention-math',
    title: 'Transformer Self-Attention: Mathematics of Q, K, V and Scaled Dot-Product',
    trackSlug: 'ai-ml',
    category: 'technical-core',
    difficulty: 'Hard',
    jobRoles: ['Machine Learning Engineer', 'AI Research SDE'],
    topic: 'Deep Learning & Transformers',
    question: 'Explain the mathematical formulation of Scaled Dot-Product Attention in Transformers. Why do we divide by the square root of dk, and what is the difference between self-attention and cross-attention?',
    intent: 'Evaluates linear algebra mastery, attention mechanics, vanishing gradient avoidance, and LLM architecture depth.',
    comprehensiveAnswer: 'Attention(Q, K, V) = softmax((QK^T) / sqrt(d_k)) * V. Queries match against Keys to compute attention weights, which scale the Values. Dividing by sqrt(d_k) normalizes dot product variance back to 1, preventing softmax saturation and vanishing gradients.',
    keyPointsToMention: [
      'Formula: Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V',
      'Scaling by sqrt(d_k) prevents softmax gradient saturation/vanishing',
      'Multi-Head Attention enables attending to multiple semantic subspaces',
      'Self-attention has O(N^2) complexity with respect to sequence length'
    ],
    followUpQuestions: [
      'Why does standard self-attention have O(N^2) complexity, and how do FlashAttention mitigate this?',
      'Why is positional encoding required in Transformers unlike RNNs?'
    ],
    commonMistakes: [
      'Forgetting the scaling factor and failing to explain why softmax gradients vanish',
      'Confusing keys and values roles in the dot product'
    ],
    companies: ['OpenAI', 'Google DeepMind', 'Anthropic', 'NVIDIA'],
    tags: ['Machine Learning', 'Transformers', 'Self-Attention', 'PyTorch', 'Linear Algebra'],
    isVerified: true
  },
  {
    id: 'int-sec-01',
    slug: 'csrf-vs-xss-defense-in-depth',
    title: 'Cross-Site Scripting (XSS) vs. Cross-Site Request Forgery (CSRF)',
    trackSlug: 'cybersecurity',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['Security Analyst', 'Application Security Engineer'],
    topic: 'Web Application Security & OWASP',
    question: 'How do XSS and CSRF attacks fundamentally differ in their exploitation mechanism, and how do SameSite cookie flags and CSP headers provide defense in depth?',
    intent: 'Tests comprehension of browser security boundary, ambient credentials, DOM sanitization, and modern token security.',
    comprehensiveAnswer: 'XSS injects and runs malicious code inside the victim site origin, stealing tokens and exfiltrating data. CSRF tricks the browser into sending unauthorized requests with ambient cookies to another origin without stealing the cookie. Prevent XSS via DOMPurify and CSP; prevent CSRF via SameSite=Lax/Strict cookies and anti-CSRF tokens.',
    keyPointsToMention: [
      'XSS executes malicious code inside your site origin',
      'CSRF tricks the browser into sending requests with ambient cookies to another origin',
      'SameSite=Lax/Strict is the modern primary defense against CSRF',
      'CSP headers (script-src) and DOMPurify protect against XSS'
    ],
    followUpQuestions: [
      'Why is storing JWT access tokens in localStorage vulnerable to XSS?',
      'Can an attacker perform CSRF on an API that exclusively accepts JSON payloads?'
    ],
    commonMistakes: [
      'Confusing the two: thinking CSRF steals credentials',
      'Assuming CORS headers protect against CSRF'
    ],
    companies: ['Cloudflare', 'CrowdStrike', 'Palo Alto Networks', 'Akamai'],
    tags: ['Cybersecurity', 'OWASP', 'XSS', 'CSRF', 'SameSite', 'CSP'],
    isVerified: true
  },
  {
    id: 'int-devops-01',
    slug: 'kubernetes-pod-crashloopbackoff-triage',
    title: 'Troubleshooting Kubernetes CrashLoopBackOff and OOMKilled in Production',
    trackSlug: 'devops-sre',
    category: 'scenario-troubleshooting',
    difficulty: 'Hard',
    jobRoles: ['DevOps Engineer', 'Site Reliability Engineer (SRE)'],
    topic: 'Container Orchestration & SRE',
    question: 'A critical production microservice pod enters a CrashLoopBackOff state right after deployment. Walk through your systematic triage steps to identify root cause and restore service.',
    intent: 'Tests real production incident troubleshooting methodology, kubectl diagnostics, exit codes, and memory profiling.',
    comprehensiveAnswer: 'Step 1: Run kubectl describe pod to inspect exit code (Exit Code 137 = OOMKilled). Step 2: Run kubectl logs --previous to view crashed container output before restart. Step 3: Verify liveness/readiness probe startup timing. Step 4: Verify required ConfigMaps and Secrets. Step 5: Execute kubectl rollout undo to restore service while debugging root cause.',
    keyPointsToMention: [
      'Check exit codes (Exit Code 137 = OOMKilled)',
      'Use kubectl logs --previous to view crashed container output',
      'Distinguish application crash from misconfigured liveness probes',
      'Immediate deployment rollback to preserve customer SLA during deep debugging'
    ],
    followUpQuestions: [
      'What is the difference between Kubernetes requests and limits for CPU vs Memory?',
      'How does a Horizontal Pod Autoscaler (HPA) behave when pods are OOMKilled?'
    ],
    commonMistakes: [
      'Running kubectl logs without --previous on a restarting container',
      'Immediately editing production code before checking logs and rolling back deployment'
    ],
    companies: ['Red Hat', 'Google Cloud', 'Datadog', 'AWS'],
    tags: ['Kubernetes', 'DevOps', 'SRE', 'Troubleshooting', 'OOMKilled'],
    isVerified: true
  },
  {
    id: 'int-ds-01',
    slug: 'ab-testing-p-values-significance',
    title: 'Designing A/B Tests: Sample Size, P-values, and Multiple Testing Corrections',
    trackSlug: 'data-science',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['Data Scientist', 'Decision Scientist'],
    topic: 'Statistical Inference & Experimentation',
    question: 'How do you determine the required sample size for an A/B test before launch, and why is peeking at p-values during the test dangerous without correction?',
    intent: 'Tests understanding of hypothesis testing, Type I/II errors, minimum detectable effect (MDE), and false discovery rate.',
    comprehensiveAnswer: 'Sample size is determined by Baseline Conversion, Minimum Detectable Effect (MDE), Significance Level (alpha = 0.05), and Statistical Power (1 - beta = 0.80). Peeking continuously inflates the False Positive rate from 5% to over 30% due to random noise crossing significance thresholds. Mitigate using fixed-horizon testing or sequential testing (mSPRT).',
    keyPointsToMention: [
      'Sample size requires Baseline, MDE, Alpha (Type I), and Power (1-Beta)',
      'Continuous peeking inflates false positive rates dramatically',
      'Use Fixed-Horizon testing or Sequential Testing (mSPRT / Bonferroni correction)',
      'Focus on practical business significance alongside statistical significance'
    ],
    followUpQuestions: [
      'How do you handle network interference or spillover effects in marketplace A/B tests?',
      'What is the difference between Bonferroni correction and Benjamini-Hochberg FDR?'
    ],
    commonMistakes: [
      'Stopping an experiment prematurely as soon as p < 0.05 appears on day 2',
      'Confusing high statistical significance with meaningful business impact'
    ],
    companies: ['Netflix', 'Booking.com', 'Meta', 'Amazon'],
    tags: ['A/B Testing', 'Statistics', 'P-values', 'Data Science', 'Hypothesis Testing'],
    isVerified: true
  },
  {
    id: 'int-ux-01',
    slug: 'nielsens-10-usability-heuristics',
    title: 'Applying Nielsen\'s 10 Usability Heuristics in Product Evaluation',
    trackSlug: 'ui-ux-design',
    category: 'scenario-troubleshooting',
    difficulty: 'Medium',
    jobRoles: ['Product Designer', 'UI/UX Designer'],
    topic: 'Interaction Design & Usability',
    question: 'Choose 3 of Jakob Nielsen\'s Usability Heuristics and illustrate how you apply them when evaluating a complex checkout or onboarding user flow.',
    intent: 'Tests interaction design theory, user empathy, error prevention, and cognitive load minimization.',
    comprehensiveAnswer: '1. Visibility of System Status: Provide clear multi-step breadcrumbs, visible loading states, and disabled submit buttons during processing. 2. Error Prevention: Pre-validate inputs (Luhn algorithm for credit cards) and warn before destructive actions. 3. Recognition Rather Than Recall: Show item thumbnails and pricing summary on the payment screen to reduce working memory load.',
    keyPointsToMention: [
      'Visibility of system status (progress indicators, feedback states)',
      'Error prevention over error recovery (inline validation, safe defaults)',
      'Recognition over recall (summary cards, visible options)',
      'Aesthetic and minimalist design to reduce cognitive fatigue'
    ],
    followUpQuestions: [
      'How do you conduct a heuristic evaluation with multiple evaluators to eliminate subjective bias?',
      'How does WCAG 2.2 AA accessibility alignment intersect with usability heuristics?'
    ],
    commonMistakes: [
      'Confusing Error Prevention (preventing mistakes) with Error Recovery (writing nice error messages)',
      'Evaluating visual styling rather than interaction architecture'
    ],
    companies: ['Apple', 'Figma', 'Airbnb', 'Uber'],
    tags: ['UI/UX', 'Design Systems', 'Usability', 'Heuristics', 'Interaction Design'],
    isVerified: true
  },
  {
    id: 'int-qa-01',
    slug: 'page-object-model-playwright-flaky-tests',
    title: 'Architecting Page Object Model in Playwright & Eliminating Flaky Tests',
    trackSlug: 'software-testing-qa',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['SDET', 'QA Automation Engineer'],
    topic: 'E2E Testing & Playwright',
    question: 'How do you design a robust Page Object Model (POM) in Playwright and what core techniques eliminate flaky test failures in CI/CD pipelines?',
    intent: 'Tests automation framework architecture, locator strategies, auto-waiting mechanisms, and test determinism.',
    comprehensiveAnswer: 'Encapsulate locators and interactions in dedicated Page Object classes using accessibility locators (getByRole, getByLabel). Eliminate flakiness by banning hardcoded sleep timeouts (use Playwright auto-waiting), using web-first polling assertions (expect.toBeVisible()), mocking volatile external third-party services with page.route(), and ensuring test isolation.',
    keyPointsToMention: [
      'Encapsulate selectors in POM classes; keep test specs focused on assertions',
      'Use user-facing accessibility locators (getByRole, getByLabel)',
      'Ban arbitrary sleep timeouts in favor of Playwright auto-waiting',
      'Mock third-party volatile services with page.route()'
    ],
    followUpQuestions: [
      'How does Playwright execution tracing (trace.zip) assist in post-mortem CI debugging?',
      'What are the advantages of contract testing with Pact over extensive end-to-end tests?'
    ],
    commonMistakes: [
      'Inserting Thread.sleep / waitForTimeout instead of leveraging auto-waiting',
      'Using fragile DOM XPaths like div > div:nth-child(3) > span'
    ],
    companies: ['Microsoft', 'BrowserStack', 'Postman', 'GitLab'],
    tags: ['Playwright', 'QA Automation', 'SDET', 'Page Object Model', 'Flaky Tests'],
    isVerified: true
  },
  {
    id: 'int-mob-01',
    slug: 'react-native-new-architecture-turbomodules',
    title: 'React Native New Architecture: JSI, TurboModules, and Fabric',
    trackSlug: 'mobile-dev',
    category: 'technical-core',
    difficulty: 'Hard',
    jobRoles: ['Mobile Engineer', 'React Native Developer'],
    topic: 'Mobile Internals & Architecture',
    question: 'How does React Native\'s New Architecture (JSI, Fabric, TurboModules) resolve the performance bottlenecks of the legacy asynchronous JSON Bridge?',
    intent: 'Tests mobile runtime execution, native thread bridging, synchronous C++ bindings, and UI responsiveness.',
    comprehensiveAnswer: 'The legacy architecture serialized all data into asynchronous JSON across a bridge, causing frame drops during rapid scrolling. The New Architecture uses JavaScript Interface (JSI) for direct synchronous C++ method calls, TurboModules for lazy-loading native packages, and Fabric for synchronous rendering and gesture handling directly on the UI thread.',
    keyPointsToMention: [
      'Legacy bridge required expensive asynchronous JSON serialization',
      'JSI allows JavaScript to invoke native C++ methods synchronously',
      'TurboModules enables lazy-loading of native modules at runtime',
      'Fabric enables synchronous layout updates and eliminates scroll stutter'
    ],
    followUpQuestions: [
      'How do Hermes engine bytecode precompilation and garbage collection improve mobile startup?',
      'How do you profile native memory leaks in Android (LeakCanary) vs iOS (Instruments)?'
    ],
    commonMistakes: [
      'Believing React Native compiles JavaScript into native Java/Objective-C bytecode',
      'Thinking JSI is just a faster bridge (it completely eliminates the bridge)'
    ],
    companies: ['Meta', 'Shopify', 'Coinbase', 'Discord'],
    tags: ['React Native', 'Mobile', 'JSI', 'TurboModules', 'Fabric'],
    isVerified: true
  },
  {
    id: 'int-da-01',
    slug: 'star-schema-vs-snowflake-schema',
    title: 'Dimensional Modeling: Star Schema vs. Snowflake Schema in Data Warehousing',
    trackSlug: 'data-analytics',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['Data Analyst', 'BI Engineer'],
    topic: 'Data Warehousing & SQL',
    question: 'Compare Star Schema and Snowflake Schema in modern cloud data warehouses like Snowflake and BigQuery. When is denormalization preferred for analytical queries?',
    intent: 'Tests dimensional data modeling, fact vs dimension tables, query performance, and join optimization.',
    comprehensiveAnswer: 'Star Schema features a central Fact table surrounded by denormalized Dimension tables, minimizing JOINs and maximizing parallel columnar scan performance. Snowflake Schema normalizes dimension tables to save space, but degrades query speed due to multiple complex joins. Modern cloud warehouses heavily favor Star Schema because columnar compression makes denormalization storage costs trivial.',
    keyPointsToMention: [
      'Fact tables store numerical metrics; Dimension tables store descriptive context',
      'Star schema is denormalized with minimal joins; Snowflake is normalized',
      'Modern columnar cloud warehouses heavily favor Star schema for query speed',
      'Storage compression in BigQuery/Snowflake renders normalization benefits negligible'
    ],
    followUpQuestions: [
      'What is a Slowly Changing Dimension (SCD Type 1 vs Type 2)?',
      'How does columnar storage differ from row-oriented storage for analytical aggregates?'
    ],
    commonMistakes: [
      'Applying OLTP normalization rules directly to analytical data warehouses',
      'Failing to recognize that joins are the primary performance bottleneck in Big Data queries'
    ],
    companies: ['Snowflake', 'Palantir', 'Capital One', 'Uber'],
    tags: ['Data Analytics', 'SQL', 'Data Warehousing', 'Star Schema', 'BI'],
    isVerified: true
  },
  {
    id: 'int-bc-01',
    slug: 'solidity-reentrancy-vulnerability-checks-effects-interactions',
    title: 'Smart Contract Reentrancy Attacks & Checks-Effects-Interactions Pattern',
    trackSlug: 'blockchain-web3',
    category: 'technical-core',
    difficulty: 'Hard',
    jobRoles: ['Smart Contract Auditor', 'Solidity Developer'],
    topic: 'Smart Contract Security & EVM',
    question: 'Explain the mechanism of an Ethereum Smart Contract reentrancy attack (as seen in The DAO hack), and how the Checks-Effects-Interactions pattern permanently neutralizes it.',
    intent: 'Tests EVM execution model, fallback functions, external calls, state updates, and smart contract security audit rigor.',
    comprehensiveAnswer: 'In a reentrancy attack, a contract sends ETH to an external recipient before setting the user balance to 0. The recipient fallback function calls withdraw again recursively, draining funds. The Checks-Effects-Interactions pattern updates internal state (balance = 0) BEFORE making external calls, rendering recursive re-entry futile. Use OpenZeppelin nonReentrant mutex as defense in depth.',
    keyPointsToMention: [
      'External calls hand control to recipient before state updates occur',
      'Attacker fallback function recursively calls back into the vulnerable function',
      'Checks-Effects-Interactions: Update state BEFORE sending ETH',
      'Use OpenZeppelin nonReentrant mutex modifier as defense in depth'
    ],
    followUpQuestions: [
      'Why is transfer() or send() no longer recommended over call() in modern Solidity?',
      'What is read-only reentrancy and how does it affect DeFi price oracles?'
    ],
    commonMistakes: [
      'Updating user balances after making the external call',
      'Assuming require(success) prevents reentrancy'
    ],
    companies: ['Chainlink', 'Uniswap', 'ConsenSys', 'Polygon'],
    tags: ['Blockchain', 'Solidity', 'Smart Contracts', 'Security', 'Reentrancy'],
    isVerified: true
  },
  {
    id: 'int-game-01',
    slug: 'fixed-timestep-game-loop-interpolation',
    title: 'The Canonical Game Loop: Fixed Timestep vs. Variable Delta Time',
    trackSlug: 'game-dev',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['Game Programmer', 'Graphics Engine SDE'],
    topic: 'Game Engine Architecture',
    question: 'Why should physics simulations in a game engine never use variable deltaTime directly, and how does a fixed timestep loop with accumulator interpolation guarantee deterministic physics?',
    intent: 'Tests understanding of physics numerical integration, floating point non-determinism, and frame stutter.',
    comprehensiveAnswer: 'Variable deltaTime causes physics tunneling and non-deterministic multiplayer behavior when framerates drop. A fixed timestep accumulator consumes discrete fixed time slices (e.g. 1/60s), ensuring physics simulation determinism across any hardware. Interpolating between previous and current state ensures smooth visual rendering at arbitrary refresh rates.',
    keyPointsToMention: [
      'Variable deltaTime causes physics tunneling and non-deterministic behavior',
      'Accumulator consumes discrete fixed time slices (e.g. 1/60s)',
      'Interpolation between previous and current physics state ensures visual smoothness',
      'Essential for client-side prediction in multiplayer netcode'
    ],
    followUpQuestions: [
      'What is the "Spiral of Death" in an accumulator loop and how do you clamp maximum frame time?',
      'How does Quadtree or BVH spatial partitioning optimize collision detection broadphase?'
    ],
    commonMistakes: [
      'Calling physics raycasts or forces inside the variable render update loop',
      'Failing to interpolate render state, causing visual stuttering'
    ],
    companies: ['Electronic Arts', 'Epic Games', 'Ubisoft', 'Riot Games'],
    tags: ['Game Development', 'Game Loop', 'Physics', 'Delta Time', 'C++'],
    isVerified: true
  },
  {
    id: 'int-net-01',
    slug: 'tcp-three-way-handshake-and-termination',
    title: 'TCP 3-Way Handshake, 4-Way Teardown, and TIME_WAIT State',
    trackSlug: 'networking',
    category: 'technical-core',
    difficulty: 'Medium',
    jobRoles: ['Network Engineer', 'Systems SDE'],
    topic: 'Transport Layer Protocols',
    question: 'Detail the sequence numbers and flags during the TCP 3-way handshake and 4-way connection termination. Why does the active close initiator remain in the TIME_WAIT state for 2*MSL?',
    intent: 'Tests transport layer mechanics, reliable delivery guarantees, socket state transitions, and socket exhaustion.',
    comprehensiveAnswer: 'Handshake: SYN(x) -> SYN(y)+ACK(x+1) -> ACK(y+1). Teardown requires 4 steps because TCP is full-duplex: FIN -> ACK -> FIN -> ACK. The active closer stays in TIME_WAIT for 2*MSL to guarantee the final ACK reached the peer (retransmitting if lost) and to prevent lingering duplicate packets from corrupting new connections.',
    keyPointsToMention: [
      'SYN(x) -> SYN(y)+ACK(x+1) -> ACK(y+1)',
      'Full duplex teardown requires independent FIN and ACK pairs in both directions',
      'TIME_WAIT lasts 2*MSL (Maximum Segment Lifetime)',
      'TIME_WAIT guarantees final ACK delivery and drains delayed packets from the network'
    ],
    followUpQuestions: [
      'What happens when a high-traffic server generates thousands of short-lived outbound TCP connections (TIME_WAIT socket exhaustion)?',
      'How does TLS 1.3 reduce handshake latency compared to TLS 1.2?'
    ],
    commonMistakes: [
      'Claiming TCP connection closes with 2 or 3 packets',
      'Thinking TIME_WAIT is a bug or error state'
    ],
    companies: ['Cisco', 'Cloudflare', 'Juniper Networks', 'Amazon Web Services'],
    tags: ['Networking', 'TCP/IP', 'Handshake', 'Protocols', 'Sockets'],
    isVerified: true
  },
  {
    id: 'int-cpp-01',
    slug: 'raii-smart-pointers-memory-layout',
    title: 'Modern C++ RAII, Move Semantics, and Smart Pointer Internals',
    trackSlug: 'cpp-systems',
    category: 'technical-core',
    difficulty: 'Hard',
    jobRoles: ['Systems Engineer', 'C++ Core Developer'],
    topic: 'Modern C++ (C++20) & Memory Management',
    question: 'Explain RAII in modern C++, contrast std::unique_ptr with std::shared_ptr control block memory overhead, and explain how move semantics eliminate redundant deep copies.',
    intent: 'Tests memory management mastery, zero-cost abstractions, rvalue references, and cache-conscious engineering.',
    comprehensiveAnswer: 'RAII binds resource lifetime to object scope; destructors execute deterministically, preventing leaks. std::unique_ptr has zero runtime overhead (raw pointer size). std::shared_ptr has 16 bytes overhead plus a heap control block for atomic reference counting. Move semantics transfers pointer ownership from rvalues (&&) in O(1) time without allocating new memory buffers.',
    keyPointsToMention: [
      'RAII ties resource lifetimes to stack scope and destructor calls',
      'std::unique_ptr has zero size and performance overhead compared to raw pointers',
      'std::shared_ptr maintains an atomic reference count control block on the heap',
      'Move semantics transfers pointer ownership from rvalues without allocating new memory'
    ],
    followUpQuestions: [
      'What is std::weak_ptr and how does it break circular reference memory leaks?',
      'Why should move constructors and move assignment operators always be marked noexcept?'
    ],
    commonMistakes: [
      'Using std::shared_ptr everywhere by default instead of std::unique_ptr',
      'Using an object after calling std::move() on it without checking valid state'
    ],
    companies: ['NVIDIA', 'Apple', 'Jane Street', 'Bloomberg'],
    tags: ['C++', 'RAII', 'Smart Pointers', 'Move Semantics', 'Memory Management'],
    isVerified: true
  },
  {
    id: 'int-hr-01',
    slug: 'hr-tell-me-about-yourself',
    title: 'The "Tell Me About Yourself" Executive Pitch',
    trackSlug: 'fullstack-web',
    category: 'hr-culture-fit',
    difficulty: 'Easy',
    jobRoles: ['All Technology Career Tracks'],
    topic: 'HR & Placement Fundamentals',
    question: 'Walk me through your background and career journey. Tell me about yourself.',
    intent: 'Tests structured storytelling, executive presence, relevance, and ability to connect past achievements to the prospective company.',
    comprehensiveAnswer: 'Follow the Present-Past-Future framework in under 90 seconds: 1. Present: Current technical focus and recent production builds. 2. Past: Formative engineering foundation and flagship project metrics (e.g. query optimization, architecture design). 3. Future & Alignment: Specific technical interest in the target company and eagerness to contribute immediately.',
    keyPointsToMention: [
      'Follow Present -> Past -> Future structure',
      'Highlight 1-2 quantified engineering accomplishments',
      'Never recite your resume line-by-line',
      'Explicitly explain why this specific company is your next career step'
    ],
    followUpQuestions: [
      'What differentiates your problem-solving approach from other candidates?',
      'What was the most challenging technical roadblock you encountered in your recent project?'
    ],
    commonMistakes: [
      'Starting from high school and reciting chronological education history',
      'Giving personal or non-professional life anecdotes',
      'Rambling past 2 minutes without a crisp conclusion'
    ],
    companies: ['All Technology Companies'],
    tags: ['HR Interview', 'Self Introduction', 'Elevator Pitch', 'Placement'],
    isVerified: true
  },
  {
    id: 'int-star-conflict',
    slug: 'star-technical-disagreement',
    title: 'STAR: Handling a Critical Technical Disagreement with a Teammate',
    trackSlug: 'fullstack-web',
    category: 'behavioral-star',
    difficulty: 'Medium',
    jobRoles: ['All Technology Career Tracks'],
    topic: 'Behavioral & Leadership',
    question: 'Tell me about a time you had a strong technical disagreement with a team member. How did you handle it and what was the outcome?',
    intent: 'Tests emotional intelligence, egoless engineering, data-driven decision making, and team collaboration.',
    comprehensiveAnswer: 'Situation: Disagreement over database selection (MongoDB vs PostgreSQL with ACID transactions). Task: Resolve dispute objectively without stalling project velocity. Action: Created a benchmark spike simulating anticipated write loads and transactional rollbacks, reviewed findings together, and compromised by using PostgreSQL with JSONB columns. Result: Delivered project on schedule with zero inconsistencies and established high mutual trust.',
    keyPointsToMention: [
      'Describe a real technical disagreement with respect and zero toxicity',
      'Use objective benchmarks/data rather than personal authority',
      'Compromise constructively (e.g. using JSONB columns in PostgreSQL)',
      'Highlight the positive long-term impact on team culture'
    ],
    followUpQuestions: [
      'What would you have done if your teammate still disagreed after seeing the data?',
      'Tell me about a time you were wrong and had to admit it to your team.'
    ],
    commonMistakes: [
      'Portraying the other person as incompetent or unreasonable',
      'Claiming you never have disagreements'
    ],
    companies: ['Amazon', 'Google', 'Microsoft', 'Atlassian'],
    tags: ['Behavioral', 'STAR Method', 'Conflict Resolution', 'Teamwork'],
    isVerified: true
  }
];
