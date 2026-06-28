"use client";

import { useState } from "react";
import { Job } from "@/types";
import { MapPin, Building2, Check } from "lucide-react";

export default function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 px-4 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Building2 size={16} className="text-gray-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 group-hover:text-[#e5173f] transition-colors">
            {job.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs text-gray-500">{job.company}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={10} /> {job.location}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">{job.salary}</span>
            {job.equity && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">{job.equity}</span>
              </>
            )}
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-400">{job.postedAt}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <button
          onClick={() => setSaved((s) => !s)}
          className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${
            saved
              ? "border-[#e5173f] text-[#e5173f] bg-red-50"
              : "border-gray-200 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>
        <button
          onClick={() => setApplied(true)}
          disabled={applied}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
            applied
              ? "bg-green-50 text-green-600 cursor-default"
              : "bg-[#e5173f] text-white hover:bg-[#c4122f]"
          }`}
        >
          {applied ? (
            <>
              <Check size={12} /> Applied
            </>
          ) : (
            "Apply"
          )}
        </button>
      </div>
    </div>
  );
}