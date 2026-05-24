import { Suspense } from "react";
import type { Metadata } from "next";
import KGListClient from "./KGListClient";
import { SchoolCardSkeleton } from "@/components/ui/Skeleton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600; // ISR 1 hour

export const metadata: Metadata = pageMetadata({
  title: "香港幼稚園搜尋與 K1-K3 學額空缺",
  description:
    "搜尋全港幼稚園，按地區、N 班、K1-K3 學額、學費、班別和課程資料篩選比較。",
  path: "/kg",
});

function KGListFallback() {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <div className="h-7 w-24 bg-cream-200/60 rounded-button animate-pulse mb-6" />
      <div className="h-12 bg-cream-200/40 rounded-card border border-surface-border mb-6 animate-pulse" />
      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SchoolCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function KGListPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "香港幼稚園搜尋", path: "/kg" },
        ])}
      />
      <Suspense fallback={<KGListFallback />}>
        <KGListClient />
      </Suspense>
    </>
  );
}
