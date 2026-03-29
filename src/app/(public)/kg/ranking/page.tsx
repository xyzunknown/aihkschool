import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchHeatRanking } from "@/lib/db/socialIntel";
import RankingClient from "./RankingClient";

export const revalidate = 86400; // ISR: daily

export const metadata: Metadata = {
  title: "社交平台熱度排行 — HKSchoolPlace",
  description: "根據社交平台討論熱度，查看全港幼稚園排行榜。",
  openGraph: {
    title: "社交平台熱度排行 — HKSchoolPlace",
    description: "根據社交平台討論熱度，查看全港幼稚園排行榜。",
    type: "website",
    url: "https://aihkschool.vercel.app/kg/ranking",
  },
};

const PAGE_SIZE = 20;

interface RankingPageProps {
  searchParams: Promise<{ district?: string; page?: string }>;
}

export default async function RankingPage({ searchParams }: RankingPageProps) {
  const params = await searchParams;
  const district = params.district ?? undefined;
  const page = parseInt(params.page ?? "1", 10);
  const offset = (page - 1) * PAGE_SIZE;

  const { data, count } = await fetchHeatRanking({
    district,
    limit: PAGE_SIZE,
    offset,
  });

  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
        <div className="h-7 w-48 bg-slate-200/60 rounded-xl animate-pulse mb-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <RankingClient initialData={data} initialCount={count} />
    </Suspense>
  );
}
