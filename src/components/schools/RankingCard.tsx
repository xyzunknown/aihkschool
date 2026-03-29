"use client";

import Link from "next/link";
import { DISTRICT_LABELS, COMPETITION_CONFIG } from "@/lib/utils";
import type { District, HeatRankingItem } from "@/types/database";

interface RankingCardProps {
  item: HeatRankingItem;
  rank: number;
}

export function RankingCard({ item, rank }: RankingCardProps) {
  const districtLabel = DISTRICT_LABELS[item.district as District] ?? item.district;
  const competition = item.competition_level
    ? COMPETITION_CONFIG[item.competition_level as keyof typeof COMPETITION_CONFIG]
    : null;

  return (
    <Link
      href={`/kg/${item.school_id}`}
      className="flex items-center gap-4 px-4 py-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow"
    >
      {/* Rank number */}
      <span
        className={`text-xl font-bold w-8 text-center flex-shrink-0 ${
          rank <= 3 ? "text-slate-950" : "text-slate-300"
        }`}
      >
        {rank}
      </span>

      {/* School info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-950 line-clamp-1">{item.name_tc}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs text-slate-500">{districtLabel}</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">{item.school_type === "non_profit" ? "非牟利" : item.school_type === "private_independent" ? "私立獨立" : item.school_type === "international" ? "國際" : item.school_type}</span>
          {competition && (
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${competition.pillBg} ${competition.pillText}`}>
              競爭{competition.label}
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex-shrink-0 text-right">
        <p className="text-xs text-slate-500">{item.total_posts} 篇</p>
        {item.interview_posts > 0 && (
          <p className="text-xs text-slate-400 mt-0.5">{item.interview_posts} 位面試分享</p>
        )}
      </div>
    </Link>
  );
}
