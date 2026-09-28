/**
 * Genera las variantes de las fotos de contenido del sitio.
 *
 *   node scripts/fotos.mjs            # sólo lo que falta o cambió
 *   node scripts/fotos.mjs --forzar   # todo de nuevo
 *
 * Fuente de verdad: mejoras/fotos/<nombre>.webp|jpg|png — UNA copia por foto,
 * la más grande que se tenga, con nombre descriptivo en español y la palabra
 * clave de la página donde se usa (p.ej. bodega-productos-estudio-carga-
 * combustible). Esa carpeta no se publica.
 *
 * Salida (versionada, la copia preparar-original.mjs a public/img/):
 *   mejoras/img/fotos/<nombre>-<ancho>.avif y .webp   640 / 1080 / 1600 px,
 *                                                     y 1920 en las de hero
 *   mejoras/img/og/<nombre>.jpg                       1200×630 para og:image
 *   src/data/fotos.json                               ancho, alto y anchos
 *                                                     disponibles de cada una:
 *                                                     de ahí salen width/height
 *                                                     y los srcset (src/lib/fotos.ts)
 *
 * Presupuesto por archivo (KB), medido y ajustado bajando la calidad de a
 * cinco hasta calzar; nunca bajo la calidad mínima:
 *   hero (fuente ≥ 1900 px): 640 ≤ 60 · 1080 ≤ 90 · 1600 ≤ 120 · 1920 ≤ 150
 *   resto:                   640 ≤ 45 · 1080 ≤ 90 · 1600 ≤ 130
 *
 * Es idempotente: una variante se rehace sólo si falta o si la fuente es
 * más nueva que ella (o con --forzar). Las variantes de fotos que ya no
 * existen en mejoras/fotos se borran.
 */
import { readdirSync, statSync, existsSync, mkdirSync, unlinkSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const FUENTES = 'mejoras/fotos';
const SALIDA = 'mejoras/img/fotos';
const OG = 'mejoras/img/og';
const MANIFIESTO = 'src/data/fotos.json';
const FORZAR = process.argv.includes('--forzar');

const ANCHOS = [640, 1080, 1600];
const ANCHO_HERO = 1920;
const PRESUPUESTO = {
  hero: { 640: 60, 1080: 90, 1600: 120, 1920: 150 },
  resto: { 640: 45, 1080: 90, 1600: 130 },
};
const CALIDAD = {
  avif: { inicial: 55, minima: 30, paso: 5 },
  webp: { inicial: 74, minima: 40, paso: 6 },
};
const OG_ANCHO = 1200;
const OG_ALTO = 630;

mkdirSync(SALIDA, { recursive: true });
mkdirSync(OG, { recursive: true });

const previo = existsSync(MANIFIESTO) ? JSON.parse(readFileSync(MANIFIESTO, 'utf8')) : {};
const manifiesto = {};
const fuentes = readdirSync(FUENTES)
  .filter((f) => /\.(webp|jpe?g|png)$/i.test(f))
  .sort();

const kb = (bytes) => Math.round(bytes / 1024);

/** Codifica bajando la calidad hasta calzar en el presupuesto. Devuelve {buffer, calidad}. */
async function codificar(base, formato, presupuestoKB) {
  const c = CALIDAD[formato];
  let calidad = c.inicial;
  let buffer;
  for (;;) {
    const s = base.clone();
    buffer = formato === 'avif'
      ? await s.avif({ quality: calidad, effort: 6 }).toBuffer()
      : await s.webp({ quality: calidad, effort: 5 }).toBuffer();
    if (kb(buffer.length) <= presupuestoKB || calidad - c.paso < c.minima) return { buffer, calidad };
    calidad -= c.paso;
  }
}

let hechas = 0;
let saltadas = 0;
const filas = [];
const esperados = new Set();

for (const archivo of fuentes) {
  const nombre = archivo.replace(/\.[^.]+$/, '');
  if (!/^[a-z0-9-]+$/.test(nombre)) throw new Error(`${archivo}: el nombre lleva sólo minúsculas, números y guiones`);
  const ruta = path.join(FUENTES, archivo);
  const st = statSync(ruta);
  const meta = await sharp(ruta).metadata();
  const esHero = meta.width >= 1900;
  const presupuesto = esHero ? PRESUPUESTO.hero : PRESUPUESTO.resto;
  // anchos que no superan la fuente; si la fuente es más chica que el mayor
  // ancho, entra ella misma como tope (no se agranda nada)
  let anchos = [...ANCHOS, ...(esHero ? [ANCHO_HERO] : [])].filter((w) => w <= meta.width);
  if (!anchos.includes(meta.width) && meta.width < (esHero ? ANCHO_HERO : ANCHOS.at(-1))) anchos.push(meta.width);
  anchos.sort((a, b) => a - b);

  const alto = (w) => Math.round((meta.height * w) / meta.width);
  const entrada = { ancho: meta.width, alto: meta.height, anchos, hero: esHero, og: `${nombre}.jpg`, peso: {} };
  const alDia = !FORZAR && previo[nombre] && previo[nombre].origen === `${st.size}:${Math.round(st.mtimeMs)}`;

  for (const w of anchos) {
    for (const formato of ['avif', 'webp']) {
      const destino = path.join(SALIDA, `${nombre}-${w}.${formato}`);
      esperados.add(destino);
      if (alDia && existsSync(destino) && statSync(destino).mtimeMs >= st.mtimeMs) {
        entrada.peso[w] = { ...(entrada.peso[w] || {}), [formato]: kb(statSync(destino).size) };
        saltadas++;
        continue;
      }
      const base = sharp(ruta).resize({ width: w, withoutEnlargement: true });
      const tope = presupuesto[w] ?? (w <= 640 ? presupuesto[640] : w <= 1080 ? presupuesto[1080] : presupuesto[1600]);
      const { buffer, calidad } = await codificar(base, formato, tope);
      writeFileSync(destino, buffer);
      entrada.peso[w] = { ...(entrada.peso[w] || {}), [formato]: kb(buffer.length) };
      filas.push([`${nombre}-${w}.${formato}`, `${w}×${alto(w)}`, `${kb(buffer.length)} KB`, `q${calidad}`, kb(buffer.length) > tope ? `⚠ sobre ${tope}` : '']);
      hechas++;
    }
  }

  // og:image 1200×630, JPEG (lo entienden WhatsApp, LinkedIn y Facebook)
  const destinoOg = path.join(OG, `${nombre}.jpg`);
  esperados.add(destinoOg);
  if (!(alDia && existsSync(destinoOg) && statSync(destinoOg).mtimeMs >= st.mtimeMs)) {
    const buffer = await sharp(ruta)
      .resize({ width: OG_ANCHO, height: OG_ALTO, fit: 'cover', position: 'centre' })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();
    writeFileSync(destinoOg, buffer);
    filas.push([`og/${nombre}.jpg`, `${OG_ANCHO}×${OG_ALTO}`, `${kb(buffer.length)} KB`, 'q78', '']);
    hechas++;
  }

  entrada.origen = `${st.size}:${Math.round(st.mtimeMs)}`;
  manifiesto[nombre] = entrada;
}

// la tarjeta genérica (logo sobre blanco) para las páginas sin foto propia
{
  const destino = path.join(OG, 'svea-consultores.jpg');
  esperados.add(destino);
  const logo = 'mejoras/img/logo-svea.png';
  if (existsSync(logo) && (FORZAR || !existsSync(destino) || statSync(destino).mtimeMs < statSync(logo).mtimeMs)) {
    const marca = await sharp(logo).resize({ width: 640 }).toBuffer();
    const m = await sharp(marca).metadata();
    const buffer = await sharp({ create: { width: OG_ANCHO, height: OG_ALTO, channels: 3, background: '#ffffff' } })
      .composite([{ input: marca, left: Math.round((OG_ANCHO - m.width) / 2), top: Math.round((OG_ALTO - m.height) / 2) }])
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    writeFileSync(destino, buffer);
    filas.push(['og/svea-consultores.jpg', `${OG_ANCHO}×${OG_ALTO}`, `${kb(buffer.length)} KB`, 'q82', '']);
    hechas++;
  }
}

// variantes huérfanas (la fuente ya no existe): fuera
for (const dir of [SALIDA, OG]) {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (!esperados.has(p)) { unlinkSync(p); console.log('borrada (sin fuente):', p); }
  }
}

writeFileSync(MANIFIESTO, JSON.stringify(manifiesto, null, 2) + '\n');

if (filas.length) {
  const anchoCol = filas.reduce((m, f) => Math.max(m, f[0].length), 0);
  for (const f of filas) console.log(f[0].padEnd(anchoCol + 2) + f[1].padEnd(11) + f[2].padStart(8) + '  ' + f[3] + '  ' + f[4]);
}
console.log(`\n${fuentes.length} fotos · ${hechas} archivos generados · ${saltadas} al día · manifiesto en ${MANIFIESTO}`);
