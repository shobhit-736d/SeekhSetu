export class BackendAiService {
  static async generateReply(prompt, history = [], context = {}) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return `[Backend Offline Mode]: You are prepared for full-stack associate placements! Your current context is: ${context.page || 'General'}. (Add GEMINI_API_KEY to server .env to enable real-time Gemini LLM answers).`;
    }

    const sysInstruction = `You are SeekhSetu AI Placement Preparation Coach and Senior Software Architect.
Role & Mission:
- Guide candidates through DSA, algorithm design, time/space complexity analysis, coding interview bugs, technical aptitude, and resume enhancement.
- Current Context: Page = "${context.page || 'General'}", Subtopic = "${context.subtopic || 'N/A'}", Problem = "${context.problemTitle || 'N/A'}", Code Snippet = "${context.currentCode ? context.currentCode.substring(0, 300) : 'None'}".
- Guidelines: Give structured, encouraging, highly technical yet accessible explanations. Use markdown, syntax-highlighted code blocks, and Big-O notation where relevant.`;

    // Candidate models in preference order
    const models = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `${sysInstruction}\n\nCandidate Question: ${prompt}`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return text;
          }
        } else {
          const errBody = await response.text();
          console.warn(`Gemini model ${model} returned HTTP ${response.status}:`, errBody.substring(0, 150));
        }
      } catch (err) {
        console.warn(`Gemini call to ${model} encountered error:`, err.message);
      }
    }

    return `AI Placement Coach: Focus on analyzing time complexity ($O(N)$ vs $O(N^2)$), testing boundary edge cases (null/empty inputs), and articulating your reasoning clearly.`;
  }
}
