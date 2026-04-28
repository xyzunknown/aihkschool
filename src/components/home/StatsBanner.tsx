const STATS = [
  { icon: "🛡️", value: "400+", label: "全港幼稚園資料" },
  { icon: "🔁", value: "每日更新", label: "開放日、學位及資料" },
  { icon: "💚", value: "10,000+", label: "家長信任使用" },
  { icon: "✨", value: "100% 免費", label: "所有資訊及工具" },
];

export function StatsBanner() {
  return (
    <section className="relative mt-12 bg-leaf-50 border-y border-cream-200 overflow-hidden">
      <span
        className="leaf-decor leaf-decor-br pointer-events-none opacity-25"
        style={{ width: 160, height: 160 }}
      />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-7 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="w-9 h-9 mx-auto rounded-full bg-white shadow-soft flex items-center justify-center text-base">
              {s.icon}
            </div>
            <p className="mt-2 text-xl md:text-2xl font-bold text-forest-700 leading-tight">{s.value}</p>
            <p className="text-xs text-ink-700 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
