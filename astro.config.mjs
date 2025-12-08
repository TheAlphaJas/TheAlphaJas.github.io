import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// For username.github.io repositories, base should be '/' (root domain)
// BASE_PATH is set to '/' for production builds via GitHub Actions
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  site: 'https://TheAlphaJas.github.io',
  base: basePath,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    remarkPlugins: ['remark-math'],
    rehypePlugins: [
      ['rehype-katex', { output: 'html' }],
      ['rehype-prism-plus', { ignoreMissing: true }],
    ],
  },
});

