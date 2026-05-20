import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
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
    <>
      <section className="relative overflow-hidden bg-cream-50 border-b border-cream-200">
        <span className="leaf-decor leaf-decor-tl pointer-events-none" />
        <span className="leaf-decor leaf-decor-tr pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-ink-900 leading-tight">
              課外活動
            </h1>
            <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed max-w-md">
              香港幼稚園階段興趣班、社區活動搜尋 · 音樂、運動、美術、舞蹈、科學、語言
            </p>
          </div>
          <div className="relative hidden h-24 items-end justify-center md:flex md:h-28">
            <Image
              src="/images/activity-scenes/art-table.webp"
              alt=""
              width={420}
              height={280}
              priority
              sizes="280px"
              className="relative z-10 h-full w-full rounded-[20px] object-cover opacity-95 shadow-[0_16px_40px_rgba(30,82,56,0.10)]"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">
        <Suspense fallback={<ActivitiesListSkeleton />}>
          <ActivitiesClient />
        </Suspense>
      </div>
    </>
  );
}

function ActivitiesListSkeleton() {
  return (
    <div>
      <div className="mb-6 h-10 animate-pulse rounded-pill bg-cream-100" />
      <div className="mb-6 h-10 animate-pulse rounded-pill bg-cream-100" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
