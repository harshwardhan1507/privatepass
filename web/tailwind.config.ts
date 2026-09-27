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
        background: "#080B12",
        surface: {
          DEFAULT: "#0D111A",
          elevated: "#111622",
          dark: "#080C14",
        },
        border: {
          DEFAULT: "#202838",
          subtle: "#181F2D",
        },
        primaryText: "#F5F7FA",
        secondaryText: "#9AA4B5",
        mutedText: "#667085",
      },
    },
  },
  plugins: [],
};
export default config;
