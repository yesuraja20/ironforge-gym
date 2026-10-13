import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080a",
        foreground: "#f8fafc",
        obsidian: {
          950: "#050507",
          900: "#08080a",
          850: "#0d0e12",
          800: "#13141b",
          700: "#1b1d27",
          600: "#262836",
        },
        crimson: {
          light: "#ff444c",
          DEFAULT: "#ff1e27",
          dark: "#cc0c14",
          glow: "rgba(255, 30, 39, 0.35)",
        },
        silver: {
          100: "#ffffff",
          200: "#f1f5f9",
          300: "#e2e8f0",
          400: "#cbd5e1",
          500: "#94a3b8",
          600: "#64748b",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "metal-gradient": "linear-gradient(135deg, #ffffff 0%, #94a3b8 50%, #475569 100%)",
        "red-glow-radial": "radial-gradient(circle at 50% 50%, rgba(255, 30, 39, 0.25) 0%, transparent 70%)",
        "surface-dark": "linear-gradient(180deg, rgba(22, 24, 33, 0.8) 0%, rgba(13, 14, 18, 0.95) 100%)",
      },
      boxShadow: {
        "glow-red": "0 0 30px rgba(255, 30, 39, 0.35)",
        "glow-red-lg": "0 0 60px rgba(255, 30, 39, 0.5)",
        "metallic": "0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        "shimmer": "shimmer 2.5s infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
