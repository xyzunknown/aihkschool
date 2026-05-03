const STATS = [
  {
    value: "868",
    label: "EDB 認可幼稚園",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2C20 17.5 12 22 12 22z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    value: "每日更新",
    label: "學位空缺・開放日",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    value: "康體通課程",
    label: "報名提醒・追蹤截止",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    value: "100% 免費",
    label: "所有資訊及工具",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export function StatsBanner() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-12">
      <div className="bg-white rounded-[20px] border border-surface-border shadow-[0_8px_24px_rgba(30,82,56,0.06)] px-5 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-3 md:gap-4 rounded-2xl px-1 py-1 transition-colors hover:bg-surface-soft/70">
            <span className="shrink-0 w-10 h-10 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center">
              {s.icon}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base md:text-lg font-semibold text-ink-900">{s.value}</span>
              <span className="text-xs text-ink-500 mt-0.5">{s.label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
