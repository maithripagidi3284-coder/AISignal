"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { companies } from "@/data/companies";
import { Search, ChevronRight, Zap, Users, Code2, Mic, Video, Cpu, Heart, Activity } from "lucide-react";

// ── static data ──────────────────────────────────────────────
const navCategories = ["AI Agents", "AI Coding", "AI Search", "AI Video", "AI Voice", "AI Infrastructure"];

const trendingCompanies = [
  { rank: "01", name: "Cursor", category: "AI Coding", tagline: "The AI-first code editor built for developers.", views: "16.2K", badge: "Trending #1", bg: "from-[#1a1a2e] to-[#16213e]" },
  { rank: "02", name: "Perplexity", category: "AI Search", tagline: "AI search engine for real-time answers.", views: "12.3K", badge: "Trending #2", bg: "from-[#0f1b35] to-[#1a1a4e]" },
  { rank: "03", name: "Midjourney", category: "AI Image", tagline: "Create stunning images from natural language.", views: "9.7K", badge: "Trending #3", bg: "from-[#1a0a2e] to-[#2d1b69]" },
];

const trendingSmall = [
  { rank: "04", name: "Runway", category: "AI Video", views: "7.3K" },
  { rank: "05", name: "Synthesia", category: "AI Video", views: "6.1K" },
];

const fastestGrowing = [
  { name: "Lovable", category: "AI App Builder", color: "bg-gradient-to-br from-pink-400 to-purple-500" },
  { name: "Cohere", category: "AI Infrastructure", color: "bg-gradient-to-br from-purple-400 to-indigo-500" },
  { name: "ElevenLabs", category: "AI Voice", color: "bg-gradient-to-br from-gray-700 to-gray-900" },
  { name: "Pika", category: "AI Video", color: "bg-gradient-to-br from-orange-400 to-pink-500" },
  { name: "Mistral AI", category: "AI Models", color: "bg-gradient-to-br from-orange-500 to-red-500" },
];

const emergingStartups = [
  { name: "Glean", category: "AI Search", tagline: "Enterprise AI search across all your data.", founded: "2022", size: "51-100", color: "bg-purple-100", textColor: "text-purple-700", featured: true },
  { name: "Reka", category: "AI Research", tagline: "Building multimodal AI models.", founded: "2023", size: "11-50" },
  { name: "Hugging Face", category: "AI Infrastructure", tagline: "The AI community building the future.", founded: "2016", size: "201-600" },
  { name: "Mistral AI", category: "AI Models", tagline: "Frontier AI models for every builder.", founded: "2023", size: "11-100", color: "bg-gradient-to-br from-orange-400 to-yellow-300", featured: true, right: true },
];

const browseCategories = [
  { label: "AI Agents", count: "1,248", icon: Users },
  { label: "AI Coding", count: "863", icon: Code2 },
  { label: "AI Search", count: "324", icon: Search },
  { label: "AI Video", count: "560", icon: Video },
  { label: "AI Voice", count: "412", icon: Mic },
  { label: "AI Infrastructure", count: "972", icon: Cpu },
  { label: "Healthcare AI", count: "647", icon: Heart },
  { label: "Robotics", count: "396", icon: Activity },
];

const breakoutCompanies = [
  { name: "Pika", detail: "Launched new 1.0 video model" },
  { name: "Cognition", detail: "Closed $175M Series B" },
  { name: "Adopt", detail: "Enterprise adoption surged 200%" },
];

const recentlyFunded = [
  { name: "xAI", round: "$6B Series B", date: "May 26, 2025", investors: "a16z" },
  { name: "Databricks", round: "$10B Series J", date: "May 21, 2025", investors: "Microsoft" },
  { name: "Mistral AI", round: "$640M Series B", date: "May 20, 2025", investors: "Lightspeed" },
];

const startupsToWatch = [
  { name: "Deci", category: "AI inference platform", detail: "High performance." },
  { name: "Typeface", category: "AI Marketing platform", detail: "Customized content." },
  { name: "Granola", category: "AI Notetaker", detail: "For teams." },
];

const unicorns = [
  { name: "OpenAI", valuation: "$808B+", initial: "O", bg: "bg-gray-900" },
  { name: "Anthropic", valuation: "$18.4B", initial: "A", bg: "bg-orange-500" },
  { name: "Databricks", valuation: "$43B", initial: "D", bg: "bg-red-600" },
  { name: "Perplexity", valuation: "$9B", initial: "P", bg: "bg-teal-600" },
  { name: "xAI", valuation: "$24B", initial: "x", bg: "bg-gray-900" },
];

const frontierLabs = [
  { name: "OpenAI", initial: "O" },
  { name: "Anthropic", initial: "A" },
  { name: "Google DeepMind", initial: "G" },
  { name: "xAI", initial: "x" },
  { name: "Meta AI", initial: "M" },
  { name: "SSI", initial: "S" },
];

const openSourceLeaders = [
  { name: "Hugging Face", stars: "160K", emoji: "🤗" },
  { name: "Mistral AI", stars: "28K", emoji: "🌊" },
  { name: "Ollama", stars: "16K", emoji: "🦙" },
  { name: "Together AI", stars: "9K", emoji: "🤝" },
  { name: "Databricks", stars: "9K", emoji: "🔶" },
];

const collections = [
  { name: "OpenAI Alumni Startups", count: "42 companies", bg: "bg-gradient-to-br from-gray-700 to-gray-900" },
  { name: "YC AI Startups", count: "263 companies", bg: "bg-gradient-to-br from-orange-500 to-red-500" },
  { name: "AI Agent Leaders", count: "127 companies", bg: "bg-gradient-to-br from-blue-500 to-purple-600" },
  { name: "AI Infrastructure Leaders", count: "196 companies", bg: "bg-gradient-to-br from-teal-500 to-blue-600" },
  { name: "Most Funded AI Startups", count: "184 companies", bg: "bg-gradient-to-br from-purple-500 to-pink-500" },
];

const newOnGraphOne = [
  { name: "MemGPT", category: "AI Memory", initial: "M" },
  { name: "Bria AI", category: "AI Visual", initial: "B" },
  { name: "CharacterX", category: "AI Chat", initial: "C" },
  { name: "Unify", category: "AI Infra", initial: "U" },
  { name: "Palette", category: "AI Design", initial: "P" },
];

function resolveHref(name: string): string {
  const match = companies.find((c) => c.name.toLowerCase() === name.toLowerCase());
  return match ? `/companies/${match.id}` : `/companies?search=${encodeURIComponent(name)}`;
}

function SectionHeader({ number, title, subtitle, viewAll }: { number: string; title: string; subtitle: string; viewAll?: boolean }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start gap-3">
        <span className="text-xs font-bold text-gray-400 mt-0.5">{number}</span>
        <div>
          <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
          <p className="text-[12px] text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {viewAll && (
        <Link href="/companies" className="text-[12px] text-gray-400 hover:text-[#e5173f] transition-colors shrink-0">
          View all
        </Link>
      )}
    </div>
  );
}

function CompaniesPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [activeCategory, setActiveCategory] = useState<string | null>(searchParams.get("category"));
  const [emailFooter, setEmailFooter] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setActiveCategory(searchParams.get("category"));
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (activeCategory) params.set("category", activeCategory);
    router.push(`/companies?${params.toString()}`);
  };

  const handleCategoryClick = (cat: string) => {
    const next = activeCategory === cat ? null : cat;
    setActiveCategory(next);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (next) params.set("category", next);
    router.push(`/companies?${params.toString()}`);
  };

  return (
    <div className="w-full">
      {/* ── HERO ── */}
      <div className="px-8 pt-8 pb-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-[1fr_380px] gap-8 items-start">
          <div>
            <span className="inline-block text-[11px] font-bold text-[#e5173f] bg-red-50 border border-red-100 px-2.5 py-1 rounded-full uppercase tracking-wider mb-4">
              AI Companies
            </span>
            <h1 className="text-[38px] font-black text-gray-900 leading-[1.1] mb-3">
              Discover the world's<br />most innovative<br />AI companies
            </h1>
            <p className="text-[13px] text-gray-500 mb-5 max-w-sm">
              Explore AI startups, unicorns, frontier labs, and emerging companies shaping the future of artificial intelligence.
            </p>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 max-w-md shadow-sm">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search companies, categories, founders, investors..."
                className="flex-1 text-[13px] text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
              />
              <button onClick={handleSearch} className="bg-[#e5173f] text-white rounded-lg p-1.5 hover:bg-[#c4122f] transition-colors shrink-0">
                <Search size={12} />
              </button>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {navCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                    activeCategory === cat
                      ? "border-[#e5173f] text-[#e5173f] bg-red-50"
                      : "border-gray-200 text-gray-500 hover:border-[#e5173f] hover:text-[#e5173f]"
                  }`}
                >
                  <Zap size={10} className="text-[#e5173f]" /> {cat}
                </button>
              ))}
              <button className="flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-gray-300">
                More <ChevronRight size={10} />
              </button>
            </div>
          </div>

          {/* Hero right — floating icons */}
          <div className="relative h-[220px]">
            <div className="absolute top-2 right-8 w-16 h-16 bg-white border border-gray-100 rounded-2xl shadow-md flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <div className="absolute top-16 right-0 w-14 h-14 bg-white border border-gray-100 rounded-2xl shadow-md flex items-center justify-center">
              <span className="text-xl">⚙️</span>
            </div>
            <div className="absolute top-0 right-32 w-2 h-2 rounded-full bg-red-300 opacity-60" />
            <div className="absolute top-12 right-24 w-1.5 h-1.5 rounded-full bg-blue-300 opacity-60" />
            <div className="absolute bottom-16 right-10 w-2 h-2 rounded-full bg-purple-300 opacity-60" />
            <div className="absolute bottom-4 right-2 w-1.5 h-1.5 rounded-full bg-orange-300 opacity-60" />
            <div className="absolute bottom-8 right-20 w-20 h-20 bg-white border border-gray-100 rounded-2xl shadow-md flex items-center justify-center">
              <Search size={28} className="text-gray-300" />
            </div>
            <div className="absolute bottom-2 right-44 w-14 h-14 bg-white border border-gray-100 rounded-2xl shadow-md flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 max-w-5xl mx-auto pb-16">

        {/* ── 1. TRENDING ── */}
        <div className="mb-10 border border-gray-100 rounded-2xl p-5">
          <SectionHeader number="1" title="Trending AI Companies" subtitle="The most searched, viewed and discussed AI companies right now." viewAll />
          <div className="grid grid-cols-[1fr_1fr_1fr_200px] gap-3">
            {/* Big 3 dark cards */}
            {trendingCompanies.map((c) => (
              <Link
                key={c.name}
                href={resolveHref(c.name)}
                
                className={`bg-gradient-to-br ${c.bg} rounded-xl p-4 hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] text-gray-500">{c.rank}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#e5173f] text-white rounded-full font-medium">
                    🔥 {c.badge}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white mb-3">
                  {c.name[0]}
                </div>
                <p className="text-[13px] font-bold text-white">{c.name}</p>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{c.tagline}</p>
                <p className="text-[10px] text-gray-500 mt-2">🔥 {c.badge} · {c.views} views (7d)</p>
              </Link>
            ))}
            {/* Small right column */}
            <div className="flex flex-col gap-3">
              {trendingSmall.map((c) => (
                <Link
                  key={c.name}
                  href={resolveHref(c.name)}
                  className="border border-gray-100 rounded-xl p-3 hover:border-[#e5173f] transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] text-gray-400">{c.rank}</p>
                    <p className="text-[13px] font-semibold text-gray-900">{c.name}</p>
                    <p className="text-[11px] text-gray-400">{c.category}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{c.views} views (7d)</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2. FASTEST GROWING ── */}
        <div className="mb-10 border border-gray-100 rounded-2xl p-5">
          <SectionHeader number="2" title="Fastest Growing AI Companies" subtitle="Companies showing strong momentum across key growth signals." viewAll />
          <div className="grid grid-cols-[repeat(5,1fr)_220px] gap-3">
            {fastestGrowing.map((c) => (
              <Link
                key={c.name}
                href={resolveHref(c.name)}
                className="rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
              >
                <div className={`${c.color} h-[100px] flex items-end p-3`}>
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {c.name[0]}
                  </div>
                </div>
                <div className="border border-t-0 border-gray-100 rounded-b-xl p-3">
                  <p className="text-[12px] font-semibold text-gray-900">{c.name}</p>
                  <p className="text-[11px] text-gray-400">{c.category}</p>
                </div>
              </Link>
            ))}
            {/* CTA card */}
            <div className="border border-gray-100 rounded-xl p-4 flex flex-col justify-between bg-gray-50">
              <div>
                <p className="text-[13px] font-bold text-gray-900 leading-snug">Explore tomorrow's market leaders today.</p>
                <p className="text-[11px] text-gray-400 mt-2">Discover companies with the highest growth potential across the AI landscape.</p>
              </div>
              <button className="mt-3 bg-gray-900 text-white text-[11px] font-semibold px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-left">
                Explore Growth Leaders →
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. EMERGING STARTUPS ── */}
        <div className="mb-10 border border-gray-100 rounded-2xl p-5">
          <SectionHeader number="3" title="Emerging AI Startups to Watch" subtitle="Promising early-stage companies gaining real traction." viewAll />
          <div className="grid grid-cols-4 gap-3">
            {/* Glean featured */}
            <Link href={resolveHref("Glean")} className="border border-gray-100 rounded-xl p-4 hover:border-[#e5173f] transition-colors col-span-1">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">G</div>
              </div>
              <p className="text-[11px] text-gray-400 mb-1">AI Search</p>
              <p className="text-[14px] font-bold text-gray-900">Glean</p>
              <p className="text-[11px] text-gray-500 mt-1">Enterprise AI search across all your data.</p>
              <p className="text-[10px] text-gray-400 mt-2">2022 · 51-100 employees</p>
            </Link>
            <Link href={resolveHref("Reka")} className="border border-gray-100 rounded-xl p-4 hover:border-[#e5173f] transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-xs mb-3">R</div>
              <p className="text-[11px] text-gray-400">AI Research</p>
              <p className="text-[13px] font-bold text-gray-900 mt-1">Reka</p>
              <p className="text-[11px] text-gray-500 mt-1">Building multimodal AI models.</p>
              <p className="text-[10px] text-gray-400 mt-2">2023 · 11-50</p>
            </Link>
            <Link href={resolveHref("Hugging Face")} className="border border-gray-100 rounded-xl p-4 hover:border-[#e5173f] transition-colors">
              <div className="w-8 h-8 rounded-xl bg-yellow-100 flex items-center justify-center text-xl mb-3">🤗</div>
              <p className="text-[11px] text-gray-400">AI Infrastructure</p>
              <p className="text-[13px] font-bold text-gray-900 mt-1">Hugging Face</p>
              <p className="text-[11px] text-gray-500 mt-1">The AI community building the future.</p>
              <p className="text-[10px] text-gray-400 mt-2">2016 · 201-600</p>
            </Link>
            {/* Mistral featured right */}
            <Link href={resolveHref("Mistral AI")} className="rounded-xl overflow-hidden hover:opacity-90 transition-opacity">
              <div className="bg-gradient-to-br from-orange-400 to-yellow-300 h-[100px] flex items-end p-3">
                <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center font-bold text-white">M</div>
              </div>
              <div className="border border-t-0 border-gray-100 rounded-b-xl p-3">
                <p className="text-[11px] text-gray-400">AI Models</p>
                <p className="text-[13px] font-bold text-gray-900">Mistral AI</p>
                <p className="text-[11px] text-gray-500 mt-1">Frontier AI models for every builder.</p>
                <p className="text-[10px] text-gray-400 mt-1">2023 · 11-100</p>
              </div>
            </Link>
          </div>
        </div>

        {/* ── 4. BROWSE BY CATEGORY ── */}
        <div className="mb-10 border border-gray-100 rounded-2xl p-5">
          <SectionHeader number="4" title="Browse by Category" subtitle="Explore companies by what they're building." />
          <div className="grid grid-cols-8 gap-3">
            {browseCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryClick(cat.label)}
                  className={`border rounded-xl p-3 text-left hover:border-[#e5173f] transition-colors group ${
                    activeCategory === cat.label ? "border-[#e5173f]" : "border-gray-100"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center mb-2">
                    <Icon size={13} className="text-gray-500 group-hover:text-[#e5173f] transition-colors" />
                  </div>
                  <p className="text-[11px] font-semibold text-gray-900 group-hover:text-[#e5173f] transition-colors leading-tight">{cat.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{cat.count}</p>
                </button>
              );
            })}
            <button className="border border-gray-100 rounded-xl p-3 flex items-center justify-center hover:border-gray-200 transition-colors">
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* ── 5/6/7. BREAKOUT / FUNDED / WATCH ── */}
        <div className="mb-10 grid grid-cols-3 gap-5">
          {/* Breakout */}
          <div className="border border-gray-100 rounded-2xl p-5">
            <div className="flex items-start gap-2 mb-4">
              <span className="text-[10px] font-bold text-gray-400">5</span>
              <div>
                <p className="text-[13px] font-bold text-gray-900">Breakout Companies</p>
                <p className="text-[11px] text-gray-400">Companies making big moves.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {breakoutCompanies.map((c) => (
                <Link key={c.name} href={resolveHref(c.name)} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1.5 -mx-1.5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">{c.name[0]}</div>
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900">{c.name}</p>
                    <p className="text-[11px] text-gray-400">{c.detail}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#e5173f] transition-colors">
              View all <ChevronRight size={11} />
            </button>
          </div>

          {/* Recently Funded */}
          <div className="border border-gray-100 rounded-2xl p-5">
            <div className="flex items-start gap-2 mb-4">
              <span className="text-[10px] font-bold text-gray-400">6</span>
              <div>
                <p className="text-[13px] font-bold text-gray-900">Recently Funded AI Startups</p>
                <p className="text-[11px] text-gray-400">Latest funding announcements.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {recentlyFunded.map((c) => (
                <Link key={c.name} href={resolveHref(c.name)} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1.5 -mx-1.5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white text-xs font-bold shrink-0">{c.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-900">{c.name}</p>
                    <p className="text-[11px] text-gray-400">{c.round} · {c.investors}</p>
                    <p className="text-[10px] text-gray-400">{c.date}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#e5173f] transition-colors">
              View all <ChevronRight size={11} />
            </button>
          </div>

          {/* Startups to Watch */}
          <div className="border border-gray-100 rounded-2xl p-5">
            <div className="flex items-start gap-2 mb-4">
              <span className="text-[10px] font-bold text-gray-400">7</span>
              <div>
                <p className="text-[13px] font-bold text-gray-900">Startups to Watch</p>
                <p className="text-[11px] text-gray-400">High potential companies to keep an eye on.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {startupsToWatch.map((c) => (
                <Link key={c.name} href={resolveHref(c.name)} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1.5 -mx-1.5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">{c.name[0]}</div>
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900">{c.name}</p>
                    <p className="text-[11px] text-gray-400">{c.category}</p>
                    <p className="text-[11px] text-gray-400">{c.detail}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#e5173f] transition-colors">
              View all <ChevronRight size={11} />
            </button>
          </div>
        </div>

        {/* ── 8. AI UNICORNS ── */}
        <div className="mb-10 border border-gray-100 rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <span className="text-[10px] font-bold text-gray-400 mt-0.5">8</span>
              <div>
                <h2 className="text-[15px] font-bold text-gray-900">AI Unicorns</h2>
                <p className="text-[12px] text-gray-400">Private companies valued at $1B+</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {unicorns.map((u) => (
              <Link key={u.name} href={resolveHref(u.name)} className="flex flex-col items-center gap-2 shrink-0 min-w-[100px] hover:opacity-80 transition-opacity">
                <div className={`w-12 h-12 rounded-full ${u.bg} flex items-center justify-center text-white font-bold text-lg border-4 border-white shadow-sm`}>
                  {u.initial}
                </div>
                <p className="text-[12px] font-semibold text-gray-900">{u.name}</p>
                <p className="text-[11px] text-gray-400">{u.valuation}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── 9. FRONTIER AI LABS ── */}
        <div className="mb-6 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="bg-gray-900 px-6 py-5">
            <div className="flex items-start gap-3 mb-5">
              <span className="text-[10px] font-bold text-gray-500 mt-0.5">9</span>
              <div>
                <p className="text-[15px] font-bold text-white">Frontier AI Labs</p>
                <p className="text-[12px] text-gray-400">Organisations advancing the state-of-the-art.</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 overflow-x-auto">
                {frontierLabs.map((lab) => (
                  <Link key={lab.name} href={resolveHref(lab.name)} className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity group">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                      {lab.initial}
                    </div>
                    <span className="text-[13px] text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">{lab.name}</span>
                  </Link>
                ))}
              </div>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0 ml-4">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ── 10. OPEN SOURCE AI LEADERS ── */}
        <div className="mb-6 border border-gray-700 rounded-2xl overflow-hidden">
          <div className="bg-gray-800 px-6 py-5">
            <div className="flex items-start gap-3 mb-5">
              <span className="text-[10px] font-bold text-gray-500 mt-0.5">10</span>
              <div>
                <p className="text-[15px] font-bold text-white">Open Source AI Leaders</p>
                <p className="text-[12px] text-gray-400">Leading the open source movement.</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 overflow-x-auto">
                {openSourceLeaders.map((c) => (
                  <Link key={c.name} href={resolveHref(c.name)} className="flex flex-col items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">{c.emoji}</div>
                    <p className="text-[11px] font-semibold text-white">{c.name}</p>
                    <p className="text-[10px] text-gray-400">⭐ {c.stars}</p>
                  </Link>
                ))}
              </div>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0 ml-4">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ── 11. CURATED COLLECTIONS ── */}
        <div className="mb-10 border border-gray-100 rounded-2xl p-5">
          <SectionHeader number="11" title="Curated Collections" subtitle="Handpicked lists for faster discovery." />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {collections.map((col) => (
              <Link
                key={col.name}
                href="/companies"
                className={`${col.bg} rounded-xl p-4 shrink-0 w-[180px] hover:opacity-90 transition-opacity`}
              >
                <p className="text-[12px] font-bold text-white leading-snug">{col.name}</p>
                <p className="text-[11px] text-white/60 mt-1">{col.count}</p>
              </Link>
            ))}
            <button className="border border-gray-100 rounded-xl w-10 flex items-center justify-center shrink-0 hover:border-gray-200 transition-colors">
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* ── 12 + 13. NEW ON GRAPHONE + EXPLORE ALL ── */}
        <div className="mb-10 grid grid-cols-2 gap-6">
          {/* New */}
          <div className="border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-gray-400">12</span>
                <div>
                  <p className="text-[13px] font-bold text-gray-900">New on GraphOne</p>
                  <p className="text-[11px] text-gray-400">Recently added companies.</p>
                </div>
              </div>
              <Link href="/companies" className="text-[11px] text-gray-400 hover:text-[#e5173f]">View all</Link>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {newOnGraphOne.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm">{c.initial}</div>
                  <p className="text-[10px] font-medium text-gray-700 text-center leading-tight">{c.name}</p>
                  <p className="text-[9px] text-gray-400 text-center">{c.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Explore All */}
          <div className="border border-gray-100 rounded-2xl p-5">
            <div className="flex items-start gap-2 mb-4">
              <span className="text-[10px] font-bold text-gray-400">13</span>
              <div>
                <p className="text-[13px] font-bold text-gray-900">Explore All Companies</p>
                <p className="text-[11px] text-gray-400">Find, filter and see the right companies.</p>
              </div>
            </div>
            {/* Filter row */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {["Category", "Funding Stage", "Country", "Team Size", "More filters"].map((f) => (
                <button key={f} className="text-[11px] px-2.5 py-1 border border-gray-200 rounded-lg text-gray-500 hover:border-gray-300 transition-colors flex items-center gap-1">
                  {f} <ChevronRight size={10} className="rotate-90" />
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-gray-400">Sort by: <span className="text-gray-700 font-medium">Trending</span></span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg bg-gray-100 text-gray-500">⊞</button>
                <button className="p-1.5 rounded-lg text-gray-400">☰</button>
              </div>
            </div>
            <Link
              href="/companies"
              className="block w-full text-center bg-[#e5173f] text-white text-[12px] font-semibold py-2.5 rounded-xl hover:bg-[#c4122f] transition-colors"
            >
              Explore Companies →
            </Link>
            <p className="text-[10px] text-gray-400 text-center mt-1.5">50,000+ companies</p>
          </div>
        </div>

        {/* ── FOOTER CTA ── */}
        <div className="border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e5173f] flex items-center justify-center shrink-0">
              <span className="text-white text-sm">G</span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-900">Be the first to discover what's next in AI</p>
              <p className="text-[12px] text-gray-400">Join thousands of builders, investors and researchers.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={emailFooter}
              onChange={(e) => setEmailFooter(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-200 rounded-xl px-4 py-2 text-[12px] outline-none focus:border-[#e5173f] w-52 placeholder:text-gray-400"
            />
            <button className="bg-[#e5173f] text-white text-[12px] font-semibold px-5 py-2 rounded-xl hover:bg-[#c4122f] transition-colors whitespace-nowrap">
              Get updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompaniesPage() {
  return (
    <Suspense fallback={<div className="px-8 py-6 text-sm text-gray-400">Loading...</div>}>
      <CompaniesPageInner />
    </Suspense>
  );
}