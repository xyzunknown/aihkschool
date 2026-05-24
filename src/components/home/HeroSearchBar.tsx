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

export function HeroSearchBar({ variant = "default" }: { variant?: "default" | "hero" }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const isHero = variant === "hero";

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
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋學校名稱、地區…"
          className={
            isHero
              ? "min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-[15px] text-slate-950 placeholder-slate-400 shadow-[0_12px_28px_rgba(31,42,36,0.08)] transition-colors focus:border-brand-500 focus:outline-none"
              : "flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-950 placeholder-slate-400 transition-colors focus:border-slate-400 focus:outline-none"
          }
        />
        <Button
          type="submit"
          variant="primary"
          className={
            isHero
              ? "h-12 shrink-0 rounded-2xl px-5 text-[15px] font-semibold shadow-[0_12px_28px_rgba(30,82,56,0.18)] sm:w-[112px]"
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
                  ? "inline-flex cursor-pointer items-center rounded-full bg-brand-50 px-3.5 py-1.5 text-sm text-ink-700 transition-colors hover:bg-brand-100"
                  : "inline-flex cursor-pointer items-center rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-200"
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
