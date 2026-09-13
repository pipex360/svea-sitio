// Convierte las imágenes originales del WordPress a WebP con el presupuesto del plan:
// hero <=150 KB, resto <=60 KB. Baja la calidad por pasos hasta cumplir.
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ORIG = 'originales', DEST = 'src/assets/img';
const ANCHO_MAX = 1600, TOPE_HERO = 150 * 1024, TOPE_RESTO = 60 * 1024;
// las que se usan como hero/fondo de portada llevan el presupuesto alto
const HERO = /california-renewable|chemical-oil-refinery|aerial-view-of-logistic|industry-factory|chemical-plant|warehouse-products|empty-warehouse|aerial-view|petrochemical|truck-with-excavator|gaseous/i;

await mkdir(DEST, { recursive: true });
const files = (await readdir(ORIG)).filter(f => /\.(jpe?g|png)$/i.test(f));
let antes = 0, despues = 0;
const filas = [];

for (const f of files) {
  const src = path.join(ORIG, f);
  const pesoAntes = (await stat(src)).size;
  const tope = HERO.test(f) ? TOPE_HERO : TOPE_RESTO;
  const meta = await sharp(src).metadata();
  const ancho = Math.min(meta.width ?? ANCHO_MAX, ANCHO_MAX);
  let buf, q = 82;
  for (; q >= 40; q -= 6) {
    buf = await sharp(src).resize({ width: ancho, withoutEnlargement: true })
                          .webp({ quality: q, effort: 6 }).toBuffer();
    if (buf.length <= tope) break;
  }
  const out = path.join(DEST, f.replace(/\.(jpe?g|png)$/i, '.webp'));
  await sharp(buf).toFile(out);
  antes += pesoAntes; despues += buf.length;
  filas.push({ archivo: f, antes: pesoAntes, despues: buf.length, q, ancho, cumple: buf.length <= tope });
}

filas.sort((a, b) => b.antes - a.antes);
const kb = n => (n / 1024).toFixed(0).padStart(5) + ' KB';
for (const r of filas.slice(0, 10))
  console.log(`${kb(r.antes)} → ${kb(r.despues)}  q${r.q}  ${r.cumple ? '  ' : '⚠ '} ${r.archivo.slice(0, 52)}`);
console.log(`\n${filas.length} imágenes · ${(antes/1048576).toFixed(1)} MB → ${(despues/1048576).toFixed(2)} MB · ahorro ${(100-despues/antes*100).toFixed(1)} %`);
const malas = filas.filter(r => !r.cumple);
if (malas.length) console.log('Sobre el presupuesto:', malas.map(m => m.archivo).join(', '));
