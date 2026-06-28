"use client";

import { useState } from "react";
import Link from "next/link";
import { companies } from "@/data/companies";
import {
  Search, Bell, ChevronDown, Sparkles, Code2, MessageCircle,
  Mic, Video, Cpu, HeartPulse, Bot, Gem, ArrowRight,
} from "lucide-react";

const navLinks = [
  { label: "Companies", href: "/discover" },
  { label: "Products", href: "/products" },
  { label: "Investors", href: "/investors" },
  { label: "Funding", href: "/discover" },
  { label: "Jobs", href: "/jobs" },
  { label: "News", href: "/news" },
];

const categoryPills = [
  { label: "AI Agents", icon: Bot },
  { label: "AI Coding", icon: Code2 },
  { label: "AI Search", icon: Search },
  { label: "AI Video", icon: Video },
  { label: "AI Voice", icon: Mic },
  { label: "AI Infrastructure", icon: Cpu },
];

const fastestGrowing = [
  { name: "Lovable", tagline: "AI App Builder" },
  { name: "Cohere", tagline: "AI Infrastructure" },
  { name: "ElevenLabs", tagline: "AI Voice" },
  { name: "Pika", tagline: "AI Video" },
  { name: "Mistral AI", tagline: "AI Models" },
];

const emergingStartups = [
  { name: "Glean", tagline: "Enterprise AI search across your data.", founded: "2022 · 51–200 employees" },
  { name: "Reka", tagline: "Building multimodal AI models.", founded: "2023 · 11–50 employees" },
  { name: "Hugging Face", tagline: "The AI community building the future.", founded: "2016 · 201–500 employees" },
  { name: "Mistral AI", tagline: "Frontier models for every builder.", founded: "2023 · 51–200 employees" },
];

const browseCategories = [
  { label: "AI Agents", count: "1,248", icon: Bot },
  { label: "AI Coding", count: "863", icon: Code2 },
  { label: "AI Search", count: "324", icon: Search },
  { label: "AI Video", count: "560", icon: Video },
  { label: "AI Voice", count: "412", icon: Mic },
  { label: "AI Infrastructure", count: "972", icon: Cpu },
  { label: "Healthcare AI", count: "647", icon: HeartPulse },
  { label: "Robotics", count: "396", icon: Bot },
];

const breakoutCompanies = [
  { name: "Pika", note: "Launched new 1.0 video model" },
  { name: "Cognition", note: "Closed $175M Series B" },
  { name: "Adept", note: "Enterprise adoption surged 200%" },
];

const recentlyFunded = [
  { name: "xAI", note: "$6B Series B · May 26, 2026" },
  { name: "Databricks", note: "$10B Series J · May 21, 2026" },
  { name: "Mistral AI", note: "$640M Series B · May 20, 2026" },
];

const startupsToWatch = [
  { name: "Deci", note: "AI inference platform. High performance." },
  { name: "Typeface", note: "AI marketing platform. Generative content." },
  { name: "Granola", note: "AI notetaker for teams." },
];

const unicorns = [
  { name: "OpenAI", valuation: "$808B+" },
  { name: "Anthropic", valuation: "$18.4B" },
  { name: "Databricks", valuation: "$43B" },
  { name: "Perplexity", valuation: "$9B" },
  { name: "xAI", valuation: "$24B" },
];

const frontierLabs = ["OpenAI", "Anthropic", "Google DeepMind", "xAI", "Meta AI", "SSI"];
const openSourceLeaders = [
  { name: "Hugging Face", stars: "160K" },
  { name: "Mistral AI", stars: "28K" },
  { name: "Ollama", stars: "15K" },
  { name: "Together AI", stars: "9K" },
  { name: "Databricks", stars: "9K" },
];

const curatedCollections = [
  { label: "OpenAI Alumni Startups", count: "42 companies" },
  { label: "YC AI Startups", count: "263 companies" },
  { label: "AI Agent Leaders", count: "121 companies" },
  { label: "AI Infrastructure Leaders", count: "136 companies" },
];

const newOnGraphOne = ["MemGPT", "Bria AI", "CharacterX", "Unify", "Palette"];

function resolveHref(name: string): string {
  const match = companies.find((c) => c.name.toLowerCase() === name.toLowerCase());
  return match ? `/companies/${match.id}` : `/discover`;
}

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = companies.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Top Nav */}
      <header className="border-b border-gray-100 px-8 py-3 flex items-center gap-8 sticky top-0 bg-white z-30">
        <Link href="/discover" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-[#e5173f] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">G</span>
          </div>
          <span className="font-bold text-gray-900">graphone</span>
        </Link>

        <nav className="flex items-center gap-6 flex-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors ${
                i === 0 ? "text-[#e5173f] font-medium" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Log in
          </button>
          <button className="bg-[#e5173f] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#c4122f] transition-colors">
            Sign up
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-8">

        {/* Hero */}
        <div className="grid grid-cols-2 gap-10 items-center mb-10">
          <div>
            <span className="text-xs font-medium text-[#e5173f] bg-red-50 px-2 py-1 rounded-full uppercase tracking-wide">
              AI Companies
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mt-3 leading-tight">
              Discover the world&apos;s most<br />innovative AI companies
            </h1>
            <p className="text-gray-500 mt-3 text-sm max-w-md">
              Explore AI startups, unicorns, frontier labs, and emerging companies shaping the future of artificial intelligence.
            </p>

            <div className="flex items-center gap-3 mt-5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 max-w-lg">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                name="discover-search"
                id="discover-search"
                placeholder="Search companies, categories, founders, investors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none flex-1 placeholder:text-gray-400"
              />
              <button className="bg-[#e5173f] text-white p-1.5 rounded-lg">
                <Search size={13} />
              </button>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              {categoryPills.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setActiveCategory(activeCategory === label ? null : label)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-full transition-colors ${
                    activeCategory === label
                      ? "border-[#e5173f] text-[#e5173f] bg-red-50"
                      : "border-gray-200 text-gray-600 hover:border-[#e5173f] hover:text-[#e5173f]"
                  }`}
                >
                  <Icon size={12} /> {label}
                </button>
              ))}
              <button className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-full text-gray-600 hover:border-[#e5173f] hover:text-[#e5173f] transition-colors">
                More <ChevronDown size={12} />
              </button>
            </div>
          </div>

          <div className="relative h-64 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-[#e5173f] flex items-center justify-center shadow-lg shadow-red-100 z-10">
              <Sparkles size={22} className="text-white" />
            </div>
            <div className="absolute top-6 right-10 w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <Gem size={20} className="text-orange-400" />
            </div>
            <div className="absolute top-32 right-0 w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <Mic size={20} className="text-purple-400" />
            </div>
            <div className="absolute bottom-4 right-24 w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <Search size={20} className="text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Trending Companies */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">1. Trending AI Companies</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                The most searched, viewed and discussed AI companies right now.
              </p>
            </div>
            <Link href="/discover" className="text-xs text-gray-500 hover:text-[#e5173f] transition-colors">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {filtered.slice(0, 3).map((company, i) => (
              <Link
                key={company.id}
                href={`/companies/${company.id}`}
                className="border border-gray-100 rounded-2xl p-5 hover:border-[#e5173f] transition-colors cursor-pointer relative overflow-hidden block"
                style={{ background: i === 0 ? "#1a1a2e" : i === 1 ? "#0f1b35" : "#1a1030" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">0{i + 1}</span>
                  <span className="text-xs px-2 py-0.5 bg-[#e5173f] text-white rounded-full">
                    🔥 Trending #{i + 1}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-gray-800 mb-3">
                  {company.name[0]}
                </div>
                <h3 className="text-sm font-semibold text-white">{company.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{company.tagline}</p>
              </Link>
            ))}
            <div className="flex flex-col gap-3">
              {filtered.slice(3, 5).map((company, i) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.id}`}
                  className="border border-gray-100 rounded-xl p-4 hover:border-[#e5173f] transition-colors cursor-pointer flex items-center justify-between flex-1"
                >
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">0{i + 4}</p>
                    <p className="text-sm font-semibold text-gray-900">{company.name}</p>
                    <p className="text-xs text-gray-400">{company.category}</p>
                  </div>
                  <span className="text-gray-300">›</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Fastest Growing */}
        <div className="grid grid-cols-[1fr_280px] gap-6 mb-12">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">2. Fastest Growing AI Companies</h2>
                <p className="text-xs text-gray-400 mt-0.5">Companies showing strong momentum across key growth signals.</p>
              </div>
              <Link href="/discover" className="text-xs text-gray-500 hover:text-[#e5173f] transition-colors">View all</Link>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {fastestGrowing.map((c) => (
                <Link
                  key={c.name}
                  href={resolveHref(c.name)}
                  className="border border-gray-100 rounded-xl p-4 text-center hover:border-[#e5173f] transition-colors block"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 mx-auto mb-2">
                    {c.name[0]}
                  </div>
                  <p className="text-xs font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-5 text-white flex flex-col min-h-[180px]">
            <p className="text-sm font-semibold mb-1 leading-snug">Explore tomorrow&apos;s market leaders today.</p>
            <p className="text-xs text-gray-400 mb-4">
              Discover companies with the highest growth potential across the AI landscape.
            </p>
            <Link
              href="/discover"
              className="mt-auto bg-white text-gray-900 text-xs font-medium px-4 py-2.5 rounded-lg text-center hover:bg-gray-100 transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
            >
              Explore Growth Leaders <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Emerging Startups */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">3. Emerging AI Startups to Watch</h2>
            <Link href="/discover" className="text-xs text-gray-500 hover:text-[#e5173f] transition-colors">View all</Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {emergingStartups.map((s) => (
              <Link
                key={s.name}
                href={resolveHref(s.name)}
                className="border border-gray-100 rounded-2xl p-5 hover:border-[#e5173f] transition-colors block"
              >
                <p className="text-sm font-bold text-gray-900">{s.name}</p>
                <p className="text-xs text-gray-500 mt-2">{s.tagline}</p>
                <p className="text-xs text-gray-400 mt-4">{s.founded}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Browse by Category */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-gray-900 mb-4">4. Browse by Category</h2>
          <div className="grid grid-cols-4 gap-3">
            {browseCategories.map(({ label, count, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveCategory(activeCategory === label ? null : label)}
                className={`border rounded-xl p-4 text-left transition-colors ${
                  activeCategory === label ? "border-[#e5173f]" : "border-gray-100 hover:border-[#e5173f]"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-2">
                  <Icon size={14} className="text-[#e5173f]" />
                </div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{count} companies</p>
              </button>
            ))}
          </div>
        </div>

        {/* Breakout / Recently Funded / Watch */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="border border-gray-100 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">5. Breakout Companies</h3>
            {breakoutCompanies.map((c) => (
              <Link key={c.name} href={resolveHref(c.name)} className="flex items-center justify-between py-2 group">
                <div>
                  <p className="text-xs font-medium text-gray-900 group-hover:text-[#e5173f] transition-colors">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.note}</p>
                </div>
                <span className="text-gray-300">›</span>
              </Link>
            ))}
          </div>
          <div className="border border-gray-100 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">6. Recently Funded AI Startups</h3>
            {recentlyFunded.map((c) => (
              <Link key={c.name} href={resolveHref(c.name)} className="flex items-center justify-between py-2 group">
                <div>
                  <p className="text-xs font-medium text-gray-900 group-hover:text-[#e5173f] transition-colors">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.note}</p>
                </div>
                <span className="text-gray-300">›</span>
              </Link>
            ))}
          </div>
          <div className="border border-gray-100 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">7. Startups to Watch</h3>
            {startupsToWatch.map((c) => (
              <Link key={c.name} href={resolveHref(c.name)} className="flex items-center justify-between py-2 group">
                <div>
                  <p className="text-xs font-medium text-gray-900 group-hover:text-[#e5173f] transition-colors">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.note}</p>
                </div>
                <span className="text-gray-300">›</span>
              </Link>
            ))}
          </div>
        </div>

       
{/* Unicorns / Frontier Labs / Open Source — spaced apart, not stacked tight */}
        <div className="flex flex-col gap-3 mb-12">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl px-5 py-4">
            <div className="flex items-center gap-6 overflow-x-auto">
              <span className="text-sm font-semibold text-gray-900 flex-shrink-0">8. AI Unicorns</span>
              <span className="text-xs text-gray-400 flex-shrink-0 hidden md:inline">Private companies valued at $1B+</span>
              <div className="flex items-center gap-6 ml-auto overflow-x-auto">
                {unicorns.map((u) => (
                  <Link key={u.name} href={resolveHref(u.name)} className="flex items-center gap-2 flex-shrink-0 hover:opacity-70 transition-opacity">
                    <span className="text-sm font-medium text-gray-900">{u.name}</span>
                    <span className="text-xs text-gray-500">{u.valuation}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl px-5 py-4 flex items-center gap-8 overflow-x-auto">
            <span className="text-sm font-semibold text-white flex-shrink-0">9. Frontier AI Labs</span>
            <div className="flex items-center gap-8 ml-auto overflow-x-auto">
              {frontierLabs.map((lab) => (
                <Link key={lab} href={resolveHref(lab)} className="text-sm text-gray-300 hover:text-white transition-colors flex-shrink-0">
                  {lab}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900 to-emerald-800 rounded-xl px-5 py-4 flex items-center gap-8 overflow-x-auto">
            <span className="text-sm font-semibold text-white flex-shrink-0">10. Open Source AI Leaders</span>
            <div className="flex items-center gap-8 ml-auto overflow-x-auto">
              {openSourceLeaders.map((l) => (
                <Link key={l.name} href={resolveHref(l.name)} className="flex items-center gap-1.5 flex-shrink-0 text-sm text-gray-200 hover:text-white transition-colors whitespace-nowrap">
                  {l.name} <span className="text-xs text-gray-400">★ {l.stars}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Collections */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-gray-900 mb-4">11. Curated Collections</h2>
          <div className="grid grid-cols-4 gap-4">
            {curatedCollections.map((col) => (
              <Link
                key={col.label}
                href="/discover"
                className="bg-gray-900 rounded-xl p-4 text-white hover:bg-gray-800 transition-colors block"
              >
                <p className="text-sm font-medium">{col.label}</p>
                <p className="text-xs text-gray-400 mt-1">{col.count}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* New on GraphOne */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-gray-900 mb-4">12. New on GraphOne</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {newOnGraphOne.map((name) => (
              <Link
                key={name}
                href={resolveHref(name)}
                className="border border-gray-100 rounded-xl p-4 flex-shrink-0 w-32 text-center hover:border-[#e5173f] transition-colors block"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 mx-auto mb-2">
                  {name[0]}
                </div>
                <p className="text-xs font-semibold text-gray-900">{name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-red-50 to-white border border-red-100 rounded-2xl p-6 flex items-center justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-gray-900">Be the first to discover what&apos;s next in AI</p>
            <p className="text-xs text-gray-500 mt-1">Join thousands of builders, investors and researchers.</p>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              name="discover-newsletter"
              id="discover-newsletter"
              placeholder="Enter your email"
              className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e5173f] w-48"
            />
            <button className="bg-[#e5173f] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#c4122f] transition-colors">
              Get updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}