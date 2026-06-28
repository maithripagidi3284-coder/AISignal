"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Rocket,
  Box,
  Users,
  Briefcase,
  Newspaper,
  Send,
  PlusSquare,
  X,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "AI Startups", href: "/companies", icon: Rocket },
  { label: "AI Products", href: "/products", icon: Box },
  { label: "Investors", href: "/investors", icon: Users },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "News", href: "/news", icon: Newspaper },
];

const contributeItems = [
  { label: "Submit Startup", href: "/submit-startup", icon: Send },
  { label: "Submit Product", href: "/submit-product", icon: PlusSquare },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "h-screen border-r border-gray-100 bg-white flex flex-col py-4 z-40 overflow-hidden transition-all duration-200 ease-in-out shrink-0",
        isOpen ? "w-[200px]" : "w-0 py-0 border-r-0"
      )}
    >
      <div className="w-[200px] flex flex-col h-full">
        <div className="px-4 mb-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#e5173f] rounded-md flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">
              GraphOne
            </span>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md hover:bg-gray-50 text-gray-400"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 px-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm transition-colors whitespace-nowrap",
                pathname === href
                  ? "bg-red-50 text-[#e5173f] font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-2 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 px-3 mb-2 whitespace-nowrap">Contribute</p>
          {contributeItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}