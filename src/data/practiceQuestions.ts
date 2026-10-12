import { MCQQuestion, ModuleCategory } from '../types/roadmap';

export interface PracticeQuestion extends MCQQuestion {
  module: ModuleCategory;
  topicTitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'mcq' | 'output' | 'debugging';
  hint: string;
}

export const practiceQuestionsBank: PracticeQuestion[] = [
  // JavaScript Questions
  {
    id: "pq-js-1",
    module: "javascript",
    topicTitle: "Event Loop & Execution Timing",
    difficulty: "Medium",
    type: "output",
    question: "What is the exact output order of the following snippet?",
    code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
queueMicrotask(() => console.log(4));
console.log(5);`,
    options: [
      "1, 2, 3, 4, 5",
      "1, 5, 3, 4, 2",
      "1, 5, 2, 3, 4",
      "1, 3, 4, 5, 2"
    ],
    correctAnswer: 1,
    hint: "Synchronous code finishes first, followed by microtasks, and finally macrotasks.",
    explanation: "1 and 5 log synchronously. Next, the microtask queue drains: Promise handler (3) and queueMicrotask (4) run in FIFO order. Lastly, the macrotask (2) executes."
  },
  {
    id: "pq-js-2",
    module: "javascript",
    topicTitle: "Type Coercion & Operators",
    difficulty: "Medium",
    type: "output",
    question: "What is logged to the console by the following statement?",
    code: `console.log([] + {} + [] + 0);`,
    options: [
      "[object Object]0",
      "NaN",
      "0",
      "TypeError"
    ],
    correctAnswer: 0,
    hint: "[].toString() is empty string ''; {}.toString() is '[object Object]'.",
    explanation: "[] + {} coerces both to primitives: '' + '[object Object]' = '[object Object]'. Adding [] gives '[object Object]'. Adding 0 performs string concatenation resulting in '[object Object]0'."
  },
  {
    id: "pq-js-3",
    module: "javascript",
    topicTitle: "Closures & Variable Scoping",
    difficulty: "Medium",
    type: "output",
    question: "What does this snippet output after 100ms?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 10);
}`,
    options: [
      "0, 1, 2 followed by 0, 1, 2",
      "3, 3, 3 followed by 0, 1, 2",
      "3, 3, 3 followed by 3, 3, 3",
      "undefined, undefined, undefined followed by 0, 1, 2"
    ],
    correctAnswer: 1,
    hint: "var has function scope and shares one variable; let creates a fresh binding per iteration.",
    explanation: "The var loop shares one variable 'i', which equals 3 by the time callbacks execute. The let loop creates a new lexical environment for 'j' in every iteration, logging 0, 1, 2."
  },
  {
    id: "pq-js-4",
    module: "javascript",
    topicTitle: "Object Prototypes & 'this'",
    difficulty: "Hard",
    type: "output",
    question: "What is printed to the console?",
    code: `const person = {
  name: 'Karan',
  sayName: function() {
    return this.name;
  }
};
const fn = person.sayName;
console.log(fn());`,
    options: [
      "'Karan'",
      "undefined (or TypeError in strict mode)",
      "null",
      "ReferenceError"
    ],
    correctAnswer: 1,
    hint: "The call site determines 'this' for regular functions, not where it was originally defined.",
    explanation: "fn() is invoked as a standalone function without an object receiver. In non-strict mode, 'this' defaults to window/global where window.name is undefined (or throws TypeError in strict mode)."
  },

  // React Questions
  {
    id: "pq-react-1",
    module: "react",
    topicTitle: "State Updates & Asynchronous Batching",
    difficulty: "Medium",
    type: "output",
    question: "If count starts at 0, what is count after clicking this button once in React 18?",
    code: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(prev => prev + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}`,
    options: [
      "1",
      "2",
      "3",
      "0"
    ],
    correctAnswer: 1,
    hint: "Notice which calls use the direct closure value and which use the functional updater.",
    explanation: "Both setCount(count + 1) use stale count (0), requesting update to 1. Then setCount(prev => prev + 1) takes that batched 1 and increments it to 2. Total result is 2."
  },
  {
    id: "pq-react-2",
    module: "react",
    topicTitle: "React Hooks & useEffect Dependency Array",
    difficulty: "Medium",
    type: "debugging",
    question: "Why does the following component trigger an infinite re-render loop?",
    code: `function UserCard({ userId }) {
  const [user, setUser] = useState(null);
  const options = { detailed: true };

  useEffect(() => {
    fetchUser(userId, options).then(setUser);
  }, [options, userId]);

  return <div>{user?.name}</div>;
}`,
    options: [
      "userId changes on every render",
      "options is a new object reference created on every render, invalidating useEffect dependencies",
      "fetchUser cannot be called inside useEffect",
      "setUser causes an infinite loop in all hooks"
    ],
    correctAnswer: 1,
    hint: "Think about referential equality of object literals created inside component render bodies.",
    explanation: "Because options = { detailed: true } creates a new object reference on every render, the useEffect dependency check [options, userId] always evaluates to false, re-running the effect endlessly."
  },
  {
    id: "pq-react-3",
    module: "react",
    topicTitle: "Performance & Memoization",
    difficulty: "Hard",
    type: "mcq",
    question: "When does wrapping a component in React.memo NOT prevent a re-render when the parent renders?",
    options: [
      "When the child component is a functional component",
      "When the child receives a newly instantiated inline function or object as a prop without useCallback/useMemo",
      "When the parent is a class component",
      "When props are numbers or booleans"
    ],
    correctAnswer: 1,
    hint: "React.memo performs a shallow prop comparison (===) by default.",
    explanation: "React.memo uses shallow equality (Object.is). Passing a new inline arrow function or newly created object causes shallow equality to fail, forcing a re-render."
  },

  // Node & Express Questions
  {
    id: "pq-node-1",
    module: "node",
    topicTitle: "Libuv Event Loop & Priority",
    difficulty: "Hard",
    type: "output",
    question: "What is printed in Node.js when this script executes?",
    code: `setTimeout(() => console.log('Timeout'), 0);
setImmediate(() => console.log('Immediate'));
process.nextTick(() => console.log('NextTick'));`,
    options: [
      "NextTick, then Timeout, then Immediate",
      "Timeout, then Immediate, then NextTick",
      "Immediate, then Timeout, then NextTick",
      "NextTick, then Immediate, then Timeout"
    ],
    correctAnswer: 0,
    hint: "process.nextTick runs before any Libuv phase advance.",
    explanation: "process.nextTick resolves immediately before the Libuv event loop advances. Then the timers phase processes setTimeout(..., 0), followed by check phase setImmediate()."
  },
  {
    id: "pq-node-2",
    module: "node",
    topicTitle: "Express Middleware Flow",
    difficulty: "Medium",
    type: "debugging",
    question: "What bug exists in this Express authentication middleware?",
    code: `function verifyAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
  }
  const user = decodeToken(token);
  req.user = user;
  next();
}`,
    options: [
      "req.headers cannot access authorization",
      "Missing return statement after res.status(401).json(...), causing execution to continue and throw 'Cannot set headers after they are sent'",
      "next() cannot be called inside a function",
      "res.status(401) is invalid syntax"
    ],
    correctAnswer: 1,
    hint: "Does sending a JSON response stop JavaScript execution from proceeding to the next line?",
    explanation: "res.json() does not halt function execution. Without 'return res.status(401)...', the function continues, calls decodeToken(null), and invokes next(), causing a headers already sent crash."
  },

  // SQL & PostgreSQL Questions
  {
    id: "pq-sql-1",
    module: "sql",
    topicTitle: "PostgreSQL NULL Handling in NOT IN",
    difficulty: "Hard",
    type: "output",
    question: "Given table A with IDs [1, 2, 3] and table B with IDs [2, 3, NULL], what does this query return?",
    code: `SELECT * FROM table_a WHERE id NOT IN (SELECT id FROM table_b);`,
    options: [
      "Row with id = 1",
      "Empty result set (0 rows)",
      "All rows [1, 2, 3]",
      "SQL Syntax Error"
    ],
    correctAnswer: 1,
    hint: "How does SQL evaluate (1 != NULL)? In 3-valued logic, is it TRUE, FALSE, or UNKNOWN?",
    explanation: "In SQL, NOT IN is equivalent to (id != 2 AND id != 3 AND id != NULL). Because (id != NULL) evaluates to UNKNOWN, the entire conjunction becomes UNKNOWN, filtering out all rows! Always use NOT EXISTS instead when NULLs may exist."
  },
  {
    id: "pq-sql-2",
    module: "sql",
    topicTitle: "Indexing & SARGability",
    difficulty: "Medium",
    type: "mcq",
    question: "Which of the following queries can utilize an existing B-Tree index on the 'created_at' timestamp column?",
    options: [
      "SELECT * FROM orders WHERE DATE(created_at) = '2026-03-01';",
      "SELECT * FROM orders WHERE created_at >= '2026-03-01 00:00:00' AND created_at < '2026-03-02 00:00:00';",
      "SELECT * FROM orders WHERE EXTRACT(YEAR FROM created_at) = 2026;",
      "SELECT * FROM orders WHERE TO_CHAR(created_at, 'YYYY-MM') = '2026-03';"
    ],
    correctAnswer: 1,
    hint: "Applying a function or type conversion to the indexed column makes it non-SARGable (Search Argument Able).",
    explanation: "Wrapping created_at inside functions (DATE, EXTRACT, TO_CHAR) prevents index usage and causes Seq Scans. Using an un-transformed range comparison (>= and <) allows the B-Tree index to perform a direct index range scan."
  },

  // DSA Questions
  {
    id: "pq-dsa-1",
    module: "dsa",
    topicTitle: "Algorithmic Complexity & Arrays",
    difficulty: "Medium",
    type: "mcq",
    question: "What is the tightest time complexity to find if a pair of numbers in a SORTED array adds up to target K?",
    options: [
      "O(n²)",
      "O(n log n)",
      "O(n) using Two Pointers",
      "O(1)"
    ],
    correctAnswer: 2,
    hint: "The array is already sorted! You don't need to sort it or use extra hash map space.",
    explanation: "Using two converging pointers (left = 0, right = n-1) allows finding the pair in O(n) time and O(1) space."
  },
  {
    id: "pq-dsa-2",
    module: "dsa",
    topicTitle: "Tree Traversal Characteristics",
    difficulty: "Easy",
    type: "mcq",
    question: "Which tree traversal of a Binary Search Tree (BST) visits the nodes in strictly sorted ascending order?",
    options: [
      "Preorder (Root, Left, Right)",
      "Postorder (Left, Right, Root)",
      "Inorder (Left, Root, Right)",
      "Level-order (BFS)"
    ],
    correctAnswer: 2,
    hint: "Think: Left child is smaller, root is middle, right child is greater.",
    explanation: "Because BST invariant is Left < Root < Right, an Inorder traversal (Left -> Root -> Right) naturally visits all keys in ascending order."
  }
];
