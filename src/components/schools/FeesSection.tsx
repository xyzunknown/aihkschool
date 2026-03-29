import { GlassCard } from "@/components/ui/GlassCard";
import { FEE_TYPE_LABELS } from "@/lib/utils";
import type { School } from "@/types/database";

interface FeesSectionProps {
  school: School;
  feeEstimates?: Record<string, { low: number; high: number; count: number }> | null;
}

function formatCurrency(value: number) {
  return `HK$${value.toLocaleString()}`;
}

export function FeesSection({ school, feeEstimates }: FeesSectionProps) {
  const hasMonthlyFee = school.fee_monthly_hkd !== null;
  const hasAnnualFee = school.fee_annual_hkd !== null;
  const hasApplicationFee = school.application_fee_hkd !== null;
  const hasRegistrationFee = school.registration_fee_hkd !== null;
  const hasOtherFeesNote = Boolean(school.other_fees_note || school.fee_notes);
  const showKepStatus = school.school_type !== "international";

  if (!showKepStatus && !hasMonthlyFee && !hasAnnualFee && !hasApplicationFee && !hasRegistrationFee && !hasOtherFeesNote) {
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
          <tbody>
            {showKepStatus && (
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-0 py-3 text-slate-900">資助計劃</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {school.kep_participant ? "已參加幼稚園教育計劃" : "未參加幼稚園教育計劃"}
                </td>
              </tr>
            )}
            {(hasMonthlyFee || hasAnnualFee) && (
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-0 py-3 text-slate-900">學費</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {[
                    hasMonthlyFee ? `每月 ${formatCurrency(school.fee_monthly_hkd!)}` : null,
                    hasAnnualFee ? `全年 ${formatCurrency(school.fee_annual_hkd!)}` : null,
                  ].filter(Boolean).join(" / ")}
                </td>
              </tr>
            )}
            {hasApplicationFee && (
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-0 py-3 text-slate-900">報名費</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {formatCurrency(school.application_fee_hkd!)}
                </td>
              </tr>
            )}
            {hasRegistrationFee && (
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-0 py-3 text-slate-900">留位費</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {formatCurrency(school.registration_fee_hkd!)}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {hasOtherFeesNote && (
          <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
            {school.fee_notes && (
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  官網費用摘要
                </div>
                <p className="text-sm text-slate-900 leading-relaxed">{school.fee_notes}</p>
              </div>
            )}
            {school.other_fees_note && (
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  其他收費
                </div>
                <p className="text-sm text-slate-900 leading-relaxed">{school.other_fees_note}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 leading-relaxed">
            註：學費、報名費、留位費及其他收費以學校最新官方公布為準。
          </p>
        </div>

        {/* 家長預估費用 */}
        {feeEstimates && (() => {
          const validFees = Object.entries(feeEstimates).filter(([, v]) => v.count >= 3);
          if (validFees.length === 0) return null;
          const totalLow = validFees.reduce((s, [, v]) => s + v.low, 0);
          const totalHigh = validFees.reduce((s, [, v]) => s + v.high, 0);
          return (
            <>
              <div className="border-t border-dashed border-slate-200 my-4" />
              <div>
                <h3 className="text-base font-semibold text-slate-950 mb-3">
                  💡 家長預估費用
                </h3>
                <div className="space-y-2">
                  {validFees.map(([feeType, { low, high, count }]) => (
                    <div key={feeType} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">
                        {FEE_TYPE_LABELS[feeType] ?? feeType}
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-medium text-slate-700">
                          約 HK${low.toLocaleString()}-{high.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 ml-2">
                          {count} 位家長預估
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-sm font-semibold text-slate-950">
                    預計首年額外支出：約 HK${totalLow.toLocaleString()}-{totalHigh.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  數據來源：網絡公開內容整理，僅供參考
                </p>
              </div>
            </>
          );
        })()}
      </GlassCard>
    </section>
  );
}
