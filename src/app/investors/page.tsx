"use client";

import { useState } from "react";
import Link from "next/link";
import { investors } from "@/data/investors";
import { companies } from "@/data/companies";
import { Search, MapPin, Users } from "lucide-react";

const investorTypes = ["All", "Venture Capital", "Accelerator", "Corporate"];

function resolveCompanyHref(name: string): string {
  const match = companies.find((c) => c.name.toLowerCase() === name.toLowerCase());
  return match ? `/companies/${match.id}` : `/companies?search=${encodeURIComponent(name)}`;
}

export default function InvestorsPage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  const filtered = investors.filter((inv) => {
    const matchesSearch =
      inv.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.portfolio.some((p) => p.toLowerCase().includes(search.toLowerCase()));
    const matchesType = activeType === "All" || inv.type === activeType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="px-8 py-6 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-medium text-[#e5173f] bg-red-50 px-2 py-1 rounded-full uppercase tracking-wide">
          AI Investors
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mt-3 leading-tight">
          The people and firms<br />funding the future of AI
        </h1>
        <p className="text-gray-500 mt-3 text-sm max-w-md">
          Explore venture capital firms, accelerators, and corporate investors backing the world&apos;s leading AI companies.
        </p>

        <div className="flex items-center gap-3 mt-5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 max-w-lg">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            name="investors-search"
            id="investors-search"
            placeholder="Search investors or portfolio companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-700 outline-none flex-1 placeholder:text-gray-400"
          />
        </div>

        {/* Type filter pills */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {investorTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`text-xs px-3 py-1.5 border rounded-full transition-colors ${
                activeType === type
                  ? "border-[#e5173f] text-[#e5173f] bg-red-50"
                  : "border-gray-200 text-gray-600 hover:border-[#e5173f] hover:text-[#e5173f]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Investor list */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10 border border-gray-100 rounded-xl">
          No investors match your search.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((inv) => (
            <Link
              key={inv.id}
              href={`/investors/${inv.id}`}
              className="border border-gray-100 rounded-2xl p-5 hover:border-[#e5173f] transition-colors block"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {inv.name[0]}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{inv.name}</h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {inv.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={11} /> {inv.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Users size={11} /> {inv.portfolio.length} portfolio companies
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-xs text-gray-400">Portfolio:</span>
                {inv.portfolio.map((p) => (
                  <span
                    key={p}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-gray-600"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}