"use client";

import { useEffect, useState } from "react";
import {
  AdminCheckbox,
  AdminDrawer,
  AdminField,
  AdminFormGrid,
  AdminPublishChannels,
  EmptyTableRow,
} from "@/components/admin/AdminWorkspace";

type Tab = "banners" | "featured" | "news";

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "banners", label: "Banner" },
  { key: "featured", label: "推薦學校" },
  { key: "news", label: "消息" },
];

const EMPTY: Record<Tab, Record<string, unknown>> = {
  banners: {
    layout: "classic", source_label: "HKSchoolPlace", title_tc: "", subtitle_en: "", tags: [],
    cta_primary_label: "查看詳情", cta_primary_url: "/", cta_secondary_label: "", cta_secondary_url: "",
    footer_note: "", image_src: "/brand/Web Logo/Logo.png", image_alt: "", is_visible: true, publish_channels: ["web", "ios", "android"], sort_order: 100,
  },
  featured: { school_id: null, custom_title: "", custom_name_en: "", custom_tags: [], is_visible: true, publish_channels: ["web", "ios", "android"], sort_order: 100 },
  news: {
    source: "hkschoolplace", source_category: "school", source_label: "HKSchoolPlace", title: "", summary: "",
    display_date: "", published_at: new Date().toISOString(), href: "/", is_external: false,
    content_type: "admission", content_type_label: "", is_visible: true, publish_channels: ["web", "ios", "android"], sort_order: 100,
  },
};

export function AdminHomepageClient() {
  const [tab, setTab] = useState<Tab>("banners");
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await fetch(`/api/admin/homepage?type=${tab}`);
    const json = await res.json();
    if (res.ok) {
      setItems(json.data ?? []);
    } else {
      setMessage(json.error?.message ?? "載入失敗");
    }
  }

  useEffect(() => { void load(); }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  async function save() {
    if (!editing) return;
    const id = editing.id as string | undefined;
    const method = id ? "PATCH" : "POST";
    const url = id ? `/api/admin/homepage/${tab}/${id}` : `/api/admin/homepage?type=${tab}`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanPayload(tab, editing)),
    });
    if (res.ok) {
      setMessage("已保存首頁內容");
      setEditing(null);
      await load();
    } else {
      const json = await res.json();
      setMessage(json.error?.message ?? "保存失敗");
    }
  }

  async function remove(id: string) {
    const res = await fetch(`/api/admin/homepage/${tab}/${id}`, { method: "DELETE" });
    const json = await res.json().catch(() => ({}));
    setMessage(res.ok ? "已刪除首頁內容" : json.error?.message ?? "刪除失敗");
    if (res.ok) await load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">首頁內容</h1>
          <p className="mt-1 text-sm text-slate-500">管理首頁 Banner、推薦學校和消息。沒有後台資料時，前台會保留原本內容。</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY[tab] })} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">新增</button>
      </div>

      <div className="mb-4 flex gap-2">
        {TABS.map((item) => (
          <button key={item.key} onClick={() => setTab(item.key)} className={`rounded-xl px-4 py-2 text-sm font-medium ${tab === item.key ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
            {item.label}
          </button>
        ))}
      </div>
      {message ? <div className="mb-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{message}</div> : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr><th className="px-4 py-3">標題</th><th className="px-4 py-3">狀態</th><th className="px-4 py-3">排序</th><th className="px-4 py-3 text-right">操作</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={String(item.id)}>
                <td className="px-4 py-3 font-medium text-slate-950">{titleFor(tab, item)}</td>
                <td className="px-4 py-3">{item.is_visible ? "顯示" : "隱藏"}</td>
                <td className="px-4 py-3">{String(item.sort_order ?? "")}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(item)} className="mr-4 font-medium text-slate-950 underline">編輯</button>
                  <button onClick={() => remove(String(item.id))} className="font-medium text-red-600 underline">刪除</button>
                </td>
              </tr>
            ))}
            {items.length === 0 ? <EmptyTableRow colSpan={4} message={`沒有${TABS.find((item) => item.key === tab)?.label ?? "首頁"}內容`} /> : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <AdminDrawer
          eyebrow={TABS.find((item) => item.key === tab)?.label}
          title={titleFor(tab, editing) || "未命名首頁內容"}
          description="首頁內容會直接影響第一屏和推薦位，請確保標題、連結和排序都有明確用途。"
          onClose={() => setEditing(null)}
          actions={
            <>
              <button onClick={() => setEditing(null)} className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm">取消</button>
              <button onClick={save} className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-medium text-white">保存</button>
            </>
          }
        >
          <Editor tab={tab} value={editing} onChange={setEditing} />
        </AdminDrawer>
      ) : null}
    </div>
  );
}

function titleFor(tab: Tab, item: Record<string, unknown>) {
  if (tab === "banners") return String(item.title_tc ?? "");
  if (tab === "featured") return String(item.custom_title || (item.schools as { name_tc?: string } | undefined)?.name_tc || item.school_id || "");
  return String(item.title ?? "");
}

function cleanPayload(tab: Tab, value: Record<string, unknown>) {
  const payload = { ...value };
  delete payload.id;
  delete payload.created_at;
  delete payload.updated_at;
  delete payload.schools;
  if (tab === "banners") {
    payload.tags = String(payload.tagsText ?? "").split(",").map((x) => x.trim()).filter(Boolean);
    delete payload.tagsText;
  }
  if (tab === "featured") {
    payload.custom_tags = String(payload.tagsText ?? "").split(",").map((x) => x.trim()).filter(Boolean);
    payload.school_id = payload.school_id || null;
    delete payload.tagsText;
  }
  if (!Array.isArray(payload.publish_channels) || payload.publish_channels.length === 0) {
    payload.publish_channels = ["web", "ios", "android"];
  }
  return payload;
}

function Editor({ tab, value, onChange }: { tab: Tab; value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void }) {
  const set = (key: string, next: unknown) => onChange({ ...value, [key]: next });
  const tagsText = Array.isArray(value.tags) ? value.tags.join(",") : Array.isArray(value.custom_tags) ? value.custom_tags.join(",") : String(value.tagsText ?? "");

  if (tab === "featured") {
    return (
      <AdminFormGrid>
        <AdminField label="學校 ID" value={String(value.school_id ?? "")} onChange={(v) => set("school_id", v)} />
        <AdminField label="自定標題" value={String(value.custom_title ?? "")} onChange={(v) => set("custom_title", v)} />
        <AdminField label="英文名" value={String(value.custom_name_en ?? "")} onChange={(v) => set("custom_name_en", v)} />
        <AdminField label="標籤（逗號分隔）" value={tagsText} onChange={(v) => set("tagsText", v)} />
        <AdminField label="排序" type="number" value={String(value.sort_order ?? 100)} onChange={(v) => set("sort_order", Number(v))} />
        <AdminCheckbox label="顯示" checked={Boolean(value.is_visible)} onChange={(v) => set("is_visible", v)} />
        <AdminPublishChannels value={value.publish_channels as string[] | null | undefined} onChange={(v) => set("publish_channels", v)} />
      </AdminFormGrid>
    );
  }

  if (tab === "news") {
    return (
      <AdminFormGrid>
        <AdminField label="標題" value={String(value.title ?? "")} onChange={(v) => set("title", v)} />
        <AdminField label="來源" value={String(value.source_label ?? "")} onChange={(v) => set("source_label", v)} />
        <AdminField label="摘要" value={String(value.summary ?? "")} onChange={(v) => set("summary", v)} full />
        <AdminField label="日期顯示" value={String(value.display_date ?? "")} onChange={(v) => set("display_date", v)} />
        <AdminField label="發布時間" type="datetime-local" value={String(value.published_at ?? "").slice(0, 16)} onChange={(v) => set("published_at", v ? new Date(v).toISOString() : "")} />
        <AdminField label="連結" value={String(value.href ?? "")} onChange={(v) => set("href", v)} full />
        <AdminField label="分類標籤" value={String(value.content_type_label ?? "")} onChange={(v) => set("content_type_label", v)} />
        <AdminField label="排序" type="number" value={String(value.sort_order ?? 100)} onChange={(v) => set("sort_order", Number(v))} />
        <AdminCheckbox label="外部連結" checked={Boolean(value.is_external)} onChange={(v) => set("is_external", v)} />
        <AdminCheckbox label="顯示" checked={Boolean(value.is_visible)} onChange={(v) => set("is_visible", v)} />
        <AdminPublishChannels value={value.publish_channels as string[] | null | undefined} onChange={(v) => set("publish_channels", v)} />
      </AdminFormGrid>
    );
  }

  return (
    <AdminFormGrid>
      <AdminField label="標題" value={String(value.title_tc ?? "")} onChange={(v) => set("title_tc", v)} />
      <AdminField label="副標題" value={String(value.subtitle_en ?? "")} onChange={(v) => set("subtitle_en", v)} />
      <AdminField label="來源標籤" value={String(value.source_label ?? "")} onChange={(v) => set("source_label", v)} />
      <AdminField label="標籤（逗號分隔）" value={tagsText} onChange={(v) => set("tagsText", v)} />
      <AdminField label="主按鈕文字" value={String(value.cta_primary_label ?? "")} onChange={(v) => set("cta_primary_label", v)} />
      <AdminField label="主按鈕連結" value={String(value.cta_primary_url ?? "")} onChange={(v) => set("cta_primary_url", v)} />
      <AdminField label="次按鈕文字" value={String(value.cta_secondary_label ?? "")} onChange={(v) => set("cta_secondary_label", v)} />
      <AdminField label="次按鈕連結" value={String(value.cta_secondary_url ?? "")} onChange={(v) => set("cta_secondary_url", v)} />
      <AdminField label="圖片" value={String(value.image_src ?? "")} onChange={(v) => set("image_src", v)} full />
      <AdminField label="圖片描述" value={String(value.image_alt ?? "")} onChange={(v) => set("image_alt", v)} />
      <AdminField label="排序" type="number" value={String(value.sort_order ?? 100)} onChange={(v) => set("sort_order", Number(v))} />
      <AdminCheckbox label="顯示" checked={Boolean(value.is_visible)} onChange={(v) => set("is_visible", v)} />
      <AdminPublishChannels value={value.publish_channels as string[] | null | undefined} onChange={(v) => set("publish_channels", v)} />
    </AdminFormGrid>
  );
}
