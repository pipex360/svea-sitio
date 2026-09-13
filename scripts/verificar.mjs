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

  // 4. sigue apuntando al CSS del sitio real: si no, no se ve igual
  if (!html.includes('sveaconsultores.cl/wp-content')) fallos.push(`${p.ruta}  ✗ perdió los recursos del sitio original`);
  else checks++;
}

// robots.txt bloquea todo
const robots = path.join(DIST, 'robots.txt');
if (!existsSync(robots) || !readFileSync(robots, 'utf8').includes('Disallow: /'))
  fallos.push('robots.txt  ✗ debe bloquear todo');
else checks++;

console.log(`\n${esperadas.length} páginas · ${checks} comprobaciones`);
if (fallos.length) {
  console.log(`\nFALLA — ${fallos.length} problemas:`);
  for (const f of fallos) console.log('  ', f);
  process.exit(1);
}
console.log('OK · la copia se ve igual y no puede tocar el sitio real\n');
