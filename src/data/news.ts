// src/data/news.ts

export type NewsArticle = {
  id: number;
  title: string;
  source: string;
  sourceUrl: string;
  category: "AI Models" | "AI Tools" | "Funding" | "Research" | "Datasets";
  timeAgo: string;
  comments: number;
  logo: string;
  group: "Today" | "Yesterday" | "Earlier This Week";
};

export const newsArticles: NewsArticle[] = [
  { id: 1, title: "OpenAI launches GPT-4o with multimodal capabilities and native reasoning", source: "openai.com", sourceUrl: "https://openai.com", category: "AI Models", timeAgo: "2 hours ago", comments: 24, logo: "🤖", group: "Today" },
  { id: 2, title: "Anthropic releases Claude 3.5 with expanded context window", source: "anthropic.com", sourceUrl: "https://anthropic.com", category: "AI Models", timeAgo: "5 hours ago", comments: 18, logo: "A", group: "Today" },
  { id: 3, title: "Google DeepMind introduces Gemini 1.5 Pro with long-context understanding", source: "deepmind.google", sourceUrl: "https://deepmind.google", category: "AI Models", timeAgo: "8 hours ago", comments: 31, logo: "G", group: "Today" },
  { id: 4, title: "Meta open-sources Llama 3 with state-of-the-art performance", source: "ai.meta.com", sourceUrl: "https://ai.meta.com", category: "Research", timeAgo: "10 hours ago", comments: 27, logo: "M", group: "Today" },
  { id: 5, title: "NVIDIA unveils new AI chips for real-time inference at scale", source: "nvidia.com", sourceUrl: "https://nvidia.com", category: "AI Tools", timeAgo: "12 hours ago", comments: 16, logo: "N", group: "Today" },
  { id: 6, title: "Mistral AI launches Mixtral 8x228, a new sparse MoE model", source: "mistral.ai", sourceUrl: "https://mistral.ai", category: "AI Models", timeAgo: "16 hours ago", comments: 16, logo: "M", group: "Today" },
  { id: 7, title: "Cohere introduces Command R+ with improved reasoning and tool use", source: "cohere.com", sourceUrl: "https://cohere.com", category: "AI Tools", timeAgo: "18 hours ago", comments: 14, logo: "C", group: "Today" },
  { id: 8, title: "Hugging Face releases Transformers v5 with major performance boosts", source: "huggingface.co", sourceUrl: "https://huggingface.co", category: "AI Tools", timeAgo: "20 hours ago", comments: 22, logo: "🤗", group: "Today" },
  { id: 9, title: "Stability AI releases Stable Diffusion 3 with improved quality and speed", source: "stability.ai", sourceUrl: "https://stability.ai", category: "AI Models", timeAgo: "23 hours ago", comments: 19, logo: "S", group: "Today" },
  { id: 10, title: "Databricks launches DBRX Instruct for enterprise AI applications", source: "databricks.com", sourceUrl: "https://databricks.com", category: "AI Tools", timeAgo: "1 day ago", comments: 13, logo: "D", group: "Yesterday" },
  { id: 11, title: "xAI releases Grok-1.5 with enhanced reasoning capabilities", source: "x.ai", sourceUrl: "https://x.ai", category: "AI Models", timeAgo: "1 day ago", comments: 17, logo: "X", group: "Yesterday" },
  { id: 12, title: "Pinecone introduces serverless vector database for AI workloads", source: "pinecone.io", sourceUrl: "https://pinecone.io", category: "AI Tools", timeAgo: "1 day ago", comments: 9, logo: "P", group: "Yesterday" },
  { id: 13, title: "Scale AI announces Scale Data Engine for LLM fine-tuning", source: "scale.com", sourceUrl: "https://scale.com", category: "AI Tools", timeAgo: "1 day ago", comments: 12, logo: "S", group: "Yesterday" },
  { id: 14, title: "Runway releases Gen-3 Alpha with cinematic video generation", source: "runwayml.com", sourceUrl: "https://runwayml.com", category: "AI Tools", timeAgo: "1 day ago", comments: 16, logo: "R", group: "Yesterday" },
  { id: 15, title: "ElevenLabs launches Voice Design v2 with emotion control", source: "elevenlabs.io", sourceUrl: "https://elevenlabs.io", category: "AI Tools", timeAgo: "2 days ago", comments: 8, logo: "E", group: "Earlier This Week" },
  { id: 16, title: "Replit introduces AI Agent for autonomous software development", source: "replit.com", sourceUrl: "https://replit.com", category: "AI Tools", timeAgo: "2 days ago", comments: 11, logo: "R", group: "Earlier This Week" },
  { id: 17, title: "Weights & Biases launches Weave for LLM evaluation and monitoring", source: "wandb.ai", sourceUrl: "https://wandb.ai", category: "AI Tools", timeAgo: "2 days ago", comments: 10, logo: "W", group: "Earlier This Week" },
  { id: 18, title: "LangChain releases LangGraph for stateful AI workflows", source: "langchain.com", sourceUrl: "https://langchain.com", category: "AI Tools", timeAgo: "2 days ago", comments: 9, logo: "L", group: "Earlier This Week" },
  { id: 19, title: "Foundation Models Forum releases best practices for AI transparency", source: "fmforum.org", sourceUrl: "https://fmforum.org", category: "Research", timeAgo: "3 days ago", comments: 6, logo: "F", group: "Earlier This Week" },
  { id: 20, title: "IBM unveils Granite 3.0 foundation models for enterprise", source: "ibm.com", sourceUrl: "https://ibm.com", category: "AI Models", timeAgo: "3 days ago", comments: 11, logo: "I", group: "Earlier This Week" },
];

export const trendingTags = [
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

export const trendingStartups = [
  { name: "OpenAI", description: "Building safe AGI" },
  { name: "Anthropic", description: "AI research company" },
  { name: "Perplexity", description: "AI search engine" },
  { name: "Midjourney", description: "AI image generation" },
  { name: "Cursor", description: "AI code editor" },
];

export const CATEGORY_FILTERS = [
  "All News",
  "AI Models",
  "AI Tools",
  "Funding",
  "Research",
  "Datasets",
] as const;

export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export const GROUPS = ["Today", "Yesterday", "Earlier This Week"] as const;