// src/components/GroqChatWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useGroqChat } from "@/hooks/useGroqChat";

const QUICK_PROMPTS = [
  "Top AI products right now",
  "Recommend a coding AI tool",
  "Latest AI funding news",
  "Compare ChatGPT vs Claude vs Gemini",
  "AI startups to watch in 2025",
];

export default function GroqChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, loading, sendMessage } = useGroqChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const text = input;
    setInput("");
    await sendMessage(text);
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all"
        aria-label="Open GraphOne AI chat"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-80 sm:w-96 border border-gray-200 rounded-2xl bg-white flex flex-col shadow-xl overflow-hidden"
          style={{ height: "480px" }}>
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-white">
            <div className="h-7 w-7 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900">GraphOne AI</p>
              <p className="text-[10px] text-green-600 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
                Groq · llama-3.3-70b
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-0.5" aria-label="Close chat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Quick prompts */}
          <div className="flex gap-1.5 overflow-x-auto px-3 pt-2 pb-1 scrollbar-hide flex-shrink-0">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                disabled={loading}
                className="whitespace-nowrap text-[10px] border border-gray-200 rounded-full px-2.5 py-1 text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors bg-white flex-shrink-0 disabled:opacity-40"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-2.5 min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col gap-1 max-w-[85%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}>
                <div className={`px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-red-500 text-white rounded-br-sm"
                    : "bg-gray-50 border border-gray-100 text-gray-800 rounded-bl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="self-start">
                <div className="bg-gray-50 border border-gray-100 rounded-xl rounded-bl-sm px-3 py-2.5 flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 bg-white flex-shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask about AI products, news..."
              disabled={loading}
              className="flex-1 text-xs border border-gray-200 rounded-full px-3 py-2 outline-none focus:border-red-400 transition-colors disabled:opacity-50 bg-white"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="h-7 w-7 rounded-full bg-red-500 hover:bg-red-600 disabled:bg-red-200 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Send"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}