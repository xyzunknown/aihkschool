import Link from "next/link";
import type { FeaturedSchool } from "@/types/homepage";

interface Props {
  schools: FeaturedSchool[];
}

function getVacancyLabel(status: string | undefined): { text: string; className: string } {
  const s = status?.toLowerCase() ?? "";
  if (s.includes("has")) return { text: "有位", className: "bg-emerald-50 text-emerald-700" };
  if (s.includes("wait")) return { text: "候補", className: "bg-amber-50 text-amber-700" };
  if (s.includes("no")) return { text: "滿額", className: "bg-red-50 text-red-700" };
  return { text: "—", className: "bg-slate-50 text-slate-400" };
}

export function VacancyTicker({ schools }: Props) {
  // Only show schools that actually have vacancy data
  const items = schools
    .filter((s) => s.vacancyStatus && (s.vacancyStatus.k1 || s.vacancyStatus.k2 || s.vacancyStatus.k3))
    .slice(0, 5);

  if (items.length === 0) return null;

  const k1Has = items.filter((s) => s.vacancyStatus?.k1?.toLowerCase().includes("has")).length;
  const k2Has = items.filter((s) => s.vacancyStatus?.k2?.toLowerCase().includes("has")).length;

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 mt-12">
      <div className="rounded-card bg-white border border-cream-200 shadow-soft overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 py-4 bg-leaf-50 border-b border-cream-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-ink-900">學位空缺速遞</h2>
              <span className="px-2 py-0.5 rounded-md bg-rust-500/10 text-rust-600 text-[10px] font-bold">
                每日更新
              </span>
            </div>
            <p className="text-xs text-ink-700 mt-1">
              今日 {items.length} 間學校有空缺資訊
              <span className="mx-1.5 text-cream-300">·</span>
              K1 {k1Has} 間有位
              <span className="mx-1.5 text-cream-300">·</span>
              K2 {k2Has} 間有位
            </p>
          </div>
          <Link
            href="/kg?has_vacancy=1"
            className="self-start md:self-auto px-4 h-9 rounded-pill bg-forest-600 text-white text-sm font-medium hover:bg-forest-700 transition inline-flex items-center gap-1"
          >
            查看全部空缺 →
          </Link>
        </div>
        <ul className="divide-y divide-cream-100">
          {items.map((s) => {
            const label = getVacancyLabel(s.vacancyStatus?.k1);
            return (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-cream-50 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink-900 truncate">{s.name_tc}</p>
                    <p className="text-xs text-ink-500 mt-0.5">
                      {s.sessionTags[0] ?? "—"}
                      <span className="mx-1.5">·</span>
                      {s.district}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold shrink-0 ${label.className}`}>
                    {label.text}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
