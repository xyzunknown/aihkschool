"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Check, EnvelopeSimple, IdentificationCard, UserCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { createClient } from "@/lib/supabase/client";
import { DISTRICT_LABELS } from "@/lib/utils";

interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  notification_email: string | null;
  child_birth_year: number | null;
  preferred_districts: string[];
}

function shortMemberId(id: string) {
  return `HKSP-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

function getMetadataName(user: NonNullable<ReturnType<typeof useAuth>["user"]>) {
  return user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split("@")[0] ?? "";
}

function getMetadataAvatar(user: NonNullable<ReturnType<typeof useAuth>["user"]>) {
  const value = user.user_metadata?.avatar_url;
  return typeof value === "string" && value ? value : null;
}

async function resizeImageToDataUrl(file: File): Promise<string> {
  const imageUrl = URL.createObjectURL(file);
  try {
    const img = document.createElement("img");
    img.src = imageUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("圖片讀取失敗"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("圖片處理失敗");

    const size = Math.min(img.width, img.height);
    const sx = (img.width - size) / 2;
    const sy = (img.height - size) / 2;
    ctx.drawImage(img, sx, sy, size, size, 0, 0, 160, 160);
    return canvas.toDataURL("image/jpeg", 0.78);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

const YEAR_OPTIONS = [
  { value: "", label: "未設定" },
  ...Array.from({ length: 16 }, (_, index) => {
    const year = new Date().getFullYear() - index;
    return { value: String(year), label: `${year} 年` };
  }),
];

export default function AccountSettingsPage() {
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [notificationEmail, setNotificationEmail] = useState("");
  const [childBirthYear, setChildBirthYear] = useState("");
  const [preferredDistricts, setPreferredDistricts] = useState<string[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      showToast({ message: "請先登入" });
      router.push("/login");
      return;
    }
    if (user) {
      setDisplayName(getMetadataName(user));
      setAvatarPreview(getMetadataAvatar(user));
      void fetchProfile();
    }
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const districtEntries = useMemo(() => Object.entries(DISTRICT_LABELS), []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/account/profile");
      if (!res.ok) throw new Error("載入資料失敗");
      const json = await res.json();
      const data = json.data as Profile | null;
      setProfile(data);
      if (data?.display_name) setDisplayName(data.display_name);
      setNotificationEmail(data?.notification_email ?? "");
      setChildBirthYear(data?.child_birth_year ? String(data.child_birth_year) : "");
      setPreferredDistricts(data?.preferred_districts ?? []);
    } catch (error: unknown) {
      showToast({ message: error instanceof Error ? error.message : "載入資料失敗" });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast({ message: "請選擇圖片檔案" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast({ message: "圖片不可大於 5MB" });
      return;
    }
    try {
      setAvatarPreview(await resizeImageToDataUrl(file));
    } catch (error: unknown) {
      showToast({ message: error instanceof Error ? error.message : "圖片處理失敗" });
    }
  };

  const toggleDistrict = (district: string) => {
    setPreferredDistricts((prev) => {
      if (prev.includes(district)) return prev.filter((item) => item !== district);
      if (prev.length >= 6) {
        showToast({ message: "最多選擇 6 個地區" });
        return prev;
      }
      return [...prev, district];
    });
  };

  const handleSave = async () => {
    if (!user) return;
    if (!displayName.trim()) {
      showToast({ message: "請輸入暱稱" });
      return;
    }

    setSaving(true);
    try {
      const [authResult, profileResult] = await Promise.all([
        supabase.auth.updateUser({
          data: {
            full_name: displayName.trim(),
            avatar_url: avatarPreview,
          },
        }),
        fetch("/api/account/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            display_name: displayName.trim(),
            notification_email: notificationEmail.trim() || null,
            child_birth_year: childBirthYear ? Number(childBirthYear) : null,
            preferred_districts: preferredDistricts,
          }),
        }),
      ]);

      if (authResult.error) throw new Error(authResult.error.message);
      if (!profileResult.ok) throw new Error("儲存資料失敗");

      showToast({ message: "資料已更新" });
      router.push("/account");
      router.refresh();
    } catch (error: unknown) {
      showToast({ message: error instanceof Error ? error.message : "儲存資料失敗" });
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingProfile) {
    return <div className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8"><p className="text-base text-ink-500">載入中...</p></div>;
  }
  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:px-8 md:py-10">
      <button onClick={() => router.push("/account")} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
        <ArrowLeft aria-hidden="true" size={17} weight="bold" />
        返回我的
      </button>

      <section className="rounded-[24px] border border-surface-border bg-white p-6 shadow-soft md:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-forest-50 text-forest-700 ring-1 ring-forest-100">
            {avatarPreview ? (
              <Image src={avatarPreview} alt="" fill sizes="96px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UserCircle aria-hidden="true" size={52} weight="regular" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-ink-900">編輯個人資料</h1>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-xs font-semibold text-ink-700">
              <IdentificationCard aria-hidden="true" size={15} weight="regular" />
              {shortMemberId(user.id)}
            </p>
          </div>
          <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-pill border border-forest-200 bg-white px-5 text-sm font-semibold text-forest-700 transition hover:bg-forest-50">
            <Camera aria-hidden="true" size={18} weight="regular" />
            更換頭像
            <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
          </label>
        </div>
      </section>

      <section className="mt-6 rounded-[20px] border border-surface-border bg-white p-5 shadow-soft">
        <h2 className="mb-4 text-lg font-semibold text-ink-900">帳戶資料</h2>
        <div className="grid gap-4">
          <Input label="暱稱" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={60} />
          <Input label="登入電郵" value={user.email ?? profile?.email ?? ""} disabled icon={<EnvelopeSimple size={18} />} />
          <Input label="通知電郵" value={notificationEmail} onChange={(event) => setNotificationEmail(event.target.value)} placeholder={user.email ?? "name@example.com"} type="email" />
        </div>
      </section>

      <section id="preferences" className="mt-6 rounded-[20px] border border-surface-border bg-white p-5 shadow-soft">
        <h2 className="mb-4 text-lg font-semibold text-ink-900">選校偏好</h2>
        <div className="grid gap-4">
          <Select label="孩子出生年份" value={childBirthYear} onChange={(event) => setChildBirthYear(event.target.value)} options={YEAR_OPTIONS} />
          <div>
            <p className="mb-2 text-label font-medium uppercase text-ink-500">偏好地區</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {districtEntries.map(([value, label]) => {
                const selected = preferredDistricts.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleDistrict(value)}
                    className={`flex min-h-11 items-center justify-between rounded-button border px-3 text-sm font-medium transition ${
                      selected
                        ? "border-forest-300 bg-forest-50 text-forest-800"
                        : "border-surface-border bg-white text-ink-700 hover:bg-cream-50"
                    }`}
                  >
                    {label}
                    {selected ? <Check aria-hidden="true" size={16} weight="bold" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky bottom-[76px] mt-6 flex gap-3 rounded-[20px] border border-surface-border bg-white/95 p-3 shadow-card backdrop-blur lg:bottom-5">
        <Button variant="secondary" className="flex-1" onClick={() => router.push("/account")}>取消</Button>
        <Button variant="primary" className="flex-1" onClick={handleSave} disabled={saving}>
          {saving ? "儲存中..." : "儲存"}
        </Button>
      </div>
    </div>
  );
}
