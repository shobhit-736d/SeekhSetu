import { StudyDay } from '../../types/roadmap';

export const dsaDays: StudyDay[] = [
  {
    dayNumber: 21,
    title: "Algorithmic Complexity, Two Pointers & Sliding Window",
    module: "dsa",
    moduleName: "Data Structures & Algorithms",
    primaryObjective: "Master Big-O asymptotic analysis, asymptotic bounds, Two Pointers pattern, and Fixed/Variable Sliding Window techniques for technical interviews.",
    estimatedMinutes: 150,
    isSevenDayTrack: true,
    checklist: [
      "Calculate Time & Space complexity for iterative, recursive, and logarithmic functions",
      "Implement Two Pointers pattern for sorted array problems (Two Sum II, 3Sum)",
      "Implement Sliding Window pattern for substring and subarray optimization",
      "Optimize O(n²) brute force solutions into O(n) linear scans",
      "Recognize space-time trade-offs using Hash Maps"
    ],
    topics: [
      {
        id: "day21-topic1",
        title: "Two Pointers Technique & Subarray Optimization",
        durationMinutes: 45,
        summary: "Using two synchronized index pointers to search pairs or partition arrays in O(n) time.",
        definitions: [
          {
            term: "Two Pointers",
            explanation: "Algorithmic pattern where two pointers iterate across the data structure in tandem (converging inward or fast/slow)."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Container With Most Water (Two Pointers O(n))",
            code: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const currentWater = width * currentHeight;
    maxWater = Math.max(maxWater, currentWater);

    // Move the pointer with the smaller height inward
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49`,
            output: "Time: O(n), Space: O(1)"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d21-1",
            question: "Why does the two-pointer approach work for finding pairs in a sorted array in O(n) instead of O(n²)?",
            answer: "Because the array is sorted, comparing the sum of elements at left and right pointers gives deterministic direction: if the sum is too large, the only way to decrease it is moving the right pointer left. If the sum is too small, move the left pointer right. This eliminates an entire dimension of search without backtracking.",
            keyPoints: ["Leverages sorted invariant", "Deterministic pointer movement", "Reduces O(n²) search space to O(n) linear pass"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d21-1",
            question: "What is the space complexity of an in-place two pointers algorithm?",
            options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
            correctAnswer: 2,
            explanation: "Two pointers only require two integer index variables (left, right), consuming O(1) constant auxiliary space."
          }
        ]
      },
      {
        id: "day21-topic2",
        title: "Sliding Window Pattern (Fixed vs Dynamic)",
        durationMinutes: 45,
        summary: "Maintaining a sliding subarray window to avoid re-computing overlapping subproblems.",
        definitions: [
          {
            term: "Sliding Window",
            explanation: "Maintains a subset window [left, right] that expands rightward and contracts leftward to meet criteria."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Longest Substring Without Repeating Characters (O(n))",
            code: `function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (charMap.has(char) && charMap.get(char) >= left) {
      // Contract window by jumping left pointer past duplicate
      left = charMap.get(char) + 1;
    }
    charMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")`,
            output: "Time: O(n), Space: O(min(m, n))"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d21-2",
            question: "When should you apply the Sliding Window technique?",
            answer: "Apply it when dealing with contiguous sequences (arrays or strings) where you are asked to find the minimum/maximum/target sub-range meeting specific criteria (e.g. longest substring, minimum sub-array sum).",
            keyPoints: ["Contiguous subarrays or substrings", "Optimal sub-range optimization", "Converts O(n²) nested checks to O(n) window slide"],
            difficulty: "Associate",
            frequency: "Must Know"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d21-2",
            question: "Why does the variable sliding window achieve O(n) time even though it has a nested while loop inside?",
            options: [
              "Because the inner loop runs only once",
              "Each element enters the window once (via right pointer) and leaves the window at most once (via left pointer)",
              "It uses WebAssembly",
              "It runs in parallel"
            ],
            correctAnswer: 1,
            explanation: "Amortized analysis: across the entire array, both right and left pointers increment at most n times, giving 2n operations = O(n)."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d21-1",
        question: "What is the time complexity of searching a key in a Hash Map on average?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
        correctAnswer: 1,
        explanation: "Hash maps achieve average O(1) constant time lookup through hashing and direct array bucket indexing."
      }
    ]
  },
  {
    dayNumber: 22,
    title: "Linked Lists, Stacks, Queues & Hash Collisions",
    module: "dsa",
    moduleName: "Data Structures & Algorithms",
    primaryObjective: "Master Singly/Doubly Linked Lists, Fast & Slow pointer (Floyd's Cycle Detection), Stack LIFO patterns, Monotonic Stacks, and Hash Table collision resolution (Chaining vs Open Addressing).",
    estimatedMinutes: 145,
    isSevenDayTrack: false,
    checklist: [
      "Reverse a Singly Linked List iteratively and recursively",
      "Detect cycle in a Linked List using Floyd's Tortoise and Hare algorithm",
      "Implement Valid Parentheses using a Stack",
      "Solve Next Greater Element using a Monotonic Stack",
      "Explain Separate Chaining vs Open Addressing (Linear Probing) for Hash Collisions"
    ],
    topics: [
      {
        id: "day22-topic1",
        title: "Linked Lists & Floyd's Cycle Detection",
        durationMinutes: 45,
        summary: "Pointer manipulation without contiguous memory allocation.",
        definitions: [
          {
            term: "Floyd's Cycle Algorithm",
            explanation: "Slow pointer moves 1 step; fast pointer moves 2 steps. If a cycle exists, they must collide."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Reverse Linked List (Iterative O(n) Time, O(1) Space)",
            code: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next; // Store next
    curr.next = prev;           // Reverse pointer
    prev = curr;                // Step prev forward
    curr = nextTemp;            // Step curr forward
  }

  return prev; // New head of reversed list
}`,
            output: "In-place reversal with 3 pointer variables"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d22-1",
            question: "Why use a Dummy Node when manipulating linked lists?",
            answer: "A dummy node (or sentinel node) placed before the head eliminates edge cases when modifying or deleting the head node itself, standardizing pointer updates across all positions.",
            keyPoints: ["Eliminates edge cases at head", "Simplifies deletion and insertion logic", "Returns dummy.next as result"],
            difficulty: "Junior",
            frequency: "Must Know"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d22-1",
            question: "What is the time complexity of deleting a node from a Singly Linked List given only a pointer to that node (not head)?",
            options: ["O(n)", "O(1) by copying next node's val and bypassing it", "Impossible", "O(log n)"],
            correctAnswer: 1,
            explanation: "Copying node.next.val into node.val and setting node.next = node.next.next deletes the node in O(1) without knowing head."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d22-1",
        question: "Which data structure is optimal for checking matching parentheses '( [ { } ] )'?",
        options: ["Queue", "Stack", "Binary Search Tree", "Linked List"],
        correctAnswer: 1,
        explanation: "A Stack enforces LIFO (Last-In, First-Out), matching inner-most closing brackets with the most recently opened bracket."
      }
    ]
  },
  {
    dayNumber: 23,
    title: "Trees, Binary Search Trees & Tree Traversals",
    module: "dsa",
    moduleName: "Data Structures & Algorithms",
    primaryObjective: "Master Binary Trees, BST invariant, Breadth-First Search (Level Order Traversal with Queue), Depth-First Search (Preorder, Inorder, Postorder), and Maximum Depth calculation.",
    estimatedMinutes: 140,
    isSevenDayTrack: false,
    checklist: [
      "Explain the BST property: left subtree < root < right subtree",
      "Why does Inorder traversal on a BST yield sorted ascending order?",
      "Implement BFS Level Order Traversal using a Queue",
      "Calculate Maximum Depth of Binary Tree using recursion and DFS",
      "Validate whether a Binary Tree is a valid BST (using min/max bounds)"
    ],
    topics: [
      {
        id: "day23-topic1",
        title: "Tree Traversals: BFS vs DFS & BST Validation",
        durationMinutes: 45,
        summary: "Navigating hierarchical tree structures systematically.",
        definitions: [
          {
            term: "Inorder Traversal",
            explanation: "Left -> Root -> Right. Traverses Binary Search Trees in strictly sorted ascending order."
          },
          {
            term: "Level Order Traversal (BFS)",
            explanation: "Visits nodes level by level horizontally using an iterative Queue."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Validate Binary Search Tree (O(n) Time, O(h) Space)",
            code: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;

  // Node value must strictly fall within valid bounds
  if (root.val <= min || root.val >= max) {
    return false;
  }

  // Left child must be < root.val, right child must be > root.val
  return isValidBST(root.left, min, root.val) && 
         isValidBST(root.right, root.val, max);
}`,
            output: "Recursively validates entire subtree bounds"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d23-1",
            question: "What is the difference between a Balanced Binary Tree and an Unbalanced Binary Tree in terms of search complexity?",
            answer: "In a balanced BST (like AVL or Red-Black tree), the height is O(log n), providing O(log n) search, insertion, and deletion. In a skewed/degenerate unbalanced BST (like inserting sorted numbers 1, 2, 3, 4), the tree degenerates into a linked list of height O(n), degrading search to O(n).",
            keyPoints: ["Balanced tree height: O(log n)", "Unbalanced tree height degrades to O(n)", "Search complexity is proportional to height"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d23-1",
            question: "Which traversal of a Binary Search Tree produces elements in sorted ascending order?",
            options: ["Preorder", "Inorder", "Postorder", "Level-order"],
            correctAnswer: 1,
            explanation: "Inorder traversal (Left, Root, Right) naturally processes BST nodes in sorted ascending order."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d23-1",
        question: "Which data structure is standard for implementing Breadth-First Search (BFS) in a tree?",
        options: ["Stack", "Queue", "Priority Heap", "Hash Set"],
        correctAnswer: 1,
        explanation: "A Queue (FIFO) processes nodes level-by-level in the exact order they are discovered."
      }
    ]
  },
  {
    dayNumber: 24,
    title: "Binary Search, Merge Sort & Recursion Mechanics",
    module: "dsa",
    moduleName: "Data Structures & Algorithms",
    primaryObjective: "Master Binary Search on sorted arrays, search space reduction, Merge Sort divide-and-conquer O(n log n), Quick Sort partitioning, and recursion call stack memory.",
    estimatedMinutes: 140,
    isSevenDayTrack: false,
    checklist: [
      "Implement Binary Search with integer overflow prevention: mid = left + Math.floor((right - left) / 2)",
      "Find first and last occurrence of an element in a sorted array with duplicates",
      "Trace Merge Sort divide, conquer, and combine phases",
      "Analyze Quick Sort worst case O(n²) vs average case O(n log n)",
      "Understand Recursion base cases and Stack Overflow prevention"
    ],
    topics: [
      {
        id: "day24-topic1",
        title: "Binary Search & Divide-and-Conquer Algorithms",
        durationMinutes: 45,
        summary: "Halving search space at each step to achieve logarithmic runtime.",
        definitions: [
          {
            term: "Binary Search",
            explanation: "Search algorithm on sorted collection with O(log n) time complexity by comparing target with middle element."
          }
        ],
        codeExamples: [
          {
            language: "javascript",
            title: "Binary Search (O(log n) Time, O(1) Space)",
            code: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Avoid integer overflow in typed languages
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid; // Found target index
    } else if (nums[mid] < target) {
      left = mid + 1; // Discard left half
    } else {
      right = mid - 1; // Discard right half
    }
  }

  return -1; // Target not found
}

console.log(binarySearch([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)); // 5`,
            output: "Index 5 in 3 comparisons"
          }
        ],
        interviewQuestions: [
          {
            id: "q-d24-1",
            question: "Why is Merge Sort preferred for Linked Lists, while Quick Sort is preferred for Arrays?",
            answer: "Merge Sort accesses elements sequentially without needing random access indexing, making it ideal for Linked Lists. Quick Sort relies on in-place element swapping and random access memory cache locality, making it highly efficient on arrays with O(1) auxiliary space.",
            keyPoints: ["Merge Sort does not need random access", "Quick Sort has superior CPU cache locality on arrays", "Merge Sort is guaranteed O(n log n) and stable"],
            difficulty: "Associate",
            frequency: "Frequently Asked"
          }
        ],
        quizQuestions: [
          {
            id: "mcq-d24-1",
            question: "What is the worst-case time complexity of Quick Sort?",
            options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
            correctAnswer: 1,
            explanation: "If the chosen pivot is repeatedly the extreme element (e.g. smallest or largest in an already sorted array), Quick Sort degrades to O(n²)."
          }
        ]
      }
    ],
    finalAssessmentQuestions: [
      {
        id: "fa-d24-1",
        question: "How many comparisons does Binary Search require to search an array of 1,000,000 items in worst case?",
        options: ["1,000,000", "500,000", "~20 comparisons", "~100 comparisons"],
        correctAnswer: 2,
        explanation: "log₂(1,000,000) is approximately 19.93, requiring at most 20 comparisons."
      }
    ]
  }
];
