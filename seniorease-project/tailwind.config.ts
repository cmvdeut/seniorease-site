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
          soft: 'rgba(139,94,60,0.08)', // zachte accenttint voor icoon-achtergronden
        },
        secondary: {
          DEFAULT: '#2E241C',  // Diep warm bruin — koppen en nadruk
          light: '#4A3A2C',
          dark: '#1F1811',
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
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Leesbaar voor senioren, afgestemd op homepage (html = 18px)
        'senior-xs': '1rem',       // 18px — kleine tekst / labels
        'senior-sm': '1.05rem',    // ~19px — standaard body
        'senior-base': '1.15rem',  // ~21px — nadruk, knoppen
        'senior-lg': '1.3rem',     // ~23px — intro / lead
        'senior-xl': '1.9rem',     // ~34px — h2
        'senior-2xl': '2.4rem',    // ~43px — paginatitel
        'senior-3xl': '3rem',      // ~54px — hero h1
        'senior-4xl': '3.5rem',    // ~63px — alleen voor speciale hero’s
      },
    },
  },
  plugins: [],
};
export default config;
