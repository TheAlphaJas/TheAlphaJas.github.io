/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        serif: ['"Roboto Slab"', 'Georgia', 'serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      // Every colour resolves to a CSS variable, so dark mode is a single
      // variable swap on <html class="dark"> instead of dark: on every element.
      colors: {
        page: 'var(--global-bg-color)',
        card: 'var(--global-card-bg-color)',
        ink: 'var(--global-text-color)',
        muted: 'var(--global-text-color-light)',
        accent: 'var(--global-theme-color)',
        divider: 'var(--global-divider-color)',
        subtle: 'var(--global-subtle-bg-color)',
      },
      borderColor: {
        DEFAULT: 'var(--global-divider-color)',
      },
      maxWidth: {
        content: '52rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--global-text-color)',
            a: {
              color: 'var(--global-theme-color)',
              textDecoration: 'none',
              fontWeight: '400',
              '&:hover': { textDecoration: 'underline' },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'var(--global-text-color)',
              fontFamily: '"Roboto Slab", Georgia, serif',
              fontWeight: '500',
            },
            strong: {
              color: 'var(--global-text-color)',
              fontWeight: '700',
            },
            hr: { borderColor: 'var(--global-divider-color)' },
            blockquote: {
              color: 'var(--global-text-color-light)',
              borderLeftColor: 'var(--global-theme-color)',
              fontStyle: 'normal',
            },
            code: {
              color: 'var(--global-text-color)',
              backgroundColor: 'var(--global-code-bg-color)',
              borderRadius: '3px',
              padding: '0.15em 0.35em',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              color: 'var(--global-text-color)',
              backgroundColor: 'var(--global-code-bg-color)',
              border: '1px solid var(--global-divider-color)',
            },
            'ol > li::marker': { color: 'var(--global-text-color-light)' },
            'ul > li::marker': { color: 'var(--global-text-color-light)' },
            thead: {
              color: 'var(--global-text-color)',
              borderBottomColor: 'var(--global-divider-color)',
            },
            'tbody tr': { borderBottomColor: 'var(--global-divider-color)' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
