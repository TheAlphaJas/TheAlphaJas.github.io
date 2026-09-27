import type { APIRoute } from 'astro';
import { getCSESDocs, markdownResponse, type ExportDoc } from '../../../utils/markdown-export';

// Raw Markdown twin of /fun/cses/[slug]/, linked from that page's <head>.
export function getStaticPaths() {
  return getCSESDocs().map((doc) => ({ params: { slug: doc.slug }, props: { doc } }));
}

export const GET: APIRoute = ({ props }) => markdownResponse((props.doc as ExportDoc).markdown);
