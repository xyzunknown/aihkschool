import { Suspense } from "react";
import type { Metadata } from "next";
import { ActivitiesClient } from "./ActivitiesClient";
import { ActivityCardSkeleton } from "@/components/activities/ActivityCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "課外活動 | HKSchoolPlace",
  description:
    "香港幼稚園階段課外活動搜尋 — 音樂、運動、美術、舞蹈、科學、語言等興趣班。按地區、類別、費用篩選，幫小朋友搵到合適活動。",
  openGraph: {
    title: "課外活動 | HKSchoolPlace",
    description: "香港幼稚園階段課外活動搜尋，按地區類別篩選。",
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
          香港幼稚園階段興趣班、社區活動搜尋 · 音樂、運動、美術、舞蹈、科學、語言
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
      <div className="mb-6 h-10 animate-pulse rounded-full bg-slate-100" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
