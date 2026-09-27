import { getBlogPosts, getCSESEntries, getProbabilityProblems, getUSACOEntries } from './content';
import { absoluteUrl, excerpt } from './seo';

// Plain-Markdown renditions of every writeup, for AI agents and scrapers.
// The HTML pages render math with KaTeX, which leaves no TeX source behind;
// these keep the original $$...$$ so the math survives machine reading.

export type Section = 'blogs' | 'probability' | 'cses' | 'usaco';

export interface ExportDoc {
  section: Section;
  slug: string;
  title: string;
  summary: string;
  htmlPath: string;
  mdPath: string;
  markdown: string;
}

export const SECTION_TITLES: Record<Section, string> = {
  blogs: 'Blogs',
  probability: 'Probability Corner',
  cses: 'CSES Problem Set',
  usaco: 'USACO / Competitive Programming',
};

function paths(section: Section, slug: string) {
  return { htmlPath: `/fun/${section}/${slug}/`, mdPath: `/fun/${section}/${slug}.md` };
}

function header(title: string, htmlPath: string, meta: (string | false | undefined)[]): string {
  return [`# ${title}`, '', `Source: ${absoluteUrl(htmlPath)}`, ...meta.filter(Boolean)].join('\n');
}

export function getBlogDocs(): ExportDoc[] {
  return getBlogPosts().map((post) => {
    const p = paths('blogs', post.slug);
    return {
      section: 'blogs',
      slug: post.slug,
      title: post.title,
      summary: post.summary || excerpt(post.content),
      ...p,
      markdown: [
        header(post.title, p.htmlPath, [
          post.date && `Date: ${post.date}`,
          post.tags.length > 0 && `Tags: ${post.tags.join(', ')}`,
        ]),
        ...(post.summary ? ['', `> ${post.summary}`] : []),
        '',
        post.content.trim(),
      ].join('\n'),
    };
  });
}

export function getProbabilityDocs(): ExportDoc[] {
  return getProbabilityProblems().map((problem) => {
    const p = paths('probability', problem.slug);
    return {
      section: 'probability',
      slug: problem.slug,
      title: problem.title,
      summary: excerpt(problem.problem),
      ...p,
      markdown: [
        header(problem.title, p.htmlPath, [
          problem.topics.length > 0 && `Topics: ${problem.topics.join(', ')}`,
        ]),
        '',
        '## Problem',
        '',
        problem.problem,
        '',
        '## Solution',
        '',
        problem.solution,
      ].join('\n'),
    };
  });
}

function codeBlock(language: string, code?: string): string[] {
  return code ? ['', '## Code', '', '```' + language.toLowerCase(), code.trimEnd(), '```'] : [];
}

export function getCSESDocs(): ExportDoc[] {
  return getCSESEntries().map((entry) => {
    const p = paths('cses', entry.slug);
    const topics = entry.topics?.length ? entry.topics : entry.topic ? [entry.topic] : [];
    return {
      section: 'cses',
      slug: entry.slug,
      title: entry.problemName,
      summary: entry.keyIdea || `CSES problem: ${entry.problemName}`,
      ...p,
      markdown: [
        header(`${entry.problemName} (CSES)`, p.htmlPath, [
          entry.difficulty && `Difficulty: ${entry.difficulty}`,
          topics.length > 0 && `Topics: ${topics.join(', ')}`,
          `Language: ${entry.language}`,
          entry.github && `Code on GitHub: ${entry.github}`,
        ]),
        ...(entry.keyIdea ? ['', `Key idea: ${entry.keyIdea}`] : []),
        ...codeBlock(entry.language, entry.codeSnippet),
        '',
        entry.content.trim(),
      ].join('\n'),
    };
  });
}

/** The USACO importer filled keyIdea with a placeholder; treat that as absent. */
export function usacoKeyIdea(keyIdea: string): string | undefined {
  return keyIdea && keyIdea !== 'Solution implementation' ? keyIdea : undefined;
}

export function getUSACODocs(): ExportDoc[] {
  return getUSACOEntries().map((entry) => {
    const p = paths('usaco', entry.slug);
    const keyIdea = usacoKeyIdea(entry.keyIdea);
    return {
      section: 'usaco',
      slug: entry.slug,
      title: entry.problemName,
      summary: [`${entry.contest} solution in ${entry.language}`, keyIdea].filter(Boolean).join('. '),
      ...p,
      markdown: [
        header(`${entry.problemName} (USACO)`, p.htmlPath, [
          entry.contest && `Contest: ${entry.contest}`,
          entry.difficulty && `Difficulty: ${entry.difficulty}`,
          `Language: ${entry.language}`,
        ]),
        ...(keyIdea ? ['', `Key idea: ${keyIdea}`] : []),
        ...codeBlock(entry.language, entry.codeSnippet),
        '',
        entry.content.trim(),
      ].join('\n'),
    };
  });
}

export function getAllDocs(): ExportDoc[] {
  return [...getBlogDocs(), ...getProbabilityDocs(), ...getCSESDocs(), ...getUSACODocs()];
}

export function markdownResponse(body: string): Response {
  return new Response(body.trimEnd() + '\n', {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
