import Link from "next/link";
import { investors } from "@/data/investors";
import { companies } from "@/data/companies";
import { MapPin, Users, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

function resolveCompanyHref(name: string): string {
  const match = companies.find((c) => c.name.toLowerCase() === name.toLowerCase());
  return match ? `/companies/${match.id}` : `/companies?search=${encodeURIComponent(name)}`;
}

export default async function InvestorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const investor = investors.find((inv) => inv.id === id);

  if (!investor) return notFound();

  return (
    <div className="max-w-3xl px-8 py-6">
      <Link
        href="/investors"
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#e5173f] mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Investors
      </Link>

      <div className="flex items-start gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
          {investor.name[0]}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{investor.name}</h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
              {investor.type}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} /> {investor.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Users size={12} /> {investor.portfolio.length} portfolio companies
            </span>
          </div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Portfolio Companies</h2>
        <div className="grid grid-cols-2 gap-3">
          {investor.portfolio.map((p) => (
            <Link
              key={p}
              href={resolveCompanyHref(p)}
              className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-[#e5173f] transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                {p[0]}
              </div>
              <span className="text-sm font-medium text-gray-900">{p}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}