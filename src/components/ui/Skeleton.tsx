export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-slate-100 rounded-xl ${className}`}
    />
  );
}

export function SchoolCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[rgba(32,85,59,0.08)] bg-white shadow-[0_12px_28px_rgba(35,75,50,0.06)]">
      <Skeleton className="h-[118px] rounded-none bg-[#eef4e8]" />
      <div className="px-5 pb-5">
        <Skeleton className="-mt-7 mb-4 h-14 w-14 rounded-[16px] border border-white bg-white shadow-[0_6px_14px_rgba(32,85,59,0.08)]" />
        <Skeleton className="mb-2 h-5 w-3/4 rounded-full" />
        <Skeleton className="mb-4 h-3 w-1/2 rounded-full" />
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="mb-4 grid grid-cols-3 gap-2">
          <Skeleton className="h-12 rounded-full" />
          <Skeleton className="h-12 rounded-full" />
          <Skeleton className="h-12 rounded-full" />
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
