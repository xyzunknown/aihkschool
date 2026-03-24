export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 text-center">
      <div className="inline-flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
        <span className="text-body text-slate-400">加载中…</span>
      </div>
    </div>
  );
}
