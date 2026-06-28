import { NextRequest, NextResponse } from "next/server";
import { newsArticles } from "@/data/news";
import { products } from "@/data/products";
import { jobs } from "@/data/jobs";
import { investors } from "@/data/investors";
import { companies } from "@/data/companies";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b"; // Groq deprecated llama-3.3-70b-versatile on 2026-06-17, this is their recommended replacement

function buildContext() {
  const newsContext = newsArticles
    .slice(0, 15)
    .map((n) => `- [${n.category}] ${n.title} (${n.source}, ${n.timeAgo})`)
    .join("\n");

  const productsContext = products
    .slice(0, 18)
    .map((p) => `- ${p.name} (${p.category}): ${p.desc} — ${p.votes} votes${p.badgeLabel ? ` [${p.badgeLabel}]` : ""}`)
    .join("\n");

  const jobsContext = jobs
    .slice(0, 10)
    .map((j) => `- ${j.title} at ${j.company} (${j.location}, ${j.type})${j.salary ? ` ${j.salary}` : ""}${j.equity ? `, ${j.equity} equity` : ""}`)
    .join("\n");

  // investors/companies shape isn't fully known here, so pass raw JSON (trimmed)
  // so the model can still read names/fields without us hardcoding field names.
  const investorsContext = JSON.stringify(investors.slice(0, 25));
  const companiesContext = JSON.stringify(companies.slice(0, 25));

  return `
LATEST AI NEWS:
${newsContext}

TRENDING PRODUCTS:
${productsContext}

OPEN JOBS:
${jobsContext}

INVESTORS (raw data, JSON):
${investorsContext}

COMPANIES (raw data, JSON):
${companiesContext}
`.trim();
}

// Built once at module load since the underlying data is static.
const SYSTEM_PROMPT = `You are the GraphOne AI Assistant, embedded as a floating chat widget across the GraphOne platform (an AI news, products, jobs, investors, and companies directory).

You help users with three things:
1. Answering questions about AI news, trending products, or job listings using the live data below.
2. Smart search — helping users find investors, companies, or jobs that match what they describe, by recommending specific names from the data and briefly explaining why each one fits.
3. Generating content — e.g. summarizing a news article, or writing a short pitch/description for a product, using the data below as your source material.

Rules:
- Always ground your answers in the data provided below. If something isn't in the data, say so rather than inventing it.
- Keep answers concise and skimmable. Use markdown (bold, bullet lists) where it helps.
- When recommending investors/companies/jobs, always name the specific match and give a one-line reason.

LIVE PLATFORM DATA:
${buildContext()}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages array is required" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set");
      return NextResponse.json({ error: "Server is missing Groq API key" }, { status: 500 });
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.4,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq error:", errText);
      return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}