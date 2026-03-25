"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SchoolSearchInput } from "@/components/schools/SchoolSearchInput";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { NOTES_MAX_LENGTH } from "@/lib/utils";

const ACADEMIC_YEARS = ["2025/26", "2024/25", "2023/24"];
const GRADES = ["N", "K1", "K2", "K3"];

interface IntelSubmitFormProps { onSuccess: () => void; }

export function IntelSubmitForm({ onSuccess }: IntelSubmitFormProps) {
  const { requireAuth } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    school_id: "", academic_year: ACADEMIC_YEARS[0], grade_applied: "K1",
    interview_type: "parent_child", interview_language: "", queue_time: "",
    has_second_interview: false, offer_month: "", application_result: "pending",
    fee_registration_hkd: "", fee_interview_hkd: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const cls = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400";
  const lbl = "text-xs font-medium text-slate-500 uppercase tracking-wide block mb-2";

  const handleSubmit = () => {
    requireAuth(async () => {
      if (!form.school_id) { showToast({ message: "請先選擇學校" }); return; }
      setSubmitting(true);
      try {
        const body = {
          school_id: form.school_id, academic_year: form.academic_year,
          grade_applied: form.grade_applied, interview_type: form.interview_type,
          interview_language: form.interview_language || undefined,
          queue_time: form.queue_time || undefined,
          has_second_interview: form.has_second_interview,
          offer_month: form.offer_month || undefined,
          application_result: form.application_result,
          fee_registration_hkd: form.fee_registration_hkd ? Number(form.fee_registration_hkd) : undefined,
          fee_interview_hkd: form.fee_interview_hkd ? Number(form.fee_interview_hkd) : undefined,
          notes: form.notes || undefined,
        };
        const res = await fetch("/api/intel", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.error) { showToast({ message: json.error.message }); }
        else { onSuccess(); }
      } catch { showToast({ message: "提交失敗，請稍後再試" }); }
      finally { setSubmitting(false); }
    });
  };

  return (
    <div className="space-y-6">
      <SchoolSearchInput
        onSelect={(s) => update("school_id", s.id)}
        inputClassName={cls} labelClassName={lbl}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>學年 *</label>
          <select value={form.academic_year} onChange={(e) => update("academic_year", e.target.value)} className={cls}>
            {ACADEMIC_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl}>年級 *</label>
          <select value={form.grade_applied} onChange={(e) => update("grade_applied", e.target.value)} className={cls}>
            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={lbl}>面試形式 *</label>
        <select value={form.interview_type} onChange={(e) => update("interview_type", e.target.value)} className={cls}>
          <option value="parent_child">親子面試</option>
          <option value="child_only">幼兒面試</option>
          <option value="none">無面試</option>
          <option value="unknown">未知</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>面試語言</label>
          <input type="text" placeholder="如：粵語" value={form.interview_language}
            onChange={(e) => update("interview_language", e.target.value)} className={cls} />
        </div>
        <div>
          <label className={lbl}>排隊時間</label>
          <input type="text" placeholder="如：1-2小時" value={form.queue_time}
            onChange={(e) => update("queue_time", e.target.value)} className={cls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>二次面試</label>
          <select value={form.has_second_interview ? "true" : "false"}
            onChange={(e) => update("has_second_interview", e.target.value === "true")} className={cls}>
            <option value="false">否</option><option value="true">是</option>
          </select>
        </div>
        <div>
          <label className={lbl}>申請結果 *</label>
          <select value={form.application_result} onChange={(e) => update("application_result", e.target.value)} className={cls}>
            <option value="accepted">錄取</option><option value="waitlisted">候補</option>
            <option value="rejected">未錄取</option><option value="pending">等待中</option>
          </select>
        </div>
      </div>
      <div>
        <label className={lbl}>Offer 月份</label>
        <input type="text" placeholder="如：11月下旬" value={form.offer_month}
          onChange={(e) => update("offer_month", e.target.value)} className={cls} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>報名費 (HKD)</label>
          <input type="number" placeholder="如：40" value={form.fee_registration_hkd}
            onChange={(e) => update("fee_registration_hkd", e.target.value)} className={cls} min="0" />
        </div>
        <div>
          <label className={lbl}>面試費 (HKD)</label>
          <input type="number" placeholder="如：0" value={form.fee_interview_hkd}
            onChange={(e) => update("fee_interview_hkd", e.target.value)} className={cls} min="0" />
        </div>
      </div>
      <div>
        <label className={lbl}>備註 ({form.notes.length}/{NOTES_MAX_LENGTH})</label>
        <textarea placeholder="分享更多細節…" value={form.notes}
          onChange={(e) => { if (e.target.value.length <= NOTES_MAX_LENGTH) update("notes", e.target.value); }}
          rows={3} className={`${cls} resize-none`} />
      </div>
      <Button variant="primary" className="w-full" onClick={handleSubmit} disabled={submitting || !form.school_id}>
        {submitting ? "提交中…" : "提交心得"}
      </Button>
      <p className="text-sm text-slate-500 text-center">
        心得經審核後展示，通常 24 小時內完成審核。
      </p>
    </div>
  );
}
