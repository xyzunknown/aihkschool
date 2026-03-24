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
  label: `提前 ${d} 天`,
  description: d === 7 ? "一周前通知" : d === 3 ? "三天前通知" : "截止前一天通知",
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
    <BottomSheet isOpen={isOpen} onClose={onClose} title="截止提醒设置">
      {schoolName && (
        <p className="text-small text-slate-400 mb-4">
          为 {schoolName} 设置申请截止提醒
        </p>
      )}

      <div className="space-y-3 mb-6">
        {REMINDER_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/50 bg-white/40 cursor-pointer transition-colors hover:bg-white/60"
          >
            <input
              type="checkbox"
              checked={selectedDays.includes(opt.value)}
              onChange={() => toggleDay(opt.value)}
              className="w-4 h-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950"
            />
            <div className="flex-1">
              <span className="text-body font-medium text-slate-900">
                {opt.label}
              </span>
              <span className="text-small text-slate-400 ml-2">
                {opt.description}
              </span>
            </div>
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          暂不
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={handleConfirm}
          disabled={selectedDays.length === 0}
        >
          开启提醒
        </Button>
      </div>

      <p className="text-small text-slate-400 text-center mt-4">
        提醒将通过邮件发送到您的登录邮箱
      </p>
    </BottomSheet>
  );
}
