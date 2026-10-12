import { CodingQuestion } from '../types/placement';

export const codingQuestionsList: CodingQuestion[] = [
  // 1. ARRAYS - Two Sum
  {
    id: 'code-arr-1',
    title: 'Pair With Target Sum (Two Sum)',
    slug: 'pair-with-target-sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    tags: ['Hash Table', 'Array', 'Two Pointers'],
    companies: ['Amazon', 'Google', 'TCS Digital', 'Infosys DSE'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order (indices formatted as an array/list).`,
    inputFormat: 'nums = [2,7,11,15], target = 9',
    outputFormat: '[0,1]',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterTemplates: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (seen.count(diff)) {
                return {seen[diff], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      sql: `-- SQL problem variant: Find pairs with matching target
SELECT a.id AS id1, b.id AS id2
FROM Numbers a
JOIN Numbers b ON a.id < b.id AND a.val + b.val = 9;`
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        isHidden: false
      },
      {
        id: 'tc-2',
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        explanation: 'nums[1] + nums[2] == 2 + 4 == 6, we return [1, 2].',
        isHidden: false
      },
      {
        id: 'tc-3',
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        explanation: '3 + 3 == 6, we return [0, 1].',
        isHidden: false
      },
      {
        id: 'tc-4',
        input: 'nums = [-1,-2,-3,-4,-5], target = -8',
        expectedOutput: '[2,4]',
        explanation: 'nums[2] (-3) + nums[4] (-5) == -8.',
        isHidden: true
      },
      {
        id: 'tc-5',
        input: 'nums = [1000000000, -1000000000, 5, 10], target = 0',
        expectedOutput: '[0,1]',
        explanation: 'Handles large signed integer inputs.',
        isHidden: true
      }
    ],
    hints: [
      'A brute force O(N^2) checks every pair, but can we remember elements we have already inspected?',
      'Use a Hash Map / Dictionary to store each number and its index as you iterate.',
      'Check if target - currentElement exists in the map in O(1) time.'
    ],
    solution: {
      approach: 'Hash Map Single Pass: We maintain a hash table of visited numbers mapping value -> index. For each number x, we look up whether (target - x) is already present in the map.',
      timeComplexity: 'O(N) - We traverse the list containing N elements exactly once. Each hash table lookup takes O(1) amortized time.',
      spaceComplexity: 'O(N) - In the worst case, the hash map stores up to N elements.',
      code: {
        javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) return new int[] { map.get(comp), i };
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int diff = target - nums[i];
        if (seen.find(diff) != seen.end()) return {seen[diff], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
        sql: `SELECT a.id, b.id FROM Numbers a JOIN Numbers b ON a.id < b.id WHERE a.val + b.val = :target;`
      }
    },
    acceptanceRate: 53.4
  },

  // 2. ARRAYS - Best Time to Buy and Sell Stock
  {
    id: 'code-arr-2',
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Easy',
    topic: 'Arrays',
    tags: ['Array', 'Dynamic Programming', 'Sliding Window'],
    companies: ['Amazon', 'Microsoft', 'Cognizant', 'Wipro Turbo'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    inputFormat: 'prices = [7,1,5,3,6,4]',
    outputFormat: '5',
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    starterTemplates: {
      javascript: `function maxProfit(prices) {
  // Write your solution here
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
  }
  return maxProfit;
}`,
      python: `def max_profit(prices):
    min_price = float('inf')
    max_p = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_p:
            max_p = p - min_price
    return max_p`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) minPrice = price;
            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
        }
        return maxProfit;
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxP = 0;
        for (int p : prices) {
            minPrice = min(minPrice, p);
            maxP = max(maxP, p - minPrice);
        }
        return maxP;
    }
};`,
      sql: `-- Not applicable directly`
    },
    testCases: [
      {
        id: 'tc-stock-1',
        input: 'prices = [7,1,5,3,6,4]',
        expectedOutput: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.',
        isHidden: false
      },
      {
        id: 'tc-stock-2',
        input: 'prices = [7,6,4,3,1]',
        expectedOutput: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.',
        isHidden: false
      },
      {
        id: 'tc-stock-3',
        input: 'prices = [2,4,1]',
        expectedOutput: '2',
        explanation: 'Buy at 2 and sell at 4.',
        isHidden: true
      }
    ],
    hints: [
      'Keep track of the minimum price encountered so far as you iterate through the days.',
      'At each day, calculate the potential profit if you were to sell today: price - minPrice.'
    ],
    solution: {
      approach: 'Greedy One-Pass: Maintain the lowest purchase price observed up to the current day. Calculate the profit if sold today, updating maximum profit accordingly.',
      timeComplexity: 'O(N) - Single pass through the prices array.',
      spaceComplexity: 'O(1) - Only two scalar tracking variables.',
      code: {
        javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) minPrice = prices[i];
    else if (prices[i] - minPrice > maxProfit) maxProfit = prices[i] - minPrice;
  }
  return maxProfit;
}`,
        python: `def max_profit(prices):
    min_p, max_p = float('inf'), 0
    for p in prices:
        if p < min_p: min_p = p
        elif p - min_p > max_p: max_p = p - min_p
    return max_p`,
        java: `public int maxProfit(int[] prices) {
    int min = Integer.MAX_VALUE, max = 0;
    for (int p : prices) {
        min = Math.min(min, p);
        max = Math.max(max, p - min);
    }
    return max;
}`,
        cpp: `int maxProfit(vector<int>& prices) {
    int minVal = INT_MAX, ans = 0;
    for (int x : prices) {
        minVal = min(minVal, x);
        ans = max(ans, x - minVal);
    }
    return ans;
}`,
        sql: `SELECT 0;`
      }
    },
    acceptanceRate: 54.1
  },

  // 3. ARRAYS - Maximum Subarray (Kadane's Algorithm)
  {
    id: 'code-arr-3',
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    slug: 'maximum-subarray-kadane',
    difficulty: 'Medium',
    topic: 'Arrays',
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    companies: ['Microsoft', 'Amazon', 'Adobe', 'TCS Prime'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
    inputFormat: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
    outputFormat: '6',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    starterTemplates: {
      javascript: `function maxSubArray(nums) {
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    if (maxCurrent > maxGlobal) maxGlobal = maxCurrent;
  }
  return maxGlobal;
}`,
      python: `def max_sub_array(nums):
    current_sum = nums[0]
    best_sum = nums[0]
    for x in nums[1:]:
        current_sum = max(x, current_sum + x)
        best_sum = max(best_sum, current_sum)
    return best_sum`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxCur = nums[0], maxAll = nums[0];
        for (int i = 1; i < nums.length; i++) {
            maxCur = Math.max(nums[i], maxCur + nums[i]);
            maxAll = Math.max(maxAll, maxCur);
        }
        return maxAll;
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0], res = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            cur = max(nums[i], cur + nums[i]);
            res = max(res, cur);
        }
        return res;
    }
};`,
      sql: `-- SQL analytical window variation`
    },
    testCases: [
      {
        id: 'tc-kad-1',
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        expectedOutput: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
        isHidden: false
      },
      {
        id: 'tc-kad-2',
        input: 'nums = [1]',
        expectedOutput: '1',
        explanation: 'Single element array.',
        isHidden: false
      },
      {
        id: 'tc-kad-3',
        input: 'nums = [5,4,-1,7,8]',
        expectedOutput: '23',
        explanation: 'The entire array adds to 23.',
        isHidden: false
      },
      {
        id: 'tc-kad-4',
        input: 'nums = [-5,-2,-8,-1]',
        expectedOutput: '-1',
        explanation: 'All negative numbers: maximum is the single largest negative number.',
        isHidden: true
      }
    ],
    hints: [
      'If the current running sum becomes negative, would continuing with it help or hurt the subsequent subarray?',
      'Kadane’s formula: currentMax = max(nums[i], currentMax + nums[i]).'
    ],
    solution: {
      approach: 'Kadane’s Algorithm: At each index, decide whether to append nums[i] to the existing running subarray or start a fresh subarray at nums[i].',
      timeComplexity: 'O(N) - Linear single pass.',
      spaceComplexity: 'O(1) - Constant auxiliary space.',
      code: {
        javascript: `function maxSubArray(nums) {
  let curr = nums[0], total = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    total = Math.max(total, curr);
  }
  return total;
}`,
        python: `def max_sub_array(nums):
    curr = total = nums[0]
    for x in nums[1:]:
        curr = max(x, curr + x)
        total = max(total, curr)
    return total`,
        java: `public int maxSubArray(int[] nums) {
    int cur = nums[0], max = nums[0];
    for (int i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        max = Math.max(max, cur);
    }
    return max;
}`,
        cpp: `int maxSubArray(vector<int>& nums) {
    int cur = nums[0], maxAns = nums[0];
    for (int i = 1; i < nums.size(); ++i) {
        cur = max(nums[i], cur + nums[i]);
        maxAns = max(maxAns, cur);
    }
    return maxAns;
}`,
        sql: `SELECT 0;`
      }
    },
    acceptanceRate: 51.0
  },

  // 4. STRINGS - Valid Anagram
  {
    id: 'code-str-1',
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    topic: 'Strings',
    tags: ['Hash Table', 'String', 'Sorting'],
    companies: ['Google', 'Accenture', 'TCS', 'Capgemini'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    inputFormat: 's = "anagram", t = "nagaram"',
    outputFormat: 'true',
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    starterTemplates: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const char of s) count[char] = (count[char] || 0) + 1;
  for (const char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,
      python: `def is_anagram(s, t):
    if len(s) != len(t): return False
    from collections import Counter
    return Counter(s) == Counter(t)`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--freq[c - 'a'] < 0) return false;
        }
        return true;
    }
}`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        vector<int> count(26, 0);
        for (char c : s) count[c - 'a']++;
        for (char c : t) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
};`,
      sql: `-- SQL string equivalence`
    },
    testCases: [
      {
        id: 'tc-ana-1',
        input: 's = "anagram", t = "nagaram"',
        expectedOutput: 'true',
        isHidden: false
      },
      {
        id: 'tc-ana-2',
        input: 's = "rat", t = "car"',
        expectedOutput: 'false',
        isHidden: false
      },
      {
        id: 'tc-ana-3',
        input: 's = "a", t = "ab"',
        expectedOutput: 'false',
        isHidden: true
      }
    ],
    hints: [
      'Check string lengths first. If they differ, they cannot be anagrams.',
      'Count character frequencies using an array of size 26 or a hash map.'
    ],
    solution: {
      approach: 'Frequency Counter: Use an integer array of size 26 to tally character occurrences in s and subtract for t.',
      timeComplexity: 'O(N) where N is the length of string.',
      spaceComplexity: 'O(1) auxiliary space because character set size is fixed (26).',
      code: {
        javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - 97]++;
    counts[t.charCodeAt(i) - 97]--;
  }
  return counts.every(c => c === 0);
}`,
        python: `def is_anagram(s, t):
    if len(s) != len(t): return False
    count = [0] * 26
    for i in range(len(s)):
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1
    return all(c == 0 for c in count)`,
        java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] map = new int[26];
    for (int i = 0; i < s.length(); i++) {
        map[s.charAt(i) - 'a']++;
        map[t.charAt(i) - 'a']--;
    }
    for (int x : map) if (x != 0) return false;
    return true;
}`,
        cpp: `bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    int freq[26] = {0};
    for (char c : s) freq[c - 'a']++;
    for (char c : t) if (--freq[c - 'a'] < 0) return false;
    return true;
}`,
        sql: `SELECT 1;`
      }
    },
    acceptanceRate: 64.2
  },

  // 5. STRINGS - Longest Substring Without Repeating Characters
  {
    id: 'code-str-2',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    topic: 'Strings',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Flipkart'],
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string.`,
    inputFormat: 's = "abcabcbb"',
    outputFormat: '3',
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterTemplates: {
      javascript: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const map = new Map();
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }
    map.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}`,
      python: `def length_of_longest_substring(s):
    seen = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int maxLen = 0, left = 0;
        Map<Character, Integer> map = new HashMap<>();
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            if (seen.count(s[right]) && seen[s[right]] >= left) {
                left = seen[s[right]] + 1;
            }
            seen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
      sql: `-- Substring manipulation`
    },
    testCases: [
      {
        id: 'tc-lsub-1',
        input: 's = "abcabcbb"',
        expectedOutput: '3',
        explanation: 'The answer is "abc", with the length of 3.',
        isHidden: false
      },
      {
        id: 'tc-lsub-2',
        input: 's = "bbbbb"',
        expectedOutput: '1',
        explanation: 'The answer is "b", with the length of 1.',
        isHidden: false
      },
      {
        id: 'tc-lsub-3',
        input: 's = "pwwkew"',
        expectedOutput: '3',
        explanation: 'The answer is "wke", with the length of 3 ("pwke" is a subsequence, not a substring).',
        isHidden: false
      },
      {
        id: 'tc-lsub-4',
        input: 's = " "',
        expectedOutput: '1',
        explanation: 'Single space has length 1.',
        isHidden: true
      }
    ],
    hints: [
      'Use a sliding window [left, right] where characters inside the window are guaranteed distinct.',
      'When you see a duplicate character, advance the left pointer past its previous index.'
    ],
    solution: {
      approach: 'Sliding Window with Hash Map: Expand window right pointer. If character exists within current window, jump left pointer to previous position + 1.',
      timeComplexity: 'O(N) - Each character is visited at most twice.',
      spaceComplexity: 'O(min(N, M)) where M is the size of the alphabet.',
      code: {
        javascript: `function lengthOfLongestSubstring(s) {
  let maxLen = 0, start = 0;
  const indexMap = new Map();
  for (let end = 0; end < s.length; end++) {
    if (indexMap.has(s[end]) && indexMap.get(s[end]) >= start) {
      start = indexMap.get(s[end]) + 1;
    }
    indexMap.set(s[end], end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
        python: `def length_of_longest_substring(s):
    char_map = {}
    start = max_len = 0
    for end, c in enumerate(s):
        if c in char_map and char_map[c] >= start:
            start = char_map[c] + 1
        char_map[c] = end
        max_len = max(max_len, end - start + 1)
    return max_len`,
        java: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> pos = new HashMap<>();
    int max = 0, l = 0;
    for (int r = 0; r < s.length(); r++) {
        char ch = s.charAt(r);
        if (pos.containsKey(ch) && pos.get(ch) >= l) {
            l = pos.get(ch) + 1;
        }
        pos.put(ch, r);
        max = Math.max(max, r - l + 1);
    }
    return max;
}`,
        cpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> seen;
    int maxL = 0, l = 0;
    for (int r = 0; r < s.size(); ++r) {
        if (seen.find(s[r]) != seen.end() && seen[s[r]] >= l) {
            l = seen[s[r]] + 1;
        }
        seen[s[r]] = r;
        maxL = max(maxL, r - l + 1);
    }
    return maxL;
}`,
        sql: `SELECT 0;`
      }
    },
    acceptanceRate: 35.8
  },

  // 6. LINKED LISTS - Reverse a Linked List
  {
    id: 'code-ll-1',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    tags: ['Linked List', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Infosys', 'TCS Ninja'],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    inputFormat: 'head = [1,2,3,4,5]',
    outputFormat: '[5,4,3,2,1]',
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    starterTemplates: {
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      python: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr) {
            ListNode *nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
};`,
      sql: `-- Pointer reversal conceptually`
    },
    testCases: [
      {
        id: 'tc-revll-1',
        input: 'head = [1,2,3,4,5]',
        expectedOutput: '[5,4,3,2,1]',
        explanation: 'Nodes reversed sequentially.',
        isHidden: false
      },
      {
        id: 'tc-revll-2',
        input: 'head = [1,2]',
        expectedOutput: '[2,1]',
        isHidden: false
      },
      {
        id: 'tc-revll-3',
        input: 'head = []',
        expectedOutput: '[]',
        explanation: 'Empty list remains empty.',
        isHidden: false
      }
    ],
    hints: [
      'Maintain three pointers: prev, curr, and next.',
      'Before flipping curr.next to point to prev, preserve the reference to curr.next.'
    ],
    solution: {
      approach: 'Iterative 3-Pointer: Flip curr.next = prev while advancing prev and curr one node forward each cycle.',
      timeComplexity: 'O(N) - Traverses all nodes once.',
      spaceComplexity: 'O(1) - In-place pointer modifications.',
      code: {
        javascript: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
        python: `def reverse_list(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, cur = head;
    while (cur != null) {
        ListNode nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}`,
        cpp: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* nxt = head->next;
        head->next = prev;
        prev = head;
        head = nxt;
    }
    return prev;
}`,
        sql: `SELECT 0;`
      }
    },
    acceptanceRate: 75.2
  },

  // 7. STACKS & QUEUES - Valid Parentheses
  {
    id: 'code-sq-1',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    topic: 'Stacks & Queues',
    tags: ['Stack', 'String'],
    companies: ['Amazon', 'Google', 'TCS Digital', 'Wipro'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    inputFormat: 's = "()[]{}"',
    outputFormat: 'true',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    starterTemplates: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else if (st.empty() || st.top() != c) return false;
            else st.pop();
        }
        return st.empty();
    }
};`,
      sql: `-- Stack simulation`
    },
    testCases: [
      {
        id: 'tc-vp-1',
        input: 's = "()"',
        expectedOutput: 'true',
        isHidden: false
      },
      {
        id: 'tc-vp-2',
        input: 's = "()[]{}"',
        expectedOutput: 'true',
        isHidden: false
      },
      {
        id: 'tc-vp-3',
        input: 's = "(]"',
        expectedOutput: 'false',
        isHidden: false
      },
      {
        id: 'tc-vp-4',
        input: 's = "([)]"',
        expectedOutput: 'false',
        isHidden: true
      },
      {
        id: 'tc-vp-5',
        input: 's = "{[]}"',
        expectedOutput: 'true',
        isHidden: true
      }
    ],
    hints: [
      'Use a LIFO Stack. Push matching brackets when encountering open symbols.',
      'When you see a closing bracket, verify that the top element matches and pop it.'
    ],
    solution: {
      approach: 'Stack LIFO: Push expected closing bracket onto stack when open bracket appears. For closing bracket, pop and ensure match.',
      timeComplexity: 'O(N) - One scan across the string.',
      spaceComplexity: 'O(N) - Worst case stack holds all characters.',
      code: {
        javascript: `function isValid(s) {
  const stack = [];
  for (let c of s) {
    if (c === '(') stack.push(')');
    else if (c === '{') stack.push('}');
    else if (c === '[') stack.push(']');
    else if (stack.pop() !== c) return false;
  }
  return stack.length === 0;
}`,
        python: `def is_valid(s):
    st = []
    pairs = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in pairs:
            if not st or st.pop() != pairs[c]: return False
        else:
            st.append(c)
    return len(st) == 0`,
        java: `public boolean isValid(String s) {
    Stack<Character> st = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.isEmpty() || st.pop() != c) return false;
    }
    return st.isEmpty();
}`,
        cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.empty() || st.top() != c) return false;
        else st.pop();
    }
    return st.empty();
}`,
        sql: `SELECT 1;`
      }
    },
    acceptanceRate: 40.5
  },

  // 8. TREES & GRAPHS - Invert Binary Tree
  {
    id: 'code-tg-1',
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    difficulty: 'Easy',
    topic: 'Trees & Graphs',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Accenture'],
    description: `Given the \`root\` of a binary tree, invert the tree, and return its root.

Inverting a binary tree swaps the left and right child of every node throughout the tree.`,
    inputFormat: 'root = [4,2,7,1,3,6,9]',
    outputFormat: '[4,7,2,9,6,3,1]',
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    starterTemplates: {
      javascript: `function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}`,
      python: `def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }
}`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`,
      sql: `-- Hierarchical tree query`
    },
    testCases: [
      {
        id: 'tc-inv-1',
        input: 'root = [4,2,7,1,3,6,9]',
        expectedOutput: '[4,7,2,9,6,3,1]',
        isHidden: false
      },
      {
        id: 'tc-inv-2',
        input: 'root = [2,1,3]',
        expectedOutput: '[2,3,1]',
        isHidden: false
      },
      {
        id: 'tc-inv-3',
        input: 'root = []',
        expectedOutput: '[]',
        isHidden: false
      }
    ],
    hints: [
      'Think recursively: what needs to happen to the left and right pointers of the current node?',
      'Swap the left and right subtrees, then recursively call invert on both children.'
    ],
    solution: {
      approach: 'DFS Post-order / Pre-order: Swap the left and right pointers of each node recursively.',
      timeComplexity: 'O(N) where N is the number of nodes in the tree.',
      spaceComplexity: 'O(H) recursion stack space, where H is tree height (O(log N) balanced, O(N) worst).',
      code: {
        javascript: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
        python: `def invert_tree(root):
    if not root: return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
        java: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode left = invertTree(root.right);
    TreeNode right = invertTree(root.left);
    root.left = left;
    root.right = right;
    return root;
}`,
        cpp: `TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    TreeNode* l = invertTree(root->right);
    TreeNode* r = invertTree(root->left);
    root->left = l;
    root->right = r;
    return root;
}`,
        sql: `SELECT 0;`
      }
    },
    acceptanceRate: 77.1
  },

  // 9. DYNAMIC PROGRAMMING - Climbing Stairs
  {
    id: 'code-dp-1',
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    companies: ['Amazon', 'Adobe', 'TCS Digital', 'Infosys'],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    inputFormat: 'n = 3',
    outputFormat: '3',
    constraints: [
      '1 <= n <= 45'
    ],
    starterTemplates: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i++) {
    const third = first + second;
    first = second;
    second = third;
  }
  return second;
}`,
      python: `def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; ++i) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,
      sql: `-- Recursive CTE Fibonacci`
    },
    testCases: [
      {
        id: 'tc-climb-1',
        input: 'n = 2',
        expectedOutput: '2',
        explanation: '1. 1 step + 1 step, 2. 2 steps.',
        isHidden: false
      },
      {
        id: 'tc-climb-2',
        input: 'n = 3',
        expectedOutput: '3',
        explanation: '1. 1+1+1, 2. 1+2, 3. 2+1.',
        isHidden: false
      },
      {
        id: 'tc-climb-3',
        input: 'n = 5',
        expectedOutput: '8',
        isHidden: true
      }
    ],
    hints: [
      'To reach step n, you must come from either step (n - 1) or step (n - 2).',
      'The recurrence relation is: ways(n) = ways(n - 1) + ways(n - 2).'
    ],
    solution: {
      approach: 'Fibonacci Dynamic Programming: The number of paths to step n is the sum of ways to reach (n-1) and (n-2). We only need to store the previous two numbers.',
      timeComplexity: 'O(N) - Linear iteration up to n.',
      spaceComplexity: 'O(1) - Constant memory.',
      code: {
        javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
        python: `def climb_stairs(n):
    if n <= 2: return n
    p1, p2 = 2, 1
    for _ in range(3, n + 1):
        p1, p2 = p1 + p2, p1
    return p1`,
        java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int p1 = 2, p2 = 1;
    for (int i = 3; i <= n; i++) {
        int cur = p1 + p2;
        p2 = p1;
        p1 = cur;
    }
    return p1;
}`,
        cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; ++i) {
        int next = a + b;
        a = b;
        b = next;
    }
    return b;
}`,
        sql: `SELECT 0;`
      }
    },
    acceptanceRate: 53.6
  },

  // 10. SORTING & SEARCHING - Binary Search
  {
    id: 'code-ss-1',
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    topic: 'Sorting & Searching',
    tags: ['Array', 'Binary Search'],
    companies: ['Amazon', 'Google', 'TCS', 'Cognizant'],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`.

If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    inputFormat: 'nums = [-1,0,3,5,9,12], target = 9',
    outputFormat: '4',
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    starterTemplates: {
      javascript: `function search(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      python: `def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) return m;
            if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
};`,
      sql: `-- SQL search equivalent`
    },
    testCases: [
      {
        id: 'tc-bs-1',
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        expectedOutput: '4',
        explanation: '9 exists in nums and its index is 4.',
        isHidden: false
      },
      {
        id: 'tc-bs-2',
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        expectedOutput: '-1',
        explanation: '2 does not exist in nums so return -1.',
        isHidden: false
      },
      {
        id: 'tc-bs-3',
        input: 'nums = [5], target = 5',
        expectedOutput: '0',
        isHidden: true
      }
    ],
    hints: [
      'Calculate mid index as low + (high - low) / 2 to avoid integer overflow.',
      'If nums[mid] < target, shift low to mid + 1; else shift high to mid - 1.'
    ],
    solution: {
      approach: 'Classic Binary Search: Halves search space each comparison.',
      timeComplexity: 'O(log N) - Logarithmic search space reduction.',
      spaceComplexity: 'O(1) - Constant auxiliary space.',
      code: {
        javascript: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor(l + (r - l) / 2);
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
        python: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        if nums[m] < target: l = m + 1
        else: r = m - 1
    return -1`,
        java: `public int search(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) return m;
        if (nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
        cpp: `int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) return m;
        if (nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
        sql: `SELECT 0;`
      }
    },
    acceptanceRate: 58.7
  },

  // 11. SQL & DATABASES - Second Highest Salary
  {
    id: 'code-sql-1',
    title: 'Second Highest Salary',
    slug: 'second-highest-salary',
    difficulty: 'Medium',
    topic: 'SQL & Databases',
    tags: ['Database', 'SQL', 'Subquery', 'Window Function'],
    companies: ['Amazon', 'Oracle', 'TCS Prime', 'Wipro'],
    description: `Write an SQL query to report the second highest distinct salary from the \`Employee\` table. If there is no second highest salary, the query should report \`null\` (return \`None\` in Python/Pandas).

Table: \`Employee\`
| Column Name | Type |
| id | int |
| salary | int |`,
    inputFormat: 'Employee table with salaries [100, 200, 300]',
    outputFormat: '200',
    constraints: [
      'id is the primary key column for this table.',
      'Each row of this table contains information about the salary of an employee.'
    ],
    starterTemplates: {
      sql: `SELECT (
  SELECT DISTINCT salary 
  FROM Employee 
  ORDER BY salary DESC 
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
      javascript: `// In JavaScript array representation:
function secondHighestSalary(employees) {
  const uniqueSalaries = Array.from(new Set(employees.map(e => e.salary)));
  uniqueSalaries.sort((a, b) => b - a);
  return uniqueSalaries.length >= 2 ? uniqueSalaries[1] : null;
}`,
      python: `def second_highest_salary(employee_df):
    unique = sorted(employee_df['salary'].drop_duplicates().tolist(), reverse=True)
    return unique[1] if len(unique) >= 2 else None`,
      java: `// Equivalent stream collection in Java
public Integer getSecondHighest(List<Integer> salaries) {
    return salaries.stream().distinct().sorted(Comparator.reverseOrder()).skip(1).findFirst().orElse(null);
}`,
      cpp: `// Equivalent logic
int getSecondHighest(vector<int>& v) {
    set<int> s(v.begin(), v.end());
    if (s.size() < 2) return -1;
    auto it = s.rbegin();
    it++;
    return *it;
}`
    },
    testCases: [
      {
        id: 'tc-sql-1',
        input: 'Employee = [{id: 1, salary: 100}, {id: 2, salary: 200}, {id: 3, salary: 300}]',
        expectedOutput: '200',
        isHidden: false
      },
      {
        id: 'tc-sql-2',
        input: 'Employee = [{id: 1, salary: 100}]',
        expectedOutput: 'null',
        explanation: 'There is only one salary, so second highest does not exist.',
        isHidden: false
      }
    ],
    hints: [
      'Use DISTINCT to handle multiple employees having the same top salary.',
      'Wrap the query in a subquery or use IFNULL to guarantee NULL when offset 1 is empty.'
    ],
    solution: {
      approach: 'SQL Subquery with LIMIT / OFFSET: SELECT DISTINCT salary ORDER BY salary DESC LIMIT 1 OFFSET 1 wrapped in an outer SELECT so empty results return NULL.',
      timeComplexity: 'O(N log N) for sorting distinct salaries.',
      spaceComplexity: 'O(N) for distinct sorting space.',
      code: {
        sql: `SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
        javascript: `function secondHighest(salaries) {
  const uniq = [...new Set(salaries)].sort((a, b) => b - a);
  return uniq.length > 1 ? uniq[1] : null;
}`,
        python: `def second_highest(salaries):
    uniq = sorted(list(set(salaries)), reverse=True)
    return uniq[1] if len(uniq) > 1 else None`,
        java: `public Integer secondHighest(List<Integer> s) {
    return s.stream().distinct().sorted(Collections.reverseOrder()).skip(1).findFirst().orElse(null);
}`,
        cpp: `int secondHighest(vector<int>& nums) {
    set<int> st(nums.begin(), nums.end());
    if (st.size() < 2) return -1;
    return *(++st.rbegin());
}`
      }
    },
    acceptanceRate: 39.4
  },

  // 12. DYNAMIC PROGRAMMING - Coin Change
  {
    id: 'code-dp-2',
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    tags: ['Dynamic Programming', 'Breadth-First Search', 'Array'],
    companies: ['Amazon', 'Goldman Sachs', 'Flipkart'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    inputFormat: 'coins = [1,2,5], amount = 11',
    outputFormat: '3',
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    starterTemplates: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; ++i) {
            for (int c : coins) {
                if (i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      sql: `-- DP optimization`
    },
    testCases: [
      {
        id: 'tc-coin-1',
        input: 'coins = [1,2,5], amount = 11',
        expectedOutput: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins)',
        isHidden: false
      },
      {
        id: 'tc-coin-2',
        input: 'coins = [2], amount = 3',
        expectedOutput: '-1',
        explanation: 'Amount 3 cannot be formed using only coins of 2.',
        isHidden: false
      },
      {
        id: 'tc-coin-3',
        input: 'coins = [1], amount = 0',
        expectedOutput: '0',
        explanation: 'Amount 0 requires 0 coins.',
        isHidden: false
      }
    ],
    hints: [
      'Create a DP array of size amount + 1 initialized to Infinity.',
      'Base case: dp[0] = 0.',
      'Transition: for each coin, dp[i] = min(dp[i], dp[i - coin] + 1).'
    ],
    solution: {
      approach: 'Bottom-up DP: Compute minimal coins for every sum from 1 to amount. For each sum i, look up dp[i - c] + 1 for each available coin c.',
      timeComplexity: 'O(amount * coins.length)',
      spaceComplexity: 'O(amount) space for DP memoization table.',
      code: {
        javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
        python: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
        java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
        cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; ++i) {
        for (int c : coins) {
            if (i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
        sql: `SELECT 0;`
      }
    },
    acceptanceRate: 43.1
  }
];
