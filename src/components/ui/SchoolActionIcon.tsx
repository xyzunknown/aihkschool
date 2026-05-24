"use client";

import type { MouseEventHandler } from "react";
import { Bell, Heart, X, Columns } from "@phosphor-icons/react";

type SchoolActionKind = "favorite" | "compare" | "reminder" | "remove";

interface SchoolActionIconProps {
  kind: SchoolActionKind;
  active?: boolean;
  size?: "sm" | "md";
  className?: string;
}

interface SchoolActionButtonProps extends SchoolActionIconProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const iconSize = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
};

const buttonSize = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
};

export function SchoolActionButton({
  kind,
  label,
  active = false,
  size = "md",
  className = "",
  onClick,
  disabled = false,
}: SchoolActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={[
        "group inline-flex shrink-0 items-center justify-center rounded-full border transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500/30 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        buttonSize[size],
        active
          ? "border-forest-200 bg-forest-600 text-white shadow-soft"
          : "border-surface-border bg-surface-soft text-ink-500 hover:border-forest-200 hover:bg-forest-50 hover:text-forest-700",
        className,
      ].join(" ")}
    >
      <SchoolActionIcon kind={kind} active={active} size={size} />
    </button>
  );
}

export function SchoolActionIcon({ kind, active = false, size = "md", className = "" }: SchoolActionIconProps) {
  const common = `${iconSize[size]} ${className}`;
  const weight = active ? "fill" : "regular";

  if (kind === "favorite") {
    return <Heart aria-hidden="true" className={common} weight={weight} />;
  }

  if (kind === "compare") {
    return <Columns aria-hidden="true" className={common} weight={weight} />;
  }

  if (kind === "reminder") {
    return <Bell aria-hidden="true" className={common} weight={weight} />;
  }

  return <X aria-hidden="true" className={common} weight="bold" />;
}
