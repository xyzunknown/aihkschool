"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const QUICK_FILTERS = [
  { label: "中西區", href: "/kg?district=central_and_western" },
  { label: "九龍城區", href: "/kg?district=kowloon_city" },
  { label: "國際學校", href: "/kg?type=international" },
];

export function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/kg?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/kg");
    }
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋學校名稱、地區…"
          className="flex-1 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
        />
        <Button variant="primary" className="px-8 py-3">
          立即搜索
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {QUICK_FILTERS.map((filter) => (
          <Link key={filter.label} href={filter.href}>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm transition-colors cursor-pointer">
              {filter.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
