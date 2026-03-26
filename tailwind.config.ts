import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        card: "2rem",
        pill: "99px",
      },
      fontSize: {
        display: ["36px", { lineHeight: "1.1", fontWeight: "600", letterSpacing: "-0.03em" }],
        h1: ["24px", { lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.02em" }],
        h2: ["18px", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.015em" }],
        body: ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["10px", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.1em" }],
      },
      spacing: {
        "7": "28px",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "ken-burns": "ken-burns 20s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
