import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        warm: {
          50:  '#FEFDFB',
          100: '#FAF8F5',
          200: '#F0EBE3',
          300: '#E0D5C7',
          400: '#C4B5A0',
          500: '#A89279',
          600: '#8C7560',
          700: '#6B5A49',
          800: '#4A3F35',
          900: '#2D2620',
        },
        accent: '#C9A96E',
        dark:   '#1A1A1A',
        terracotta: '#C0897B',
        charcoal: '#1C1917',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
