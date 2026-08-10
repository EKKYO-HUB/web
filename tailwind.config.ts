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
        ekkyo: {
          black: "#0a0a0a",
          white: "#f7f6f2",
          gray: "#6b7280",
          accent: "#0071B3",
          "accent-dark": "#005a8f",
          orange: "#EB5505",
          "orange-dark": "#c2470a",
        },
        /* SUMMIT 2026「まみれろ」— 水と汚れのパレット（湖面→水中→水底） */
        mamire: {
          "water-pale": "#E6EDEA", // 薄い白濁水（本文背景）
          water: "#BCCFCB", // 濁り水（ヒーロー）
          "water-deep": "#20302F", // 水底（クロージング・フッター）
          ink: "#1F2B2C", // 深い墨（本文テキスト）
          mud: "#5A4632", // 泥（強罫線・染み）
          silt: "#7C6A50", // 沈殿（サブテキスト・細罫線）
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-sans-jp)", "sans-serif"],
        display: ["var(--font-inter)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        chunk: ["'ChunkFive'", "serif"],
        mincho: ["var(--font-shippori)", "'Hiragino Mincho ProN'", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        blink: "blink 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
