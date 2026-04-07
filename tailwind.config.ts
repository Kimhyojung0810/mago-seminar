import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Pretendard Variable',
          'Pretendard',
          'Roboto',
          'Noto Sans KR',
          'Segoe UI',
          'Malgun Gothic',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
