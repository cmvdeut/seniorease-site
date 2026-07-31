import type { Config } from "tailwindcss";

/**
 * SeniorEase — navy / gold / cream (homepage redesign)
 * brand-brown blijft als legacy tijdens migratie van overige pagina’s.
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
        navy: {
          DEFAULT: '#0F1F3D',
          light: '#1B2E52',
        },
        gold: {
          DEFAULT: '#D9A96B',
          light: '#E8C393',
        },
        slate: {
          DEFAULT: '#5C6B84',
          dark: '#4A586E',
          light: '#7A8B9C',
        },
        cream: '#F7F2EA',
        // Aliassen voor bestaande classes tijdens migratie
        primary: {
          DEFAULT: '#0F1F3D',
          light: '#1B2E52',
          dark: '#0A1528',
          soft: 'rgba(15, 31, 61, 0.08)',
        },
        secondary: {
          DEFAULT: '#0F1F3D',
          light: '#1B2E52',
          dark: '#0A1528',
        },
        accent: {
          DEFAULT: '#D9A96B',
          light: '#E8C393',
          dark: '#C49555',
          soft: 'rgba(217, 169, 107, 0.35)',
        },
        beige: {
          DEFAULT: '#D9A96B',
          light: '#E8C393',
          dark: '#C49555',
        },
        'brand-brown': {
          DEFAULT: '#8B5E3C',
          light: '#A07654',
          dark: '#6D4A30',
          soft: 'rgba(139,94,60,0.08)',
        },
        neutral: {
          cream: '#F7F2EA',
          stone: '#D9A96B',
          warm: '#D4CEC3',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
      },
      fontSize: {
        'senior-xs': '1rem',
        'senior-sm': '1.05rem',
        'senior-base': '1.15rem',
        'senior-lg': '1.3rem',
        'senior-xl': '1.9rem',
        'senior-2xl': '2.4rem',
        'senior-3xl': '3rem',
        'senior-4xl': '3.5rem',
      },
      borderRadius: {
        'senior': '1.5rem',
      },
      boxShadow: {
        'senior-card': '0 4px 20px rgba(0,0,0,0.05)',
      },
      minHeight: {
        'touch': '48px',
        'touch-lg': '60px',
      },
    },
  },
  plugins: [],
};
export default config;
