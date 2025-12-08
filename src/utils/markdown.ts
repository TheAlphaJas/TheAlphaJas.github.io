import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

/**
 * Renders Markdown content with math support (KaTeX)
 */
export async function renderMarkdown(content: string): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex, { output: 'html' })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const result = await processor.process(content);
  return result.toString();
}

