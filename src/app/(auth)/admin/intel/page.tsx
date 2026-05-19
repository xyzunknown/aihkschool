"use client";

import { useEffect, useState } from "react";
import {
  AdminDrawer,
  AdminField,
  AdminInfoGrid,
  AdminInfoItem,
  AdminSection,
  AdminStatusPill,
  EmptyTableRow,
  formatAdminMoney,
} from "@/components/admin/AdminWorkspace";

interface IntelItem {
  id: string;
  academic_year: string;
  grade_applied: string;
  interview_type: string;
  interview_language: string | null;
  queue_time: string | null;
  has_second_interview: boolean | null;
  offer_month: string | null;
  application_result: string;
  fee_registration_hkd: number | null;
  fee_interview_hkd: number | null;
  notes: string | null;
  status: string;
  rejection_reason: string | null;
  is_hidden: boolean;
  created_at: string;
  schools: { name_tc: string; district: string } | null;
  users: { email: string } | null;
}

export default function AdminIntelPage() {
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<IntelItem[]>([]);
  const [selected, setSelected] = useState<IntelItem | null>(null);
  const [reason, setReason] = useState("");

  async function load() {
    const params = new URLSearchParams({ status, limit: "50" });
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/intel?${params.toString()}`);
    const json = await res.json();
    setItems(json.data ?? []);
  }

  useEffect(() => { void load(); }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  async function update(id: string, payload: Record<string, unknown>) {
    await fetch(`/api/admin/intel/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSelected(null);
    setReason("");
    await load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">面試情報審核</h1>
          <p className="mt-1 text-sm text-slate-500">審核、拒絕、隱藏和查找家長投稿。</p>
        </div>
        <button onClick={load} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">刷新</button>
      </div>

      <div className="mb-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
          <option value="pending">待審核</option>
          <option value="approved">已通過</option>
          <option value="rejected">已拒絕</option>
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜尋學校" className="rounded-xl border border-slate-200 px-3 py-2 text-sm md:col-span-2" />
        <button onClick={load} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium">搜尋</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr><th className="px-4 py-3">學校</th><th className="px-4 py-3">年級</th><th className="px-4 py-3">結果</th><th className="px-4 py-3">投稿人</th><th className="px-4 py-3">狀態</th><th className="px-4 py-3 text-right">操作</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium text-slate-950">{item.schools?.name_tc ?? "未知學校"}</td>
                <td className="px-4 py-3">{item.academic_year} · {item.grade_applied}</td>
                <td className="px-4 py-3">{item.application_result}</td>
                <td className="px-4 py-3 text-slate-600">{item.users?.email ?? "-"}</td>
                <td className="px-4 py-3"><AdminStatusPill tone={item.is_hidden ? "neutral" : item.status === "approved" ? "good" : item.status === "rejected" ? "danger" : "warn"}>{item.is_hidden ? "已隱藏" : statusLabel(item.status)}</AdminStatusPill></td>
                <td className="px-4 py-3 text-right"><button onClick={() => setSelected(item)} className="font-medium text-slate-950 underline">查看</button></td>
              </tr>
            ))}
            {items.length === 0 ? <EmptyTableRow colSpan={6} message="沒有符合條件的投稿" /> : null}
          </tbody>
        </table>
      </div>

      {selected ? (
        <AdminDrawer
          eyebrow="面試情報審核"
          title={selected.schools?.name_tc ?? "未知學校"}
          description="通過後會進入前台情報內容；拒絕時請填原因，方便日後追溯。"
          onClose={() => setSelected(null)}
          actions={
            <>
              {selected.status === "approved" ? (
                <button onClick={() => update(selected.id, { is_hidden: !selected.is_hidden })} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm">{selected.is_hidden ? "取消隱藏" : "隱藏"}</button>
              ) : null}
              <button onClick={() => update(selected.id, { status: "rejected", rejectionReason: reason })} className="rounded-lg border border-red-200 bg-white px-5 py-2 text-sm text-red-700">拒絕</button>
              <button onClick={() => update(selected.id, { status: "approved", is_hidden: false })} className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-medium text-white">通過</button>
            </>
          }
        >
          <AdminSection title="投稿內容">
            <AdminInfoGrid>
              <AdminInfoItem label="投稿人" value={selected.users?.email ?? "未填寫"} />
              <AdminInfoItem label="學校地區" value={selected.schools?.district ?? "未填寫"} />
              <AdminInfoItem label="學年" value={selected.academic_year} />
              <AdminInfoItem label="年級" value={selected.grade_applied} />
              <AdminInfoItem label="面試形式" value={selected.interview_type} />
              <AdminInfoItem label="面試語言" value={selected.interview_language ?? "未填寫"} />
              <AdminInfoItem label="輪候時間" value={selected.queue_time ?? "未填寫"} />
              <AdminInfoItem label="結果" value={selected.application_result} />
              <AdminInfoItem label="註冊費" value={formatAdminMoney(selected.fee_registration_hkd)} />
              <AdminInfoItem label="面試費" value={formatAdminMoney(selected.fee_interview_hkd)} />
            </AdminInfoGrid>
            <div className="mt-4 whitespace-pre-line rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">{selected.notes || "沒有備註"}</div>
          </AdminSection>
          <AdminSection title="審核處理" description="拒絕原因只在後台保留，用於日後查詢。">
            <AdminField label="拒絕原因" value={reason} onChange={setReason} full />
          </AdminSection>
        </AdminDrawer>
      ) : null}
    </div>
  );
}

function statusLabel(status: string) {
  if (status === "approved") return "已通過";
  if (status === "rejected") return "已拒絕";
  if (status === "pending") return "待審核";
  return status;
}
