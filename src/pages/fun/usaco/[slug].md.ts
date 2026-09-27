import type { APIRoute } from 'astro';
import { getUSACODocs, markdownResponse, type ExportDoc } from '../../../utils/markdown-export';

// Raw Markdown twin of /fun/usaco/[slug]/, linked from that page's <head>.
export function getStaticPaths() {
  return getUSACODocs().map((doc) => ({ params: { slug: doc.slug }, props: { doc } }));
}

export const GET: APIRoute = ({ props }) => markdownResponse((props.doc as ExportDoc).markdown);
