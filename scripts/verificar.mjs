/**
 * Control de calidad del sitio construido.
 *
 * Compara dist/ contra las fuentes del repositorio (el CSV de Rank Math y el
 * inventario literal de formularios). Falla cerrado: si algo de la lista roja
 * no coincide, sale con código 1 y no se publica.
 *
 *   node scripts/verificar.mjs
 */
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import paginas from '../src/data/paginas.json' with { type: 'json' };

const DIST = 'dist';
const fallos = [];
const avisos = [];
let checks = 0;

const falla = (ruta, msg) => fallos.push(`${ruta}  ${msg}`);
const ok = () => checks++;

const cuenta = (html, re) => (html.match(re) || []).length;
const saca = (html, re) => { const m = html.match(re); return m ? m[1] : null; };

const archivoDe = (ruta) =>
  path.join(DIST, ruta === '/' ? 'index.html' : ruta.replace(/^\//, '') + 'index.html');

for (const p of paginas) {
  const f = archivoDe(p.ruta);
  try { await access(f); } catch { falla(p.ruta, '✗ no se generó el archivo'); continue; }
  const html = await readFile(f, 'utf8');

  // --- una sola etiqueta de cada cosa (arreglo 3 del plan) ---
  for (const [nombre, re] of [
    ['<title>', /<title[ >]/g],
    ['meta description', /<meta[^>]+name="description"/g],
    ['meta robots', /<meta[^>]+name="robots"/g],
    ['canonical', /<link[^>]+rel="canonical"/g],
  ]) {
    const n = cuenta(html, re);
    if (n !== 1) falla(p.ruta, `✗ ${nombre}: hay ${n}, debe haber 1`); else ok();
  }

  // --- robots y canonical exactos ---
  const robots = saca(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/);
  if (robots !== p.robots) falla(p.ruta, `✗ robots "${robots}" ≠ "${p.robots}"`); else ok();

  const canon = saca(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/);
  if (canon !== p.canonical) falla(p.ruta, `✗ canonical "${canon}" ≠ "${p.canonical}"`); else ok();

  // --- medición (lista roja R1) ---
  if (!html.includes('GTM-NGVMRNDM')) falla(p.ruta, '✗ falta el contenedor GTM'); else ok();

  // --- formularios: byte a byte en lo que importa (R2, R3, R4) ---
  for (const form of p.formularios) {
    if (!html.includes(`id="${form.id}"`)) { falla(p.ruta, `✗ falta el formulario ${form.id}`); continue; }
    ok();
    if (!html.includes('action="https://api.web3forms.com/submit"')) falla(p.ruta, '✗ action de Web3Forms'); else ok();

    for (const h of form.ocultos) {
      const re = new RegExp(`<input[^>]*type="hidden"[^>]*name="${h.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`);
      const tag = html.match(re)?.[0];
      if (!tag) { falla(p.ruta, `✗ ${form.id}: falta el oculto ${h.name}`); continue; }
      const val = saca(tag, /value="([^"]*)"/) ?? '';
      if (val !== h.value) falla(p.ruta, `✗ ${form.id}: ${h.name}="${val}" ≠ "${h.value}"`); else ok();
      if (h.id && !tag.includes(`id="${h.id}"`)) falla(p.ruta, `✗ ${form.id}: el oculto ${h.name} perdió id="${h.id}"`); else ok();
    }

    for (const c of form.visibles) {
      if (!html.includes(`name="${c.name}"`)) falla(p.ruta, `✗ ${form.id}: falta el campo "${c.name}"`); else ok();
    }

    for (const [campo, opciones] of Object.entries(form.opciones)) {
      for (const o of opciones) {
        if (o.value && !html.includes(`value="${o.value}"`))
          falla(p.ruta, `✗ ${form.id}: falta la opción "${o.value}" de ${campo}`);
        else ok();
      }
    }
  }

  // --- landings: conversión y prefijo de asunto que lee n8n (R6, R8) ---
  const med = p.medicion;
  if (med) {
    for (const trozo of [
      'AW-16836158536/086iCJjJlsobEMjIjdw-',
      'AW-16836158536/9SA2CNy8qcobEMjIjdw-',
      'G-FWQ05WDLZ3',
      'user_data',
      'form_submit_cotizacion',
    ]) {
      if (!html.includes(trozo)) falla(p.ruta, `✗ falta en la medición: ${trozo}`); else ok();
    }
    if (med.prefijo_asunto && !html.includes(med.prefijo_asunto))
      falla(p.ruta, `✗ falta el prefijo de asunto "${med.prefijo_asunto}"`);
    else ok();
    if (med.subject_id && !html.includes(med.subject_id) && p.formularios.length)
      falla(p.ruta, `✗ falta el id del asunto ${med.subject_id}`);
    else ok();
  }

  // --- WhatsApp: número y formato (R11) ---
  if (!html.includes('api.whatsapp.com/send?phone=56929947924')) falla(p.ruta, '✗ enlace de WhatsApp'); else ok();

  // --- peso ---
  const kb = Buffer.byteLength(html) / 1024;
  if (kb > 100) avisos.push(`${p.ruta}  HTML de ${kb.toFixed(0)} KB`);
}

// --- /gracias/ lleva la conversión de respaldo (anexo F) ---
const gracias = await readFile(path.join(DIST, 'gracias/index.html'), 'utf8');
if (!gracias.includes("'currency': 'CLP'")) falla('/gracias/', '✗ falta la conversión de respaldo'); else ok();
if (!gracias.includes('noindex')) falla('/gracias/', '✗ debe ser noindex (arreglo 6)'); else ok();

// --- sitemap: ninguna noindex adentro ---
const sitemap = await readFile(path.join(DIST, 'sitemap_index.xml'), 'utf8');
for (const p of paginas.filter((x) => x.robots.includes('noindex')))
  if (sitemap.includes(p.canonical)) falla(p.ruta, '✗ una noindex está en el sitemap'); else ok();
const enSitemap = (sitemap.match(/<loc>/g) || []).length;

console.log(`\n${paginas.length} páginas · ${checks} comprobaciones`);
console.log(`sitemap: ${enSitemap} URLs indexables\n`);
if (avisos.length) { console.log('avisos:'); for (const a of avisos) console.log('  ·', a); console.log(); }
if (fallos.length) {
  console.log(`FALLA — ${fallos.length} problemas:`);
  for (const f of fallos) console.log('  ', f);
  process.exit(1);
}
console.log('OK · la lista roja llegó intacta al sitio construido');
