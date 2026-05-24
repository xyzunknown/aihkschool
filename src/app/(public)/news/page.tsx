import { NewsClient } from "./NewsClient";

export default function NewsPage() {
  return (
    <div className="bg-surface-page">
      <section className="mx-auto max-w-[1280px] px-5 pt-8 md:px-10 md:pt-10">
        <div className="relative overflow-hidden rounded-[28px] border border-surface-border bg-white px-5 py-8 shadow-card md:px-10 md:py-10">
          <div className="leaf-decor leaf-decor-tr opacity-45" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <p className="mb-3 text-label font-semibold text-forest-700">消息資訊</p>
            <h1 className="max-w-2xl text-h1 text-ink-900 md:text-[36px] md:leading-tight">
              幫家長快速看懂最近要留意的幼稚園消息
            </h1>
            <p className="mt-4 max-w-2xl text-body text-ink-700">
              集中整理教育局公告、學校活動、升學安排和親子教育報道，方便你按主題篩走雜訊。
            </p>
          </div>
        </div>
      </section>
      <NewsClient />
    </div>
  );
}
