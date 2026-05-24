import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { NewsItem } from "@/types/homepage";

const ARTICLE_PHOTOS = [
  "/brand/articles/article-1.jpg",
  "/brand/articles/article-2.jpg",
  "/brand/articles/article-3.jpg",
  "/brand/articles/article-4.jpg",
];

const ARTICLE_TAGS = ["申請攻略", "面試準備", "選校指南", "家長分享"];

interface Props {
  items: NewsItem[];
}

export function ArticleGrid({ items }: Props) {
  const articles = items.slice(0, 4);

  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-ink-900 flex items-center gap-2">
          <span className="inline-block w-1 h-5 bg-forest-700 rounded-full" />
          家長熱門主題
        </h2>
        <Link href="/news" className="inline-flex items-center gap-1 text-sm text-forest-700 hover:underline font-medium">
          查看全部攻略
          <CaretRight size={14} weight="bold" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.length === 0 &&
          ARTICLE_TAGS.map((tag, i) => (
            <PlaceholderArticle key={tag} tag={tag} photo={ARTICLE_PHOTOS[i]} />
          ))}
        {articles.map((a, i) => (
          <ArticleCard
            key={a.id}
            title={a.title}
            href={a.href}
            isExternal={a.is_external}
            tag={ARTICLE_TAGS[i] ?? a.source_label}
            photo={ARTICLE_PHOTOS[i % 4]}
          />
        ))}
      </div>
    </section>
  );
}

function ArticleCard({
  title,
  href,
  isExternal,
  tag,
  photo,
}: {
  title: string;
  href: string;
  isExternal: boolean;
  tag: string;
  photo: string;
}) {
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" as const }
    : { href };

  return (
    <Link
      {...linkProps}
      className="group bg-white rounded-card border border-surface-border overflow-hidden shadow-soft hover:shadow-soft transition-all duration-200 flex flex-col"
    >
      <div className="relative h-36 bg-cream-100 overflow-hidden">
        <Image
          src={photo}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover group- transition duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="self-start px-2 py-0.5 rounded-md bg-sand-100 text-sand-700 text-[10px] font-bold">
          {tag}
        </span>
        <h3 className="text-sm font-semibold text-ink-900 mt-2 line-clamp-2 group-hover:text-forest-700 transition leading-snug">
          {title}
        </h3>
        <p className="text-[11px] text-ink-500 mt-auto pt-3">閱讀時間：約 5 分鐘</p>
      </div>
    </Link>
  );
}

function PlaceholderArticle({ tag, photo }: { tag: string; photo: string }) {
  return (
    <div className="bg-white rounded-card border border-surface-border overflow-hidden shadow-soft flex flex-col opacity-90">
      <div className="relative h-36 bg-cream-100 overflow-hidden">
        <Image src={photo} alt="" fill sizes="320px" className="object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="self-start px-2 py-0.5 rounded-md bg-sand-100 text-sand-700 text-[10px] font-bold">{tag}</span>
        <p className="text-sm text-ink-700 mt-2">內容更新中...</p>
      </div>
    </div>
  );
}
