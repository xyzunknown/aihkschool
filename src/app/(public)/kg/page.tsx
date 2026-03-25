import { Suspense } from "react";
import type { Metadata } from "next";
import KGListClient from "./KGListClient";
import { SchoolCardSkeleton } from "@/components/ui/Skeleton";

export const revalidate = 3600; // ISR 1 hour

export const metadata: Metadata = {
  title: "幼稚園列表 — HKSchoolPlace",
  description: "搜尋全港幼稚園，查看 K1-K3 學位空缺狀態、申請截止日期，一站式對比。",
  openGraph: {
    title: "幼稚園列表 — HKSchoolPlace",
    description: "搜尋全港幼稚園，查看 K1-K3 學位空缺狀態、申請截止日期。",
    type: "website",
    url: "https://aihkschool.vercel.app/kg",
  },
};

function KGListFallback() {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <div className="h-7 w-24 bg-slate-200/60 rounded-xl animate-pulse mb-6" />
      <div className="h-12 bg-slate-200/40 rounded-2xl border border-slate-200 mb-6 animate-pulse" />
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
    <Suspense fallback={<KGListFallback />}>
      <KGListClient />
    </Suspense>
  );
}
