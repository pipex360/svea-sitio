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

// páginas rehechas en Astro, por tipo: las de servicio y las landings deben
// traer su foto propia; los artículos y el blog, sólo sus fuentes.
const SERVICIOS_VER = ['/calificacion-tecnica-industrial/', '/estudio-de-carga-de-combustible/', '/planes-de-emergencia-y-evacuacion/', '/planes-de-emergencia-y-evacuacion-condominios/', '/manejo-de-residuos-peligrosos/', '/autorizacion-de-transporte-de-residuos/', '/informe-sanitario/', '/permisos-ambientales-y-pertinencias-del-seia/'];
const LANDINGS = ['cotiza-calificacion-tecnica-industrial', 'cotiza-estudio-de-carga-de-combustible', 'cotiza-plan-emergencia', 'cotiza-plan-emergencia-condominio', 'cotiza-informe-sanitario', 'cotiza-autorizacion-transporte-residuos'];
const ARTICULOS = ['autorizacion-transporte-residuos-chile', 'calificacion-inofensiva-seremi', 'calificacion-tecnica-industrial-chile', 'estudio-de-carga-combustible-chile', 'manejo-de-residuos-peligrosos-chile', 'plan-de-emergencia-condominio-chile', 'plan-de-emergencia-ds-44-empresas-chile', 'plan-de-emergencia-empresa-chile', 'que-es-informe-sanitario'];
// guías nuevas (sep-2026): escritas para este sitio, sin original en el
// WordPress. Se revisan igual que las demás (medición, noindex, formulario
// que no envía, nada del WordPress) y su formulario contra el patrón de los
// artículos (5c), porque no hay original con qué compararlo.
const GUIAS_NUEVAS = paginas.filter((p) => p.nueva && p.tipo === 'articulos').map((p) => p.slug);
const CON_FOTO = new Set([...SERVICIOS_VER, ...LANDINGS.map((s) => `/${s}/`)]);
const REHECHAS_VER = new Set([...CON_FOTO, ...ARTICULOS.map((s) => `/${s}/`), ...GUIAS_NUEVAS.map((s) => `/${s}/`), '/blog/', '/gracias/', '/politica-de-privacidad/']);
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
  // En las rehechas las URLs del WordPress sólo pueden quedar en lo que no se
  // carga: los <meta> de Open Graph/Twitter y el JSON-LD. Todo lo demás
  // (src, srcset, href de <link>, url() de CSS…) tiene que ser propio.
  if (p.ruta === '/' || REHECHAS_VER.has(p.ruta)) {
    const cargado = html
      .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '')
      .replace(/<meta\b[^>]*>/g, '')
      .replace(/<a\b[^>]*>/g, (a) => a.replace(/\shref="[^"]*"/, ''));   // un enlace no carga nada
    const ajenos = cargado.match(/https?:\/\/[^"'\s)]*(?:wp-content|wp-includes|cdn\.tailwindcss\.com|code\.iconify\.design|fonts\.googleapis\.com|fonts\.gstatic\.com)[^"'\s)]*/g) || [];
    if (ajenos.length) fallos.push(`${p.ruta}  ✗ aún carga del WordPress o de CDN: ${ajenos.slice(0, 3).join(' ')}`);
    else checks++;
    if (!/\/fonts\/inter-variable-latin\.woff2/.test(html)) fallos.push(`${p.ruta}  ✗ no sirve sus fuentes desde el sitio`);
    else checks++;
    const fotoPropia = /\/img\/hero\//.test(html) || /(?:src|srcset)="\/img\/(?!logo-)[^"]+\.(?:webp|avif|jpe?g|png)/.test(html);
    if ((p.ruta === '/' || CON_FOTO.has(p.ruta)) && !fotoPropia) fallos.push(`${p.ruta}  ✗ no sirve la foto del hero (ni otra imagen) desde el sitio`);
    else if (p.ruta === '/' || CON_FOTO.has(p.ruta)) checks++;
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
const ENTIDADES = {
  nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', laquo: '«', raquo: '»',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', uuml: 'ü', ntilde: 'ñ',
  Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú', Uuml: 'Ü', Ntilde: 'Ñ',
  iquest: '¿', iexcl: '¡', middot: '·', mdash: '—', ndash: '–', rarr: '→', larr: '←',
  copy: '©', check: '✓', sup2: '²', deg: '°', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', hellip: '…',
};
/** Decodifica las entidades HTML (&oacute;, &#038;, &#x2F;…). Una que no se
 *  conozca queda tal cual: así una diferencia no se esconde tras un espacio. */
function decodificar(s) {
  return s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]*);/gi, (todo, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTIDADES[e] ?? todo;
  });
}
// gclid y utm_*: los seis ocultos de origen del lead. Las landings ya los
// traían en el WordPress (y ahí entran en la huella); en la portada, los
// servicios y las guías se agregaron el 24-sep: se dejan fuera al comparar
// con el original y se comprueba aparte que estén.
const ORIGEN = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
function huellaFormulario(html, id, { sinOrigen = false } = {}) {
  const m = html.match(new RegExp(`<form\\b[^>]*id="${id}"[^>]*>([\\s\\S]*?)</form>`));
  if (!m) return null;
  const cuerpo = m[1];
  const attr = (tag, n) => {
    const v = (tag.match(new RegExp(`\\s${n}="([^"]*)"`)) || [])[1];
    return v === undefined ? v : decodificar(v);
  };
  const tiene = (tag, n) => new RegExp(`\\s${n}(?:=""|(?=[\\s>/]))`).test(tag);
  const ocultos = {};
  const visibles = [];
  for (const tag of cuerpo.match(/<(?:input|select|textarea)\b[^>]*>/g) || []) {
    const name = attr(tag, 'name');
    if (!name) continue;
    const type = tag.startsWith('<select') ? 'select' : tag.startsWith('<textarea') ? 'textarea' : attr(tag, 'type') || 'text';
    if (type === 'hidden' && sinOrigen && ORIGEN.includes(name)) continue;
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
  ['/estudio-de-carga-de-combustible/', 'form-ecc', 'originales-wp/servicios/estudio-de-carga-de-combustible.html', 'estudio-de-carga-de-combustible/index.html'],
  ['/planes-de-emergencia-y-evacuacion/', 'form-pe-industrial', 'originales-wp/servicios/planes-de-emergencia-y-evacuacion.html', 'planes-de-emergencia-y-evacuacion/index.html'],
  ['/planes-de-emergencia-y-evacuacion-condominios/', 'form-plan-condominio', 'originales-wp/servicios/planes-de-emergencia-y-evacuacion-condominios.html', 'planes-de-emergencia-y-evacuacion-condominios/index.html'],
  ['/manejo-de-residuos-peligrosos/', 'form-residuos-peligrosos', 'originales-wp/servicios/manejo-de-residuos-peligrosos.html', 'manejo-de-residuos-peligrosos/index.html'],
  ['/autorizacion-de-transporte-de-residuos/', 'form-transporte-residuos', 'originales-wp/servicios/autorizacion-de-transporte-de-residuos.html', 'autorizacion-de-transporte-de-residuos/index.html'],
  ['/informe-sanitario/', 'form-informe-sanitario', 'originales-wp/servicios/informe-sanitario.html', 'informe-sanitario/index.html'],
  ...[
    ['cotiza-calificacion-tecnica-industrial', 'form-landing-cti'],
    ['cotiza-estudio-de-carga-de-combustible', 'form-landing-ecc'],
    ['cotiza-plan-emergencia', 'form-landing-pe'],
    ['cotiza-plan-emergencia-condominio', 'form-landing-pc'],
    ['cotiza-informe-sanitario', 'form-landing-is'],
  ].map(([slug, id]) => [`/${slug}/`, id, `originales-wp/landings-ads/${slug}.html`, `${slug}/index.html`]),
  ...ARTICULOS.map((slug) => [`/${slug}/`, 'article-lead-form', `originales-wp/articulos/${slug}.html`, `${slug}/index.html`]),
]) {
  const esLanding = ruta.startsWith('/cotiza-');
  const html = readFileSync(path.join(DIST, destino), 'utf8');
  const original = huellaFormulario(readFileSync(origen, 'utf8'), id, { sinOrigen: !esLanding });
  const construido = huellaFormulario(html, id, { sinOrigen: !esLanding });
  if (!original || !construido) fallos.push(`${ruta}  ✗ no se encontró el ${id} (original o construido)`);
  else if (original !== construido) fallos.push(`${ruta}  ✗ la lista roja de ${id} cambió\n     original:   ${original}\n     construido: ${construido}`);
  else checks++;
  // los seis ocultos de origen, con su id field-*, una sola vez en la página
  if (construido) {
    const { ocultos } = JSON.parse(huellaFormulario(html, id));
    const faltan = ORIGEN.filter((n) => !(n in ocultos));
    const repetidos = ORIGEN.filter((n) => (html.match(new RegExp(`id="field-${n}"`, 'g')) || []).length !== 1);
    if (faltan.length) fallos.push(`${ruta}  ✗ al ${id} le faltan los ocultos ${faltan.join(', ')}`);
    else if (repetidos.length) fallos.push(`${ruta}  ✗ id field-* ausente o repetido: ${repetidos.join(', ')}`);
    else checks++;
  }
}

// 5b. La landing de transporte no tiene original en el WordPress: al menos
// tiene que hablarle al flujo de n8n igual que sus hermanas.
{
  const ruta = '/cotiza-autorizacion-transporte-residuos/';
  const html = readFileSync(path.join(DIST, 'cotiza-autorizacion-transporte-residuos/index.html'), 'utf8');
  const h = huellaFormulario(html, 'form-landing-tr');
  if (!h) fallos.push(`${ruta}  ✗ no se encontró el form-landing-tr`);
  else {
    const { ocultos, visibles } = JSON.parse(h);
    const form = html.match(/<form\b[^>]*id="form-landing-tr"[^>]*>[\s\S]*?<\/form>/)[0];
    const faltas = [];
    if (ocultos.from_name !== 'SVEA Landing Ads') faltas.push(`from_name=${ocultos.from_name}`);
    if (!/<input\b[^>]*name="subject"[^>]*id="dynamic-subject-ltr"|<input\b[^>]*id="dynamic-subject-ltr"[^>]*name="subject"/.test(form)) faltas.push('subject sin id dynamic-subject-ltr');
    for (const n of ['access_key', 'gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'])
      if (!(n in ocultos)) faltas.push(`falta el oculto ${n}`);
    if (ocultos.botcheck !== 'checkbox') faltas.push('falta el botcheck');
    if (!visibles.length) faltas.push('sin campos visibles');
    if (faltas.length) fallos.push(`${ruta}  ✗ el form-landing-tr no calza con las landings: ${faltas.join(', ')}`);
    else checks++;
  }
}

// 5c. Las guías nuevas no tienen original: su article-lead-form tiene que
// hablarle a Web3Forms y a n8n igual que el de los artículos del WordPress.
// n8n clasifica el lead por la palabra del servicio en el asunto.
const PALABRAS_N8N = ['CTI', 'ECC', 'Plan Emergencia', 'Condominios', 'Transporte', 'Manejo de residuos'];
for (const slug of GUIAS_NUEVAS) {
  const ruta = `/${slug}/`;
  const html = readFileSync(path.join(DIST, slug, 'index.html'), 'utf8');
  const h = huellaFormulario(html, 'article-lead-form');
  if (!h) { fallos.push(`${ruta}  ✗ no se encontró el article-lead-form`); continue; }
  const { ocultos, visibles } = JSON.parse(h);
  const form = html.match(/<form\b[^>]*id="article-lead-form"[^>]*>[\s\S]*?<\/form>/)[0];
  const faltas = [];
  if (ocultos.access_key !== '076a0f9a-9911-48f6-880e-dd9d44c3063b') faltas.push(`access_key=${ocultos.access_key}`);
  if (!/^SVEA Consultores Blog - /.test(ocultos.from_name || '')) faltas.push(`from_name=${ocultos.from_name}`);
  if (ocultos.redirect !== 'https://sveaconsultores.cl/gracias/') faltas.push(`redirect=${ocultos.redirect}`);
  if (!ocultos.Servicio) faltas.push('sin Servicio');
  if (!(form.match(/<input\b[^>]*>/g) || []).some((t) => /\sname="subject"/.test(t) && /\sid="dynamic-subject-art-[a-z0-9-]+"/.test(t))) faltas.push('subject sin id dynamic-subject-art-*');
  if (!PALABRAS_N8N.some((w) => (ocultos.subject || '').includes(w))) faltas.push(`asunto sin palabra que reconozca n8n: ${ocultos.subject}`);
  for (const n of ORIGEN) if (!(n in ocultos)) faltas.push(`falta el oculto ${n}`);
  if (ocultos.botcheck !== 'checkbox') faltas.push('falta el botcheck');
  for (const n of ['Nombre:text:req', 'Empresa:text:req', 'Teléfono:tel:req', 'Email:email:req'])
    if (!visibles.includes(n)) faltas.push(`falta el campo ${n}`);
  if (faltas.length) fallos.push(`${ruta}  ✗ el article-lead-form no calza con los artículos: ${faltas.join(', ')}`);
  else checks++;
  // el prefijo del asunto dinámico también debe llevar la palabra de n8n
  const d = JSON.parse(readFileSync(`src/contenido/articulos/${slug}.json`, 'utf8'));
  if (!d.asunto || !/^\[BLOG\] Cotización /.test(d.asunto.prefijo) || !PALABRAS_N8N.some((w) => d.asunto.prefijo.includes(w)))
    fallos.push(`${ruta}  ✗ asunto dinámico mal armado: ${JSON.stringify(d.asunto)}`);
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
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '')
    // los manejadores on*="…" son código dentro de una etiqueta; un `=>` en
    // uno (p. ej. setTimeout(()=>…)) cortaría la etiqueta y echaría su resto
    // al texto. Sólo se quitan dentro de una etiqueta, nunca del texto.
    .replace(/<[a-z][a-z0-9-]*\b(?:"[^"]*"|'[^']*'|[^'">])*>/gi, (tag) =>
      tag.replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*')/gi, ''));
}

function palabras(limpio, desde = 0, hasta = limpio.length) {
  const texto = limpio
    .slice(desde, hasta)
    .replace(/<[^>]+>/g, ' ');
  const plano = decodificar(texto).replace(/&[a-z#0-9]+;/gi, ' ');
  return new Set(
    (plano.toLowerCase().match(/[a-záéíóúüñ0-9][a-záéíóúüñ0-9.\-/]{2,}/g) || [])
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

// 6b. Lo mismo para las demás páginas rehechas. Cada una dice dónde empieza
// y dónde termina su contenido en el original (sobre el HTML ya sin código):
// fuera quedan la cabecera y el pie del WordPress, que se rehicieron aparte.
/** tras el `>` de la etiqueta que contiene `marca` (sus clases no son texto) */
const trasEtiqueta = (o, marca, desde = 0) => {
  const i = o.indexOf(marca, desde);
  return i < 0 ? -1 : o.indexOf('>', i) + 1;
};
const SECCION_WP = '<section class="elementor-section elementor-top-section';
/** hasta la sección del pie del WordPress (la que contiene «Term of use») */
const piePorTerm = (o) => { const pie = o.indexOf('Term of use'); return pie < 0 ? -1 : o.lastIndexOf(SECCION_WP, pie); };
const porClase = (clase) => ({ desde: (o) => trasEtiqueta(o, clase), hasta: piePorTerm });

const CONTENIDOS = [
  ['/estudio-de-carga-de-combustible/', 'servicios/estudio-de-carga-de-combustible', porClase('ecc-page')],
  ['/planes-de-emergencia-y-evacuacion/', 'servicios/planes-de-emergencia-y-evacuacion', porClase('pe-page')],
  ['/planes-de-emergencia-y-evacuacion-condominios/', 'servicios/planes-de-emergencia-y-evacuacion-condominios', porClase('pe-page')],
  ['/manejo-de-residuos-peligrosos/', 'servicios/manejo-de-residuos-peligrosos', porClase('rp-page')],
  ['/autorizacion-de-transporte-de-residuos/', 'servicios/autorizacion-de-transporte-de-residuos', porClase('tr-page')],
  ['/informe-sanitario/', 'servicios/informe-sanitario', porClase('elementor-element-50365904')],
  ['/permisos-ambientales-y-pertinencias-del-seia/', 'servicios/permisos-ambientales-y-pertinencias-del-seia', {
    // el contenido empieza en la sección del WordPress que trae el primer <h1>
    desde: (o) => { const h1 = o.indexOf('<h1'); const sec = h1 < 0 ? -1 : o.lastIndexOf(SECCION_WP, h1); return sec < 0 ? -1 : o.indexOf('>', sec) + 1; },
    hasta: piePorTerm,
  }],
  // las landings traen la página propia metida dentro de la del WordPress:
  // es el segundo documento del archivo
  ...LANDINGS.filter((s) => s !== 'cotiza-autorizacion-transporte-residuos').map((slug) => [`/${slug}/`, `landings-ads/${slug}`, {
    desde: (o) => { const i = o.indexOf('<!DOCTYPE html>'); return i < 0 ? -1 : o.indexOf('<!DOCTYPE html>', i + 1); },
    hasta: (o) => { const i = o.indexOf('<!DOCTYPE html>'); const j = i < 0 ? -1 : o.indexOf('<!DOCTYPE html>', i + 1); return j < 0 ? -1 : o.indexOf('</html>', j); },
  }]),
  ...ARTICULOS.map((slug) => [`/${slug}/`, `articulos/${slug}`, {
    desde: (o) => trasEtiqueta(o, '<header class="article-hero"'),
    hasta: (o) => o.indexOf('<div class="sticky-bottom-cta"'),
  }]),
  ['/blog/', 'servicios/blog', { desde: (o) => trasEtiqueta(o, '<header class="hero"'), hasta: (o) => o.indexOf('</main>') }],
  // las dos páginas sueltas: hasta el botón flotante de «Click to Chat»
  ['/gracias/', 'gracias', { desde: (o) => trasEtiqueta(o, '<div class="ty-page'), hasta: (o) => o.indexOf('<div class="ht-ctc') }],
  // la política, desde el contenido (el H1 del original, «Politica», se corrigió a «Política») hasta el pie del tema
  ['/politica-de-privacidad/', 'servicios/politica-de-privacidad', { desde: (o) => trasEtiqueta(o, '<div class="page-content"'), hasta: (o) => o.indexOf('<footer id="site-footer"') }],
];
for (const [ruta, archivo, { desde: fDesde, hasta: fHasta }] of CONTENIDOS) {
  const orig = sinCodigo(readFileSync(`originales-wp/${archivo}.html`, 'utf8'));
  const desde = fDesde(orig);
  const hasta = desde < 0 ? -1 : fHasta(orig);
  if (desde <= 0 || hasta <= desde) { fallos.push(`${ruta}  ✗ no se encontró el contenido del original`); continue; }
  // el <title> del documento metido en la landing no se ve en la página (el
  // título que sirve el WordPress es el suyo, de Rank Math): no es contenido
  const antes = palabras(archivo.startsWith('landings-ads/') ? orig.slice(0, hasta).replace(/<title>[\s\S]*?<\/title>/g, (t, i) => (i >= desde ? ' '.repeat(t.length) : t)) : orig, desde, hasta);
  const ahora = palabras(sinCodigo(readFileSync(path.join(DIST, ruta.replace(/^\//, ''), 'index.html'), 'utf8')));
  const perdidas = [...antes].filter((w) => !ahora.has(w));
  if (perdidas.length) fallos.push(`${ruta}  ✗ se perdieron ${perdidas.length} palabras del original: ${perdidas.slice(0, 20).join(', ')}`);
  else checks++;
}

// 7. /gracias/ no se indexa: en producción su robots sale de paginas.json
{
  const g = paginas.find((p) => p.ruta === '/gracias/');
  if (!g || !/noindex/.test(g.robots)) fallos.push('/gracias/  ✗ paginas.json no la marca noindex (en producción se indexaría)');
  else checks++;
}

// 8. Las conversiones de Google Ads van SÓLO por GTM: ningún
// gtag('event','conversion') ni send_to AW- en el código (el WordPress las
// mandaba además inline y contaba cada lead dos veces).
{
  const { readdirSync, statSync } = await import('node:fs');
  const archivos = [];
  const recorrer = (d) => { for (const n of readdirSync(d)) { const f = path.join(d, n); if (statSync(f).isDirectory()) recorrer(f); else if (/\.(astro|tsx?|m?js)$/.test(n)) archivos.push(f); } };
  recorrer('src');
  const CONVERSION = /send_to|gtag(?:GA)?\(\s*['"]event['"]\s*,\s*['"]conversion['"]/;
  const reales = [];
  for (const f of archivos) {
    readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
      if (CONVERSION.test(l) && !/^\s*(\*|\/\/)/.test(l)) reales.push(`${f}:${i + 1}: ${l.trim()}`);
    });
  }
  if (reales.length) fallos.push(`código  ✗ quedan conversiones de Ads inline (deben ir por GTM):\n     ${reales.join('\n     ')}`);
  else checks++;
}

if (fallos.length) {
  console.log(`\nFALLA — ${fallos.length} problemas:`);
  for (const f of fallos) console.log('  ', f);
  process.exit(1);
}
console.log('OK · la copia se ve igual y no puede tocar el sitio real\n');
