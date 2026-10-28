// src/data/interviewQuestionsData.ts
// Comprehensive Interview Question Bank across all 18 technology career tracks

import { InterviewQuestion, MockInterviewPreset } from '../types/interview';

export const mockInterviewPresets: MockInterviewPreset[] = [
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

export const interviewQuestionsList: InterviewQuestion[] = [
  // ==========================================
  // 1. FULL STACK WEB DEVELOPMENT
  // ==========================================
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
    comprehensiveAnswer: `Traditional SSR renders HTML on the server and delivers both the HTML string and the entire JavaScript bundle to the client, where React must download, parse, and execute all component logic to attach event listeners ("hydration").

In contrast, React Server Components (RSC) execute exclusively on the server and are serialized into a special compact JSON-like stream (RSC payload) rather than shipping component code to the client bundle.

Key distinctions:
1. Zero Bundle Size: Third-party libraries used only in server components (e.g., date-fns, markdown parsers, heavy SQL drivers) never ship to the client browser.
2. Direct Backend Access: Server components can directly query databases, caches, and filesystem APIs with zero client-side fetch boilerplate.
3. Preserved Client State: Unlike traditional page refreshes, RSC payload streams can seamlessly merge into an existing client DOM tree without losing client component state (e.g., form inputs, cursor positions).
4. Waterfalls Reduction: Co-locating data fetching directly within component boundaries on the server eliminates round-trip network latency between client and server APIs.`,
    keyPointsToMention: [
      'Server components never bundle their code to the browser',
      'Hydration overhead is eliminated for server-only subtrees',
      'Client components are marked with "use client" directive at the leaf level',
      'Streaming HTML + RSC payload over chunked HTTP/2 responses'
    ],
    codeExample: `// Server Component (app/products/page.tsx)
import db from '@/lib/db';
import { ProductCard } from '@/components/ProductCard'; // Client component

export default async function ProductsPage() {
  // Direct DB query on server - zero bundle cost, zero API waterfall
  const products = await db.product.findMany({ take: 20 });

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}`,
    language: 'typescript',
    followUpQuestions: [
      'When would you still need to mark a component with "use client"?',
      'How does React Suspense coordinate with streaming RSC over HTTP chunking?'
    ],
    commonMistakes: [
      'Confusing Server Components with standard SSR (SSR sends JS for every component; RSC does not)',
      'Attempting to use useState, useEffect, or browser DOM events inside an RSC'
    ],
    companies: ['Vercel', 'Meta', 'Netflix', 'Shopify'],
    tags: ['React 19', 'RSC', 'Hydration', 'Performance', 'Full Stack'],
    rubricCriteria: {
      correctness: 'Accurately distinguishes RSC payload from SSR HTML and client JS bundles.',
      clarity: 'Explains the mental model of server vs client execution boundaries clearly.',
      problemSolving: 'Demonstrates awareness of network latency and waterfall elimination.',
      communication: 'Uses crisp technical terminology (serialization, streaming, tree merging).'
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
    comprehensiveAnswer: `In microservice architectures, traditional Two-Phase Commit (2PC) is strongly discouraged because it creates synchronous blocking across all participating database coordinators, dramatically reducing throughput and introducing single points of failure.

The industry-standard solution is the Saga Pattern, which breaks a distributed transaction into a sequence of local transactions managed through choreography or orchestration:

1. Orchestration vs Choreography:
   - Choreography: Each service executes its local transaction and publishes an asynchronous event (via Kafka/RabbitMQ) that triggers the next service.
   - Orchestration: A central coordinator (e.g., Temporal or an Order Saga Orchestrator) explicitly directs each service via commands and tracks state.

2. Compensating Actions for Rollback:
   - Because local transactions commit immediately to their respective databases, traditional ACID rollback is impossible across services.
   - If Payment fails after Order creation, the orchestrator triggers an explicit Compensating Transaction (e.g., CancelOrder, ReleaseInventoryReservation) that restores semantic consistency.

3. Idempotency & Outbox Pattern:
   - To prevent duplicate executions on network retries, every consumer must enforce idempotency keys.
   - Use the Transactional Outbox Pattern to guarantee that domain events are published reliably alongside database updates in a single local ACID transaction.`,
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
      'Failing to specify how rollbacks occur in a Saga (compensating transactions vs rollback)'
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

  // ==========================================
  // 2. FRONTEND ENGINEERING
  // ==========================================
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
    comprehensiveAnswer: `The browser runtime operates an Event Loop with distinct priority queues:

1. Call Stack: Synchronous JavaScript executes first until the stack is completely empty.
2. Microtask Queue: Contains Promise callbacks (.then, .catch, .finally), queueMicrotask, and MutationObserver callbacks.
   - CRITICAL RULE: After every single call stack frame or macrotask, the engine drains the ENTIRE microtask queue before moving forward. Any microtask scheduled while processing microtasks runs in the SAME cycle.
3. Render Step: If a frame is due (typically every 16.6ms for 60fps), the browser executes requestAnimationFrame callbacks, calculates style re-computation, layout, and paint.
4. Macrotask (Task) Queue: Contains setTimeout, setInterval, I/O events, and postMessage.
   - The event loop takes ONE macrotask from the queue, executes it, then immediately drains any new microtasks before considering rendering or the next task.`,
    keyPointsToMention: [
      'Synchronous stack executes first',
      'Microtasks take strict priority over macrotasks',
      'Entire microtask queue is exhausted before the next task or render',
      'requestAnimationFrame runs before layout/paint, ahead of queued timer tasks'
    ],
    codeExample: `console.log('1: Sync');

setTimeout(() => console.log('2: Macrotask setTimeout'), 0);

Promise.resolve().then(() => console.log('3: Microtask Promise'));

queueMicrotask(() => console.log('4: Microtask queueMicrotask'));

requestAnimationFrame(() => console.log('5: rAF'));

console.log('6: Sync end');

// Output Order:
// 1: Sync
// 6: Sync end
// 3: Microtask Promise
// 4: Microtask queueMicrotask
// 5: rAF (before paint)
// 2: Macrotask setTimeout`,
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
    comprehensiveAnswer: `Core Web Vitals measure real-world user experience and SEO ranking factors:

1. Interaction to Next Paint (INP - Target: <= 200ms):
   - Measures latency across all user clicks, taps, and keypresses by recording the time from user input until the next frame is actually painted.
   - INP breakdown: Input Delay + Processing Time + Presentation Delay.
   - Optimization:
     a) Yielding to Main Thread: Break long tasks (> 50ms) using scheduler.yield() or setTimeout(0).
     b) Non-blocking State: Use React startTransition for non-urgent filter/search updates so input typing stays at 60fps.
     c) Debounce heavy computations and offload sorting/filtering to Web Workers.

2. Cumulative Layout Shift (CLS - Target: <= 0.1):
   - Measures unexpected layout shifts occurring during the page lifecycle.
   - Common causes & fixes:
     a) Unsized Images/Ads: Always set explicit width and height attributes or CSS aspect-ratio.
     b) Web Fonts FOUT/FOIT: Use font-display: swap with size-adjust to match fallback font metrics.
     c) Dynamic Content Injection: Reserve space using CSS min-height or skeleton placeholders before fetching network banners.`,
    keyPointsToMention: [
      'INP replaced FID as an official Core Web Vital in March 2024',
      'INP covers the entire session lifetime, not just first interaction',
      'Use scheduler.yield() or startTransition to break main thread blocking',
      'Always specify aspect-ratio or min-height to prevent layout jumps'
    ],
    followUpQuestions: [
      'How does INP differ from First Input Delay (FID)?',
      'How do you measure Core Web Vitals in field data (RUM) vs synthetic lab data?'
    ],
    commonMistakes: [
      'Thinking INP only measures JavaScript execution without including presentation delay',
      'Using CSS transitions that trigger layout/reflow (width, height) instead of transform/opacity'
    ],
    companies: ['Airbnb', 'Stripe', 'Google', 'Flipkart'],
    tags: ['Web Vitals', 'INP', 'CLS', 'Performance Profiling', 'Frontend'],
    isVerified: true
  },

  // ==========================================
  // 3. BACKEND ENGINEERING
  // ==========================================
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
    comprehensiveAnswer: `Databases operate over block storage devices (SSDs/HDDs) where disk I/O is multiple orders of magnitude slower than CPU memory operations.

1. High Fan-out & Shallow Depth:
   - In Binary Trees, each node has at most 2 children. Searching through 10 million rows requires ~24 node lookups (log2(10M)), resulting in up to 24 separate random disk I/O reads.
   - In B+ Trees, a single node page matches the operating system block size (typically 4KB-16KB) and can hold hundreds of keys. A 4-level B+ Tree can index billions of rows with just 3-4 disk block reads.

2. Range Queries & Ordered Scans:
   - Hash indexes provide O(1) equality lookups (WHERE id = 5), but CANNOT perform range queries (WHERE age BETWEEN 20 AND 30) or ORDER BY because hash values destroy order.
   - In B+ Trees, all actual data pointers reside strictly in the leaf nodes, which are linked together as a bidirectional linked list. Once the starting leaf is found, range scanning is a fast sequential read across contiguous disk blocks.

3. Cache Locality:
   - Storing sequential keys in contiguous leaf nodes maximizes CPU cache hits and OS readahead pre-fetching.`,
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
      'Saying B+ Trees are faster in pure memory than Hash tables (Hash is O(1); B+ is O(log n))',
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
    comprehensiveAnswer: `In massive scale systems, unhandled cache failures can instantly cascade into catastrophic database outages:

1. Cache Stampede / Breakdown (Hot key expires, thousands of concurrent threads query DB simultaneously):
   - Solution 1: Distributed Mutex Lock (Redlock). The first thread acquires a lock to query the DB and update Redis; remaining threads await the cache update or serve stale data.
   - Solution 2: Probabilistic Early Expiration (XFetch algorithm). Threads compute whether to proactively refresh the cache in the background before the TTL expires based on request compute cost.

2. Cache Penetration (Requests query non-existent keys repeatedly, bypassing cache to hit DB):
   - Solution 1: Bloom Filter. Check a probabilistic Bloom filter in front of Redis; if the key doesn't exist, reject immediately with 404 without touching the DB.
   - Solution 2: Cache Null Values with a short TTL (e.g., 60 seconds).

3. Cache Avalanche (Millions of keys expire at the exact same second, flooding DB):
   - Solution: Add Jitter. Always append a randomized delta to TTLs: TTL = base_ttl + random(-60s, +60s).`,
    keyPointsToMention: [
      'Cache Stampede resolved via distributed locks or probabilistic early recomputation',
      'Cache Penetration resolved via Bloom Filters or caching null results',
      'Cache Avalanche mitigated by adding random TTL jitter',
      'Serve stale data while refreshing asynchronously'
    ],
    codeExample: `// Adding TTL Jitter in Node.js/Redis
function calculateTtlWithJitter(baseMinutes = 30) {
  const jitterSeconds = Math.floor(Math.random() * 120); // 0-2 min jitter
  return (baseMinutes * 60) + jitterSeconds;
}`,
    language: 'javascript',
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

  // ==========================================
  // 4. JAVA ENTERPRISE
  // ==========================================
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
    comprehensiveAnswer: `Prior to Java 21, java.lang.Thread wrapped an OS kernel thread in a 1:1 mapping. OS threads are heavy: each consumes ~1MB stack memory and context switching requires expensive kernel mode transitions, capping concurrent threads to a few thousand.

1. Virtual Threads Mechanics (M:N Mapping):
   - Virtual threads are lightweight user-mode threads managed entirely by the JVM, consuming less than 1KB memory.
   - When a virtual thread executes CPU instructions, the JVM mounts it onto an underlying OS carrier thread (from a ForkJoinPool).
   - When the virtual thread performs blocking I/O (e.g., JDBC query, HTTP call, Thread.sleep), the JVM unmounts the virtual thread, parks its stack frame on the heap, and frees the carrier thread to run other work.

2. Death of Reactive Complexity:
   - Eliminates the cognitive overhead and debugging nightmares of reactive paradigms (Mono/Flux, CompletableFuture). Developers write clean, readable sequential code with millions of concurrent threads.

3. Thread Pinning Caveat:
   - If a virtual thread enters a synchronized block or calls native code (JNI), it becomes "pinned" to its carrier thread, preventing unmounting during blocking I/O.
   - Solution: Replace legacy synchronized blocks with java.util.concurrent.locks.ReentrantLock.`,
    keyPointsToMention: [
      '1:1 OS thread model vs M:N JVM virtual thread scheduling',
      'Virtual threads unmount on blocking I/O, parking stack frames on the heap',
      'Enables synchronous thread-per-request code with reactive-level concurrency',
      'Avoid thread pinning by replacing synchronized blocks with ReentrantLock'
    ],
    codeExample: `// Java 21: Executing 100,000 Concurrent I/O Tasks
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1)); // Non-blocking to carrier thread!
            return "Task " + i;
        });
    });
} // Automatically waits for all tasks to complete`,
    language: 'java',
    followUpQuestions: [
      'Should you pool virtual threads like traditional thread pools?',
      'Why are virtual threads NOT suitable for CPU-intensive parallel computing (e.g., video rendering)?'
    ],
    commonMistakes: [
      'Attempting to pool virtual threads (they are disposable and should never be pooled)',
      'Believing virtual threads make CPU-bound algorithms faster'
    ],
    companies: ['Oracle', 'Goldman Sachs', 'LinkedIn', 'JPMorgan Chase'],
    tags: ['Java 21', 'Virtual Threads', 'Project Loom', 'Concurrency', 'JVM'],
    isVerified: true
  },

  // ==========================================
  // 5. PYTHON DEVELOPMENT
  // ==========================================
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
    comprehensiveAnswer: `The Global Interpreter Lock (GIL) is a mutex in CPython that prevents multiple native threads from executing Python bytecodes simultaneously. It was introduced to ensure thread-safe memory management because CPython uses reference counting for garbage collection.

1. Impact on Multithreading:
   - CPU-bound tasks (e.g., matrix multiplications, image processing): Multiple Python threads will fight over the single GIL lock, running sequentially and often performing slower than a single thread due to context-switch overhead. Use multiprocessing or NumPy/C-extensions to bypass the GIL.
   - I/O-bound tasks (e.g., network APIs, database queries): The GIL is automatically released while waiting for socket/file I/O, allowing other threads to run concurrently.

2. AsyncIO (Cooperative Multitasking):
   - AsyncIO uses a single thread with an Event Loop and Coroutines (async/await).
   - When a coroutine reaches an 'await' statement (e.g., await http_get()), it yields execution back to the event loop. The loop switches to another ready coroutine without kernel context switches or thread overhead.`,
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
      'Using time.sleep() instead of asyncio.sleep() in async functions, which halts the entire event loop'
    ],
    companies: ['Dropbox', 'Instagram', 'Spotify', 'Google'],
    tags: ['Python', 'GIL', 'AsyncIO', 'Concurrency', 'CPython'],
    isVerified: true
  },

  // ==========================================
  // 6. AI & MACHINE LEARNING
  // ==========================================
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
    comprehensiveAnswer: `Scaled Dot-Product Attention maps a query and a set of key-value pairs to an output:
Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V

1. The Components:
   - Q (Queries): Representation of the current token seeking context.
   - K (Keys): Representation of all tokens offering context.
   - V (Values): The actual semantic information extracted from tokens.
   - The dot product (Q * K^T) computes compatibility scores between every pair of tokens.

2. Why Scale by sqrt(d_k)?:
   - For large projection dimensions d_k, the dot products grow large in magnitude.
   - When large inputs enter the softmax function, the softmax output is pushed into regions with extremely small gradients (vanishing gradients), halting model convergence. Dividing by sqrt(d_k) normalizes the variance back to 1.

3. Self-Attention vs Cross-Attention:
   - Self-Attention: Q, K, and V all originate from the same sequence (e.g., encoder tokens attending to encoder tokens).
   - Cross-Attention: Q originates from the decoder sequence, while K and V originate from the encoder output (enabling the decoder to query source context).`,
    keyPointsToMention: [
      'Formula: Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V',
      'Scaling by sqrt(d_k) prevents softmax gradient saturation/vanishing',
      'Multi-Head Attention enables attending to multiple semantic subspaces',
      'Self-attention has O(N^2) computational and memory complexity with respect to sequence length'
    ],
    followUpQuestions: [
      'Why does standard self-attention have O(N^2) complexity, and how do FlashAttention or Linear Attention mitigate this?',
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

  // ==========================================
  // 7. CYBERSECURITY
  // ==========================================
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
    comprehensiveAnswer: `XSS and CSRF exploit browser security mechanisms in opposite ways:

1. Cross-Site Scripting (XSS):
   - Exploitation: The attacker injects malicious JavaScript into a trusted website (Stored, Reflected, or DOM-based). The browser executes the malicious script under the victim's origin.
   - Impact: Steals session tokens (localStorage/cookies), logs keystrokes, exfiltrates data.
   - Defenses: Context-aware output encoding (React JSX auto-escapes), DOMPurify sanitization, and strict Content Security Policy (CSP) blocking unauthorized script domains and inline execution.

2. Cross-Site Request Forgery (CSRF):
   - Exploitation: The attacker tricks the victim's browser into executing an unauthorized state-changing HTTP request to a target application where the user is currently authenticated. The browser automatically attaches stored cookies ("ambient credentials").
   - Impact: Executes unauthorized actions (e.g., transfer funds, change email) without stealing the cookie.
   - Defenses:
     a) SameSite Cookies: Setting SameSite=Lax or SameSite=Strict prevents cross-origin requests from automatically attaching authentication cookies.
     b) Anti-CSRF Synchronizer Tokens: Cryptographic tokens validated on the server for state-changing POST/PUT requests.`,
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
      'Confusing the two: thinking CSRF steals credentials (CSRF never sees the response or cookies)',
      'Assuming CORS headers protect against CSRF (CORS restricts reading responses, not executing requests)'
    ],
    companies: ['Cloudflare', 'CrowdStrike', 'Palo Alto Networks', 'Akamai'],
    tags: ['Cybersecurity', 'OWASP', 'XSS', 'CSRF', 'SameSite', 'CSP'],
    isVerified: true
  },

  // ==========================================
  // 8. CLOUD & DEVOPS / SRE
  // ==========================================
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
    comprehensiveAnswer: `A systematic SRE triage methodology isolates the issue rapidly:

Step 1: Check Pod Status & Exit Codes:
  $ kubectl describe pod <pod-name> -n <namespace>
  - Look at the 'Last State' block.
  - If Exit Code 137: The container was terminated by SIGKILL, almost always meaning OOMKilled (exceeded memory limits).
  - If Exit Code 1: Application unhandled exception or crash.
  - If Exit Code 143: Graceful SIGTERM timeout.

Step 2: Inspect Application Crash Logs:
  $ kubectl logs <pod-name> -n <namespace> --previous
  - The --previous flag is crucial because the restarted container's current log may be blank. Look for stack traces, missing environment variables, or database connection timeouts.

Step 3: Verify Liveness & Readiness Probes:
  - If the application starts slowly (e.g., long Spring Boot startup) and the liveness probe fires too early, Kubernetes kills the pod in a continuous restart loop.
  - Increase initialDelaySeconds or introduce a startupProbe.

Step 4: Check Configurations & Secrets:
  - Verify that referenced ConfigMaps or Secret keys exist and are formatted correctly. A missing required env variable frequently causes immediate exit.

Step 5: Rollback if SLA is at risk:
  $ kubectl rollout undo deployment/<deployment-name> -n <namespace>`,
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

  // ==========================================
  // 9. DATA SCIENCE & ANALYTICS
  // ==========================================
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
    comprehensiveAnswer: `Scientific A/B testing requires rigorous experimental design:

1. Power Analysis for Sample Size:
   Sample size calculation depends on 4 interdependent parameters:
   - Baseline Conversion Rate (p): Current benchmark performance.
   - Minimum Detectable Effect (MDE): The smallest percentage uplift that has business value to detect.
   - Significance Level (alpha, typically 0.05): Probability of Type I error (False Positive).
   - Statistical Power (1 - beta, typically 0.80): Probability of correctly rejecting a false null hypothesis (avoiding Type II error / False Negative).

2. The "Peeking Problem" (Continuous Monitoring):
   - If an experimenter continuously checks p-values every day and stops as soon as p < 0.05, the true Type I error rate skyrockets from 5% to over 30%!
   - This occurs because random noise fluctuations will eventually cross the significance boundary by chance (multiple comparisons over time).

3. Remedies for Peeking:
   - Fixed-Horizon Testing: Pre-determine sample size and evaluate ONLY when target samples are reached.
   - Sequential Testing: Use Always Valid P-values (AVPV) or Wald's Sequential Probability Ratio Test (SPRT) which dynamically adjusts significance thresholds.`,
    keyPointsToMention: [
      'Sample size requires Baseline, MDE, Alpha (Type I), and Power (1-Beta)',
      'Continuous peeking inflates false positive rates dramatically',
      'Use Fixed-Horizon testing or Sequential Testing (mSPRT / Bonferroni correction)',
      'Focus on practical business significance alongside statistical significance'
    ],
    followUpQuestions: [
      'How do you handle network interference or spillover effects in marketplace A/B tests (e.g., Uber or Airbnb)?',
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

  // ==========================================
  // 10. UI/UX DESIGN
  // ==========================================
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
    comprehensiveAnswer: `Jakob Nielsen's 10 Usability Heuristics serve as the industry benchmark for heuristic evaluations:

1. Visibility of System Status (Heuristic #1):
   - The design should always keep users informed about what is going on through appropriate feedback within reasonable time.
   - Checkout Application: Show a clear multi-step progress bar ("Cart > Shipping > Payment > Review"), persistent real-time cart subtotal updates, and visible loading indicators with disabled submit buttons during card authorization to prevent double-charging.

2. Error Prevention (Heuristic #5):
   - Even better than good error messages is a careful design which prevents a problem from occurring in the first place.
   - Checkout Application: Pre-validate credit card numbers with the Luhn algorithm before submission, offer inline address auto-complete (Google Places API), and warn users explicitly if their cart contains out-of-stock items before they reach the payment gateway.

3. Recognition Rather Than Recall (Heuristic #6):
   - Minimize the user's memory load by making objects, actions, and options visible.
   - Checkout Application: Display thumbnail images, selected sizes, and quantities of purchased products directly on the payment screen so users do not have to navigate backward to verify their order details.`,
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
      'Evaluating visual styling rather than interaction architecture and mental models'
    ],
    companies: ['Apple', 'Figma', 'Airbnb', 'Uber'],
    tags: ['UI/UX', 'Design Systems', 'Usability', 'Heuristics', 'Interaction Design'],
    isVerified: true
  },

  // ==========================================
  // 11. SOFTWARE TESTING & QA
  // ==========================================
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
    comprehensiveAnswer: `Modern test automation demands deterministic execution and maintainable codebases:

1. Page Object Model (POM) Best Practices:
   - Encapsulation: Each web page or major UI component (e.g., NavigationBar, CheckoutModal) is represented by a dedicated class. Locators and interaction methods live inside the POM; test files contain ONLY assertions and test intent.
   - Use Playwright Locators: Prefer user-facing locators (page.getByRole, page.getByLabel, page.getByText) over brittle CSS selectors or XPaths.

2. Root Causes of Flaky Tests & Elimination:
   - Explicit Hardcoded Sleeps (page.waitForTimeout(5000)): NEVER use hardcoded sleep timers. Playwright provides built-in auto-waiting for actionability (visible, stable, enabled) before clicking or filling.
   - Race Conditions & Async Data: Use web-first assertions like await expect(locator).toBeVisible() which automatically poll with configurable timeouts.
   - Network Dependency: Intercept and mock volatile external third-party APIs (Stripe, Analytics) using page.route() to test UI state deterministically.
   - Shared State Pollution: Ensure tests run in complete isolation with clean browser contexts and isolated database test tenants.`,
    keyPointsToMention: [
      'Encapsulate selectors in POM classes; keep test specs focused on assertions',
      'Use user-facing accessibility locators (getByRole, getByLabel)',
      'Ban arbitrary sleep timeouts in favor of Playwright auto-waiting',
      'Mock third-party volatile services with page.route()'
    ],
    codeExample: `// Playwright Page Object Model
export class LoginPage {
  constructor(private page: Page) {}

  readonly usernameInput = this.page.getByLabel('Username or Email');
  readonly passwordInput = this.page.getByLabel('Password');
  readonly loginButton = this.page.getByRole('button', { name: 'Sign In' });

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}`,
    language: 'typescript',
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

  // ==========================================
  // 12. MOBILE DEVELOPMENT
  // ==========================================
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
    comprehensiveAnswer: `The legacy React Native architecture relied on an asynchronous JSON Bridge to communicate between the JavaScript thread and native OS threads (Android Java/Kotlin and iOS Obj-C/Swift). All data had to be serialized into JSON strings, queued, and deserialized on the other side.

Bottlenecks of the Old Bridge:
1. Overhead: Heavy JSON serialization cost.
2. Asynchronous Only: Fast UI interactions (like rapid list scrolling or gestures) dropped frames because native UI could not wait for asynchronous JS calculations ("white blank screen" while scrolling).

How the New Architecture Solves It:
1. JavaScript Interface (JSI):
   - Replaces the bridge with a lightweight C++ interface layer.
   - JavaScript code can hold direct references to native C++ host objects and invoke native methods synchronously without any JSON serialization!

2. TurboModules:
   - Native modules (Bluetooth, Camera, Storage) load lazily on-demand rather than all being initialized up-front on app startup, slashing app launch times.

3. Fabric Renderer:
   - Uses JSI to communicate directly with native UI layers. Allows layout calculations (via Yoga engine in C++) and renders directly on the UI thread with synchronous priority for gestures and scroll events.`,
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
      'Believing React Native compiles JavaScript into native Java/Objective-C bytecode (JS runs in Hermes/V8)',
      'Thinking JSI is just a faster bridge (it completely eliminates the bridge)'
    ],
    companies: ['Meta', 'Shopify', 'Coinbase', 'Discord'],
    tags: ['React Native', 'Mobile', 'JSI', 'TurboModules', 'Fabric'],
    isVerified: true
  },

  // ==========================================
  // 13. DATA ANALYTICS & BI
  // ==========================================
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
    comprehensiveAnswer: `In analytical data warehousing (OLAP), data modeling prioritizes query read performance and aggregations over write transaction speed:

1. Star Schema:
   - Architecture: A central Fact table (e.g., fact_sales with metrics like revenue, quantity) surrounded by completely denormalized Dimension tables (dim_customer, dim_product, dim_store).
   - Pros: Simple intuitive queries, minimal JOIN operations (typically a single join from fact to dimension), and significantly faster execution for reporting and BI dashboards.
   - Cons: Data redundancy in dimension tables (e.g., repeating city/state in customer table).

2. Snowflake Schema:
   - Architecture: A normalized extension of the star schema where dimension tables are broken down into sub-dimensions (e.g., dim_customer joins to dim_city which joins to dim_state).
   - Pros: Eliminates data redundancy, saves storage space, easier maintenance for dimension updates.
   - Cons: Requires multiple complex JOINs, degrading query throughput on large analytical queries.

3. Modern Cloud Warehouses Verdict:
   - In modern columnar warehouses (Snowflake, BigQuery, Redshift), storage is exceptionally cheap and columnar compression handles repeated values with near-zero overhead.
   - Star schema (denormalization) is overwhelmingly preferred because minimizing JOINs maximizes parallel columnar scan performance.`,
    keyPointsToMention: [
      'Fact tables store numerical metrics; Dimension tables store descriptive context',
      'Star schema is denormalized with minimal joins; Snowflake is normalized',
      'Modern columnar cloud warehouses heavily favor Star schema for query speed',
      'Storage compression in BigQuery/Snowflake renders normalization benefits negligible'
    ],
    codeExample: `// Star Schema Query (1 clean join per dimension)
SELECT 
    d.product_category,
    t.year,
    SUM(f.revenue) AS total_sales
FROM fact_orders f
JOIN dim_product d ON f.product_id = d.product_id
JOIN dim_time t ON f.order_date_id = t.date_id
GROUP BY d.product_category, t.year
ORDER BY total_sales DESC;`,
    language: 'sql',
    followUpQuestions: [
      'What is a Slowly Changing Dimension (SCD Type 1 vs Type 2)?',
      'How does columnar storage differ from row-oriented storage for analytical aggregates?'
    ],
    commonMistakes: [
      'Applying OLTP normalization rules (3NF) directly to analytical data warehouses',
      'Failing to recognize that joins are the primary performance bottleneck in Big Data queries'
    ],
    companies: ['Snowflake', 'Palantir', 'Capital One', 'Uber'],
    tags: ['Data Analytics', 'SQL', 'Data Warehousing', 'Star Schema', 'BI'],
    isVerified: true
  },

  // ==========================================
  // 14. BLOCKCHAIN & WEB3
  // ==========================================
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
    comprehensiveAnswer: `A reentrancy attack occurs when an external smart contract calls back into the calling contract before the first execution completes, manipulating the contract state:

1. How the Attack Works:
   - A vulnerable contract allows users to withdraw ETH. It reads the user's balance, sends ETH using address.call{value: amount}(""), and THEN sets balance[user] = 0.
   - When the contract sends ETH to an attacker contract, the attacker's fallback() or receive() function executes automatically.
   - Inside the fallback function, the attacker calls withdraw() AGAIN. Because balance[user] has not yet been set to 0, the check passes and ETH is sent again!
   - This recursive loop drains the entire contract balance until gas is exhausted.

2. Checks-Effects-Interactions Pattern:
   - Checks: Validate all inputs and requirements first (require(balance >= amount)).
   - Effects: Update internal contract state IMMEDIATELY (balance[user] = 0).
   - Interactions: Interact with external contracts or send ETH ONLY AFTER internal state changes are committed.

3. ReentrancyGuard Mutex:
   - OpenZeppelin's ReentrancyGuard modifier sets a temporary state lock (nonReentrant) during the function execution, causing any reentrant attempt to revert immediately.`,
    keyPointsToMention: [
      'External calls hand control to the recipient before state updates occur',
      'Attacker fallback function recursively calls back into the vulnerable function',
      'Checks-Effects-Interactions: Update state BEFORE sending ETH',
      'Use OpenZeppelin nonReentrant mutex modifier as defense in depth'
    ],
    codeExample: `// SECURE IMPLEMENTATION using Checks-Effects-Interactions
function withdraw(uint256 amount) external nonReentrant {
    // 1. CHECKS
    require(balances[msg.sender] >= amount, "Insufficient balance");

    // 2. EFFECTS (State updated BEFORE external call!)
    balances[msg.sender] -= amount;

    // 3. INTERACTIONS
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "ETH transfer failed");
}`,
    language: 'solidity',
    followUpQuestions: [
      'Why is transfer() or send() no longer recommended over call() in modern Solidity?',
      'What is read-only reentrancy and how does it affect DeFi price oracles?'
    ],
    commonMistakes: [
      'Updating user balances after making the external call',
      'Assuming require(success) prevents reentrancy (it only checks if the call succeeded)'
    ],
    companies: ['Chainlink', 'Uniswap', 'ConsenSys', 'Polygon'],
    tags: ['Blockchain', 'Solidity', 'Smart Contracts', 'Security', 'Reentrancy'],
    isVerified: true
  },

  // ==========================================
  // 15. GAME DEVELOPMENT
  // ==========================================
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
    comprehensiveAnswer: `In game engines (Unity, Unreal, custom C++ engines), separating game rendering from physics calculation is critical:

1. The Flaw of Variable deltaTime in Physics:
   - If physics uses variable frame time: position += velocity * deltaTime.
   - If frame rate drops from 60fps (16ms) to 15fps (66ms) due to background CPU spikes, a character moves 4x further in a single physics tick.
   - This leads to catastrophic tunneling (passing straight through walls/floors) and non-deterministic multiplayer behavior.

2. Fixed Timestep with Accumulator (Fix Your Timestep):
   - Measure real elapsed time since last frame and add it to an accumulator.
   - Run physics updates in fixed discrete slices (e.g., dt = 1/60s = 0.0166s) as long as accumulator >= dt, subtracting dt each time.
   - Physics runs deterministically regardless of the monitor refresh rate (60Hz, 144Hz, or 240Hz).

3. State Interpolation for Rendering:
   - Because rendering occurs at arbitrary refresh rates between physics ticks, interpolate rendering position between previousState and currentState based on remaining accumulator alpha:
   renderPosition = previousPos * (1 - alpha) + currentPos * alpha.`,
    keyPointsToMention: [
      'Variable deltaTime causes physics tunneling and non-deterministic behavior',
      'Accumulator consumes discrete fixed time slices (e.g. 1/60s)',
      'Interpolation between previous and current physics state ensures buttery visual smoothness',
      'Essential for client-side prediction in multiplayer netcode'
    ],
    followUpQuestions: [
      'What is the "Spiral of Death" in an accumulator loop and how do you clamp maximum frame time?',
      'How does Quadtree or BVH spatial partitioning optimize collision detection broadphase?'
    ],
    commonMistakes: [
      'Calling physics raycasts or forces inside the variable render update loop',
      'Failing to interpolate render state, causing visual stuttering on high-refresh monitors'
    ],
    companies: ['Electronic Arts', 'Epic Games', 'Ubisoft', 'Riot Games'],
    tags: ['Game Development', 'Game Loop', 'Physics', 'Delta Time', 'C++'],
    isVerified: true
  },

  // ==========================================
  // 16. COMPUTER NETWORKING
  // ==========================================
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
    comprehensiveAnswer: `TCP provides reliable, ordered, error-checked delivery of byte streams across IP networks:

1. TCP 3-Way Handshake (Connection Establishment):
   - Client sends SYN: Sequence Number = x (Flag: SYN=1).
   - Server sends SYN-ACK: Sequence Number = y, Acknowledgment Number = x + 1 (Flags: SYN=1, ACK=1).
   - Client sends ACK: Sequence Number = x + 1, Acknowledgment Number = y + 1 (Flag: ACK=1). Connection established (ESTABLISHED).

2. TCP 4-Way Teardown (Connection Termination):
   - TCP is full-duplex, meaning both directions close independently:
   - Step 1: Active closer sends FIN (FIN_WAIT_1).
   - Step 2: Passive closer sends ACK (CLOSE_WAIT); active closer enters FIN_WAIT_2.
   - Step 3: Passive closer finishes sending its data and sends FIN (LAST_ACK).
   - Step 4: Active closer sends ACK and enters TIME_WAIT state.

3. Why the TIME_WAIT State Exists (2 * Maximum Segment Lifetime / ~60-120s):
   - Reason 1: Ensure Final ACK Delivery: If the active closer's final ACK is lost in transit, the passive closer retransmits its FIN. If the active closer closed immediately, it would respond with an RST error, leaving the server in an unclean hanging state.
   - Reason 2: Prevent Old Duplicate Packets: Ensures lingering duplicate packets delayed in intermediate router queues expire before a new connection reuses the identical IP/Port 4-tuple.`,
    keyPointsToMention: [
      'SYN(x) -> SYN(y)+ACK(x+1) -> ACK(y+1)',
      'Full duplex teardown requires independent FIN and ACK pairs in both directions',
      'TIME_WAIT lasts 2*MSL (Maximum Segment Lifetime)',
      'TIME_WAIT guarantees final ACK delivery and drains delayed packets from the network'
    ],
    followUpQuestions: [
      'What happens when a high-traffic server generates thousands of short-lived outbound TCP connections (TIME_WAIT socket exhaustion)?',
      'How does TLS 1.3 reduce handshake latency compared to TLS 1.2 (0-RTT vs 2-RTT)?'
    ],
    commonMistakes: [
      'Claiming TCP connection closes with 2 or 3 packets (it requires 4 because it is full duplex)',
      'Thinking TIME_WAIT is a bug or error state'
    ],
    companies: ['Cisco', 'Cloudflare', 'Juniper Networks', 'Amazon Web Services'],
    tags: ['Networking', 'TCP/IP', 'Handshake', 'Protocols', 'Sockets'],
    isVerified: true
  },

  // ==========================================
  // 17. C++ & LOW-LEVEL SYSTEMS
  // ==========================================
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
    comprehensiveAnswer: `Modern C++ enforces deterministic resource management without garbage collection pauses:

1. Resource Acquisition Is Initialization (RAII):
   - Resources (heap memory, file handles, database connections, mutex locks) are acquired in an object's constructor and released automatically in its destructor.
   - When an object goes out of scope (normal exit or exception unwinding), destructors run deterministically, guaranteeing zero memory leaks.

2. Smart Pointer Memory Models:
   - std::unique_ptr: Zero-overhead abstraction. Its memory footprint is identical to a raw pointer (8 bytes on 64-bit). Cannot be copied, only moved (std::move).
   - std::shared_ptr: Has 2 pointers (16 bytes): one to the managed object, and one to a heap-allocated Control Block containing:
     a) Strong reference count (atomic integer)
     b) Weak reference count (atomic integer)
     c) Custom deleter (if any)
   - Prefer std::make_shared() because it allocates the object and control block together in a single contiguous memory block, boosting cache locality and avoiding 2 separate malloc calls.

3. Move Semantics & Rvalue References (&&):
   - Prior to C++11, passing objects like std::vector by value triggered deep copies of internal heap buffers.
   - Move semantics "steals" the internal heap pointer of a temporary (rvalue) object and sets the source's pointer to nullptr, transforming expensive O(N) memory allocations into a lightning-fast O(1) pointer swap.`,
    keyPointsToMention: [
      'RAII ties resource lifetimes to stack scope and destructor calls',
      'std::unique_ptr has zero size and performance overhead compared to raw pointers',
      'std::shared_ptr maintains an atomic reference count control block on the heap',
      'Move semantics transfers pointer ownership from rvalues without allocating new memory'
    ],
    codeExample: `// Modern C++ Move Constructor Concept
class Buffer {
    int* data;
    size_t size;
public:
    // Move Constructor: Steal pointer in O(1) time
    Buffer(Buffer&& other) noexcept 
        : data(other.data), size(other.size) {
        other.data = nullptr; // Reset source so destructor won't double-free
        other.size = 0;
    }
};`,
    language: 'cpp',
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

  // ==========================================
  // 18. BEHAVIORAL & HR INTERVIEWS (STAR METHOD)
  // ==========================================
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
    comprehensiveAnswer: `The ideal response follows the Present-Past-Future framework in under 90 seconds:

1. Present (30s): "Currently, I am a software engineer / computer science graduate specializing in [Target Career Track, e.g. Full Stack Engineering with TypeScript and React]. Most recently, I have been building production-grade web applications focused on scalable backend architectures and real-time user experiences."

2. Past (30s): "My engineering journey started when I developed an interest in systems and data structures. Over the past few years, I built [Flagship Project Name], a distributed application that solved [concrete business problem]. In that project, I tackled [notable technical challenge, e.g. reducing query latency by 40% via Redis caching] and collaborated closely in agile code reviews."

3. Future & Alignment (20s): "What excites me about this role at [Company Name] is your work on [specific product or engineering challenge]. I am looking for a team where I can apply my execution speed and deep problem-solving skills to high-impact products."`,
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
    comprehensiveAnswer: `Structure the response strictly using the STAR framework:

1. Situation:
   "During our team's capstone project, our frontend engineer wanted to store deeply nested user profile documents in MongoDB, whereas I advocated for PostgreSQL with relational schemas because our platform required strict foreign keys and ACID financial transactions for paid workshop tickets."

2. Task:
   "My objective was to ensure data consistency and prevent catastrophic schema drift without creating interpersonal friction or stalling project velocity."

3. Action:
   "Instead of debating personal preferences or arguing in meetings, I proposed a data-driven spike. I created a benchmark script simulating our anticipated queries: user signups, transactional ticket purchases, and complex reporting joins. I invited my teammate to review the benchmark results together. When we analyzed the ACID rollback requirements for payment failures, the safety guarantees of PostgreSQL foreign keys became evident to both of us. At the same time, I incorporated his feedback by utilizing PostgreSQL JSONB columns for flexible user preference tags, honoring his desire for schema adaptability."

4. Result:
   "We deployed the database schema on schedule with zero relational inconsistencies across 2,000+ test transactions. More importantly, my teammate appreciated that we resolved the conflict objectively through code rather than ego, which established a high-trust partnership for the rest of the project."`,
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
      'Claiming you never have disagreements (shows lack of experience or honesty)'
    ],
    companies: ['Amazon', 'Google', 'Microsoft', 'Atlassian'],
    tags: ['Behavioral', 'STAR Method', 'Conflict Resolution', 'Teamwork'],
    isVerified: true
  }
];
