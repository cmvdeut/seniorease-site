import type { Config } from "tailwindcss";

/**
 * SeniorEase — originele huisstijl (seniorease.nl / Original/)
 * Layout = redesign; kleuren = exact origineel.
 */
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
        // Donker warm (header/footer) — live #2E241C
        navy: {
          DEFAULT: '#2E241C',
          light: '#3D3229',
        },
        // Merkbruin — exact live / Original #8B5E3C
        gold: {
          DEFAULT: '#8B5E3C',
          light: '#A07654',
        },
        // Warme steen — live #E0D5CA
        slate: {
          DEFAULT: '#E0D5CA',
          dark: '#D4C4B5',
          light: '#EBE3DA',
        },
        cream: '#F5EEE6',
        // Off-white — iets warmer/zachter dan fel #FAF9F6
        paper: '#F7F2EB',
        primary: {
          DEFAULT: '#8B5E3C',
          light: '#A07654',
          dark: '#6D4A30',
          soft: 'rgba(139, 94, 60, 0.08)',
        },
        secondary: {
          DEFAULT: '#2E241C',
          light: '#3D3229',
          dark: '#1F1F1F',
        },
        accent: {
          DEFAULT: '#8B5E3C',
          light: '#A07654',
          dark: '#6D4A30',
          soft: 'rgba(139, 94, 60, 0.35)',
        },
        beige: {
          DEFAULT: '#8B5E3C',
          light: '#A07654',
          dark: '#6D4A30',
        },
        'brand-brown': {
          DEFAULT: '#8B5E3C',
          light: '#A07654',
          dark: '#6D4A30',
          soft: 'rgba(139,94,60,0.08)',
        },
        neutral: {
          cream: '#F5EEE6',
          stone: '#E0D5CA',
          warm: '#D4CEC3',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
      },
      fontSize: {
        'senior-xs': '1.125rem', // 18px
        'senior-sm': '1.25rem', // 20px
        'senior-base': '1.25rem',
        'senior-lg': '1.35rem',
        'senior-xl': '1.9rem',
        'senior-2xl': '2.25rem',
        'senior-3xl': '2.75rem',
      },
      borderRadius: {
        senior: '1.5rem', // 24px — Stitch zachte vormen
      },
      maxWidth: {
        senior: '1200px',
      },
      minHeight: {
        touch: '60px',
      },
      minWidth: {
        touch: '60px',
      },
    },
  },
  plugins: [],
};

export default config;
