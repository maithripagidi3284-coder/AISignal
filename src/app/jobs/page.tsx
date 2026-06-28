"use client";

import { useState } from "react";
import { jobs } from "@/data/jobs";
import JobCard from "@/components/JobCard";
import { Briefcase } from "lucide-react";

const categories = ["Engineering", "Product", "Design"];

export default function JobsPage() {
  const [titleQuery, setTitleQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(titleQuery.toLowerCase()) &&
      j.location.toLowerCase().includes(locationQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="flex-1 px-8 py-6 max-w-4xl">

        <div className="mb-8">
          <span className="text-xs font-medium text-[#e5173f] uppercase tracking-wide">
            • LIVE AI INTELLIGENCE
          </span>
          <h1 className="text-3xl font-bold text-gray-900">
            Find what&apos;s <span className="text-[#e5173f]">next.</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Discover the best AI startups and find your next career opportunity.
          </p>

          <div className="flex gap-3 mt-4">
            <input
              type="text"
              name="job-title-search"
              id="job-title-search"
              placeholder="Job title"
              value={titleQuery}
              onChange={(e) => setTitleQuery(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e5173f] transition-colors"
            />
            <input
              type="text"
              name="job-location-search"
              id="job-location-search"
              placeholder="Location"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e5173f] transition-colors"
            />
          </div>
        </div>

        {filteredJobs.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-10 border border-gray-100 rounded-xl">
            No jobs match your search.
          </p>
        )}

        {categories.map((category) => {
          const filtered = filteredJobs.filter((j) => j.category === category);
          if (filtered.length === 0) return null;
          return (
            <div key={category} className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-gray-700" />
                  <h2 className="text-base font-semibold text-gray-900">
                    {category} jobs
                  </h2>
                </div>
              </div>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-72 px-6 py-6 border-l border-gray-100 flex-shrink-0">
        <div className="border border-gray-100 rounded-xl p-5 mb-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            Get new jobs in your inbox
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Join 50K+ professionals getting AI jobs handpicked daily.
          </p>
          <input
            type="email"
            name="newsletter-email"
            id="newsletter-email"
            placeholder="Enter your email"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#e5173f] mb-2"
          />
          <button className="w-full bg-[#e5173f] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#c4122f] transition-colors">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}