/**
 * Las fotos de contenido del sitio, en un solo lugar.
 *
 * Cada foto vive UNA vez en mejoras/fotos/<nombre>.webp y scripts/fotos.mjs
 * le genera las variantes (AVIF y WebP a 640/1080/1600 px, y 1920 en las de
 * hero) más el og:image de 1200×630, y anota ancho, alto y anchos disponibles
 * en src/data/fotos.json. De aquí salen los atributos del <picture> para los
 * tres que lo pintan: <Foto> de Astro, <Foto> de React y fotoHtml() para el
 * HTML de las guías. width/height siempre van (nada de saltos de layout), la
 * carga es diferida salvo que se pida prioridad (la del hero, que es el LCP).
 */
import manifiesto from '../data/fotos.json';

export type FichaFoto = {
  ancho: number;
  alto: number;
  anchos: number[];
  hero: boolean;
  og: string;
};

const FOTOS = manifiesto as Record<string, FichaFoto>;
const SITIO = 'https://sveaconsultores.cl';

/**
 * `sizes` según dónde va la foto. Medidos sobre el layout real:
 *  - hero: a todo el ancho.
 *  - mitad: una de dos columnas dentro de max-w-6xl (1152 px) con separación
 *    de 40–56 px (Scroll01, «¿Qué es?» de las landings).
 *  - articulo: el cuerpo de la guía, 44 rem (704 px) de ancho máximo.
 *  - tarjeta: la rejilla de /blog/ (3 columnas en escritorio, 2 en tablet).
 */
export const TAMANOS = {
  hero: '100vw',
  mitad: '(min-width: 1152px) 548px, (min-width: 768px) calc(50vw - 40px), calc(100vw - 32px)',
  articulo: '(min-width: 768px) 704px, calc(100vw - 32px)',
  tarjeta: '(min-width: 1024px) 371px, (min-width: 768px) calc(50vw - 26px), calc(100vw - 32px)',
} as const;
export type Tamano = keyof typeof TAMANOS;

export function foto(nombre: string): FichaFoto {
  const f = FOTOS[nombre];
  if (!f) throw new Error(`No existe la foto «${nombre}» (mejoras/fotos/ → node scripts/fotos.mjs)`);
  return f;
}

export const hayFoto = (nombre: string) => nombre in FOTOS;

export const rutaFoto = (nombre: string, ancho: number, formato: 'avif' | 'webp', base = '') =>
  `${base}/img/fotos/${nombre}-${ancho}.${formato}`;

export const srcsetFoto = (nombre: string, formato: 'avif' | 'webp', base = '') =>
  foto(nombre).anchos.map((w) => `${rutaFoto(nombre, w, formato, base)} ${w}w`).join(', ');

/** URL absoluta del og:image (1200×630, JPEG) de una foto. */
export const ogFoto = (nombre: string) => `${SITIO}/img/og/${foto(nombre).og}`;
/** La tarjeta genérica (logo sobre blanco) para páginas sin foto propia. */
export const OG_GENERICO = `${SITIO}/img/og/svea-consultores.jpg`;

export type AtributosFoto = {
  src: string;
  srcsetAvif: string;
  srcsetWebp: string;
  sizes: string;
  width: number;
  height: number;
};

/**
 * Los atributos del <picture>: dos <source> y el <img> de respaldo (WebP al
 * ancho medio).
 *
 * La foto con `prioridad` (la del hero, en el camino del LCP) va SÓLO en
 * WebP: srcsetAvif queda vacío y el <picture> no pone esa <source>. Medido
 * en Lighthouse móvil (CPU ×4) sobre la página de la CTI, tres corridas
 * cada una: con el hero en AVIF el LCP —que es el texto de la bajada— se
 * pintaba 0,3 s más tarde (3,5–3,7 s, nota 88–91) que con el hero en WebP
 * (3,3–3,5 s, nota 91–92): decodificar AVIF le cuesta al teléfono más que
 * los 20 KB que ahorra. El resto de las fotos carga diferido y ahí el AVIF
 * sólo ahorra bytes.
 */
export function atributosFoto(nombre: string, tamano: Tamano | string, base = '', prioridad = false): AtributosFoto {
  const f = foto(nombre);
  const medio = f.anchos.find((w) => w >= 1080) ?? f.anchos.at(-1)!;
  return {
    src: rutaFoto(nombre, medio, 'webp', base),
    srcsetAvif: prioridad ? '' : srcsetFoto(nombre, 'avif', base),
    srcsetWebp: srcsetFoto(nombre, 'webp', base),
    sizes: tamano in TAMANOS ? TAMANOS[tamano as Tamano] : tamano,
    width: f.ancho,
    height: f.alto,
  };
}

/**
 * Lo que lleva el <link rel="preload"> de la foto del hero (WebP, como el
 * <picture> de la foto con prioridad). `fetchpriority="high"` lo pone la
 * página SÓLO si la foto es su LCP (las landings de Ads). En la portada y las
 * páginas de servicio el LCP es el texto del hero: medido en la CTI, con la
 * precarga en prioridad alta la foto (89 KB) competía con las fuentes y el
 * texto se pintaba 0,4 s más tarde (LCP 3,5 s contra 3,1 s).
 */
export function precargaFoto(nombre: string, base = '') {
  return { imagesrcset: srcsetFoto(nombre, 'webp', base), imagesizes: TAMANOS.hero, type: 'image/webp' };
}

export type OpcionesFotoHtml = {
  base?: string;
  alt: string;
  tamano: Tamano | string;
  /** la del hero / LCP: carga inmediata con prioridad alta */
  prioridad?: boolean;
  clase?: string;
  estilo?: string;
};

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** El <picture> como texto, para el HTML que viene de JSON (las guías). */
export function fotoHtml(nombre: string, o: OpcionesFotoHtml): string {
  const a = atributosFoto(nombre, o.tamano, o.base ?? '', o.prioridad);
  const extra = [
    o.clase ? ` class="${escapar(o.clase)}"` : '',
    o.estilo ? ` style="${escapar(o.estilo)}"` : '',
    o.prioridad ? ' fetchpriority="high"' : ' loading="lazy"',
  ].join('');
  return `<picture>` +
    (a.srcsetAvif ? `<source type="image/avif" srcset="${a.srcsetAvif}" sizes="${a.sizes}">` : '') +
    `<source type="image/webp" srcset="${a.srcsetWebp}" sizes="${a.sizes}">` +
    `<img src="${a.src}" width="${a.width}" height="${a.height}" alt="${escapar(o.alt)}" decoding="async"${extra}>` +
    `</picture>`;
}

/**
 * En el HTML de las guías las fotos van como <img data-foto="nombre" alt="…">
 * (sin src: el nombre es el de mejoras/fotos). Aquí cada una pasa a su
 * <picture> con las variantes y el `sizes` del cuerpo del artículo.
 */
export function fotosEnHtml(html: string, base = ''): string {
  return html.replace(/<img\b([^>]*)\bdata-foto="([^"]+)"([^>]*)>/g, (todo, antes, nombre, despues) => {
    const attrs = antes + ' ' + despues;
    const alt = (attrs.match(/\balt="([^"]*)"/) || [])[1] ?? '';
    const clase = (attrs.match(/\bclass="([^"]*)"/) || [])[1];
    return fotoHtml(nombre, { base, alt, tamano: 'articulo', clase });
  });
}
