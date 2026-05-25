import Link from "next/link";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { SectionHeader } from "@/components/home/SectionHeader";
import type { NewsItem } from "@/types/homepage";

const SOURCE_CATEGORY_STYLES: Record<string, string> = {
  edb: "bg-forest-50 text-forest-700",
  govhk: "bg-sky-50 text-sky-700",
  hk01: "bg-amber-50 text-amber-700",
};

function sourceStyle(source: string): string {
  return SOURCE_CATEGORY_STYLES[source] ?? "bg-forest-50 text-forest-700";
}

interface NewsFeedProps {
  items: NewsItem[];
}

export function NewsFeed({ items }: NewsFeedProps) {
  return (
    <section className="mb-10 mt-12">
      <SectionHeader title="消息動態" href="/news" />

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
              <div className="rounded-card border border-surface-border bg-white p-4 transition-all duration-200 hover:border-forest-100 hover:shadow-soft sm:p-5">
                <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-start">
                  <span
                    className={`inline-flex w-fit flex-shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sourceStyle(item.source)}`}
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
                  <div className="flex flex-shrink-0 items-center gap-1.5 text-ink-500 sm:justify-end">
                    <span className="text-xs">{item.date}</span>
                    {isExternal && (
                      <ArrowSquareOut size={13} weight="regular" aria-hidden="true" />
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
