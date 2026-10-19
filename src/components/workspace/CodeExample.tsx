import React, { useState } from 'react';
import { Copy, Check, Terminal, Play } from 'lucide-react';
import { CodeSnippet } from '../../types/roadmap';

export const CodeExample: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-aurora-border bg-aurora-bg-primary shadow-lg">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-aurora-bg-surface/80 border-b border-aurora-border text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-aurora-text-secondary ml-2 font-medium">
            {snippet.title || snippet.language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-xs leading-relaxed font-mono">
        <pre className="text-aurora-text-primary">
          <code>{snippet.code}</code>
        </pre>
      </div>

      {/* Input / Output metadata if present */}
      {(snippet.input || snippet.output) && (
        <div className="px-4 py-2.5 bg-aurora-bg-surface/40 border-t border-aurora-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
          {snippet.input && (
            <div className="flex items-center gap-1.5 text-aurora-text-secondary">
              <Play className="w-3 h-3 text-[#FA4616]" />
              <span className="font-mono truncate">{snippet.input}</span>
            </div>
          )}
          {snippet.output && (
            <div className="flex items-start gap-1.5 text-emerald-700 dark:text-emerald-400 font-mono">
              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="whitespace-pre-wrap">{snippet.output}</span>
            </div>
          )}
        </div>
      )}

      {/* Explanation if present */}
      {snippet.explanation && (
        <div className="px-4 py-2 bg-[#FA4616]/05 border-t border-aurora-border/60 text-xs text-aurora-text-secondary">
          <strong className="text-aurora-text-primary">Mechanism: </strong>
          {snippet.explanation}
        </div>
      )}
    </div>
  );
};
