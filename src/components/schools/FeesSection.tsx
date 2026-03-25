import { GlassCard } from "@/components/ui/GlassCard";
import type { School } from "@/types/database";

interface FeesSectionProps {
  school: School;
}

export function FeesSection({ school }: FeesSectionProps) {
  const hasMonthlyFee = school.fee_monthly_hkd !== null;
  const hasAnnualFee = school.fee_annual_hkd !== null;

  if (!hasMonthlyFee && !hasAnnualFee) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-950 mb-4">學費及各項收費</h2>
        <GlassCard>
          <p className="text-base text-slate-900">
            暫無學費資料，請瀏覽學校官網查詢。
          </p>
        </GlassCard>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-slate-950 mb-4">學費及各項收費</h2>
      <GlassCard>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left px-0 py-3 font-semibold text-slate-950 text-xs uppercase tracking-wide">
                項目
              </th>
              {hasMonthlyFee && (
                <th className="text-right px-4 py-3 font-semibold text-slate-950 text-xs uppercase tracking-wide">
                  半日制
                </th>
              )}
              {hasAnnualFee && (
                <th className="text-right px-4 py-3 font-semibold text-slate-950 text-xs uppercase tracking-wide">
                  全日制
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 hover:bg-slate-50">
              <td className="px-0 py-3 text-slate-900">每月學費</td>
              {hasMonthlyFee && (
                <td className="text-right px-4 py-3 text-slate-900 font-medium">
                  HKD ${school.fee_monthly_hkd!.toLocaleString()}
                </td>
              )}
              {hasAnnualFee && (
                <td className="text-right px-4 py-3 text-slate-900 font-medium">
                  HKD ${school.fee_annual_hkd!.toLocaleString()}
                </td>
              )}
            </tr>
          </tbody>
        </table>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 leading-relaxed">
            註：校園及其他學費詳情內容以官方公佈為準。
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
