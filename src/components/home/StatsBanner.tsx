const STATS = [
  {
    value: "400+",
    label: "全港幼稚園資料",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2C20 17.5 12 22 12 22z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    value: "每日更新",
    label: "開放日・學位空缺",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    value: "10,000+",
    label: "家長信任使用",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
      <div className="bg-white rounded-card border border-surface-border shadow-soft px-5 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-3 md:gap-4">
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
