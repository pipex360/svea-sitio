/**
 * Control del build de PRODUCCIÓN (el que va a sveaconsultores.cl).
 *
 * Es el reverso de scripts/verificar.mjs: aquí lo que falla es que el build
 * haya salido como copia de trabajo. Si el hosting construyó con `npm run
 * build` en vez de `npm run build:produccion`, el sitio saldría sin medición,
 * con los formularios apagados y bloqueado a Google: esto lo detecta.
 *
 *   node scripts/verificar-produccion.mjs [carpeta]      (por defecto dist)
 *
 * Falla si:
 *   · robots.txt tiene un Disallow (o no existe, o no nombra el sitemap)
 *   · alguna página trae «aviso-copia» o «COPIA DE TRABAJO»
 *   · alguna página (404 incluida) no trae GTM-NGVMRNDM
 *   · algún <form> tiene action="#" (o onsubmit="return false")
 *   · TODAS las páginas salen noindex (señal de que es el build de la copia)
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const DIST = process.argv[2] || 'dist';
const fallos = [];
let revisadas = 0;

if (!existsSync(DIST)) {
  console.log(`FALLA — no existe la carpeta ${DIST}`);
  process.exit(1);
}

// robots.txt
const robots = path.join(DIST, 'robots.txt');
if (!existsSync(robots)) fallos.push('robots.txt  ✗ no existe');
else {
  const r = readFileSync(robots, 'utf8');
  if (/^\s*Disallow\s*:/im.test(r)) fallos.push('robots.txt  ✗ tiene Disallow (es el de la copia de trabajo)');
  if (!/^\s*Allow\s*:\s*\/\s*$/im.test(r)) fallos.push('robots.txt  ✗ falta «Allow: /»');
  if (!/^\s*Sitemap\s*:\s*https:\/\/sveaconsultores\.cl\//im.test(r)) fallos.push('robots.txt  ✗ no nombra el sitemap');
}
if (!existsSync(path.join(DIST, 'sitemap-index.xml'))) fallos.push('sitemap-index.xml  ✗ no se generó');

const htmls = [];
const recorrer = (d) => {
  for (const n of readdirSync(d)) {
    const f = path.join(d, n);
    if (statSync(f).isDirectory()) recorrer(f);
    else if (n.endsWith('.html')) htmls.push(f);
  }
};
recorrer(DIST);

let indexables = 0;
for (const f of htmls) {
  const rel = '/' + path.relative(DIST, f).replace(/index\.html$/, '');
  const html = readFileSync(f, 'utf8');
  revisadas++;
  if (/aviso-copia|COPIA DE TRABAJO/.test(html)) fallos.push(`${rel}  ✗ trae el aviso de copia de trabajo`);
  if (!html.includes('GTM-NGVMRNDM')) fallos.push(`${rel}  ✗ falta el GTM-NGVMRNDM`);
  for (const form of html.match(/<form\b[^>]*>/g) || []) {
    if (/\saction="#"/.test(form)) fallos.push(`${rel}  ✗ un formulario con action="#": ${form.slice(0, 90)}`);
    else if (/onsubmit="return false"|data-copia=/.test(form)) fallos.push(`${rel}  ✗ un formulario desactivado: ${form.slice(0, 90)}`);
  }
  if (!/name="robots"[^>]*content="[^"]*noindex/.test(html)) indexables++;
}
if (htmls.length && !indexables) fallos.push('todas las páginas  ✗ van noindex (¿build de la copia?)');

console.log(`\n${DIST} · ${revisadas} páginas HTML · ${indexables} indexables`);
if (fallos.length) {
  console.log(`\nFALLA — ${fallos.length} problemas (¿se construyó con npm run build en vez de build:produccion?):`);
  for (const x of fallos) console.log('  ', x);
  process.exit(1);
}
console.log('OK · build de producción: robots abierto, sin aviso de copia, GTM en todas y formularios que envían\n');
