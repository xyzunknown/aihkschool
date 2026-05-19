import Image from "next/image";
import Link from "next/link";
import { getVisibleTopics } from "@/lib/growth/topics";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  district: "地區整理",
  nursery: "N 班",
  international: "國際幼稚園",
  admission: "申請攻略",
  open_day: "開放日",
  guide: "選校指南",
};

export default async function TopicsPage() {
  const topics = await getVisibleTopics();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-teal-700">HKSchoolPlace 專題</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">家長選校整理</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">把熱門地區、N 班、開放日和申請流程整理成可收藏的專題。</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {topics.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link key={topic.id} href={`/topics/${topic.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-sm">
                {topic.hero_image_url ? (
                  <div className="relative h-40 w-full">
                    <Image src={topic.hero_image_url} alt="" fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-teal-100 via-white to-amber-100" />
                )}
                <div className="p-5">
                  <div className="text-xs font-medium text-teal-700">{CATEGORY_LABELS[topic.category] ?? "專題"}</div>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950 group-hover:text-teal-700">{topic.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{topic.summary || "查看完整整理。"}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-slate-950">專題正在整理中</h2>
            <p className="mt-2 text-sm text-slate-500">新的選校整理發布後會出現在這裡。</p>
          </div>
        )}
      </section>
    </main>
  );
}
