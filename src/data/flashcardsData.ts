import { FlashcardItem } from '../types/roadmap';

export const allFlashcards: FlashcardItem[] = [
  // Day 1: JavaScript Fundamentals
  {
    id: 'fc-d1-1',
    dayNumber: 1,
    topicId: 'day1-topic1',
    category: 'JavaScript',
    front: 'What is the Temporal Dead Zone (TDZ) and when does it occur?',
    back: 'The TDZ is the period between entering a lexical scope and the actual line of declaration where `let` and `const` variables exist in an uninitialized state. Accessing them throws a ReferenceError.',
    codeSnippet: `console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;`,
    keyTakeaway: 'Variables declared with let and const are hoisted to the top of their block, but remain in the TDZ until initialized.'
  },
  {
    id: 'fc-d1-2',
    dayNumber: 1,
    topicId: 'day1-topic1',
    category: 'JavaScript',
    front: 'Does declaring an object with `const` make its properties immutable?',
    back: 'No. `const` creates an immutable identifier binding (the reference address cannot be reassigned). However, the object in heap memory remains mutable. You can mutate, add, or delete properties unless `Object.freeze()` is invoked.',
    codeSnippet: `const user = { name: 'Alex' };
user.name = 'Sam'; // Allowed!
user = {}; // TypeError: Assignment to constant variable`,
    keyTakeaway: 'const locks the memory reference, not the inner data structure.'
  },
  {
    id: 'fc-d1-3',
    dayNumber: 1,
    topicId: 'day1-topic2',
    category: 'JavaScript',
    front: 'Why does `typeof null` evaluate to "object" in JavaScript?',
    back: 'It is a historical bug from the first 1995 JavaScript implementation. Values were stored in 32-bit units with a 3-bit type tag. The type tag for "object" was 000, and NULL pointers were represented as all zeros, tricking typeof into returning "object".',
    codeSnippet: `console.log(typeof null); // "object"
// Safe check:
const isNull = (val) => val === null;`,
    keyTakeaway: 'Always check for null using strict equality (val === null), never typeof.'
  },
  {
    id: 'fc-d1-4',
    dayNumber: 1,
    topicId: 'day1-topic2',
    category: 'JavaScript',
    front: 'What is the ToPrimitive conversion algorithm and how does `[] + {}` evaluate?',
    back: 'When `+` encounters non-primitives, it invokes ToPrimitive via valueOf() and toString(). [].toString() yields "", and {}.toString() yields "[object Object]". "" + "[object Object]" = "[object Object]".',
    codeSnippet: `console.log([] + {}); // "[object Object]"
console.log({} + []); // "[object Object]" (or 0 in browser REPL)`,
    keyTakeaway: 'Addition operator coerces objects to strings via toString() if valueOf() returns an object.'
  },
  {
    id: 'fc-d1-5',
    dayNumber: 1,
    topicId: 'day1-topic3',
    category: 'JavaScript',
    front: 'What is the critical difference between `||` and `??` (Nullish Coalescing)?',
    back: '`||` falls back on all falsy values (0, "", false, null, undefined, NaN). `??` ONLY falls back on `null` or `undefined`, preserving valid 0, false, and empty strings.',
    codeSnippet: `const limit = 0;
console.log(limit || 10); // 10 (BUG: overwritten valid 0!)
console.log(limit ?? 10); // 0 (CORRECT)`,
    keyTakeaway: 'Use ?? for configurations and numeric defaults where 0 or false are legitimate values.'
  },
  {
    id: 'fc-d1-6',
    dayNumber: 1,
    topicId: 'day1-topic4',
    category: 'JavaScript',
    front: 'Why does `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }` log 3, 3, 3?',
    back: '`var` is function-scoped, sharing a single variable `i` across all iterations. By the time the event loop macrotask callbacks run, the loop has already finished with `i = 3`. Replacing `var` with block-scoped `let` creates a new binding per iteration (logging 0, 1, 2).',
    codeSnippet: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}`,
    keyTakeaway: 'Block-scoped `let` binds a fresh variable per iteration in for loops.'
  },

  // Day 2: Closures
  {
    id: 'fc-d2-1',
    dayNumber: 2,
    topicId: 'day2-topic1',
    category: 'JavaScript',
    front: 'What is a Closure in JavaScript and how is it formed?',
    back: 'A closure is the combination of a function bundled together with references to its surrounding lexical environment. It gives inner functions access to outer function variables even after the outer function has returned and exited the call stack.',
    codeSnippet: `function makeAdder(x) {
  return function(y) { return x + y; };
}
const add5 = makeAdder(5);
console.log(add5(3)); // 8 (remembers x = 5)`,
    keyTakeaway: 'Closures retain references to the outer scope in heap memory as long as the inner function is reachable.'
  },

  // Day 3: Event Loop
  {
    id: 'fc-d3-1',
    dayNumber: 3,
    topicId: 'day3-topic1',
    category: 'JavaScript',
    front: 'Which has higher execution priority in the Event Loop: Microtasks or Macrotasks?',
    back: 'Microtasks (Promise.then, queueMicrotask, MutationObserver) have higher priority. After synchronous code or each macrotask finishes, the entire microtask queue is completely drained before the next macrotask (setTimeout, setInterval) runs.',
    codeSnippet: `setTimeout(() => console.log('macro'), 0);
Promise.resolve().then(() => console.log('micro'));
// Logs: 'micro' then 'macro'`,
    keyTakeaway: 'The microtask queue must be completely empty before the browser processes the next macrotask.'
  },

  // Day 7: React Architecture
  {
    id: 'fc-d7-1',
    dayNumber: 7,
    topicId: 'day7-topic1',
    category: 'React',
    front: 'What is React Fiber and what major problem did it solve?',
    back: 'React Fiber is the complete rewrite of React reconciliation engine. It replaced the synchronous, recursive stack reconciler with an incremental, interruptible virtual DOM tree architecture capable of pausing work, prioritizing user input, and enabling React 18 Concurrency.',
    keyTakeaway: 'Fiber turns rendering into a cooperative scheduler that avoids blocking the browser main thread.'
  },
  {
    id: 'fc-d7-2',
    dayNumber: 7,
    topicId: 'day7-topic1',
    category: 'React',
    front: 'Why should you never use array index as a `key` in dynamic lists in React?',
    back: 'If items are reordered, inserted, or removed, indices shift. React uses keys to match virtual DOM nodes with actual DOM nodes. Using index causes React to retain state in the wrong component instances, leading to corrupted input focus and visual glitches.',
    keyTakeaway: 'Keys must be stable, unique, and permanent entity identifiers.'
  },

  // Day 8: React Hooks
  {
    id: 'fc-d8-1',
    dayNumber: 8,
    topicId: 'day8-topic1',
    category: 'React',
    front: 'What causes a Stale Closure in React and how do you fix it?',
    back: 'A stale closure occurs when an effect or callback captures state or props from an earlier render pass because dependency arrays were empty or incomplete. Fix it by adding dependencies or using functional state updaters `setCount(prev => prev + 1)`.',
    codeSnippet: `// Fixed with functional updater:
useEffect(() => {
  const id = setInterval(() => setCount(p => p + 1), 1000);
  return () => clearInterval(id);
}, []);`,
    keyTakeaway: 'Functional updaters always receive the freshest state without needing state in dependency arrays.'
  },

  // Day 12: Node.js Architecture
  {
    id: 'fc-d12-1',
    dayNumber: 12,
    topicId: 'day12-topic1',
    category: 'Node.js',
    front: 'What is the role of Libuv in Node.js and what is UV_THREADPOOL_SIZE?',
    back: 'Libuv is the multi-platform C library providing Node.js with the event loop and asynchronous I/O. For operations that cannot be handled non-blockingly by the OS kernel (file system, dns.lookup, crypto), Libuv dispatches them to a background thread pool (default size: 4 threads).',
    keyTakeaway: 'Node JS execution is single-threaded; Libuv handles blocking operations on C++ worker threads.'
  },

  // Day 13: Express.js
  {
    id: 'fc-d13-1',
    dayNumber: 13,
    topicId: 'day13-topic1',
    category: 'Express.js',
    front: 'Why must Express Error Handling Middleware have exactly 4 arguments?',
    back: 'Express checks `fn.length` using JavaScript reflection. When a function has exactly 4 parameters `(err, req, res, next)`, Express recognizes it as an error handler and skips calling it during normal request routing until `next(err)` is triggered.',
    codeSnippet: `app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});`,
    keyTakeaway: 'Function.length === 4 tells Express to register the middleware as an error handler.'
  },

  // Day 17: SQL & PostgreSQL
  {
    id: 'fc-d17-1',
    dayNumber: 17,
    topicId: 'day17-topic1',
    category: 'PostgreSQL',
    front: 'What do ACID properties stand for in relational databases?',
    back: 'Atomicity (all or nothing), Consistency (preserves schema constraints and invariants), Isolation (concurrent transactions execute without corrupting each other), Durability (committed transactions survive server crashes via Write-Ahead Logging WAL).',
    keyTakeaway: 'ACID guarantees reliable data processing even in the event of hardware failures or concurrent access.'
  },
  {
    id: 'fc-d18-1',
    dayNumber: 18,
    topicId: 'day18-topic1',
    category: 'SQL',
    front: 'What is the difference between `RANK()` and `DENSE_RANK()` in SQL window functions?',
    back: 'Both assign the same rank to identical values. However, `RANK()` skips subsequent ranks after ties (e.g. 1, 2, 2, 4), while `DENSE_RANK()` does not skip gaps (e.g. 1, 2, 2, 3).',
    codeSnippet: `SELECT name, salary,
  DENSE_RANK() OVER (ORDER BY salary DESC) as rank
FROM employees;`,
    keyTakeaway: 'Use DENSE_RANK() when you want top N unique tiers without skipping positions.'
  },

  // Day 21: DSA
  {
    id: 'fc-d21-1',
    dayNumber: 21,
    topicId: 'day21-topic1',
    category: 'DSA',
    front: 'When can you use the Two Pointers technique to achieve O(n) time on an array?',
    back: 'When the array is sorted, or when searching pairs/triplets or partitioning sequences (like reversing or separating evens/odds). Sorted order allows deterministic pointer movements (moving left increases sum, moving right decreases sum).',
    keyTakeaway: 'Two pointers leverages sorted invariants to avoid O(n²) nested loop iterations.'
  },
  {
    id: 'fc-d21-2',
    dayNumber: 21,
    topicId: 'day21-topic2',
    category: 'DSA',
    front: 'Why is Variable Sliding Window O(n) even with a nested while loop inside?',
    back: 'Amortized analysis: the right pointer enters the window once (n steps), and the left pointer contracts the window at most once per element (n steps). Across the entire array, at most 2n operations occur, which is strictly O(n) linear time.',
    keyTakeaway: 'Amortized linear time: each element enters and exits the window at most once.'
  },

  // Day 29: Interview Strategy
  {
    id: 'fc-d29-1',
    dayNumber: 29,
    topicId: 'day29-topic1',
    category: 'Interview Strategy',
    front: 'What are the 6 steps of the UMPIRE framework for live coding interviews?',
    back: '1. Understand (ask constraints, edge cases), 2. Match (recognize pattern: Two Pointers, BFS, etc.), 3. Plan (write pseudocode/bullet steps), 4. Implement (write clean code), 5. Review (dry-run test case line by line), 6. Evaluate (state Big-O time and space).',
    keyTakeaway: 'Always plan and vocalize constraints BEFORE writing a single line of real code.'
  },
  {
    id: 'fc-d30-1',
    dayNumber: 30,
    topicId: 'day30-topic1',
    category: 'Behavioral',
    front: 'What is the STAR framework for behavioral interviews and what step matters most?',
    back: 'Situation, Task, Action, Result. The Action step is the most crucial (~60% of your time): explain the specific technical and interpersonal decisions YOU took to overcome the challenge, followed by quantifiable Results.',
    keyTakeaway: 'Focus heavily on "I did X because Y" rather than vague team descriptions.'
  }
];

export const getFlashcardsByDay = (dayNumber: number): FlashcardItem[] => {
  return allFlashcards.filter(f => f.dayNumber === dayNumber);
};

export const getFlashcardsByModule = (category: string): FlashcardItem[] => {
  return allFlashcards.filter(f => f.category.toLowerCase().includes(category.toLowerCase()));
};
