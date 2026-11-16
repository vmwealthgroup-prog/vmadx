import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#080D18",
        surface: "#111827",
        panel: "#172033",
        accent: "#22C55E",
        border: "#263247"
      }
    }
  },
  plugins: []
};

export default config;
