"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { startsWithSearchText } from "@/lib/schools/searchText";

interface Suggestion {
  id: string;
  name_tc: string;
  name_en: string | null;
  district: string;
}

const QUICK_FILTERS = [
  { label: "中西區", href: "/kg?district=central_and_western" },
  { label: "九龍城區", href: "/kg?district=kowloon_city" },
  { label: "國際學校", href: "/kg?type=international" },
];

export function HeroSearchBar({ variant = "default" }: { variant?: "default" | "hero" }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const isHero = variant === "hero";
  const trimmed = query.trim();

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
        setSuggestions(data.sort((a, b) => {
          const aStarts = startsWithSearchText(a.name_tc, trimmed) ? 0 : 1;
          const bStarts = startsWithSearchText(b.name_tc, trimmed) ? 0 : 1;
          return aStarts - bStarts || a.name_tc.localeCompare(b.name_tc, "zh-Hant-HK");
        }));
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

  const visibleSuggestions = useMemo(() => suggestions.slice(0, 6), [suggestions]);
  const showSuggestions = (isFocused || trimmed) && visibleSuggestions.length > 0;

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
    <div className={isHero ? "mt-6 w-full max-w-[430px] md:mt-7" : "mt-6"}>
      <form
        onSubmit={handleSubmit}
        className={
          isHero
            ? "flex w-full flex-col gap-2.5 sm:flex-row sm:items-stretch"
            : "flex gap-3"
        }
      >
        <div className="relative min-w-0 flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => window.setTimeout(() => setIsFocused(false), 220)}
            placeholder="搜尋學校名稱、地區或拼音…"
            className={
              isHero
                ? "min-w-0 w-full rounded-card border border-surface-border bg-white px-4 py-3 text-body text-ink-900 placeholder:text-ink-400 shadow-soft transition-colors focus:border-forest-500 focus:outline-none"
                : "w-full rounded-button border border-surface-border bg-white px-6 py-3 text-body text-ink-900 placeholder:text-ink-400 transition-colors focus:border-ink-400 focus:outline-none"
            }
          />
          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[320px] overflow-auto rounded-card border border-surface-border bg-white text-left shadow-card">
              {visibleSuggestions.map((school) => (
                <Link
                  key={school.id}
                  href={`/kg/${school.id}`}
                  onMouseDown={(event) => event.preventDefault()}
                  className="block px-4 py-3 transition hover:bg-forest-50"
                >
                  <p className="truncate text-small font-semibold text-ink-900">{school.name_tc}</p>
                  <p className="mt-0.5 truncate text-label text-ink-500">
                    {[school.name_en, school.district].filter(Boolean).join(" · ")}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          className={
            isHero
              ? "h-12 shrink-0 px-5 text-body font-semibold sm:w-[112px]"
              : "px-8 py-3"
          }
        >
          立即搜索
        </Button>
      </form>

      <div className={isHero ? "mt-3 flex flex-wrap gap-2" : "mt-4 flex flex-wrap gap-2"}>
        {QUICK_FILTERS.map((filter) => (
          <Link key={filter.label} href={filter.href}>
            <span
              className={
                isHero
                  ? "inline-flex cursor-pointer items-center rounded-pill bg-forest-50 px-3.5 py-1.5 text-small text-ink-700 transition-colors hover:bg-forest-100"
                  : "inline-flex cursor-pointer items-center rounded-pill bg-forest-50 px-4 py-2 text-small text-ink-700 transition-colors hover:bg-forest-100"
              }
            >
              {filter.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
