import { readFileSync } from 'node:fs';
const REPO = process.env.HOME + '/Desktop/svea-sitio';
function huellaFormulario(html, id) {
  const m = html.match(new RegExp(`<form\\b[^>]*id="${id}"[^>]*>([\\s\\S]*?)</form>`));
  if (!m) return null;
  const cuerpo = m[1];
  const attr = (tag, n) => (tag.match(new RegExp(`\\s${n}="([^"]*)"`)) || [])[1];
  const tiene = (tag, n) => new RegExp(`\\s${n}(?:=""|(?=[\\s>/]))`).test(tag);
  const ocultos = {}; const visibles = [];
  for (const tag of cuerpo.match(/<(?:input|select|textarea)\b[^>]*>/g) || []) {
    const name = attr(tag, 'name'); if (!name) continue;
    const type = tag.startsWith('<select') ? 'select' : tag.startsWith('<textarea') ? 'textarea' : attr(tag, 'type') || 'text';
    if (type === 'hidden') ocultos[name] = attr(tag, 'value');
    else if (name === 'botcheck') ocultos.botcheck = type;
    else visibles.push(`${name}:${type}:${tiene(tag, 'required') ? 'req' : 'opt'}`);
  }
  const opciones = (cuerpo.match(/<option\b[^>]*value="([^"]*)"/g) || []).map((o) => attr(o, 'value'));
  return JSON.stringify({ ocultos, visibles, opciones });
}
for (const s of ['autorizacion-transporte-residuos-chile','calificacion-inofensiva-seremi-2026','calificacion-tecnica-industrial-chile','estudio-de-carga-combustible-chile','manejo-de-residuos-peligrosos-chile','plan-de-emergencia-condominio-chile','plan-de-emergencia-ds-44-empresas-chile','plan-de-emergencia-empresa-chile','que-es-informe-sanitario']) {
  const o = huellaFormulario(readFileSync(`${REPO}/originales-wp/articulos/${s}.html`, 'utf8'), 'article-lead-form');
  const html = readFileSync(`/tmp/claude-501/art-dist/${s}/index.html`, 'utf8');
  const c = huellaFormulario(html, 'article-lead-form');
  const extra = [];
  if (!/name="robots" content="noindex, nofollow"/.test(html)) extra.push('SIN NOINDEX');
  if (/action="https:\/\/api\.web3forms/.test(html)) extra.push('FORM ENVÍA');
  if (/GTM-NGVMRNDM|googletagmanager|wp-content/.test(html)) extra.push('medición/wp-content');
  const ids = [...html.matchAll(/id="(dynamic-subject[^"]*|art-[a-z]+)"/g)].map((m) => m[1]);
  console.log(s, o === c ? 'huella OK' : `DIFIERE\n  o=${o}\n  c=${c}`, extra.join(' '), ids.join(','));
}
