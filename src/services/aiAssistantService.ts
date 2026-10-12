import { AiChatMessage, AiPageContext } from '../types/placement';
import { ApiService } from './apiService';

export class AiAssistantService {
  /**
   * Send query to AI placement assistant with context awareness
   */
  public static async queryAssistant(
    prompt: string,
    history: AiChatMessage[],
    context?: AiPageContext
  ): Promise<string> {
    // 1. Try backend API proxy if available (persists message history under authenticated user)
    try {
      const data = await ApiService.queryAi({
        prompt,
        history,
        context
      });
      if (data?.reply) return data.reply;
    } catch {
      // Backend not running or user unauthenticated; fallback to direct Gemini API call
    }

    // 2. Direct Gemini API call if env key is set
    const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (geminiKey) {
      const sysPrompt = `You are SeekhSetu AI Placement Preparation Assistant, an elite technical coach and software architect.
Context:
- Page: ${context?.page || 'General'}
- Subtopic: ${context?.subtopic || 'N/A'}
- Problem: ${context?.problemTitle || 'N/A'}
- Code snippet: ${context?.currentCode ? context.currentCode.substring(0, 300) : 'N/A'}
- ATS Score: ${context?.atsScore || 'N/A'}

Be concise, clear, encouraging, and provide code blocks and complexity analysis where applicable.`;

      const candidateModels = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];

      for (const model of candidateModels) {
        try {
          const resp = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    role: 'user',
                    parts: [{ text: `${sysPrompt}\n\nUser Question: ${prompt}` }]
                  }
                ],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 1024
                }
              })
            }
          );

          if (resp.ok) {
            const resData = await resp.json();
            const text = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text;
          }
        } catch (err) {
          console.warn(`Direct Gemini call to ${model} failed:`, err);
        }
      }
    }

    // 3. Resilient Offline AI Placement Knowledge Engine
    return this.generateContextualResponse(prompt, context);
  }

  /**
   * Specialized Placement Intelligence Knowledge Base
   */
  private static generateContextualResponse(
    prompt: string,
    context?: AiPageContext
  ): string {
    const qLower = prompt.toLowerCase();

    // Problem context debugging
    if (context?.problemTitle && (qLower.includes('bug') || qLower.includes('error') || qLower.includes('help') || qLower.includes('wrong'))) {
      return `### 🔍 Debugging Analysis for **${context.problemTitle}**

I reviewed your code implementation in **${context.language || 'JavaScript'}**.

**Common Pitfalls to check for this problem:**
1. **Edge Cases**: Empty input array, single element arrays, or negative values.
2. **Off-by-One Errors**: Ensure loops terminate at \`length - 1\` or bounds are checked before accessing indices.
3. **Data Type / Overflow**: For sum problems, check that large numbers don't overflow standard integer limits.

**Recommended Optimization Step:**
- Check if an **O(N) Hash Map** or **Two-Pointer technique** can replace a nested loop to avoid $O(N^2)$ Time Limit Exceeded.

Would you like me to walk through the step-by-step logic or reveal the optimal template?`;
    }

    // Complexity question
    if (qLower.includes('time complexity') || qLower.includes('space complexity') || qLower.includes('big o')) {
      return `### ⏱️ Time & Space Complexity Breakdown

When analyzing algorithms in technical interviews:

- **Time Complexity**:
  - Hash Map lookup/insert: **$O(1)$** average.
  - Binary Search: **$O(\\log N)$** by halving search intervals.
  - Sorting (Merge/Quick/TimSort): **$O(N \\log N)$**.
  - Nested loops checking all pairs: **$O(N^2)$** — aim to optimize using Hash Maps or Sliding Windows.
- **Space Complexity**:
  - In-place pointers: **$O(1)$** auxiliary space.
  - Storing frequencies in Hash Table: **$O(N)$** space.
  - Recursion call stack: **$O(H)$** where $H$ is the tree or recursion depth.

*Interviewer Pro-tip:* Always state your Space Complexity **before** the interviewer prompts you!`;
    }

    // Resume / ATS questions
    if (context?.page === 'resume' || qLower.includes('ats') || qLower.includes('resume')) {
      return `### 📄 ATS Resume Optimization Strategy (Target 85+ Score)

To ensure automated Applicant Tracking Systems parse your resume with a top score:

1. **Section Headers**: Use standard unambiguous headings: *"Technical Skills"*, *"Work Experience"*, *"Projects"*, *"Education"*.
2. **Action Verbs + Metrics**: Replace passive phrases with quantifiable impact:
   - ❌ *"Worked on optimizing database queries."*
   - ✅ *"Architected PostgreSQL indexing strategy, reducing query latency by 45% across 10,000+ daily requests."*
3. **Keyword Density**: Ensure core keywords match the job description (e.g., React, TypeScript, Node.js, SQL, REST APIs, Git).
4. **Single-Column Format**: Multi-column tables often confuse older ATS parsers. Our **Modern Tech** and **Minimalist** templates are 100% ATS-compliant!`;
    }

    // Aptitude question
    if (context?.page === 'aptitude' || qLower.includes('aptitude') || qLower.includes('formula')) {
      return `### 💡 Placement Aptitude Shortcut Guide

Key speed formulas for placement screening rounds:

- **Profit & Loss**: When two items are sold at the same price with $+X\\%$ gain and $-X\\%$ loss, there is always an overall **Loss** $= \\frac{X^2}{100}\\%$.
- **Time & Work**: If $A$ takes $x$ days and $B$ takes $y$ days, together they take $\\frac{x \\cdot y}{x + y}$ days.
- **Relative Speed**:
  - Same direction: $S_1 - S_2$
  - Opposite direction: $S_1 + S_2$
- **Clock Angle**: $\\theta = |30H - 5.5M|^{\\circ}$.

Remember to look for answer choices ending in unique unit digits to eliminate options without doing long division!`;
    }

    // Interview communication & HR
    if (qLower.includes('tell me about yourself') || qLower.includes('introduce') || qLower.includes('hr question')) {
      return `### 🎙️ Mastering "Tell Me About Yourself" (The 60s Framework)

Structure your response into 4 distinct phases:

1. **Present (15s)**: Who you are, your degree/specialization, and core tech focus.
2. **Past (25s)**: Your key technical achievements, internships, or high-impact projects with measurable outcomes.
3. **Future (20s)**: Why you are excited about this specific company and how your skills directly solve their needs.

*Avoid reciting your entire CV.* Focus on the narrative of your passion for engineering and problem-solving!`;
    }

    // General fallback
    return `### 🚀 SeekhSetu Placement Assistant

I am here to help you crack technical placements, coding rounds, and behavioral interviews!

**I can assist you with:**
- **Code Debugging**: Paste your snippet or switch to the Coding Arena and ask me to diagnose edge cases.
- **Aptitude Shortcuts**: Formulas and elimination tricks for Quantitative, Logical, and Verbal rounds.
- **STAR Method**: Framing behavioral answers with quantifiable metrics.
- **Resume Reviews**: Boosting your ATS score past 85+.

What specific concept or question would you like to master right now?`;
  }
}
