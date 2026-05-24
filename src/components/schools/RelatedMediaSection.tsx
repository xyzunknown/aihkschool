import {
  MEDIA_CONTENT_TYPE_LABELS,
  MEDIA_SOURCE_LABELS,
  type MediaArticle,
} from "@/lib/db/mediaArticles";

interface RelatedMediaSectionProps {
  articles: MediaArticle[];
}

function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export function RelatedMediaSection({ articles }: RelatedMediaSectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-ink-900">
            相關報道
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            來自親子及教育媒體，只作補充參考，暫代原家長心得區塊。
          </p>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-card border border-dashed border-surface-border bg-surface-soft p-5 text-sm text-ink-500">
          目前未找到與這間學校直接匹配的媒體報道。我們會先保留這個區塊，待後續家長心得與相關內容來源補齊。
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-card border border-surface-border bg-white p-4 shadow-soft transition-all  hover:shadow-card"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-medium text-forest-700">
                  {MEDIA_SOURCE_LABELS[article.source]}
                </span>
                <span className="rounded-full bg-status-pending-bg px-2.5 py-0.5 text-xs font-medium text-status-pending-fg">
                  {MEDIA_CONTENT_TYPE_LABELS[article.content_type]}
                </span>
                {formatDate(article.published_at) && (
                  <span className="text-xs text-ink-500">
                    {formatDate(article.published_at)}
                  </span>
                )}
              </div>
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink-900">
                {article.title}
              </h3>
              {(article.summary || article.body_excerpt) && (
                <p className="mt-1 line-clamp-2 text-sm text-ink-500">
                  {article.summary || article.body_excerpt}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
