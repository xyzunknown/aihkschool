"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "确认",
  cancelLabel = "取消",
  variant = "default",
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-body text-slate-500 mb-6">{message}</p>
      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={onClose}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="primary"
          className={`flex-1 ${variant === "danger" ? "bg-red-600 hover:bg-red-700" : ""}`}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
