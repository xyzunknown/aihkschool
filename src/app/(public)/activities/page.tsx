import { Suspense } from "react";
import type { Metadata } from "next";
import { ActivitiesClient } from "./ActivitiesClient";
import { ActivityCardSkeleton } from "@/components/activities/ActivityCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "香港幼稚園階段親子活動",
  description:
    "搜尋香港幼稚園階段親子活動、展覽演出、學習體驗和節慶活動，按地區、年齡和費用篩選。",
  path: "/activities",
});

export default function ActivitiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "課外活動", path: "/activities" },
        ])}
      />
      <div id="activity-list" className="mx-auto max-w-[1440px] px-5 py-6 pb-28 md:px-8">
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
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
