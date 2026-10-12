import { StudyDay } from '../../types/roadmap';

export const sqlDays: StudyDay[] = [
  {
    dayNumber: 17,
    title: "Relational Modeling, PostgreSQL & ACID Principles",
    module: "sql",
    moduleName: "SQL & PostgreSQL Database Engineering",
    primaryObjective: "Master relational schema design, normalization (1NF, 2NF, 3NF), PostgreSQL data types, foreign keys with cascade constraints, and ACID properties.",
    estimatedMinutes: 140,
    isSevenDayTrack: true,
    checklist: [
      "Define ACID properties: Atomicity, Consistency, Isolation, Durability",
      "Normalize database schemas up to Third Normal Form (3NF)",
      "Select appropriate PostgreSQL data types (UUID, JSONB, TIMESTAMP WITH TIME ZONE)",
      "Design foreign key relationships with ON DELETE CASCADE and RESTRICT",
      "Enforce data integrity with CHECK and UNIQUE constraints"
    ],
    topics: [
      {
        id: "day17-topic1",
        title: "ACID Properties & Relational Normalization",
        durationMinutes: 45,
        summary: "The theoretical and practical foundations of relational database integrity.",
        definitions: [
          {
            term: "Atomicity",
            explanation: "All operations in a transaction succeed completely or are rolled back entirely ('all or nothing')."
          },
          {
            term: "Durability",
            explanation: "Once committed, transactions are permanently recorded in non-volatile storage using Write-Ahead Logging (WAL)."
          },
          {
            term: "3NF (Third Normal Form)",
            explanation: "Table is in 2NF and contains no transitive dependencies (every non-key attribute depends only on the primary key)."
          }
        ],
        codeExamples: [
          {
            language: "sql",
            title: "PostgreSQL DDL with Constraints",
            code: `CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);`,
            output: "Strict schema integrity enforced by DB engine"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d17-1",
            question: "What is Write-Ahead Logging (WAL) in PostgreSQL and which ACID property does it guarantee?",
            answer: "WAL ensures Durability. Before changes are written to actual data tables, the transaction log is sequentially flushed to disk. If the server crashes or loses power, PostgreSQL replays the WAL on restart to restore consistent state.",
            keyPoints: ["Guarantees Durability in ACID", "Sequential disk writes before data file updates", "Enables crash recovery and replication"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d17-1",
            question: "Why should monetary values be stored as NUMERIC / DECIMAL rather than FLOAT in PostgreSQL?",
            options: [
              "Float uses less storage",
              "Float introduces binary floating-point rounding errors (e.g. 0.1 + 0.2 != 0.3), whereas NUMERIC is exact precision",
              "Float is not supported in SQL",
              "Float cannot be indexed"
            ],
            correctAnswer: 1,
            explanation: "Floating point types use IEEE-754 binary approximation leading to precision errors. NUMERIC stores exact base-10 decimals."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d17-1",
        question: "What does 'ON DELETE RESTRICT' on a foreign key do?",
        options: [
          "Deletes all associated child rows automatically",
          "Prevents deletion of parent row if referencing child rows exist",
          "Sets child foreign keys to NULL",
          "Archives parent row into a backup table"
        ],
        correctAnswer: 1,
        explanation: "RESTRICT throws a foreign key constraint violation error if an attempt is made to delete a referenced parent record."
      }
    ]
  },
  {
    dayNumber: 18,
    title: "Advanced SQL: Joins, Aggregations & Window Functions",
    module: "sql",
    moduleName: "SQL & PostgreSQL Database Engineering",
    primaryObjective: "Master SQL joins (Inner, Left, Right, Full, Cross), GROUP BY, HAVING, subqueries, Common Table Expressions (CTEs), and Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD).",
    estimatedMinutes: 145,
    isSevenDayTrack: false,
    checklist: [
      "Distinguish INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins with Venn diagrams",
      "Filter aggregate results using HAVING vs row filtering using WHERE",
      "Write Common Table Expressions (WITH cte AS ...) for readable complex queries",
      "Implement ranking queries using DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...)",
      "Calculate period-over-period growth with LAG() and LEAD() window functions"
    ],
    topics: [
      {
        id: "day18-topic1",
        title: "Window Functions: RANK, DENSE_RANK & LAG/LEAD",
        durationMinutes: 45,
        summary: "Performing calculations across sets of table rows related to current row without collapsing rows like GROUP BY.",
        definitions: [
          {
            term: "Window Function",
            explanation: "Computes a value for each row based on a partitioned subset (window) of rows while preserving individual row identity."
          },
          {
            term: "PARTITION BY vs GROUP BY",
            explanation: "GROUP BY collapses multiple rows into a single summary row. PARTITION BY maintains all original rows while calculating window aggregates."
          }
        ],
        codeExamples: [
          {
            language: "sql",
            title: "Top 3 Earners Per Department with DENSE_RANK",
            code: `WITH ranked_employees AS (
  SELECT 
    id,
    name,
    department_id,
    salary,
    DENSE_RANK() OVER (
      PARTITION BY department_id 
      ORDER BY salary DESC
    ) as rank_in_dept
  FROM employees
)
SELECT * 
FROM ranked_employees 
WHERE rank_in_dept <= 3;`,
            output: "Top 3 salaries per department including ties"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d18-1",
            question: "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?",
            answer: "ROW_NUMBER() assigns a unique sequential integer to every row (1, 2, 3, 4). RANK() assigns identical ranks to tied values and skips subsequent ranks (1, 2, 2, 4). DENSE_RANK() assigns identical ranks to tied values without skipping gaps (1, 2, 2, 3).",
            keyPoints: ["ROW_NUMBER: strictly sequential, no ties", "RANK: ties share rank, subsequent ranks skipped", "DENSE_RANK: ties share rank, no gaps"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d18-1",
            question: "Can you use window functions directly inside a WHERE clause?",
            options: [
              "Yes, anywhere in the query",
              "No, window functions are evaluated after the WHERE clause; wrap in a CTE or subquery first",
              "Only with ROW_NUMBER",
              "Only in PostgreSQL"
            ],
            correctAnswer: 1,
            explanation: "In SQL logical query processing, WHERE executes before Window functions. A CTE or subquery is required to filter by window results."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d18-1",
        question: "What is the key difference between WHERE and HAVING in SQL?",
        options: [
          "WHERE filters before aggregation; HAVING filters after GROUP BY aggregations",
          "WHERE is faster than HAVING for everything",
          "HAVING only works on primary keys",
          "There is no difference"
        ],
        correctAnswer: 0,
        explanation: "WHERE filters rows before they are grouped and aggregated; HAVING filters the groups generated by GROUP BY."
      }
    ]
  },
  {
    dayNumber: 19,
    title: "Database Indexing, Query Optimization & EXPLAIN ANALYZE",
    module: "sql",
    moduleName: "SQL & PostgreSQL Database Engineering",
    primaryObjective: "Master B-Tree indexing internals, composite indexes, column cardinality, reading EXPLAIN ANALYZE execution plans, and eliminating Seq Scans.",
    estimatedMinutes: 140,
    isSevenDayTrack: false,
    checklist: [
      "Understand B-Tree search complexity O(log n) and leaf page pointers",
      "Design composite indexes adhering to the Leftmost Prefix Rule",
      "Differentiate Sequential Scan (Seq Scan) vs Index Scan vs Index Only Scan",
      "Analyze query plans using EXPLAIN (ANALYZE, BUFFERS)",
      "Avoid index disabling antipatterns (functions on indexed columns, leading wildcards %term)"
    ],
    topics: [
      {
        id: "day19-topic1",
        title: "B-Tree Indexes & Execution Plan Analysis",
        durationMinutes: 45,
        summary: "How indexes speed up searches and how to inspect PostgreSQL query planner decisions.",
        definitions: [
          {
            term: "Sequential Scan",
            explanation: "Scanning every single block of the table from start to finish. Efficient for tiny tables; disastrous for millions of rows."
          },
          {
            term: "Index Only Scan",
            explanation: "All requested columns exist in the index itself, avoiding reading the heap table pages completely."
          }
        ],
        codeExamples: [
          {
            language: "sql",
            title: "Query Optimization with Composite Index",
            code: `-- BAD: Causes Seq Scan when searching by created_at with status
-- CREATE INDEX idx_users_created ON users(created_at);

-- GOOD: Composite index covering filter predicates (Leftmost prefix)
CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC);

-- Query plan analysis:
EXPLAIN ANALYZE
SELECT id, total_amount 
FROM orders 
WHERE status = 'completed' AND created_at >= '2026-01-01';`,
            output: "Index Scan using idx_orders_status_created: Execution time: 1.2ms (down from 450ms)"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d19-1",
            question: "Why doesn't the database use an index on a column when you write WHERE UPPER(email) = 'TEST@EXAMPLE.COM'?",
            answer: "The B-Tree index contains the raw un-transformed column values. Calling a function like UPPER(email) requires the database to evaluate the function for every row, triggering a Sequential Scan. To fix this, create an expression index: CREATE INDEX idx_upper_email ON users(UPPER(email)).",
            keyPoints: ["Functions on columns negate standard B-Tree index lookups", "Requires evaluating function on every row", "Solution: Expression index or query normalization"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d19-1",
            question: "Which query CANNOT utilize a standard B-Tree index on title?",
            options: [
              "WHERE title = 'React'",
              "WHERE title LIKE 'React%'",
              "WHERE title LIKE '%React'",
              "WHERE title >= 'A' AND title <= 'M'"
            ],
            correctAnswer: 2,
            explanation: "Leading wildcards '%...' prevent B-Tree alphabetical binary traversal, forcing a full sequential scan."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d19-1",
        question: "What is the primary drawback of having too many indexes on a database table?",
        options: [
          "Queries become slower",
          "Write operations (INSERT, UPDATE, DELETE) become significantly slower and consume more disk/RAM",
          "Foreign keys stop working",
          "PostgreSQL limits tables to 3 indexes"
        ],
        correctAnswer: 1,
        explanation: "Every write must update all related B-Tree indexes synchronously, adding substantial I/O overhead."
      }
    ]
  },
  {
    dayNumber: 20,
    title: "Transactions, Isolation Levels & Connection Pooling",
    module: "sql",
    moduleName: "SQL & PostgreSQL Database Engineering",
    primaryObjective: "Master transaction concurrency anomalies (Dirty Read, Non-repeatable Read, Phantom Read), 4 ANSI isolation levels, deadlocks, and connection pooling with pg-pool.",
    estimatedMinutes: 135,
    isSevenDayTrack: false,
    checklist: [
      "Compare 4 isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable",
      "Explain row-level locking (SELECT ... FOR UPDATE) to prevent race conditions",
      "Diagnose and resolve database deadlocks",
      "Configure connection pools to prevent PostgreSQL connection exhaustion",
      "Evaluate trade-offs between ORMs (Prisma, TypeORM) and Query Builders (Knex, Kysely)"
    ],
    topics: [
      {
        id: "day20-topic1",
        title: "Isolation Levels & Preventing Race Conditions",
        durationMinutes: 45,
        summary: "Balancing data consistency against concurrent transaction throughput.",
        definitions: [
          {
            term: "Dirty Read",
            explanation: "Transaction reads uncommitted data written by a concurrent uncommitted transaction (disallowed in PostgreSQL)."
          },
          {
            term: "Pessimistic Locking",
            explanation: "SELECT ... FOR UPDATE locks selected rows until current transaction commits, preventing concurrent modifications."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Atomic Balance Transfer with PostgreSQL Transaction",
            code: `import pg from 'pg';
const pool = new pg.Pool({ max: 20 }); // Connection pool

async function transferFunds(fromUserId, toUserId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    // Pessimistic lock on sender account
    const senderRes = await client.query(
      'SELECT balance FROM accounts WHERE user_id = $1 FOR UPDATE',
      [fromUserId]
    );

    if (senderRes.rows[0].balance < amount) {
      throw new Error("Insufficient funds");
    }

    await client.query('UPDATE accounts SET balance = balance - $1 WHERE user_id = $2', [amount, fromUserId]);
    await client.query('UPDATE accounts SET balance = balance + $1 WHERE user_id = $2', [amount, toUserId]);

    await client.query('COMMIT'); // Commit all updates atomically
    return { success: true };
  } catch (err) {
    await client.query('ROLLBACK'); // Rollback on any failure
    throw err;
  } finally {
    client.release(); // Return client to pool!
  }
}`,
            output: "Guaranteed race-condition-free money transfer"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d20-1",
            question: "What is the default transaction isolation level in PostgreSQL?",
            answer: "Read Committed. Each query inside a transaction sees only data committed before that individual query began (preventing dirty reads).",
            keyPoints: ["Default is Read Committed", "Prevents dirty reads", "Can experience non-repeatable reads if data changes between queries"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d20-1",
            question: "What happens if client.release() is omitted in a finally block after using a connection pool?",
            options: [
              "Nothing, JavaScript garbage collects it",
              "Connection leak: pool runs out of available clients and subsequent requests hang indefinitely",
              "Database shuts down",
              "Transactions auto-commit"
            ],
            correctAnswer: 1,
            explanation: "Omitting client.release() causes connection leaks where the pool's max limit is exhausted, causing the server to hang on new requests."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d20-1",
        question: "Which isolation level prevents all concurrency anomalies including Phantom Reads and Serialization Anomaly?",
        options: ["Read Committed", "Repeatable Read", "Serializable", "Read Uncommitted"],
        correctAnswer: 2,
        explanation: "Serializable is the strictest isolation level, guaranteeing that concurrent transactions produce the same result as executing them sequentially."
      }
    ]
  }
];
