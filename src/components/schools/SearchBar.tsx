"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { startsWithSearchText } from "@/lib/schools/searchText";

interface SearchBarProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

interface Suggestion {
  id: string;
  name_tc: string;
  name_en: string | null;
  district: string;
}

export function SearchBar({ initialQuery, onSearch }: SearchBarProps) {
  const [input, setInput] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const trimmed = input.trim();

  // Debounced search — 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 300);
    return () => clearTimeout(timer);
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/schools?search=${encodeURIComponent(trimmed)}&limit=8`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data as Suggestion[] : [];
        setSuggestions(
          data.sort((a, b) => {
            const aStarts = startsWithSearchText(a.name_tc, trimmed) ? 0 : 1;
            const bStarts = startsWithSearchText(b.name_tc, trimmed) ? 0 : 1;
            return aStarts - bStarts || a.name_tc.localeCompare(b.name_tc, "zh-Hant-HK");
          }).slice(0, 5),
        );
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setSuggestions([]);
        }
      }
    }, 120);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [trimmed]);

  return (
    <div className="relative mb-6">
      <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3 flex items-center gap-3">
        <svg
          className="w-4 h-4 text-slate-400 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input
          type="text"
          placeholder="搜尋學校名稱、地區或英文名..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 outline-none"
        />
        {input && (
          <button
            onClick={() => setInput("")}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="清除搜尋"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          {suggestions.map((school) => (
            <Link
              key={school.id}
              href={`/kg/${school.id}`}
              className="block px-5 py-3 transition hover:bg-brand-50"
            >
              <p className="text-sm font-semibold text-slate-900">{school.name_tc}</p>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {[school.name_en, school.district].filter(Boolean).join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
