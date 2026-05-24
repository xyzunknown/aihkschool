"use client";

import { useEffect, useState } from "react";

interface ReminderRow {
  id: string;
  reminder_status?: string;
  status?: string;
  scheduled_date?: string;
  scheduled_at?: string;
  sent_at: string | null;
  retry_count: number | null;
  users?: { email: string; notification_email: string | null } | null;
  user?: { email: string; notification_email: string | null } | null;
  schools?: { id: string; name_tc: string; website: string | null } | null;
  programme_subscriptions?: {
    lcsd_programmes?: { id: string; name_zh: string | null; name_en: string | null; venue: string | null } | null;
  } | null;
}

export function AdminRemindersClient() {
  const [type, setType] = useState("school");
  const [status, setStatus] = useState("failed");
  const [rows, setRows] = useState<ReminderRow[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch(`/api/admin/reminders?type=${type}&status=${status}`);
    const json = await res.json();
    setRows(json.data ?? []);
  }

  useEffect(() => { void load(); }, [type, status]); // eslint-disable-line react-hooks/exhaustive-deps

  async function act(id: string, action: "resend" | "cancel") {
    const res = await fetch(`/api/admin/reminders/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const json = await res.json();
    setMessage(res.ok ? "操作已完成" : json.error?.message ?? "操作失敗");
    await load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">提醒狀態</h1>
          <p className="mt-1 text-sm text-ink-500">查看學校申請提醒和康體通開報提醒，並處理失敗項。</p>
        </div>
        <button onClick={load} className="rounded-button bg-ink-900 px-4 py-2 text-sm font-medium text-white">刷新</button>
      </div>
      {message ? <div className="mb-4 rounded-button border border-surface-border bg-white px-4 py-3 text-sm text-ink-700">{message}</div> : null}

      <div className="mb-4 grid gap-3 rounded-card border border-surface-border bg-white p-4 md:grid-cols-3">
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-button border border-surface-border px-3 py-2 text-sm">
          <option value="school">學校提醒</option>
          <option value="programme">康體通提醒</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-button border border-surface-border px-3 py-2 text-sm">
          <option value="failed">失敗</option>
          <option value="pending">待發送</option>
          <option value="sent">已發送</option>
          {type === "school" ? <option value="cancelled">已取消</option> : null}
        </select>
      </div>

      <div className="overflow-hidden rounded-card border border-surface-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-xs text-ink-500">
            <tr><th className="px-4 py-3">對象</th><th className="px-4 py-3">用戶</th><th className="px-4 py-3">時間</th><th className="px-4 py-3">狀態</th><th className="px-4 py-3">失敗次數</th><th className="px-4 py-3 text-right">操作</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3 font-medium text-ink-900">{nameFor(row)}</td>
                <td className="px-4 py-3 text-ink-700">{row.users?.email ?? row.user?.email ?? "-"}</td>
                <td className="px-4 py-3 text-ink-700">{row.scheduled_date ?? row.scheduled_at ?? "-"}</td>
                <td className="px-4 py-3">{row.reminder_status ?? row.status}</td>
                <td className="px-4 py-3">{row.retry_count ?? 0}</td>
                <td className="px-4 py-3 text-right">
                  {(row.reminder_status ?? row.status) === "failed" ? <button onClick={() => act(row.id, "resend")} className="mr-4 font-medium text-ink-900 underline">重發</button> : null}
                  {(row.reminder_status ?? row.status) === "pending" ? <button onClick={() => act(row.id, "cancel")} className="font-medium text-red-600 underline">取消</button> : null}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-ink-500">沒有相關提醒</td></tr> : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function nameFor(row: ReminderRow) {
  if (row.schools?.name_tc) return row.schools.name_tc;
  const programme = row.programme_subscriptions?.lcsd_programmes;
  return programme?.name_zh || programme?.name_en || "-";
}
