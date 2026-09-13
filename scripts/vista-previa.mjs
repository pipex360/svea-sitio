/**
 * Arma una vista previa autocontenida del hero para revisarla fuera de casa.
 * Incrusta las imágenes como data: URI y quita GTM y el envío del formulario:
 * es una maqueta para mirar, no debe generar leads ni tocar la medición.
 */
import { readFileSync, writeFileSync, statSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');

// --- hero completo (incluye su <header> interno) ---
const ini = html.indexOf('<section class="hero"');
const fin = html.indexOf('</section>', html.indexOf('</header>', ini)) + '</section>'.length;
let hero = html.slice(ini, fin);

// --- CSS: la hoja base + el bloque incrustado de la home ---
const hojaRuta = html.match(/<link rel="stylesheet" href="(\/_astro\/[^"]+)"/)[1];
const cssBase = readFileSync('dist' + hojaRuta, 'utf8');
const cssHome = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');

// --- imágenes a data: URI ---
let kb = 0;
hero = hero.replace(/(src|srcset)="([^"]+)"/g, (todo, attr, valor) => {
  if (attr === 'srcset') return '';                 // el srcset apunta a archivos; sobra
  if (!valor.startsWith('/_astro/')) return todo;
  const buf = readFileSync('dist' + valor);
  kb += buf.length / 1024;
  return `src="data:image/webp;base64,${buf.toString('base64')}"`;
});

// --- el formulario no existe en la vista previa, pero por si acaso ---
hero = hero.replace(/action="https:\/\/api\.web3forms\.com\/submit"/g, 'data-preview="sin-envio"');

const salida = `<title>Hero SVEA · vista previa</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@300;400;600;700&display=swap">
<style>
${cssBase}
${cssHome}
/* sólo para la vista previa: el hero ocupa la pantalla y no hay <main> alrededor */
body { margin: 0; background: #000; }
.hero { margin: 0 !important; width: 100% !important; }
.nota {
  background: var(--fondo-2); color: var(--texto);
  font: 400 14.5px/1.6 Inter, system-ui, sans-serif;
  padding: 22px 20px 30px;
}
.nota-caja { max-width: 680px; margin: 0 auto; }
.nota h2 { font-size: 17px; margin: 0 0 10px; }
.nota ul { margin: 0; padding-left: 1.15em; }
.nota li { margin: .3em 0; }
.nota b { font-weight: 600; }
</style>
${hero}
<div class="nota"><div class="nota-caja">
  <h2>Vista previa del hero · home</h2>
  <ul>
    <li>Fondo: las <b>tres fotos del slideshow original</b> (refinería, centro logístico, parque solar) en fundido con zoom, sin JavaScript.</li>
    <li>Del componente que enviaste van tal cual los filtros <b>glass-effect</b> y <b>gooey-filter</b>, la etiqueta de vidrio, el botón con la flecha que sale al pasar el mouse y la cursiva del titular.</li>
    <li>Esta página es sólo para mirar: <b>no lleva GTM ni formulario activo</b>. El sitio real conserva la medición intacta.</li>
  </ul>
</div></div>
`;

writeFileSync('../00-respuesta-felipe/vista-previa-hero.html', salida);
console.log(`vista previa: ${(salida.length / 1024 / 1024).toFixed(2)} MB (imágenes ${kb.toFixed(0)} KB)`);
