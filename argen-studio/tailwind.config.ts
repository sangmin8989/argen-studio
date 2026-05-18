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
        // 명품 토대 팔레트 — globals.css와 동기화. 골드 폐기.
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
        // accent: 골드(#C9A96E) 폐기 → 깊은 스톤. 컬러로 강조 X.
        accent: '#6B5A49',
        // 잉크
        dark:     '#1C1917',
        charcoal: '#1C1917',
        terracotta: '#C0897B',
      },
      fontFamily: {
        serif: ['var(--font-eb-garamond)', 'Pretendard Variable', 'Georgia', 'serif'],
        sans:  ['Pretendard Variable', '-apple-system', 'BlinkMacSystemFont', 'system-ui', '"Apple SD Gothic Neo"', '"Noto Sans KR"', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
    },
  },
  plugins: [],
};

export default config;
