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
    <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-base font-semibold text-slate-950">
          {academicYear} {gradeApplied} 面試心得
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
          家長提交
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-4 mb-4">
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">面試形式</div>
          <div className="text-sm font-medium text-slate-900">{INTERVIEW_TYPE_LABELS[interviewType]}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">面試語言</div>
          <div className="text-sm font-medium text-slate-900">{interviewLanguage ?? "暫無"}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">排隊時間</div>
          <div className="text-sm font-medium text-slate-900">{queueTime ?? "暫無"}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Offer 月份</div>
          <div className="text-sm font-medium text-slate-900">{offerMonth ?? "暫無"}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">二次面試</div>
          <div className="text-sm font-medium text-slate-900">
            {hasSecondInterview === null ? "暫無" : hasSecondInterview ? "是" : "否"}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">結果</div>
          <div className={`text-sm font-medium ${resultColors[applicationResult]}`}>
            {APPLICATION_RESULT_LABELS[applicationResult]}
          </div>
        </div>
      </div>

      {/* Notes */}
      {notes && (
        <p className="mb-4 text-sm text-slate-600 leading-relaxed">{notes}</p>
      )}

      {/* Helpful */}
      {onHelpful && (
        <button
          onClick={onHelpful}
          className={`flex items-center gap-1 text-xs transition-colors ${
            isVoted ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={isVoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          有幫助 {helpfulCount > 0 && `(${helpfulCount})`}
        </button>
      )}
    </div>
  );
}
