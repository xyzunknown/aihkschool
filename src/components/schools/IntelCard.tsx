import type { InterviewType, ApplicationResult } from "@/types/database";
import {
  INTERVIEW_TYPE_LABELS,
  APPLICATION_RESULT_LABELS,
} from "@/lib/utils";

interface IntelCardProps {
  academicYear: string;
  gradeApplied: string;
  interviewType: InterviewType;
  interviewLanguage: string | null;
  queueTime: string | null;
  hasSecondInterview: boolean | null;
  offerMonth: string | null;
  applicationResult: ApplicationResult;
  notes: string | null;
  helpfulCount: number;
  isVoted?: boolean;
  onHelpful?: () => void;
}

export function IntelCard({
  academicYear,
  gradeApplied,
  interviewType,
  interviewLanguage,
  queueTime,
  hasSecondInterview,
  offerMonth,
  applicationResult,
  notes,
  helpfulCount,
  isVoted,
  onHelpful,
}: IntelCardProps) {
  const resultColors: Record<ApplicationResult, string> = {
    accepted: "text-green-800",
    waitlisted: "text-orange-800",
    rejected: "text-red-800",
    pending: "text-slate-500",
  };

  return (
    <div className="bg-white/[0.55] backdrop-blur-xl border border-slate-200/50 rounded-3xl px-6 py-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-slate-900 tracking-tight">
          {academicYear} {gradeApplied} 面试情报
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-orange-50/60 text-orange-800 border border-orange-200/30">
          <span className="w-[5px] h-[5px] rounded-full bg-current opacity-70" />
          家长投稿
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-x-2 gap-y-3.5 mt-3.5">
        <div>
          <div className="text-label text-slate-400 uppercase mb-0.5">面试形式</div>
          <div className="text-[13px] font-medium text-slate-900">{INTERVIEW_TYPE_LABELS[interviewType]}</div>
        </div>
        <div>
          <div className="text-label text-slate-400 uppercase mb-0.5">面试语言</div>
          <div className="text-[13px] font-medium text-slate-900">{interviewLanguage ?? "暂无"}</div>
        </div>
        <div>
          <div className="text-label text-slate-400 uppercase mb-0.5">排队时间</div>
          <div className="text-[13px] font-medium text-slate-900">{queueTime ?? "暂无"}</div>
        </div>
        <div>
          <div className="text-label text-slate-400 uppercase mb-0.5">Offer 月份</div>
          <div className="text-[13px] font-medium text-slate-900">{offerMonth ?? "暂无"}</div>
        </div>
        <div>
          <div className="text-label text-slate-400 uppercase mb-0.5">二次面试</div>
          <div className="text-[13px] font-medium text-slate-900">
            {hasSecondInterview === null ? "暂无" : hasSecondInterview ? "是" : "否"}
          </div>
        </div>
        <div>
          <div className="text-label text-slate-400 uppercase mb-0.5">结果</div>
          <div className={`text-[13px] font-medium ${resultColors[applicationResult]}`}>
            {APPLICATION_RESULT_LABELS[applicationResult]}
          </div>
        </div>
      </div>

      {/* Notes */}
      {notes && (
        <p className="mt-3 text-small text-slate-600 leading-relaxed">{notes}</p>
      )}

      {/* Helpful */}
      {onHelpful && (
        <button
          onClick={onHelpful}
          className={`mt-3 flex items-center gap-1 text-xs transition-colors ${
            isVoted ? "text-slate-900 font-semibold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={isVoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          有帮助 {helpfulCount > 0 && `(${helpfulCount})`}
        </button>
      )}
    </div>
  );
}
