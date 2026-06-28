"use client";

import { useState } from "react";

const CATEGORIES = ["All News", "AI Models", "AI Tools", "Funding", "Research", "Datasets"];

const TRENDING_TAGS = [
  { name: "Large Language Models", count: 128 },
  { name: "AI Models", count: 97 },
  { name: "Open Source", count: 96 },
  { name: "Funding & Deals", count: 74 },
  { name: "AI Research", count: 63 },
  { name: "Generative AI", count: 58 },
  { name: "Multimodal", count: 48 },
  { name: "Machine Learning", count: 44 },
  { name: "LLM", count: 39 },
];

const TRENDING_STARTUPS = [
  { name: "OpenAI", desc: "Building safe AGI", domain: "openai", icon: "https://cdn.simpleicons.org/openai/000000" },
  { name: "Anthropic", desc: "AI research company", domain: "anthropic", icon: "https://cdn.simpleicons.org/anthropic/000000" },
  { name: "Perplexity", desc: "AI search engine", domain: "perplexity", icon: "https://cdn.simpleicons.org/perplexity/000000" },
  { name: "Midjourney", desc: "AI image generation", domain: "midjourney", icon: "https://cdn.simpleicons.org/midjourney/000000" },
  { name: "Cursor", desc: "AI code editor", domain: "cursor", icon: "https://cdn.simpleicons.org/cursor/000000" },
];

const NEWS_ITEMS = [
  // TODAY
  {
    id: 1, group: "TODAY",
    title: "OpenAI launches GPT-4o with multimodal capabilities and native reasoning",
    source: "openai.com", timeAgo: "2 hours ago", comments: 24,
    category: "AI Models", icon: "https://cdn.simpleicons.org/openai/000000",
    iconBg: "#000000", iconColor: "#ffffff",
  },
  {
    id: 2, group: "TODAY",
    title: "Anthropic releases Claude 3.5 with expanded context window",
    source: "anthropic.com", timeAgo: "5 hours ago", comments: 18,
    category: "AI Models", icon: "https://cdn.simpleicons.org/anthropic/000000",
    iconBg: "#cc785c", iconColor: "#ffffff",
  },
  {
    id: 3, group: "TODAY",
    title: "Google DeepMind introduces Gemini 1.5 Pro with long-context understanding",
    source: "deepmind.google", timeAgo: "7 hours ago", comments: 31,
    category: "AI Models", icon: "https://cdn.simpleicons.org/google/000000",
    iconBg: "#ffffff", iconColor: "#4285f4",
  },
  {
    id: 4, group: "TODAY",
    title: "Meta open-sources Llama 3 with state-of-the-art performance",
    source: "ai.meta.com", timeAgo: "10 hours ago", comments: 27,
    category: "Research", icon: "https://cdn.simpleicons.org/meta/000000",
    iconBg: "#0866ff", iconColor: "#ffffff",
  },
  {
    id: 5, group: "TODAY",
    title: "NVIDIA unveils new AI chips for real-time inference at scale",
    source: "nvidia.com", timeAgo: "12 hours ago", comments: 16,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/nvidia/000000",
    iconBg: "#76b900", iconColor: "#ffffff",
  },
  {
    id: 6, group: "TODAY",
    title: "Mistral AI launches Mixtral 8x22B, a new sparse MoE model",
    source: "mistral.ai", timeAgo: "16 hours ago", comments: 16,
    category: "AI Models", icon: "https://cdn.simpleicons.org/mistral/000000",
    iconBg: "#ff7000", iconColor: "#ffffff",
  },
  {
    id: 7, group: "TODAY",
    title: "Cohere introduces Command R+ with improved reasoning and tool use",
    source: "cohere.com", timeAgo: "18 hours ago", comments: 14,
    category: "AI Models", icon: "https://cdn.simpleicons.org/cohere/000000",
    iconBg: "#39594d", iconColor: "#ffffff",
  },
  {
    id: 8, group: "TODAY",
    title: "Hugging Face releases Transformers v5 with major performance boosts",
    source: "huggingface.co", timeAgo: "20 hours ago", comments: 22,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/huggingface/000000",
    iconBg: "#ffd21e", iconColor: "#000000",
  },
  {
    id: 9, group: "TODAY",
    title: "Lightning AI launches Lightning Studio 2.0 for end-to-end model deployment",
    source: "lightning.ai", timeAgo: "22 hours ago", comments: 11,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/lightning/000000",
    iconBg: "#792ee5", iconColor: "#ffffff",
  },
  {
    id: 10, group: "TODAY",
    title: "Stability AI releases Stable Diffusion 3 with improved quality and speed",
    source: "stability.ai", timeAgo: "23 hours ago", comments: 19,
    category: "AI Models", icon: "https://cdn.simpleicons.org/stability/000000",
    iconBg: "#1a1a1a", iconColor: "#ffffff",
  },
  // YESTERDAY
  {
    id: 11, group: "YESTERDAY",
    title: "Databricks launches DBRX Instruct for enterprise AI applications",
    source: "databricks.com", timeAgo: "1 day ago", comments: 13,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/databricks/000000",
    iconBg: "#ff3621", iconColor: "#ffffff",
  },
  {
    id: 12, group: "YESTERDAY",
    title: "xAI releases Grok-1.5 with enhanced reasoning capabilities",
    source: "x.ai", timeAgo: "1 day ago", comments: 17,
    category: "AI Models", icon: "https://cdn.simpleicons.org/x/000000",
    iconBg: "#000000", iconColor: "#ffffff",
  },
  {
    id: 13, group: "YESTERDAY",
    title: "Pinecone introduces serverless vector database for AI workloads",
    source: "pinecone.io", timeAgo: "1 day ago", comments: 9,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/pinecone/000000",
    iconBg: "#1c1c1c", iconColor: "#ffffff",
  },
  {
    id: 14, group: "YESTERDAY",
    title: "Scale AI announces Scale Data Engine for LLM fine-tuning",
    source: "scale.com", timeAgo: "1 day ago", comments: 12,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/scale/000000",
    iconBg: "#6f4ff2", iconColor: "#ffffff",
  },
  {
    id: 15, group: "YESTERDAY",
    title: "Runway releases Gen-3 Alpha with cinematic video generation",
    source: "runwayml.com", timeAgo: "1 day ago", comments: 16,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/runway/000000",
    iconBg: "#000000", iconColor: "#ffffff",
  },
  {
    id: 16, group: "YESTERDAY",
    title: "ElevenLabs launches Voice Design v2 with emotion control",
    source: "elevenlabs.io", timeAgo: "1 day ago", comments: 8,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/elevenlabs/000000",
    iconBg: "#000000", iconColor: "#ffffff",
  },
  {
    id: 17, group: "YESTERDAY",
    title: "Replit introduces AI Agent for autonomous software development",
    source: "replit.com", timeAgo: "1 day ago", comments: 11,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/replit/000000",
    iconBg: "#f26207", iconColor: "#ffffff",
  },
  {
    id: 18, group: "YESTERDAY",
    title: "Anyscale releases Ray 2.9 with improved distributed training",
    source: "anyscale.com", timeAgo: "1 day ago", comments: 7,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/ray/000000",
    iconBg: "#028cf0", iconColor: "#ffffff",
  },
  {
    id: 19, group: "YESTERDAY",
    title: "Weights & Biases launches Weave for LLM evaluation and monitoring",
    source: "wandb.ai", timeAgo: "1 day ago", comments: 10,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/weightsandbiases/000000",
    iconBg: "#ffbe00", iconColor: "#000000",
  },
  {
    id: 20, group: "YESTERDAY",
    title: "LangChain releases LangGraph for stateful AI workflows",
    source: "langchain.com", timeAgo: "1 day ago", comments: 9,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/langchain/000000",
    iconBg: "#1c3a57", iconColor: "#ffffff",
  },
  // EARLIER THIS WEEK
  {
    id: 21, group: "EARLIER THIS WEEK",
    title: "Foundation Models Forum releases best practices for AI transparency",
    source: "fmforum.org", timeAgo: "2 days ago", comments: 6,
    category: "Research", icon: "https://cdn.simpleicons.org/academia/000000",
    iconBg: "#41454a", iconColor: "#ffffff",
  },
  {
    id: 22, group: "EARLIER THIS WEEK",
    title: "IBM unveils Granite 3.0 foundation models for enterprise",
    source: "ibm.com", timeAgo: "2 days ago", comments: 11,
    category: "AI Models", icon: "https://cdn.simpleicons.org/ibm/000000",
    iconBg: "#1f70c1", iconColor: "#ffffff",
  },
  {
    id: 23, group: "EARLIER THIS WEEK",
    title: "Amazon launches Bedrock Guardrails for AI safety and compliance",
    source: "amazon.com", timeAgo: "3 days ago", comments: 8,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/amazonaws/000000",
    iconBg: "#ff9900", iconColor: "#000000",
  },
  {
    id: 24, group: "EARLIER THIS WEEK",
    title: "Microsoft introduces Phi-3-mini for on-device AI applications",
    source: "microsoft.com", timeAgo: "3 days ago", comments: 16,
    category: "AI Models", icon: "https://cdn.simpleicons.org/microsoft/000000",
    iconBg: "#00a4ef", iconColor: "#ffffff",
  },
  {
    id: 25, group: "EARLIER THIS WEEK",
    title: "OpenRouter hits 100M requests milestone for open models",
    source: "openrouter.ai", timeAgo: "3 days ago", comments: 7,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/openai/000000",
    iconBg: "#6366f1", iconColor: "#ffffff",
  },
  {
    id: 26, group: "EARLIER THIS WEEK",
    title: "Aleph Alpha releases Luminous-Base with advanced multilingual support",
    source: "aleph-alpha.com", timeAgo: "4 days ago", comments: 5,
    category: "AI Models", icon: "https://cdn.simpleicons.org/alephalpha/000000",
    iconBg: "#000000", iconColor: "#ffffff",
  },
  {
    id: 27, group: "EARLIER THIS WEEK",
    title: "TII launches Falcon 180B with improved efficiency",
    source: "tii.ae", timeAgo: "4 days ago", comments: 4,
    category: "AI Models", icon: "https://cdn.simpleicons.org/falcon/000000",
    iconBg: "#6d28d9", iconColor: "#ffffff",
  },
  {
    id: 28, group: "EARLIER THIS WEEK",
    title: "SambaNova releases SN40L chip for AI inference",
    source: "sambanova.ai", timeAgo: "5 days ago", comments: 3,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/nvidia/000000",
    iconBg: "#e05a29", iconColor: "#ffffff",
  },
  {
    id: 29, group: "EARLIER THIS WEEK",
    title: "Graphcore launches IPU-M2000 for large-scale AI training",
    source: "graphcore.ai", timeAgo: "5 days ago", comments: 3,
    category: "AI Tools", icon: "https://cdn.simpleicons.org/graphcore/000000",
    iconBg: "#00c389", iconColor: "#ffffff",
  },
  {
    id: 30, group: "EARLIER THIS WEEK",
    title: "Together AI raises $102M Series B to democratize AI",
    source: "together.ai", timeAgo: "6 days ago", comments: 12,
    category: "Funding", icon: "https://cdn.simpleicons.org/togetherai/000000",
    iconBg: "#000000", iconColor: "#ffffff",
  },
];

const CATEGORY_MAP: Record<string, string> = {
  "AI Models": "AI Models",
  "AI Tools": "AI Tools",
  "Funding": "Funding",
  "Research": "Research",
  "Datasets": "Datasets",
};

function LogoIcon({ src, bg, color, name }: { src: string; bg: string; color: string; name: string }) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <img
        src={src}
        alt={name}
        width={22}
        height={22}
        style={{ filter: color === "#ffffff" ? "invert(1)" : "none" }}
        onError={(e) => {
          const t = e.currentTarget;
          t.style.display = "none";
          const parent = t.parentElement;
          if (parent) {
            parent.innerHTML = `<span style="color:${color};font-weight:700;font-size:14px">${name[0]}</span>`;
          }
        }}
      />
    </div>
  );
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [email, setEmail] = useState("");

  const filtered = activeCategory === "All News"
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter(n => n.category === CATEGORY_MAP[activeCategory]);

  const groups = ["TODAY", "YESTERDAY", "EARLIER THIS WEEK"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-white border-b border-gray-100 px-6 py-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Live AI Intelligence
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Trending AI News</h1>
          <p className="text-gray-500 text-sm">Real-time updates on breakthroughs, launches, and trends shaping the AI revolution.</p>
        </div>
        {/* decorative dots */}
        <div className="absolute right-20 top-6 w-2 h-2 rounded-full bg-red-400 opacity-60" />
        <div className="absolute right-40 top-16 w-1.5 h-1.5 rounded-full bg-red-300 opacity-40" />
        <div className="absolute right-10 top-20 w-1 h-1 rounded-full bg-red-200 opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Category tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-full px-3 py-1.5">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 6h18M6 12h12M10 18h4" />
            </svg>
            Trending Now
          </button>
        </div>

        <div className="flex gap-8">
          {/* Main news list */}
          <div className="flex-1 min-w-0">
            {groups.map(group => {
              const items = filtered.filter(n => n.group === group);
              if (!items.length) return null;
              return (
                <div key={group} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-red-500 tracking-widest uppercase">{group}</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                  <div className="space-y-1">
                    {items.map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 py-3 px-3 rounded-xl hover:bg-gray-50 cursor-pointer group transition-colors"
                      >
                        {/* Rank */}
                        <span className="text-gray-300 text-sm font-mono w-5 text-right flex-shrink-0 mt-0.5">
                          {item.id}
                        </span>
                        {/* Logo */}
                        <LogoIcon src={item.icon} bg={item.iconBg} color={item.iconColor} name={item.title} />
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-red-500 transition-colors leading-snug">
                              {item.title}
                              <span className="ml-2 text-xs text-gray-400 font-normal">{item.source} ↗</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-0.5">{item.category}</span>
                            <span className="text-xs text-gray-400">{item.timeAgo}</span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                              {item.comments} comments
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 space-y-6">
            {/* Trending Tags */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Trending Tags</h3>
                <button className="text-xs text-red-500 hover:underline">View all</button>
              </div>
              <div className="space-y-2">
                {TRENDING_TAGS.map(tag => (
                  <div key={tag.name} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 hover:text-red-500 cursor-pointer">
                      # {tag.name}
                    </span>
                    <span className="text-xs text-gray-400">({tag.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Startups */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Trending Startups</h3>
                <button className="text-xs text-red-500 hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {TRENDING_STARTUPS.map(startup => (
                  <div key={startup.name} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <img
                        src={startup.icon}
                        alt={startup.name}
                        width={16}
                        height={16}
                        style={{ filter: "invert(1)" }}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-red-500 transition-colors">{startup.name}</p>
                      <p className="text-xs text-gray-400">{startup.desc}</p>
                    </div>
                    <span className="ml-auto text-gray-300 group-hover:text-red-400 text-xs">↗</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                  <svg width="14" height="14" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Newsletter</h3>
              </div>
              <p className="text-xs text-gray-400 mb-3">Get the best AI news delivered to your inbox, daily.</p>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 mb-2 outline-none focus:border-red-400"
              />
              <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>

            {/* Daily Digest */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                  <svg width="14" height="14" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Daily Digest</h3>
              </div>
              <p className="text-xs text-gray-400 mb-3">Your daily summary of top AI news and updates.</p>
              <button className="w-full border border-red-500 text-red-500 hover:bg-red-50 text-xs font-semibold py-2 rounded-lg transition-colors">
                View Today's Digest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
