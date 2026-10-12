import { StudyDay } from '../../types/roadmap';

export const backendDays: StudyDay[] = [
  {
    dayNumber: 12,
    title: "Node.js Architecture, Libuv & Streams Deep Dive",
    module: "node",
    moduleName: "Node.js & Express.js Backend Architecture",
    primaryObjective: "Master Node.js runtime internals, V8 + Libuv event loop phases, thread pool sizing, Buffer memory allocation, and streaming backpressure.",
    estimatedMinutes: 150,
    isSevenDayTrack: true,
    checklist: [
      "Diagram Node architecture: V8, Libuv, C++ bindings, and OS kernel",
      "Trace Libuv event loop phases: Timers, Pending I/O, Idle/Prepare, Poll, Check, Close",
      "Configure UV_THREADPOOL_SIZE for crypto and fs operations",
      "Understand why process.nextTick() takes precedence over Promise microtasks in Node",
      "Pipe readable streams to writable streams with backpressure handling"
    ],
    topics: [
      {
        id: "day12-topic1",
        title: "Libuv Event Loop Phases & process.nextTick",
        durationMinutes: 45,
        summary: "Understanding the 6 phases of the Libuv event loop and Node.js-specific tick queues.",
        definitions: [
          {
            term: "Libuv",
            explanation: "Multi-platform C library providing support for asynchronous I/O based on event loops and a thread pool (default 4 threads)."
          },
          {
            term: "process.nextTick()",
            explanation: "Microtask queue processed immediately after current operation completes, before the Libuv event loop continues."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Node.js Event Loop Priority Sequence",
            code: `console.log("1 - Sync start");

setTimeout(() => console.log("2 - Timers phase (setTimeout)"), 0);

setImmediate(() => console.log("3 - Check phase (setImmediate)"));

process.nextTick(() => console.log("4 - process.nextTick (Tick Queue)"));

Promise.resolve().then(() => console.log("5 - Promise (Microtask)"));

console.log("6 - Sync end");`,
            output: "1 - Sync start\n6 - Sync end\n4 - process.nextTick\n5 - Promise\n2 - Timers phase (or 3 depending on I/O cycle)"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d12-1",
            question: "What is the difference between process.nextTick() and setImmediate()?",
            answer: "process.nextTick fires immediately after the current operation finishes on the call stack, even before promises and before any event loop phase transitions. setImmediate fires in the Check phase of the Libuv event loop on the subsequent turn. Overusing nextTick can starve the event loop I/O.",
            keyPoints: ["nextTick fires before event loop phase advance", "setImmediate fires during Check phase", "nextTick can starve I/O if called recursively"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d12-1",
            question: "What is the default size of the Libuv thread pool in Node.js?",
            options: ["1", "4", "8", "Unlimited"],
            correctAnswer: 1,
            explanation: "The default UV_THREADPOOL_SIZE is 4 threads, which handles file system calls, dns.lookup, and crypto tasks."
          }
        ]
      },
      {
        id: "day12-topic2",
        title: "Node.js Streams, Buffers & Backpressure",
        durationMinutes: 40,
        summary: "Processing massive files (GBs) with minimal RAM footprints using readable, writable, transform streams.",
        definitions: [
          {
            term: "Backpressure",
            explanation: "Mechanism where a writable stream signals a readable stream to pause reading when its internal buffer (highWaterMark) is full."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Streaming File Transformation with pipeline",
            code: `import fs from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';

async function compressLogFile(sourcePath, destPath) {
  try {
    await pipeline(
      fs.createReadStream(sourcePath),
      zlib.createGzip(),
      fs.createWriteStream(destPath)
    );
    console.log("File successfully compressed with backpressure managed!");
  } catch (err) {
    console.error("Pipeline failed:", err);
  }
}`,
            output: "Streams handled safely without running out of memory"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d12-2",
            question: "Why should you prefer stream.pipeline() over stream.pipe()?",
            answer: "pipe() does not properly clean up streams or close file descriptors if one stream in the chain errors out, leading to memory and descriptor leaks. pipeline() properly destroys and cleans up all streams if any stream fails or finishes.",
            keyPoints: ["pipeline handles errors automatically", "destroys all streams on failure", "supports Promise/async await"],
            difficulty: "Associate",
            frequency: "Core Standard"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d12-2",
            question: "What is the default highWaterMark buffer size for a Node.js byte stream?",
            options: ["16 KB", "64 KB", "1 MB", "512 KB"],
            correctAnswer: 1,
            explanation: "For regular streams, highWaterMark defaults to 64 KB (16 items for objectMode streams)."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d12-1",
        question: "Is Node.js completely single-threaded?",
        options: [
          "Yes, it only ever runs one OS thread",
          "No, JS execution is single-threaded, but Libuv utilizes a background thread pool for blocking tasks like fs and crypto",
          "No, each request creates a new OS thread",
          "Yes, unless WebAssembly is imported"
        ],
        correctAnswer: 1,
        explanation: "The V8 JavaScript runtime executes on a single event loop thread, while Libuv manages background C++ worker threads."
      }
    ]
  },
  {
    dayNumber: 13,
    title: "Express.js Architecture, Middleware Chain & Error Handling",
    module: "node",
    moduleName: "Node.js & Express.js Backend Architecture",
    primaryObjective: "Master Express request/response pipeline, custom middleware composition, error middleware signatures (4 parameters), CORS, and security headers with Helmet.",
    estimatedMinutes: 135,
    isSevenDayTrack: false,
    checklist: [
      "Diagram the Express middleware chain and next() control transfer",
      "Write a global error handling middleware with 4 arguments (err, req, res, next)",
      "Configure CORS policies for credentials, allowed origins, and pre-flight OPTIONS",
      "Secure HTTP headers using Helmet middleware against clickjacking and MIME sniffing",
      "Understand why calling res.json() without return can trigger 'Headers already sent' error"
    ],
    topics: [
      {
        id: "day13-topic1",
        title: "Middleware Pipeline & Centralized Error Middleware",
        durationMinutes: 45,
        summary: "How Express executes functions sequentially and routes unhandled exceptions to error-handling middleware.",
        definitions: [
          {
            term: "Error Middleware",
            explanation: "A middleware function defined with exactly 4 parameters: (err, req, res, next). Express inspects fn.length to recognize it."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Production Error Handling Middleware Pattern",
            code: `import express from 'express';

const app = express();
app.use(express.json());

// Custom AppError class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Route example
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await findUser(req.params.id);
    if (!user) throw new AppError("User not found", 404);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err); // Forward to global error handler
  }
});

// Centralized Error Handling Middleware (4 arguments!)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal Server Error";
  
  console.error(\`[\${req.method} \${req.url}] Error:\`, err);
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});`,
            output: "Centralized clean API error responses"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d13-1",
            question: "Why does Express error middleware require exactly 4 parameters?",
            answer: "Express uses JavaScript's Function.length property to inspect the number of parameters a middleware accepts. If a middleware has 4 arguments (err, req, res, next), Express registers it specifically as an error handler and skips calling it during normal request routing until next(err) is invoked.",
            keyPoints: ["fn.length must equal 4", "Skipped during normal routing", "Triggered when next(err) is called"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d13-1",
            question: "What causes the 'ERR_HTTP_HEADERS_SENT' error in Express?",
            options: [
              "Missing Content-Type header",
              "Attempting to send a response after headers were already committed to the client",
              "Database connection closed",
              "CORS policy violation"
            ],
            correctAnswer: 1,
            explanation: "Sending headers twice happens when execution continues after a res.json() call without an early return."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d13-1",
        question: "What does calling next() without arguments inside a middleware do?",
        options: [
          "Terminates the request immediately",
          "Passes control to the next middleware function in the stack",
          "Triggers the error handling middleware",
          "Restarts the application"
        ],
        correctAnswer: 1,
        explanation: "Calling next() passes control to the next matching middleware in the application stack."
      }
    ]
  },
  {
    dayNumber: 14,
    title: "REST API Design, Schema Validation & Rate Limiting",
    module: "node",
    moduleName: "Node.js & Express.js Backend Architecture",
    primaryObjective: "Master REST architectural principles, HTTP status codes, schema validation with Zod/Joi, rate limiting algorithms (token bucket/sliding window), and file upload security.",
    estimatedMinutes: 130,
    isSevenDayTrack: false,
    checklist: [
      "Map HTTP methods (GET, POST, PUT, PATCH, DELETE) to idempotent vs non-idempotent operations",
      "Apply semantic HTTP status codes (200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500)",
      "Build validation middleware using Zod to sanitize request params, body, and query",
      "Implement sliding window rate limiting using express-rate-limit and Redis",
      "Secure multipart file uploads with Multer checking MIME types and magic bytes"
    ],
    topics: [
      {
        id: "day14-topic1",
        title: "REST Principles & Schema Validation with Zod",
        durationMinutes: 40,
        summary: "Clean API structure, idempotency rules, and validating user inputs at the gateway.",
        definitions: [
          {
            term: "Idempotent Method",
            explanation: "An HTTP method where multiple identical requests produce the same side-effect on the server as a single request (GET, PUT, DELETE, HEAD)."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Validation Middleware with Zod Schema",
            code: `import { z } from 'zod';

const userSignupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    age: z.number().int().min(18).optional()
  })
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (error) {
    res.status(400).json({ success: false, errors: error.errors });
  }
};`,
            output: "Strict schema boundary preventing bad database writes"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d14-1",
            question: "What is the difference between PUT and PATCH in REST APIs?",
            answer: "PUT is designed for full resource replacement and is idempotent (re-sending the exact same PUT produces the exact same resource state). PATCH is designed for partial updates and is not strictly required to be idempotent.",
            keyPoints: ["PUT replaces entire resource", "PATCH updates specific fields", "PUT is idempotent; PATCH may not be"],
            difficulty: "Junior",
            frequency: "Must Know"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d14-1",
            question: "Which HTTP status code should be returned when a request is well-formed but violates business validation rules?",
            options: ["400 Bad Request", "422 Unprocessable Entity", "500 Internal Error", "404 Not Found"],
            correctAnswer: 1,
            explanation: "422 Unprocessable Entity is semantic for requests that are syntactically valid JSON but fail logical schema validation."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d14-1",
        question: "Which HTTP status code indicates a Rate Limit has been exceeded?",
        options: ["403", "429 Too Many Requests", "503", "408"],
        correctAnswer: 1,
        explanation: "429 Too Many Requests is the standard HTTP code for rate limiting."
      }
    ]
  },
  {
    dayNumber: 15,
    title: "Authentication, JWT, Cookies & Security Best Practices",
    module: "node",
    moduleName: "Node.js & Express.js Backend Architecture",
    primaryObjective: "Master password hashing with bcrypt, JWT token architecture (access vs refresh tokens), HttpOnly cookies, CSRF protection, and SQL/NoSQL injection defense.",
    estimatedMinutes: 145,
    isSevenDayTrack: false,
    checklist: [
      "Hash passwords with bcrypt and understand salt rounds cost factor",
      "Sign and verify JWT tokens containing payload, header, and cryptographic signature",
      "Implement refresh token rotation with secure HttpOnly and SameSite cookie attributes",
      "Defend against Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)",
      "Sanitize inputs to prevent SQL and NoSQL query injection attacks"
    ],
    topics: [
      {
        id: "day15-topic1",
        title: "JWT Architecture & HttpOnly Cookie Security",
        durationMinutes: 45,
        summary: "Stateless authentication patterns, storing tokens safely, and token rotation.",
        definitions: [
          {
            term: "JWT Structure",
            explanation: "Three base64url encoded parts separated by dots: Header (algorithm), Payload (claims), Signature (crypto hash)."
          },
          {
            term: "HttpOnly Cookie",
            explanation: "Cookie attribute that prevents client-side JavaScript (document.cookie) from reading the token, preventing XSS token theft."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Verifying JWT and Setting HttpOnly Cookie",
            code: `import jwt from 'jsonwebtoken';

// 1. Sign access token (short lived) & refresh token (long lived)
const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

// 2. Set refresh token in HttpOnly cookie
res.cookie('refreshToken', refreshToken, {
  httpOnly: true, // Inaccessible to JavaScript XSS
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

res.json({ success: true, accessToken });`,
            output: "Hardened authentication token distribution"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d15-1",
            question: "Why shouldn't you store JWT access tokens in localStorage?",
            answer: "Any script running on the page—including compromised third-party dependencies, CDNs, or XSS vulnerabilities—can access localStorage and exfiltrate the JWT. Storing tokens in an HttpOnly, Secure, SameSite cookie blocks client JavaScript from accessing it.",
            keyPoints: ["localStorage is vulnerable to XSS exfiltration", "HttpOnly cookies cannot be read by JS", "Combine SameSite cookie with CSRF token"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d15-1",
            question: "Is data stored inside a standard JWT payload encrypted?",
            options: [
              "Yes, it is encrypted with AES-256",
              "No, it is only Base64Url encoded and can be decoded by anyone; only the signature is hashed",
              "Yes, only the server key can read it",
              "It is hashed with SHA-256"
            ],
            correctAnswer: 1,
            explanation: "A standard JWT is digitally signed, not encrypted. Anyone can decode and inspect the payload; therefore, never store passwords or secrets in it."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d15-1",
        question: "What does the SameSite=Strict cookie attribute provide?",
        options: [
          "Prevents cookie transmission on all cross-site requests, mitigating CSRF",
          "Encrypts cookie data",
          "Expires cookie immediately",
          "Only sends cookie to subdomains"
        ],
        correctAnswer: 0,
        explanation: "SameSite=Strict ensures cookies are never sent in cross-site requests, defending effectively against CSRF."
      }
    ]
  },
  {
    dayNumber: 16,
    title: "Asynchronous Workflows, Background Queues & Logging",
    module: "node",
    moduleName: "Node.js & Express.js Backend Architecture",
    primaryObjective: "Master background job queues (BullMQ/Redis), email workflows, structured logging with Winston, and building Kubernetes-ready health checks.",
    estimatedMinutes: 130,
    isSevenDayTrack: false,
    checklist: [
      "Decouple heavy tasks (PDF generation, emails) using Redis message queues",
      "Configure Winston structured logging with log levels (error, warn, info, debug)",
      "Implement liveness (/healthz) and readiness (/ready) probe endpoints",
      "Gracefully terminate Node.js process on SIGTERM / SIGINT signals",
      "Manage job retries with exponential backoff strategies"
    ],
    topics: [
      {
        id: "day16-topic1",
        title: "Graceful Shutdown & Structured Logging",
        durationMinutes: 40,
        summary: "Handling server deployments without dropping in-flight HTTP connections or corrupting database transactions.",
        definitions: [
          {
            term: "Graceful Shutdown",
            explanation: "Intercepting OS termination signals, stopping new connections, completing active requests, closing database pools, and exiting cleanly."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Graceful Shutdown Pattern in Express",
            code: `const server = app.listen(PORT, () => console.log(\`Server on \${PORT}\`));

async function shutdown(signal) {
  console.log(\`Received \${signal}. Closing HTTP server gracefully...\`);
  server.close(async () => {
    console.log("HTTP server closed. Terminating database connections...");
    await dbPool.end();
    console.log("Database connections drained. Exiting process.");
    process.exit(0);
  });

  // Force shutdown if cleanup hangs
  setTimeout(() => {
    console.error("Forced termination after timeout.");
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));`,
            output: "Zero downtime deployment compatible"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d16-1",
            question: "What is the difference between a Liveness probe and a Readiness probe in production deployments?",
            answer: "A Liveness probe checks if the Node.js process is alive. If it fails, the orchestrator restarts the container. A Readiness probe checks if the service is ready to accept incoming traffic (e.g. database connected, cache warm). If it fails, traffic is routed elsewhere without restarting the container.",
            keyPoints: ["Liveness: is container alive or locked?", "Readiness: can container accept traffic?", "Readiness checks DB and cache dependencies"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d16-1",
            question: "Why should you use background queues (like BullMQ/Redis) instead of executing heavy tasks directly in an Express request handler?",
            options: [
              "Because Express disallows async functions",
              "Heavy CPU/network tasks block the event loop or prolong HTTP response times, risking timeouts and poor user experience",
              "Redis is cheaper than RAM",
              "Node cannot send emails directly"
            ],
            correctAnswer: 1,
            explanation: "Offloading heavy tasks to a background worker keeps API response times fast and isolates failures with automatic retry mechanics."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d16-1",
        question: "Which signal is sent by modern container orchestrators (like Docker / Kubernetes) to request a graceful shutdown?",
        options: ["SIGKILL", "SIGTERM", "SIGSTOP", "SIGHUP"],
        correctAnswer: 1,
        explanation: "SIGTERM asks the process to terminate gracefully. If it doesn't shut down within a grace period, SIGKILL is issued."
      }
    ]
  }
];
