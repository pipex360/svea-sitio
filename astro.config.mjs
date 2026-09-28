// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';
import paginas from './src/data/paginas.json' with { type: 'json' };

// En GitHub Pages el sitio cuelga de /svea-sitio/. En producción irá en la raíz.
const BASE = process.env.BASE_URL || '/';

// SVEA_PRODUCCION=1: el sitio de verdad (medición, formularios que envían,
// robots de cada página, sitemap). Sin ella, la copia de trabajo.
const PRODUCCION = !!process.env.SVEA_PRODUCCION;
const SITIO = 'https://sveaconsultores.cl';

// al sitemap sólo van las URLs indexables: fuera las landings de Ads
// (/cotiza-*), /gracias/, /estado/, la 404 y todo lo que paginas.json marca noindex
const NO_INDEXABLES = new Set(
  paginas.filter((p) => /noindex/i.test(p.robots)).map((p) => p.ruta),
);
const indexable = (/** @type {string} */ url) => {
  const ruta = new URL(url).pathname;
  return !ruta.startsWith('/cotiza-')
    && ruta !== '/gracias/'
    && ruta !== '/estado/'
    && ruta !== '/casos/'
    && !ruta.startsWith('/404')
    && !NO_INDEXABLES.has(ruta);
};

/** /estado/ (índice de las páginas para revisar la copia): sólo en la copia. */
const paginaDeApoyo = {
  name: 'svea-paginas-de-apoyo',
  hooks: {
    /** @param {{ injectRoute: (r: { pattern: string; entrypoint: string }) => void }} o */
    'astro:config:setup': ({ injectRoute }) => {
      if (!PRODUCCION) injectRoute({ pattern: '/estado', entrypoint: './src/apoyo/estado.astro' });
      // propuesta de la página de casos (24-sep): sólo en la copia, noindex
      if (!PRODUCCION) injectRoute({ pattern: '/casos', entrypoint: './src/apoyo/casos.astro' });
    },
  },
};

export default defineConfig({
  site: SITIO,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  output: 'static',
  compressHTML: false,        // el contenido que aún viene del WordPress se copia tal cual
  integrations: [
    react(),                  // React sólo en las islas que lo pidan
    paginaDeApoyo,
    ...(PRODUCCION ? [sitemap({ filter: indexable })] : []),
  ],
  vite: { plugins: [tailwind()] },
});
