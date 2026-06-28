"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Bell, Menu } from "lucide-react";

interface TopbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Topbar({ isSidebarOpen, onToggleSidebar }: TopbarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 gap-4 z-30 shrink-0">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 shrink-0"
        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <Menu size={18} />
      </button>

      <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 max-w-xl">
        <Search size={15} className="text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          name="global-search"
          id="global-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search startups, products, investors, jobs and news"
          className="bg-transparent text-sm text-gray-700 outline-none flex-1 placeholder:text-gray-400"
        />
        <kbd className="text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">/</kbd>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e5173f] rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
          <img src="https://i.pravatar.cc/32" alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}