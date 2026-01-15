import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#043A5E",
        secondary: "#0A5678",
        accent: "#EF7D3F",
        light: "#F5F5F5",
        surface: "#FFFFFF",
        border: "#DADADA",
        textPrimary: "#333333",
        textSecondary: "#5E5E5E",
        mutedBlue: "#99A9B5"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Open Sans", "sans-serif"],
        heading: ["var(--font-heading)", "Montserrat", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
