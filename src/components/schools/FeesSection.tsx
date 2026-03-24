import { GlassCard } from "@/components/ui/GlassCard";
import type { School } from "@/types/database";

interface FeesSectionProps {
  school: School;
}

export function FeesSection({ school }: FeesSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-label text-slate-400 uppercase mb-4">学费</h2>
      <GlassCard>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-label text-slate-400 uppercase mb-1">月费</div>
            <div className="text-body text-slate-900">
              {school.fee_monthly_hkd !== null
                ? `HKD ${school.fee_monthly_hkd.toLocaleString()}`
                : "暂无"}
            </div>
          </div>
          <div>
            <div className="text-label text-slate-400 uppercase mb-1">年费</div>
            <div className="text-body text-slate-900">
              {school.fee_annual_hkd !== null
                ? `HKD ${school.fee_annual_hkd.toLocaleString()}`
                : "暂无"}
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
