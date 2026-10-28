import { CareerTrack } from '../types/career';

export const careerTracksList: CareerTrack[] = [
  // 1. FULL STACK WEB DEVELOPMENT
  {
    slug: 'fullstack-web',
    title: 'Full Stack Web Development',
    category: 'Software Engineering',
    icon: 'Layers',
    accentColor: '#FA4616',
    shortDescription: 'Modern web engineering across modern React 19 frontends, Node.js/Express APIs, relational & document databases, and cloud deployments.',
    overview: 'Full Stack Developers architect end-to-end applications from dynamic reactive user interfaces down to high-throughput backend APIs, caching layers, database schemas, and continuous delivery pipelines.',
    marketDemand: 'Extremely High',
    averageSalary: {
      fresher: '₹6.5–14 LPA',
      mid: '₹16–28 LPA',
      senior: '₹30–55+ LPA'
    },
    commonJobRoles: ['Full Stack Software Engineer', 'MERN Stack Developer', 'Software Engineer (Web)', 'Frontend-Heavy SDE', 'Backend-Heavy SDE'],
    prerequisites: ['Basic programming fundamentals', 'HTML5 / CSS3 basics', 'Logical reasoning'],
    skills: {
      core: ['TypeScript', 'React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Git'],
      recommended: ['Next.js', 'Tailwind CSS', 'Redis', 'Docker', 'JWT Authentication', 'WebSockets'],
      tools: ['VS Code', 'Postman', 'Vite', 'npm / pnpm', 'GitHub Actions', 'Render / Vercel']
    },
    totalEstimatedHours: 150,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Web Fundamentals & JavaScript Engine',
        subtitle: 'Core foundations required for all web engineering',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'fs-m1-html-css',
            title: 'Semantic HTML5, Responsive CSS & Modern Layouts',
            description: 'Master semantic web elements, flexbox, CSS grid, mobile-first design, and web accessibility (a11y).',
            estimatedHours: 18,
            skills: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Tailwind CSS']
          },
          {
            id: 'fs-m2-js-deep',
            title: 'Modern JavaScript (ES6+) & Engine Mechanics',
            description: 'Lexical scope, closures, event loop, promises, async/await, prototype inheritance, and DOM manipulation.',
            estimatedHours: 25,
            skills: ['JavaScript ES6+', 'Event Loop', 'Promises', 'DOM API', 'Closures']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Modern Frontend Architecture',
        subtitle: 'Component-driven engineering and state orchestration',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'fs-m3-react',
            title: 'React.js, Hooks & Component Lifecycle',
            description: 'JSX, component tree reconciliation, custom hooks, context API, state lifting, and memoization.',
            estimatedHours: 30,
            skills: ['React 19', 'Custom Hooks', 'Context API', 'useMemo', 'useCallback']
          },
          {
            id: 'fs-m4-ts',
            title: 'TypeScript in Modern Web Development',
            description: 'Static typing, interfaces, generics, union types, and strict type checking with React.',
            estimatedHours: 20,
            skills: ['TypeScript', 'Generics', 'Type Narrowing', 'TSX']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Backend Services & Database Engineering',
        subtitle: 'Scalable server design, databases and security',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'fs-m5-node-express',
            title: 'Node.js Runtime & Express REST Architecture',
            description: 'Libuv event loop, streams, middleware pipelines, REST API design, rate-limiting, and error handling.',
            estimatedHours: 25,
            skills: ['Node.js', 'Express.js', 'REST APIs', 'Middleware', 'Error Handling']
          },
          {
            id: 'fs-m6-databases',
            title: 'PostgreSQL & MongoDB Data Modeling',
            description: 'Relational schemas, foreign keys, indexing, ACID transactions vs document collections, aggregation pipelines.',
            estimatedHours: 22,
            skills: ['PostgreSQL', 'MongoDB', 'Mongoose', 'Prisma ORM', 'Indexing']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Full Stack Integration, Auth & Deployment',
        subtitle: 'Production hardening, auth flows, and portfolio capstone',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'fs-m7-auth-security',
            title: 'Secure Authentication & State Management',
            description: 'JWT tokens, Google OAuth 2.0, HTTP-only cookies, password hashing, CORS, helmet, and input sanitization.',
            estimatedHours: 18,
            skills: ['OAuth 2.0', 'JWT', 'Bcrypt', 'CORS', 'Web Security']
          },
          {
            id: 'fs-m8-capstone',
            title: 'Full Stack Production Capstone Project',
            description: 'Design, build, and deploy an industry-grade SaaS or platform with CI/CD and defense documentation.',
            estimatedHours: 35,
            skills: ['Full Stack Deployment', 'Docker', 'GitHub Actions', 'Performance Optimization']
          }
        ]
      }
    ]
  },

  // 2. FRONTEND ENGINEERING
  {
    slug: 'frontend',
    title: 'Frontend Engineering',
    category: 'Software Engineering',
    icon: 'Monitor',
    accentColor: '#38BDF8',
    shortDescription: 'Craft blazing-fast, accessible, responsive user interfaces using React, Next.js, TypeScript, and modern CSS architectures.',
    overview: 'Frontend Engineers translate complex product specifications and design mockups into interactive, smooth, accessible, and performant web applications.',
    marketDemand: 'Extremely High',
    averageSalary: {
      fresher: '₹6–12 LPA',
      mid: '₹14–24 LPA',
      senior: '₹26–48+ LPA'
    },
    commonJobRoles: ['Frontend Developer', 'UI Engineer', 'React Developer', 'Web Application Engineer'],
    prerequisites: ['HTML/CSS basics', 'Basic programming logic', 'Eye for design detail'],
    skills: {
      core: ['JavaScript ES6+', 'TypeScript', 'React.js', 'Tailwind CSS', 'HTML5 Semantic Web', 'Git'],
      recommended: ['Next.js (App Router)', 'Redux Toolkit / Zustand', 'Framer Motion', 'Web Performance (Core Web Vitals)', 'Jest / React Testing Library'],
      tools: ['Vite', 'Chrome DevTools', 'Figma', 'Lighthouse', 'npm/pnpm']
    },
    totalEstimatedHours: 130,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Deep HTML5, Responsive CSS & Web Standards',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'fe-m1-standards',
            title: 'Modern CSS Layouts, Grid, Flexbox & A11y',
            description: 'Deep dive into responsive layout mechanics, CSS custom properties, accessibility standards (WCAG 2.1), and ARIA attributes.',
            estimatedHours: 20,
            skills: ['CSS Grid', 'Flexbox', 'WCAG', 'ARIA', 'CSS Variables']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Advanced JavaScript & TypeScript',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'fe-m2-js-patterns',
            title: 'Asynchronous JS, Browser APIs & TypeScript',
            description: 'Event delegation, intersection observers, fetch & abort controllers, and production TypeScript types.',
            estimatedHours: 25,
            skills: ['Async/Await', 'Browser APIs', 'TypeScript', 'DOM Optimization']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: React Ecosystem & Client State',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'fe-m3-react-pro',
            title: 'React Fiber, Virtual DOM & Performance Tuning',
            description: 'Profiling component render cycles, virtualization of long lists, optimistic UI updates, and code-splitting.',
            estimatedHours: 35,
            skills: ['React Internals', 'Zustand', 'React Query / TanStack', 'Code-Splitting']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Next.js SSR, Testing & Polish',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'fe-m4-next-test',
            title: 'Next.js App Router, Vitest & Portfolio Projects',
            description: 'Server components, client components, SEO meta tags, lighthouse 95+ score optimization, and unit testing.',
            estimatedHours: 30,
            skills: ['Next.js', 'SSR', 'Vitest', 'Core Web Vitals']
          }
        ]
      }
    ]
  },

  // 3. BACKEND ENGINEERING
  {
    slug: 'backend',
    title: 'Backend Engineering',
    category: 'Software Engineering',
    icon: 'Server',
    accentColor: '#10B981',
    shortDescription: 'Build high-performance distributed microservices, robust REST & GraphQL APIs, caching layers, and database clusters.',
    overview: 'Backend Engineers architect the server-side brain of applications. They handle data integrity, business logic, authentication, system throughput, and database reliability.',
    marketDemand: 'Extremely High',
    averageSalary: {
      fresher: '₹6.5–13 LPA',
      mid: '₹15–26 LPA',
      senior: '₹28–52+ LPA'
    },
    commonJobRoles: ['Backend Software Engineer', 'API Developer', 'Node.js Engineer', 'Systems Engineer'],
    prerequisites: ['Basic programming', 'Understanding of client-server model', 'Basic terminal skills'],
    skills: {
      core: ['Node.js / Express', 'PostgreSQL / MySQL', 'RESTful API Design', 'Data Structures & Algorithms', 'Git'],
      recommended: ['Redis (Caching & Pub/Sub)', 'Docker', 'Kafka / RabbitMQ', 'GraphQL', 'System Design fundamentals'],
      tools: ['Postman', 'Docker Desktop', 'DBeaver / pgAdmin', 'Linux Bash', 'Jest / Supertest']
    },
    totalEstimatedHours: 140,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Backend Fundamentals & Operating Systems',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'be-m1-os-networking',
            title: 'HTTP/HTTPS, TCP/IP & Linux Shell Basics',
            description: 'HTTP status codes, headers, DNS resolution, sockets, process vs threads, and Linux command line navigation.',
            estimatedHours: 20,
            skills: ['HTTP Protocol', 'TCP/IP', 'Linux Shell', 'Processes & Threads']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Relational Databases & SQL Optimization',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'be-m2-sql-deep',
            title: 'Advanced SQL, Normalization & Indexing Internals',
            description: 'Complex joins, subqueries, B-tree indexes, execution plans (EXPLAIN ANALYZE), and database transactions (ACID).',
            estimatedHours: 25,
            skills: ['PostgreSQL', 'SQL Joins', 'B-Tree Indexes', 'ACID Transactions']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: High-Performance API Engineering',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'be-m3-api-redis',
            title: 'REST Architecture, JWT Authentication & Redis Caching',
            description: 'Clean layered architecture (Controller-Service-Repository), rate-limiting, and Redis cache-aside patterns.',
            estimatedHours: 35,
            skills: ['Clean Architecture', 'Redis Cache', 'Rate Limiting', 'JWT Auth']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Scalability, Message Queues & System Design',
        phase: 'Job Ready & Capstone',
        durationWeeks: 4,
        milestones: [
          {
            id: 'be-m4-sys-design',
            title: 'System Design Principles & Asynchronous Queues',
            description: 'Horizontal vs vertical scaling, load balancers, database sharding, asynchronous job processing, and containerization.',
            estimatedHours: 40,
            skills: ['System Design', 'Docker', 'Message Queues', 'Horizontal Scaling']
          }
        ]
      }
    ]
  },

  // 4. JAVA ENTERPRISE DEVELOPMENT
  {
    slug: 'java-enterprise',
    title: 'Java Enterprise Development',
    category: 'Software Engineering',
    icon: 'Coffee',
    accentColor: '#F59E0B',
    shortDescription: 'Enterprise backend development with Java 21, Spring Boot 3, Hibernate/JPA, Microservices architecture, and cloud deployment.',
    overview: 'Java is the backbone of banking, fintech, enterprise cloud platforms, and large-scale global corporations. Java developers build mission-critical, type-safe, concurrent backends.',
    marketDemand: 'Extremely High',
    averageSalary: {
      fresher: '₹6–14 LPA',
      mid: '₹15–28 LPA',
      senior: '₹28–50+ LPA'
    },
    commonJobRoles: ['Java Developer', 'Spring Boot Engineer', 'Enterprise Backend Developer', 'SDE (Java)'],
    prerequisites: ['Basic understanding of object-oriented concepts', 'Basic math and logic'],
    skills: {
      core: ['Core Java (Java 17/21)', 'OOP Principles', 'Spring Boot 3', 'Spring Data JPA', 'PostgreSQL / Oracle SQL', 'Maven / Gradle'],
      recommended: ['Spring Security 6', 'Microservices Architecture', 'Docker', 'Kafka', 'JUnit 5 & Mockito'],
      tools: ['IntelliJ IDEA', 'Postman', 'Git', 'Maven', 'Docker']
    },
    totalEstimatedHours: 150,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Core Java & JVM Mechanics',
        phase: 'Foundations',
        durationWeeks: 4,
        milestones: [
          {
            id: 'java-m1-core',
            title: 'Java 17/21 OOP, Collections Framework & Concurrency',
            description: 'Polymorphism, interfaces, abstract classes, HashMap internals, Stream API, multithreading, and memory model (JVM Heap/Stack).',
            estimatedHours: 35,
            skills: ['Java OOP', 'Collections API', 'Streams & Lambdas', 'Multithreading', 'JVM Memory']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Spring Boot & Data Persistence',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'java-m2-spring-jpa',
            title: 'Spring Boot 3, Dependency Injection & Hibernate JPA',
            description: 'Inversion of control, REST controllers, Spring Data JPA repositories, entity relationships (@OneToMany, @ManyToMany), and validation.',
            estimatedHours: 35,
            skills: ['Spring Boot', 'IoC & DI', 'Spring Data JPA', 'Hibernate', 'Bean Validation']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Spring Security, Testing & Microservices',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'java-m3-security-micro',
            title: 'Spring Security 6, JWT, Microservices & Eureka',
            description: 'Role-based access control, JWT filters, API Gateway, service discovery, and JUnit 5 unit testing with Mockito.',
            estimatedHours: 35,
            skills: ['Spring Security', 'JWT Auth', 'Spring Cloud', 'JUnit 5', 'Mockito']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Enterprise Capstone & Deployment',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'java-m4-capstone',
            title: 'Production Banking / E-Commerce Microservices Engine',
            description: 'End-to-end containerized microservices suite with distributed tracing, Docker, and PostgreSQL.',
            estimatedHours: 35,
            skills: ['Microservices Capstone', 'Docker Compose', 'Distributed Systems', 'Production Logging']
          }
        ]
      }
    ]
  },

  // 5. PYTHON DEVELOPMENT
  {
    slug: 'python-dev',
    title: 'Python Software Development',
    category: 'Software Engineering',
    icon: 'Terminal',
    accentColor: '#3B82F6',
    shortDescription: 'Modern backend and automation engineering using Python 3, FastAPI, Django, PostgreSQL, asynchronous I/O, and Celery.',
    overview: 'Python is a versatile and high-demand language powering modern AI APIs, high-velocity web startups, automation suites, and enterprise cloud workflows.',
    marketDemand: 'Very High',
    averageSalary: {
      fresher: '₹6–12 LPA',
      mid: '₹14–25 LPA',
      senior: '₹26–48+ LPA'
    },
    commonJobRoles: ['Python Developer', 'FastAPI Backend Engineer', 'Django Developer', 'Automation Engineer'],
    prerequisites: ['Basic programming logic', 'Basic computer science fundamentals'],
    skills: {
      core: ['Python 3.12+', 'FastAPI / Django', 'SQLAlchemy / Django ORM', 'PostgreSQL', 'Pydantic', 'Git'],
      recommended: ['Asyncio', 'Celery & Redis', 'Docker', 'Pytest', 'REST & GraphQL APIs'],
      tools: ['VS Code / PyCharm', 'Poetry / pip', 'Postman', 'Docker', 'Git']
    },
    totalEstimatedHours: 130,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Deep Python & Object-Oriented Architecture',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'py-m1-core',
            title: 'Python Internals, Decorators, Generators & OOP',
            description: 'Memory management, GIL (Global Interpreter Lock), list comprehensions, decorators, context managers, and type hints.',
            estimatedHours: 25,
            skills: ['Python 3', 'Decorators', 'Generators', 'Type Hints', 'OOP']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: FastAPI, Pydantic & Async Programming',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'py-m2-fastapi',
            title: 'High-Performance Asynchronous APIs with FastAPI',
            description: 'Async/await in Python, Pydantic data validation schemas, dependency injection, and automatic OpenAPI documentation.',
            estimatedHours: 30,
            skills: ['FastAPI', 'Pydantic', 'Asyncio', 'OpenAPI / Swagger']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Database ORM, Background Tasks & Celery',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'py-m3-db-celery',
            title: 'SQLAlchemy 2.0, Alembic Migrations & Celery Workers',
            description: 'Relational data modeling, asynchronous DB queries, background job queues, and scheduled cron tasks with Celery + Redis.',
            estimatedHours: 35,
            skills: ['SQLAlchemy', 'Alembic', 'Celery', 'Redis Queue']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Testing, Dockerization & Capstone API',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'py-m4-capstone',
            title: 'Production Python Microservice & Pytest Suite',
            description: 'Comprehensive test coverage with Pytest, Docker containerization, and production deployment on cloud platforms.',
            estimatedHours: 30,
            skills: ['Pytest', 'Docker', 'CI/CD', 'Production Deployment']
          }
        ]
      }
    ]
  },

  // 6. AI & MACHINE LEARNING
  {
    slug: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Data & AI',
    icon: 'Brain',
    accentColor: '#8B5CF6',
    shortDescription: 'Develop machine learning pipelines, deep learning neural networks, LLM integrations, and MLOps deployment architectures.',
    overview: 'AI/ML Engineers develop algorithms that learn from data to make predictions, automate intelligent decisions, and power generative AI and natural language processing applications.',
    marketDemand: 'Extremely High',
    averageSalary: {
      fresher: '₹7.5–16 LPA',
      mid: '₹18–32 LPA',
      senior: '₹35–65+ LPA'
    },
    commonJobRoles: ['Machine Learning Engineer', 'AI Engineer', 'NLP Engineer', 'Data Scientist (Modeling)', 'Applied AI Specialist'],
    prerequisites: ['Python proficiency', 'Linear algebra, calculus & probability', 'Basic data structures'],
    skills: {
      core: ['Python', 'NumPy & Pandas', 'Scikit-Learn', 'PyTorch / TensorFlow', 'Mathematics for ML', 'Model Evaluation'],
      recommended: ['Hugging Face Transformers', 'LangChain / LlamaIndex', 'RAG (Retrieval-Augmented Generation)', 'MLflow', 'FastAPI for Model Serving'],
      tools: ['Jupyter Notebook', 'Google Colab', 'Weights & Biases', 'Docker', 'Git']
    },
    totalEstimatedHours: 160,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Applied Mathematics & Exploratory Data Analysis',
        phase: 'Foundations',
        durationWeeks: 4,
        milestones: [
          {
            id: 'ai-m1-math-eda',
            title: 'Linear Algebra, Probability, NumPy & Pandas',
            description: 'Matrix operations, eigenvalues, probability distributions, data cleaning, feature engineering, and Matplotlib visualizations.',
            estimatedHours: 35,
            skills: ['NumPy', 'Pandas', 'Linear Algebra', 'Probability', 'EDA']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Classical Machine Learning Algorithms',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'ai-m2-sklearn',
            title: 'Supervised & Unsupervised Learning with Scikit-Learn',
            description: 'Linear/Logistic regression, Decision Trees, Random Forests, XGBoost, K-Means clustering, PCA, and cross-validation metrics.',
            estimatedHours: 35,
            skills: ['Scikit-Learn', 'XGBoost', 'Cross-Validation', 'Classification & Regression']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Deep Learning, Neural Networks & PyTorch',
        phase: 'Advanced Engineering',
        durationWeeks: 5,
        milestones: [
          {
            id: 'ai-m3-pytorch',
            title: 'Neural Networks, Backpropagation & Computer Vision / NLP',
            description: 'Multi-layer perceptrons, CNNs for computer vision, RNNs/LSTMs, and PyTorch training loops with GPU acceleration.',
            estimatedHours: 40,
            skills: ['PyTorch', 'Backpropagation', 'CNNs', 'Transfer Learning']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Generative AI, LLMs & MLOps Deployment',
        phase: 'Job Ready & Capstone',
        durationWeeks: 4,
        milestones: [
          {
            id: 'ai-m4-llm-mlops',
            title: 'RAG Pipelines, Vector DBs (Chroma/Pinecone) & Model Serving',
            description: 'Hugging Face transformers, LangChain RAG architecture, vector embeddings, and deploying an AI inference API with FastAPI & Docker.',
            estimatedHours: 40,
            skills: ['LangChain', 'Vector Databases', 'RAG Architecture', 'FastAPI Serving', 'Docker']
          }
        ]
      }
    ]
  },

  // 7. DATA SCIENCE
  {
    slug: 'data-science',
    title: 'Data Science & Predictive Modeling',
    category: 'Data & AI',
    icon: 'LineChart',
    accentColor: '#EC4899',
    shortDescription: 'Statistical analysis, hypothesis testing, predictive modeling, machine learning, and translating complex data into business impact.',
    overview: 'Data Scientists combine programming, mathematics, and business acumen to extract actionable insights, build predictive models, and guide executive decision-making.',
    marketDemand: 'Very High',
    averageSalary: {
      fresher: '₹7–15 LPA',
      mid: '₹16–30 LPA',
      senior: '₹32–60+ LPA'
    },
    commonJobRoles: ['Data Scientist', 'Decision Scientist', 'Predictive Modeler', 'Quantitative Analyst'],
    prerequisites: ['Python or R basics', 'College level mathematics / statistics', 'Analytical mindset'],
    skills: {
      core: ['Python (Pandas, NumPy)', 'Statistical Hypothesis Testing', 'Advanced SQL', 'Scikit-Learn', 'Data Storytelling'],
      recommended: ['A/B Testing Frameworks', 'Feature Engineering', 'XGBoost / LightGBM', 'Tableau / Power BI', 'BigQuery / Snowflake'],
      tools: ['Jupyter Lab', 'PostgreSQL', 'Tableau', 'Git', 'Excel (Advanced)']
    },
    totalEstimatedHours: 140,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Statistics & Exploratory Analysis',
        phase: 'Foundations',
        durationWeeks: 4,
        milestones: [
          {
            id: 'ds-m1-stats',
            title: 'Descriptive & Inferential Statistics with Python',
            description: 'Central limit theorem, hypothesis testing (p-values, z-test, t-test, ANOVA), confidence intervals, and distributions.',
            estimatedHours: 30,
            skills: ['Inferential Statistics', 'Hypothesis Testing', 'Pandas', 'Seaborn']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Complex SQL & Data Wrangling',
        phase: 'Core Concepts',
        durationWeeks: 3,
        milestones: [
          {
            id: 'ds-m2-sql',
            title: 'Window Functions, CTEs & Aggregations in SQL',
            description: 'LEAD/LAG, ROW_NUMBER, cohort analysis, customer retention metrics, and preparing analytical datasets.',
            estimatedHours: 25,
            skills: ['SQL Window Functions', 'CTEs', 'Cohort Analysis', 'Data Cleaning']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Predictive Modeling & Experimentation',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'ds-m3-modeling',
            title: 'Predictive Modeling & A/B Experimentation',
            description: 'Feature selection, handling imbalanced datasets (SMOTE), classification & regression benchmarks, and A/B test design.',
            estimatedHours: 35,
            skills: ['Predictive Modeling', 'A/B Testing', 'Feature Engineering', 'ROC-AUC Metrics']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: End-to-End Industry Case Study Capstone',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'ds-m4-capstone',
            title: 'Customer Churn / Fraud Detection Predictive Engine',
            description: 'Deliver an end-to-end data science project with interactive Streamlit dashboard and executive presentation deck.',
            estimatedHours: 35,
            skills: ['Streamlit', 'Data Storytelling', 'Model Interpretability (SHAP)', 'Executive Reporting']
          }
        ]
      }
    ]
  },

  // 8. DATA ANALYTICS & BI
  {
    slug: 'data-analytics',
    title: 'Data Analytics & Business Intelligence',
    category: 'Data & AI',
    icon: 'PieChart',
    accentColor: '#F97316',
    shortDescription: 'Transform raw enterprise data into actionable executive dashboards, KPI monitors, and operational intelligence.',
    overview: 'Data Analysts bridge business and technology. They query large databases, calculate business KPIs, and design dashboards that drive operational growth.',
    marketDemand: 'Very High',
    averageSalary: {
      fresher: '₹5.5–10 LPA',
      mid: '₹12–20 LPA',
      senior: '₹22–38+ LPA'
    },
    commonJobRoles: ['Data Analyst', 'BI Developer', 'Business Analyst (Tech)', 'Marketing / Product Analyst'],
    prerequisites: ['Basic logical thinking', 'Comfort with spreadsheets / numbers'],
    skills: {
      core: ['Advanced SQL', 'Power BI / Tableau', 'Advanced Excel (VLOOKUP, Pivot, Macros)', 'Python (Pandas Basics)', 'Business Metrics'],
      recommended: ['DAX & Power Query', 'Data Warehousing Fundamentals', 'Statistical Analysis', 'ETL Pipelines'],
      tools: ['Power BI Desktop', 'Tableau Public', 'Excel', 'PostgreSQL / Snowflake', 'Git']
    },
    totalEstimatedHours: 110,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Advanced Excel & Business Fundamentals',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'da-m1-excel',
            title: 'Advanced Excel, Pivot Tables & What-If Analysis',
            description: 'XLOOKUP, INDEX-MATCH, dynamic arrays, scenario managers, and building interactive KPI dashboards in Excel.',
            estimatedHours: 20,
            skills: ['Advanced Excel', 'XLOOKUP', 'Pivot Tables', 'Dashboarding']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Master SQL for Analytics',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'da-m2-sql',
            title: 'Analytical SQL, Joins, Aggregations & Window Functions',
            description: 'Querying relational databases, calculating churn rate, monthly recurring revenue (MRR), and average order value (AOV).',
            estimatedHours: 30,
            skills: ['SQL', 'Aggregations', 'Window Functions', 'Business Metrics']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Business Intelligence (Power BI & Tableau)',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'da-m3-bi',
            title: 'Power BI / Tableau Interactive Dashboard Architecture',
            description: 'Data modeling (Star schema, Snowflake schema), DAX measures, automated refresh, drill-down visualizations, and storytelling.',
            estimatedHours: 35,
            skills: ['Power BI', 'DAX Measures', 'Star Schema', 'Tableau', 'Data Storytelling']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Real-World Business Intelligence Capstone',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'da-m4-capstone',
            title: 'E-Commerce / Fintech Executive BI Portfolio Dashboard',
            description: 'Publish a multi-page interactive executive dashboard answering core business performance questions.',
            estimatedHours: 25,
            skills: ['Portfolio Dashboard', 'KPI Reporting', 'Executive Presentation']
          }
        ]
      }
    ]
  },

  // 9. CLOUD COMPUTING (AWS / GCP / AZURE)
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing & Infrastructure',
    category: 'Cloud & Infrastructure',
    icon: 'Cloud',
    accentColor: '#0EA5E9',
    shortDescription: 'Architect resilient, scalable, cost-efficient cloud infrastructures across Amazon Web Services (AWS), Azure, and Google Cloud.',
    overview: 'Cloud Engineers build, deploy, and manage distributed infrastructure in the cloud. They ensure zero downtime, dynamic autoscaling, and rock-solid cloud security.',
    marketDemand: 'Extremely High',
    averageSalary: {
      fresher: '₹6.5–13 LPA',
      mid: '₹15–28 LPA',
      senior: '₹30–55+ LPA'
    },
    commonJobRoles: ['Cloud Engineer', 'AWS Cloud Architect', 'Cloud Solutions Associate', 'Infrastructure Engineer'],
    prerequisites: ['Basic networking concepts (IP, DNS, Subnets)', 'Basic Linux operating systems knowledge'],
    skills: {
      core: ['AWS Core Services (EC2, S3, VPC, IAM, RDS)', 'Linux Administration', 'Networking & Security Groups', 'Infrastructure as Code (Terraform)'],
      recommended: ['Serverless (AWS Lambda, API Gateway)', 'CloudWatch & Monitoring', 'Azure / GCP Fundamentals', 'Cost Optimization'],
      tools: ['AWS Management Console', 'AWS CLI', 'Terraform', 'Linux Bash', 'Git']
    },
    totalEstimatedHours: 130,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Cloud & Linux Networking Foundations',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'cc-m1-linux-net',
            title: 'Linux Server Administration & Networking (VPC, CIDR, Subnets)',
            description: 'Managing users, SSH keys, file permissions, systemd services, IP addressing, CIDR blocks, and public vs private subnets.',
            estimatedHours: 25,
            skills: ['Linux Admin', 'VPC & Subnets', 'CIDR Blocks', 'SSH & Firewalls']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Core AWS Architecture & Compute Services',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'cc-m2-aws-core',
            title: 'AWS Compute, Storage & Managed Databases (EC2, S3, RDS)',
            description: 'Provisioning EC2 instances, EBS volumes, S3 bucket policies, RDS PostgreSQL instances, Application Load Balancers, and Auto Scaling Groups.',
            estimatedHours: 35,
            skills: ['AWS EC2', 'AWS S3', 'AWS RDS', 'Load Balancers', 'Auto Scaling']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Infrastructure as Code & Serverless',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'cc-m3-terraform',
            title: 'Terraform IaC & AWS Serverless (Lambda, API Gateway)',
            description: 'Writing declarative HCL infrastructure configs with Terraform, state management, and serverless event-driven architectures.',
            estimatedHours: 35,
            skills: ['Terraform', 'AWS Lambda', 'API Gateway', 'IAM Policies']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: High Availability Capstone & AWS Cert Prep',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'cc-m4-capstone',
            title: 'Multi-AZ Fault Tolerant Web Infrastructure Capstone',
            description: 'Deploy a resilient multi-availability zone production environment with SSL, route 53 DNS, and automated backups.',
            estimatedHours: 30,
            skills: ['Multi-AZ Architecture', 'Route 53', 'CloudWatch Alarms', 'AWS Certified Solutions Architect Prep']
          }
        ]
      }
    ]
  },

  // 10. DEVOPS & SRE
  {
    slug: 'devops-sre',
    title: 'DevOps & Site Reliability Engineering',
    category: 'Cloud & Infrastructure',
    icon: 'GitBranch',
    accentColor: '#14B8A6',
    shortDescription: 'Master CI/CD pipelines, Docker containerization, Kubernetes cluster orchestration, Terraform, and monitoring systems.',
    overview: 'DevOps & SRE engineers bridge the gap between software development and IT operations, automating release cycles and maintaining 99.99% system reliability.',
    marketDemand: 'Extremely High',
    averageSalary: {
      fresher: '₹7–15 LPA',
      mid: '₹16–30 LPA',
      senior: '₹32–60+ LPA'
    },
    commonJobRoles: ['DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer', 'Build & Release Engineer'],
    prerequisites: ['Linux fundamentals', 'Basic scripting (Bash/Python)', 'Git version control'],
    skills: {
      core: ['Docker & Containerization', 'Kubernetes (K8s)', 'CI/CD (GitHub Actions / Jenkins)', 'Linux & Bash Scripting', 'Git'],
      recommended: ['Terraform (IaC)', 'Prometheus & Grafana', 'ArgoCD (GitOps)', 'Ansible', 'Helm Charts'],
      tools: ['Docker Desktop', 'kubectl', 'Minikube / Kind', 'GitHub Actions', 'Prometheus']
    },
    totalEstimatedHours: 150,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Linux, Shell Automation & Git Workflows',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'devops-m1-linux',
            title: 'Advanced Bash Scripting, Linux Internals & Git Hooks',
            description: 'Automating tasks with Bash, process signals, cron jobs, semantic versioning, and trunk-based development with Git.',
            estimatedHours: 25,
            skills: ['Bash Scripting', 'Linux Signals', 'Cron', 'Git Rebase & Hooks']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Docker Containerization & CI/CD Pipelines',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'devops-m2-docker-cicd',
            title: 'Multi-Stage Dockerfiles, Docker Compose & GitHub Actions',
            description: 'Containerizing microservices with minimal Alpine images, image layer caching, security scanning, and automated CI test/build pipelines.',
            estimatedHours: 35,
            skills: ['Docker Multi-Stage', 'Docker Compose', 'GitHub Actions', 'Trivy Security']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Kubernetes Orchestration & Helm',
        phase: 'Advanced Engineering',
        durationWeeks: 5,
        milestones: [
          {
            id: 'devops-m3-k8s',
            title: 'Kubernetes Pods, Deployments, Services, Ingress & Helm',
            description: 'Cluster architecture, self-healing deployments, rolling updates, ConfigMaps, Secrets, Ingress controllers, and Helm packaging.',
            estimatedHours: 45,
            skills: ['Kubernetes Pods', 'Deployments & Services', 'Ingress Controller', 'Helm Charts']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Observability, GitOps & Production Capstone',
        phase: 'Job Ready & Capstone',
        durationWeeks: 4,
        milestones: [
          {
            id: 'devops-m4-sre',
            title: 'Prometheus & Grafana Monitoring + GitOps Pipeline',
            description: 'Instrumenting metrics, alerting rules, SLA/SLO dashboards, and deploying a complete GitOps deployment pipeline.',
            estimatedHours: 40,
            skills: ['Prometheus', 'Grafana', 'GitOps (ArgoCD)', 'SLI / SLO', 'CKA Prep']
          }
        ]
      }
    ]
  },

  // 11. CYBERSECURITY
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Security',
    icon: 'Shield',
    accentColor: '#EF4444',
    shortDescription: 'Defend systems, analyze network threats, master OWASP Top 10 vulnerabilities, penetration testing, and digital forensics.',
    overview: 'Cybersecurity professionals protect organizations against cyber attacks, data breaches, ransomware, and vulnerabilities across networks and web apps.',
    marketDemand: 'Extremely High',
    averageSalary: {
      fresher: '₹6–13 LPA',
      mid: '₹14–27 LPA',
      senior: '₹28–55+ LPA'
    },
    commonJobRoles: ['Security Analyst', 'SOC Analyst (L1/L2)', 'Junior Penetration Tester', 'Application Security Associate'],
    prerequisites: ['Networking basics (TCP/IP, Ports, DNS)', 'Operating systems (Linux/Windows)', 'Basic programming logic'],
    skills: {
      core: ['Networking & Security Protocols', 'Linux Security (Kali Linux)', 'OWASP Top 10 Web Vulnerabilities', 'Burp Suite', 'Network Traffic Analysis (Wireshark)'],
      recommended: ['SOC Operations (SIEM, Splunk)', 'Cryptography Fundamentals', 'Python for Security Scripting', 'Metasploit', 'Incident Response'],
      tools: ['Kali Linux', 'Burp Suite Community', 'Wireshark', 'Nmap', 'Splunk']
    },
    totalEstimatedHours: 140,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Network Protocols & Security Fundamentals',
        phase: 'Foundations',
        durationWeeks: 4,
        milestones: [
          {
            id: 'sec-m1-net',
            title: 'TCP/IP Model, Port Scanning, Wireshark & Cryptography',
            description: 'Packet analysis, handshakes, firewalls, symmetric vs asymmetric encryption (RSA, AES), hashing (SHA-256), and Nmap network reconnaissance.',
            estimatedHours: 35,
            skills: ['Wireshark', 'Nmap', 'TCP/IP Analysis', 'Cryptography', 'Firewalls']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: OWASP Top 10 Web Application Security',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'sec-m2-owasp',
            title: 'SQL Injection, XSS, CSRF, IDOR & Burp Suite',
            description: 'Exploiting and remediating web application vulnerabilities, intercepting HTTP requests with Burp Suite, and secure coding practices.',
            estimatedHours: 35,
            skills: ['OWASP Top 10', 'SQLi', 'Cross-Site Scripting (XSS)', 'IDOR', 'Burp Suite']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: SOC Monitoring & Incident Response',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'sec-m3-soc',
            title: 'SIEM Log Analysis (Splunk) & Threat Detection',
            description: 'Monitoring endpoint logs, identifying suspicious brute-force or privilege escalation attacks, and creating incident response tickets.',
            estimatedHours: 35,
            skills: ['SIEM (Splunk)', 'SOC Operations', 'Log Analysis', 'Incident Handling']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Vulnerability Assessment & Pen-Test Report',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'sec-m4-capstone',
            title: 'Full Web App Penetration Test & Executive Report',
            description: 'Perform an authorized penetration test on a deliberately vulnerable application (e.g. OWASP Juice Shop) and draft a professional audit report.',
            estimatedHours: 30,
            skills: ['Penetration Testing', 'Security Reporting', 'Remediation Advisory', 'CompTIA Security+ Prep']
          }
        ]
      }
    ]
  },

  // 12. MOBILE APP DEVELOPMENT
  {
    slug: 'mobile-dev',
    title: 'Mobile App Development (React Native / Flutter)',
    category: 'Software Engineering',
    icon: 'Smartphone',
    accentColor: '#06B6D4',
    shortDescription: 'Build native iOS and Android mobile apps with cross-platform frameworks, smooth animations, device APIs, and offline sync.',
    overview: 'Mobile Developers build intuitive touch-first applications that live in millions of pockets worldwide, taking full advantage of cameras, sensors, and offline capabilities.',
    marketDemand: 'Very High',
    averageSalary: {
      fresher: '₹6–12 LPA',
      mid: '₹14–25 LPA',
      senior: '₹26–48+ LPA'
    },
    commonJobRoles: ['Mobile App Developer', 'React Native Developer', 'Flutter Engineer', 'iOS / Android Engineer'],
    prerequisites: ['JavaScript/TypeScript or Dart basics', 'Understanding of UI components and layout'],
    skills: {
      core: ['React Native / Flutter', 'TypeScript / Dart', 'Mobile UI Components', 'State Management (Zustand / Bloc)', 'REST API Integration'],
      recommended: ['Native Device APIs (Camera, Location, Push Notifications)', 'Offline Storage (AsyncStorage, SQLite)', 'App Store & Play Store Deployment', 'Mobile Performance'],
      tools: ['VS Code / Android Studio', 'Xcode (for iOS)', 'Expo', 'Postman', 'Figma']
    },
    totalEstimatedHours: 130,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Mobile UI & Layout Architecture',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'mob-m1-ui',
            title: 'Touch UI Components, Flexbox & Navigation (React Navigation)',
            description: 'Mobile screen anatomy, stack/tab/drawer navigation, safe areas, responsive device sizing, and gestures.',
            estimatedHours: 25,
            skills: ['React Native / Flutter', 'React Navigation', 'Flexbox Mobile', 'Gesture Handling']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: State, Device APIs & Networking',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'mob-m2-apis',
            title: 'Camera, Geolocation, Push Notifications & API Sync',
            description: 'Accessing device hardware, handling permissions, background tasks, and synchronizing data with backend REST APIs.',
            estimatedHours: 35,
            skills: ['Device APIs', 'Push Notifications', 'Camera & Geolocation', 'Axios / Fetch']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Offline Storage & Native Polish',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'mob-m3-offline',
            title: 'Offline-First SQLite, Caching & Reanimated Animations',
            description: 'Storing local databases, handling network loss gracefully with optimistic UI, and 60fps native animations with Reanimated.',
            estimatedHours: 35,
            skills: ['SQLite', 'Offline Sync', 'Reanimated 3', 'App Performance']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Store Deployment & Production Mobile Capstone',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'mob-m4-capstone',
            title: 'Complete Production-Grade Mobile App Build',
            description: 'Build, sign, and generate production APK/AAB builds with splash screens, app icons, and crash reporting (Sentry).',
            estimatedHours: 35,
            skills: ['EAS Build / Fastlane', 'App Store Guidelines', 'Sentry', 'Mobile Capstone']
          }
        ]
      }
    ]
  },

  // 13. UI/UX & PRODUCT DESIGN
  {
    slug: 'ui-ux',
    title: 'UI/UX & Product Design',
    category: 'Design & Product',
    icon: 'Palette',
    accentColor: '#A855F7',
    shortDescription: 'Design intuitive digital product experiences with Figma, wireframing, design systems, usability testing, and visual design.',
    overview: 'UI/UX Designers conduct user research, craft wireframes and clickable prototypes, build comprehensive design systems, and ensure products are both gorgeous and easy to navigate.',
    marketDemand: 'Very High',
    averageSalary: {
      fresher: '₹5.5–11 LPA',
      mid: '₹13–22 LPA',
      senior: '₹24–45+ LPA'
    },
    commonJobRoles: ['UI/UX Designer', 'Product Designer', 'Interaction Designer', 'Visual Designer'],
    prerequisites: ['Empathy for user needs', 'Attention to visual balance and typography', 'Basic computer literacy'],
    skills: {
      core: ['Figma Mastery (Auto-layout, Components, Variants)', 'Wireframing & Prototyping', 'User Research & Personas', 'Design Systems & Tokens', 'Information Architecture'],
      recommended: ['Micro-interactions & Animation', 'Usability Testing', 'HTML/CSS fundamentals (for dev handoff)', 'Accessibility (WCAG)'],
      tools: ['Figma', 'FigJam', 'Miro', 'Notion', 'Lottie']
    },
    totalEstimatedHours: 110,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Design Principles, Typography & Color Theory',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'ui-m1-foundations',
            title: 'Visual Hierarchy, Typography, Spacing & Color Psychology',
            description: '8pt grid systems, contrast ratios, font pairing, visual balance, and Figma fundamentals.',
            estimatedHours: 20,
            skills: ['Typography', 'Color Systems', '8pt Grid', 'Visual Hierarchy']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Figma Mastery & Advanced Components',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'ui-m2-figma',
            title: 'Auto Layout, Responsive Constraints, Component Variants & Tokens',
            description: 'Creating production-ready atomic design systems, interactive states (hover/pressed/disabled), and variables in Figma.',
            estimatedHours: 30,
            skills: ['Figma Auto Layout', 'Component Sets', 'Design Tokens', 'Variants']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: UX Research, User Journeys & Wireframing',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'ui-m3-ux-research',
            title: 'User Personas, Journey Maps & Interactive Clickable Prototypes',
            description: 'Problem framing, conducting interviews, creating low-fidelity wireframes, and linking smart-animate prototypes.',
            estimatedHours: 30,
            skills: ['User Research', 'Journey Mapping', 'Smart Animate Prototyping', 'Usability Testing']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Complete Case Study Portfolio',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'ui-m4-capstone',
            title: 'Comprehensive End-to-End Product Design Case Study',
            description: 'Design a complex web or mobile application from user problem discovery to final polished UI handoff specs.',
            estimatedHours: 30,
            skills: ['Design Case Study', 'Developer Handoff', 'Portfolio Presentation']
          }
        ]
      }
    ]
  },

  // 14. SOFTWARE TESTING & QA AUTOMATION
  {
    slug: 'software-testing-qa',
    title: 'Software Testing & QA Automation',
    category: 'Software Engineering',
    icon: 'CheckCircle2',
    accentColor: '#84CC16',
    shortDescription: 'Ensure software quality with automated test suites, Selenium/Playwright, API testing with Postman, Cypress, and performance benchmarks.',
    overview: 'QA Engineers protect production from bugs and regressions. They write automated test scripts, perform boundary stress tests, and integrate automated quality gates into CI pipelines.',
    marketDemand: 'Very High',
    averageSalary: {
      fresher: '₹5–10 LPA',
      mid: '₹12–22 LPA',
      senior: '₹22–40+ LPA'
    },
    commonJobRoles: ['QA Automation Engineer', 'SDET (Software Development Engineer in Test)', 'Quality Assurance Analyst', 'Test Automation Specialist'],
    prerequisites: ['Basic programming in Java, Python, or JavaScript', 'Analytical mindset and attention to edge cases'],
    skills: {
      core: ['Manual Testing Principles', 'Test Case Design (Boundary, Equivalence)', 'Playwright / Cypress / Selenium', 'API Testing (Postman / RestAssured)', 'Git'],
      recommended: ['BDD with Cucumber', 'CI/CD Pipeline Integration', 'Performance Testing (JMeter)', 'SQL for Database Validation'],
      tools: ['Playwright', 'Postman', 'Jira', 'Selenium WebDriver', 'JMeter']
    },
    totalEstimatedHours: 120,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Testing Fundamentals & Test Case Design',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'qa-m1-manual',
            title: 'SDLC, STLC, Bug Life Cycle & Test Documentation',
            description: 'Test plans, test scenarios, black-box vs white-box techniques, severity vs priority, and defect logging in Jira.',
            estimatedHours: 20,
            skills: ['STLC', 'Test Scenarios', 'Boundary Value Analysis', 'Jira Defect Tracking']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: API Testing & Automation (Postman & RestAssured)',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'qa-m2-api-test',
            title: 'Automated REST API Testing, Headers & Payload Assertions',
            description: 'Automating API status assertions, JSON schema validations, authentication tokens, and running Newman collection runners.',
            estimatedHours: 30,
            skills: ['Postman Automation', 'Newman CLI', 'JSON Schema Validation', 'API Assertions']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Web UI Automation (Playwright / Selenium)',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'qa-m3-playwright',
            title: 'Playwright / Selenium Automation & Page Object Model (POM)',
            description: 'Writing resilient automated scripts, element locators, wait strategies, Page Object Model design pattern, and cross-browser testing.',
            estimatedHours: 40,
            skills: ['Playwright', 'Page Object Model', 'Locators & Selectors', 'Cross-Browser Testing']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: CI/CD Test Framework Capstone',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'qa-m4-capstone',
            title: 'Automated Regression Suite with HTML Reports in GitHub Actions',
            description: 'Build a production automated test suite that executes automatically on pull requests and publishes HTML test reports.',
            estimatedHours: 30,
            skills: ['CI/CD Test Execution', 'Allure Reports', 'GitHub Actions', 'SDET Capstone']
          }
        ]
      }
    ]
  },

  // 15. BLOCKCHAIN & WEB3
  {
    slug: 'blockchain-web3',
    title: 'Blockchain & Web3 Engineering',
    category: 'Specialized Tech',
    icon: 'Boxes',
    accentColor: '#F59E0B',
    shortDescription: 'Build decentralized applications (dApps), Solidity smart contracts, Ethereum tooling, Hardhat, and Web3 frontends.',
    overview: 'Blockchain Engineers architect immutable, trustless protocols and smart contracts that power decentralized finance (DeFi), digital assets, and next-generation crypto infrastructure.',
    marketDemand: 'High',
    averageSalary: {
      fresher: '₹7–16 LPA',
      mid: '₹18–35 LPA',
      senior: '₹35–70+ LPA'
    },
    commonJobRoles: ['Smart Contract Developer', 'Web3 Frontend Engineer', 'Blockchain Developer', 'Protocol Engineer'],
    prerequisites: ['Object-oriented programming experience', 'Basic cryptography & hashing', 'JavaScript/TypeScript'],
    skills: {
      core: ['Solidity', 'Ethereum Virtual Machine (EVM)', 'Hardhat / Foundry', 'Ethers.js / Viem', 'Smart Contract Security'],
      recommended: ['DeFi Protocols', 'IPFS', 'The Graph (Subgraphs)', 'OpenZeppelin Libraries', 'Layer-2 Scaling (Arbitrum, Optimism)'],
      tools: ['Remix IDE', 'Hardhat', 'MetaMask', 'Etherscan', 'Viem']
    },
    totalEstimatedHours: 140,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Cryptography & Distributed Ledger Basics',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'web3-m1-foundations',
            title: 'Consensus Mechanisms, Hashing, Wallets & Gas Mechanics',
            description: 'Proof of Stake vs Proof of Work, Merkle trees, public/private keys, gas fees, and EVM opcodes.',
            estimatedHours: 25,
            skills: ['EVM Mechanics', 'Gas Optimization', 'Cryptography', 'Wallets']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Solidity Smart Contract Engineering',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'web3-m2-solidity',
            title: 'Solidity Syntax, Mappings, Structs, Events & OpenZeppelin',
            description: 'Writing ERC-20 token and ERC-721 NFT contracts, access control, reentrancy guards, and unit testing with Hardhat.',
            estimatedHours: 35,
            skills: ['Solidity', 'ERC-20 & ERC-721', 'Hardhat', 'OpenZeppelin']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Web3 Frontend Integration & dApp Architecture',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'web3-m3-dapp',
            title: 'Connecting React to Smart Contracts via Viem / Wagmi',
            description: 'Wallet connection modals, contract read/write functions, indexing blockchain events with The Graph, and IPFS storage.',
            estimatedHours: 40,
            skills: ['Wagmi & Viem', 'The Graph', 'IPFS', 'dApp Architecture']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Smart Contract Audit & DeFi Capstone',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'web3-m4-capstone',
            title: 'Decentralized Staking / Escrow Marketplace dApp',
            description: 'Build, audit for common vulnerabilities (reentrancy, overflow), and deploy a functional decentralized protocol to Sepolia testnet.',
            estimatedHours: 40,
            skills: ['Smart Contract Security Audit', 'Sepolia Testnet Deployment', 'Web3 Capstone']
          }
        ]
      }
    ]
  },

  // 16. GAME DEVELOPMENT
  {
    slug: 'game-dev',
    title: 'Game Development (Unity / C#)',
    category: 'Specialized Tech',
    icon: 'Gamepad2',
    accentColor: '#EC4899',
    shortDescription: 'Build immersive 2D and 3D games using Unity, C#, physics engines, animation trees, spatial audio, and game loops.',
    overview: 'Game Developers program game mechanics, physics interactions, artificial intelligence for NPCs, graphics shaders, and audio systems to deliver interactive entertainment.',
    marketDemand: 'Moderate',
    averageSalary: {
      fresher: '₹5–11 LPA',
      mid: '₹12–22 LPA',
      senior: '₹24–45+ LPA'
    },
    commonJobRoles: ['Unity Game Developer', 'Gameplay Programmer', 'Technical Game Designer', 'C# Game Engineer'],
    prerequisites: ['Basic object-oriented programming (C# or C++)', 'Basic geometry and trigonometry', 'Interest in gameplay mechanics'],
    skills: {
      core: ['Unity Engine', 'C# Programming', 'Game Loop & Lifecycle', 'Physics & Collisions (2D/3D)', 'UI Canvas & Audio'],
      recommended: ['Animation State Machines', 'Shader Graph & VFX', 'Optimization & Profiling', 'Multiplayer Networking Basics'],
      tools: ['Unity Hub & Editor', 'Visual Studio / Rider', 'Blender (Basic View)', 'Git LFS']
    },
    totalEstimatedHours: 130,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: C# Programming & Unity Fundamentals',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'game-m1-csharp',
            title: 'C# for Unity, GameObjects, Transforms & Input System',
            description: 'MonoBehaviour lifecycle, Awake/Start/Update, vector math, keyboard and gamepad inputs, and prefabs.',
            estimatedHours: 25,
            skills: ['C#', 'GameObjects', 'Prefabs', 'Unity New Input System']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Physics, Colliders & Game Mechanics',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'game-m2-physics',
            title: 'Rigidbody, Raycasting, Trigger Events & Camera Controllers',
            description: '2D/3D physics interactions, raycasting for shooting/ground checks, cinemachine virtual cameras, and sound FX.',
            estimatedHours: 35,
            skills: ['Rigidbody Physics', 'Raycasting', 'Cinemachine', 'Audio Source']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Animation, UI Canvas & Game Loop State',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'game-m3-animation',
            title: 'Mecanim Animator, State Machines & Menus / HUD',
            description: 'Blend trees, animation transitions, health bars, inventory systems, pause menus, and game over states.',
            estimatedHours: 35,
            skills: ['Mecanim Animator', 'UI Canvas', 'Game Manager State', 'Particle Systems']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Playable Game Capstone & Build Export',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'game-m4-capstone',
            title: 'Complete Playable 2D/3D Action or Puzzle Game',
            description: 'Polish, optimize draw calls, compile WebGL / PC executable builds, and publish to Itch.io for your portfolio.',
            estimatedHours: 35,
            skills: ['WebGL Build', 'Draw Call Optimization', 'Portfolio Showcase on Itch.io']
          }
        ]
      }
    ]
  },

  // 17. COMPUTER NETWORKING & SYSTEMS
  {
    slug: 'networking-systems',
    title: 'Computer Networking & Systems Engineering',
    category: 'Cloud & Infrastructure',
    icon: 'Network',
    accentColor: '#3B82F6',
    shortDescription: 'Master routing, switching, TCP/IP socket programming, network security, DNS/DHCP, and enterprise infrastructure.',
    overview: 'Network Engineers design, implement, and maintain reliable corporate networks, enterprise firewalls, data center connections, and telecommunication systems.',
    marketDemand: 'Very High',
    averageSalary: {
      fresher: '₹5–11 LPA',
      mid: '₹12–22 LPA',
      senior: '₹24–45+ LPA'
    },
    commonJobRoles: ['Network Engineer', 'Network Administrator', 'Systems Administrator', 'Network Support Specialist'],
    prerequisites: ['Basic computer hardware understanding', 'Basic familiarity with the command line'],
    skills: {
      core: ['OSI & TCP/IP Models', 'Subnetting & IP Routing', 'VLANs & Switching', 'Network Protocols (DNS, DHCP, BGP, OSPF)', 'Wireshark'],
      recommended: ['Cisco IOS Configuration', 'Firewalls & VPNs', 'Network Automation (Python & Netmiko)', 'CCNA Syllabus Mastery'],
      tools: ['Cisco Packet Tracer', 'Wireshark', 'GNS3', 'Linux Terminal', 'Putty']
    },
    totalEstimatedHours: 120,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: OSI Model, IPv4/IPv6 Subnetting & Cables',
        phase: 'Foundations',
        durationWeeks: 3,
        milestones: [
          {
            id: 'net-m1-subnetting',
            title: 'Binary Subnetting, VLSM, IPv4/IPv6 & OSI Protocol Stack',
            description: 'Master binary to decimal conversion, CIDR slash notation, collision vs broadcast domains, and packet encapsulations.',
            estimatedHours: 25,
            skills: ['Subnetting & VLSM', 'IPv4 & IPv6', 'OSI 7 Layers', 'Packet Encapsulation']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Switching, VLANs & Inter-VLAN Routing',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'net-m2-switching',
            title: 'Cisco Switch Configuration, Trunking (802.1Q) & Spanning Tree (STP)',
            description: 'Configuring access and trunk ports, preventing network loops with STP, and router-on-a-stick routing in Packet Tracer.',
            estimatedHours: 35,
            skills: ['VLANs', '802.1Q Trunking', 'Spanning Tree Protocol', 'Cisco Packet Tracer']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Routing Protocols & Enterprise Services',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'net-m3-routing',
            title: 'OSPF, Static Routes, NAT, DHCP, DNS & Access Control Lists (ACLs)',
            description: 'Dynamic link-state routing with OSPF, Network Address Translation (PAT/NAT), and packet filtering with Standard/Extended ACLs.',
            estimatedHours: 35,
            skills: ['OSPF Routing', 'NAT & PAT', 'ACL Security', 'DHCP & DNS Services']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: Network Automation & CCNA Exam Preparation',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'net-m4-capstone',
            title: 'Automated Multi-Site Enterprise Network Topology',
            description: 'Design and simulate an enterprise corporate network with redundant gateways, VPN tunnel, and Python automation script.',
            estimatedHours: 25,
            skills: ['Enterprise Network Topology', 'Site-to-Site VPN', 'Python Netmiko', 'CCNA 200-301 Prep']
          }
        ]
      }
    ]
  },

  // 18. SYSTEMS & C++ PROGRAMMING
  {
    slug: 'systems-cpp',
    title: 'Systems & Low-Level C++ Engineering',
    category: 'Software Engineering',
    icon: 'Cpu',
    accentColor: '#6366F1',
    shortDescription: 'Master Modern C++ (C++20), memory pointers, manual memory allocation, multi-threaded concurrency, and high-frequency systems.',
    overview: 'Systems engineers write software close to hardware: operating system kernels, game engines, database engines, embedded controllers, and low-latency trading infrastructure.',
    marketDemand: 'Very High',
    averageSalary: {
      fresher: '₹7–16 LPA',
      mid: '₹18–32 LPA',
      senior: '₹35–65+ LPA'
    },
    commonJobRoles: ['C++ Software Engineer', 'Systems Programmer', 'Low-Latency Developer', 'Embedded Software Engineer'],
    prerequisites: ['Basic C or C++ syntax', 'Familiarity with computer architecture (CPU/RAM)'],
    skills: {
      core: ['Modern C++ (C++17/20)', 'Pointers & Dynamic Memory (RAII)', 'Standard Template Library (STL)', 'Data Structures & Algorithms', 'GDB Debugger'],
      recommended: ['Smart Pointers (unique_ptr, shared_ptr)', 'Multithreading (std::thread, mutex)', 'CMake Build Systems', 'Valgrind Memory Profiling'],
      tools: ['GCC / Clang', 'CMake', 'GDB', 'Valgrind', 'VS Code / CLion']
    },
    totalEstimatedHours: 150,
    roadmapStages: [
      {
        stageNumber: 1,
        title: 'Phase 1: Memory Model, Pointers & Modern C++ Core',
        phase: 'Foundations',
        durationWeeks: 4,
        milestones: [
          {
            id: 'cpp-m1-memory',
            title: 'Stack vs Heap, Raw Pointers, References & RAII Idiom',
            description: 'Manual memory layout, address-of and dereference operators, memory leaks, constructors/destructors, and copy/move semantics.',
            estimatedHours: 35,
            skills: ['Pointers & References', 'RAII Idiom', 'Move Semantics', 'Memory Management']
          }
        ]
      },
      {
        stageNumber: 2,
        title: 'Phase 2: Standard Template Library (STL) & Modern C++20',
        phase: 'Core Concepts',
        durationWeeks: 4,
        milestones: [
          {
            id: 'cpp-m2-stl',
            title: 'Vectors, Unordered Maps, Iterators, Lambdas & Templates',
            description: 'Deep dive into STL container complexities, custom allocators, template metaprogramming basics, and smart pointers.',
            estimatedHours: 35,
            skills: ['C++ STL', 'Smart Pointers', 'Templates', 'Lambdas']
          }
        ]
      },
      {
        stageNumber: 3,
        title: 'Phase 3: Concurrency, Thread Safety & Low-Level I/O',
        phase: 'Advanced Engineering',
        durationWeeks: 4,
        milestones: [
          {
            id: 'cpp-m3-concurrency',
            title: 'std::thread, Mutex, Condition Variables & Cache Lines',
            description: 'Race conditions, deadlocks, lock-free programming concepts, atomic variables, and cache-friendly data structures.',
            estimatedHours: 40,
            skills: ['Multithreading', 'std::mutex', 'Atomic Operations', 'Cache Locality']
          }
        ]
      },
      {
        stageNumber: 4,
        title: 'Phase 4: High-Performance Engine / System Capstone',
        phase: 'Job Ready & Capstone',
        durationWeeks: 3,
        milestones: [
          {
            id: 'cpp-m4-capstone',
            title: 'In-Memory Key-Value Store / Order Book Engine in C++',
            description: 'Build a blazing-fast memory-safe cache or trading order matching engine with CMake and Valgrind memory leak tests.',
            estimatedHours: 40,
            skills: ['CMake', 'Valgrind Leak Profiling', 'Low-Latency Capstone', 'C++ System Design']
          }
        ]
      }
    ]
  }
];

export const getCareerTrackBySlug = (slug: string): CareerTrack | undefined => {
  return careerTracksList.find(t => t.slug.toLowerCase() === slug.toLowerCase());
};

export const getCareerTracksByCategory = (category: string): CareerTrack[] => {
  if (category === 'All') return careerTracksList;
  return careerTracksList.filter(t => t.category === category);
};
