import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../../context/StudyContext';
import { AiAssistantService } from '../../services/aiAssistantService';
import {
  Bot,
  Sparkles,
  X,
  Send,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Brain,
  FileText,
  MessageSquare,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export const GlobalAiAssistantDrawer: React.FC = () => {
  const {
    isAiDrawerOpen,
    setIsAiDrawerOpen,
    aiChatMessages,
    addAiChatMessage,
    clearAiChatMessages,
    aiCurrentContext
  } = useStudy();

  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isAiDrawerOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiChatMessages, isAiDrawerOpen, isThinking]);

  // Dynamic Context-Aware Quick Prompt Suggestions
  const getContextualPrompts = (): string[] => {
    if (aiCurrentContext?.page === 'coding' && aiCurrentContext.problemTitle) {
      return [
        `Explain the optimal approach for ${aiCurrentContext.problemTitle}`,
        `Find bugs and edge cases in my ${aiCurrentContext.language || 'code'}`,
        `What is the Time and Space Complexity?`,
        `How do I explain this problem to an interviewer?`
      ];
    }
    if (aiCurrentContext?.page === 'aptitude') {
      return [
        'Show shortcut formula for this topic',
        'How to solve quantitative questions under 30 seconds?',
        'Give a trick for elimination in Syllogisms',
        'Explain speed time distance relative speed rule'
      ];
    }
    if (aiCurrentContext?.page === 'resume') {
      return [
        'How do I boost my resume ATS score past 85+?',
        'Give strong action verbs for full stack projects',
        'How to write high-impact bullet points with numbers?',
        'Which technical keywords are recruiters filtering for?'
      ];
    }
    if (aiCurrentContext?.page === 'interview') {
      return [
        'Review my 60-second elevator pitch',
        'How to answer "Why should we hire you?"',
        'Give a STAR template for handling conflict',
        'What questions should I ask the interviewer at the end?'
      ];
    }
    return [
      'Explain JavaScript Event Loop & Microtasks in 60s',
      'What are the highest-frequency placement coding topics?',
      'How do I structure my 30-day interview roadmap?',
      'Explain React Fiber reconciliation and key prop'
    ];
  };

  const handleSend = async (messageText?: string) => {
    const text = (messageText || inputMessage).trim();
    if (!text || isThinking) return;

    // Add user message
    addAiChatMessage({
      sender: 'user',
      content: text,
      contextTag: aiCurrentContext?.page
    });

    setInputMessage('');
    setIsThinking(true);

    try {
      const response = await AiAssistantService.queryAssistant(
        text,
        aiChatMessages,
        aiCurrentContext
      );

      addAiChatMessage({
        sender: 'assistant',
        content: response,
        contextTag: aiCurrentContext?.page
      });
    } catch (err: any) {
      addAiChatMessage({
        sender: 'assistant',
        content: `Sorry, I encountered an issue connecting to the AI model. Please try again. (${err.message || 'Error'})`
      });
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const contextLabel = () => {
    if (aiCurrentContext?.page === 'coding' && aiCurrentContext.problemTitle) {
      return `Problem: ${aiCurrentContext.problemTitle} (${aiCurrentContext.language || 'JS'})`;
    }
    if (aiCurrentContext?.page === 'aptitude') return 'Placement Aptitude Portal';
    if (aiCurrentContext?.page === 'resume') return `AI Resume Studio (ATS: ${aiCurrentContext.atsScore || 84})`;
    if (aiCurrentContext?.page === 'interview') return 'Communication & Interview Suite';
    if (aiCurrentContext?.page === 'workspace') return `Study Workspace (${aiCurrentContext.subtopic || 'Curriculum'})`;
    return 'Placement Intelligence Copilot';
  };

  return (
    <>
      {/* Floating Launcher Button (Fixed Corner across all pages) */}
      <div className="fixed bottom-20 lg:bottom-6 right-5 z-40">
        <button
          onClick={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#FA4616] hover:bg-[#E03D0F] text-white font-bold text-xs shadow-2xl shadow-[#FA4616]/30 border border-white/20 transition-all hover:scale-105 active:scale-95"
          aria-label="Open AI Doubt Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-bounce-subtle" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#FA4616]" />
          </div>
          <span className="hidden sm:inline tracking-tight font-extrabold">Ask AI Assistant</span>
          <span className="sm:hidden text-[11px] font-bold">AI</span>
        </button>
      </div>

      {/* Floating Chat Drawer / Panel */}
      <AnimatePresence>
        {isAiDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAiDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:bg-transparent lg:pointer-events-none"
            />

            {/* Chat Drawer Window */}
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg h-full bg-aurora-bg-elevated border-l border-aurora-border shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-4 sm:p-4.5 bg-aurora-bg-surface/90 border-b border-aurora-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FA4616] flex items-center justify-center text-white shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-white tracking-tight">
                        SeekhSetu AI Copilot
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-aurora-text-secondary truncate max-w-xs">
                      {contextLabel()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={clearAiChatMessages}
                    className="p-1.5 rounded-lg text-aurora-text-secondary hover:text-white hover:bg-aurora-bg-elevated transition-colors text-xs"
                    title="Clear Chat History"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsAiDrawerOpen(false)}
                    className="p-1.5 rounded-lg text-aurora-text-secondary hover:text-white hover:bg-aurora-bg-elevated transition-colors"
                    title="Close Drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Message Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                {aiChatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-[#FA4616] text-white'
                        : 'bg-aurora-bg-surface border border-aurora-border text-[#FA4616]'
                    }`}>
                      {msg.sender === 'user' ? 'You' : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[85%] rounded-2xl p-4 leading-relaxed space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-[#FA4616] text-white rounded-tr-none'
                        : 'bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary rounded-tl-none'
                    }`}>
                      <div className="whitespace-pre-line leading-relaxed">
                        {msg.content}
                      </div>

                      {msg.sender === 'assistant' && (
                        <div className="flex items-center justify-between pt-1 border-t border-aurora-border/40 text-[10px] text-aurora-text-secondary">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="flex items-center gap-1 text-[#FA4616] hover:underline"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-2.5 text-xs text-aurora-text-secondary p-2">
                    <Bot className="w-4 h-4 text-[#FA4616] animate-spin" />
                    <span>Analyzing placement intelligence...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Quick Prompt Chips */}
              <div className="px-4 py-2.5 bg-aurora-bg-surface/50 border-t border-aurora-border/60 overflow-x-auto no-scrollbar flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FA4616] flex-shrink-0" />
                {getContextualPrompts().map((p, idx) => (
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
              <div className="p-3.5 bg-aurora-bg-surface border-t border-aurora-border">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Ask about coding bugs, formulas, HR rounds, resume..."
                    className="flex-1 bg-aurora-bg-elevated border border-aurora-border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isThinking}
                    className="p-3 rounded-xl bg-[#FA4616] text-white shadow-md transition-all disabled:opacity-40 disabled:pointer-events-none hover:bg-[#E03D0F]"
                    aria-label="Send query"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
