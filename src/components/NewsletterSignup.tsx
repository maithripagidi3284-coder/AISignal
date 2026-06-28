// src/components/NewsletterSignup.tsx
"use client";

import { useState, useEffect } from "react";

const RANDOM_ALERTS = [
  "🔥 Anthropic releases Claude 3.6 with 500K context window",
  "💰 xAI closes $6B Series C at $50B valuation",
  "🚀 Runway launches Gen-4 with real-time video editing",
  "🤖 Meta releases Llama 4 with 1M token context window",
  "⚡ Bolt.new launches collaborative mode for teams",
  "🎙️ ElevenLabs launches Studio — full podcast production suite",
  "💸 Perplexity raises $250M at $3B valuation",
  "🧠 Google releases Gemini 2.0 Flash with real-time audio",
  "🌟 Mistral releases Le Chat Pro with vision and web search",
  "📈 OpenAI hits 200M weekly active users",
  "🛠️ Cursor surpasses 1M developers — fastest dev tool ever",
  "🎨 Midjourney V7 launches with photorealistic upgrades",
  "💡 DeepMind publishes AlphaFold 3 paper",
  "🔬 Stanford releases new LLM benchmark — Claude tops charts",
  "📦 Hugging Face releases Transformers v5",
  "🎵 Suno AI launches royalty-free music API for developers",
  "🏆 Lovable named fastest-growing AI product of 2025",
  "🔐 Anthropic opens Claude API to 100+ new countries",
  "📊 Cohere closes $450M Series D led by Salesforce",
  "🌐 Perplexity launches real-time news feature",
];

type Toast = {
  id: number;
  message: string;
};

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  function addToast(message: string) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => removeToast(id), 5000);
  }

  function startAlerts() {
    const shuffled = [...RANDOM_ALERTS].sort(() => Math.random() - 0.5);
    shuffled.slice(0, 6).forEach((msg, i) => {
      setTimeout(() => addToast(msg), i * 2000);
    });
  }

  function handleSubscribe() {
    if (!email.trim() || !email.includes("@")) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 1500);
      return;
    }
    setSubscribed(true);
    setEmail("");
    startAlerts();
  }

  return (
    <>
      {/* Toast notifications — fixed top-right */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-80 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-800 shadow-lg pointer-events-auto animate-slideIn flex items-start gap-2"
            style={{ animation: "slideIn 0.3s ease" }}
          >
            <span className="flex-1 leading-relaxed">{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-300 hover:text-gray-500 flex-shrink-0 mt-0.5"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Inline subscribe box — matches your existing sidebar style */}
      <div>
        {subscribed ? (
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 text-xs text-green-700 font-medium">
            ✓ You're subscribed! Watch for alerts popping up.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email"
              className={`w-full border rounded-lg px-3 py-2 text-xs outline-none transition-colors ${
                emailError
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 focus:border-red-400"
              }`}
            />
            <button
              onClick={handleSubscribe}
              className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}