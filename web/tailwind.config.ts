import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080A0F",
        surface: {
          DEFAULT: "#0C0F16",
          elevated: "#10141D",
          dark: "#080B11",
        },
        border: {
          DEFAULT: "#1D2430",
          subtle: "#171D27",
          control: "#252D3A",
        },
        textPrimary: "#F5F7FA",
        textSecondary: "#9CA6B7",
        textMuted: "#687386",
      },
    },
  },
  plugins: [],
};
export default config;
