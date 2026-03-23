import { Suspense } from "react";
import KGListClient from "./KGListClient";
import { SchoolCardSkeleton } from "@/components/ui/Skeleton";

export const revalidate = 3600; // ISR 1 hour

function KGListFallback() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
      <div className="h-7 w-24 bg-slate-200/60 rounded-xl animate-pulse mb-6" />
      <div className="h-12 bg-slate-200/40 rounded-card mb-6 animate-pulse" />
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
