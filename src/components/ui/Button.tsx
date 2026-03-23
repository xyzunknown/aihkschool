import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-1.5 font-medium transition-transform duration-150 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
      primary: "bg-slate-950 text-white rounded-xl hover:scale-[1.02]",
      secondary:
        "bg-white/70 backdrop-blur-lg text-slate-900 border border-slate-200/50 rounded-xl hover:scale-[1.02]",
      ghost:
        "bg-transparent text-slate-500 border border-slate-200/40 rounded-xl hover:scale-[1.02]",
    };

    const sizes: Record<string, string> = {
      default: "px-[22px] py-[11px] text-sm tracking-[-0.01em]",
      sm: "px-[14px] py-[7px] text-xs rounded-[10px]",
    };

    return (
      <button
        ref={ref}
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
