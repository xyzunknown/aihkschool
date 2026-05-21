import { Suspense } from "react";
import type { Metadata } from "next";
import { ActivitiesClient } from "./ActivitiesClient";
import { ActivityCardSkeleton } from "@/components/activities/ActivityCard";
import { FeatureBanner } from "@/components/feature/FeatureBanner";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "課外活動 | HKSchoolPlace",
  description:
    "香港幼稚園階段親子活動搜尋 — 親子玩樂、展覽演出、學習體驗、節慶活動。按地區和費用篩選，幫小朋友搵到合適活動。",
  openGraph: {
    title: "課外活動 | HKSchoolPlace",
    description: "香港幼稚園階段親子活動搜尋，按地區和費用篩選。",
  },
};

export default function ActivitiesPage() {
  return (
    <>
      <FeatureBanner
        eyebrow="幼稚園階段興趣探索"
        title="課外活動"
        description="按類別、地區和費用篩選，幫小朋友找到合適的親子玩樂、展覽演出、學習體驗和節慶活動。"
        imageSrc="/images/feature-banners/activities-discovery.webp"
        imageAlt="課外活動探索插畫"
        imagePosition="73% center"
        stats={[
          { label: "活動類型", value: "親子 · 展覽 · 體驗" },
          { label: "搜尋方式", value: "地區與費用" },
          { label: "資料原則", value: "可核對來源" },
        ]}
        actions={[
          { label: "瀏覽活動", href: "#activity-list" },
          { label: "只看免費", href: "/activities?free=true", variant: "secondary" },
        ]}
      />

      <div id="activity-list" className="mx-auto max-w-7xl px-5 pt-10 pb-28 md:px-8 md:py-10">
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
