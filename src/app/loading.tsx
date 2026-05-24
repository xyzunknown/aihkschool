export default function Loading() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 text-center md:px-8">
      <div className="inline-flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-pill border-2 border-ink-300 border-t-ink-900" />
        <span className="text-body text-ink-500">載入中…</span>
      </div>
    </div>
  );
}
