import type { APIRoute } from 'astro';
import { getPublications } from '../utils/content';
import { getAllDocs, SECTION_TITLES, type ExportDoc, type Section } from '../utils/markdown-export';
import { absoluteUrl, AUTHOR_NAME } from '../utils/seo';

// Site index for AI agents, following the llms.txt convention (llmstxt.org).
// Generated from the content folders at build time, so it never drifts.

function publicationLine(pub: ReturnType<typeof getPublications>[number]): string {
  const link = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;
  const status = pub.status && pub.status !== 'published' ? ` (${pub.status})` : '';
  const title = link ? `[${pub.title}](${link})` : pub.title;
  return `- ${title}. ${pub.authors.join(', ')}. ${pub.venue}, ${pub.year}${status}.`;
}

function docLine(doc: ExportDoc): string {
  return `- [${doc.title}](${absoluteUrl(doc.mdPath)})${doc.summary ? `: ${doc.summary}` : ''}`;
}

export const GET: APIRoute = () => {
  const docs = getAllDocs();
  const sections: Section[] = ['blogs', 'probability', 'cses', 'usaco'];

  const body = [
    `# ${AUTHOR_NAME}`,
    '',
    `> Personal website of ${AUTHOR_NAME}: research on causal reinforcement learning, world models, and machine learning for speech and signals, plus worked solutions to probability puzzles and competitive programming problems.`,
    '',
    'Every writeup below links to its plain-Markdown version (the `.md` URL), which keeps the original LaTeX. The HTML page lives at the same path without `.md`, e.g. `/fun/probability/power-grid/`. Math on the HTML pages is rendered by KaTeX, so prefer the Markdown versions for reading formulas.',
    '',
    '## About',
    '',
    `- [Home](${absoluteUrl('/')}): short bio and recent news`,
    `- [CV](${absoluteUrl('/cv/')}): education, research experience, skills`,
    `- [Publications](${absoluteUrl('/publications/')}): papers grouped by year`,
    `- [Contact](${absoluteUrl('/contact/')}): email and profiles`,
    `- [Academic CV (PDF)](${absoluteUrl('/Academic_CV.pdf')})`,
    '',
    '## Publications',
    '',
    ...getPublications().map(publicationLine),
    ...sections.flatMap((section) => {
      const inSection = docs.filter((doc) => doc.section === section);
      return inSection.length === 0
        ? []
        : ['', `## ${SECTION_TITLES[section]} (${inSection.length})`, '', ...inSection.map(docLine)];
    }),
    '',
    '## Optional',
    '',
    `- [All writeups in one file](${absoluteUrl('/llms-full.txt')}): the full Markdown of every post above, concatenated`,
    `- [RSS feed](${absoluteUrl('/rss.xml')}): blog posts and probability writeups`,
    `- [Sitemap](${absoluteUrl('/sitemap-index.xml')})`,
  ].join('\n');

  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
