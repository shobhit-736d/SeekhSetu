import { StudyDay } from '../../types/roadmap';

export const javascriptDays: StudyDay[] = [
  {
    dayNumber: 2,
    title: "Closures, Lexical Environment & Functional Paradigms",
    module: "javascript",
    moduleName: "JavaScript Core & Advanced",
    primaryObjective: "Master closures, lexical environment retention, function currying, partial application, IIFE, and memoization patterns.",
    estimatedMinutes: 135,
    isSevenDayTrack: false,
    checklist: [
      "Define closures using lexical environment references and garbage collection",
      "Build a production-grade memoize() higher-order function",
      "Implement currying with infinite arguments curry(a)(b)(c)...",
      "Explain the module pattern and private variable encapsulation",
      "Debug common closure memory retention pitfalls in production"
    ],
    topics: [
      {
        id: "day2-topic1",
        title: "Closures & Lexical Scoping Internals",
        durationMinutes: 35,
        summary: "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).",
        definitions: [
          {
            term: "Closure",
            explanation: "Function having access to the parent scope even after the parent function has closed and exited the call stack."
          },
          {
            term: "Lexical Environment",
            explanation: "A data structure holding identifier-variable mappings and an outer reference pointer."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Private Counter Factory with Closures",
            code: `function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable encapsulated in closure

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counterA = createCounter(10);
console.log(counterA.increment()); // 11
console.log(counterA.increment()); // 12
console.log(counterA.getValue());  // 12
// count cannot be directly modified or accessed from outside!`,
            explanation: "Variables inside createCounter are retained in memory by the closure returned to counterA.",
            input: "Run script",
            output: "11\n12\n12"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d2-1",
            question: "How do closures work in JavaScript and how can they cause memory leaks?",
            answer: "A closure retains a reference to its outer lexical environment. If a long-lived object (like a global listener or timer) retains a reference to a function, the outer variables cannot be garbage-collected, potentially leaking memory if large objects are captured unnecessarily.",
            keyPoints: ["Lexical environment references are kept alive", "Prevents garbage collection while referenced", "Clear references/listeners when finished"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d2-1",
            question: "What will this output?",
            code: `function outer() {
  var b = 2;
  function inner() {
    b++;
    var b = 3;
    console.log(b);
  }
  inner();
}
outer();`,
            options: ["3", "2", "NaN", "undefined"],
            correctAnswer: 0,
            explanation: "Inside inner(), 'var b' is hoisted and shadows the outer 'b'. Line 'var b = 3;' assigns 3 to this local 'b', which is then printed as 3."
          }
        ]
      },
      {
        id: "day2-topic2",
        title: "Currying, Partial Application & Memoization",
        durationMinutes: 40,
        summary: "Transforming multi-argument functions into sequential single-argument functions, and caching expensive computations.",
        definitions: [
          {
            term: "Currying",
            explanation: "Technique of transforming f(a,b,c) into callable chain f(a)(b)(c)."
          },
          {
            term: "Memoization",
            explanation: "Caching function results based on arguments to eliminate redundant executions."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Generic Memoization Function",
            code: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowFactorial = (n) => (n <= 1 ? 1 : n * slowFactorial(n - 1));
const fastFactorial = memoize(slowFactorial);
console.log(fastFactorial(5)); // 120 (computed)
console.log(fastFactorial(5)); // 120 (served instantly from cache)`,
            explanation: "The Map persists within the returned function's closure scope.",
            output: "120\n120"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d2-2",
            question: "Write an infinite currying function: add(1)(2)(3)...()",
            answer: "function add(a) { return function(b) { if (b === undefined) return a; return add(a + b); }; }",
            keyPoints: ["Recursively returns function until empty invocation", "Accumulates sum in closure"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d2-2",
            question: "What is currying primarily used for in functional JavaScript?",
            options: ["Modifying prototypes", "Function composition and specialized parameter re-use", "Memory compression", "DOM rendering"],
            correctAnswer: 1,
            explanation: "Currying enables easy partial application, reusable specialized functions, and clean function composition."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d2-1",
        question: "When is the lexical environment of a function destroyed?",
        options: [
          "Immediately when the function returns, regardless of active references",
          "Only when there are no active references to any functions or closures holding that scope",
          "When the page is refreshed",
          "Never, JS stores all scopes permanently"
        ],
        correctAnswer: 1,
        explanation: "Garbage collection reclaims memory once there are no reachable references to that environment."
      }
    ]
  },
  {
    dayNumber: 3,
    title: "Asynchronous JavaScript, Event Loop & Promises",
    module: "javascript",
    moduleName: "JavaScript Core & Advanced",
    primaryObjective: "Master the V8 event loop, call stack, microtask vs macrotask queue priority, Promise mechanics, and async/await error orchestration.",
    estimatedMinutes: 150,
    isSevenDayTrack: false,
    checklist: [
      "Trace execution order across Call Stack, Microtask Queue, and Macrotask Queue",
      "Contrast Promise.all, Promise.allSettled, Promise.race, and Promise.any",
      "Write a custom Promise polyfill or sleep/retry helper",
      "Handle async error propagation properly with try/catch and .catch()",
      "Understand why setTimeout(fn, 0) is never truly 0ms"
    ],
    topics: [
      {
        id: "day3-topic1",
        title: "The Event Loop, Microtasks vs Macrotasks",
        durationMinutes: 45,
        summary: "How single-threaded JavaScript handles non-blocking I/O through web APIs and priority queuing.",
        definitions: [
          {
            term: "Microtask Queue",
            explanation: "Highest priority queue (Promise.then, MutationObserver, queueMicrotask). Emptied completely before next macrotask runs."
          },
          {
            term: "Macrotask Queue",
            explanation: "Task queue for setTimeout, setInterval, setImmediate, and I/O callbacks."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Event Loop Execution Sequence Quiz",
            code: `console.log("1 - Sync start");

setTimeout(() => {
  console.log("2 - Timeout (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Promise then (Microtask 1)");
}).then(() => {
  console.log("4 - Promise then (Microtask 2)");
});

queueMicrotask(() => {
  console.log("5 - queueMicrotask");
});

console.log("6 - Sync end");`,
            explanation: "Synchronous code runs first (1, 6). Then the microtask queue is fully drained (3, 5, 4). Finally, the macrotask executes (2).",
            output: "1 - Sync start\n6 - Sync end\n3 - Promise then (Microtask 1)\n5 - queueMicrotask\n4 - Promise then (Microtask 2)\n2 - Timeout (Macrotask)"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d3-1",
            question: "Why do microtasks execute before macrotasks in the event loop?",
            answer: "The event loop specification mandates that after each task (or synchronous script turn) completes, the microtask queue must be completely drained before the engine proceeds to rendering or fetching the next macrotask.",
            keyPoints: ["Microtask queue is emptied before next macrotask", "Promise handlers run before setTimeout(..., 0)", "Starvation can occur if microtasks continuously queue more microtasks"],
            difficulty: "Associate",
            frequency: "Must Know"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d3-1",
            question: "Which of the following belongs to the microtask queue?",
            options: ["setTimeout", "setInterval", "Promise.then callback", "requestAnimationFrame"],
            correctAnswer: 2,
            explanation: "Promise callbacks registered via .then(), .catch(), or .finally() run in the microtask queue."
          }
        ]
      },
      {
        id: "day3-topic2",
        title: "Promise Combinators: all, allSettled, race, any",
        durationMinutes: 40,
        summary: "Orchestrating concurrent asynchronous requests safely in full stack applications.",
        definitions: [
          {
            term: "Promise.all",
            explanation: "Fails fast if any promise rejects. Resolves when all resolve."
          },
          {
            term: "Promise.allSettled",
            explanation: "Always waits for all promises to finish (either fulfilled or rejected) and returns an array of status objects."
          },
          {
            term: "Promise.race vs Promise.any",
            explanation: "race settles with first completed (success or error). any resolves with first successful resolution, only rejecting if all reject."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Resilient Fetch with Promise.allSettled",
            code: `async function fetchDashboardData(userId) {
  const [profileResult, ordersResult] = await Promise.allSettled([
    fetchProfile(userId),
    fetchOrders(userId)
  ]);

  return {
    profile: profileResult.status === 'fulfilled' ? profileResult.value : null,
    orders: ordersResult.status === 'fulfilled' ? ordersResult.value : []
  };
}`,
            explanation: "Prevents a failure in orders fetch from crashing the user profile view.",
            output: "Safe graceful degradation pattern"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d3-2",
            question: "What is the key difference between Promise.all and Promise.allSettled?",
            answer: "Promise.all rejects immediately upon the first rejected promise ('fail-fast'). Promise.allSettled waits for all promises to finish regardless of success or failure, returning an array of objects detailing { status: 'fulfilled', value } or { status: 'rejected', reason }.",
            keyPoints: ["Promise.all fails fast", "Promise.allSettled never rejects overall", "allSettled prevents partial batch drops"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d3-2",
            question: "When does Promise.any reject?",
            options: ["When any promise rejects", "When all promises reject with AggregateError", "It never rejects", "After 5000ms"],
            correctAnswer: 1,
            explanation: "Promise.any resolves with the first fulfilled promise, and only rejects if all input promises reject (yielding an AggregateError)."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d3-1",
        question: "What will await Promise.reject('error') do inside an async function without a try/catch block?",
        options: ["Silently continue", "Return null", "Throw an unhandled promise rejection error", "Return false"],
        correctAnswer: 2,
        explanation: "An unhandled rejected promise inside async throws and causes the returned promise to reject."
      }
    ]
  },
  {
    dayNumber: 4,
    title: "Prototypes, Prototypal Inheritance & 'this' Binding",
    module: "javascript",
    moduleName: "JavaScript Core & Advanced",
    primaryObjective: "Master __proto__, prototype chain resolution, explicit binding with call/apply/bind, new operator mechanics, and ES6 classes syntax under the hood.",
    estimatedMinutes: 130,
    isSevenDayTrack: false,
    checklist: [
      "Trace property lookup across prototype chain (__proto__)",
      "Explain 4 rules of 'this' binding: default, implicit, explicit, new",
      "Compare arrow functions 'this' with regular function 'this'",
      "Implement Function.prototype.myBind polyfill",
      "Demystify ES6 class transpilation into prototype functions"
    ],
    topics: [
      {
        id: "day4-topic1",
        title: "Prototypal Inheritance & The Prototype Chain",
        durationMinutes: 40,
        summary: "Every JavaScript object has an internal hidden [[Prototype]] link through which properties and methods are inherited.",
        definitions: [
          {
            term: "Prototype Chain",
            explanation: "Series of linked objects terminating at Object.prototype whose prototype is null."
          },
          {
            term: "Object.create(proto)",
            explanation: "Creates a new object whose [[Prototype]] is explicitly linked to proto."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Prototypal Inheritance with Constructor Functions",
            code: `function Developer(name, role) {
  this.name = name;
  this.role = role;
}

Developer.prototype.introduce = function() {
  return \`Hi, I'm \${this.name}, a \${this.role}.\`;
};

const dev = new Developer("Sarah", "Full Stack Engineer");
console.log(dev.introduce()); // "Hi, I'm Sarah, a Full Stack Engineer."
console.log(dev.__proto__ === Developer.prototype); // true
console.log(Developer.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (end of chain)`,
            explanation: "Methods defined on Developer.prototype are shared across all instances, saving memory.",
            output: "Hi, I'm Sarah, a Full Stack Engineer.\ntrue\ntrue\nnull"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d4-1",
            question: "What happens step-by-step when the 'new' keyword is invoked?",
            answer: "1. A new empty object is created in memory: {}.\n2. The object's [[Prototype]] is linked to the constructor function's prototype property.\n3. The constructor is executed with 'this' bound to the new object.\n4. If the constructor returns an object, that object is returned; otherwise, the newly created object is returned.",
            keyPoints: ["Creates new object", "Links prototype", "Binds this and executes constructor", "Returns object"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d4-1",
            question: "Where does property lookup terminate in the JavaScript prototype chain?",
            options: ["Function.prototype", "Object.prototype", "null", "undefined"],
            correctAnswer: 2,
            explanation: "Object.prototype.__proto__ is null, which signifies the absolute end of the prototype lookup chain."
          }
        ]
      },
      {
        id: "day4-topic2",
        title: "'this' Binding: call, apply, bind & Arrow Functions",
        durationMinutes: 35,
        summary: "Understanding how 'this' is resolved at runtime based on execution call site, and why arrow functions use lexical this.",
        definitions: [
          {
            term: "Explicit Binding",
            explanation: "Explicitly supplying the 'this' context via call(context, ...args), apply(context, [args]), or bind(context, ...args)."
          },
          {
            term: "Lexical 'this'",
            explanation: "Arrow functions do not have their own 'this'. They inherit 'this' from their enclosing lexical context at the time of definition."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "call, apply, and bind in action",
            code: `const user = { name: "Rohan" };

function greet(greeting, punctuation) {
  return \`\${greeting}, \${this.name}\${punctuation}\`;
}

// 1. call: arguments passed individually
console.log(greet.call(user, "Hello", "!")); // "Hello, Rohan!"

// 2. apply: arguments passed as array
console.log(greet.apply(user, ["Namaste", "!!"])); // "Namaste, Rohan!!"

// 3. bind: returns a new bound function
const boundGreet = greet.bind(user, "Welcome");
console.log(boundGreet(".")); // "Welcome, Rohan."`,
            explanation: "bind creates a permanent hard binding that cannot be overridden by subsequent call or apply invocations.",
            output: "Hello, Rohan!\nNamaste, Rohan!!\nWelcome, Rohan."
          }
        ],
        interviewQuestions: [
          {
            id: "q-d4-2",
            question: "Why can't arrow functions be used as constructors?",
            answer: "Arrow functions lack a [[Construct]] internal method and do not have a .prototype property. Calling 'new' on an arrow function throws a TypeError: ... is not a constructor.",
            keyPoints: ["No [[Construct]] internal slot", "No .prototype property", "Cannot be invoked with new"],
            difficulty: "Associate",
            frequency: "Must Know"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d4-2",
            question: "What is the output of this code?",
            code: `const obj = {
  num: 42,
  getNum: () => this.num
};
console.log(obj.getNum());`,
            options: ["42", "undefined", "TypeError", "NaN"],
            correctAnswer: 1,
            explanation: "The arrow function inherits 'this' from the enclosing global/module scope (where this.num is undefined), not the object literal."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d4-1",
        question: "What is returned if you call .bind(null) on a non-strict mode regular function?",
        options: ["'this' is set to null", "'this' defaults to the global window / global object", "Throws TypeError", "'this' is undefined"],
        correctAnswer: 1,
        explanation: "In non-strict mode, passing null or undefined to call/apply/bind causes 'this' to be substituted with the global object."
      }
    ]
  },
  {
    dayNumber: 5,
    title: "Modern ES6+ Features, Iterators & Advanced Patterns",
    module: "javascript",
    moduleName: "JavaScript Core & Advanced",
    primaryObjective: "Master destructuring, rest/spread mechanics, Symbols, WeakMap/WeakSet for garbage collection, and Generator functions for lazy evaluation.",
    estimatedMinutes: 120,
    isSevenDayTrack: false,
    checklist: [
      "Use nested and alias object destructuring with default fallbacks",
      "Explain shallow copy vs deep clone with structuredClone vs JSON parse",
      "Understand Symbol uniqueness and well-known symbols (Symbol.iterator)",
      "Leverage WeakMap for private metadata and memory leak prevention",
      "Write generators (function*) with yield for pagination and streaming"
    ],
    topics: [
      {
        id: "day5-topic1",
        title: "Deep Destructuring, Spread, and Object Cloning",
        durationMinutes: 30,
        summary: "Modern syntactic constructs and safely handling nested state objects.",
        definitions: [
          {
            term: "structuredClone()",
            explanation: "Native web and Node.js API to create true deep copies of complex objects, circular references, Dates, and Sets."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Advanced Destructuring and structuredClone",
            code: `const response = {
  data: {
    user: { id: 101, username: "dev_ace", profile: { role: "admin" } }
  },
  status: 200
};

// Aliasing and nested extraction
const { data: { user: { username, profile: { role: userRole } } }, status } = response;
console.log(username, userRole, status); // dev_ace admin 200

// Safe deep cloning
const original = { date: new Date(), map: new Map([["key", "value"]]) };
const cloned = structuredClone(original);
console.log(cloned.date instanceof Date); // true (preserved Date type unlike JSON.parse)`,
            output: "dev_ace admin 200\ntrue"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d5-1",
            question: "What are the limitations of using JSON.parse(JSON.stringify(obj)) for deep cloning?",
            answer: "It drops functions, undefined, and Symbols. It converts Dates into strings, converts RegExp into empty objects, converts Maps/Sets into empty objects, and throws a TypeError if circular references exist. structuredClone() solves these issues.",
            keyPoints: ["Drops undefined, functions, symbols", "Corrupts Dates, Maps, Sets", "Throws on circular references"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d5-1",
            question: "What is the primary difference between Map and WeakMap?",
            options: [
              "Map only accepts numbers as keys",
              "WeakMap keys must be objects and are held weakly, allowing garbage collection",
              "WeakMap is iterable with for...of",
              "WeakMap has a .size property"
            ],
            correctAnswer: 1,
            explanation: "WeakMap keys must be objects and do not prevent garbage collection if no other references exist. WeakMaps cannot be enumerated."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d5-1",
        question: "Which well-known Symbol makes an object iterable with for...of?",
        options: ["Symbol.hasInstance", "Symbol.iterator", "Symbol.toPrimitive", "Symbol.species"],
        correctAnswer: 1,
        explanation: "[Symbol.iterator] specifies the default iterator for an object consumed by for...of and the spread operator."
      }
    ]
  },
  {
    dayNumber: 6,
    title: "DOM Internals, Event Delegation, Debounce & Throttle",
    module: "javascript",
    moduleName: "JavaScript Core & Advanced",
    primaryObjective: "Master the DOM tree, Event Bubbling and Capturing, Event Delegation, and write production-grade Debounce and Throttle implementations.",
    estimatedMinutes: 140,
    isSevenDayTrack: false,
    checklist: [
      "Explain the 3 phases of DOM event propagation: Capturing, Target, Bubbling",
      "Implement high-performance Event Delegation for dynamic lists",
      "Write a bulletproof Debounce function with immediate execution option",
      "Write a Throttle function with trailing edge guarantee",
      "Compare requestAnimationFrame vs Throttle for scroll animations"
    ],
    topics: [
      {
        id: "day6-topic1",
        title: "Event Propagation: Bubbling, Capturing & Delegation",
        durationMinutes: 35,
        summary: "Understand how events travel down and bubble up the DOM, and how delegation handles thousands of items efficiently.",
        definitions: [
          {
            term: "Event Bubbling",
            explanation: "The event starts from the innermost target element and bubbles upwards to the root document."
          },
          {
            term: "Event Delegation",
            explanation: "Attaching a single event listener to a parent container to handle events triggered by any child matching a selector via event.target."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Event Delegation in Plain JavaScript",
            code: `// Container with 1,000 items
const listContainer = document.getElementById("todo-list");

listContainer.addEventListener("click", (event) => {
  const item = event.target.closest(".todo-item");
  if (!item) return; // Clicked outside any item

  if (event.target.matches(".delete-btn")) {
    const id = item.dataset.id;
    console.log("Delete item:", id);
  } else if (event.target.matches(".toggle-btn")) {
    item.classList.toggle("completed");
  }
});`,
            explanation: "Uses 1 listener instead of 1,000 listeners, saving substantial memory and handling newly appended items automatically.",
            output: "Clean memory profile, handles dynamic elements"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d6-1",
            question: "What is the difference between event.stopPropagation() and event.stopImmediatePropagation()?",
            answer: "event.stopPropagation() prevents the event from continuing to bubble or capture up/down the DOM tree. event.stopImmediatePropagation() additionally stops any other event listeners registered on the *same* element for that event type from running.",
            keyPoints: ["stopPropagation halts tree propagation", "stopImmediatePropagation halts other listeners on current element too"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d6-1",
            question: "What is event.currentTarget during an event callback?",
            options: [
              "The specific element that received the original user click",
              "The element to which the event handler is currently attached",
              "The window object",
              "The highest parent element in the DOM"
            ],
            correctAnswer: 1,
            explanation: "event.currentTarget always points to the element whose event listener triggered the callback, while event.target is the element that originated the event."
          }
        ]
      },
      {
        id: "day6-topic2",
        title: "Debounce and Throttle Implementation Deep-Dive",
        durationMinutes: 40,
        summary: "Rate-limiting function execution for search autocomplete, window resize, and scroll events.",
        definitions: [
          {
            term: "Debounce",
            explanation: "Delays execution until a specified quiet period has elapsed with no new invocations (e.g. search input)."
          },
          {
            term: "Throttle",
            explanation: "Guarantees execution at most once per specified time interval (e.g. scroll position tracking)."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Production Debounce and Throttle",
            code: `// Debounce implementation
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle implementation
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`,
            explanation: "Both rely on closures to store timer and throttling state flags.",
            output: "Rate limited invocation wrappers"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d6-2",
            question: "When would you choose throttle over debounce?",
            answer: "Use throttle when you want regular, periodic updates during an ongoing continuous stream of events (e.g., infinite scroll triggers, video progress updates, window resize layout recalculations). Use debounce when you only care about the final state after the user has completely stopped typing or resizing.",
            keyPoints: ["Throttle: periodic steady rate during active events", "Debounce: single run after action settles"],
            difficulty: "Associate",
            frequency: "Must Know"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d6-2",
            question: "For a real-time search input autocomplete, which pattern is optimal?",
            options: ["Debounce (300ms)", "Throttle (300ms)", "Immediate sync call on every keyup", "setInterval"],
            correctAnswer: 0,
            explanation: "Debounce waits for the user to pause typing before sending expensive API queries."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d6-1",
        question: "How do you listen for an event in the capturing phase instead of the bubbling phase?",
        options: [
          "element.addEventListener('click', handler, true)",
          "element.addEventListener('click:capture', handler)",
          "event.setCapture()",
          "Capturing cannot be listened to in modern browsers"
        ],
        correctAnswer: 0,
        explanation: "Passing true or { capture: true } as the third argument to addEventListener configures the listener for the capturing phase."
      }
    ]
  }
];
