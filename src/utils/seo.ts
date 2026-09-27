export const SITE_URL = 'https://thealphajas.github.io';
export const AUTHOR_NAME = 'Jasmer Singh Sanjotra';

const author = { '@type': 'Person', name: AUTHOR_NAME, url: `${SITE_URL}/` };

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

// Enough TeX-to-text to make a search snippet readable. Anything not listed
// here is dropped rather than leaking backslashes into the description.
const TEX_SYMBOLS: Record<string, string> = {
  times: '×', cdot: '·', le: '≤', leq: '≤', ge: '≥', geq: '≥', neq: '≠', ne: '≠',
  dots: '…', ldots: '…', cdots: '…', infty: '∞', in: '∈', cap: '∩', cup: '∪',
  sim: '~', approx: '≈', to: '→', Omega: 'Ω', beta: 'β', lambda: 'λ', mu: 'μ',
  sigma: 'σ', theta: 'θ', pi: 'π', alpha: 'α',
  min: 'min', max: 'max', log: 'log', ln: 'ln', exp: 'exp', gcd: 'gcd', Pr: 'Pr',
};

// X_1 reads fine as "X1", but X_{N-1} needs brackets to stay unambiguous.
const script = (mark: string) => (_: string, body: string) =>
  /^\w+$/.test(body) ? (mark === '_' ? body : `${mark}${body}`) : `${mark}(${body})`;

function texToText(tex: string): string {
  return tex
    .replace(/\\(?:text|mathrm|mathbb|mathbf|operatorname)\{([^{}]*)\}/g, '$1')
    .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2')
    .replace(/\\[dt]?binom\{([^{}]*)\}\{([^{}]*)\}/g, 'C($1; $2)')
    .replace(/\\\{/g, '\u0001')
    .replace(/\\\}/g, '\u0002')
    .replace(/\\([A-Za-z]+)/g, (_, cmd: string) => (cmd in TEX_SYMBOLS ? `${TEX_SYMBOLS[cmd]} ` : ''))
    .replace(/_\{([^{}]*)\}/g, script('_'))
    .replace(/\^\{([^{}]*)\}/g, script('^'))
    .replace(/_(?!\()/g, '')
    .replace(/[{}]/g, '')
    .replace(/\u0001/g, '{')
    .replace(/\u0002/g, '}')
    .replace(/\s+([,)\]}])/g, '$1')
    .replace(/([({[])\s+/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Plain-text summary of a Markdown body, cut at a word boundary. */
export function excerpt(markdown: string, maxLength = 160): string {
  const text = markdown
    .replace(/^.*Original Problem Link.*$/gim, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, tex: string) => texToText(tex))
    .replace(/\$([^$]+)\$/g, (_, tex: string) => texToText(tex))
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(#{1,6}|>|-{3,})\s*/gm, '')
    .replace(/[*`]/g, '')
    .replace(/(^|[\s(])_([^_\n]+)_(?=[\s.,;:!?)]|$)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:]+$/, '')}…`;
}

const PROBLEM_SOURCES: [RegExp, string][] = [
  [/quantguide\.io/, 'QuantGuide'],
  [/brainstellar\.com/, 'Brainstellar'],
];

/** Where a puzzle came from, judged by the link in its statement, if known. */
export function problemSource(markdown: string): string | undefined {
  return PROBLEM_SOURCES.find(([pattern]) => pattern.test(markdown))?.[1];
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function articleLd(opts: {
  type?: 'Article' | 'BlogPosting' | 'TechArticle';
  headline: string;
  description: string;
  path: string;
  keywords?: string[];
  datePublished?: Date;
  dateModified?: Date;
  markdownPath?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'Article',
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntityOfPage: absoluteUrl(opts.path),
    author,
    publisher: author,
    inLanguage: 'en',
    ...(opts.keywords?.length && { keywords: opts.keywords.join(', ') }),
    ...(opts.datePublished && { datePublished: opts.datePublished.toISOString() }),
    ...((opts.dateModified ?? opts.datePublished) && {
      dateModified: (opts.dateModified ?? opts.datePublished)!.toISOString(),
    }),
    ...(opts.markdownPath && {
      encoding: {
        '@type': 'MediaObject',
        encodingFormat: 'text/markdown',
        contentUrl: absoluteUrl(opts.markdownPath),
      },
    }),
  };
}

export function collectionLd(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    author,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}
