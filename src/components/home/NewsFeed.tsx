import Link from "next/link";
import { NEWS_ITEMS } from "@/data/homepage";

export function NewsFeed() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-950">消息動態</h2>
        <Link
          href="/kg"
          className="text-slate-500 hover:text-slate-950 text-sm font-medium transition-colors"
        >
          查看全部 →
        </Link>
      </div>

      <div className="space-y-3">
        {NEWS_ITEMS.map((item) => (
          <Link key={item.id} href={item.href} className="block">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium flex-shrink-0 mt-0.5 ${
                    item.source === "edb"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {item.source_label}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                    {item.summary}
                  </p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 mt-1">
                  {item.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
