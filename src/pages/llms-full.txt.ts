import type { APIRoute } from 'astro';
import { getAllDocs } from '../utils/markdown-export';
import { AUTHOR_NAME } from '../utils/seo';

// Every writeup on the site as one Markdown document, so an agent can load
// the whole corpus in a single request. Index lives at /llms.txt.
export const GET: APIRoute = () => {
  const body = [
    `# ${AUTHOR_NAME}: all writeups`,
    '',
    'Blogs, probability solutions, CSES and USACO solutions. Each writeup starts with a level-1 `# Title` heading followed by a `Source:` line giving its canonical URL. Math is LaTeX between $$ delimiters.',
    ...getAllDocs().flatMap((doc) => ['', '---', '', doc.markdown.trim()]),
  ].join('\n');

  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
