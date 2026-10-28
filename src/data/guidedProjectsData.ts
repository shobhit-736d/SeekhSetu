import { GuidedProject } from '../types/career';

export const guidedProjectsList: GuidedProject[] = [
  // ==================== 1. FULL STACK WEB DEVELOPMENT ====================
  {
    id: 'proj-fs-saas',
    slug: 'saas-collaborative-workspace',
    title: 'Real-Time Collaborative Workspace & Document Engine',
    summary: 'A full-stack collaborative workspace platform with real-time cursor sync, JWT authentication, role-based workspaces, and PostgreSQL relational data modeling.',
    trackSlug: 'fullstack-web',
    projectType: 'Full-Stack Web',
    difficulty: 'Capstone',
    estimatedHours: 40,
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Socket.IO', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'Docker'],
    objective: 'Architect and deploy an enterprise-grade collaborative document application capable of handling concurrent multi-user editing with sub-100ms sync latency.',
    problemStatement: 'Distributed teams often struggle with stale state and conflicting edits across asynchronous document platforms without clear role isolation and real-time awareness.',
    expectedOutcome: 'A complete deployed SaaS product with Google OAuth, workspace invitations, live presence indicators, version snapshots, and production Docker deployment.',
    prerequisites: ['React state & hooks', 'Node/Express REST APIs', 'Relational database schema modeling'],
    systemArchitectureOverview: 'Micro-monolith with React Single Page Application frontend connecting via REST for entity persistence and WebSocket connection pool for multi-user live document syncing with Redis cache-aside.',
    keyFeatures: [
      'Multi-tenant workspace organization with member invitations & RBAC permissions (Owner, Editor, Viewer)',
      'Real-time collaborative editing with Socket.IO room broadcasting and optimistic local state',
      'PostgreSQL data modeling with relational constraints, cascading deletes, and indexed search',
      'Automated Docker Compose setup with separate web, api, and database containers'
    ],
    userStories: [
      {
        title: 'Real-time Presence',
        description: 'As an active editor in a document, I want to see avatars and active cursor positions of other users currently viewing the document.',
        acceptanceCriteria: ['Socket broadcasts user join/leave events within 100ms', 'Avatars render with unique distinct border colors']
      },
      {
        title: 'Role-Based Workspace Access',
        description: 'As a workspace owner, I want to assign roles so that viewers cannot edit content or delete projects.',
        acceptanceCriteria: ['API endpoints verify workspace membership and role via middleware', '403 Forbidden returned on unauthorized mutations']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Database Schema & Auth Scaffold',
        tasks: ['Design Prisma schema for Users, Workspaces, Documents, and Permissions', 'Implement Google OAuth + JWT bearer auth pipeline'],
        deliverable: 'Tested PostgreSQL schema migrations and authenticated API endpoints'
      },
      {
        stepNumber: 2,
        title: 'REST API & Document Endpoints',
        tasks: ['Create CRUD endpoints with input validation', 'Write unit tests for workspace permission checks'],
        deliverable: 'REST API endpoints with 100% route coverage'
      },
      {
        stepNumber: 3,
        title: 'React Editor & WebSocket Server',
        tasks: ['Build rich-text editor UI', 'Implement Socket.io room management with heartbeat ping'],
        deliverable: 'Interactive multi-user editor with presence indicators'
      },
      {
        stepNumber: 4,
        title: 'Containerization & Cloud Deployment',
        tasks: ['Write multi-stage Dockerfile', 'Deploy to Render / AWS with automated environment variable injection'],
        deliverable: 'Live HTTPS production URL and GitHub repository'
      }
    ],
    resumeBulletPoints: [
      'Architected full-stack collaborative workspace serving 50+ concurrent real-time editors using Node.js, Socket.IO, and React 19.',
      'Designed normalized PostgreSQL relational schema with indexed foreign keys, reducing query execution time by 42%.',
      'Implemented role-based access control (RBAC) across 8 distinct resource scopes with JWT token verification middleware.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'How do you handle conflict resolution when two users edit the same document simultaneously?',
        keyDiscussionPoints: 'Discuss Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs), or explain last-write-wins with optimistic UI locking at paragraph block level.'
      },
      {
        question: 'Why did you choose PostgreSQL over MongoDB for this collaborative platform?',
        keyDiscussionPoints: 'Explain the strict relational hierarchy between Users, Workspaces, Memberships, and Documents where foreign key constraints prevent orphan records.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: true
  },

  // ==================== 2. FRONTEND ENGINEERING ====================
  {
    id: 'proj-fe-design-system',
    slug: 'accessible-component-library',
    title: 'Accessible Enterprise UI Component Library & Token Engine',
    summary: 'A standalone, fully typed React 19 component library adhering strictly to WAI-ARIA standards, complete with interactive Storybook documentation and automated npm packaging.',
    trackSlug: 'frontend',
    projectType: 'Frontend SPA',
    difficulty: 'Advanced',
    estimatedHours: 30,
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Vite', 'Vitest', 'WAI-ARIA'],
    objective: 'Build an industry-grade design system with 15+ composable primitives (Modals, Dropdowns, Tabs, Tooltips) with full keyboard navigation and screen-reader accessibility.',
    problemStatement: 'Engineers frequently build ad-hoc UI widgets that lack accessible ARIA attributes, break on mobile touch devices, or produce bloated bundle sizes.',
    expectedOutcome: 'An accessible, npm-packable UI library with 100% keyboard navigation support, Storybook visual catalog, and zero external runtime dependencies.',
    prerequisites: ['React component lifecycles', 'TypeScript generics & prop typing', 'CSS modern layouts'],
    systemArchitectureOverview: 'Compound component design pattern with React Context for internal primitive state sharing and Tailwind CSS design tokens compiled via Vite library mode.',
    keyFeatures: [
      '15+ accessible components including Modal, Combobox, Data Table, Dropdown Menu, and Drawer',
      'Full keyboard focus trapping, Esc-to-close listeners, and arrow-key navigation',
      'Dark mode and theme token customization via CSS custom properties',
      'Storybook interactive playground with documentation and accessibility audit add-on'
    ],
    userStories: [
      {
        title: 'Keyboard Focus Trap',
        description: 'As a keyboard-only user, when a modal dialog opens, focus must be trapped inside and cycling Tab must not escape to background DOM.',
        acceptanceCriteria: ['Focus moves to first interactive child on open', 'Esc key triggers close handler and restores previous trigger focus']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Token Foundation & Build Config',
        tasks: ['Configure Vite library mode and TypeScript declarations', 'Set up CSS variables for colors, spacing, and typography'],
        deliverable: 'Configured library build pipeline'
      },
      {
        stepNumber: 2,
        title: 'Core Primitive Development',
        tasks: ['Build Button, Input, Modal, and Dropdown primitives', 'Implement focus-trap and ARIA roles'],
        deliverable: 'Tested accessible component primitives'
      },
      {
        stepNumber: 3,
        title: 'Storybook & Documentation Catalog',
        tasks: ['Write Storybook stories for each component state', 'Run automated axe-core accessibility tests'],
        deliverable: 'Published interactive Storybook showcase'
      }
    ],
    resumeBulletPoints: [
      'Engineered accessible React 19 UI component system featuring 15+ compound primitives with 100% WCAG 2.1 AA compliance.',
      'Constructed automated Storybook documentation catalog integrated with axe-core accessibility regression tests.',
      'Reduced component bundle size by 38% utilizing tree-shakeable ES module exports and CSS variable token mapping.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'How does focus trapping work under the hood in your Modal component?',
        keyDiscussionPoints: 'Explain querying focusable elements (buttons, links, inputs), listening to Tab/Shift+Tab keydown events, and preventing default browser cycling when boundaries are reached.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: true
  },

  // ==================== 3. BACKEND ENGINEERING ====================
  {
    id: 'proj-be-rate-limiter',
    slug: 'distributed-api-rate-limiter',
    title: 'High-Throughput Distributed Rate Limiter & API Gateway',
    summary: 'A resilient API Gateway proxy implementing sliding-window rate limiting, token-bucket algorithms, Redis atomic Lua scripts, and Prometheus telemetry metrics.',
    trackSlug: 'backend',
    projectType: 'Microservice API',
    difficulty: 'Advanced',
    estimatedHours: 28,
    techStack: ['Node.js', 'Express', 'Redis', 'Lua Scripts', 'Docker', 'Prometheus', 'Grafana'],
    objective: 'Design a distributed rate-limiting proxy capable of processing 10,000+ requests per second with microsecond latency and zero race conditions.',
    problemStatement: 'Unchecked API traffic can cause denial of service and database exhaustion without reliable rate-limiting across multi-instance server clusters.',
    expectedOutcome: 'A high-throughput API gateway middleware with configurable tiered limits (Free vs Pro tiers), atomic Redis execution, and real-time Grafana dashboard.',
    prerequisites: ['Node.js async programming', 'Redis data structures', 'HTTP protocol status codes'],
    systemArchitectureOverview: 'Express reverse-proxy middleware inspecting client IP / API keys, querying Redis cluster via custom Lua script for atomic sliding window counters, and forwarding legitimate requests to downstream services.',
    keyFeatures: [
      'Sliding window log algorithm implemented via atomic Redis Lua scripting to eliminate concurrency race conditions',
      'Configurable rate tiers (e.g. Free: 60 req/min, Premium: 1,000 req/min)',
      'Standard HTTP 429 Too Many Requests response with Retry-After and X-RateLimit headers',
      'Prometheus exporter capturing request rates, blocked requests, and latency percentiles'
    ],
    userStories: [
      {
        title: 'Rate Limit Enforcement',
        description: 'As an API provider, when a client exceeds their tier quota, their requests should be rejected with HTTP 429 without reaching backend databases.',
        acceptanceCriteria: ['Rejection response takes < 5ms', 'Headers X-RateLimit-Limit and X-RateLimit-Remaining correctly returned']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Redis Lua Script Architecture',
        tasks: ['Write Lua script executing ZADD, ZREMRANGEBYSCORE, and ZCARD in a single atomic transaction', 'Write Jest tests validating window rollover'],
        deliverable: 'Atomic Redis sliding window script'
      },
      {
        stepNumber: 2,
        title: 'Express Gateway Middleware',
        tasks: ['Build middleware extracting client identifiers (API Key / IP)', 'Implement tiered quota resolution and header generation'],
        deliverable: 'Deployable Express rate-limiting middleware'
      },
      {
        stepNumber: 3,
        title: 'Load Testing & Metrics Dashboard',
        tasks: ['Run Artillery / Autocannon benchmark with 5,000 concurrent virtual users', 'Connect Prometheus and Grafana for monitoring'],
        deliverable: 'Benchmark report and Grafana telemetry dashboard'
      }
    ],
    resumeBulletPoints: [
      'Designed distributed sliding-window API rate limiter in Node.js and Redis, capable of mitigating DDoS traffic across 10k req/sec.',
      'Authored atomic Redis Lua scripts eliminating concurrency race conditions in multi-threaded container clusters.',
      'Integrated Prometheus metrics and Grafana visual dashboards tracking 99th-percentile latency and quota exhaustion events.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why did you write a custom Lua script instead of standard Redis GET and INCR commands?',
        keyDiscussionPoints: 'Explain network round-trips and race conditions between separate GET and INCR operations, and how Redis executes Lua scripts atomically in a single thread.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 4. JAVA ENTERPRISE DEVELOPMENT ====================
  {
    id: 'proj-java-ecommerce',
    slug: 'event-driven-microservices-java',
    title: 'Event-Driven E-Commerce Microservices Platform',
    summary: 'A resilient Java microservices architecture featuring Spring Boot 3, Apache Kafka message streaming, Spring Cloud Gateway, resilient Circuit Breakers (Resilience4j), and PostgreSQL.',
    trackSlug: 'java-enterprise',
    projectType: 'Enterprise Java System',
    difficulty: 'Capstone',
    estimatedHours: 45,
    techStack: ['Java 21', 'Spring Boot 3', 'Spring Cloud Gateway', 'Apache Kafka', 'PostgreSQL', 'Docker', 'Resilience4j'],
    objective: 'Construct an event-driven enterprise application decomposing Order, Inventory, and Notification services with asynchronous Kafka message brokers.',
    problemStatement: 'Synchronous REST calls between microservices create cascading failures; if the Payment or Inventory service slows down, the entire checkout pipeline freezes.',
    expectedOutcome: 'A decoupled microservices ecosystem with transactional outbox patterns, automated retry policies, distributed tracing, and high service availability.',
    prerequisites: ['Core Java (OOP, Streams)', 'Spring Boot REST development', 'Relational database concepts'],
    systemArchitectureOverview: 'Microservices architecture with Spring Cloud Gateway routing client requests, Kafka topics facilitating asynchronous event choreography, and Resilience4j circuit breakers providing graceful degradation.',
    keyFeatures: [
      'Decoupled Order, Inventory, Payment, and Notification services communicating via Kafka topics',
      'Resilience4j Circuit Breaker and Fallback handlers preventing cascading timeouts',
      'Spring Cloud Gateway with JWT authentication filter and rate limiting',
      'Transactional Outbox pattern ensuring reliable database state and event publication'
    ],
    userStories: [
      {
        title: 'Asynchronous Order Fulfillment',
        description: 'As a customer placing an order, my order should be acknowledged immediately while inventory deduction and email notifications process asynchronously.',
        acceptanceCriteria: ['Order creation returns HTTP 201 within 80ms', 'Kafka OrderPlaced event consumed by Inventory service within 500ms']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Service Architecture & Domain Modeling',
        tasks: ['Scaffold Spring Boot services with Spring Data JPA', 'Set up local multi-broker Kafka cluster with Docker Compose'],
        deliverable: 'Scaffolded microservices with Kafka broker'
      },
      {
        stepNumber: 2,
        title: 'Kafka Event Choreography',
        tasks: ['Implement Kafka producers and consumers with error handling', 'Configure dead-letter queues (DLQ) for failed messages'],
        deliverable: 'Reliable event-driven messaging pipeline'
      },
      {
        stepNumber: 3,
        title: 'API Gateway & Fault Tolerance',
        tasks: ['Configure Spring Cloud Gateway routing', 'Add Resilience4j circuit breaker on external payment APIs'],
        deliverable: 'Hardened enterprise e-commerce platform'
      }
    ],
    resumeBulletPoints: [
      'Architected event-driven microservices platform with Spring Boot 3 and Apache Kafka processing 200+ events/sec.',
      'Implemented Resilience4j circuit breakers and fallback handlers, maintaining 99.9% uptime during downstream service outages.',
      'Engineered distributed database transactions utilizing Transactional Outbox pattern across 4 isolated PostgreSQL instances.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'How do you prevent duplicate order processing in your Kafka consumer?',
        keyDiscussionPoints: 'Discuss idempotent consumers, unique message keys/UUIDs, and database unique constraints on processed event tables.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: true
  },

  // ==================== 5. PYTHON SOFTWARE DEVELOPMENT ====================
  {
    id: 'proj-python-crawler',
    slug: 'async-distributed-web-crawler',
    title: 'Async Distributed Job Aggregator & Scraping Pipeline',
    summary: 'High-performance asynchronous web intelligence crawler built with Python 3.12, AsyncIO, Celery distributed tasks, Redis queue, and FastAPI search endpoints.',
    trackSlug: 'python-dev',
    projectType: 'Python Async API',
    difficulty: 'Intermediate',
    estimatedHours: 25,
    techStack: ['Python 3.12', 'FastAPI', 'AsyncIO', 'aiohttp', 'Celery', 'Redis', 'BeautifulSoup4', 'PostgreSQL'],
    objective: 'Build an automated pipeline scraping tech job boards concurrently, extracting structured metadata, deduplicating records, and exposing full-text search APIs.',
    problemStatement: 'Manual job hunting across multiple portals is time-consuming; applicants miss listings without automated ingestion, cleaning, and alerting.',
    expectedOutcome: 'A robust job scraping system extracting thousands of jobs daily with concurrency controls, polite rate-limiting, and instant query endpoints.',
    prerequisites: ['Python basics', 'HTTP requests & HTML parsing', 'Async/await syntax'],
    systemArchitectureOverview: 'FastAPI REST interface dispatching scheduled Celery background workers; workers fetch pages asynchronously using aiohttp with connection pooling and persist parsed JSON into PostgreSQL.',
    keyFeatures: [
      'Asynchronous HTTP engine scraping 50+ pages per minute with polite domain throttling',
      'HTML sanitization and regex extraction for compensation, requirements, and remote status',
      'Celery distributed task worker queue backed by Redis with automated retry backoff',
      'FastAPI search endpoints with PostgreSQL full-text search index and filtering'
    ],
    userStories: [
      {
        title: 'Full-Text Job Search',
        description: 'As a job seeker, I want to query jobs by keyword, location, and required technology with sub-50ms search latency.',
        acceptanceCriteria: ['API query matches across title and job description', 'Results paginated with total match counts']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Asynchronous Scraper Engine',
        tasks: ['Build aiohttp fetcher with custom user-agents and proxy rotation', 'Write BeautifulSoup parser extracting structured fields'],
        deliverable: 'Tested async scraping engine'
      },
      {
        stepNumber: 2,
        title: 'Celery Task Queue & Database Ingestion',
        tasks: ['Set up Celery worker with Redis broker', 'Configure scheduled Celery Beat cron tasks and duplicate detection'],
        deliverable: 'Automated background ingestion pipeline'
      },
      {
        stepNumber: 3,
        title: 'FastAPI Query Service',
        tasks: ['Build REST endpoints with Pydantic schemas', 'Implement PostgreSQL GIN indexes for fast full-text searching'],
        deliverable: 'Complete job intelligence search service'
      }
    ],
    resumeBulletPoints: [
      'Engineered asynchronous Python web scraping pipeline ingesting 10,000+ job listings daily using AsyncIO and aiohttp.',
      'Implemented distributed task queuing with Celery and Redis, reducing daily ingestion cycle duration by 65%.',
      'Built FastAPI querying layer with PostgreSQL GIN full-text indexing, achieving sub-20ms search response times.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'How do you handle IP blocking or rate limits from target websites?',
        keyDiscussionPoints: 'Discuss exponential backoff, respecting robots.txt, rotating user-agents, proxy pools, and rate-limiting concurrent connections per domain.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 6. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING ====================
  {
    id: 'proj-ai-rag-agent',
    slug: 'rag-document-intelligence-agent',
    title: 'Enterprise Document Intelligence Agent with RAG & Vector Search',
    summary: 'A Retrieval-Augmented Generation (RAG) assistant using LangChain, ChromaDB vector store, OpenAI/HuggingFace embeddings, and semantic chunking for contextual question answering.',
    trackSlug: 'ai-ml',
    projectType: 'AI & Deep Learning System',
    difficulty: 'Capstone',
    estimatedHours: 35,
    techStack: ['Python', 'LangChain', 'ChromaDB', 'PyTorch', 'Hugging Face', 'FastAPI', 'Streamlit', 'Docker'],
    objective: 'Build an enterprise RAG knowledge engine that ingests large technical PDF manuals and answers domain questions with exact page citations and zero hallucination.',
    problemStatement: 'Standard LLMs hallucinate on proprietary corporate documents and cannot cite exact sources or keep context across long multi-page technical manuals.',
    expectedOutcome: 'A complete RAG application with document upload, semantic embedding generation, hybrid vector retrieval, and streaming LLM answers with citation badges.',
    prerequisites: ['Python intermediate', 'Vector embeddings concepts', 'Basic API development'],
    systemArchitectureOverview: 'Document parser extracting text from PDFs, chunking via recursive character splitting, embedding with HuggingFace sentence-transformers into ChromaDB vector store, and injecting top-k context into LLM prompt via FastAPI.',
    keyFeatures: [
      'Semantic PDF text extraction and recursive chunking with 20% overlap',
      'ChromaDB vector database indexing embeddings for cosine similarity retrieval',
      'Hybrid search combining dense vector retrieval with BM25 keyword matching for maximum precision',
      'Streaming responses with exact source document page number and excerpt attribution'
    ],
    userStories: [
      {
        title: 'Verifiable Document Citations',
        description: 'As a technical auditor, I want every generated answer to include clickable references to the exact PDF pages used as context.',
        acceptanceCriteria: ['Answer includes [Page X] reference tags', 'Hovering shows the exact chunk text extracted from source']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Document Ingestion & Vector Indexing',
        tasks: ['Build PDF ingestion pipeline with PyPDF', 'Generate sentence embeddings and store in ChromaDB with metadata'],
        deliverable: 'Vector database populated with indexed chunks'
      },
      {
        stepNumber: 2,
        title: 'RAG Retrieval & Prompt Engineering',
        tasks: ['Implement top-k semantic similarity search', 'Design anti-hallucination prompt templates with strict context grounding'],
        deliverable: 'Tested LangChain retrieval chain'
      },
      {
        stepNumber: 3,
        title: 'Interactive UI & FastAPI Backend',
        tasks: ['Build FastAPI streaming endpoint', 'Create Streamlit or React conversational interface with citation drawer'],
        deliverable: 'Full production-ready RAG application'
      }
    ],
    resumeBulletPoints: [
      'Developed enterprise RAG question-answering system using LangChain, ChromaDB, and Hugging Face embeddings across 500+ documents.',
      'Reduced LLM hallucination rate to under 2% by implementing hybrid vector-BM25 retrieval and strict contextual prompt boundaries.',
      'Deployed FastAPI streaming microservice with Docker containerization, reducing end-to-end token latency by 40%.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'How do you choose chunk size and overlap in a RAG pipeline?',
        keyDiscussionPoints: 'Explain the tradeoff: smaller chunks give precise semantic context, larger chunks retain broader narrative; overlap (e.g., 50-100 tokens) prevents splitting key sentences.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: true
  },

  // ==================== 7. DATA SCIENCE & PREDICTIVE MODELING ====================
  {
    id: 'proj-ds-churn-prediction',
    slug: 'customer-churn-prediction-pipeline',
    title: 'End-to-End Customer Churn Prediction & Model Deployment',
    summary: 'A predictive modeling pipeline utilizing Pandas, Scikit-learn, XGBoost, SHAP explainability values, and MLflow experiment tracking deployed as a live prediction microservice.',
    trackSlug: 'data-science',
    projectType: 'Data Science & ML Pipeline',
    difficulty: 'Intermediate',
    estimatedHours: 25,
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'SHAP', 'MLflow', 'FastAPI'],
    objective: 'Predict telecom customer churn with > 85% ROC-AUC and provide business stakeholders with interpretable feature importance and risk scores.',
    problemStatement: 'Businesses lose millions to unexpected customer churn; retention campaigns fail when account managers do not know which customers are at risk or why.',
    expectedOutcome: 'An end-to-end trained model pipeline with cross-validated hyperparameter tuning, SHAP model explainability plots, and real-time REST prediction API.',
    prerequisites: ['Python data stack (Pandas, NumPy)', 'Exploratory data analysis', 'Basic classification metrics'],
    systemArchitectureOverview: 'Data ingestion and cleaning pipeline feeding feature engineering pipelines, trained with XGBoost classifier tracked via MLflow, and deployed behind a FastAPI inference endpoint.',
    keyFeatures: [
      'Exploratory data analysis identifying high-correlation churn factors (contract type, monthly charges)',
      'Automated Scikit-learn Pipeline with OneHotEncoder, StandardScaler, and SMOTE class imbalance handling',
      'Hyperparameter optimization using Optuna / RandomizedSearchCV achieving 0.88 ROC-AUC',
      'SHAP (SHapley Additive exPlanations) visual breakdown explaining individual customer risk drivers'
    ],
    userStories: [
      {
        title: 'Individual Churn Explanation',
        description: 'As a customer success representative, when I check an account risk score, I want to see the top 3 specific factors increasing their likelihood of leaving.',
        acceptanceCriteria: ['API returns probability score and top 3 SHAP feature values', 'Inference latency under 100ms']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'EDA & Feature Engineering',
        tasks: ['Clean missing values, handle categorical variables', 'Compute feature correlations and tenure cohorts'],
        deliverable: 'Jupyter notebook with EDA insights'
      },
      {
        stepNumber: 2,
        title: 'Model Training & MLflow Tracking',
        tasks: ['Train Random Forest and XGBoost benchmarks', 'Track precision, recall, and ROC-AUC metrics in MLflow'],
        deliverable: 'Validated XGBoost model artifact'
      },
      {
        stepNumber: 3,
        title: 'Explainability & Inference API',
        tasks: ['Generate SHAP summary and waterfall plots', 'Wrap model pipeline in FastAPI with Pydantic validation schemas'],
        deliverable: 'Live prediction API with explainability outputs'
      }
    ],
    resumeBulletPoints: [
      'Trained and deployed XGBoost customer churn classification pipeline achieving 0.88 ROC-AUC across 100k+ customer profiles.',
      'Utilized SHAP values for model interpretability, delivering actionable risk indicators for customer success teams.',
      'Built automated MLflow tracking and FastAPI inference service with Pydantic request validation.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why did you optimize for ROC-AUC / Recall rather than standard Accuracy for churn prediction?',
        keyDiscussionPoints: 'Explain class imbalance in churn datasets: a naive model predicting zero churn achieves high accuracy but misses all churning customers, leading to revenue loss.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 8. DATA ANALYTICS & BUSINESS INTELLIGENCE ====================
  {
    id: 'proj-da-ecommerce-bi',
    slug: 'executive-ecommerce-bi-dashboard',
    title: 'Executive E-Commerce Revenue & Cohort BI Dashboard',
    summary: 'Comprehensive business intelligence pipeline extracting PostgreSQL transactional data, transforming it with complex SQL, and visualizing KPI trends in Power BI.',
    trackSlug: 'data-analytics',
    projectType: 'Business Intelligence Dashboard',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    techStack: ['SQL (PostgreSQL)', 'Power BI', 'DAX', 'Excel / Power Query', 'Python (Data Prep)'],
    objective: 'Transform 500,000+ raw transactional records into an interactive executive dashboard tracking Customer Lifetime Value (LTV), retention cohorts, and revenue trends.',
    problemStatement: 'Leadership lacks visibility into monthly recurring revenue drivers, regional growth bottlenecks, and customer cohort retention decay curves.',
    expectedOutcome: 'A multi-page Power BI dashboard featuring dynamic DAX KPIs, cohort retention heatmap, and automated refresh scheduling.',
    prerequisites: ['SQL intermediate (Joins, Aggregations)', 'Spreadsheet pivot tables', 'Business KPI concepts'],
    systemArchitectureOverview: 'Star schema data model in PostgreSQL connected to Power Query; transformed into Fact Sales, Dim Customer, Dim Product, and Dim Date tables, powered by DAX measures.',
    keyFeatures: [
      'Normalized Star Schema data warehouse model with primary and foreign key integrity',
      'Advanced SQL queries calculating Customer Acquisition Cost (CAC) and rolling 30-day revenue',
      'DAX measures for Year-over-Year (YoY) growth, Month-over-Month (MoM) sales, and cohort retention percentage',
      'Interactive drill-through by product category, geographic territory, and customer tier'
    ],
    userStories: [
      {
        title: 'Retention Cohort Analysis',
        description: 'As a VP of Marketing, I want to see a triangular cohort retention matrix showing the percentage of customers returning in month 1, 2, 3, etc.',
        acceptanceCriteria: ['Heatmap color-codes retention percentage', 'Filterable by original signup channel']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'SQL Data Extraction & Cleansing',
        tasks: ['Write SQL scripts generating Date and Customer dimension tables', 'Extract RFM (Recency, Frequency, Monetary) customer scores'],
        deliverable: 'Cleaned Star Schema database tables'
      },
      {
        stepNumber: 2,
        title: 'DAX Calculations & Modeling',
        tasks: ['Build Star Schema relationships in Power BI', 'Author DAX time-intelligence measures (YTD, Prior Year, Growth %)'],
        deliverable: 'Validated DAX measures matrix'
      },
      {
        stepNumber: 3,
        title: 'Executive Dashboard Visuals',
        tasks: ['Design KPI summary header with trend sparklines', 'Add cohort heatmap and regional map drill-down'],
        deliverable: 'Published executive Power BI dashboard report'
      }
    ],
    resumeBulletPoints: [
      'Architected executive e-commerce analytics dashboard modeling 500k+ transactions into a Star Schema data model in Power BI.',
      'Authored 25+ advanced DAX calculations for Year-over-Year revenue growth, customer lifetime value, and cohort retention.',
      'Constructed RFM customer segmentation model, uncovering $240k in untapped re-engagement opportunities for marketing teams.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'What is the advantage of a Star Schema over a single flat denormalized table in Power BI?',
        keyDiscussionPoints: 'Explain memory optimization in VertiPaq engine, reduced redundancy, faster DAX calculation performance, and intuitive dimensional modeling.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 9. CLOUD COMPUTING & INFRASTRUCTURE ====================
  {
    id: 'proj-cloud-ha-aws',
    slug: 'high-availability-aws-infrastructure',
    title: 'Automated Multi-AZ Highly Available AWS Architecture with Terraform',
    summary: 'A production AWS infrastructure deployed declaratively via Terraform: multi-AZ VPC, Auto Scaling EC2 fleet, Application Load Balancer, Multi-AZ RDS PostgreSQL, and S3 assets.',
    trackSlug: 'cloud-computing',
    projectType: 'Cloud Infrastructure & IaC',
    difficulty: 'Capstone',
    estimatedHours: 30,
    techStack: ['AWS (VPC, EC2, ALB, RDS, S3, IAM)', 'Terraform (IaC)', 'Linux / Bash', 'CloudWatch'],
    objective: 'Deploy a self-healing, zero single-point-of-failure cloud infrastructure on AWS capable of absorbing zone outages and scaling compute automatically with traffic load.',
    problemStatement: 'Manual AWS console configuration leads to configuration drift, security group misconfigurations, and catastrophic downtime when an availability zone suffers an outage.',
    expectedOutcome: 'A modular, reusable Terraform codebase spinning up a secure, multi-AZ VPC, public/private subnets, load-balanced web servers, and automated database failover in 10 minutes.',
    prerequisites: ['Basic AWS concepts (EC2, VPC)', 'Linux CLI', 'Terraform syntax'],
    systemArchitectureOverview: 'Custom AWS VPC across two Availability Zones; public subnets host ALB and NAT Gateways; private subnets host EC2 instances in an Auto Scaling Group and Multi-AZ RDS PostgreSQL.',
    keyFeatures: [
      'Multi-AZ VPC with 2 public subnets, 2 application private subnets, and 2 database subnets',
      'Application Load Balancer performing health checks and distributing traffic across availability zones',
      'Auto Scaling Group with CPU utilization target tracking policies (scales from 2 to 6 instances)',
      'Encrypted RDS PostgreSQL instance with automated Multi-AZ standby replica failover'
    ],
    userStories: [
      {
        title: 'Availability Zone Failover',
        description: 'As a system operator, when an entire AWS availability zone fails, traffic should automatically reroute to the surviving zone with zero downtime.',
        acceptanceCriteria: ['ALB health checks detect failing instances in < 30s', 'Multi-AZ RDS fails over to standby in < 60s']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Networking & VPC Module',
        tasks: ['Write Terraform code for VPC, Internet Gateway, and NAT Gateways', 'Configure route tables for public and private subnets'],
        deliverable: 'Isolated multi-AZ VPC deployed via Terraform'
      },
      {
        stepNumber: 2,
        title: 'Compute & Auto Scaling',
        tasks: ['Create EC2 launch templates with UserData provisioning script', 'Configure Auto Scaling Group and Application Load Balancer'],
        deliverable: 'Load-balanced web tier with auto-healing'
      },
      {
        stepNumber: 3,
        title: 'Database & Monitoring',
        tasks: ['Deploy encrypted Multi-AZ RDS PostgreSQL', 'Configure CloudWatch alarms for CPU and 5xx error anomalies'],
        deliverable: 'Production-ready automated AWS cloud environment'
      }
    ],
    resumeBulletPoints: [
      'Prototyped and provisioned multi-AZ AWS cloud infrastructure using modular Terraform, eliminating single points of failure.',
      'Configured Application Load Balancer and Auto Scaling Groups, ensuring dynamic capacity adjustment from 2 to 6 instances.',
      'Enforced least-privilege IAM security roles and encrypted Multi-AZ RDS storage adhering to AWS Well-Architected standards.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why should database instances always be placed in private subnets without public IPs?',
        keyDiscussionPoints: 'Explain defense in depth, preventing direct internet attacks, allowing access only via application security groups, and routing outbound queries through NAT gateways.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: true
  },

  // ==================== 10. DEVOPS & SITE RELIABILITY ENGINEERING ====================
  {
    id: 'proj-devops-gitops-k8s',
    slug: 'gitops-kubernetes-cicd-pipeline',
    title: 'Automated GitOps CI/CD Pipeline with Kubernetes & ArgoCD',
    summary: 'A continuous deployment pipeline using GitHub Actions, Docker multi-stage builds, Helm charts, ArgoCD GitOps reconciliation, and Prometheus/Grafana observability.',
    trackSlug: 'devops-sre',
    projectType: 'DevOps & GitOps Pipeline',
    difficulty: 'Capstone',
    estimatedHours: 35,
    techStack: ['Kubernetes (k3s / Minikube)', 'Docker', 'GitHub Actions', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana'],
    objective: 'Implement an automated GitOps deployment workflow where code commits trigger automated testing, image builds, security scanning, and live cluster synchronization.',
    problemStatement: 'Manual kubectl deployments and imperative scripts lead to configuration drift, roll-back failures, and lack of audit trails during production releases.',
    expectedOutcome: 'A complete GitOps pipeline deploying microservices to Kubernetes via declarative Helm charts with automated canary/rolling updates and zero downtime.',
    prerequisites: ['Docker basics', 'Kubernetes core resources (Pods/Deployments)', 'Git workflows'],
    systemArchitectureOverview: 'GitHub Actions builds and scans container images on git push, updates declarative Helm values in a dedicated config repo; ArgoCD detects git state changes and syncs the Kubernetes cluster state automatically.',
    keyFeatures: [
      'Multi-stage Dockerfile minimizing image size (< 80MB) and executing security scans with Trivy',
      'GitHub Actions workflow with linting, unit testing, image tagging, and GitHub Container Registry push',
      'ArgoCD GitOps controller monitoring the Git repository for automated declarative drift reconciliation',
      'Prometheus and Grafana dashboards monitoring Pod CPU, memory usage, and HTTP error rates'
    ],
    userStories: [
      {
        title: 'Zero-Downtime Deployment',
        description: 'As a DevOps engineer, when a new image tag is committed to Git, Kubernetes should perform a rolling update without dropping active user connections.',
        acceptanceCriteria: ['Readiness and liveness probes prevent routing traffic to booting pods', 'ArgoCD reflects synced status in < 60s']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Containerization & CI Workflow',
        tasks: ['Write secure multi-stage Dockerfile', 'Build GitHub Actions workflow testing code and publishing images'],
        deliverable: 'Automated CI build and container scan pipeline'
      },
      {
        stepNumber: 2,
        title: 'Helm Chart Packaging',
        tasks: ['Parameterize Deployment, Service, Ingress, and ConfigMap in Helm', 'Configure rolling update strategies and probes'],
        deliverable: 'Reusable Helm chart'
      },
      {
        stepNumber: 3,
        title: 'ArgoCD GitOps & Cluster Monitoring',
        tasks: ['Deploy ArgoCD on Kubernetes and configure Git repository sync', 'Install Prometheus stack for cluster observability'],
        deliverable: 'Fully automated GitOps pipeline with live monitoring'
      }
    ],
    resumeBulletPoints: [
      'Built end-to-end GitOps CI/CD pipeline deploying microservices to Kubernetes via GitHub Actions and ArgoCD.',
      'Packaged multi-service applications using Helm charts, implementing rolling updates with zero downtime.',
      'Integrated Trivy vulnerability scanning into CI steps, blocking vulnerable container base images before deployment.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'What is the fundamental difference between push-based CI/CD and pull-based GitOps?',
        keyDiscussionPoints: 'Explain push-based (CI runner holds cluster credentials and executes kubectl) vs pull-based (ArgoCD inside cluster continuously pulls and reconciles Git state, enhancing security).'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: true
  },

  // ==================== 11. CYBERSECURITY & ETHICAL HACKING ====================
  {
    id: 'proj-sec-soc-lab',
    slug: 'soc-vulnerability-detection-lab',
    title: 'Enterprise SIEM & Automated Threat Detection Lab',
    summary: 'A virtual Security Operations Center (SOC) lab analyzing brute-force attacks, web application exploits, and credential stuffing using Wazuh SIEM, Suricata IDS, and ELK Stack.',
    trackSlug: 'cybersecurity',
    projectType: 'Cybersecurity SOC & PenTest',
    difficulty: 'Advanced',
    estimatedHours: 25,
    techStack: ['Linux', 'Wazuh SIEM', 'Suricata IDS', 'Elasticsearch', 'Kibana', 'Wireshark', 'Python'],
    objective: 'Simulate real-world cyber attacks against vulnerable target systems, detect anomalies via network intrusion detection (IDS), and author custom SOC alert rules.',
    problemStatement: 'Security analysts need hands-on experience detecting attack vectors in real-time logs rather than merely reading theoretical definitions.',
    expectedOutcome: 'A working SOC lab with Wazuh agents, Suricata network packet inspection, automated Slack/webhook alert triggers, and an incident response playbook.',
    prerequisites: ['Networking fundamentals (TCP/IP)', 'Linux command line', 'Basic understanding of cyber attacks'],
    systemArchitectureOverview: 'Vulnerable target VM monitored by Wazuh agent and Suricata IDS; logs and alerts forwarded to centralized Elasticsearch cluster and visualized on Kibana security dashboard.',
    keyFeatures: [
      'Suricata signature-based network intrusion detection monitoring suspicious HTTP payloads',
      'Wazuh agent tracking file integrity (FIM) and detecting unauthorized privilege escalation attempts',
      'Custom Python script generating attack simulations (SSH brute force, SQL injection)',
      'Incident Response playbook documenting containment and forensic recovery steps'
    ],
    userStories: [
      {
        title: 'Brute Force Alert Generation',
        description: 'As a SOC Tier 1 analyst, when an attacker attempts 10+ failed SSH logins within 30 seconds, an alert must trigger on the Kibana dashboard.',
        acceptanceCriteria: ['Alert logs source IP, target user, and timestamp', 'Severity level categorized as High']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Lab Environment Setup',
        tasks: ['Deploy Docker containers for Wazuh manager, indexer, and dashboard', 'Install agent on target Linux instance'],
        deliverable: 'Operational SIEM monitoring environment'
      },
      {
        stepNumber: 2,
        title: 'Attack Simulation & Rule Authoring',
        tasks: ['Execute simulated attacks (Hydra SSH, SQLmap)', 'Author custom Wazuh XML detection rules and alert decoders'],
        deliverable: 'Custom detection rules and logged telemetry'
      },
      {
        stepNumber: 3,
        title: 'Incident Response Documentation',
        tasks: ['Build Kibana dashboard displaying active threat vectors', 'Write formal Incident Response report following NIST framework'],
        deliverable: 'Complete SOC defense report and dashboard'
      }
    ],
    resumeBulletPoints: [
      'Constructed virtual SOC environment with Wazuh SIEM and Suricata IDS, capturing real-time attack telemetry.',
      'Authored custom detection rules and regex decoders identifying SSH brute-force and web application injection attempts.',
      'Authored incident response playbooks adhering to the NIST Cybersecurity Framework for containment and forensic analysis.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'How do you differentiate between false positives and legitimate security incidents in SIEM alerts?',
        keyDiscussionPoints: 'Discuss correlating multiple log sources (firewall + host auth + web logs), establishing baseline normal user behavior, and tuning threshold rules.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 12. MOBILE APP DEVELOPMENT ====================
  {
    id: 'proj-mobile-health-tracker',
    slug: 'fitness-habit-tracker-mobile',
    title: 'Cross-Platform Fitness & Habit Tracking Mobile App',
    summary: 'A sleek, offline-first mobile habit application built with React Native, Expo, SQLite local storage, animated gesture interactions, and local notifications.',
    trackSlug: 'mobile-dev',
    projectType: 'Mobile Application',
    difficulty: 'Intermediate',
    estimatedHours: 25,
    techStack: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'React Native Reanimated', 'Local Notifications'],
    objective: 'Build an offline-first mobile application featuring fluid 60 FPS gesture animations, streak calculations, and reliable local SQLite data persistence.',
    problemStatement: 'Many mobile habit apps require an active internet connection and lag when tracking daily routines, causing user abandonment.',
    expectedOutcome: 'A complete standalone iOS and Android application with daily habit check-ins, streak visualizations, weekly charts, and automated local push notifications.',
    prerequisites: ['React basics', 'TypeScript fundamentals', 'Mobile UI concepts'],
    systemArchitectureOverview: 'React Native app utilizing Expo Router for navigation, SQLite for offline-first local transactional database, and React Native Reanimated 3 for fluid 60fps gesture interactions.',
    keyFeatures: [
      'Offline-first architecture with embedded SQLite database and instantaneous load times',
      'Smooth swipe-to-complete habit cards with haptic feedback and Reanimated gestures',
      'Streak counter algorithm calculating current streak, longest streak, and completion percentages',
      'Scheduled daily local notifications reminding users to complete pending habits'
    ],
    userStories: [
      {
        title: 'Offline Habit Logging',
        description: 'As a user without mobile data or Wi-Fi, I want to log my habits immediately and see my streaks update without error.',
        acceptanceCriteria: ['Action completes in < 16ms without network requests', 'SQLite persists data across app restarts']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'App Scaffold & SQLite Schema',
        tasks: ['Initialize Expo TypeScript project with Expo Router', 'Design SQLite schema for Habits, Logs, and Categories'],
        deliverable: 'Working database layer with CRUD functions'
      },
      {
        stepNumber: 2,
        title: 'Animated Habit Cards & Interactions',
        tasks: ['Build swipeable cards using React Native Gesture Handler and Reanimated', 'Add haptic feedback on completion'],
        deliverable: 'Interactive mobile interface'
      },
      {
        stepNumber: 3,
        title: 'Notifications & Analytics Charts',
        tasks: ['Schedule daily reminders with Expo Notifications', 'Build weekly completion bar charts with SVG'],
        deliverable: 'Complete installable mobile APK / Expo preview'
      }
    ],
    resumeBulletPoints: [
      'Built offline-first mobile habit application in React Native and TypeScript with embedded SQLite storage.',
      'Achieved smooth 60 FPS UI transitions and swipe interactions utilizing React Native Reanimated 3.',
      'Configured local background notification scheduling and haptic response feedback across iOS and Android.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why choose an embedded SQLite database over AsyncStorage for a habit tracking application?',
        keyDiscussionPoints: 'Explain relational indexing, complex queries (streak date arithmetic), and ACID transaction guarantees compared to AsyncStorage key-value strings.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 13. UI/UX & PRODUCT DESIGN ====================
  {
    id: 'proj-uiux-fintech-app',
    slug: 'fintech-investment-case-study',
    title: 'Fintech Micro-Investment App: UX Research & Design System Case Study',
    summary: 'A complete product design case study from user research and journey mapping to interactive Figma prototypes and a 50+ token design system.',
    trackSlug: 'ui-ux',
    projectType: 'Design System & Case Study',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    techStack: ['Figma', 'FigJam', 'User Research', 'Design Systems', 'Interactive Prototyping', 'Usability Testing'],
    objective: 'Design a simplified micro-investing mobile experience for first-time college investors, solving complex financial onboarding friction.',
    problemStatement: '70% of college students want to invest but drop off during onboarding due to complex financial jargon, non-intuitive KYC forms, and confusing navigation.',
    expectedOutcome: 'A complete Behance/portfolio-ready UX case study with user persona interviews, low-fidelity wireframes, high-fidelity prototypes, and design specs.',
    prerequisites: ['Figma fundamentals', 'Basic understanding of user research methodologies'],
    systemArchitectureOverview: 'Design system built on atomic design principles: Design Tokens (Colors, Typography, Elevation) -> Atoms (Buttons, Inputs) -> Molecules (Cards) -> Organisms (Investment Flow Screens).',
    keyFeatures: [
      'Comprehensive user research synthesizing 12 student interviews into empathy maps and personas',
      'Low-fidelity wireframe flows testing simplified 3-step KYC verification',
      'High-fidelity interactive Figma prototype with animated micro-interactions and smart animations',
      'Design token system with light and dark mode variants and accessibility contrast compliance'
    ],
    userStories: [
      {
        title: 'Seamless Micro-Investment',
        description: 'As a college student with limited savings, I want to invest spare pocket change with 2 taps and see my projected portfolio growth.',
        acceptanceCriteria: ['Investment flow completes in < 30 seconds', 'Visual slider shows projected returns dynamically']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Research & User Journeys',
        tasks: ['Conduct user interviews and synthesize insights into personas', 'Map user journey and identify key drop-off pain points'],
        deliverable: 'UX Research synthesis in FigJam'
      },
      {
        stepNumber: 2,
        title: 'Wireframing & Usability Testing',
        tasks: ['Draw low-fidelity wireframe flows', 'Conduct usability test with 5 users to validate simplified onboarding'],
        deliverable: 'Validated wireframe user flows'
      },
      {
        stepNumber: 3,
        title: 'Design System & Interactive Prototype',
        tasks: ['Build component library with auto layout and variants in Figma', 'Link screens into high-fidelity animated prototype'],
        deliverable: 'Complete Figma design system and clickable prototype'
      }
    ],
    resumeBulletPoints: [
      'Executed end-to-end UX research case study for a fintech micro-investment app, reducing simulated KYC drop-off by 45%.',
      'Designed 50+ component design system in Figma featuring auto-layout, component variants, and WCAG AA contrast compliance.',
      'Conducted iterative usability tests across 12 target college users to refine portfolio projection interactions.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'How did your user research directly influence a specific screen or interaction in the final prototype?',
        keyDiscussionPoints: 'Share a concrete finding (e.g., users abandoned registration at document upload due to trust concerns; resolved by adding security badges and camera preview).'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 14. SOFTWARE TESTING & QA AUTOMATION ====================
  {
    id: 'proj-qa-e2e-framework',
    slug: 'playwright-enterprise-test-framework',
    title: 'Enterprise Test Automation Framework with Playwright & CI/CD',
    summary: 'A production test automation framework implementing Page Object Model (POM), parallel browser execution, visual regression testing, and automated GitHub Actions test reports.',
    trackSlug: 'software-testing-qa',
    projectType: 'Test Automation Framework',
    difficulty: 'Intermediate',
    estimatedHours: 25,
    techStack: ['Playwright', 'TypeScript', 'Page Object Model', 'GitHub Actions', 'Allure Reports', 'Docker'],
    objective: 'Build a scalable, robust automated test suite testing critical e-commerce flows (Auth, Cart, Checkout) with zero test flakiness and automated reporting.',
    problemStatement: 'Manual regression testing before weekly production releases takes hours and allows subtle UI and API defects to slip into production.',
    expectedOutcome: 'A modular Playwright TypeScript automation framework running 50+ automated end-to-end scenarios across Chromium, Firefox, and WebKit in under 3 minutes.',
    prerequisites: ['TypeScript basics', 'HTML DOM selectors', 'Testing principles'],
    systemArchitectureOverview: 'Page Object Model architecture decoupling UI selectors from test assertions; Playwright Test runner executing scenarios in parallel containers with automated video/trace captures on failure.',
    keyFeatures: [
      'Page Object Model (POM) design pattern isolating page selectors and user actions',
      'Cross-browser parallel execution across Chromium, Firefox, and WebKit',
      'Automated screenshot, video, and execution trace capture on test failure for rapid debugging',
      'GitHub Actions CI integration publishing HTML test reports to GitHub Pages on every pull request'
    ],
    userStories: [
      {
        title: 'Automated Checkout Regression Test',
        description: 'As a QA engineer, when code is pushed to main, an automated test should verify the complete checkout flow with dummy credit cards and assert order confirmation.',
        acceptanceCriteria: ['Test executes in headless mode in < 15 seconds', 'Fails if confirmation order ID is not generated']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Page Object Architecture',
        tasks: ['Initialize Playwright TypeScript project', 'Create Page Objects for Login, Products, Cart, and Checkout pages'],
        deliverable: 'Modular Page Object structure'
      },
      {
        stepNumber: 2,
        title: 'Test Suite Implementation',
        tasks: ['Author 25+ test scenarios covering positive and negative test cases', 'Implement custom assertions and data fixtures'],
        deliverable: 'Comprehensive automated test suite'
      },
      {
        stepNumber: 3,
        title: 'CI Integration & Reporting',
        tasks: ['Configure GitHub Actions workflow running tests on pull requests', 'Generate Allure / Playwright HTML reports'],
        deliverable: 'Continuous test automation pipeline'
      }
    ],
    resumeBulletPoints: [
      'Engineered scalable end-to-end test automation framework using Playwright and TypeScript with Page Object Model architecture.',
      'Reduced regression test cycle from 4 hours to 3 minutes through parallel cross-browser execution across Chromium, Firefox, and WebKit.',
      'Integrated automated CI testing in GitHub Actions, catching 15+ UI defects prior to production releases.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'How does Playwright solve test flakiness compared to older Selenium frameworks?',
        keyDiscussionPoints: 'Explain auto-waiting (waiting for elements to be visible, stable, and enabled before clicking), web-first assertions, and network request mocking.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 15. BLOCKCHAIN & WEB3 ENGINEERING ====================
  {
    id: 'proj-web3-defi-vault',
    slug: 'decentralized-escrow-smart-contract',
    title: 'Decentralized Escrow & Staking Protocol with Solidity & Hardhat',
    summary: 'A secure Ethereum smart contract protocol built with Solidity, Hardhat, OpenZeppelin security standards, comprehensive unit tests, and a Web3 frontend.',
    trackSlug: 'blockchain-web3',
    projectType: 'Smart Contract & dApp',
    difficulty: 'Advanced',
    estimatedHours: 30,
    techStack: ['Solidity', 'Hardhat', 'Ethereum (Sepolia)', 'OpenZeppelin', 'Ethers.js', 'React', 'TypeScript'],
    objective: 'Author, test, audit, and deploy a secure decentralized escrow smart contract enabling trustless peer-to-peer transactions without intermediaries.',
    problemStatement: 'Freelancers and clients risk payment fraud without trusted escrow intermediaries that charge high 10-20% platform fees.',
    expectedOutcome: 'A deployed, verified smart contract on Sepolia testnet with 100% unit test branch coverage, reentrancy protection, and a React dApp frontend.',
    prerequisites: ['Basic JavaScript / TypeScript', 'Understanding of Ethereum transactions and gas'],
    systemArchitectureOverview: 'Solidity smart contract inheriting OpenZeppelin ReentrancyGuard and Ownable, compiled with Hardhat, tested with Chai, and connected to React via Ethers.js and MetaMask.',
    keyFeatures: [
      'Multi-party state machine: Created -> Funded -> WorkSubmitted -> Completed / Disputed',
      'Reentrancy protection and Checks-Effects-Interactions pattern preventing drainage attacks',
      '100% Hardhat unit test coverage simulating happy paths, cancellations, and dispute resolutions',
      'React dApp interface connecting to MetaMask wallet and querying live contract events'
    ],
    userStories: [
      {
        title: 'Trustless Escrow Deposit',
        description: 'As a buyer, I want to deposit ETH into the smart contract so that funds are locked safely until the seller delivers the agreed work.',
        acceptanceCriteria: ['Contract emits DepositReceived event', 'Funds cannot be withdrawn by either party without mutual agreement']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Smart Contract Authoring',
        tasks: ['Write Escrow.sol contract with state variables and modifiers', 'Incorporate OpenZeppelin security contracts'],
        deliverable: 'Compiled Solidity contract'
      },
      {
        stepNumber: 2,
        title: 'Unit Testing & Gas Optimization',
        tasks: ['Author 20+ Hardhat test cases verifying balances and revert conditions', 'Run hardhat-gas-reporter to optimize execution costs'],
        deliverable: '100% passed unit test suite'
      },
      {
        stepNumber: 3,
        title: 'Testnet Deployment & dApp UI',
        tasks: ['Deploy contract to Sepolia testnet using Alchemy RPC', 'Connect React frontend with Ethers.js for wallet transactions'],
        deliverable: 'Live dApp running on Sepolia with verified contract on Etherscan'
      }
    ],
    resumeBulletPoints: [
      'Developed decentralized escrow smart contract protocol in Solidity using OpenZeppelin standards and Checks-Effects-Interactions patterns.',
      'Achieved 100% unit test coverage in Hardhat, simulating edge cases and preventing reentrancy vulnerabilities.',
      'Deployed contract to Sepolia Ethereum testnet and connected React dApp interface via Ethers.js for wallet transactions.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'Explain what a reentrancy attack is and how you prevent it in Solidity.',
        keyDiscussionPoints: 'Explain an external malicious contract calling back into the withdraw function before the state balance is updated to zero, and how ReentrancyGuard or updating state before transfer solves it.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 16. GAME DEVELOPMENT ====================
  {
    id: 'proj-game-2d-platformer',
    slug: '2d-action-platformer-unity',
    title: 'Physics-Based 2D Action Platformer in Unity & C#',
    summary: 'A complete 2D action game featuring tight platformer physics, state-machine character controller, enemy AI with pathfinding, particle effects, and audio manager.',
    trackSlug: 'game-dev',
    projectType: '2D/3D Game Prototype',
    difficulty: 'Intermediate',
    estimatedHours: 30,
    techStack: ['Unity 2022/2023', 'C#', '2D Physics (Rigidbody2D)', 'Unity Tilemap', 'Animator State Machine'],
    objective: 'Build a playable 2D game with responsive jump curves, coyote time, wall-sliding, enemy combat AI, and complete game loop state management.',
    problemStatement: 'Inexperienced game developers create floaty, imprecise movement controls and rigid enemy scripts that make games feel unresponsive.',
    expectedOutcome: 'A complete multi-level playable game build exported for WebGL and Windows with score tracking, sound effects, and animated character mechanics.',
    prerequisites: ['C# programming basics', 'Coordinate geometry & vectors'],
    systemArchitectureOverview: 'Component-based Unity architecture with separate PlayerController, HealthSystem, EnemyAI (state machine), and GameManager singleton controlling UI and level transitions.',
    keyFeatures: [
      'Kinematic/dynamic character controller with custom gravity multipliers, coyote time, and jump buffering',
      'Tilemap level design with collision layers, hazards, and collectible items',
      'Finite State Machine (FSM) enemy AI switching between Patrol, Chase, and Attack states',
      'Sound Manager singleton handling background music and dynamic spatial audio sound effects'
    ],
    userStories: [
      {
        title: 'Responsive Platformer Jumping',
        description: 'As a player, when I press jump a few frames before touching the ground, the jump should still execute reliably (jump buffering).',
        acceptanceCriteria: ['Jump buffer window of 0.15s registers successfully', 'Variable jump height based on button hold duration']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Player Controller & Physics',
        tasks: ['Build C# player movement script with Rigidbody2D', 'Tune jump curves, wall sliding, and particle landing effects'],
        deliverable: 'Responsive player movement demo'
      },
      {
        stepNumber: 2,
        title: 'Level Design & Collectibles',
        tasks: ['Design 2 levels using Unity Tilemap palette', 'Add coin pickups, hazards, and camera follow script with Cinemachine'],
        deliverable: 'Interactive game levels'
      },
      {
        stepNumber: 3,
        title: 'Enemy AI, Combat & WebGL Export',
        tasks: ['Implement enemy patrol and line-of-sight chase AI', 'Export playable build to WebGL and desktop executable'],
        deliverable: 'Playable WebGL game build'
      }
    ],
    resumeBulletPoints: [
      'Developed 2D action platformer in Unity and C# featuring custom physics tuning with coyote time and jump buffering.',
      'Constructed modular Finite State Machine (FSM) architecture for enemy patrol and combat behaviors.',
      'Optimized 2D sprite atlases and tilemap rendering, achieving stable 60 FPS performance on WebGL exports.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why do you calculate character movement inside FixedUpdate instead of standard Update in Unity?',
        keyDiscussionPoints: 'Explain that Update runs per frame (variable delta time) while FixedUpdate runs at fixed physics time steps (0.02s), preventing physics clipping and inconsistent jump heights.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 17. COMPUTER NETWORKING & SYSTEMS ====================
  {
    id: 'proj-net-enterprise-topo',
    slug: 'enterprise-network-simulation-cisco',
    title: 'Enterprise Multi-VLAN Network Topology & Security Hardening',
    summary: 'A simulated enterprise campus network designed in Cisco Packet Tracer featuring VLAN segmentation, OSPF dynamic routing, DHCP snooping, and NAT translation.',
    trackSlug: 'networking-systems',
    projectType: 'Enterprise Network Architecture',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    techStack: ['Cisco IOS', 'Packet Tracer / GNS3', 'OSPF', 'VLANs', 'Access Control Lists (ACLs)', 'DHCP'],
    objective: 'Design and configure a secure corporate network separating Engineering, HR, and Guest traffic with dynamic routing and firewall access lists.',
    problemStatement: 'Flat unsegmented networks suffer from broadcast storms, unauthorized lateral movement by attackers, and inefficient bandwidth usage.',
    expectedOutcome: 'A complete Cisco topology configuration file with Inter-VLAN routing, OSPF backbone, NAT overload for internet access, and hardened switch ports.',
    prerequisites: ['IP addressing and subnetting', 'OSI model understanding'],
    systemArchitectureOverview: 'Three-tier hierarchical network design: Core Layer (OSPF routing), Distribution Layer (Layer 3 switches with SVIs), and Access Layer (Layer 2 switches with port security and VLANs).',
    keyFeatures: [
      'VLAN segmentation separating Executive, Engineering, HR, and Guest network segments',
      'OSPF single-area dynamic routing exchanging subnet updates with 2-second convergence',
      'Port Security and DHCP Snooping mitigating rogue DHCP server attacks and MAC address spoofing',
      'Standard and Extended Access Control Lists (ACLs) preventing unauthorized inter-departmental communication'
    ],
    userStories: [
      {
        title: 'Guest Network Isolation',
        description: 'As a network administrator, guest Wi-Fi clients should have outbound internet access via NAT but zero access to internal corporate subnets.',
        acceptanceCriteria: ['Guest ping to corporate database subnets times out', 'Internet outbound traffic translates via NAT overload']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Subnetting & VLAN Configuration',
        tasks: ['Calculate VLSM IP subnets for 4 corporate departments', 'Configure VLANs, trunk ports (802.1Q), and Switch Virtual Interfaces (SVIs)'],
        deliverable: 'Configured switch VLANs and trunk links'
      },
      {
        stepNumber: 2,
        title: 'Routing & NAT Setup',
        tasks: ['Configure OSPF routing process across core routers', 'Implement NAT Overload (PAT) on border edge router'],
        deliverable: 'Operational multi-subnet routing'
      },
      {
        stepNumber: 3,
        title: 'Security Hardening & Testing',
        tasks: ['Apply Extended ACLs and Port Security', 'Test packet flows and verify isolation with traceroute and ping tests'],
        deliverable: 'Hardened corporate network topology configuration'
      }
    ],
    resumeBulletPoints: [
      'Designed simulated enterprise network topology across 4 isolated VLANs using Cisco IOS and OSPF dynamic routing.',
      'Configured Port Security, DHCP Snooping, and Extended ACLs, blocking unauthorized inter-departmental lateral movement.',
      'Implemented Network Address Translation (NAT/PAT) enabling 200+ internal hosts to share single public IPv4 exit IP.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'What is the purpose of a trunk port and 802.1Q encapsulation in a multi-VLAN switch network?',
        keyDiscussionPoints: 'Explain carrying traffic for multiple VLANs across a single physical cable by inserting an 802.1Q 4-byte tag into the Ethernet frame header containing the VLAN ID.'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: false
  },

  // ==================== 18. SYSTEMS & LOW-LEVEL C++ ENGINEERING ====================
  {
    id: 'proj-cpp-memory-allocator',
    slug: 'custom-memory-allocator-cpp',
    title: 'High-Performance Custom Memory Allocator in Modern C++20',
    summary: 'A custom memory management library in C++20 featuring Free-List, Pool, and Stack allocators to eliminate heap fragmentation and accelerate runtime allocations.',
    trackSlug: 'systems-cpp',
    projectType: 'High-Performance Systems Tool',
    difficulty: 'Capstone',
    estimatedHours: 35,
    techStack: ['C++20', 'Pointers / Memory Alignment', 'RAII', 'Google Benchmark', 'Valgrind / ASan', 'CMake'],
    objective: 'Implement custom memory allocators replacing default malloc/free for high-frequency low-latency systems (game engines, trading algorithms).',
    problemStatement: 'Standard system malloc has unpredictable latency due to kernel syscalls and memory fragmentation under high allocation/deallocation frequencies.',
    expectedOutcome: 'A modular C++20 memory library demonstrating 4x to 8x speedup over standard malloc, with zero memory leaks verified via AddressSanitizer.',
    prerequisites: ['Pointers and pointer arithmetic', 'Memory alignment principles', 'C++ templates and RAII'],
    systemArchitectureOverview: 'Pre-allocated contiguous memory blocks managed via Stack Allocator (LIFO), Pool Allocator (fixed-size chunks), and Free-List Allocator (linked list of variable-size chunks) with proper byte alignment padding.',
    keyFeatures: [
      'Stack Allocator providing O(1) allocation and bulk deallocation for frame-based operations',
      'Pool Allocator with singly linked free list providing O(1) allocation for uniform objects',
      'Free-List Allocator with first-fit and best-fit strategies for variable-sized payloads',
      'Google Benchmark suite measuring throughput and latency comparison against standard malloc'
    ],
    userStories: [
      {
        title: 'Zero Fragmentation Chunk Allocation',
        description: 'As an embedded systems engineer, I need to allocate and free 1,000,000 fixed-size particle objects per second without heap fragmentation.',
        acceptanceCriteria: ['Pool Allocator allocates in O(1) time (< 5ns)', 'AddressSanitizer reports 0 byte leaks']
      }
    ],
    milestones: [
      {
        stepNumber: 1,
        title: 'Memory Alignment & Base Allocator',
        tasks: ['Implement pointer alignment helper functions', 'Define abstract Allocator base class with memory tracking counters'],
        deliverable: 'Core allocator primitives and unit tests'
      },
      {
        stepNumber: 2,
        title: 'Stack & Pool Allocators',
        tasks: ['Build Stack Allocator with marker rollback', 'Build Pool Allocator with pointer-based free list'],
        deliverable: 'Validated Stack and Pool allocators'
      },
      {
        stepNumber: 3,
        title: 'Benchmarking & Sanitizer Testing',
        tasks: ['Run Valgrind and AddressSanitizer leak checks', 'Write Google Benchmark comparing allocators against malloc'],
        deliverable: 'Benchmark performance report and library package'
      }
    ],
    resumeBulletPoints: [
      'Authored high-performance custom memory allocators (Stack, Pool, Free-List) in Modern C++20, achieving 6x speedup over malloc.',
      'Enforced strict hardware memory alignment and pointer arithmetic, eliminating memory fragmentation for low-latency systems.',
      'Validated memory safety and zero leaks across 10 million test allocations using AddressSanitizer and Google Benchmark.'
    ],
    interviewDefenseQuestions: [
      {
        question: 'Why does memory alignment matter on modern CPUs and how do you calculate padding?',
        keyDiscussionPoints: 'Explain CPU word boundaries (e.g. 8-byte alignment for 64-bit architectures), unaligned access penalties or crashes, and padding calculation using bitwise arithmetic ((address + alignment - 1) & ~(alignment - 1)).'
      }
    ],
    githubStarterUrl: 'https://github.com/shobhit-736d/SeekhSetu',
    isFeatured: true
  }
];

export const getGuidedProjectsByTrack = (trackSlug: string): GuidedProject[] => {
  if (!trackSlug || trackSlug === 'all') return guidedProjectsList;
  return guidedProjectsList.filter(p => p.trackSlug.toLowerCase() === trackSlug.toLowerCase());
};

export const getProjectTypes = (): string[] => [
  'All Types',
  'Full-Stack Web',
  'Frontend SPA',
  'Microservice API',
  'Enterprise Java System',
  'Python Async API',
  'AI & Deep Learning System',
  'Data Science & ML Pipeline',
  'Business Intelligence Dashboard',
  'Cloud Infrastructure & IaC',
  'DevOps & GitOps Pipeline',
  'Cybersecurity SOC & PenTest',
  'Mobile Application',
  'Design System & Case Study',
  'Test Automation Framework',
  'Smart Contract & dApp',
  '2D/3D Game Prototype',
  'Enterprise Network Architecture',
  'High-Performance Systems Tool'
];
