// El robots.txt del sitio actual apunta a /sitemap_index.xml: se conserva ese
// nombre para no invalidar lo que Search Console ya conoce.
// Quedan fuera las landings /cotiza-*, /gracias/ y cualquier noindex.
import type { APIRoute } from 'astro';
import paginas from '../data/paginas.json';

export const GET: APIRoute = () => {
  const urls = paginas
    .filter((p) => !p.robots.includes('noindex'))
    .map((p) => `  <url><loc>${p.canonical}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
