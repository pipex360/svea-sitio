/**
 * Deja el sitio idéntico al actual, como punto de partida para ir mejorando.
 *
 * Toma el HTML que hoy sirve sveaconsultores.cl (originales-wp/) y lo copia a
 * public/ en su URL real. El CSS, el JavaScript y las imágenes siguen saliendo
 * del sitio en vivo, así que se ve exactamente igual.
 *
 * Tres cambios que no se ven, y que existen para no dañar lo que está en
 * producción:
 *   1. Se quita toda la medición (GTM, GA4, Ads, MonsterInsights). Una visita
 *      a la copia no puede ensuciar los informes ni las conversiones.
 *   2. Los formularios no envían. Nadie genera un lead falso desde la copia.
 *   3. Todas las páginas van noindex y el robots.txt bloquea todo, para que
 *      Google no indexe una copia del sitio y compita consigo mismo.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, cpSync } from 'node:fs';
import path from 'node:path';
import paginas from '../src/data/paginas.json' with { type: 'json' };

const BASE = (process.env.BASE_URL ?? '').replace(/\/$/, '');   // p.ej. /svea-sitio
const DOM = 'https://sveaconsultores.cl';
const ORIG = 'originales-wp';
const DEST = 'public';

// dónde está el archivo original de cada ruta
const ARCHIVOS = {
  '/': 'home.html',
  '/gracias/': 'gracias.html',
};
for (const p of paginas) {
  if (ARCHIVOS[p.ruta]) continue;
  const carpeta = p.tipo === 'articulos' ? 'articulos'
    : p.tipo === 'landings-ads' ? 'landings-ads'
    : 'servicios';
  const f = path.join(carpeta, `${p.slug}.html`);
  if (existsSync(path.join(ORIG, f))) ARCHIVOS[p.ruta] = f;
}

// las rutas del sitio, de la más larga a la más corta para no pisar prefijos
const RUTAS = Object.keys(ARCHIVOS).sort((a, b) => b.length - a.length);

function limpiar(html, ruta) {
  let s = html;

  // --- 1. fuera la medición -------------------------------------------------
  const espia = /googletagmanager|gtag\(|GTM-NGVMRNDM|AW-16836158536|G-FWQ05WDLZ3|GT-5MGVDP76|monsterinsights|google-analytics|dataLayer/i;
  s = s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (bloque) => (espia.test(bloque) ? '' : bloque));
  s = s.replace(/<script\b[^>]*\bsrc="[^"]*(googletagmanager|google-analytics|gtag)[^"]*"[^>]*>\s*<\/script>/gi, '');
  s = s.replace(/<noscript>\s*<iframe[^>]*googletagmanager[\s\S]*?<\/noscript>/gi, '');
  // restos: dns-prefetch a los servidores de medición y comentarios de los plugins
  s = s.replace(/<link[^>]+href=["'][^"']*(googletagmanager|google-analytics)[^"']*["'][^>]*>/gi, '');
  s = s.replace(/<!--[\s\S]*?-->/g, (c) => (espia.test(c) || /monsterinsights|site kit/i.test(c) ? '' : c));

  // --- 2. los formularios no envían ----------------------------------------
  s = s.replace(/<form\b([^>]*)>/gi, (todo, attrs) => {
    const limpio = attrs
      .replace(/\saction="[^"]*"/i, ' action="#"')
      .replace(/\smethod="[^"]*"/i, '');
    return `<form${limpio} onsubmit="return false" data-copia="1">`;
  });

  // --- 3. noindex ----------------------------------------------------------
  s = s.replace(/<meta[^>]+name=["']robots["'][^>]*>/gi, '');
  s = s.replace(/<head([^>]*)>/i,
    `<head$1>\n<meta name="robots" content="noindex, nofollow">`);

  // --- enlaces internos al preview; los recursos siguen en el sitio real ----
  for (const r of RUTAS) {
    const abs = DOM + r;
    s = s.split(`"${abs}"`).join(`"${BASE}${r}"`);
    s = s.split(`"${abs}#`).join(`"${BASE}${r}#`);
    s = s.split(`'${abs}'`).join(`'${BASE}${r}'`);
  }
  // el dominio pelado sin barra final
  s = s.split(`"${DOM}"`).join(`"${BASE}/"`);

  // aviso discreto de que esto es una copia de trabajo
  s = s.replace(/<\/body>/i, `
<div style="position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#161b18;color:#fff;
font:400 12px/1.4 system-ui,sans-serif;padding:7px 12px;text-align:center">
COPIA DE TRABAJO · sin medición y con los formularios desactivados ·
<a href="${BASE}/estado/" style="color:#9BEB6B">ver las 27 páginas</a>
</div>
</body>`);

  return s;
}

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

let n = 0;
for (const [ruta, archivo] of Object.entries(ARCHIVOS)) {
  if (ruta === '/') continue;              // la home la arma src/pages/index.astro
  const origen = path.join(ORIG, archivo);
  if (!existsSync(origen)) { console.log('falta el original:', ruta); continue; }
  const destino = ruta === '/' ? path.join(DEST, 'index.html')
    : path.join(DEST, ruta.replace(/^\/|\/$/g, ''), 'index.html');
  mkdirSync(path.dirname(destino), { recursive: true });
  writeFileSync(destino, limpiar(readFileSync(origen, 'utf8'), ruta));
  n++;
}

// recursos propios de las mejoras (logo, etc.): se publican bajo /img/
if (existsSync('mejoras/img')) {
  cpSync('mejoras/img', path.join(DEST, 'img'), { recursive: true });
  console.log('recursos propios copiados a /img/');
}

// --- la home, para que la componga Astro --------------------------------
// Se entregan por separado los recursos del <head> (la hoja del WordPress,
// que es lo que mantiene el aspecto del contenido que aún no migramos) y el
// cuerpo, con la barra superior y el hero viejo escondidos: esos dos los
// reemplaza el hero nuevo.
const HERO_VIEJO = '607952e6';   // sección de Elementor con el slideshow
const BARRA_VIEJA = '73078e5';   // barra superior con logo y menú
const CARRUSEL = 'cc069dd';      // contenedor del carrusel de logos de clientes
const SERVICIOS = 'a566092';     // contenedor de «Nuestros Servicios»

const homeLimpia = limpiar(readFileSync(path.join(ORIG, 'home.html'), 'utf8'), '/');

const cabeza = (homeLimpia.match(/<head[\s\S]*?<\/head>/i) || [''])[0]
  .match(/<link[^>]+rel="stylesheet"[^>]*>|<style[\s\S]*?<\/style>|<link[^>]+rel="(?:preconnect|dns-prefetch)"[^>]*>/gi) || [];

let cuerpo = homeLimpia
  .slice(homeLimpia.indexOf('<body') , homeLimpia.lastIndexOf('</body>'))
  .replace(/^<body[^>]*>/i, '');

// se deja una marca donde está el carrusel de logos para que Astro ponga
// ahí la rejilla nueva; el carrusel viejo queda escondido justo debajo
cuerpo = cuerpo.replace(
  new RegExp(`<div class=['"][^'"]*elementor-element-${CARRUSEL}[^'"]*['"]`),
  (m) => `<!--SVEA:LOGOS-->${m}`);

// lo mismo con «Nuestros Servicios»: la marca queda donde empieza la sección
// vieja, que se esconde justo debajo
cuerpo = cuerpo.replace(
  new RegExp(`<div class=['"][^'"]*elementor-element-${SERVICIOS}[^'"]*['"]`),
  (m) => `<!--SVEA:SERVICIOS-->${m}`);

mkdirSync('src/contenido', { recursive: true });
writeFileSync('src/contenido/home-wp-cabeza.html',
  cabeza.join('\n') + `\n<style>.elementor-element-${HERO_VIEJO},.elementor-element-${BARRA_VIEJA},.elementor-element-${CARRUSEL},.elementor-element-${SERVICIOS}{display:none !important}</style>`);
writeFileSync('src/contenido/home-wp-cuerpo.html', cuerpo);
console.log('home: recursos y cuerpo entregados a Astro');

// que nadie indexe la copia
writeFileSync(path.join(DEST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

console.log(`${n} páginas copiadas del sitio actual · base "${BASE || '/'}"`);
const faltan = paginas.filter((p) => !ARCHIVOS[p.ruta]).map((p) => p.ruta);
if (faltan.length) console.log('sin original (aún no existen en el sitio):', faltan.join(', '));
