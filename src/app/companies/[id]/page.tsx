"use client";

import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import { companies } from "@/data/companies";
import { MapPin, Globe, Users, Calendar, CheckCircle, ExternalLink } from "lucide-react";

const timeline = [
  { year: "2015", label: "Founded" },
  { year: "2019", label: "GPT-2 Released" },
  { year: "2020", label: "GPT-3 Released" },
  { year: "2022", label: "ChatGPT Launched" },
  { year: "2023", label: "GPT-4 Released" },
  { year: "2024", label: "Sora Released" },
  { year: "2025", label: "Operator Released" },
];

const fundingRounds = [
  { round: "Seed", date: "2016", amount: "$10M" },
  { round: "Series A", date: "2019", amount: "$100M" },
  { round: "Series B", date: "2021", amount: "$300M" },
  { round: "Growth", date: "2023", amount: "$10B" },
  { round: "Growth II", date: "2025", amount: "$40B" },
];

const founders = [
  { name: "Sam Altman", role: "CEO" },
  { name: "Greg Brockman", role: "President & Co-founder" },
  { name: "Ilya Sutskever", role: "Chief Scientist & Co-founder" },
];

const products = [
  { name: "ChatGPT", tagline: "Conversational AI assistant" },
  { name: "GPT-4o", tagline: "Multimodal AI model" },
  { name: "Codex", tagline: "AI for software development" },
  { name: "Sora", tagline: "Text-to-video model" },
  { name: "Operator", tagline: "AI agent for tasks" },
];

const investors = [
  { name: "Y Combinator", stage: "Seed" },
  { name: "Sequoia Capital", stage: "Series" },
  { name: "Microsoft", stage: "Growth" },
  { name: "SoftBank", stage: "Growth" },
  { name: "Tiger Global", stage: "Growth" },
];

const acquisitions = [
  { name: "Rockset", date: "2024", focus: "Database technology" },
  { name: "io", date: "2025", focus: "AI device startup" },
];

const investments = [
  { name: "Figure", focus: "Humanoid Robotics", stage: "Series B" },
  { name: "Harvey", focus: "Legal AI", stage: "Series C" },
  { name: "Physical Intelligence", focus: "Robotics AI", stage: "Series A" },
];

const directCompetitors = ["Anthropic", "Google DeepMind", "xAI", "Mistral AI", "Cohere"];
const adjacentCompetitors = ["Perplexity", "Cursor", "Replit"];

const news = [
  { title: "OpenAI launches GPT-4o with improved multimodal capabilities", date: "May 13, 2025" },
  { title: "OpenAI raises $40B in new funding round led by SoftBank", date: "Mar 31, 2025" },
  { title: "OpenAI releases Operator, an AI agent for everyday tasks", date: "Jan 23, 2025" },
  { title: "OpenAI acquires io, co-founded by Jony Ive", date: "May 21, 2025" },
];

const openJobs = [
  { title: "Research Scientist", team: "Research", location: "San Francisco, CA" },
  { title: "Software Engineer, Infrastructure", team: "Engineering", location: "San Francisco, CA" },
  { title: "Product Manager, ChatGPT", team: "Product", location: "San Francisco, CA" },
];

const researchPapers = [
  { title: "GPT-4 Technical Report", date: "Mar 2023" },
  { title: "GPT-4o System Card", date: "May 2024" },
  { title: "Sora: A Review", date: "Feb 2024" },
];

const patents = [
  { title: "System for training large language models", category: "AI / ML" },
  { title: "Methods for aligning AI models", category: "AI Safety" },
];

const alumniCompanies = ["Anthropic", "Perplexity", "Thinking Machines Lab", "Safe Superintelligence", "xAI"];
const similarCompanies = ["Anthropic", "Google DeepMind", "Mistral AI", "Cohere", "xAI"];

const tabs = ["Overview", "Timeline", "Funding", "Ownership", "Investors", "Leadership", "Products"];
const sectionIds = ["overview", "timeline", "funding", "ownership", "investors", "leadership", "products"];

// Links to a real company page if we have one in data/companies.ts, else falls back to a search
function resolveHref(name: string): string {
  const match = companies.find((c) => c.name.toLowerCase() === name.toLowerCase());
  return match ? `/companies/${match.id}` : `/companies?search=${encodeURIComponent(name)}`;
}
export default function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const company = companies.find((c) => c.id === id);
  if (!company) {
  return <div className="px-8 py-6 text-sm text-gray-500">Company not found.</div>;
}

  const [activeTab, setActiveTab] = useState(0);

  const scrollToSection = (index: number) => {
    setActiveTab(index);
    document.getElementById(sectionIds[index])?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-5xl px-8 py-6">

      {/* Tabs — clicking scrolls to the matching section */}
      <div className="flex gap-6 border-b border-gray-100 mb-8 overflow-x-auto sticky top-0 bg-white z-10 pt-2">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => scrollToSection(i)}
            className={`text-sm pb-3 whitespace-nowrap transition-colors ${
              activeTab === i
                ? "border-b-2 border-[#e5173f] text-[#e5173f] font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {i + 1}. {tab}
          </button>
        ))}
      </div>

      {/* Company header */}
      <div id="overview" className="flex items-start gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
          {company.name[0]}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            {company.verified && <CheckCircle size={18} className="text-[#e5173f]" />}
          </div>
          <p className="text-sm text-gray-500 mt-1 max-w-lg">{company.tagline}</p>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#e5173f] transition-colors"
            >
              <Globe size={12} /> {company.website}
            </a>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} /> Founded {company.founded}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} /> {company.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Users size={12} /> {company.headcount} employees
            </span>
            <Link
              href={`/companies?category=${encodeURIComponent(company.category)}`}
              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-[#e5173f] transition-colors"
            >
              {company.category}
            </Link>
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
              {company.stage}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div id="timeline" className="border border-gray-100 rounded-2xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-5">2. Timeline</h2>
        <div className="relative flex justify-between">
          <div className="absolute top-1.5 left-0 right-0 h-px bg-gray-200" />
          {timeline.map((t) => (
            <div key={t.year} className="relative flex flex-col items-center flex-1 text-center px-1">
              <div className="w-3 h-3 rounded-full bg-[#e5173f] mb-2 ring-4 ring-white z-10" />
              <span className="text-xs font-semibold text-gray-900">{t.year}</span>
              <span className="text-xs text-gray-400 mt-0.5">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">

        {/* Funding */}
        <div id="funding" className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">3. Funding Timeline</h2>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Round</th>
                <th className="text-left pb-2 font-medium">Date</th>
                <th className="text-left pb-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {fundingRounds.map((r) => (
                <tr key={r.round} className="border-b border-gray-50">
                  <td className="py-2.5 text-xs text-gray-700">{r.round}</td>
                  <td className="py-2.5 text-xs text-gray-500">{r.date}</td>
                  <td className="py-2.5 text-xs font-medium text-gray-900">{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ownership */}
        <div id="ownership" className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">4. Ownership</h2>
          {[
            { label: "Microsoft", pct: 49, color: "#e5173f" },
            { label: "Employees", pct: 18, color: "#f97316" },
            { label: "Founders", pct: 12, color: "#fbbf24" },
            { label: "Investors", pct: 21, color: "#d1d5db" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">{item.label}</span>
                  <span className="text-xs font-medium text-gray-900">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Investors — clickable */}
        <div id="investors" className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">5. Investors</h2>
          <div className="grid grid-cols-2 gap-3">
            {investors.map((inv) => (
              <Link
                key={inv.name}
                href={resolveHref(inv.name)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                  {inv.name[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{inv.name}</p>
                  <p className="text-xs text-gray-400">{inv.stage}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Founders */}
        <div id="leadership" className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">6. Founders & Leadership</h2>
          <div className="flex flex-col gap-3">
            {founders.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                  {f.name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{f.name}</p>
                  <p className="text-xs text-gray-400">{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products — clickable, links to product search */}
      <div id="products" className="border border-gray-100 rounded-2xl p-5 mt-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">7. Products</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.map((p) => (
            <Link
              key={p.name}
              href={`/products?search=${encodeURIComponent(p.name)}`}
              className="border border-gray-100 rounded-xl p-4 flex-shrink-0 w-36 hover:border-[#e5173f] transition-colors cursor-pointer text-center block"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-500 mx-auto mb-2">
                {p.name[0]}
              </div>
              <p className="text-xs font-semibold text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Acquisitions + Investments */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">8. Acquisitions</h2>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Company</th>
                <th className="text-left pb-2 font-medium">Date</th>
                <th className="text-left pb-2 font-medium">Focus</th>
              </tr>
            </thead>
            <tbody>
              {acquisitions.map((a) => (
                <tr key={a.name} className="border-b border-gray-50">
                  <td className="py-2.5 text-xs font-medium text-gray-900">{a.name}</td>
                  <td className="py-2.5 text-xs text-gray-500">{a.date}</td>
                  <td className="py-2.5 text-xs text-gray-500">{a.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">9. Investments</h2>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Company</th>
                <th className="text-left pb-2 font-medium">Focus</th>
                <th className="text-left pb-2 font-medium">Stage</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.name} className="border-b border-gray-50">
                  <td className="py-2.5 text-xs font-medium text-gray-900">{inv.name}</td>
                  <td className="py-2.5 text-xs text-gray-500">{inv.focus}</td>
                  <td className="py-2.5 text-xs text-gray-500">{inv.stage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Competitor Landscape — clickable chips */}
      <div className="border border-gray-100 rounded-2xl p-5 mt-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">10. Competitor Landscape</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-400 mb-2">Direct Competitors</p>
            <div className="flex flex-wrap gap-2">
              {directCompetitors.map((c) => (
                <Link
                  key={c}
                  href={resolveHref(c)}
                  className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 hover:border-[#e5173f] hover:text-[#e5173f] cursor-pointer transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">Adjacent Competitors</p>
            <div className="flex flex-wrap gap-2">
              {adjacentCompetitors.map((c) => (
                <Link
                  key={c}
                  href={resolveHref(c)}
                  className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 hover:border-[#e5173f] hover:text-[#e5173f] cursor-pointer transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News — clickable, links to /news filtered */}
      <div className="border border-gray-100 rounded-2xl p-5 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">12. News</h2>
          <Link href="/news" className="text-xs text-gray-400 hover:text-[#e5173f]">
            View all news →
          </Link>
        </div>
        <div className="flex flex-col">
          {news.map((n) => (
            <Link
              key={n.title}
              href="/news"
              className="flex items-start justify-between gap-3 py-3 border-b border-gray-50 last:border-b-0 cursor-pointer group"
            >
              <p className="text-xs text-gray-700 group-hover:text-[#e5173f] transition-colors leading-snug">
                {n.title}
              </p>
              <span className="text-xs text-gray-400 whitespace-nowrap">{n.date}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Open Jobs — clickable, links to /jobs */}
      <div className="border border-gray-100 rounded-2xl p-5 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">13. Open Jobs</h2>
          <Link href="/jobs" className="text-xs text-gray-400 hover:text-[#e5173f]">
            View all jobs →
          </Link>
        </div>
        <div className="flex flex-col">
          {openJobs.map((j) => (
            <Link
              key={j.title}
              href="/jobs"
              className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0 cursor-pointer group"
            >
              <div>
                <p className="text-xs font-medium text-gray-900 group-hover:text-[#e5173f] transition-colors">
                  {j.title}
                </p>
                <p className="text-xs text-gray-400">{j.team}</p>
              </div>
              <span className="text-xs text-gray-400">{j.location}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Research Papers + Patents */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">14. Research Papers</h2>
          {researchPapers.map((p) => (
            <div key={p.title} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
              <p className="text-xs text-gray-700">{p.title}</p>
              <span className="text-xs text-gray-400 whitespace-nowrap">{p.date}</span>
            </div>
          ))}
        </div>

        <div className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">15. Patents</h2>
          {patents.map((p) => (
            <div key={p.title} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
              <p className="text-xs text-gray-700">{p.title}</p>
              <span className="text-xs text-gray-400 whitespace-nowrap">{p.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alumni + Similar Companies — clickable chips */}
      <div className="grid grid-cols-2 gap-8 mt-8 mb-8">
        <div className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">16. Alumni Companies</h2>
          <div className="flex flex-wrap gap-2">
            {alumniCompanies.map((c) => (
              <Link
                key={c}
                href={resolveHref(c)}
                className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 hover:border-[#e5173f] hover:text-[#e5173f] cursor-pointer transition-colors"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        <div className="border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">18. Similar Companies</h2>
          <div className="flex flex-wrap gap-2">
            {similarCompanies.map((c) => (
              <Link
                key={c}
                href={resolveHref(c)}
                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 hover:border-[#e5173f] hover:text-[#e5173f] cursor-pointer transition-colors"
              >
                {c} <ExternalLink size={11} className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}