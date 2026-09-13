/**
 * Empaqueta las 27 páginas construidas en un solo archivo navegable.
 * Los enlaces internos se resuelven en el navegador, sin servidor.
 * Se quita GTM y se desactiva el envío de formularios: es una maqueta.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import paginas from '../src/data/paginas.json' with { type: 'json' };

const DIST = 'dist';

// --- índice de imágenes locales, por nombre de archivo ---
const porNombre = new Map();
for (const dir of ['dist/_astro', 'src/assets/img']) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!/\.(webp|png|jpe?g|svg)$/i.test(f)) continue;
    // dist/_astro trae hash: nombre.HASH_xxx.webp → nombre original
    const base = f.replace(/\.[A-Za-z0-9_-]{8,}(_[A-Za-z0-9-]+)?(?=\.\w+$)/, '');
    const ruta = path.join(dir, f);
    if (!porNombre.has(base) || statSync(ruta).size < statSync(porNombre.get(base)).size) {
      porNombre.set(base, ruta);
    }
    porNombre.set(f, ruta);
  }
}

const mime = (f) => (/\.png$/i.test(f) ? 'image/png' : /\.svg$/i.test(f) ? 'image/svg+xml'
  : /\.jpe?g$/i.test(f) ? 'image/jpeg' : 'image/webp');

let faltantes = new Set(), bytes = 0;
const unicas = new Map();   // ruta local → clave corta
function aDataURI(url) {
  const nombre = decodeURIComponent(url.split('?')[0].split('/').pop() ?? '');
  // el contenido apunta a los .jpg/.png del WordPress; en disco están convertidos a .webp
  const candidatos = [
    nombre,
    nombre.replace(/\.(jpe?g|png)$/i, '.webp'),
    nombre.replace(/-\d+x\d+(?=\.\w+$)/, ''),
    nombre.replace(/-\d+x\d+(?=\.\w+$)/, '').replace(/\.(jpe?g|png)$/i, '.webp'),
    nombre.replace(/-scaled(?=\.\w+$)/, '').replace(/\.(jpe?g|png)$/i, '.webp'),
  ];
  const local = candidatos.map((c) => porNombre.get(c)).find(Boolean);
  if (!local) { faltantes.add(nombre); return null; }
  if (!unicas.has(local)) {
    const buf = readFileSync(local);
    bytes += buf.length;
    unicas.set(local, { clave: 'i' + unicas.size, uri: `data:${mime(local)};base64,${buf.toString('base64')}` });
  }
  return unicas.get(local).clave;
}

// --- CSS compartido ---
const primera = readFileSync(path.join(DIST, 'index.html'), 'utf8');
const hojaRuta = primera.match(/<link rel="stylesheet" href="(\/_astro\/[^"]+)"/)?.[1];
const cssBase = hojaRuta ? readFileSync(path.join(DIST, hojaRuta), 'utf8') : '';

// --- cada página ---
const vistas = [];
const estilos = new Set();

// se abre en la home, y el selector sigue el orden de lectura del sitio
const peso = { raiz: 0, 'landings-ads': 1, servicios: 2, articulos: 3 };
const orden = [...paginas].sort((a, b) =>
  (a.ruta === '/' ? -1 : b.ruta === '/' ? 1 : 0) ||
  (peso[a.tipo] ?? 9) - (peso[b.tipo] ?? 9) ||
  a.ruta.localeCompare(b.ruta));

for (const p of orden) {
  const f = path.join(DIST, p.ruta === '/' ? 'index.html' : p.ruta.replace(/^\//, '') + 'index.html');
  if (!existsSync(f)) continue;
  let html = readFileSync(f, 'utf8');

  for (const m of html.matchAll(/<style>([\s\S]*?)<\/style>/g)) estilos.add(m[1]);

  const iniC = html.indexOf('<body>');
  const finC = html.lastIndexOf('</body>');
  let cuerpo = html.slice(iniC + 6, finC);

  // fuera lo que no va en una maqueta
  cuerpo = cuerpo.replace(/<script[\s\S]*?<\/script>/g, '');
  cuerpo = cuerpo.replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
  cuerpo = cuerpo.replace(/action="https:\/\/api\.web3forms\.com\/submit"/g, 'data-maqueta="1"');

  // imágenes → data URI
  cuerpo = cuerpo.replace(/\ssrcset="[^"]*"/g, '');
  cuerpo = cuerpo.replace(/src="([^"]+)"/g, (todo, url) => {
    if (url.startsWith('data:')) return todo;
    const clave = aDataURI(url);
    return clave ? `data-img="${clave}"` : `src="" data-rota="${url.split('/').pop()}"`;
  });

  vistas.push({ ruta: p.ruta, titulo: p.title, tipo: p.tipo, cuerpo });
}

const salida = `<title>SVEA Consultores · sitio nuevo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@300;400;500;600;700&display=swap">
<style>
${cssBase}
${[...estilos].join('\n')}
body { margin: 0; }
.vista { display: none; }
.vista.activa { display: block; }
.barra {
  position: sticky; top: 0; z-index: 200;
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  padding: 8px 14px; background: #161b18; color: #fff;
  font: 400 12.5px/1 Inter, system-ui, sans-serif;
}
.barra b { font-weight: 600; letter-spacing: .04em; text-transform: uppercase; font-size: 11px; color: #9BEB6B; }
.barra select {
  font: inherit; padding: 7px 10px; border-radius: 7px;
  border: 1px solid #39413c; background: #1f2622; color: #fff; min-width: 260px;
}
.barra span { color: rgba(255,255,255,.55); }
.aviso-maqueta {
  background: #F7EFDD; color: #6b4c0d; font: 400 13px/1.5 Inter, system-ui, sans-serif;
  padding: 8px 14px; text-align: center;
}
img[data-rota] { display: none; }
</style>

<div class="barra">
  <b>Sitio nuevo</b>
  <select id="ir" aria-label="Ir a una página">
    ${vistas.map((v) => `<option value="${v.ruta}">${v.ruta}  ·  ${v.titulo.replace(/"/g, '&quot;').slice(0, 58)}</option>`).join('\n    ')}
  </select>
  <span id="cuenta">${vistas.length} páginas</span>
</div>
<div class="aviso-maqueta">Maqueta para revisar: sin medición y con los formularios desactivados. El sitio real conserva la lista roja intacta.</div>

${vistas.map((v, i) => `<div class="vista${i === 0 ? ' activa' : ''}" data-ruta="${v.ruta}">${v.cuerpo}</div>`).join('\n')}

<script>
var IMG = ${JSON.stringify(Object.fromEntries([...unicas.values()].map((v) => [v.clave, v.uri])))};
(function () {
  [].forEach.call(document.querySelectorAll('img[data-img]'), function (im) {
    var u = IMG[im.getAttribute('data-img')];
    if (u) im.src = u;
  });
  var vistas = [].slice.call(document.querySelectorAll('.vista'));
  var selector = document.getElementById('ir');

  function mostrar(ruta) {
    var destino = vistas.filter(function (v) { return v.dataset.ruta === ruta; })[0] || vistas[0];
    vistas.forEach(function (v) { v.classList.toggle('activa', v === destino); });
    selector.value = destino.dataset.ruta;
    document.title = 'SVEA · ' + destino.dataset.ruta;
    window.scrollTo(0, 0);
  }

  // los enlaces internos navegan dentro de la maqueta
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="/"]');
    if (!a) return;
    var ruta = a.getAttribute('href').split('#')[0];
    if (!vistas.some(function (v) { return v.dataset.ruta === ruta; })) return;
    e.preventDefault();
    mostrar(ruta);
    location.hash = ruta;
  });

  selector.addEventListener('change', function () { mostrar(selector.value); location.hash = selector.value; });
  window.addEventListener('hashchange', function () { mostrar(location.hash.slice(1)); });

  // los formularios no envían nada
  document.addEventListener('submit', function (e) {
    e.preventDefault();
    var nota = e.target.querySelector('.frm-nota');
    if (nota) nota.textContent = 'Maqueta: el envío está desactivado. En el sitio real este formulario va a Web3Forms sin cambios.';
  });

  if (location.hash.length > 1) mostrar(location.hash.slice(1));
})();
</script>
`;

writeFileSync('../00-respuesta-felipe/sitio-navegable.html', salida);
console.log(`${vistas.length} páginas · ${unicas.size} imágenes únicas (${(bytes / 1048576).toFixed(2)} MB) · archivo ${(salida.length / 1048576).toFixed(2)} MB`);
if (faltantes.size) console.log('sin archivo local:', [...faltantes].join(', '));
