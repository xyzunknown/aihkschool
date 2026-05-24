import Link from "next/link";
import { ArrowSquareOut, CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { NewsItem } from "@/types/homepage";

const SOURCE_CATEGORY_STYLES: Record<string, string> = {
  edb: "bg-forest-50 text-forest-700",
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
    <section className="mb-10 mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink-900">消息動態</h2>
        <Link
          href="/news"
          className="text-sm font-medium text-ink-500 transition-colors hover:text-ink-900"
        >
          <span className="inline-flex items-center gap-1">
            查看更多
            <CaretRight size={14} weight="bold" aria-hidden="true" />
          </span>
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
              <div className="rounded-card border border-surface-border bg-white p-5 transition-all duration-200  hover:shadow-sm">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex flex-shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sourceStyle(item.source)}`}
                  >
                    {item.source_label}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug text-ink-900 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-500 line-clamp-1">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-1.5 mt-1">
                    <span className="text-xs text-ink-500">{item.date}</span>
                    {isExternal && (
                      <ArrowSquareOut size={12} weight="regular" className="text-ink-300" aria-hidden="true" />
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
