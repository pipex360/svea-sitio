/**
 * GitHub Pages sirve el proyecto en /<repo>/, no en la raíz.
 * Este paso reescribe las rutas absolutas de dist/ para esa subcarpeta.
 * Sólo se usa en la vista de GitHub Pages; el sitio de producción va en la raíz.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';

const BASE = process.argv[2] || '/svea-web';
let tocados = 0;

function recorrer(dir) {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) { recorrer(p); continue; }
    if (!/\.(html|xml)$/.test(f)) continue;
    const s = readFileSync(p, 'utf8');
    // href="/algo" y src="/algo" → href="/<repo>/algo"   (no toca "//" ni URLs absolutas)
    const s2 = s.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);
    if (s2 !== s) { writeFileSync(p, s2); tocados++; }
  }
}

recorrer('dist');
console.log(`rutas reescritas a ${BASE}/ en ${tocados} archivos`);
