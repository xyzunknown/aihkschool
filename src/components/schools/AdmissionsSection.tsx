import { GlassCard } from "@/components/ui/GlassCard";
import { getApplicationStatusLabel, hasAdmissionInfo } from "@/lib/schools/admissions";
import type { School } from "@/types/database";
import type { SchoolEnrichment } from "@/lib/db/schools";

interface AdmissionsSectionProps {
  school: School;
  enrichment: SchoolEnrichment | null;
}

export function AdmissionsSection({ school, enrichment }: AdmissionsSectionProps) {
  // Merge: enrichment fields take priority, fall back to school main table
  const applicationUrl = enrichment?.application_url || school.application_url;
  const applicationProcess = enrichment?.application_process || school.application_details;
  const openDayDate = enrichment?.open_day_date || null;
  const openDayDetails = enrichment?.open_day_details || school.open_day_details;
  const openDayUrl = school.open_day_url || null;
  const admissionHours = enrichment?.admission_hours || null;
  const applicationStatus = school.application_status;

  const hasAnyInfo = hasAdmissionInfo(school) ||
    enrichment?.application_url ||
    enrichment?.application_process ||
    enrichment?.open_day_date ||
    enrichment?.open_day_details ||
    enrichment?.admission_hours;

  if (!hasAnyInfo) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-950 mb-4">招生與開放日</h2>
        <GlassCard>
          <p className="text-base text-slate-900">
            暫時未有招生或開放日資料，建議查看學校官網最新公布。
          </p>
        </GlassCard>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-slate-950 mb-4">招生與開放日</h2>
      <GlassCard>
        <div className="space-y-5">
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
              報名狀態
            </div>
            <div className="text-base text-slate-900">
              {getApplicationStatusLabel(applicationStatus)}
            </div>
          </div>

          {applicationProcess && (
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                報名資訊
              </div>
              <p className="text-base text-slate-900 leading-relaxed whitespace-pre-line">{applicationProcess}</p>
            </div>
          )}

          {applicationUrl && (
            <div>
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 underline hover:text-slate-950"
              >
                前往報名或招生頁面
              </a>
            </div>
          )}

          {admissionHours && (
            <div className="border-t border-slate-200 pt-5">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                上課時間
              </div>
              <p className="text-base text-slate-900 leading-relaxed whitespace-pre-line">{admissionHours}</p>
            </div>
          )}

          {(openDayDetails || openDayDate) && (
            <div className="border-t border-slate-200 pt-5">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                開放日 / 參觀資訊
              </div>
              {openDayDate && (
                <p className="text-base font-medium text-slate-900 mb-1">📅 {openDayDate}</p>
              )}
              {openDayDetails && (
                <p className="text-base text-slate-900 leading-relaxed whitespace-pre-line">{openDayDetails}</p>
              )}
            </div>
          )}

          {openDayUrl && (
            <div>
              <a
                href={openDayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 underline hover:text-slate-950"
              >
                查看開放日或參觀詳情
              </a>
            </div>
          )}

          {/* K1/K2/K3 vacancy status from enrichment */}
          {enrichment && (enrichment.vacancy_k1 || enrichment.vacancy_k2 || enrichment.vacancy_k3) && (
            <div className="border-t border-slate-200 pt-5">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                各級空缺狀態（官網）
              </div>
              <div className="flex flex-wrap gap-2">
                {enrichment.vacancy_k1 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    K1：{enrichment.vacancy_k1}
                  </span>
                )}
                {enrichment.vacancy_k2 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    K2：{enrichment.vacancy_k2}
                  </span>
                )}
                {enrichment.vacancy_k3 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    K3：{enrichment.vacancy_k3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </section>
  );
}
