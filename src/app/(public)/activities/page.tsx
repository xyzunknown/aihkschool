import { Suspense } from "react";
import type { Metadata } from "next";
import { ActivitiesClient } from "./ActivitiesClient";
import { ActivityCardSkeleton } from "@/components/activities/ActivityCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "課外活動 | HKSchoolPlace",
  description:
    "搜羅香港幼稚園階段小朋友適合嘅課外活動、興趣班、免費社區活動。康文署、社福機構等渠道一次過睇。",
  openGraph: {
    title: "課外活動 | HKSchoolPlace",
    description: "搜羅香港幼稚園階段小朋友適合嘅課外活動、興趣班、免費社區活動。",
  },
};

export default function ActivitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          課外活動
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          幼稚園階段小朋友嘅興趣班同社區活動 · 多數免費或低價
        </p>
      </div>

      <Suspense fallback={<ActivitiesListSkeleton />}>
        <ActivitiesClient />
      </Suspense>
    </div>
  );
}

function ActivitiesListSkeleton() {
  return (
    <div>
      <div className="mb-6 h-10 animate-pulse rounded-full bg-slate-100" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
