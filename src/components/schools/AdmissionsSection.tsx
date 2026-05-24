import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar } from "@phosphor-icons/react/dist/ssr";
import { getApplicationStatusLabel, hasAdmissionInfo } from "@/lib/schools/admissions";
import type { School } from "@/types/database";
import type { SchoolEnrichment } from "@/lib/db/schools";

function normalizeUrl(url: string | null | undefined): string {
  if (!url) return "";
  try {
    const u = new URL(url.trim());
    const host = u.hostname.toLowerCase().replace(/^www\./, "");
    const path = u.pathname.replace(/\/$/, "");
    return `${host}${path}`;
  } catch {
    return url.trim().toLowerCase().replace(/^www\./, "").replace(/\/$/, "");
  }
}

interface AdmissionsSectionProps {
  school: School;
  enrichment: SchoolEnrichment | null;
}

export function AdmissionsSection({ school, enrichment }: AdmissionsSectionProps) {
  // Merge: enrichment fields take priority, fall back to school main table
  const rawApplicationUrl = enrichment?.application_url || school.application_url;
  const applicationUrl =
    normalizeUrl(rawApplicationUrl) === normalizeUrl(school.website)
      ? null
      : rawApplicationUrl;
  const applicationProcess = enrichment?.application_process || school.application_details;
  const openDayDate = enrichment?.open_day_date || null;
  const openDayDetails = enrichment?.open_day_details || school.open_day_details;
  const openDayUrl = school.open_day_url || null;
  const admissionHours = enrichment?.admission_hours || null;
  const applicationStatus = school.application_status;

  const hasAnyInfo = hasAdmissionInfo(school) ||
    applicationUrl ||
    enrichment?.application_process ||
    enrichment?.open_day_date ||
    enrichment?.open_day_details ||
    enrichment?.admission_hours;

  if (!hasAnyInfo) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink-900 mb-4">招生與開放日</h2>
        <GlassCard>
          <p className="text-base text-ink-900">
            暫時未有招生或開放日資料，建議查看學校官網最新公布。
          </p>
        </GlassCard>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-ink-900 mb-4">招生與開放日</h2>
      <GlassCard>
        <div className="space-y-5">
          <div>
            <div className="text-xs font-medium text-ink-500 uppercase tracking-wide mb-1">
              報名狀態
            </div>
            <div className="text-base text-ink-900">
              {getApplicationStatusLabel(applicationStatus)}
            </div>
          </div>

          {applicationProcess && (
            <div>
              <div className="text-xs font-medium text-ink-500 uppercase tracking-wide mb-1">
                報名資訊
              </div>
              <p className="text-base text-ink-900 leading-relaxed whitespace-pre-line">{applicationProcess}</p>
            </div>
          )}

          {applicationUrl && (
            <div>
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink-700 underline hover:text-ink-900"
              >
                前往報名或招生頁面
              </a>
            </div>
          )}

          {admissionHours && (
            <div className="border-t border-surface-border pt-5">
              <div className="text-xs font-medium text-ink-500 uppercase tracking-wide mb-1">
                上課時間
              </div>
              <p className="text-base text-ink-900 leading-relaxed whitespace-pre-line">{admissionHours}</p>
            </div>
          )}

          {(openDayDetails || openDayDate) && (
            <div className="border-t border-surface-border pt-5">
              <div className="text-xs font-medium text-ink-500 uppercase tracking-wide mb-1">
                開放日 / 參觀資訊
              </div>
              {openDayDate && (
                <p className="mb-1 inline-flex items-center gap-1.5 text-base font-medium text-ink-900">
                  <Calendar size={17} weight="regular" className="text-forest-700" aria-hidden="true" />
                  {openDayDate}
                </p>
              )}
              {openDayDetails && (
                <p className="text-base text-ink-900 leading-relaxed whitespace-pre-line">{openDayDetails}</p>
              )}
            </div>
          )}

          {openDayUrl && (
            <div>
              <a
                href={openDayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink-700 underline hover:text-ink-900"
              >
                查看開放日或參觀詳情
              </a>
            </div>
          )}

        </div>
      </GlassCard>
    </section>
  );
}
