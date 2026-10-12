import { StudyDay } from '../../types/roadmap';

export const day1Data: StudyDay = {
  dayNumber: 1,
  title: "JavaScript Fundamentals & Core Engine Mechanics",
  module: "javascript",
  moduleName: "JavaScript Core & Advanced",
  primaryObjective: "Master JS primitives, memory allocation, type coercion rules, execution contexts, scope resolution, hoisting mechanics, and fundamental array manipulation for associate technical interviews.",
  estimatedMinutes: 150,
  isSevenDayTrack: true,
  checklist: [
    "Differentiate var, let, and const in terms of scope, re-declaration, and Temporal Dead Zone (TDZ)",
    "Explain stack vs heap memory for primitives vs reference types",
    "Predict tricky type coercion expressions with + and - operators",
    "Compare == and === using the Abstract Equality Comparison Algorithm",
    "Trace variable and function hoisting in Global Execution Context",
    "Understand block vs function scoping rules",
    "Implement core array manipulations using slice, splice, map, and reduce",
    "Complete all 4 coding challenges and achieve 80%+ on Day 1 Assessment"
  ],
  topics: [
    {
      id: "day1-topic1",
      title: "Variables, Declarations & The Temporal Dead Zone (TDZ)",
      durationMinutes: 25,
      summary: "Understand how JavaScript allocates variables, the difference between var, let, and const, and why accessing variables before initialization triggers TDZ ReferenceErrors.",
      definitions: [
        {
          term: "Temporal Dead Zone (TDZ)",
          explanation: "The time window between entering a scope and the variable's physical declaration line where let and const reside in an uninitialized state. Accessing them throws ReferenceError."
        },
        {
          term: "Variable Shadowing",
          explanation: "When an inner scope variable shares the same identifier as an outer scope variable, masking the outer variable within that block."
        },
        {
          term: "Mutability vs Reassignment",
          explanation: "const prevents identifier re-binding, but does not freeze object property mutations unless Object.freeze() is invoked."
        }
      ],
      codeExamples: [
        {
          language: "javascript",
          title: "TDZ and Hoisting Behavior with let vs var",
          code: `// 1. var is hoisted and initialized to undefined
console.log(a); // Output: undefined
var a = 10;

// 2. let is hoisted into TDZ (uninitialized)
try {
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
} catch (err) {
  console.log("Caught:", err.message);
}
let b = 20;

// 3. const immutability nuance
const user = { name: "Alex" };
user.name = "Jordan"; // Allowed: mutating property
console.log(user.name); // 'Jordan'

// user = { name: "Taylor" }; // TypeError: Assignment to constant variable.`,
          explanation: "var variables are hoisted and immediately initialized with undefined. In contrast, let and const are hoisted to the top of their block, but remain in the TDZ until the execution thread reaches their actual initialization statement.",
          input: "Run script directly in Node or browser console",
          output: "undefined\nCaught: Cannot access 'b' before initialization\nJordan"
        }
      ],
      stepByStep: [
        {
          step: 1,
          title: "Lexical Scope Creation",
          description: "When the JavaScript engine parses a code block, it creates an Environment Record for that lexical block and registers all variable names."
        },
        {
          step: 2,
          title: "TDZ Entry",
          description: "Identifiers declared with 'let' and 'const' enter the Temporal Dead Zone in an uninitialized state immediately upon scope entry."
        },
        {
          step: 3,
          title: "Evaluation & Initialization",
          description: "When execution reaches the declaration line, the expression is evaluated and the variable exits TDZ, becoming safe to read."
        }
      ],
      commonMistakes: [
        {
          title: "Accidental TDZ in Default Function Parameters",
          brokenCode: `// Mistake: parameter y tries to evaluate x before x is assigned
function calculate(x = y, y = 5) {
  return x + y;
}
calculate(); // ReferenceError!`,
          fixedCode: `// Fix: evaluate default parameters in left-to-right dependency order
function calculate(x = 5, y = x * 2) {
  return x + y;
}
console.log(calculate()); // Output: 15`,
          bugExplanation: "Function default arguments have their own parameter scope evaluated left-to-right. Referencing a subsequent parameter before its definition triggers the TDZ."
        }
      ],
      practicalUseCases: [
        "Configuring immutable API endpoints and environment settings with Object.freeze(constConfig)",
        "Preventing accidental memory leaks and identifier pollution caused by global var declarations"
      ],
      interviewQuestions: [
        {
          id: "q-d1-1",
          question: "What is the difference between var, let, and const in terms of scope, hoisting, and re-declaration?",
          answer: "var has function/global scope, can be re-declared, and is hoisted and initialized to undefined. let and const are block-scoped, cannot be re-declared in the same scope, and are hoisted without initialization into the Temporal Dead Zone (TDZ). Furthermore, const cannot be reassigned once initialized.",
          keyPoints: ["var is function-scoped; let/const are block-scoped", "let/const reside in TDZ prior to evaluation", "const enforces reassignment immutability"],
          difficulty: "Associate",
          frequency: "Frequently Asked"
        },
        {
          id: "q-d1-2",
          question: "Can you explain what happens when you mutate a const object or array?",
          answer: "In JavaScript, const prevents reassignment of the variable binding, meaning you cannot point the identifier to a new memory address. However, it does not create a deeply immutable structure. Properties of an object or elements of an array stored in the heap can still be modified, added, or deleted.",
          keyPoints: ["Reference pointer is immutable, underlying heap data is mutable", "Use Object.freeze() for shallow immutability", "Use recursive deep freeze for nested objects"],
          difficulty: "Associate",
          frequency: "Core Standard"
        }
      ],
      quizQuestions: [
        {
          id: "mcq-d1-1",
          question: "What will be printed to the console?",
          code: `function test() {
  console.log(x);
  var x = 5;
}
test();`,
          options: ["5", "undefined", "ReferenceError: x is not defined", "null"],
          correctAnswer: 1,
          explanation: "Variables declared with 'var' are hoisted to the top of their enclosing function scope and initialized to 'undefined'."
        },
        {
          id: "mcq-d1-2",
          question: "What is the output of the following block?",
          code: `let x = 10;
{
  console.log(x);
  let x = 20;
}`,
          options: ["10", "20", "undefined", "ReferenceError: Cannot access 'x' before initialization"],
          correctAnswer: 3,
          explanation: "The inner block declares 'let x', which shadows the outer 'x' and creates a new TDZ for that block. Accessing 'x' before the inner 'let x = 20' throws a ReferenceError."
        }
      ]
    },
    {
      id: "day1-topic2",
      title: "Data Types, Stack vs Heap & Type Coercion Rules",
      durationMinutes: 30,
      summary: "Explore primitive vs reference types, deep memory representation, the typeof null bug, and JavaScript's explicit vs implicit type coercion algorithm.",
      definitions: [
        {
          term: "7 Primitive Types",
          explanation: "string, number, bigint, boolean, undefined, symbol, null. Stored directly by value in execution stack memory."
        },
        {
          term: "Reference Types",
          explanation: "Objects, Arrays, Functions. Stored in heap memory; variables store a reference pointer addressing that heap location."
        },
        {
          term: "ToPrimitive Algorithm",
          explanation: "Internal ES specification procedure that converts an object into a primitive value using valueOf() and toString() methods."
        }
      ],
      codeExamples: [
        {
          language: "javascript",
          title: "Implicit Type Coercion and Equality Quirks",
          code: `// Addition operator with strings triggers string concatenation
console.log("5" + 2);      // "52" (number 2 coerced to string)
console.log(5 + "2");      // "52"

// Subtraction, multiplication, division coerce to numbers
console.log("5" - 2);      // 3
console.log("10" * "2");   // 20
console.log("10" / "2");   // 5
console.log("5" - "hello");// NaN

// Boolean coercion
console.log(Boolean(""));  // false (empty string is falsy)
console.log(Boolean("0")); // true (non-empty string is truthy)
console.log(Boolean([]));  // true (all objects are truthy)
console.log(Boolean({}));  // true

// Tricky comparisons
console.log([] == 0);      // true: [].toString() is "", "" == 0 becomes 0 == 0
console.log([] == ![]);    // true: ![] is false, [] == false becomes "" == 0 -> 0 == 0`,
          explanation: "The '+' operator is overloaded for both arithmetic addition and string concatenation. If either operand is a string, it converts the other operand to a string. Arithmetic operators like '-', '*', '/' always coerce both operands into numbers.",
          input: "Run in Node.js",
          output: "52\n3\n20\n5\nNaN\nfalse\ntrue\ntrue\ntrue\ntrue\ntrue"
        }
      ],
      commonMistakes: [
        {
          title: "Comparing Objects or Arrays with Equality Operators",
          brokenCode: `// Mistake: Developers expect array value comparison
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
console.log(arr1 == arr2);  // false!
console.log(arr1 === arr2); // false!`,
          fixedCode: `// Fix: Compare array elements or use JSON stringification / lodash isEqual
const areArraysEqual = (a, b) => 
  a.length === b.length && a.every((val, idx) => val === b[idx]);

console.log(areArraysEqual(arr1, arr2)); // true`,
          bugExplanation: "In JavaScript, comparing two objects/arrays checks reference identity (memory addresses in the heap), never internal structure or values."
        }
      ],
      practicalUseCases: [
        "Defensive input parsing in REST API request bodies (e.g. converting req.query.limit from string to number with Number() or parseInt())",
        "Safe truthy/falsy validation when verifying optional user configurations"
      ],
      interviewQuestions: [
        {
          id: "q-d1-3",
          question: "Why does typeof null return 'object'?",
          answer: "This is a historical bug in the original 1995 JavaScript implementation. Values were stored in 32-bit units with a type tag in the lower bits. The type tag for 'object' was 000, and null was represented as a NULL pointer (all zeros), meaning it carried the 000 type tag. Changing it now would break millions of legacy web applications.",
          keyPoints: ["Historical 1995 engine bug", "Type tag 000 indicated object; null pointer had 000 tag", "Check null using (val === null)"],
          difficulty: "Associate",
          frequency: "Frequently Asked"
        },
        {
          id: "q-d1-4",
          question: "Explain the difference between == and === (Loose vs Strict Equality).",
          answer: "'===' checks both value and type without performing type conversion. If types differ, it returns false immediately. '==' invokes the Abstract Equality Comparison Algorithm, which attempts to coerce operands of differing types into matching primitives (usually numbers) before evaluating equality.",
          keyPoints: ["=== strictly evaluates without type coercion", "== uses Abstract Equality Algorithm coercing to numbers", "Always prefer === in modern codebases"],
          difficulty: "Junior",
          frequency: "Must Know"
        }
      ],
      quizQuestions: [
        {
          id: "mcq-d1-3",
          question: "What is the result of typeof NaN in JavaScript?",
          options: ["'undefined'", "'nan'", "'number'", "'object'"],
          correctAnswer: 2,
          explanation: "In JavaScript, NaN stands for 'Not a Number', but its technical data type is number (representing an unrepresentable or failed numeric calculation)."
        },
        {
          id: "mcq-d1-4",
          question: "What will console.log(1 + 2 + '3') output?",
          options: ["'123'", "'33'", "'6'", "NaN"],
          correctAnswer: 1,
          explanation: "JavaScript evaluates left to right: 1 + 2 evaluates to number 3. Next, 3 + '3' encounters a string operand, triggering string concatenation resulting in '33'."
        }
      ]
    },
    {
      id: "day1-topic3",
      title: "Control Flow, Loops & Short-Circuit Operators",
      durationMinutes: 25,
      summary: "Master logical operators (&&, ||, ??), switch statements, for...of vs for...in loops, and early-return patterns for clean code.",
      definitions: [
        {
          term: "Nullish Coalescing (??)",
          explanation: "Returns the right-hand operand only if the left-hand operand is null or undefined (unlike || which triggers on 0, false, or '')."
        },
        {
          term: "Short-Circuit Evaluation",
          explanation: "Evaluation stops as soon as the final truth value is determined. With &&, stops at first falsy value. With ||, stops at first truthy value."
        },
        {
          term: "for...of vs for...in",
          explanation: "for...of iterates over iterable values (Array, Set, Map, String). for...in iterates over enumerable property keys of an object."
        }
      ],
      codeExamples: [
        {
          language: "javascript",
          title: "Logical OR vs Nullish Coalescing Operator",
          code: `const config = {
  timeout: 0,
  retries: null,
  debug: false
};

// || treats 0 and false as falsy!
const timeoutOR = config.timeout || 3000;
console.log("Timeout with ||:", timeoutOR); // 3000 (BUG: overwritten valid 0!)

// ?? only triggers on null or undefined!
const timeoutNC = config.timeout ?? 3000;
console.log("Timeout with ??:", timeoutNC); // 0 (CORRECT)

const retriesNC = config.retries ?? 3;
console.log("Retries with ??:", retriesNC); // 3 (null coalesced)

const debugNC = config.debug ?? true;
console.log("Debug with ??:", debugNC);     // false (preserved boolean false)`,
          explanation: "The nullish coalescing operator '??' was introduced in ES2020 specifically to handle zero, empty string, and false correctly without falling back like '||'.",
          input: "Run script",
          output: "Timeout with ||: 3000\nTimeout with ??: 0\nRetries with ??: 3\nDebug with ??: false"
        }
      ],
      commonMistakes: [
        {
          title: "Using for...in to iterate over an Array",
          brokenCode: `// Mistake: for...in iterates string keys and prototype properties
const arr = [10, 20, 30];
arr.customProp = "extra";

for (const index in arr) {
  console.log(typeof index, index); // 'string' '0', '1', '2', 'customProp'
}`,
          fixedCode: `// Fix: Use for...of for iterable array values
const arr = [10, 20, 30];
for (const val of arr) {
  console.log(val); // 10, 20, 30
}`,
          bugExplanation: "for...in iterates over all enumerable property names (including prototype additions) and yields indices as strings, making it unsuitable for array iteration."
        }
      ],
      interviewQuestions: [
        {
          id: "q-d1-5",
          question: "When should you use ?? (Nullish Coalescing) instead of || (Logical OR)?",
          answer: "Use '??' when 0, false, or '' (empty string) are valid business values that should not be overwritten by fallback defaults. '||' falls back on any falsy value, while '??' strictly checks for null or undefined.",
          keyPoints: ["|| triggers on 6 falsy values: false, 0, '', null, undefined, NaN", "?? triggers only on null and undefined", "Essential for numeric configs where 0 is valid"],
          difficulty: "Associate",
          frequency: "Frequently Asked"
        }
      ],
      quizQuestions: [
        {
          id: "mcq-d1-5",
          question: "What is logged to the console by: console.log(null || 'A' && 'B');",
          options: ["null", "'A'", "'B'", "false"],
          correctAnswer: 2,
          explanation: "'&&' has higher operator precedence than '||'. 'A' && 'B' evaluates to 'B' (since 'A' is truthy). Then null || 'B' evaluates to 'B'."
        }
      ]
    },
    {
      id: "day1-topic4",
      title: "Functions, Scope Chain & Hoisting Mechanics",
      durationMinutes: 35,
      summary: "Deep dive into Function Declarations vs Expressions, arrow function lexical binding, lexical scoping, and how the Global Execution Context manages memory allocation.",
      definitions: [
        {
          term: "Execution Context",
          explanation: "An environment created by the JS engine containing Variable Environment, Lexical Environment, and 'this' binding. Has Creation Phase and Execution Phase."
        },
        {
          term: "Scope Chain",
          explanation: "The hierarchical resolution path a JavaScript engine traverses from the innermost local scope up to the global scope to resolve an identifier."
        },
        {
          term: "Function Hoisting",
          explanation: "Function declarations are hoisted in full during the creation phase and can be invoked before their definition in the code."
        }
      ],
      codeExamples: [
        {
          language: "javascript",
          title: "Function Declaration vs Expression Hoisting",
          code: `// 1. Function Declaration can be called before definition
greet(); // "Hello from declaration!"
function greet() {
  console.log("Hello from declaration!");
}

// 2. Function Expression assigned to var
try {
  sayHi(); // TypeError: sayHi is not a function (sayHi is undefined during call)
} catch (e) {
  console.log("Error:", e.message);
}
var sayHi = function() {
  console.log("Hi!");
};

// 3. Arrow function assigned to const (TDZ)
try {
  sayHey(); // ReferenceError: Cannot access 'sayHey' before initialization
} catch (e) {
  console.log("Error:", e.message);
}
const sayHey = () => console.log("Hey!");`,
          explanation: "Function declarations are hoisted with their entire function body. Function expressions or arrow functions stored in variables follow the variable's hoisting rules (var is undefined, const/let is in TDZ).",
          input: "Run script",
          output: "Hello from declaration!\nError: sayHi is not a function\nError: Cannot access 'sayHey' before initialization"
        }
      ],
      commonMistakes: [
        {
          title: "The Classic for Loop with var and setTimeout",
          brokenCode: `// Mistake: var has function scope, loop finishes before setTimeout executes
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 10);
}
// Output: 3, 3, 3`,
          fixedCode: `// Fix 1: Use block-scoped let (creates a new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("let i:", i), 10);
}
// Output: 0, 1, 2`,
          bugExplanation: "var creates a single shared variable 'i' across iterations. By the time the async callbacks run, the loop has completed and 'i' equals 3. 'let' creates a new lexical binding for each loop iteration."
        }
      ],
      interviewQuestions: [
        {
          id: "q-d1-6",
          question: "Explain the two phases of JavaScript Execution Context creation.",
          answer: "Phase 1: Creation Phase (Memory Allocation) — The engine scans code, allocates memory for variables and functions. var is set to undefined, let/const enter TDZ, function declarations are stored in memory. The 'this' value and Outer Environment Reference are determined.\nPhase 2: Execution Phase — Code is executed line by line, assigning real values to variables and evaluating expressions.",
          keyPoints: ["Creation phase allocates memory and builds scope chain", "Execution phase runs instructions sequentially", "Hoisting is the physical manifestation of Phase 1"],
          difficulty: "Associate",
          frequency: "Must Know"
        }
      ],
      quizQuestions: [
        {
          id: "mcq-d1-6",
          question: "What is printed by this code?",
          code: `var x = 1;
function outer() {
  var x = 2;
  function inner() {
    x++;
    console.log(x);
    var x = 10;
  }
  inner();
}
outer();`,
          options: ["3", "11", "NaN", "ReferenceError"],
          correctAnswer: 2,
          explanation: "Inside 'inner()', 'var x' is hoisted to the top of 'inner()' and initialized to undefined. Evaluating 'x++' computes undefined + 1 which equals NaN. Then x is printed as NaN."
        }
      ]
    },
    {
      id: "day1-topic5",
      title: "Essential Array Methods & Functional Transforms",
      durationMinutes: 35,
      summary: "Understand mutating vs non-mutating array operations, deep mastery of map, filter, reduce, slice, splice, and writing custom array polyfills.",
      definitions: [
        {
          term: "Mutating vs Pure Methods",
          explanation: "Mutating methods modify the original array in place (push, pop, shift, unshift, splice, sort, reverse). Pure methods return a brand new array (slice, map, filter, concat, flat)."
        },
        {
          term: "Array.prototype.reduce()",
          explanation: "Executes a user-supplied reducer callback function on each element of the array, resulting in a single cumulative output value."
        },
        {
          term: "slice vs splice",
          explanation: "slice(start, end) returns a shallow copy without modifying original. splice(start, deleteCount, ...items) modifies the original array and returns removed items."
        }
      ],
      codeExamples: [
        {
          language: "javascript",
          title: "Transforming Collections with map, filter, and reduce",
          code: `const transactions = [
  { id: 1, type: "income", amount: 2500, category: "salary" },
  { id: 2, type: "expense", amount: 450, category: "groceries" },
  { id: 3, type: "expense", amount: 120, category: "utilities" },
  { id: 4, type: "income", amount: 350, category: "freelance" }
];

// 1. Calculate net balance with reduce
const netBalance = transactions.reduce((acc, curr) => {
  return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
}, 0);
console.log("Net Balance: $" + netBalance); // $2280

// 2. Group expenses by category
const expensesByCategory = transactions
  .filter(t => t.type === "expense")
  .reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
console.log("Expenses by Category:", expensesByCategory);`,
          explanation: "Functional methods allow declarative, chainable transformations. reduce() is the most powerful array method as map and filter can both be implemented using reduce.",
          input: "Run script",
          output: "Net Balance: $2280\nExpenses by Category: { groceries: 450, utilities: 120 }"
        }
      ],
      codingChallenges: [
        {
          id: "chal-d1-1",
          title: "Implement Array.prototype.myReduce Polyfill",
          description: "Write a polyfill function for reduce that handles an optional initial value and throws a TypeError when executed on an empty array with no initial value.",
          difficulty: "Medium",
          starterCode: `Array.prototype.myReduce = function(callback, initialValue) {
  // Your implementation here
};`,
          hints: [
            "Check if 'this' is empty and initialValue is undefined; if so, throw a TypeError.",
            "If initialValue is provided, start accumulator at initialValue and index at 0.",
            "If initialValue is not provided, start accumulator at this[0] and index at 1.",
            "Remember to handle sparse arrays with 'index in this'."
          ],
          solution: `Array.prototype.myReduce = function(callback, initialValue) {
  if (this == null) throw new TypeError("Array.prototype.myReduce called on null or undefined");
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");

  const array = Object(this);
  const length = array.length >>> 0;
  let index = 0;
  let accumulator;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // Find first defined element
    while (index < length && !(index in array)) {
      index++;
    }
    if (index >= length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = array[index++];
  }

  for (; index < length; index++) {
    if (index in array) {
      accumulator = callback(accumulator, array[index], index, array);
    }
  }

  return accumulator;
};`,
          explanation: "A robust reduce polyfill properly adheres to the ECMAScript specification: handling sparse arrays, checking argument length for initialValue, and throwing appropriate TypeErrors.",
          testCases: [
            { input: "[1, 2, 3, 4].myReduce((a, b) => a + b, 0)", output: "10" },
            { input: "['a', 'b', 'c'].myReduce((a, b) => a + b)", output: "'abc'" }
          ]
        },
        {
          id: "chal-d1-2",
          title: "Flatten a Nested Array Without flat()",
          description: "Write a function flattenArray(arr) that takes a deeply nested array of arbitrary depth and returns a 1-dimensional flattened array.",
          difficulty: "Easy",
          starterCode: `function flattenArray(arr) {
  // Implement recursive or iterative flattening
}`,
          hints: [
            "You can use recursion with Array.isArray() and reduce().",
            "Alternatively, use a stack/queue for an iterative approach."
          ],
          solution: `function flattenArray(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}`,
          explanation: "Using reduce with Array.isArray() checks each item: if it is an array, we recursively flatten it; otherwise, we append the item into the accumulator.",
          testCases: [
            { input: "flattenArray([1, [2, [3, 4], 5], 6])", output: "[1, 2, 3, 4, 5, 6]" },
            { input: "flattenArray([[1], [[2]], 3])", output: "[1, 2, 3]" }
          ]
        }
      ],
      practicalUseCases: [
        "Normalizing nested API responses into indexed client state dictionaries",
        "Filtering and computing financial cart summaries in e-commerce applications"
      ],
      interviewQuestions: [
        {
          id: "q-d1-7",
          question: "What is the difference between slice() and splice()?",
          answer: "slice(start, end) is non-mutating; it extracts a shallow slice of an array and returns a new array without altering the original. splice(start, deleteCount, ...items) is mutating; it removes, replaces, or adds elements directly to the original array and returns an array of the deleted elements.",
          keyPoints: ["slice() is immutable and returns a new array", "splice() mutates the original array in place", "splice() returns removed elements"],
          difficulty: "Junior",
          frequency: "Must Know"
        }
      ],
      quizQuestions: [
        {
          id: "mcq-d1-7",
          question: "What does [1, 2, 3].map(parseInt) return?",
          options: ["[1, 2, 3]", "[1, NaN, NaN]", "[1, 0, 0]", "TypeError"],
          correctAnswer: 1,
          explanation: "map passes 3 arguments: (element, index, array). parseInt accepts 2 arguments: (string, radix). Thus, it calls: parseInt(1, 0) -> 1; parseInt(2, 1) -> NaN (radix 1 is invalid); parseInt(3, 2) -> NaN ('3' is invalid in binary radix 2). Result is [1, NaN, NaN]."
        }
      ]
    }
  ],
  finalAssessmentQuestions: [
    {
      id: "fa-d1-1",
      question: "Which of the following creates a Temporal Dead Zone?",
      options: [
        "A variable declared with 'var' accessed before declaration",
        "A variable declared with 'let' or 'const' accessed before its declaration line",
        "A function declaration invoked before its line",
        "An undeclared global variable"
      ],
      correctAnswer: 1,
      explanation: "let and const declarations are hoisted but remain in the uninitialized Temporal Dead Zone until execution arrives at their declaration."
    },
    {
      id: "fa-d1-2",
      question: "What is the result of ([] == ![])?",
      options: ["false", "true", "TypeError", "undefined"],
      correctAnswer: 1,
      explanation: "![] evaluates to false (as [] is an object, hence truthy). Next, [] == false triggers coercion: false becomes 0, [].toString() becomes '', and '' coerced to number is 0. 0 == 0 evaluates to true."
    },
    {
      id: "fa-d1-3",
      question: "What does Object.is(NaN, NaN) evaluate to?",
      options: ["false", "true", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "Unlike === (where NaN === NaN is false), Object.is determines whether two values are the same value and correctly returns true for Object.is(NaN, NaN)."
    },
    {
      id: "fa-d1-4",
      question: "Which method modifies the original array in-place?",
      options: ["arr.concat([4, 5])", "arr.slice(0, 2)", "arr.splice(1, 1)", "arr.filter(x => x > 2)"],
      correctAnswer: 2,
      explanation: "splice() modifies the original array in place. concat(), slice(), and filter() return new arrays."
    },
    {
      id: "fa-d1-5",
      question: "What is the output of typeof (function() {})?",
      options: ["'object'", "'function'", "'undefined'", "'executable'"],
      correctAnswer: 1,
      explanation: "Functions in JavaScript are first-class callable objects, and typeof returns 'function'."
    }
  ]
};
