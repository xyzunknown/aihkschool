"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { REMINDER_DAYS } from "@/lib/utils";

interface ReminderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedDays: number[]) => void;
  schoolName?: string;
}

const REMINDER_OPTIONS = REMINDER_DAYS.map((d) => ({
  value: d,
  label: `${d}日前`,
  description: d === 7 ? "一星期前通知" : d === 3 ? "三日前通知" : "截止前一日通知",
}));

export function ReminderSheet({
  isOpen,
  onClose,
  onConfirm,
  schoolName,
}: ReminderSheetProps) {
  const [selectedDays, setSelectedDays] = useState<number[]>([...REMINDER_DAYS]);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day].sort((a, b) => b - a)
    );
  };

  const handleConfirm = () => {
    if (selectedDays.length === 0) return;
    onConfirm(selectedDays);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="截止提醒設定">
      {schoolName && (
        <p className="text-sm text-slate-500 mb-4">
          為 {schoolName} 設定申請截止提醒
        </p>
      )}

      <div className="space-y-3 mb-6">
        {REMINDER_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white cursor-pointer transition-colors hover:bg-slate-50"
          >
            <input
              type="checkbox"
              checked={selectedDays.includes(opt.value)}
              onChange={() => toggleDay(opt.value)}
              className="w-4 h-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950"
            />
            <div className="flex-1">
              <span className="text-base font-medium text-slate-900">
                {opt.label}
              </span>
              <span className="text-sm text-slate-500 ml-2">
                ({opt.description})
              </span>
            </div>
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          暫不
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={handleConfirm}
          disabled={selectedDays.length === 0}
        >
          開啟提醒
        </Button>
      </div>

      <p className="text-sm text-slate-500 text-center mt-4">
        提醒將透過電郵發送到您嘅登入郵箱
      </p>
    </BottomSheet>
  );
}
