"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MagnifyingGlass, MapPin, Student, Buildings } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { startsWithSearchText } from "@/lib/schools/searchText";

interface Suggestion {
  id: string;
  name_tc: string;
  name_en: string | null;
  district: string;
}

const QUICK_FILTERS = [
  { label: "中西區", href: "/kg?district=central_and_western", icon: MapPin },
  { label: "九龍城區", href: "/kg?district=kowloon_city", icon: MapPin },
  { label: "國際學校", href: "/kg?type=international", icon: Buildings },
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
    <div className={isHero ? "mt-7 w-full max-w-[560px]" : "mt-6"}>
      <form
        onSubmit={handleSubmit}
        className={
          isHero
            ? "flex w-full flex-col gap-2.5 sm:flex-row sm:items-stretch"
            : "flex gap-3"
        }
      >
        <div className="relative min-w-0 flex-1">
          <div className={isHero ? "flex min-h-14 items-center gap-3 rounded-pill border border-surface-border bg-white px-4 shadow-card transition-colors focus-within:border-forest-500" : "flex items-center gap-3 rounded-button border border-surface-border bg-white px-4 transition-colors focus-within:border-ink-400"}>
            <MagnifyingGlass aria-hidden="true" size={20} weight="regular" className="shrink-0 text-forest-700" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => window.setTimeout(() => setIsFocused(false), 220)}
              placeholder="搜尋學校名稱、地區或拼音…"
              className={isHero ? "min-w-0 flex-1 bg-transparent py-3 text-body text-ink-900 outline-none placeholder:text-ink-400" : "min-w-0 flex-1 bg-transparent py-3 text-body text-ink-900 outline-none placeholder:text-ink-400"}
            />
          </div>
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
              ? "h-14 shrink-0 px-6 text-body font-semibold sm:w-[118px]"
              : "px-8 py-3"
          }
        >
          立即搜尋
        </Button>
      </form>

      <div className={isHero ? "mt-3 flex flex-wrap gap-2" : "mt-4 flex flex-wrap gap-2"}>
        {QUICK_FILTERS.map((filter) => {
          const Icon = filter.icon ?? Student;
          return (
          <Link key={filter.label} href={filter.href}>
            <span
              className={
                isHero
                  ? "inline-flex cursor-pointer items-center gap-1.5 rounded-pill border border-forest-100 bg-white/95 px-3.5 py-1.5 text-small font-medium text-forest-700 transition-colors hover:bg-forest-50"
                  : "inline-flex cursor-pointer items-center rounded-pill bg-forest-50 px-4 py-2 text-small text-ink-700 transition-colors hover:bg-forest-100"
              }
            >
              {isHero ? <Icon aria-hidden="true" size={15} weight="regular" /> : null}
              {filter.label}
            </span>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
