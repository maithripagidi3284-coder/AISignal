"use client";

import { useState } from "react";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { companies } from "@/data/companies";
import {
  Search, Heart, MessageCircle, Sparkles, TrendingUp,
  Code2, MessageSquare, Bot, Image, Video, Mic, Zap, MoreHorizontal, ChevronRight
} from "lucide-react";

const mostSearched = [
  { name: "Databricks", icon: "🔶" },
  { name: "Notion", icon: "⬛" },
  { name: "Pinecone", icon: "🌲" },
  { name: "Weaviate", icon: "🟢" },
  { name: "LangChain", icon: "🔗" },
];

const categoryTabs = [
  { label: "All", icon: "⊞" },
  { label: "Chat", icon: "💬" },
  { label: "Code", icon: "</>" },
  { label: "Agents", icon: "🤖" },
  { label: "Image", icon: "🖼" },
  { label: "Video", icon: "▶" },
  { label: "Voice", icon: "🎤" },
  { label: "Productivity", icon: "📋" },
];

const trendingSearches = [
  "Cursor", "Claude", "Vibe Coding",
  "Lovable", "Perplexity", "Midjourney",
  "Runway", "MCP", "AI Agents",
  "AI Notetaker",
];

const popularRightNow = [
  { name: "Cursor", tagline: "AI code editor", bg: "bg-gray-900", color: "text-white" },
  { name: "Claude", tagline: "AI assistant", bg: "bg-orange-500", color: "text-white" },
  { name: "Lovable", tagline: "AI app builder", bg: "bg-pink-500", color: "text-white" },
  { name: "Midjourney", tagline: "Image generator", bg: "bg-blue-100", color: "text-blue-800" },
  { name: "Perplexity", tagline: "AI search", bg: "bg-teal-600", color: "text-white" },
  { name: "Runway", tagline: "Video gen", bg: "bg-green-500", color: "text-white" },
];

const productList = [
  {
    name: "Cursor", initial: "C", bg: "bg-gray-900", color: "text-white",
    tagline: "The AI-first code editor built for speed and productivity.",
    tags: ["Code", "Developer Tools"], badge: "Trending in Coding", badgeColor: "text-orange-500 bg-orange-50",
    likes: "8.3K", comments: 173,
  },
  {
    name: "Claude", initial: "C", bg: "bg-orange-500", color: "text-white",
    tagline: "AI assistant for thoughtful work and collaboration.",
    tags: ["Chat", "Productivity"], badge: "Most used this week", badgeColor: "text-green-600 bg-green-50",
    likes: "6.7K", comments: 89,
  },
  {
    name: "Midjourney", initial: "M", bg: "bg-blue-100", color: "text-blue-800",
    tagline: "AI image generator for creators and designers.",
    tags: ["Image", "Design"], badge: "Top rated in Image", badgeColor: "text-blue-500 bg-blue-50",
    likes: "5.5K", comments: 386,
  },
  {
    name: "ChatGPT", initial: "G", bg: "bg-green-600", color: "text-white",
    tagline: "Conversational AI for any question or task.",
    tags: ["Chat", "Artificial Intelligence"], badge: "Most used this week", badgeColor: "text-green-600 bg-green-50",
    likes: "5.1K", comments: 341,
  },
  {
    name: "Runway", initial: "R", bg: "bg-green-500", color: "text-white",
    tagline: "AI video creation platform for everyone.",
    tags: ["Video"], badge: "Fastest growing", badgeColor: "text-purple-500 bg-purple-50",
    likes: "3.9K", comments: 210,
  },
  {
    name: "ElevenLabs", initial: "E", bg: "bg-gray-900", color: "text-white",
    tagline: "AI voice synthesis and audio tools.",
    tags: ["Voice", "Audio"], badge: "Trending in Voice", badgeColor: "text-orange-500 bg-orange-50",
    likes: "3.2K", comments: 175,
  },
  {
    name: "Perplexity", initial: "P", bg: "bg-teal-600", color: "text-white",
    tagline: "AI search engine for real-time answers.",
    tags: ["Search", "Productivity"], badge: "Most used this week", badgeColor: "text-green-600 bg-green-50",
    likes: "2.9K", comments: 144,
  },
  {
    name: "Notion AI", initial: "N", bg: "bg-gray-900", color: "text-white",
    tagline: "AI notes, docs and knowledge workspace.",
    tags: ["Productivity", "Writing"], badge: null, badgeColor: null,
    likes: "2.6K", comments: 128,
  },
  {
    name: "Descript", initial: "D", bg: "bg-blue-500", color: "text-white",
    tagline: "Edit audio & video like a doc.",
    tags: ["Video", "Audio"], badge: null, badgeColor: null,
    likes: "2.3K", comments: 98,
  },
  {
    name: "Canva AI", initial: "C", bg: "bg-cyan-500", color: "text-white",
    tagline: "Design anything with AI, together.",
    tags: ["Design"], badge: null, badgeColor: null,
    likes: "2.1K", comments: 86,
  },
];

function resolveHref(name: string): string {
  const match = companies.find((c) => c.name.toLowerCase() === name.toLowerCase());
  return match ? `/companies/${match.id}` : `/products?search=${encodeURIComponent(name)}`;
}

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [activeSort, setActiveSort] = useState<"popular" | "newest">("popular");
  const [visibleCount, setVisibleCount] = useState(5);

  const floatingCompanies = [
    { name: "OpenAI", initial: "O", top: "4%", left: "58%", shadow: true },
    { name: "Anthropic", initial: "A", top: "28%", left: "38%", shadow: false },
    { name: "Cursor", initial: "C", top: "8%", left: "80%", shadow: true },
    { name: "Midjourney", initial: "M", top: "62%", left: "48%", shadow: false },
    { name: "Perplexity", initial: "P", top: "55%", left: "74%", shadow: true },
  ];

  const filteredProducts =
    activeTab === "All"
      ? productList
      : productList.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(activeTab.toLowerCase()))
        );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/companies?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="w-full px-10 py-8 max-w-[900px]">

      {/* ── HERO ── */}
      <div className="relative grid grid-cols-[1fr_340px] gap-4 items-start mb-8 min-h-[260px]">
        <div className="pt-2">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e5173f] inline-block" />
            <span className="text-[11px] font-bold text-[#e5173f] uppercase tracking-widest">Live AI Intelligence</span>
          </div>
          <h1 className="text-[32px] font-black text-gray-900 leading-[1.15] mb-3">
            The Global Intelligence<br />
            Layer <span className="text-[#e5173f]">for AI.</span>
          </h1>
          <p className="text-[13px] text-gray-500 mb-5 max-w-[360px]">
            One graph connecting companies, founders, investors, products, funding and talent.
          </p>

          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 max-w-[420px] shadow-sm mb-4">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies, founders, investors, products or funding rounds..."
              className="flex-1 text-[13px] text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
            />
            <button type="submit" className="bg-[#e5173f] text-white rounded-lg p-1.5 hover:bg-[#c4122f] transition-colors shrink-0">
              <Search size={12} />
            </button>
          </form>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] text-gray-400">Most searched</span>
            {mostSearched.map((item) => (
              <Link
                key={item.name}
                href={`/companies?search=${encodeURIComponent(item.name)}`}
                className="flex items-center gap-1.5 text-[12px] px-3 py-1 border border-gray-200 rounded-full text-gray-600 hover:border-[#e5173f] hover:text-[#e5173f] transition-colors bg-white"
              >
                <span className="text-[10px]">{item.icon}</span> {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Floating company cards */}
        <div className="relative h-[240px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px]">
            <div className="absolute inset-0 rounded-full bg-red-50 opacity-40 scale-150" />
            <div className="absolute inset-0 rounded-full bg-red-50 opacity-30 scale-[2]" />
            <div className="w-14 h-14 rounded-2xl bg-[#e5173f] flex items-center justify-center shadow-xl shadow-red-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Sparkles size={22} className="text-white" />
            </div>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * 2 * Math.PI;
              const r = 52;
              return (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-red-300 opacity-60"
                  style={{
                    top: `calc(50% + ${Math.sin(angle) * r}px - 3px)`,
                    left: `calc(50% + ${Math.cos(angle) * r}px - 3px)`,
                  }}
                />
              );
            })}
          </div>

          {floatingCompanies.map((c) => (
            <Link
              key={c.name}
              href={resolveHref(c.name)}
              style={{ top: c.top, left: c.left }}
              className="absolute flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-md hover:shadow-lg hover:border-[#e5173f] transition-all z-20 whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm shrink-0">
                {c.initial}
              </div>
              <span className="text-[13px] font-semibold text-gray-800">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── MAIN + SIDEBAR ── */}
      <div className="grid grid-cols-[1fr_256px] gap-6">

        {/* LEFT */}
        <div>
          {/* Collection of the Week */}
          <div className="border border-gray-100 rounded-2xl p-5 mb-5 flex items-center justify-between bg-white overflow-hidden relative">
            <div className="flex-1">
              <div className="text-[10px] font-bold text-[#e5173f] uppercase tracking-widest mb-2">
                🔥 Collection of the Week
              </div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">🔥</span>
                <h2 className="text-[22px] font-black text-gray-900">Vibe Coding Tools</h2>
              </div>
              <p className="text-[13px] text-gray-500 mb-3">The best AI tools for vibe coding, building and shipping faster.</p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {["#e5173f", "#f97316", "#8b5cf6", "#06b6d4"].map((bg, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: bg }} />
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[9px] text-gray-500 font-bold">+2</div>
                </div>
                <span className="text-[12px] text-gray-400">2,341 products</span>
              </div>
            </div>
            <div className="shrink-0 w-[180px] h-[90px] relative ml-4">
              <div className="absolute right-0 top-0 w-[160px] h-[80px] bg-gray-50 border border-gray-100 rounded-xl p-2 text-[9px] font-mono text-gray-400 overflow-hidden">
                <div className="text-blue-400">&lt;/&gt;</div>
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                  <div className="h-1.5 bg-gray-200 rounded w-1/2" />
                  <div className="h-1.5 bg-blue-100 rounded w-2/3" />
                </div>
                <div className="mt-2 flex gap-1">
                  <div className="bg-[#e5173f] text-white rounded px-1.5 py-0.5 text-[8px]">Deploy</div>
                </div>
              </div>
            </div>
            <Link
              href="/products?search=coding"
              className="absolute bottom-5 right-5 bg-[#e5173f] text-white text-[12px] font-semibold px-4 py-2 rounded-lg hover:bg-[#c4122f] transition-colors"
            >
              Explore Collection →
            </Link>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-0.5 border-b border-gray-100 mb-5 overflow-x-auto">
            {categoryTabs.map((cat) => (
              <button
                key={cat.label}
                onClick={() => { setActiveTab(cat.label); setVisibleCount(5); }}
                className={`flex items-center gap-1.5 text-[13px] px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === cat.label
                    ? "border-[#e5173f] text-[#e5173f] font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="text-[11px]">{cat.icon}</span> {cat.label}
              </button>
            ))}
            <button className="flex items-center gap-1 text-[13px] px-3 py-2.5 text-gray-400 hover:text-gray-600 whitespace-nowrap">
              More <ChevronRight size={13} />
            </button>
          </div>

          {/* Popular Right Now */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-3">
              <Zap size={13} className="text-[#e5173f]" fill="#e5173f" />
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">Popular right now</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {popularRightNow.map((p) => (
                <Link
                  key={p.name}
                  href={resolveHref(p.name)}
                  className="flex items-center gap-2.5 border border-gray-100 rounded-xl px-3 py-2.5 shrink-0 hover:border-[#e5173f] transition-colors group bg-white"
                >
                  <div className={`w-8 h-8 rounded-lg ${p.bg} ${p.color} flex items-center justify-center text-[11px] font-bold shrink-0`}>
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900 group-hover:text-[#e5173f] transition-colors whitespace-nowrap">{p.name}</p>
                    <p className="text-[11px] text-gray-400 whitespace-nowrap">{p.tagline}</p>
                  </div>
                </Link>
              ))}
              <button className="border border-gray-100 rounded-xl px-3 flex items-center text-gray-400 hover:border-gray-200 shrink-0">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Sort + count */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSort("popular")}
                className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  activeSort === "popular" ? "bg-red-50 text-[#e5173f]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                🔥 Most Popular
              </button>
              <button
                onClick={() => setActiveSort("newest")}
                className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors ${
                  activeSort === "newest" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                ✨ Newest
              </button>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray-400">
              <span>20,458 products</span>
              <span>Sort by: <span className="text-gray-700 font-medium">Popular</span></span>
            </div>
          </div>

          {/* Product list */}
          <div className="mb-3">
            {filteredProducts.slice(0, visibleCount).map((p, i) => (
              <Link
                key={p.name + i}
                href={resolveHref(p.name)}
                className="flex items-center gap-3 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors px-1 -mx-1 rounded-lg"
              >
                <div className={`w-10 h-10 rounded-xl ${p.bg} ${p.color} flex items-center justify-center text-[13px] font-bold shrink-0`}>
                  {p.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-gray-900">{p.name}</p>
                  <p className="text-[12px] text-gray-400 truncate">{p.tagline}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">{t}</span>
                    ))}
                    {p.badge && (
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${p.badgeColor}`}>
                        ⚡ {p.badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-gray-400">
                  <span className="flex items-center gap-1 text-[12px] hover:text-[#e5173f] transition-colors">
                    <Heart size={13} /> {p.likes}
                  </span>
                  <span className="flex items-center gap-1 text-[12px]">
                    <MessageCircle size={13} /> {p.comments}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Sponsored */}
          <div className="border border-purple-100 bg-white rounded-xl px-4 py-3 mb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Sponsored</span>
              <p className="text-[14px] font-bold text-gray-900 mt-0.5">Build AI agents in minutes</p>
              <p className="text-[12px] text-gray-500">The all-in-one platform to design, deploy and scale AI workflows.</p>
            </div>
            <div className="flex items-center gap-3 ml-4 shrink-0">
              <div className="flex gap-1">
                {["🔵", "🟣", "⚙️"].map((e, i) => (
                  <div key={i} className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center text-sm">{e}</div>
                ))}
              </div>
              <button className="bg-purple-600 text-white text-[12px] font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
                Try GraphOne Studio →
              </button>
            </div>
          </div>

          {/* More products after sponsored */}
          {filteredProducts.slice(visibleCount, visibleCount + 5).map((p, i) => (
            <Link
              key={p.name + "b" + i}
              href={resolveHref(p.name)}
              className="flex items-center gap-3 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors px-1 -mx-1 rounded-lg"
            >
              <div className={`w-10 h-10 rounded-xl ${p.bg} ${p.color} flex items-center justify-center text-[13px] font-bold shrink-0`}>
                {p.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-900">{p.name}</p>
                <p className="text-[12px] text-gray-400 truncate">{p.tagline}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">{t}</span>
                  ))}
                  {p.badge && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${p.badgeColor}`}>
                      ⚡ {p.badge}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-gray-400">
                <span className="flex items-center gap-1 text-[12px]"><Heart size={13} /> {p.likes}</span>
                <span className="flex items-center gap-1 text-[12px]"><MessageCircle size={13} /> {p.comments}</span>
              </div>
            </Link>
          ))}

          <button
            onClick={() => setVisibleCount((v) => v + 5)}
            className="w-full py-3 border border-gray-200 rounded-xl text-[13px] text-gray-500 hover:bg-gray-50 transition-colors mt-4 flex items-center justify-center gap-2"
          >
            Load more products ↓
          </button>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="flex flex-col gap-5">

          {/* Product of the Day */}
          <div className="border border-gray-100 rounded-xl p-4 bg-white">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-base">🏆</span>
              <span className="text-[12px] font-bold text-gray-700">Product of the Day</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-sm shrink-0">C</div>
              <div>
                <p className="text-[14px] font-bold text-gray-900">Cursor</p>
                <p className="text-[12px] text-gray-400">AI-first code editor</p>
              </div>
            </div>
            <Link
              href={resolveHref("Cursor")}
              className="block text-center w-full bg-[#e5173f] text-white py-2 rounded-lg text-[12px] font-semibold hover:bg-[#c4122f] transition-colors"
            >
              View Product
            </Link>
          </div>

          {/* Trending Searches */}
          <div className="border border-gray-100 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp size={13} className="text-[#e5173f]" />
                <span className="text-[12px] font-bold text-gray-700">Trending Searches</span>
              </div>
              <Link href="/companies" className="text-[11px] text-gray-400 hover:text-[#e5173f]">View all</Link>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {trendingSearches.map((term) => (
                <Link
                  key={term}
                  href={`/companies?search=${encodeURIComponent(term)}`}
                  className="text-[11px] px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-gray-600 hover:border-[#e5173f] hover:text-[#e5173f] transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          {/* Stay ahead / Newsletter */}
          <div className="border border-gray-100 rounded-xl p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                <span className="text-sm">✉️</span>
              </div>
              <span className="text-[13px] font-bold text-gray-800">Stay ahead in AI</span>
            </div>
            <p className="text-[12px] text-gray-400 mb-3">Get weekly updates on new tools and trends.</p>
            <NewsletterSignup />
          </div>

          {/* Footer links */}
          <div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
              {["About", "Advertise", "API", "Newsletter", "Blog", "Privacy", "Terms", "Contact"].map((l) => (
                <Link key={l} href="#" className="text-[11px] text-gray-400 hover:text-[#e5173f] transition-colors">{l}</Link>
              ))}
            </div>
            <p className="text-[11px] text-gray-400">© 2024 GraphOne.<br />All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}