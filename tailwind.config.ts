import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B2E4B",
        secondary: "#2F6F8F",
        accent: "#E86F2A",
        light: "#F4F7F8",
        surface: "#FFFFFF",
        border: "#D7DEE2",
        textPrimary: "#1E2A32",
        textSecondary: "#51606B",
        success: "#2F7D5F",
        warning: "#B9792A"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Poppins", "Montserrat", "sans-serif"],
        sans: ["var(--font-body)", "Source Sans 3", "Open Sans", "sans-serif"],
        accent: ["var(--font-accent)", "Bebas Neue", "Roboto Condensed", "sans-serif"]
      },
      boxShadow: {
        card: "0 20px 40px -30px rgba(11, 46, 75, 0.4)",
        soft: "0 12px 30px -20px rgba(11, 46, 75, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
