/**
 * Control de calidad de la copia de trabajo.
 *
 * La copia debe verse igual que el sitio real, pero no debe poder tocarlo.
 * Esto falla cerrado si algo se escapa: una etiqueta de medición, un
 * formulario que envía, o una página indexable.
 *
 *   node scripts/verificar.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import paginas from '../src/data/paginas.json' with { type: 'json' };

const DIST = 'dist';
const fallos = [];
let checks = 0;

const MEDICION = [
  'GTM-NGVMRNDM', 'AW-16836158536', 'G-FWQ05WDLZ3', 'GT-5MGVDP76',
  'googletagmanager', 'google-analytics', 'monsterinsights',
];

// la landing nueva todavía no existe en el sitio actual
const esperadas = paginas.filter((p) => p.ruta !== '/cotiza-autorizacion-transporte-residuos/');

for (const p of esperadas) {
  const f = path.join(DIST, p.ruta === '/' ? 'index.html' : p.ruta.replace(/^\//, '') + 'index.html');
  if (!existsSync(f)) { fallos.push(`${p.ruta}  ✗ no se generó`); continue; }
  checks++;
  const html = readFileSync(f, 'utf8');

  // 1. nada de medición
  for (const m of MEDICION) {
    if (html.toLowerCase().includes(m.toLowerCase())) fallos.push(`${p.ruta}  ✗ quedó "${m}"`);
    else checks++;
  }

  // 2. ningún formulario que envíe de verdad
  if (/action="https:\/\/api\.web3forms\.com/.test(html)) fallos.push(`${p.ruta}  ✗ un formulario todavía envía`);
  else checks++;

  // 3. no indexable
  if (!/name="robots"\s+content="noindex, nofollow"/.test(html)) fallos.push(`${p.ruta}  ✗ falta el noindex`);
  else checks++;
  if ((html.match(/name="robots"/g) || []).length !== 1) fallos.push(`${p.ruta}  ✗ hay más de un robots`);
  else checks++;

  // 4. las copias siguen apuntando al CSS del sitio real: si no, no se ven
  // igual. La portada es la excepción: es propia, y lo que se comprueba es lo
  // contrario —que no cargue nada del WordPress ni de CDN, y que sirva sus
  // fuentes y las fotos del hero desde el sitio—.
  if (p.ruta === '/' || p.ruta === '/calificacion-tecnica-industrial/') {
    const ajenos = html.match(/(?:src|href)="https?:\/\/[^"]*(?:wp-content|wp-includes|cdn\.tailwindcss\.com|code\.iconify\.design|fonts\.googleapis\.com)[^"]*"/g) || [];
    if (ajenos.length) fallos.push(`${p.ruta}  ✗ la portada aún carga del WordPress o de CDN: ${ajenos.slice(0, 3).join(' ')}`);
    else checks++;
    if (!/\/fonts\/inter-variable-latin\.woff2/.test(html) || !/\/img\/hero\//.test(html)) fallos.push(`${p.ruta}  ✗ no sirve sus fuentes o las fotos del hero desde el sitio`);
    else checks++;
  } else if (!html.includes('sveaconsultores.cl/wp-content')) fallos.push(`${p.ruta}  ✗ perdió los recursos del sitio original`);
  else checks++;
}

// robots.txt bloquea todo
const robots = path.join(DIST, 'robots.txt');
if (!existsSync(robots) || !readFileSync(robots, 'utf8').includes('Disallow: /'))
  fallos.push('robots.txt  ✗ debe bloquear todo');
else checks++;

console.log(`\n${esperadas.length} páginas · ${checks} comprobaciones`);
// 5. LISTA ROJA de los formularios: lo que lee Web3Forms y el flujo
// de n8n tiene que ser idéntico al del WordPress. Se compara la huella del
// <form id="form-home"> construido con la del original: campos ocultos con
// su valor, campos visibles con name/type/required, y las opciones del
// select en su orden. La ropa (clases, etiquetas) no entra en la huella.
function huellaFormulario(html, id) {
  const m = html.match(new RegExp(`<form\\b[^>]*id="${id}"[^>]*>([\\s\\S]*?)</form>`));
  if (!m) return null;
  const cuerpo = m[1];
  const attr = (tag, n) => (tag.match(new RegExp(`\\s${n}="([^"]*)"`)) || [])[1];
  const tiene = (tag, n) => new RegExp(`\\s${n}(?:=""|(?=[\\s>/]))`).test(tag);
  const ocultos = {};
  const visibles = [];
  for (const tag of cuerpo.match(/<(?:input|select|textarea)\b[^>]*>/g) || []) {
    const name = attr(tag, 'name');
    if (!name) continue;
    const type = tag.startsWith('<select') ? 'select' : tag.startsWith('<textarea') ? 'textarea' : attr(tag, 'type') || 'text';
    if (type === 'hidden') ocultos[name] = attr(tag, 'value');
    else if (name === 'botcheck') ocultos.botcheck = type;
    else visibles.push(`${name}:${type}:${tiene(tag, 'required') ? 'req' : 'opt'}`);
  }
  const opciones = (cuerpo.match(/<option\b[^>]*value="([^"]*)"/g) || []).map((o) => attr(o, 'value'));
  return JSON.stringify({ ocultos, visibles, opciones });
}
for (const [ruta, id, origen, destino] of [
  ['/', 'form-home', 'originales-wp/home.html', 'index.html'],
  ['/calificacion-tecnica-industrial/', 'form-cti', 'originales-wp/servicios/calificacion-tecnica-industrial.html', 'calificacion-tecnica-industrial/index.html'],
]) {
  const original = huellaFormulario(readFileSync(origen, 'utf8'), id);
  const construido = huellaFormulario(readFileSync(path.join(DIST, destino), 'utf8'), id);
  if (!original || !construido) fallos.push(`${ruta}  ✗ no se encontró el ${id} (original o construido)`);
  else if (original !== construido) fallos.push(`${ruta}  ✗ la lista roja de ${id} cambió\n     original:   ${original}\n     construido: ${construido}`);
  else checks++;
}

// 6. Las páginas rehechas enteras no pueden perder texto. El brief lo pone en
// la lista roja: «el texto de artículos y páginas de servicio se conserva o
// crece, nunca se resume». Se comparan las palabras del contenido del
// original con las de la página construida; las de la cabecera y el pie del
// WordPress quedan fuera porque ésos sí se rehicieron.
/** Quita scripts, estilos y comentarios. Se hace antes de recortar: si se
 *  recorta primero, media hoja de estilos entra como si fuera texto. */
function sinCodigo(html) {
  return html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '');
}

function palabras(limpio, desde = 0, hasta = limpio.length) {
  const texto = limpio
    .slice(desde, hasta)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"').replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ').replace(/&[a-z#0-9]+;/gi, ' ');
  return new Set(
    (texto.toLowerCase().match(/[a-záéíóúüñ0-9][a-záéíóúüñ0-9.\-/]{2,}/g) || [])
      .map((w) => w.replace(/[.\-/]+$/, '')),
  );
}

{
  const orig = sinCodigo(readFileSync('originales-wp/servicios/calificacion-tecnica-industrial.html', 'utf8'));
  // sólo el contenido: desde el bloque de entrada hasta antes del pie
  // desde el final de la etiqueta que abre el contenido, para que sus clases
  // no cuenten como texto; hasta donde empieza el pie del WordPress, que se
  // rehízo aparte (Footer2) y tiene sus propios enlaces.
  const marca = orig.indexOf('cti-page');
  const desde = marca < 0 ? -1 : orig.indexOf('>', marca) + 1;
  const hasta = orig.indexOf('<section class="elementor-section elementor-top-section elementor-element elementor-element-adbcfcf');
  const antes = palabras(orig, desde, hasta > desde ? hasta : orig.length);
  const ahora = palabras(sinCodigo(readFileSync(path.join(DIST, 'calificacion-tecnica-industrial/index.html'), 'utf8')));
  const perdidas = [...antes].filter((w) => !ahora.has(w));
  if (marca < 0 || hasta < 0) fallos.push('/calificacion-tecnica-industrial/  ✗ no se encontró el contenido del original');
  else if (perdidas.length) {
    fallos.push(`/calificacion-tecnica-industrial/  ✗ se perdieron ${perdidas.length} palabras del original: ${perdidas.slice(0, 12).join(', ')}`);
  } else checks++;
}

if (fallos.length) {
  console.log(`\nFALLA — ${fallos.length} problemas:`);
  for (const f of fallos) console.log('  ', f);
  process.exit(1);
}
console.log('OK · la copia se ve igual y no puede tocar el sitio real\n');
