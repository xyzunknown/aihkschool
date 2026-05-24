export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-button bg-cream-100 ${className}`}
    />
  );
}

export function SchoolCardSkeleton() {
  return (
    <div className="rounded-card border border-surface-border bg-white p-6">
      <Skeleton className="h-3 w-16 mb-3" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/3 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-14 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
      <div className="mt-5 flex justify-between border-t border-surface-border pt-4">
        <Skeleton className="h-8 w-8 rounded-button" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}
