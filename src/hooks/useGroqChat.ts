// src/hooks/useGroqChat.ts
"use client";

import { useState, useCallback } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
  id: string;
};

export function useGroqChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm GraphOne AI, your guide to the AI ecosystem. Ask me about products, news, funding rounds, jobs, or get personalized recommendations.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || loading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: userText,
      };

      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      const historyForAPI = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map(({ role, content }) => ({ role, content }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyForAPI }),
        });

        if (!res.ok) throw new Error("API error");

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "assistant", content: data.reply },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "Something went wrong reaching the AI. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  return { messages, loading, sendMessage };
}