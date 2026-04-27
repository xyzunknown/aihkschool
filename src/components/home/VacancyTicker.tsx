import Link from "next/link";
import type { FeaturedSchool } from "@/types/homepage";

interface Props {
  schools: FeaturedSchool[];
}

export function VacancyTicker({ schools }: Props) {
  const items = schools.slice(0, 5);
  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 mt-12">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-ink-900">學位空缺速遞</h2>
        <span className="px-2 py-0.5 rounded-md bg-rust-500/10 text-rust-600 text-[10px] font-bold">每日更新</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            className="bg-white rounded-card border border-cream-200 px-4 py-3 hover:border-forest-300 transition shadow-soft"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-ink-900 line-clamp-1 flex-1">{s.name_tc}</p>
              <span className="px-2 py-0.5 rounded-md bg-leaf-50 text-forest-700 text-[10px] font-bold shrink-0">
                有位
              </span>
            </div>
            <p className="text-[11px] text-ink-500">
              {s.sessionTags[0] ?? "—"} · {s.district}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
