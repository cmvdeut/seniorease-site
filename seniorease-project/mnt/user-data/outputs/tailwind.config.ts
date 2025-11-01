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
        // Warme, vriendelijke kleuren
        primary: {
          DEFAULT: '#FF6B35',  // Warm koraal oranje
          light: '#FF8C5A',
          dark: '#E55A2B',
        },
        secondary: {
          DEFAULT: '#FFD93D',  // Zacht geel
          light: '#FFE66D',
          dark: '#F0C419',
        },
        accent: {
          DEFAULT: '#FFAA64',  // Peachy oranje
          light: '#FFBC82',
          dark: '#FF9347',
        },
        warm: {
          cream: '#FFF8F0',    // Warme achtergrond
          beige: '#FFEFD5',
          peach: '#FFE5D9',
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
