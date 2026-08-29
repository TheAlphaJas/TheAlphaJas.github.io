import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';

/**
 * Renders Markdown content with math support (KaTeX) and syntax-highlighted
 * code fences (Prism, via rehype-prism-plus).
 */
export async function renderMarkdown(content: string): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex, { output: 'html' })
    // rehype-prism-plus ships types that don't line up with this unified
    // version's `.use()` overloads; it still works fine at runtime.
    .use(rehypePrism as any, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const result = await processor.process(content);
  return result.toString();
}

