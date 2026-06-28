// src/data/products.ts

export type Product = {
  id: number;
  name: string;
  desc: string;
  category: "Chat" | "Code" | "Agents" | "Image" | "Video" | "Voice" | "Productivity";
  tags: string[];
  logo: string;
  votes: number;
  badge: "trend" | "new" | "top" | null;
  badgeLabel: string | null;
  isNew: boolean;
  featured?: boolean;
};

export const products: Product[] = [
  { id: 1, name: "Cursor", desc: "The AI-first code editor built for speed and productivity.", category: "Code", tags: ["Code", "Developer Tools"], logo: "⬛", votes: 8300, badge: "trend", badgeLabel: "Trending in Coding", isNew: false, featured: true },
  { id: 2, name: "Claude", desc: "AI assistant for thoughtful work and collaboration.", category: "Chat", tags: ["Chat", "Productivity"], logo: "🔶", votes: 6700, badge: "new", badgeLabel: "Most used this week", isNew: false },
  { id: 3, name: "Midjourney", desc: "AI image generator for creators and designers.", category: "Image", tags: ["Image", "Design"], logo: "🛶", votes: 5500, badge: "top", badgeLabel: "Top rated in Image", isNew: false },
  { id: 4, name: "ChatGPT", desc: "Conversational AI for any question or task.", category: "Chat", tags: ["Chat", "Artificial Intelligence"], logo: "🤖", votes: 5100, badge: "new", badgeLabel: "Most used this week", isNew: false },
  { id: 5, name: "Runway", desc: "AI video creation platform for everyone.", category: "Video", tags: ["Video"], logo: "🎬", votes: 3900, badge: "trend", badgeLabel: "Fastest growing", isNew: false },
  { id: 6, name: "ElevenLabs", desc: "AI voice synthesis and audio tools.", category: "Voice", tags: ["Voice", "Audio"], logo: "🎙️", votes: 3200, badge: "trend", badgeLabel: "Trending in Voice", isNew: false },
  { id: 7, name: "Perplexity", desc: "AI search engine for real-time answers.", category: "Chat", tags: ["Search", "Productivity"], logo: "🔵", votes: 2900, badge: "new", badgeLabel: "Most used this week", isNew: false },
  { id: 8, name: "Notion AI", desc: "AI notes, docs and knowledge workspace.", category: "Productivity", tags: ["Productivity", "Writing"], logo: "⬜", votes: 2600, badge: null, badgeLabel: null, isNew: false },
  { id: 9, name: "Descript", desc: "Edit audio and video like a doc.", category: "Video", tags: ["Video", "Audio"], logo: "📝", votes: 2300, badge: null, badgeLabel: null, isNew: false },
  { id: 10, name: "Canva AI", desc: "Design anything with AI, together.", category: "Image", tags: ["Design", "Productivity"], logo: "🎨", votes: 2100, badge: null, badgeLabel: null, isNew: false },
  { id: 11, name: "Lovable", desc: "Build full-stack apps with AI in minutes.", category: "Code", tags: ["Code", "Agents"], logo: "❤️", votes: 1900, badge: "trend", badgeLabel: "Fastest growing", isNew: true },
  { id: 12, name: "Pika", desc: "AI video generation from text and images.", category: "Video", tags: ["Video", "Image"], logo: "✨", votes: 1700, badge: "new", badgeLabel: "New", isNew: true },
  { id: 13, name: "Synthesia", desc: "Create AI video with realistic avatars.", category: "Video", tags: ["Video"], logo: "🎭", votes: 1500, badge: null, badgeLabel: null, isNew: false },
  { id: 14, name: "Kling AI", desc: "Next-gen video generation from text.", category: "Video", tags: ["Video"], logo: "🎞️", votes: 1400, badge: "new", badgeLabel: "New", isNew: true },
  { id: 15, name: "Bolt", desc: "Full-stack web apps from a single prompt.", category: "Agents", tags: ["Code", "Agents"], logo: "⚡", votes: 1300, badge: "trend", badgeLabel: "Trending", isNew: true },
  { id: 16, name: "Suno", desc: "Create music with AI from any prompt.", category: "Voice", tags: ["Voice", "Audio"], logo: "🎵", votes: 1200, badge: null, badgeLabel: null, isNew: false },
  { id: 17, name: "Gamma", desc: "AI-powered slides, docs and webpages.", category: "Productivity", tags: ["Productivity", "Design"], logo: "γ", votes: 1100, badge: null, badgeLabel: null, isNew: false },
  { id: 18, name: "Luma AI", desc: "3D scenes and video from text or images.", category: "Image", tags: ["Image", "Video"], logo: "🌟", votes: 1000, badge: "new", badgeLabel: "New", isNew: true },
];

export const CATEGORY_TABS = [
  "All", "Chat", "Code", "Agents", "Image", "Video", "Voice", "Productivity",
] as const;

export type CategoryTab = (typeof CATEGORY_TABS)[number];

export const ALL_TAGS = [
  "Code", "Chat", "Image", "Video", "Voice", "Productivity",
  "Agents", "Design", "Audio", "Writing",
];

export const TRENDING_SEARCHES = [
  "Cursor", "Claude", "Vibe Coding", "Lovable", "Perplexity",
  "Midjourney", "Runway", "MCP", "AI Agents", "AI Notetaker",
];

export const PRODUCT_OF_DAY = {
  name: "Cursor",
  desc: "AI-first code editor",
  logo: "⬛",
};