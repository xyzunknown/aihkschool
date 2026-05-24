"use client";

import type { MouseEventHandler } from "react";

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

  if (kind === "favorite") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20.4s-6.9-4.15-8.55-8.35C2.23 8.94 3.92 5.7 7.02 5.3c1.86-.24 3.42.64 4.31 1.95.16.24.5.24.66 0 .89-1.31 2.45-2.19 4.31-1.95 3.1.4 4.79 3.64 3.57 6.75C18.9 16.25 12 20.4 12 20.4Z" />
      </svg>
    );
  }

  if (kind === "compare") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6.5 5.75h2.4c.55 0 1 .45 1 1v10.5c0 .55-.45 1-1 1H6.5c-.55 0-1-.45-1-1V6.75c0-.55.45-1 1-1Z" fill={active ? "currentColor" : "none"} opacity={active ? "0.95" : "1"} />
        <path d="M15.1 5.75h2.4c.55 0 1 .45 1 1v10.5c0 .55-.45 1-1 1h-2.4c-.55 0-1-.45-1-1V6.75c0-.55.45-1 1-1Z" fill={active ? "currentColor" : "none"} opacity={active ? "0.95" : "1"} />
        <path d="M11.9 8.5v7" opacity="0.42" />
      </svg>
    );
  }

  if (kind === "reminder") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 9.3a6 6 0 0 0-12 0c0 4.7-1.8 6.35-2.55 7.15h17.1C19.8 15.65 18 14 18 9.3Z" fill={active ? "currentColor" : "none"} opacity={active ? "0.95" : "1"} />
        <path d="M14.15 19a2.35 2.35 0 0 1-4.3 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
