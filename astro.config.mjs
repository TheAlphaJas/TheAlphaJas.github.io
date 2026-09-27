import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { gitDates } from './src/utils/git-dates.mjs';

// https://astro.build/config
// For username.github.io repositories, base should be '/' (root domain)
// BASE_PATH is set to '/' for production builds via GitHub Actions
const basePath = process.env.BASE_PATH || '/';

// Writeup pages get <lastmod> from the git history of their Markdown file,
// so crawlers can tell which pages changed since their last visit.
function withLastmod(item) {
  const match = new URL(item.url).pathname.match(/^\/fun\/(blogs|probability|cses|usaco)\/([^/]+)\/$/);
  const modified = match && gitDates(`content/${match[1]}/${match[2]}.md`)?.modified;
  return modified ? { ...item, lastmod: modified.toISOString() } : item;
}

export default defineConfig({
  site: 'https://TheAlphaJas.github.io',
  base: basePath,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({ serialize: withLastmod }),
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

