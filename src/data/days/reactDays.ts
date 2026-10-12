import { StudyDay } from '../../types/roadmap';

export const reactDays: StudyDay[] = [
  {
    dayNumber: 7,
    title: "React Architecture, Virtual DOM & Reconciliation Engine",
    module: "react",
    moduleName: "React.js & Frontend Architecture",
    primaryObjective: "Understand the React Fiber reconciler, diffing algorithm complexity O(n), Virtual DOM representation, batching, and component lifecycles.",
    estimatedMinutes: 140,
    isSevenDayTrack: true,
    checklist: [
      "Explain how JSX compiles into React.createElement / jsx runtime calls",
      "Describe the 2 phases of React rendering: Render phase and Commit phase",
      "Trace the Fiber tree structure (child, sibling, return pointers)",
      "Explain why keys are critical in list reconciliation",
      "Understand React 18 automatic batching across async boundaries"
    ],
    topics: [
      {
        id: "day7-topic1",
        title: "Virtual DOM, Diffing Algorithm & Reconciliation",
        durationMinutes: 40,
        summary: "How React computes minimal DOM mutations using heuristics to achieve O(n) algorithmic complexity instead of O(n³).",
        definitions: [
          {
            term: "Virtual DOM",
            explanation: "In-memory JavaScript tree representation of the UI synced with the real DOM via ReactDOM ('reconciliation')."
          },
          {
            term: "Diffing Heuristics",
            explanation: "Two elements of different types produce different trees; keys provide stable identities across renders."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "What JSX Compiles To",
            code: `// JSX:
// const element = <button className="btn-primary" onClick={handleClick}>Submit</button>;

// Compiles to React 17+ JSX Runtime:
import { jsx as _jsx } from "react/jsx-runtime";

const element = _jsx("button", {
  className: "btn-primary",
  onClick: handleClick,
  children: "Submit"
});

// Internally produces a plain Virtual DOM Fiber node object:
// { type: 'button', key: null, props: { className: 'btn-primary', children: 'Submit' } }`,
            output: "Plain JS object representing UI element"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d7-1",
            question: "Why should you never use array index as a key for dynamic lists in React?",
            answer: "If items are added, removed, or reordered, indices change. React matches components by key between renders. Using index causes React to preserve component state and DOM nodes for the wrong data items, causing subtle state bugs, input focus errors, and performance degradation.",
            keyPoints: ["Keys must be stable, unique, and predictable", "Index causes incorrect state association during reorder/delete", "Use unique entity IDs instead"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d7-1",
            question: "What is the time complexity of React's reconciliation diffing algorithm?",
            options: ["O(n³)", "O(n²)", "O(n)", "O(log n)"],
            correctAnswer: 2,
            explanation: "React relies on two heuristic assumptions to achieve linear O(n) complexity instead of standard tree comparison O(n³)."
          }
        ]
      },
      {
        id: "day7-topic2",
        title: "React Fiber Architecture & Two-Phase Rendering",
        durationMinutes: 40,
        summary: "How React Fiber enables incremental rendering, interruptible work, and concurrent features.",
        definitions: [
          {
            term: "Render Phase",
            explanation: "Asynchronous phase where React calculates changes by traversing the Fiber tree. Can be paused, aborted, or restarted."
          },
          {
            term: "Commit Phase",
            explanation: "Synchronous phase where React mutates the real DOM and runs layout effects. Cannot be interrupted."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Fiber Node Pointer Structure",
            code: `// Simplified representation of a Fiber Node:
const fiberNode = {
  tag: 5,               // HostComponent (e.g. 'div', 'button')
  type: 'div',          // Element type
  key: null,
  stateNode: domElement,// Real DOM element reference
  child: firstChildFiber, // Link to first direct child
  sibling: nextSiblingFiber, // Link to next sibling
  return: parentFiber,  // Link back to parent (return pointer)
  memoizedState: null,  // Hooks linked list
  flags: 0              // Placement, Update, Deletion side effects
};`,
            output: "Singly linked list representation of component tree"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d7-2",
            question: "What problem did React Fiber solve over the old Stack Reconciler?",
            answer: "The legacy Stack Reconciler operated synchronously and recursively. Large tree updates blocked the browser main thread, causing frame drops and unresponsive user interactions. Fiber transformed rendering into a cooperative scheduling system where work is broken into units that can be paused, prioritized, and resumed.",
            keyPoints: ["Stack reconciler was synchronous and blocking", "Fiber breaks work into interruptible units", "Enables concurrency, Suspense, and smooth UI"],
            difficulty: "Associate",
            frequency: "Core Standard"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d7-2",
            question: "Can React interrupt or pause the Commit Phase?",
            options: ["Yes, if user clicks something", "No, Commit phase is always synchronous", "Only in development mode", "Only with Suspense"],
            correctAnswer: 1,
            explanation: "The Render phase can be paused and restarted, but the Commit phase is always synchronous to ensure the real DOM never shows inconsistent intermediate states."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d7-1",
        question: "What does React 18 Automatic Batching do?",
        options: [
          "Batches state updates inside setTimeout and Promises together with standard event handlers",
          "Batches CSS files during build",
          "Renders multiple components on background web workers",
          "Compiles JSX into WebAssembly"
        ],
        correctAnswer: 0,
        explanation: "In React 18, all state updates—even inside promises, timeouts, and native event handlers—are automatically batched into a single render pass."
      }
    ]
  },
  {
    dayNumber: 8,
    title: "Mastering React Hooks: useState, useEffect & useRef",
    module: "react",
    moduleName: "React.js & Frontend Architecture",
    primaryObjective: "Deep dive into state mechanics, effect lifecycles, cleanup functions, useRef for mutable values vs DOM nodes, and solving stale closures.",
    estimatedMinutes: 145,
    isSevenDayTrack: false,
    checklist: [
      "Explain the Rules of Hooks and how React tracks hooks via internal linked lists",
      "Differentiate updater function setState(prev => prev + 1) from setState(count + 1)",
      "Correctly write useEffect cleanup handlers to prevent memory leaks and zombie listeners",
      "Diagnose and solve stale closure bugs in timers and callbacks",
      "Use useRef for DOM access and storing mutable values without triggering re-renders"
    ],
    topics: [
      {
        id: "day8-topic1",
        title: "useEffect Lifecycle, Cleanup & Stale Closures",
        durationMinutes: 45,
        summary: "Understanding when effects run, why cleanup functions are vital, and how stale closures occur.",
        definitions: [
          {
            term: "Stale Closure",
            explanation: "When a callback or effect captures values from a previous render pass because dependencies were omitted."
          },
          {
            term: "Effect Cleanup",
            explanation: "Returned function executed before the effect runs again and when the component unmounts."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Solving the Stale Closure in Interval Timer",
            code: `// BUGGY: Captures initial count (0) inside closure
function BuggyTimer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // Stale: always evaluates 0 + 1!
    }, 1000);
    return () => clearInterval(id);
  }, []); // Missing count in deps
}

// FIXED: Functional state updater receives freshest state
function CleanTimer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1); // Always accesses fresh previous state
    }, 1000);
    return () => clearInterval(id); // Proper cleanup prevents memory leaks
  }, []);
}`,
            output: "Timer increments accurately 1, 2, 3, 4..."
          }
        ],
        interviewQuestions: [
          {
            id: "q-d8-1",
            question: "Why does useEffect run twice in React 18 StrictMode during development?",
            answer: "React 18 StrictMode intentionally mounts, unmounts, and re-mounts components in development to simulate and verify that your effect cleanup functions properly teardown subscriptions, timers, and abort controllers without leaving lingering side effects.",
            keyPoints: ["Development only check", "Verifies cleanup logic works", "Prepares apps for future concurrent features"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d8-1",
            question: "Does changing the value of a useRef object trigger a component re-render?",
            options: ["Yes, always", "No, ref changes do not cause re-renders", "Only if ref.current is an object", "Only in production"],
            correctAnswer: 1,
            explanation: "Mutating ref.current is a synchronous mutation that does not inform React or schedule a re-render."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d8-1",
        question: "Why must React hooks only be called at the top level of a component?",
        options: [
          "Because JavaScript engines disallow nested functions",
          "React relies on the exact same order of hook calls on every render to associate state with the Fiber's hook linked list",
          "To improve TypeScript compilation speed",
          "To allow CSS modules to link properly"
        ],
        correctAnswer: 1,
        explanation: "Hooks are stored in a singly linked list in Fiber. Calling them conditionally breaks the order and mismatches hook state."
      }
    ]
  },
  {
    dayNumber: 9,
    title: "React Performance: useMemo, useCallback & Code Splitting",
    module: "react",
    moduleName: "React.js & Frontend Architecture",
    primaryObjective: "Master rendering optimization, referential equality, useMemo vs useCallback, React.memo, Suspense, and dynamic imports.",
    estimatedMinutes: 135,
    isSevenDayTrack: false,
    checklist: [
      "Diagnose unnecessary re-renders using React DevTools Profiler",
      "Apply React.memo with custom areEqual comparison function",
      "Preserve function referential equality with useCallback for child props",
      "Cache expensive calculations with useMemo",
      "Implement route-based and component-based code splitting with React.lazy and Suspense"
    ],
    topics: [
      {
        id: "day9-topic1",
        title: "useMemo, useCallback & Referential Integrity",
        durationMinutes: 45,
        summary: "Preventing child component re-renders by maintaining stable references for functions and objects.",
        definitions: [
          {
            term: "Referential Equality",
            explanation: "In JavaScript, {} !== {} and (() => {}) !== (() => {}). New instances trigger child re-renders unless memoized."
          },
          {
            term: "React.memo",
            explanation: "Higher-order component that skips rendering a component if its props have not shallowly changed."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Optimizing Child Render with useCallback and React.memo",
            code: `import React, { useState, useCallback, useMemo } from 'react';

// Memoized child: only renders when props change
const FilterButton = React.memo(({ category, onSelect }) => {
  console.log("Rendered FilterButton:", category);
  return <button onClick={() => onSelect(category)}>{category}</button>;
});

function ProductList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Stable callback reference across re-renders
  const handleSelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // Memoize filtered calculation
  const filteredItems = useMemo(() => {
    return selectedCategory === "all" 
      ? items 
      : items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return <div>{/* UI */}</div>;
}`,
            output: "Child buttons do not re-render unnecessarily"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d9-1",
            question: "Why shouldn't you wrap every single function in useCallback and every value in useMemo?",
            answer: "useMemo and useCallback carry memory and computation overhead: React must allocate dependency arrays, compare them on every render, and store closures in memory. For cheap calculations, the optimization cost exceeds the benefit.",
            keyPoints: ["Memoization has overhead", "Use when passing callbacks to memoized children", "Profile before optimizing"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d9-1",
            question: "What is the return value of useCallback(fn, deps)?",
            options: ["The executed return value of fn", "A memoized version of the callback function itself", "A Promise", "A boolean"],
            correctAnswer: 1,
            explanation: "useCallback returns a memoized function instance; useMemo returns the memoized result of executing the function."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d9-1",
        question: "What happens if a component wrapped in React.lazy fails to load due to network error?",
        options: ["Page goes blank", "The nearest React Error Boundary catches the error", "React falls back to jQuery", "It silently retries forever"],
        correctAnswer: 1,
        explanation: "Dynamic imports that reject can be caught and handled gracefully by wrapping the Suspense boundary inside an Error Boundary."
      }
    ]
  },
  {
    dayNumber: 10,
    title: "Global State: Context API, useReducer & Redux Toolkit",
    module: "react",
    moduleName: "React.js & Frontend Architecture",
    primaryObjective: "Master state lifting, Context API performance pitfalls, useReducer state machines, and modern Redux Toolkit (slices, createAsyncThunk).",
    estimatedMinutes: 140,
    isSevenDayTrack: false,
    checklist: [
      "Structure complex component state using useReducer with actions and dispatch",
      "Avoid Context re-render storms by splitting Context into State and Dispatch contexts",
      "Configure Redux Toolkit store with configureStore and createSlice",
      "Handle async API workflows with createAsyncThunk (pending, fulfilled, rejected)",
      "Explain how Immer produces immutable state updates behind the scenes"
    ],
    topics: [
      {
        id: "day10-topic1",
        title: "Context API Performance Optimization & Split Pattern",
        durationMinutes: 40,
        summary: "How to use React Context without triggering unnecessary renders across the entire subscriber tree.",
        definitions: [
          {
            term: "Context Invalidation",
            explanation: "Whenever a Context value changes, every component that calls useContext(MyContext) will re-render, ignoring React.memo."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Split Context Pattern (State vs Dispatch)",
            code: `import { createContext, useContext, useReducer } from 'react';

const StateContext = createContext(null);
const DispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Components that only dispatch actions never re-render when auth state changes!
export const useAuthDispatch = () => useContext(DispatchContext);
export const useAuthState = () => useContext(StateContext);`,
            output: "High-performance Context pattern"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d10-1",
            question: "When should you use Redux / Zustand over React Context?",
            answer: "React Context is designed for low-frequency updates like themes, user authentication, or localization. For frequently changing state, high-velocity data, or large state trees, Context causes broad re-renders. External stores like Redux Toolkit or Zustand provide fine-grained selector subscriptions.",
            keyPoints: ["Context triggers all consumers to render", "External stores provide selector-level subscriptions", "Redux Toolkit offers robust middleware and DevTools"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d10-1",
            question: "How does Redux Toolkit allow writing 'mutating' code like state.count++ in reducers?",
            options: [
              "By turning JavaScript objects into pointers",
              "By utilizing Immer library which records draft changes and produces a new immutable copy",
              "By mutating the real memory directly",
              "By using WebAssembly"
            ],
            correctAnswer: 1,
            explanation: "Redux Toolkit internally integrates Immer, which proxies state updates and automatically creates an immutable next state tree."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d10-1",
        question: "What is an action creator in Redux Toolkit?",
        options: [
          "A component that dispatches state",
          "A function automatically generated by createSlice that returns an action object with type and payload",
          "A database schema builder",
          "An HTTP interceptor"
        ],
        correctAnswer: 1,
        explanation: "createSlice automatically generates action creators corresponding to the reducers defined."
      }
    ]
  },
  {
    dayNumber: 11,
    title: "Forms, Error Boundaries & React Router 6 Navigation",
    module: "react",
    moduleName: "React.js & Frontend Architecture",
    primaryObjective: "Master controlled vs uncontrolled inputs, custom form validation, class-based Error Boundaries, and modern React Router 6 route configurations.",
    estimatedMinutes: 130,
    isSevenDayTrack: false,
    checklist: [
      "Compare Controlled Components (state) vs Uncontrolled Components (ref/FormData)",
      "Build a class-based ErrorBoundary with componentDidCatch and getDerivedStateFromError",
      "Configure nested routes, layout outlets, and loaders with React Router 6",
      "Implement route protection and redirection based on authentication state",
      "Validate complex forms with Zod or custom schema validators"
    ],
    topics: [
      {
        id: "day11-topic1",
        title: "Error Boundaries & Resilient Error Handling",
        durationMinutes: 40,
        summary: "Preventing JavaScript runtime exceptions from crashing the entire application into a white screen.",
        definitions: [
          {
            term: "Error Boundary",
            explanation: "A React class component that catches JavaScript errors anywhere in its child component tree and displays fallback UI."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Production Error Boundary Component",
            code: `import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to telemetry service (e.g. Sentry)
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-950/40 border border-red-500/30 rounded-xl">
          <h2 className="text-red-400 font-semibold">Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}`,
            output: "Resilient fallback UI on render errors"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d11-1",
            question: "What errors do React Error Boundaries NOT catch?",
            answer: "Error Boundaries do NOT catch: 1. Event handlers (e.g. onClick errors — use try/catch instead), 2. Asynchronous code (e.g. setTimeout, requestAnimationFrame), 3. Server-side rendering errors, 4. Errors thrown in the Error Boundary itself rather than its children.",
            keyPoints: ["Do not catch event handlers", "Do not catch async callbacks/promises", "Do catch render phase and lifecycle errors in children"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d11-1",
            question: "Which lifecycle method in an Error Boundary is responsible for rendering the fallback UI?",
            options: ["componentDidCatch", "static getDerivedStateFromError", "shouldComponentUpdate", "componentWillUnmount"],
            correctAnswer: 1,
            explanation: "getDerivedStateFromError updates state synchronously during the render phase to immediately trigger fallback UI."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d11-1",
        question: "In React Router 6, which component renders the matched child route inside a parent layout?",
        options: ["<Route />", "<Switch />", "<Outlet />", "<Children />"],
        correctAnswer: 2,
        explanation: "<Outlet /> is used in parent route elements to render their child route elements."
      }
    ]
  }
];
