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
  formatAdminDate,
} from "@/components/admin/AdminWorkspace";

interface UserRow {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
  admin_disabled: boolean;
  admin_disabled_reason: string | null;
  favorite_count: number;
  subscription_count: number;
}

type Detail = Record<string, unknown>;

export function AdminUsersClient() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<UserRow[]>([]);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [reason, setReason] = useState("");

  async function loadRows() {
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    const res = await fetch(`/api/admin/users${params}`);
    const json = await res.json();
    setRows(json.data ?? []);
  }

  async function openDetail(id: string) {
    const res = await fetch(`/api/admin/users?id=${id}`);
    const json = await res.json();
    setDetail(json.data ?? null);
  }

  async function toggleUser(user: UserRow) {
    await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_disabled: !user.admin_disabled, admin_disabled_reason: reason || null }),
    });
    setReason("");
    setDetail(null);
    await loadRows();
  }

  useEffect(() => { void loadRows(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedUser = detail?.user as UserRow | undefined;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">用戶管理</h1>
        <p className="mt-1 text-sm text-ink-500">查看用戶收藏、課程追蹤、提醒記錄，並可停用異常用戶。</p>
      </div>
      <div className="mb-4 flex gap-3 rounded-card border border-surface-border bg-white p-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜尋 email / 名稱" className="min-w-0 flex-1 rounded-button border border-surface-border px-3 py-2 text-sm" />
        <button onClick={loadRows} className="rounded-button border border-surface-border px-4 py-2 text-sm font-medium">搜尋</button>
      </div>

      <div className="overflow-hidden rounded-card border border-surface-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-xs text-ink-500"><tr><th className="px-4 py-3">用戶</th><th className="px-4 py-3">收藏</th><th className="px-4 py-3">課程追蹤</th><th className="px-4 py-3">狀態</th><th className="px-4 py-3 text-right">操作</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3 font-medium text-ink-900">{row.email}<div className="text-xs text-ink-500">{row.display_name ?? "-"} · {row.created_at.slice(0, 10)}</div></td>
                <td className="px-4 py-3">{row.favorite_count}</td>
                <td className="px-4 py-3">{row.subscription_count}</td>
                <td className="px-4 py-3"><AdminStatusPill tone={row.admin_disabled ? "danger" : "good"}>{row.admin_disabled ? "已停用" : "正常"}</AdminStatusPill></td>
                <td className="px-4 py-3 text-right"><button onClick={() => openDetail(row.id)} className="font-medium text-ink-900 underline">查看</button></td>
              </tr>
            ))}
            {rows.length === 0 ? <EmptyTableRow colSpan={5} message="沒有符合條件的用戶" /> : null}
          </tbody>
        </table>
      </div>

      {detail && selectedUser ? (
        <AdminDrawer
          eyebrow="用戶資料"
          title={selectedUser.email}
          description={selectedUser.admin_disabled ? `目前已停用：${selectedUser.admin_disabled_reason ?? "未填寫原因"}` : "目前帳戶正常，可查看收藏、追蹤和提醒記錄。"}
          onClose={() => setDetail(null)}
          actions={<button onClick={() => toggleUser(selectedUser)} className="rounded-chip bg-ink-900 px-5 py-2 text-sm font-medium text-white">{selectedUser.admin_disabled ? "恢復用戶" : "停用用戶"}</button>}
        >
          <AdminSection title="帳戶摘要">
            <AdminInfoGrid>
              <AdminInfoItem label="顯示名稱" value={selectedUser.display_name ?? "未填寫"} />
              <AdminInfoItem label="建立日期" value={formatAdminDate(selectedUser.created_at)} />
              <AdminInfoItem label="收藏數" value={String(selectedUser.favorite_count)} />
              <AdminInfoItem label="課程追蹤數" value={String(selectedUser.subscription_count)} />
            </AdminInfoGrid>
          </AdminSection>
          <AdminSection title="用戶行為">
            <div className="grid gap-4 md:grid-cols-3">
              <Panel title="收藏學校" rows={detail.favorites as unknown[]} labelKey="schools" />
              <Panel title="追蹤課程" rows={detail.subscriptions as unknown[]} labelKey="lcsd_programmes" />
              <Panel title="學校提醒" rows={detail.reminders as unknown[]} labelKey="schools" />
            </div>
          </AdminSection>
          <AdminSection title="帳戶處理" description="停用前請填寫可追溯原因；恢復用戶時原因會清空。">
            <AdminField label="停用原因" value={reason} onChange={setReason} full />
          </AdminSection>
        </AdminDrawer>
      ) : null}
    </div>
  );
}

function Panel({ title, rows, labelKey }: { title: string; rows: unknown[]; labelKey: string }) {
  return <section className="rounded-chip border border-surface-border"><h3 className="border-b border-surface-border px-4 py-3 text-sm font-semibold text-ink-900">{title}</h3><div className="max-h-80 divide-y divide-slate-100 overflow-auto">{rows.length ? rows.map((raw, index) => {
    const row = raw as Record<string, unknown>;
    const nested = Array.isArray(row[labelKey]) ? (row[labelKey] as unknown[])[0] : row[labelKey];
    const obj = nested && typeof nested === "object" ? nested as Record<string, unknown> : {};
    const label = String(obj.name_tc ?? obj.name_zh ?? row.reminder_status ?? row.status ?? row.created_at ?? "-");
    return <div key={index} className="px-4 py-3 text-sm text-ink-700">{label}</div>;
  }) : <div className="px-4 py-8 text-center text-sm text-ink-500">沒有記錄</div>}</div></section>;
}
