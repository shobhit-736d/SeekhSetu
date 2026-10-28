
export const assessmentPresetsList = [
  {
    id: 'preset-frontend-benchmark',
    slug: 'frontend-benchmark',
    title: 'Frontend Architecture & DOM Benchmark',
    description: 'Assess deep knowledge of React 19, JavaScript Event Loop, Web Vitals, CSS Grid, and client-side performance.',
    trackSlug: 'frontend',
    category: 'Software Engineering',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['React', 'JavaScript', 'Web Performance', 'DOM']
  },
  {
    id: 'preset-backend-system-design',
    slug: 'backend-system-design',
    title: 'Backend Systems, APIs & Concurrency',
    description: 'Evaluate mastery of REST/gRPC protocols, database indexing, ACID guarantees, caching, and distributed locks.',
    trackSlug: 'backend',
    category: 'Software Engineering',
    difficulty: 'Intermediate',
    durationMinutes: 25,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'System Design', 'Concurrency']
  },
  {
    id: 'preset-fullstack-comprehensive',
    slug: 'fullstack-comprehensive',
    title: 'Full Stack Engineering Readiness Exam',
    description: 'Comprehensive evaluation spanning full-stack application lifecycle, authentication, state synchronization, and database transactions.',
    trackSlug: 'fullstack-web',
    category: 'Software Engineering',
    difficulty: 'Comprehensive',
    durationMinutes: 30,
    questionCount: 12,
    passingScorePercent: 75,
    tags: ['Full Stack', 'Architecture', 'Security', 'Database']
  },
  {
    id: 'preset-aiml-foundations',
    slug: 'aiml-foundations',
    title: 'Machine Learning & Deep Learning Core',
    description: 'Test foundational linear algebra, neural network backpropagation, gradient descent variants, and overfitting remedies.',
    trackSlug: 'ai-ml',
    category: 'Data & AI',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['Machine Learning', 'Deep Learning', 'PyTorch', 'Math']
  },
  {
    id: 'preset-devops-sre-exam',
    slug: 'devops-sre-exam',
    title: 'DevOps, CI/CD & Kubernetes Certification Mock',
    description: 'Benchmark containerization, declarative GitOps, Kubernetes networking, Prometheus monitoring, and Terraform state.',
    trackSlug: 'devops-sre',
    category: 'Cloud & Infrastructure',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'SRE']
  },
  {
    id: 'preset-cloud-solutions',
    slug: 'cloud-solutions',
    title: 'Cloud Architecture & Multi-AZ Resiliency',
    description: 'Verify understanding of AWS IAM least-privilege, VPC subnets, serverless architectures, and asynchronous event streams.',
    trackSlug: 'cloud-computing',
    category: 'Cloud & Infrastructure',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['AWS', 'Cloud Architecture', 'IAM', 'VPC', 'Serverless']
  },
  {
    id: 'preset-cybersecurity-defense',
    slug: 'cybersecurity-defense',
    title: 'Cybersecurity Threat Detection & Defense',
    description: 'Test OWASP Top 10 vulnerabilities, public-key cryptography, JWT forgery prevention, and network segmentation.',
    trackSlug: 'cybersecurity',
    category: 'Security',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['OWASP', 'Cryptography', 'Network Security', 'SOC']
  },
  {
    id: 'preset-python-dev-eval',
    slug: 'python-dev-eval',
    title: 'Modern Python Mastery & AsyncIO',
    description: 'Validate knowledge of Python GIL, generators, decorators, memory management, and asynchronous concurrency.',
    trackSlug: 'python-dev',
    category: 'Software Engineering',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    questionCount: 8,
    passingScorePercent: 70,
    tags: ['Python', 'AsyncIO', 'Decorators', 'GIL', 'FastAPI']
  },
  {
    id: 'preset-java-enterprise-eval',
    slug: 'java-enterprise-eval',
    title: 'Java 21 Enterprise & Spring Boot Benchmark',
    description: 'Evaluate Java virtual threads (Loom), JVM garbage collection, Spring dependency injection, and JPA caching.',
    trackSlug: 'java-enterprise',
    category: 'Software Engineering',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['Java 21', 'Spring Boot', 'JVM', 'Virtual Threads', 'Hibernate']
  },
  {
    id: 'preset-data-science-eval',
    slug: 'data-science-eval',
    title: 'Data Science & Statistical Inference',
    description: 'Test hypothesis testing, p-values, feature engineering, regression diagnostics, and pandas vectorization.',
    trackSlug: 'data-science',
    category: 'Data & AI',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['Statistics', 'Pandas', 'Feature Engineering', 'Hypothesis Testing']
  },
  {
    id: 'preset-data-analytics-eval',
    slug: 'data-analytics-eval',
    title: 'SQL Analytics & BI Data Modeling',
    description: 'Benchmark SQL window functions, CTEs, star schemas, dimensional modeling, and business KPI computations.',
    trackSlug: 'data-analytics',
    category: 'Data & AI',
    difficulty: 'Beginner',
    durationMinutes: 15,
    questionCount: 8,
    passingScorePercent: 70,
    tags: ['SQL', 'Window Functions', 'Power BI', 'Data Modeling']
  },
  {
    id: 'preset-mobile-dev-eval',
    slug: 'mobile-dev-eval',
    title: 'Mobile Architecture & React Native / Android',
    description: 'Evaluate mobile UI thread lifecycle, offline caching, push notifications, native bridge, and memory profiling.',
    trackSlug: 'mobile-dev',
    category: 'Software Engineering',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    questionCount: 8,
    passingScorePercent: 70,
    tags: ['React Native', 'Android', 'iOS', 'Offline-First']
  },
  {
    id: 'preset-ui-ux-eval',
    slug: 'ui-ux-eval',
    title: 'UI/UX Design Systems & Usability Heuristics',
    description: 'Assess Nielsen Norman heuristics, accessibility (WCAG 2.2), information architecture, and micro-interactions.',
    trackSlug: 'ui-ux',
    category: 'Design & Product',
    difficulty: 'Beginner',
    durationMinutes: 15,
    questionCount: 8,
    passingScorePercent: 70,
    tags: ['Figma', 'UX Research', 'Heuristics', 'Design Systems', 'WCAG']
  },
  {
    id: 'preset-software-testing-eval',
    slug: 'software-testing-eval',
    title: 'QA Automation & Test Strategy Benchmark',
    description: 'Test Page Object Model, test pyramid, flaky test mitigation, Playwright locators, and CI test parallelization.',
    trackSlug: 'software-testing-qa',
    category: 'Software Engineering',
    difficulty: 'Beginner',
    durationMinutes: 15,
    questionCount: 8,
    passingScorePercent: 70,
    tags: ['Playwright', 'QA Automation', 'Testing Pyramid', 'CI/CD']
  },
  {
    id: 'preset-blockchain-eval',
    slug: 'blockchain-eval',
    title: 'Smart Contracts & Web3 Security',
    description: 'Evaluate Solidity reentrancy defenses, gas optimization, EVM memory layout, and cryptographic signatures.',
    trackSlug: 'blockchain-web3',
    category: 'Specialized Tech',
    difficulty: 'Advanced',
    durationMinutes: 20,
    questionCount: 8,
    passingScorePercent: 70,
    tags: ['Solidity', 'Ethereum', 'Smart Contracts', 'Security']
  },
  {
    id: 'preset-game-dev-eval',
    slug: 'game-dev-eval',
    title: 'Game Loop, Shaders & Physics Systems',
    description: 'Benchmark game loop delta timing, draw calls, spatial partitioning (quadtrees), and Rigidbody interpolation.',
    trackSlug: 'game-dev',
    category: 'Specialized Tech',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    questionCount: 8,
    passingScorePercent: 70,
    tags: ['Unity', 'Game Loop', 'Physics', 'Optimization', 'C#']
  },
  {
    id: 'preset-networking-eval',
    slug: 'networking-eval',
    title: 'Computer Networks & TCP/IP Mechanics',
    description: 'Test three-way handshakes, subnet masks, DNS resolution pipelines, TLS 1.3 handshakes, and BGP/OSPF routing.',
    trackSlug: 'networking-systems',
    category: 'Cloud & Infrastructure',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['TCP/IP', 'DNS', 'TLS', 'Subnetting', 'Routing']
  },
  {
    id: 'preset-systems-cpp-eval',
    slug: 'systems-cpp-eval',
    title: 'Modern C++ & Low-Level Memory Internals',
    description: 'Evaluate RAII, move semantics, smart pointers, memory alignment, virtual tables, and cache locality.',
    trackSlug: 'systems-cpp',
    category: 'Specialized Tech',
    difficulty: 'Advanced',
    durationMinutes: 25,
    questionCount: 10,
    passingScorePercent: 70,
    tags: ['C++20', 'Pointers', 'RAII', 'Memory Alignment', 'Move Semantics']
  }
];

export const assessmentQuestionsBank = [
  // ==================== 1. FULL STACK WEB DEVELOPMENT ====================
  {
    id: 'q-fs-1',
    trackSlug: 'fullstack-web',
    subject: 'Web Architecture & Security',
    topic: 'CORS & Cross-Origin Requests',
    difficulty: 'Intermediate',
    questionType: 'multiple-select',
    question: 'Which of the following HTTP response headers are required for a server to permit a cross-origin PUT request with a custom Authorization header?',
    options: [
      'Access-Control-Allow-Origin: https://app.example.com',
      'Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers: Authorization, Content-Type',
      'Access-Control-Allow-Credentials: true (only if cookies or authorization headers are sent)',
      'X-Permitted-Cross-Domain-Policies: all'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'A cross-origin PUT with an Authorization header triggers a preflight OPTIONS request. The server must explicitly respond with Access-Control-Allow-Origin, Access-Control-Allow-Methods including PUT, Access-Control-Allow-Headers including Authorization, and Access-Control-Allow-Credentials if credentialed mode is used.',
    hint: 'Custom headers and non-simple methods like PUT trigger browser preflight OPTIONS requests.',
    tags: ['CORS', 'HTTP Headers', 'Security', 'Web APIs'],
    isVerified: true
  },
  {
    id: 'q-fs-2',
    trackSlug: 'fullstack-web',
    subject: 'Database Transactions & State',
    topic: 'ACID Guarantees in Full Stack Apps',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    question: 'In an e-commerce checkout flow where inventory is decremented and an order record is created, what isolation anomaly occurs if User B reads the decremented inventory before User A aborts their transaction?',
    options: [
      'Dirty Read (Reading uncommitted data)',
      'Non-Repeatable Read (Data changed between queries in the same transaction)',
      'Phantom Read (New rows appeared matching a range query)',
      'Lost Update (Concurrent writes overwriting each other)'
    ],
    correctAnswers: [0],
    explanation: 'A Dirty Read occurs when a transaction reads data written by another concurrent uncommitted transaction that subsequently rolls back. Read Committed isolation level prevents Dirty Reads.',
    hint: 'The key phrase is "reads the decremented inventory before User A aborts".',
    tags: ['ACID', 'Databases', 'Transactions', 'System Design'],
    isVerified: true
  },
  {
    id: 'q-fs-3',
    trackSlug: 'fullstack-web',
    subject: 'Frontend-Backend Communication',
    topic: 'JWT vs Stateful Sessions',
    difficulty: 'Beginner',
    questionType: 'true-false',
    question: 'Storing a sensitive JWT directly in browser localStorage completely protects it from Cross-Site Scripting (XSS) attacks. True or False?',
    options: [
      'True',
      'False'
    ],
    correctAnswers: [1],
    explanation: 'False. Any JavaScript executing in the page origin (such as malicious script injected via XSS) has access to localStorage. Storing authentication tokens in an HttpOnly, Secure, SameSite cookie protects them from XSS extraction.',
    hint: 'Can arbitrary third-party JavaScript read window.localStorage?',
    tags: ['Security', 'JWT', 'XSS', 'Cookies'],
    isVerified: true
  },
  {
    id: 'q-fs-4',
    trackSlug: 'fullstack-web',
    subject: 'Full Stack Performance',
    topic: 'Server-Side Rendering & Hydration',
    difficulty: 'Advanced',
    questionType: 'mcq',
    codeSnippet: `// Server-rendered component
export default function UserWidget() {
  const isClient = typeof window !== 'undefined';
  return <div>{isClient ? window.innerWidth : 'Default'}</div>;
}`,
    question: 'What happens when this component hydrates on the browser client in a React SSR environment?',
    options: [
      'A Hydration Mismatch error occurs because server HTML differs from client initial render',
      'React silently ignores the difference and preserves the server HTML without re-rendering',
      'The server immediately re-renders with the client window width',
      'The page crashes with an Uncaught SyntaxError'
    ],
    correctAnswers: [0],
    explanation: 'In React SSR, the initial client render tree must match the server HTML structure. Accessing window or client-only properties during initial render causes a Hydration Mismatch warning. Client-only values should be rendered inside a useEffect hook.',
    hint: 'Compare the HTML produced on the server (typeof window is undefined) with the first pass on the client.',
    tags: ['SSR', 'Hydration', 'React', 'Full Stack'],
    isVerified: true
  },

  // ==================== 2. FRONTEND ENGINEERING ====================
  {
    id: 'q-fe-1',
    trackSlug: 'frontend',
    subject: 'React 19 & State Mechanics',
    topic: 'Closures in Hooks & Stale State',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(prev => prev + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}`,
    question: 'If the initial count is 0, what will count be rendered as after a single button click?',
    options: [
      '2',
      '3',
      '1',
      '0'
    ],
    correctAnswers: [0],
    explanation: 'React batches state updates. Both setCount(count + 1) evaluate count as 0 from the closure, scheduling count = 0 + 1 = 1. Then setCount(prev => prev + 1) takes that pending state (1) and increments it to 2.',
    hint: 'Notice that the first two calls use the closed-over count variable (0), while the third call uses an updater function.',
    tags: ['React', 'useState', 'Closures', 'Batching'],
    isVerified: true
  },
  {
    id: 'q-fe-2',
    trackSlug: 'frontend',
    subject: 'Browser Engine & Event Loop',
    topic: 'Microtasks vs Macrotasks Execution Order',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    codeSnippet: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
queueMicrotask(() => console.log('D'));
console.log('E');`,
    question: 'What is the exact sequence of characters output to the browser console?',
    options: [
      'A, E, C, D, B',
      'A, B, C, D, E',
      'A, E, B, C, D',
      'A, C, D, E, B'
    ],
    correctAnswers: [0],
    explanation: 'Synchronous execution outputs A and E. Then the microtask queue is completely drained in FIFO order (Promise callback C, then queueMicrotask D). Finally, the macrotask queue executes the setTimeout callback B.',
    hint: 'Synchronous call stack executes first, followed by microtask queue, followed by macrotask queue.',
    tags: ['JavaScript', 'Event Loop', 'Microtasks', 'Async'],
    isVerified: true
  },
  {
    id: 'q-fe-3',
    trackSlug: 'frontend',
    subject: 'Web Performance & Core Vitals',
    topic: 'Cumulative Layout Shift (CLS) Mitigation',
    difficulty: 'Intermediate',
    questionType: 'multiple-select',
    question: 'Which techniques directly prevent or reduce Cumulative Layout Shift (CLS) on a responsive web application?',
    options: [
      'Always reserve aspect-ratio or explicit width and height attributes on images and video embeds',
      'Reserve min-height for dynamically loaded ad containers or third-party widgets',
      'Avoid inserting new content above existing content without user interaction',
      'Use font-display: optional or preload critical web fonts to prevent FOIT/FOUT shift',
      'Minify JavaScript bundles using Brotli compression'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'CLS measures unexpected layout shifts. Reserving image aspect ratios, reserving space for dynamic ad banners, avoiding top injections, and font preloading directly mitigate layout shifts. Brotli compression improves LCP (load speed), not layout shifts directly.',
    hint: 'CLS is about visual stability and avoiding jumps when elements load asynchronously.',
    tags: ['Core Web Vitals', 'Performance', 'CLS', 'CSS'],
    isVerified: true
  },
  {
    id: 'q-fe-4',
    trackSlug: 'frontend',
    subject: 'Data Structures & Algorithms in Frontend',
    topic: 'Debounce & Throttle Implementation',
    difficulty: 'Intermediate',
    questionType: 'coding-challenge',
    question: 'Implement a debounce function that limits the rate at which an expensive search query or resize handler executes.',
    codingQuestionId: 'two-sum',
    options: [
      'Use setTimeout and clear existing timer on each subsequent invocation',
      'Use setInterval with a fixed period',
      'Run the handler immediately without clearing previous timers',
      'Block the main thread using a synchronous while loop'
    ],
    correctAnswers: [0],
    explanation: 'Debouncing delays invoking a function until after N milliseconds have elapsed since the last time the debounced function was invoked, clearing the previous timer with clearTimeout.',
    hint: 'Return a function that resets the timer on each invocation.',
    tags: ['Debounce', 'Frontend Algorithms', 'Optimization', 'Coding Arena'],
    isVerified: true
  },

  // ==================== 3. BACKEND ENGINEERING ====================
  {
    id: 'q-be-1',
    trackSlug: 'backend',
    subject: 'Distributed Systems & Caching',
    topic: 'Cache Invalidation & Stampede Defense',
    difficulty: 'Advanced',
    questionType: 'mcq',
    question: 'When a popular cached item expires in Redis under high concurrency (10,000 req/sec), thousands of requests simultaneously query the database. What strategy best prevents this "Cache Stampede" (Thundering Herd)?',
    options: [
      'Use a distributed mutex lock (e.g., Redlock) so only one worker queries the DB while others wait for cache refresh',
      'Increase the database pool size to 50,000 connections',
      'Switch the database to SQLite memory mode',
      'Disable caching completely to ensure data freshness'
    ],
    correctAnswers: [0],
    explanation: 'A distributed mutex lock or probabilistic early expiration (XFetch algorithm) ensures only a single request performs the expensive database query, repopulating the cache while other requests either wait or receive a stale-while-revalidate copy.',
    hint: 'Only one request needs to hit the database to re-warm the cache.',
    tags: ['Redis', 'Caching', 'System Design', 'Concurrency'],
    isVerified: true
  },
  {
    id: 'q-be-2',
    trackSlug: 'backend',
    subject: 'Database Engineering',
    topic: 'PostgreSQL B-Tree Indexing & Composite Keys',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    codeSnippet: `CREATE INDEX idx_users_org_created ON users (org_id, created_at);`,
    question: 'Given the composite index above, which SQL query will NOT be able to utilize this index effectively for scanning?',
    options: [
      'SELECT * FROM users WHERE created_at > NOW() - INTERVAL \'7 days\';',
      'SELECT * FROM users WHERE org_id = 42 AND created_at > NOW() - INTERVAL \'7 days\';',
      'SELECT * FROM users WHERE org_id = 42 ORDER BY created_at DESC;',
      'SELECT * FROM users WHERE org_id IN (1, 2, 3);'
    ],
    correctAnswers: [0],
    explanation: 'B-Tree composite indexes follow the Leftmost Prefix Rule. A query filtering only on created_at without specifying the leading column org_id cannot perform an index range scan on the B-tree.',
    hint: 'Remember the Leftmost Prefix Rule in composite indexing.',
    tags: ['PostgreSQL', 'Indexing', 'B-Tree', 'SQL Optimization'],
    isVerified: true
  },
  {
    id: 'q-be-3',
    trackSlug: 'backend',
    subject: 'API Protocols & Networking',
    topic: 'gRPC vs REST over HTTP/2',
    difficulty: 'Intermediate',
    questionType: 'true-false',
    question: 'gRPC uses Protocol Buffers (Protobuf) for binary serialization and multiplexes multiple requests concurrently over a single TCP connection using HTTP/2. True or False?',
    options: [
      'True',
      'False'
    ],
    correctAnswers: [0],
    explanation: 'True. Unlike standard REST over HTTP/1.1 (which suffers from head-of-line blocking and verbose JSON payloads), gRPC utilizes Protobuf binary encoding and HTTP/2 multiplexing for ultra-low latency microservice communication.',
    hint: 'Protobuf is binary and HTTP/2 supports multiplexed streams.',
    tags: ['gRPC', 'Protobuf', 'HTTP/2', 'Microservices'],
    isVerified: true
  },

  // ==================== 4. AI & MACHINE LEARNING ====================
  {
    id: 'q-ai-1',
    trackSlug: 'ai-ml',
    subject: 'Deep Learning & Optimization',
    topic: 'Vanishing Gradient & Activation Functions',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    question: 'Why did the introduction of ReLU (Rectified Linear Unit) largely resolve the vanishing gradient problem in deep feedforward neural networks compared to Sigmoid?',
    options: [
      'For all positive inputs (x > 0), the derivative of ReLU is constant (1.0), preventing gradients from decaying exponentially across deep layers',
      'ReLU normalizes inputs between -1 and 1 on every forward pass',
      'ReLU computes the inverse matrix of the weights',
      'ReLU requires negative weights to propagate gradients'
    ],
    correctAnswers: [0],
    explanation: 'The derivative of Sigmoid peaks at 0.25 and approaches 0 for large inputs. Multiplying values < 0.25 across dozens of layers causes gradients to vanish rapidly. For x > 0, ReLU derivative is 1.0, preserving gradient magnitude through backpropagation.',
    hint: 'What is the derivative of f(x) = max(0, x) for x > 0?',
    tags: ['Deep Learning', 'ReLU', 'Backpropagation', 'Gradients'],
    isVerified: true
  },
  {
    id: 'q-ai-2',
    trackSlug: 'ai-ml',
    subject: 'Model Evaluation & Metrics',
    topic: 'Precision, Recall & F1-Score in Imbalanced Data',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'In a medical fraud detection dataset where only 0.1% of transactions are fraudulent, a baseline model that predicts "Not Fraud" for every single transaction achieves 99.9% accuracy. Why is accuracy a misleading metric here?',
    options: [
      'The model has a Recall of 0% for the positive class (fraud), failing to detect a single fraudulent transaction despite high accuracy',
      'Accuracy cannot be calculated on binary classification tasks',
      'The model has 100% False Positive rate',
      'The dataset has too many dimensions for accuracy'
    ],
    correctAnswers: [0],
    explanation: 'In highly imbalanced datasets, accuracy is dominated by the majority class. Precision, Recall, and PR-AUC are far more informative because Recall measures how many actual positive instances were successfully identified.',
    hint: 'How many actual fraud cases did the baseline catch?',
    tags: ['Machine Learning', 'Evaluation Metrics', 'Imbalanced Data', 'Recall'],
    isVerified: true
  },
  {
    id: 'q-ai-3',
    trackSlug: 'ai-ml',
    subject: 'Natural Language Processing & Transformers',
    topic: 'Self-Attention Mechanism',
    difficulty: 'Advanced',
    questionType: 'multiple-select',
    question: 'Which of the following statements about the Transformer Scaled Dot-Product Attention mechanism are correct?',
    options: [
      'It computes Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V',
      'Scaling by 1/sqrt(d_k) prevents dot products from growing excessively large, which would push softmax into regions with extremely small gradients',
      'Self-attention allows each token to attend to all other tokens in O(1) sequential step, enabling parallel training unlike sequential RNNs',
      'Transformers cannot capture word order without positional encodings'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four statements are correct. Self-attention projects inputs into Query, Key, and Value vectors, scales by sqrt(d_k) to stabilize softmax gradients, enables full sequence parallelism, and relies on positional encodings because dot products are permutation-equivariant.',
    hint: 'Review "Attention Is All You Need" (Vaswani et al.).',
    tags: ['Transformers', 'Attention', 'NLP', 'Deep Learning'],
    isVerified: true
  },

  // ==================== 5. DEVOPS & SRE ====================
  {
    id: 'q-devops-1',
    trackSlug: 'devops-sre',
    subject: 'Containerization & Orchestration',
    topic: 'Kubernetes Pod Networking & Services',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    question: 'What is the fundamental difference between a Kubernetes ClusterIP Service and a NodePort Service?',
    options: [
      'ClusterIP is accessible only within the cluster virtual network, whereas NodePort exposes the service on each node IP at a static port (30000-32767)',
      'ClusterIP requires public cloud load balancers, whereas NodePort is internal only',
      'NodePort encrypts all pod traffic with TLS automatically',
      'ClusterIP creates DNS records, whereas NodePort does not support DNS'
    ],
    correctAnswers: [0],
    explanation: 'ClusterIP is the default service type providing an internal cluster IP reachable only by other pods. NodePort builds on top of ClusterIP by opening a high port (default 30000-32767) on all cluster worker nodes to accept external traffic.',
    hint: 'Which service type opens a port directly on the worker node host IP?',
    tags: ['Kubernetes', 'Networking', 'ClusterIP', 'NodePort'],
    isVerified: true
  },
  {
    id: 'q-devops-2',
    trackSlug: 'devops-sre',
    subject: 'Infrastructure as Code (IaC)',
    topic: 'Terraform State Locking & Remote Backends',
    difficulty: 'Intermediate',
    questionType: 'true-false',
    question: 'Using an S3 bucket with a DynamoDB table as a Terraform remote backend provides state persistence and state locking, preventing concurrent pipeline runs from corrupting infrastructure state. True or False?',
    options: [
      'True',
      'False'
    ],
    correctAnswers: [0],
    explanation: 'True. In AWS architectures, storing the terraform.tfstate file in S3 with versioning enabled and pairing it with a DynamoDB table for LockID locking guarantees mutual exclusion during terraform apply.',
    hint: 'DynamoDB provides the distributed mutex lock for Terraform.',
    tags: ['Terraform', 'IaC', 'AWS', 'SRE'],
    isVerified: true
  },

  // ==================== 6. CLOUD COMPUTING ====================
  {
    id: 'q-cloud-1',
    trackSlug: 'cloud-computing',
    subject: 'Cloud Security & IAM',
    topic: 'Principle of Least Privilege in AWS IAM',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'An EC2 instance needs to read configuration files from an S3 bucket. What is the most secure AWS best practice?',
    options: [
      'Assign an IAM Role with a scoped read-only policy directly to the EC2 Instance Profile (no hardcoded credentials)',
      'Hardcode AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in the application .env file',
      'Grant AdministratorAccess to the EC2 security group',
      'Make the S3 bucket public with read access to the world'
    ],
    correctAnswers: [0],
    explanation: 'IAM Roles attached to EC2 Instance Profiles vend temporary rotating credentials via the Instance Metadata Service (IMDSv2), eliminating credential leakage risks.',
    hint: 'Never embed long-lived access keys inside virtual machine disks.',
    tags: ['AWS', 'IAM', 'Security', 'Best Practices'],
    isVerified: true
  },
  {
    id: 'q-cloud-2',
    trackSlug: 'cloud-computing',
    subject: 'VPC & Cloud Networking',
    topic: 'Public vs Private Subnets & NAT Gateways',
    difficulty: 'Intermediate',
    questionType: 'multiple-select',
    question: 'For a database running inside a private subnet to download operating system security updates without being exposed to incoming internet traffic, which AWS components are required?',
    options: [
      'A NAT Gateway deployed in a public subnet with an Elastic IP',
      'A Route Table associated with the private subnet routing 0.0.0.0/0 to the NAT Gateway',
      'An Internet Gateway (IGW) attached to the VPC with route from the public subnet',
      'An open inbound Security Group rule allowing 0.0.0.0/0 on port 22'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'A NAT Gateway in a public subnet translates outbound traffic from private instances and receives return traffic. It requires an Elastic IP, an IGW on the public subnet, and a route table entry in the private subnet pointing to the NAT Gateway. Opening inbound SSH (port 22) is dangerous and unrelated.',
    hint: 'Outbound internet access from private subnets requires NAT translation in a public subnet.',
    tags: ['AWS', 'VPC', 'Networking', 'NAT Gateway'],
    isVerified: true
  },

  // ==================== 7. CYBERSECURITY ====================
  {
    id: 'q-sec-1',
    trackSlug: 'cybersecurity',
    subject: 'Application Security (AppSec)',
    topic: 'SQL Injection Prevention & Parameterization',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'Why do parameterized queries (Prepared Statements) completely neutralize SQL Injection attacks?',
    options: [
      'The database engine compiles the SQL query structure first, treating user input strictly as literal data rather than executable SQL syntax',
      'Parameterized queries encrypt all database tables with AES-256',
      'Prepared statements convert SQL queries into NoSQL JSON documents',
      'The browser escapes single quotes before sending the request'
    ],
    correctAnswers: [0],
    explanation: 'In prepared statements, the database driver parses the query blueprint beforehand with placeholders (?). Input parameters are transmitted separately in binary protocol, guaranteeing that user input cannot alter query syntax or append OR 1=1 clauses.',
    hint: 'Separation of code execution structure from user-provided data.',
    tags: ['OWASP', 'SQL Injection', 'AppSec', 'Prepared Statements'],
    isVerified: true
  },
  {
    id: 'q-sec-2',
    trackSlug: 'cybersecurity',
    subject: 'Cryptography & Authentication',
    topic: 'Password Hashing & Salt/Work Factor',
    difficulty: 'Intermediate',
    questionType: 'multiple-select',
    question: 'Which of the following password storage practices comply with modern cryptographic security standards?',
    options: [
      'Use memory-hard adaptive hashing algorithms such as Argon2id or bcrypt with high work factor',
      'Generate a unique cryptographic salt per user to defeat precomputed Rainbow Table attacks',
      'Hash passwords with raw MD5 or SHA-256 for maximum throughput',
      'Store plaintext passwords in a database encrypted with a single master symmetric key'
    ],
    correctAnswers: [0, 1],
    explanation: 'Argon2id and bcrypt are slow, memory-hard algorithms specifically designed to resist GPU/ASIC brute-force cracking. A unique salt per user prevents rainbow table lookup. Raw SHA-256/MD5 is extremely fast on GPUs (billions of hashes/sec) and is deeply insecure for passwords.',
    hint: 'Fast cryptographic hash functions like SHA-256 are dangerous for passwords because attackers can brute-force them rapidly.',
    tags: ['Cryptography', 'Argon2', 'bcrypt', 'Salting', 'Security'],
    isVerified: true
  },

  // ==================== 8. PYTHON DEVELOPMENT ====================
  {
    id: 'q-py-1',
    trackSlug: 'python-dev',
    subject: 'Python Internals & Concurrency',
    topic: 'Global Interpreter Lock (GIL) Mechanics',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    question: 'In CPython 3.12, what is the primary consequence of the Global Interpreter Lock (GIL) on multi-threaded CPU-bound programs?',
    options: [
      'Only one native thread can execute Python bytecode at a time, preventing CPU-bound tasks from scaling across multiple CPU cores via threading',
      'Multi-threaded Python scripts will crash with a Segmentation Fault',
      'Network I/O cannot be performed asynchronously',
      'Memory cannot be garbage collected while threads are active'
    ],
    correctAnswers: [0],
    explanation: 'The GIL is a mutex that protects CPython memory management (reference counts). While threads release the GIL during I/O operations (making threading effective for I/O), CPU-bound Python threads serialize on a single core. Multi-processing or subinterpreters are used for multi-core parallelism.',
    hint: 'CPython uses reference counting and protects object memory with a single global mutex.',
    tags: ['Python', 'GIL', 'Threading', 'Concurrency', 'CPython'],
    isVerified: true
  },
  {
    id: 'q-py-2',
    trackSlug: 'python-dev',
    subject: 'Modern Python Features',
    topic: 'Generators & Memory Efficiency',
    difficulty: 'Beginner',
    questionType: 'true-false',
    question: 'A Python generator created with the `yield` keyword generates values on-demand (lazy evaluation), allowing iteration over billion-row datasets without loading them all into RAM. True or False?',
    options: [
      'True',
      'False'
    ],
    correctAnswers: [0],
    explanation: 'True. Generators suspend execution and maintain local state between yields, consuming O(1) memory regardless of how many items will be produced.',
    hint: 'yield creates an iterator that computes items only when __next__() is called.',
    tags: ['Python', 'Generators', 'Memory Efficiency', 'Lazy Evaluation'],
    isVerified: true
  },

  // ==================== 9. JAVA ENTERPRISE ====================
  {
    id: 'q-java-1',
    trackSlug: 'java-enterprise',
    subject: 'Modern Java & JVM Architecture',
    topic: 'Virtual Threads (Project Loom) in Java 21',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    question: 'How do Java 21 Virtual Threads fundamentally differ from traditional Platform (OS) Threads?',
    options: [
      'Virtual threads are lightweight user-mode threads managed by the JVM rather than the OS, allowing millions of concurrent tasks with minimal memory overhead',
      'Virtual threads run on the GPU instead of the CPU',
      'Virtual threads cannot perform blocking I/O calls',
      'Virtual threads require manual stack allocation in C++'
    ],
    correctAnswers: [0],
    explanation: 'Platform threads are 1:1 mapped to OS threads with fixed ~1MB stacks. Virtual threads are M:N mapped onto carrier threads by the JVM with tiny dynamic memory footprints (~few hundred bytes), unmounting automatically during blocking I/O.',
    hint: 'Project Loom introduced lightweight threads managed directly in JVM user-space.',
    tags: ['Java 21', 'Virtual Threads', 'Concurrency', 'JVM'],
    isVerified: true
  },
  {
    id: 'q-java-2',
    trackSlug: 'java-enterprise',
    subject: 'Spring Boot Architecture',
    topic: 'Dependency Injection & Bean Scopes',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'What is the default bean scope in a Spring Boot application context?',
    options: [
      'Singleton (A single shared instance per Spring IoC container)',
      'Prototype (A new instance created every time the bean is requested)',
      'Request (A single instance per HTTP request)',
      'Session (A single instance per user HTTP session)'
    ],
    correctAnswers: [0],
    explanation: 'The default Spring bean scope is Singleton. A single cached instance is managed by the Spring ApplicationContext and injected into all dependent components.',
    hint: 'Spring creates and reuses one instance by default unless annotated otherwise.',
    tags: ['Spring Boot', 'Dependency Injection', 'Bean Scope', 'Java'],
    isVerified: true
  },

  // ==================== 10. DATA SCIENCE ====================
  {
    id: 'q-ds-1',
    trackSlug: 'data-science',
    subject: 'Statistical Modeling & Inference',
    topic: 'P-Values & Hypothesis Testing',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'In hypothesis testing with a significance threshold alpha = 0.05, what is the exact definition of a p-value of 0.03?',
    options: [
      'The probability of observing results at least as extreme as the observed sample, assuming the null hypothesis is true, is 3%',
      'There is a 3% probability that the null hypothesis is true',
      'The alternative hypothesis has a 97% chance of being false',
      'The effect size is 0.03 standard deviations'
    ],
    correctAnswers: [0],
    explanation: 'A p-value is P(Data | H0), the probability of obtaining test results at least as extreme as the actual results, under the assumption that the null hypothesis is correct. Because 0.03 < 0.05, we reject the null hypothesis.',
    hint: 'A p-value is a conditional probability conditioned on the null hypothesis being true.',
    tags: ['Statistics', 'Hypothesis Testing', 'Data Science', 'P-Value'],
    isVerified: true
  },

  // ==================== 11. DATA ANALYTICS ====================
  {
    id: 'q-da-1',
    trackSlug: 'data-analytics',
    subject: 'Advanced SQL Analytics',
    topic: 'Window Functions: ROW_NUMBER vs DENSE_RANK',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    codeSnippet: `SELECT student_name, score,
       DENSE_RANK() OVER (ORDER BY score DESC) as rank
FROM exam_results;`,
    question: 'If three students tie for 1st place with a score of 100, what rank will DENSE_RANK() assign to the student with the next highest score (98)?',
    options: [
      '2',
      '4',
      '3',
      '1'
    ],
    correctAnswers: [0],
    explanation: 'DENSE_RANK() does not skip rank values after ties. All three tied students receive rank 1, and the next score receives rank 2. (Standard RANK() would have skipped to 4).',
    hint: 'DENSE_RANK leaves no gaps in ranking sequence.',
    tags: ['SQL', 'Window Functions', 'DENSE_RANK', 'Data Analytics'],
    isVerified: true
  },

  // ==================== 12. MOBILE DEVELOPMENT ====================
  {
    id: 'q-mob-1',
    trackSlug: 'mobile-dev',
    subject: 'Cross-Platform Mobile Architecture',
    topic: 'React Native Bridge vs New Architecture (JSI / Fabric)',
    difficulty: 'Intermediate',
    questionType: 'true-false',
    question: 'The React Native New Architecture replaces the asynchronous JSON bridge with JavaScript Interface (JSI), allowing JavaScript to hold direct references to C++ native host objects synchronously. True or False?',
    options: [
      'True',
      'False'
    ],
    correctAnswers: [0],
    explanation: 'True. JSI eliminates the serialize/deserialize overhead of the old JSON message queue bridge, enabling direct C++ memory pointers and synchronous layout calculation through Fabric and TurboModules.',
    hint: 'JSI stands for JavaScript Interface and uses C++ host objects.',
    tags: ['React Native', 'JSI', 'Mobile Architecture', 'Fabric'],
    isVerified: true
  },

  // ==================== 13. UI / UX DESIGN ====================
  {
    id: 'q-ui-1',
    trackSlug: 'ui-ux',
    subject: 'Usability Heuristics & Design Systems',
    topic: 'Nielsen\'s Heuristic: Visibility of System Status',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'Which of the following UI design patterns is the best implementation of Jakob Nielsen\'s 1st heuristic: "Visibility of System Status"?',
    options: [
      'Displaying an animated progress bar and percent indicator during a 20MB file upload',
      'Hiding all errors until the entire 10-step wizard is submitted',
      'Disabling the back button on mobile viewports',
      'Removing color contrast in dark mode'
    ],
    correctAnswers: [0],
    explanation: 'Visibility of system status states that users should always be kept informed about what is going on through appropriate feedback within reasonable time.',
    hint: 'Users must know what the system is currently doing.',
    tags: ['UI/UX', 'Usability', 'Heuristics', 'Design Systems'],
    isVerified: true
  },

  // ==================== 14. SOFTWARE TESTING & QA ====================
  {
    id: 'q-qa-1',
    trackSlug: 'software-testing-qa',
    subject: 'Test Automation Architecture',
    topic: 'Page Object Model (POM) Design Pattern',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'What is the primary architectural benefit of using the Page Object Model (POM) in Playwright or Selenium test suites?',
    options: [
      'It decouples web page UI locators from test logic, so DOM changes only require updates in a single page class rather than across hundreds of test specs',
      'It speeds up JavaScript execution by compiling tests to bytecode',
      'It eliminates the need for unit testing',
      'It converts end-to-end tests into database transactions'
    ],
    correctAnswers: [0],
    explanation: 'POM encapsulates web elements and actions inside page-specific classes, preventing code duplication and dramatically lowering test maintenance overhead when selectors change.',
    hint: 'Think about maintainability when a CSS selector changes in production.',
    tags: ['Playwright', 'QA Automation', 'Page Object Model', 'Testing'],
    isVerified: true
  },

  // ==================== 15. BLOCKCHAIN & WEB3 ====================
  {
    id: 'q-bc-1',
    trackSlug: 'blockchain-web3',
    subject: 'Smart Contract Security',
    topic: 'Reentrancy Vulnerability & Checks-Effects-Interactions',
    difficulty: 'Advanced',
    questionType: 'mcq',
    codeSnippet: `function withdraw(uint amount) public {
    require(balances[msg.sender] >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
    balances[msg.sender] -= amount; // Effect after interaction!
}`,
    question: 'Why is the Solidity function above vulnerable to a catastrophic Reentrancy Attack?',
    options: [
      'State balance is decremented AFTER sending Ether, allowing a malicious fallback() function on msg.sender to repeatedly re-enter withdraw() before the balance updates',
      'msg.sender cannot receive Ether via call()',
      'uint amount requires 256 bits of memory',
      'The function visibility is set to public instead of external'
    ],
    correctAnswers: [0],
    explanation: 'The Checks-Effects-Interactions pattern mandates updating internal contract state (balances[msg.sender] -= amount) BEFORE calling external untrusted addresses. Failing to do so allows the receiver to recursively call withdraw until contract drained.',
    hint: 'Notice the line order: external call happens before the balance is decremented.',
    tags: ['Solidity', 'Smart Contracts', 'Reentrancy', 'Security'],
    isVerified: true
  },

  // ==================== 16. GAME DEVELOPMENT ====================
  {
    id: 'q-game-1',
    trackSlug: 'game-dev',
    subject: 'Game Engine Architecture',
    topic: 'Delta Time (Time.deltaTime) in Game Loops',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'Why must character movement in an Update() loop be multiplied by Time.deltaTime (e.g., position += velocity * Time.deltaTime)?',
    options: [
      'To make movement frame-rate independent so the character moves at the exact same physical speed on a 30 FPS screen and a 144 FPS screen',
      'To prevent physics collisions from being calculated',
      'To invert the gravity vector in 2D physics',
      'Because Update() is only called when keyboard input is detected'
    ],
    correctAnswers: [0],
    explanation: 'Without Time.deltaTime, an object moving 1 unit per frame will move 30 units/sec on a 30 FPS device and 144 units/sec on a 144 FPS device. Multiplying by elapsed time scales velocity to real-world seconds.',
    hint: 'Frame rate varies across devices; real time does not.',
    tags: ['Unity', 'Game Loop', 'Physics', 'Delta Time'],
    isVerified: true
  },

  // ==================== 17. NETWORKING & SYSTEMS ====================
  {
    id: 'q-net-1',
    trackSlug: 'networking-systems',
    subject: 'Transport Layer Protocols',
    topic: 'TCP Three-Way Handshake',
    difficulty: 'Beginner',
    questionType: 'mcq',
    question: 'What is the correct sequence of control flags exchanged during the establishment of a TCP connection between client and server?',
    options: [
      'SYN -> SYN-ACK -> ACK',
      'ACK -> SYN -> SYN-ACK',
      'SYN -> ACK -> FIN',
      'HELLO -> VERIFY -> READY'
    ],
    correctAnswers: [0],
    explanation: 'The TCP 3-way handshake begins with client sending SYN, server responding with SYN-ACK (acknowledging client and synchronizing server sequence), and client completing with ACK.',
    hint: 'Synchronize, Synchronize-Acknowledge, Acknowledge.',
    tags: ['TCP', 'Networking', 'Handshake', 'Protocols'],
    isVerified: true
  },

  // ==================== 18. SYSTEMS & C++ ====================
  {
    id: 'q-cpp-1',
    trackSlug: 'systems-cpp',
    subject: 'Low-Level Memory & Modern C++',
    topic: 'RAII (Resource Acquisition Is Initialization)',
    difficulty: 'Intermediate',
    questionType: 'mcq',
    question: 'How does the RAII idiom in C++ prevent memory leaks and dangling resources even when an exception is thrown?',
    options: [
      'Resource cleanup (delete, fclose, unlock) is bound to the destructor of a stack-allocated object, which the C++ runtime strictly guarantees will execute during stack unwinding',
      'The operating system detects leaks and garbage collects C++ memory automatically',
      'RAII disables all pointer arithmetic at compile time',
      'RAII runs in a background thread that monitors heap usage'
    ],
    correctAnswers: [0],
    explanation: 'RAII ties resource lifespan to object lifespan. Because C++ guarantees that stack object destructors are invoked when leaving scope (even due to exceptions), smart pointers (std::unique_ptr) and mutex guards (std::lock_guard) guarantee zero resource leakage.',
    hint: 'Stack unwinding guarantees deterministic execution of destructors.',
    tags: ['C++', 'RAII', 'Memory Management', 'Destructors'],
    isVerified: true
  }
];
