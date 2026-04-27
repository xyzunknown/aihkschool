const STATS = [
  { icon: "🛡️", value: "400+", label: "全港幼稚園資料" },
  { icon: "🔁", value: "每日更新", label: "開放日、學位及資料" },
  { icon: "💚", value: "10,000+", label: "家長信任使用" },
  { icon: "✨", value: "100% 免費", label: "所有資訊及工具" },
];

export function StatsBanner() {
  return (
    <section className="relative mt-16 bg-gradient-to-r from-leaf-100 via-cream-100 to-leaf-50 border-y border-cream-200 overflow-hidden">
      <span className="leaf-decor leaf-decor-bl pointer-events-none opacity-50" />
      <span className="leaf-decor leaf-decor-br pointer-events-none opacity-50" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-soft flex items-center justify-center text-2xl">
              {s.icon}
            </div>
            <p className="mt-3 text-2xl font-bold text-forest-700">{s.value}</p>
            <p className="text-xs text-ink-700 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
