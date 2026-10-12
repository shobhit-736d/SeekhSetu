import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, Lightbulb, Code, RefreshCw } from 'lucide-react';
import { StudyDay } from '../../types/roadmap';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  code?: string;
  timestamp: string;
}

interface AiCoachChatProps {
  day: StudyDay;
  topicTitle?: string;
}

export const AiCoachChat: React.FC<AiCoachChatProps> = ({ day, topicTitle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I'm your AI Interview Coach for **Day ${day.dayNumber}: ${day.title}**.\n\nI can conduct a mock technical interview, quiz you on edge cases, review your code explanations, or explain complex mechanics like the V8 engine and Fiber reconciliation. What would you like to drill?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    `Give me an associate interview question on ${topicTitle || day.title}`,
    `How do I explain ${topicTitle || day.title} in 90 seconds?`,
    `What tricky trap do interviewers ask about this?`,
    `Give me a live coding exercise with edge cases`
  ];

  const handleSend = (textToSend?: string) => {
    const prompt = (textToSend || inputText).trim();
    if (!prompt) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Generate intelligent contextual response
    setTimeout(() => {
      let aiResponseText = '';
      let codeSnippet: string | undefined = undefined;

      const lower = prompt.toLowerCase();
      if (lower.includes('interview question') || lower.includes('mock')) {
        aiResponseText = `Here is a high-frequency question often asked by technical interviewers for this topic:\n\n**Interviewer Question:** *"Can you walk me through how the engine handles variable declarations vs assignments during execution phase, and why accessing let/const before initialization causes a ReferenceError while var returns undefined?"*\n\n**What they are testing:**\n1. Whether you understand the Creation Phase vs Execution Phase in Execution Contexts.\n2. Understanding of the Temporal Dead Zone (TDZ) and why it was introduced in ES6.\n3. Ability to communicate clearly without reciting textbook definitions.`;
        codeSnippet = `// Interviewer Test Case:
console.log(typeof undeclaredVar); // "undefined"
console.log(typeof declaredWithLet); // ReferenceError: Cannot access before initialization!
let declaredWithLet = 5;`;
      } else if (lower.includes('90 seconds') || lower.includes('explain')) {
        aiResponseText = `Here is the optimal **90-second elevator pitch** structured for an associate interview:\n\n1. **Core Definition (20s):** Start with the concrete mechanism: "In JavaScript, variables declared with \`let\` and \`const\` are block-scoped and hoisted into the Temporal Dead Zone (TDZ), meaning their identifier is registered during the creation phase but remains uninitialized until execution reaches their physical declaration line."\n2. **Contrast with Alternative (30s):** "Unlike \`var\`, which hoists and defaults to \`undefined\`, accessing a TDZ variable throws a loud ReferenceError. This eliminates silent bugs and prevents reading variables before their intended value is established."\n3. **Practical Production Tip (40s):** "In production, we adhere to strict linting rules and always declare variables at the top of their enclosing lexical blocks to avoid TDZ pitfalls."`;
      } else if (lower.includes('trap') || lower.includes('edge case')) {
        aiResponseText = `**The Classic Interview Trap:** Default parameter scope!\n\nWhen functions evaluate default arguments, they create a separate parameter scope evaluated left-to-right. A common trap is referencing a subsequent parameter in a default value before it has exited the TDZ:`;
        codeSnippet = `// TRAP:
function calculate(x = y, y = 10) {
  return x + y;
}
calculate(); // ReferenceError: Cannot access 'y' before initialization!
// 'y' is in TDZ when evaluating default argument 'x'`;
      } else {
        aiResponseText = `Great question regarding **${topicTitle || day.title}**!\n\nIn associate full stack interviews, the key differentiator is demonstrating that you understand *how the runtime operates underneath*, not just writing surface-level code.\n\nKeep your answers anchored to:\n• Memory allocation (Stack vs Heap)\n• Asynchronous lifecycle (Event Loop / Microtasks)\n• Predictable error handling (ReferenceError vs TypeError vs SyntaxError).\n\nWould you like me to test you with a tricky output prediction question now?`;
      }

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: aiResponseText,
        code: codeSnippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="rounded-2xl border border-aurora-border bg-aurora-bg-elevated flex flex-col h-[560px] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-3.5 bg-aurora-bg-surface/80 border-b border-aurora-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FA4616] p-0.5 shadow-sm flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white tracking-tight">
                AI Interview Coach
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className="text-[10px] text-aurora-text-secondary">
              Context: Day {day.dayNumber} • {topicTitle || day.title}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(messages.slice(0, 1))}
          className="text-aurora-text-secondary hover:text-white p-1 rounded-lg text-xs hover:bg-aurora-bg-elevated transition-colors"
          title="Clear Chat History"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
              msg.sender === 'user'
                ? 'bg-[#FA4616] text-[#FCF6F5]'
                : 'bg-aurora-bg-surface border border-aurora-border text-[#FA4616]'
            }`}>
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className={`max-w-[85%] rounded-2xl p-4 leading-relaxed space-y-2 ${
              msg.sender === 'user'
                ? 'bg-[#FA4616] text-[#FCF6F5] rounded-tr-none'
                : 'bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary rounded-tl-none'
            }`}>
              <div className="whitespace-pre-line">
                {msg.text}
              </div>

              {msg.code && (
                <pre className="p-3 rounded-xl bg-aurora-bg-primary border border-aurora-border font-mono text-[11px] text-[#FA4616] overflow-x-auto">
                  <code>{msg.code}</code>
                </pre>
              )}

              <div className={`text-[9px] ${msg.sender === 'user' ? 'text-white/80' : 'text-aurora-text-secondary'} text-right`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-aurora-text-secondary">
            <Bot className="w-4 h-4 text-[#FA4616] animate-spin" />
            <span>Analyzing engineering response...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2 bg-aurora-bg-surface/50 border-t border-aurora-border/60 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#FA4616] flex-shrink-0" />
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-lg bg-aurora-bg-elevated border border-aurora-border text-[11px] text-aurora-text-secondary hover:text-white hover:border-[#FA4616] transition-colors whitespace-nowrap"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-aurora-bg-surface border-t border-aurora-border">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Ask AI Interview Coach about ${topicTitle || day.title}...`}
            className="flex-1 bg-aurora-bg-elevated border border-aurora-border rounded-xl px-3.5 py-2 text-xs text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-[#FA4616] text-[#FCF6F5] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#344052] transition-all disabled:opacity-40 disabled:pointer-events-none hover:translate-x-[1px] hover:translate-y-[1px]"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
