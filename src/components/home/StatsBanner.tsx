import { Bell, CheckCircle, Heart, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";

const STATS = [
  {
    value: "868",
    label: "EDB 認可幼稚園",
    icon: CheckCircle,
  },
  {
    value: "每日更新",
    label: "學位空缺・申請資訊",
    icon: ArrowsClockwise,
  },
  {
    value: "康體通課程",
    label: "報名提醒・追蹤截止",
    icon: Bell,
  },
  {
    value: "100% 免費",
    label: "所有資訊及工具",
    icon: Heart,
  },
];

export function StatsBanner() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8 mt-12">
      <div className="bg-white rounded-card border border-surface-border shadow-soft px-5 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-3 md:gap-4 rounded-card px-1 py-1 transition-colors hover:bg-surface-soft/70">
            <span className="shrink-0 w-10 h-10 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center">
              <s.icon size={20} weight="regular" aria-hidden="true" />
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
