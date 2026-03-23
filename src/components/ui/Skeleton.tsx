export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/60 rounded-xl ${className}`}
    />
  );
}

export function SchoolCardSkeleton() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-card p-7">
      <Skeleton className="h-3 w-16 mb-3" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/3 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-14 rounded-pill" />
        <Skeleton className="h-6 w-20 rounded-pill" />
        <Skeleton className="h-6 w-12 rounded-pill" />
      </div>
      <div className="mt-5 pt-4 border-t border-slate-200/20 flex justify-between">
        <Skeleton className="h-8 w-8 rounded-[10px]" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}
