"use client";

import { useEffect, useState } from "react";
import {
  AdminCheckbox,
  AdminDrawer,
  AdminField,
  AdminFormGrid,
  AdminSelect,
  EmptyTableRow,
  formatAdminDate,
} from "@/components/admin/AdminWorkspace";

type Tab = "news" | "timeline";

const NEWS_EMPTY = {
  source: "hkschoolplace", source_category: "school", source_label: "HKSchoolPlace",
  title: "", summary: "", display_date: "", published_at: new Date().toISOString(),
  href: "/", is_external: false, content_type: "admission", content_type_label: "",
  is_visible: true, is_pinned: false, sort_order: 100,
};

const TIMELINE_EMPTY = {
  school_id: null, school_name: "", event_type: "open_day", event_label: "開放日",
  event_date: new Date().toISOString().slice(0, 10), event_time: "", href: "/",
  detail_href: "", source_label: "HKSchoolPlace", is_visible: true, is_pinned: false, notes: "",
};

type Item = Record<string, unknown>;

export function AdminContentClient() {
  const [tab, setTab] = useState<Tab>("news");
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch(`/api/admin/content?type=${tab}`);
    const json = await res.json();
    setItems(json.data ?? []);
  }

  useEffect(() => { void load(); }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  function clean(value: Item) {
    const payload = { ...value };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    delete payload.schools;
    if (tab === "news") {
      payload.published_at = String(payload.published_at || new Date().toISOString()).length <= 16
        ? new Date(String(payload.published_at)).toISOString()
        : payload.published_at;
    }
    if (tab === "timeline") {
      payload.school_id = payload.school_id || null;
      payload.event_time = payload.event_time || null;
      payload.detail_href = payload.detail_href || null;
      payload.notes = payload.notes || null;
    }
    return payload;
  }

  async function save() {
    if (!editing) return;
    const id = editing.id as string | undefined;
    const res = await fetch(id ? `/api/admin/content/${tab}/${id}` : `/api/admin/content?type=${tab}`, {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean(editing)),
    });
    const json = await res.json();
    if (res.ok) {
      setMessage("已保存內容");
      setEditing(null);
      await load();
    } else {
      setMessage(json.error?.message ?? "保存失敗");
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">消息和時間線</h1>
          <p className="mt-1 text-sm text-ink-500">管理首頁消息、置頂內容，以及可綁定學校的時間線事件。</p>
        </div>
        <button onClick={() => setEditing(tab === "news" ? { ...NEWS_EMPTY } : { ...TIMELINE_EMPTY })} className="rounded-button bg-ink-900 px-4 py-2 text-sm font-medium text-white">新增</button>
      </div>
      {message ? <div className="mb-4 rounded-button border border-surface-border bg-white px-4 py-3 text-sm text-ink-700">{message}</div> : null}

      <div className="mb-4 flex gap-2">
        <button onClick={() => setTab("news")} className={`rounded-button px-4 py-2 text-sm font-medium ${tab === "news" ? "bg-ink-900 text-white" : "border border-surface-border bg-white text-ink-700"}`}>消息資訊</button>
        <button onClick={() => setTab("timeline")} className={`rounded-button px-4 py-2 text-sm font-medium ${tab === "timeline" ? "bg-ink-900 text-white" : "border border-surface-border bg-white text-ink-700"}`}>時間線事件</button>
      </div>

      <div className="overflow-hidden rounded-card border border-surface-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-xs text-ink-500"><tr><th className="px-4 py-3">標題</th><th className="px-4 py-3">日期</th><th className="px-4 py-3">狀態</th><th className="px-4 py-3 text-right">操作</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={String(item.id)}>
                <td className="px-4 py-3 font-medium text-ink-900">{String(tab === "news" ? item.title : item.school_name)}<div className="text-xs text-ink-500">{String(tab === "news" ? item.summary ?? "" : item.event_label ?? "")}</div></td>
                <td className="px-4 py-3 text-ink-700">{String(tab === "news" ? item.published_at ?? "" : item.event_date ?? "").slice(0, 10)}</td>
                <td className="px-4 py-3">{item.is_pinned ? "置頂 · " : ""}{item.is_visible ? "顯示" : "隱藏"}</td>
                <td className="px-4 py-3 text-right"><button onClick={() => setEditing(item)} className="font-medium text-ink-900 underline">編輯</button></td>
              </tr>
            ))}
            {items.length === 0 ? <EmptyTableRow colSpan={4} message={tab === "news" ? "沒有消息內容" : "沒有時間線事件"} /> : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <AdminDrawer
          eyebrow={tab === "news" ? "消息資訊" : "時間線事件"}
          title={String(tab === "news" ? editing.title || "未命名消息" : editing.school_name || "未命名事件")}
          description={tab === "news" ? "消息會出現在內容流和首頁消息位，置頂會提高展示優先級。" : "時間線事件需要能回答：哪間學校、什麼事件、哪一天、去哪裡報名或查看。"}
          onClose={() => setEditing(null)}
          actions={
            <>
              <button onClick={() => setEditing(null)} className="rounded-chip border border-surface-border bg-white px-5 py-2 text-sm">取消</button>
              <button onClick={save} className="rounded-chip bg-ink-900 px-5 py-2 text-sm font-medium text-white">保存</button>
            </>
          }
        >
          {tab === "news" ? <NewsEditor value={editing} onChange={setEditing} /> : <TimelineEditor value={editing} onChange={setEditing} />}
        </AdminDrawer>
      ) : null}
    </div>
  );
}

function NewsEditor({ value, onChange }: { value: Item; onChange: (value: Item) => void }) {
  const set = (key: string, next: unknown) => onChange({ ...value, [key]: next });
  return <AdminFormGrid>
    <AdminField label="標題" value={String(value.title ?? "")} onChange={(v) => set("title", v)} />
    <AdminField label="來源" value={String(value.source_label ?? "")} onChange={(v) => set("source_label", v)} />
    <AdminField label="摘要" value={String(value.summary ?? "")} onChange={(v) => set("summary", v)} full />
    <AdminField label="連結" value={String(value.href ?? "")} onChange={(v) => set("href", v)} full />
    <AdminField label="發布時間" type="datetime-local" value={String(value.published_at ?? "").slice(0, 16)} onChange={(v) => set("published_at", v)} />
    <AdminField label="排序" type="number" value={String(value.sort_order ?? 100)} onChange={(v) => set("sort_order", Number(v))} />
    <AdminCheckbox label="顯示" checked={Boolean(value.is_visible)} onChange={(v) => set("is_visible", v)} />
    <AdminCheckbox label="置頂" checked={Boolean(value.is_pinned)} onChange={(v) => set("is_pinned", v)} />
  </AdminFormGrid>;
}

function TimelineEditor({ value, onChange }: { value: Item; onChange: (value: Item) => void }) {
  const set = (key: string, next: unknown) => onChange({ ...value, [key]: next });
  return <AdminFormGrid>
    <AdminField label="學校 ID（可留空）" value={String(value.school_id ?? "")} onChange={(v) => set("school_id", v)} />
    <AdminField label="學校名稱" value={String(value.school_name ?? "")} onChange={(v) => set("school_name", v)} />
    <AdminField label="事件標籤" value={String(value.event_label ?? "")} onChange={(v) => set("event_label", v)} />
    <AdminSelect label="事件類型" value={String(value.event_type ?? "open_day")} onChange={(v) => set("event_type", v)} options={[["open_day", "開放日"], ["briefing", "簡介會"], ["deadline", "申請截止"], ["interview", "面試"], ["trial", "體驗日"], ["talk", "講座"]]} />
    <AdminField label="日期" type="date" value={formatAdminDate(String(value.event_date ?? ""), "")} onChange={(v) => set("event_date", v)} />
    <AdminField label="連結" value={String(value.href ?? "")} onChange={(v) => set("href", v)} />
    <AdminCheckbox label="顯示" checked={Boolean(value.is_visible)} onChange={(v) => set("is_visible", v)} />
    <AdminCheckbox label="置頂" checked={Boolean(value.is_pinned)} onChange={(v) => set("is_pinned", v)} />
  </AdminFormGrid>;
}
