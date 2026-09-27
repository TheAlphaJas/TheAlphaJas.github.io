import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getBlogPosts, getProbabilityProblems } from '../utils/content';
import { gitDates } from '../utils/git-dates.mjs';
import { AUTHOR_NAME, excerpt, SITE_URL } from '../utils/seo';

// Blog posts and probability writeups, newest first. CSES and USACO are left
// out: they were bulk-imported, so their dates say little about when they
// were written.
export const GET: APIRoute = () => {
  const blogs = getBlogPosts().map((post) => ({
    title: post.title,
    link: `/fun/blogs/${post.slug}/`,
    description: post.summary || excerpt(post.content, 300),
    pubDate: post.date ? new Date(`${post.date}T00:00:00Z`) : gitDates(`content/blogs/${post.slug}.md`)?.created,
    categories: ['Blog', ...post.tags],
  }));

  const problems = getProbabilityProblems().map((problem) => ({
    title: `${problem.title} (probability)`,
    link: `/fun/probability/${problem.slug}/`,
    description: excerpt(problem.problem, 300),
    pubDate: gitDates(`content/probability/${problem.slug}.md`)?.created,
    categories: ['Probability', ...problem.topics],
  }));

  const items = [...blogs, ...problems].sort(
    (a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0),
  );

  return rss({
    title: AUTHOR_NAME,
    description: 'Blog posts and worked probability puzzle solutions.',
    site: SITE_URL,
    items,
    customData: '<language>en</language>',
  });
};
