"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  variant?: "content" | "featured";
}

export function GlassCard({ children, className = "", hoverable = false, onClick, variant = "content" }: GlassCardProps) {
  const baseStyles = "rounded-card p-6 transition-shadow duration-200";

  const variantStyles = {
    content: "bg-white border border-surface-border hover:shadow-sm",
    featured: "bg-ink-900 text-white rounded-card",
  };

  const interactiveStyles = hoverable ? "cursor-pointer" : "";

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${interactiveStyles}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
