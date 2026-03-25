import { GlassCard } from "@/components/ui/GlassCard";
import type { School } from "@/types/database";

interface AdmissionsSectionProps {
  school: School;
}

const APPLICATION_STATUS_LABELS: Record<string, string> = {
  open: "正在招生",
  year_round: "全年接受申請",
  closed: "本輪未開放",
  website: "請查看官網",
  unknown: "暫未確認",
};

export function AdmissionsSection({ school }: AdmissionsSectionProps) {
  const hasAdmissionInfo = Boolean(
    school.application_status ||
      school.application_details ||
      school.application_url ||
      school.open_day_details ||
      school.open_day_url
  );

  if (!hasAdmissionInfo) {
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
              {school.application_status
                ? APPLICATION_STATUS_LABELS[school.application_status] ?? school.application_status
                : "暫未確認"}
            </div>
          </div>

          {school.application_details && (
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                報名資訊
              </div>
              <p className="text-base text-slate-900 leading-relaxed">{school.application_details}</p>
            </div>
          )}

          {school.application_url && (
            <div>
              <a
                href={school.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 underline hover:text-slate-950"
              >
                前往報名或招生頁面
              </a>
            </div>
          )}

          {school.open_day_details && (
            <div className="border-t border-slate-200 pt-5">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                開放日 / 參觀資訊
              </div>
              <p className="text-base text-slate-900 leading-relaxed">{school.open_day_details}</p>
            </div>
          )}

          {school.open_day_url && (
            <div>
              <a
                href={school.open_day_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 underline hover:text-slate-950"
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
