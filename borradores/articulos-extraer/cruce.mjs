import { readFileSync } from 'node:fs';
const REPO = process.env.HOME + '/Desktop/svea-sitio';
const DIST = '/tmp/claude-501/art-dist';
function sinCodigo(html) { return html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, ''); }
function palabras(limpio, desde = 0, hasta = limpio.length) {
  const texto = limpio.slice(desde, hasta).replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"').replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ').replace(/&[a-z#0-9]+;/gi, ' ');
  return new Set((texto.toLowerCase().match(/[a-záéíóúüñ0-9][a-záéíóúüñ0-9.\-/]{2,}/g) || []).map((w) => w.replace(/[.\-/]+$/, '')));
}
const hrefs = (s) => new Set([...s.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;|&#38;/g, '&').replace(/^https:\/\/sveaconsultores\.cl(?=\/)/, '')));
const casos = [
  ...['autorizacion-transporte-residuos-chile','calificacion-inofensiva-seremi-2026','calificacion-tecnica-industrial-chile','estudio-de-carga-combustible-chile','manejo-de-residuos-peligrosos-chile','plan-de-emergencia-condominio-chile','plan-de-emergencia-ds-44-empresas-chile','plan-de-emergencia-empresa-chile','que-es-informe-sanitario']
    .map((s) => [s, `originales-wp/articulos/${s}.html`, '<header class="article-hero">', '<div class="sticky-bottom-cta"']),
  ['blog', 'originales-wp/servicios/blog.html', '<header class="hero">', '</main>'],
];
for (const [slug, archivo, ini, fin] of casos) {
  const orig = sinCodigo(readFileSync(`${REPO}/${archivo}`, 'utf8'));
  const a = orig.indexOf(ini), b = orig.indexOf(fin, a);
  const antes = palabras(orig, a + ini.length, b);
  const html = readFileSync(`${DIST}/${slug}/index.html`, 'utf8');
  const ahora = palabras(sinCodigo(html));
  const perdidas = [...antes].filter((w) => !ahora.has(w));
  // enlaces del contenido
  const hOrig = hrefs(orig.slice(a, b)), hNew = hrefs(html);
  const faltanH = [...hOrig].filter((h) => !hNew.has(h));
  // h2/h3
  const tit = (s) => [...s.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase());
  const tNew = new Set(tit(html)); const faltanT = tit(orig.slice(a, b)).filter((t) => !tNew.has(t));
  const alts = (s) => new Set([...s.matchAll(/alt="([^"]*)"/g)].map((m) => m[1]).filter(Boolean));
  const faltanA = [...alts(orig.slice(a, b))].filter((x) => !alts(html).has(x));
  console.log(`${slug}: ${antes.size} palabras · perdidas ${perdidas.length}: ${perdidas.join(', ')}`);
  if (faltanH.length) console.log('   enlaces que faltan:', faltanH);
  if (faltanT.length) console.log('   títulos h2/h3 que faltan:', faltanT);
  if (faltanA.length) console.log('   alt que faltan:', faltanA);
}
