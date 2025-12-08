/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(51 65 85)',
            '[class~="lead"]': {
              color: 'rgb(71 85 105)',
            },
            a: {
              color: 'rgb(59 130 246)',
              textDecoration: 'none',
              '&:hover': {
                color: 'rgb(37 99 235)',
              },
            },
            strong: {
              color: 'rgb(30 41 59)',
              fontWeight: '600',
            },
            'ol > li::before': {
              color: 'rgb(148 163 184)',
            },
            'ul > li::before': {
              backgroundColor: 'rgb(203 213 225)',
            },
            hr: {
              borderColor: 'rgb(226 232 240)',
            },
            blockquote: {
              color: 'rgb(71 85 105)',
              borderLeftColor: 'rgb(226 232 240)',
            },
            h1: {
              color: 'rgb(30 41 59)',
            },
            h2: {
              color: 'rgb(30 41 59)',
            },
            h3: {
              color: 'rgb(30 41 59)',
            },
            h4: {
              color: 'rgb(30 41 59)',
            },
            code: {
              color: 'rgb(30 41 59)',
            },
            'a code': {
              color: 'rgb(30 41 59)',
            },
            pre: {
              color: 'rgb(30 41 59)',
              backgroundColor: 'rgb(241 245 249)',
            },
            thead: {
              color: 'rgb(30 41 59)',
              borderBottomColor: 'rgb(226 232 240)',
            },
            'tbody tr': {
              borderBottomColor: 'rgb(226 232 240)',
            },
          },
        },
        invert: {
          css: {
            color: 'rgb(203 213 225)',
            '[class~="lead"]': {
              color: 'rgb(148 163 184)',
            },
            a: {
              color: 'rgb(96 165 250)',
            },
            strong: {
              color: 'rgb(226 232 240)',
            },
            'ol > li::before': {
              color: 'rgb(148 163 184)',
            },
            'ul > li::before': {
              backgroundColor: 'rgb(71 85 105)',
            },
            hr: {
              borderColor: 'rgb(51 65 85)',
            },
            blockquote: {
              color: 'rgb(148 163 184)',
              borderLeftColor: 'rgb(51 65 85)',
            },
            h1: {
              color: 'rgb(226 232 240)',
            },
            h2: {
              color: 'rgb(226 232 240)',
            },
            h3: {
              color: 'rgb(226 232 240)',
            },
            h4: {
              color: 'rgb(226 232 240)',
            },
            code: {
              color: 'rgb(226 232 240)',
            },
            'a code': {
              color: 'rgb(226 232 240)',
            },
            pre: {
              color: 'rgb(226 232 240)',
              backgroundColor: 'rgb(15 23 42)',
            },
            thead: {
              color: 'rgb(226 232 240)',
              borderBottomColor: 'rgb(51 65 85)',
            },
            'tbody tr': {
              borderBottomColor: 'rgb(51 65 85)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

