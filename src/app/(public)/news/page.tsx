import { NewsClient } from "./NewsClient";

export default function NewsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
        <h1 className="mb-2 text-h1 font-bold text-ink-900">資訊消息</h1>
        <p className="max-w-3xl text-body text-ink-700">
          集中整理最新教育資訊、學校活動和升學政策，幫家長更快掌握值得留意的更新。
        </p>
      </section>
      <NewsClient />
    </>
  );
}
