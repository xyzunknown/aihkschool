import Link from "next/link";
import { fetchHeatRanking } from "@/lib/db/socialIntel";
import { DISTRICT_LABELS } from "@/lib/utils";
import type { District } from "@/types/database";

export async function HeatRanking() {
  const { data: items } = await fetchHeatRanking({ limit: 10 });

  // Don't render if no data (table doesn't exist or empty)
  if (!items || items.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-950">社交平台熱度榜</h2>
        <Link
          href="/kg/ranking"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          查看完整排行 →
        </Link>
      </div>

      <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 hide-scrollbar">
        {items.map((item, index) => (
          <Link
            key={item.school_id}
            href={`/kg/${item.school_id}`}
            className="min-w-[180px] snap-start flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
          >
            <span className="text-2xl font-bold text-slate-300">{index + 1}</span>
            <p className="mt-2 text-sm font-semibold text-slate-950 leading-snug line-clamp-2">
              {item.name_tc}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {DISTRICT_LABELS[item.district as District] ?? item.district}
            </p>
            <div className="mt-3 space-y-0.5">
              <p className="text-xs text-slate-400">{item.total_posts} 篇討論</p>
              {item.interview_posts > 0 && (
                <p className="text-xs text-slate-400">{item.interview_posts} 位面試分享</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-3">數據來源：網絡公開內容整理，僅供參考</p>
    </section>
  );
}
