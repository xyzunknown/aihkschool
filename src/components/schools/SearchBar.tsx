"use client";

import { useEffect, useState } from "react";

interface SearchBarProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export function SearchBar({ initialQuery, onSearch }: SearchBarProps) {
  const [input, setInput] = useState(initialQuery);

  // Debounced search — 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 300);
    return () => clearTimeout(timer);
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-white/50 backdrop-blur-2xl border border-slate-200/50 rounded-card px-5 py-3 flex items-center gap-3 mb-6">
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
        placeholder="搜索学校名称…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent text-body text-slate-900 placeholder:text-slate-400 outline-none"
      />
      {input && (
        <button
          onClick={() => setInput("")}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="清除搜索"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
