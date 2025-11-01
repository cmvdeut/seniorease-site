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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Seniorease.nl kleuren (exact)
        primary: {
          DEFAULT: '#8B5E3C',  // Bruin (exact van seniorease.nl)
          light: '#A07654',
          dark: '#6D4A30',
        },
        secondary: {
          DEFAULT: '#8B5E3C',  // Zelfde bruin
          light: '#A07654',
          dark: '#6D4A30',
        },
        accent: {
          DEFAULT: '#8B5E3C',  // Zelfde bruin
          light: '#A07654',
          dark: '#6D4A30',
        },
        neutral: {
          cream: '#F5EEE6',    // Exact achtergrondkleur seniorease.nl
          stone: '#E0D5CA',
          warm: '#D4CEC3',
        },
      },
      fontSize: {
        // Extra grote fonts voor senioren
        'senior-xs': '1.125rem',   // 18px
        'senior-sm': '1.25rem',    // 20px
        'senior-base': '1.5rem',   // 24px
        'senior-lg': '2rem',       // 32px
        'senior-xl': '2.5rem',     // 40px
        'senior-2xl': '3rem',      // 48px
        'senior-3xl': '4rem',      // 64px
      },
    },
  },
  plugins: [],
};
export default config;
