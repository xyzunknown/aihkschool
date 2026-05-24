"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "sm";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", disabled, children, type = "button", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-1.5 rounded-pill font-medium transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50";

    const variants: Record<string, string> = {
      primary: "bg-forest-600 text-white shadow-soft hover:bg-forest-700",
      secondary: "border border-forest-200 bg-white text-forest-700 hover:bg-forest-50",
    };

    const sizes: Record<string, string> = {
      default: "h-12 px-6 text-body",
      sm: "h-8 px-4 text-label",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
