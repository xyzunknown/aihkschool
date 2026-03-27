import Link from "next/link";
import type { NewsItem } from "@/types/homepage";

const SOURCE_CATEGORY_STYLES: Record<string, string> = {
  edb: "bg-emerald-50 text-emerald-700",
  govhk: "bg-sky-50 text-sky-700",
  hk01: "bg-amber-50 text-amber-700",
};

function sourceStyle(source: string): string {
  return SOURCE_CATEGORY_STYLES[source] ?? "bg-blue-50 text-blue-700";
}

interface NewsFeedProps {
  items: NewsItem[];
}

export function NewsFeed({ items }: NewsFeedProps) {
  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-950">消息動態</h2>
        <Link
          href="/news"
          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
        >
          查看更多 →
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const isExternal = item.is_external;
          const href = isExternal
            ? item.href
            : `/news/${encodeURIComponent(item.id)}`;

          return (
            <Link
              key={item.id}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="block"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex flex-shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sourceStyle(item.source)}`}
                  >
                    {item.source_label}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug text-slate-900 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-1.5 mt-1">
                    <span className="text-xs text-slate-400">{item.date}</span>
                    {isExternal && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-300"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
