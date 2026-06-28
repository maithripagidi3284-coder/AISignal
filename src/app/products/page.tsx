// src/app/products/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  products,
  CATEGORY_TABS,
  ALL_TAGS,
  TRENDING_SEARCHES,
  PRODUCT_OF_DAY,
  type Product,
  type CategoryTab,
} from "@/data/products";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("All");
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"popular" | "newest" | "votes">("popular");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());

  function toggleVote(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    setVotedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const catOk = activeCategory === "All" || p.category === activeCategory;
      const tagOk = activeTags.size === 0 || p.tags.some((t) => activeTags.has(t));
      const q = search.toLowerCase();
      const qOk = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
      return catOk && tagOk && qOk;
    });
    if (sort === "votes") list = [...list].sort((a, b) => b.votes - a.votes);
    else if (sort === "newest") list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
    return list;
  }, [activeCategory, activeTags, search, sort]);

  const showFeatured = activeCategory === "All" && !search && activeTags.size === 0;
  const featured = showFeatured ? filtered.find((p) => p.featured) : null;
  const rest = featured ? filtered.filter((p) => p !== featured) : filtered;

  function fmtVotes(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-gray-100 px-4 py-6 md:px-8 md:py-10">
        <svg className="pointer-events-none absolute right-0 top-0 h-full w-2/5 opacity-20" viewBox="0 0 200 120" aria-hidden="true">
          {([[20,15,2],[60,30,2],[100,10,2],[140,40,2],[180,20,2],[40,60,1.5],[80,50,1.5],[120,70,2],[160,55,1.5],[30,90,2],[70,100,1.5],[110,85,2]] as [number,number,number][]).map(([cx,cy,r],i)=>(
            <circle key={i} cx={cx} cy={cy} r={r} fill="#e24b4a" />
          ))}
        </svg>
        <div className="relative max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">AI Products</h1>
          <p className="text-sm text-gray-400 mb-4">Discover, compare, and upvote the best AI tools and products.</p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-red-400 transition-colors"
              />
            </div>
            <button className="h-9 w-9 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors flex-shrink-0">
              →
            </button>
          </div>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="flex gap-1 flex-wrap px-4 md:px-8 pt-2 border-b border-gray-100 overflow-x-auto">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? "border-red-500 text-red-500 bg-white"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="flex gap-4 px-4 md:px-8 py-4 max-w-6xl mx-auto">
        {/* ── Main Feed ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className="text-xs text-gray-400">{filtered.length.toLocaleString()} products</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white outline-none cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="votes">Most voted</option>
              </select>
              {/* Grid / List toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveView("grid")}
                  className={`px-2 py-1.5 text-xs transition-colors ${activeView === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-700"}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setActiveView("list")}
                  className={`px-2 py-1.5 text-xs transition-colors ${activeView === "list" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-700"}`}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {/* Featured banner */}
          {featured && (
            <div className="border border-gray-100 rounded-xl p-3 md:p-4 mb-4 flex items-center gap-3 bg-gray-50 cursor-pointer hover:border-gray-300 transition-colors group">
              <div className="h-12 w-12 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-2xl flex-shrink-0">
                {featured.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold text-red-500 uppercase tracking-widest mb-0.5">🔥 Popular right now</div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-red-500 transition-colors">{featured.name}</p>
                <p className="text-xs text-gray-400 mb-1.5">{featured.desc}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {featured.tags.map((t) => <TagBadge key={t} label={t} />)}
                  {featured.badge && <StatusBadge type={featured.badge} label={featured.badgeLabel!} />}
                </div>
              </div>
              <button
                onClick={(e) => toggleVote(e, featured.id)}
                className={`flex items-center gap-1 border rounded-lg px-3 py-1.5 text-xs font-medium transition-colors flex-shrink-0 ${
                  votedIds.has(featured.id) ? "border-red-400 text-red-500 bg-red-50" : "border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500"
                }`}
              >
                ▲ {fmtVotes(featured.votes + (votedIds.has(featured.id) ? 1 : 0))}
              </button>
            </div>
          )}

          {/* Product grid / list */}
          {rest.length === 0 && !featured ? (
            <div className="py-16 text-center text-sm text-gray-400">No products found. Try a different filter.</div>
          ) : (
            <div className={activeView === "grid"
              ? "grid grid-cols-2 md:grid-cols-3 gap-3"
              : "flex flex-col gap-2"
            }>
              {rest.map((p) => (
                <ProductCard key={p.id} product={p} view={activeView} voted={votedIds.has(p.id)} onVote={(e) => toggleVote(e, p.id)} fmtVotes={fmtVotes} />
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <aside className="w-52 flex-shrink-0 hidden lg:block">
          {/* Product of the day */}
          <div className="border border-gray-100 rounded-xl p-3 bg-gray-50 mb-4">
            <div className="text-[10px] font-semibold text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              🏆 Product of the day
            </div>
            <div className="h-9 w-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-base mb-2">
              {PRODUCT_OF_DAY.logo}
            </div>
            <p className="text-xs font-semibold text-gray-900 mb-0.5">{PRODUCT_OF_DAY.name}</p>
            <p className="text-[11px] text-gray-400 mb-2">{PRODUCT_OF_DAY.desc}</p>
            <Link
              href="/products/cursor"
              className="block w-full text-center bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1.5 rounded-lg transition-colors"
            >
              View product
            </Link>
          </div>

          {/* Trending searches */}
          <div className="mb-4">
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Trending searches</h4>
            <div className="flex flex-wrap gap-1.5">
              {TRENDING_SEARCHES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSearch(t)}
                  className="text-[11px] border border-gray-200 rounded-full px-2.5 py-0.5 text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors bg-white"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by tag */}
          <div>
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Filter by tag</h4>
            <div className="space-y-1">
              {ALL_TAGS.map((tag) => (
                <label key={tag} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-gray-900 py-0.5">
                  <input
                    type="checkbox"
                    checked={activeTags.has(tag)}
                    onChange={() => toggleTag(tag)}
                    className="accent-red-500"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({
  product, view, voted, onVote, fmtVotes,
}: {
  product: Product;
  view: "grid" | "list";
  voted: boolean;
  onVote: (e: React.MouseEvent) => void;
  fmtVotes: (n: number) => string;
}) {
  if (view === "list") {
    return (
      <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
        className="flex items-center gap-3 border border-gray-100 rounded-xl px-3 py-2.5 hover:border-gray-300 transition-colors group bg-white"
      >
        <div className="h-9 w-9 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center text-base flex-shrink-0">{product.logo}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 group-hover:text-red-500 transition-colors truncate">{product.name}</p>
          <p className="text-xs text-gray-400 truncate">{product.desc}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {product.badge && <StatusBadge type={product.badge} label={product.badgeLabel!} />}
          <button onClick={onVote} className={`flex items-center gap-1 border rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${voted ? "border-red-400 text-red-500 bg-red-50" : "border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500"}`}>
            ▲ {fmtVotes(product.votes + (voted ? 1 : 0))}
          </button>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="flex flex-col gap-2 border border-gray-100 rounded-xl p-3 hover:border-gray-300 transition-colors group bg-white"
    >
      <div className="h-10 w-10 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center text-xl">{product.logo}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 group-hover:text-red-500 transition-colors truncate">{product.name}</p>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{product.desc}</p>
      </div>
      <div className="flex gap-1 flex-wrap">
        {product.tags.map((t) => <TagBadge key={t} label={t} />)}
        {product.badge && <StatusBadge type={product.badge} label={product.badgeLabel!} />}
      </div>
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-[11px] text-gray-400">♥ {fmtVotes(product.votes)}</span>
        <button onClick={onVote} className={`flex items-center gap-1 border rounded-lg px-2 py-0.5 text-[11px] font-medium transition-colors ${voted ? "border-red-400 text-red-500 bg-red-50" : "border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500"}`}>
          ▲ {fmtVotes(product.votes + (voted ? 1 : 0))}
        </button>
      </div>
    </Link>
  );
}

// ── Small components ──────────────────────────────────────────────────────────

function TagBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded border border-gray-100 bg-gray-50 text-gray-500">
      {label}
    </span>
  );
}

function StatusBadge({ type, label }: { type: string; label: string }) {
  const styles: Record<string, string> = {
    trend: "bg-orange-50 text-orange-700",
    new: "bg-green-50 text-green-700",
    top: "bg-purple-50 text-purple-700",
  };
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${styles[type] ?? "bg-gray-100 text-gray-600"}`}>
      {label}
    </span>
  );
}