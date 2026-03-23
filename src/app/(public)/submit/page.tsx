"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { NOTES_MAX_LENGTH } from "@/lib/utils";

const ACADEMIC_YEARS = ["2025/26", "2024/25", "2023/24"];
const GRADES = ["N", "K1", "K2", "K3"];

export default function SubmitPage() {
  const { requireAuth } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState({
    school_id: "",
    schoolSearch: "",
    academic_year: ACADEMIC_YEARS[0],
    grade_applied: "K1",
    interview_type: "parent_child",
    interview_language: "",
    queue_time: "",
    has_second_interview: false,
    offer_month: "",
    application_result: "pending",
    fee_registration_hkd: "",
    fee_interview_hkd: "",
    notes: "",
  });

  const [schoolResults, setSchoolResults] = useState<Array<{ id: string; name_tc: string; district: string }>>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const searchSchools = async (query: string) => {
    setForm({ ...form, schoolSearch: query });
    if (query.length < 2) {
      setSchoolResults([]);
      return;
    }
    try {
      const res = await fetch(`/api/schools?search=${encodeURIComponent(query)}&limit=10`);
      const json = await res.json();
      setSchoolResults(json.data ?? []);
    } catch {
      setSchoolResults([]);
    }
  };

  const selectSchool = (school: { id: string; name_tc: string }) => {
    setForm({ ...form, school_id: school.id, schoolSearch: school.name_tc });
    setSelectedSchool(school.name_tc);
    setSchoolResults([]);
  };

  const handleSubmit = () => {
    requireAuth(async () => {
      if (!form.school_id) {
        showToast({ message: "请先选择学校" });
        return;
      }

      setSubmitting(true);
      try {
        const body = {
          school_id: form.school_id,
          academic_year: form.academic_year,
          grade_applied: form.grade_applied,
          interview_type: form.interview_type,
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const json = await res.json();

        if (json.error) {
          showToast({ message: json.error.message });
        } else {
          setSubmitted(true);
        }
      } catch {
        showToast({ message: "提交失败，请稍后重试" });
      } finally {
        setSubmitting(false);
      }
    });
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center">
        <div className="text-display mb-4">🎉</div>
        <h1 className="text-h1 text-slate-950 mb-3">感谢您的投稿！</h1>
        <p className="text-body text-slate-500 mb-8">
          您提交的面试情报已收到，审核通过后将展示在学校详情页面。
          确认邮件已发送到您的邮箱。
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={() => router.push("/kg")}>
            浏览学校
          </Button>
          <Button variant="secondary" onClick={() => { setSubmitted(false); setForm({ ...form, school_id: "", schoolSearch: "", notes: "" }); }}>
            继续投稿
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-8">
      <h1 className="text-h1 text-slate-950 mb-2">分享面试经验</h1>
      <p className="text-body text-slate-500 mb-8">
        您的经验可以帮助其他家长了解面试情况。投稿经审核后展示。
      </p>

      <div className="space-y-6">
        {/* School search */}
        <div>
          <label className="text-label text-slate-400 uppercase block mb-2">学校 *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="输入学校名称搜索…"
              value={form.schoolSearch}
              onChange={(e) => searchSchools(e.target.value)}
              className="w-full bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400"
            />
            {selectedSchool && (
              <span className="text-small text-green-700 mt-1 block">已选择: {selectedSchool}</span>
            )}
            {schoolResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-200/50 overflow-hidden z-10">
                {schoolResults.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => selectSchool(s)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm text-slate-900 border-b border-slate-100 last:border-b-0"
                  >
                    {s.name_tc}
                    <span className="text-slate-400 ml-2">{s.district}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Year & Grade */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-label text-slate-400 uppercase block mb-2">学年 *</label>
            <select
              value={form.academic_year}
              onChange={(e) => setForm({ ...form, academic_year: e.target.value })}
              className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 outline-none"
            >
              {ACADEMIC_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-label text-slate-400 uppercase block mb-2">年级 *</label>
            <select
              value={form.grade_applied}
              onChange={(e) => setForm({ ...form, grade_applied: e.target.value })}
              className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 outline-none"
            >
              {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* Interview type */}
        <div>
          <label className="text-label text-slate-400 uppercase block mb-2">面试形式 *</label>
          <select
            value={form.interview_type}
            onChange={(e) => setForm({ ...form, interview_type: e.target.value })}
            className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 outline-none"
          >
            <option value="parent_child">亲子面试</option>
            <option value="child_only">幼儿面试</option>
            <option value="none">无面试</option>
            <option value="unknown">未知</option>
          </select>
        </div>

        {/* Interview language & queue time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-label text-slate-400 uppercase block mb-2">面试语言</label>
            <input
              type="text"
              placeholder="如：粤语"
              value={form.interview_language}
              onChange={(e) => setForm({ ...form, interview_language: e.target.value })}
              className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
          <div>
            <label className="text-label text-slate-400 uppercase block mb-2">排队时间</label>
            <input
              type="text"
              placeholder="如：1-2h"
              value={form.queue_time}
              onChange={(e) => setForm({ ...form, queue_time: e.target.value })}
              className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Second interview & result */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-label text-slate-400 uppercase block mb-2">二次面试</label>
            <select
              value={form.has_second_interview ? "true" : "false"}
              onChange={(e) => setForm({ ...form, has_second_interview: e.target.value === "true" })}
              className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 outline-none"
            >
              <option value="false">否</option>
              <option value="true">是</option>
            </select>
          </div>
          <div>
            <label className="text-label text-slate-400 uppercase block mb-2">申请结果 *</label>
            <select
              value={form.application_result}
              onChange={(e) => setForm({ ...form, application_result: e.target.value })}
              className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 outline-none"
            >
              <option value="accepted">录取</option>
              <option value="waitlisted">候补</option>
              <option value="rejected">未录取</option>
              <option value="pending">等待中</option>
            </select>
          </div>
        </div>

        {/* Offer month */}
        <div>
          <label className="text-label text-slate-400 uppercase block mb-2">Offer 月份</label>
          <input
            type="text"
            placeholder="如：11月下"
            value={form.offer_month}
            onChange={(e) => setForm({ ...form, offer_month: e.target.value })}
            className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 placeholder:text-slate-400 outline-none"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-label text-slate-400 uppercase block mb-2">
            备注 ({form.notes.length}/{NOTES_MAX_LENGTH})
          </label>
          <textarea
            placeholder="分享更多细节…"
            value={form.notes}
            onChange={(e) => {
              if (e.target.value.length <= NOTES_MAX_LENGTH) {
                setForm({ ...form, notes: e.target.value });
              }
            }}
            rows={3}
            className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-body text-slate-900 placeholder:text-slate-400 outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleSubmit}
          disabled={submitting || !form.school_id}
        >
          {submitting ? "提交中…" : "提交投稿"}
        </Button>

        <p className="text-small text-slate-400 text-center">
          投稿经审核后展示，通常 24 小时内完成审核。
        </p>
      </div>
    </div>
  );
}
