// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

// En GitHub Pages el sitio cuelga de /svea-sitio/. En producción irá en la raíz.
const BASE = process.env.BASE_URL || '/';

export default defineConfig({
  site: 'https://sveaconsultores.cl',
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  output: 'static',
  compressHTML: false,        // el contenido que aún viene del WordPress se copia tal cual
  integrations: [react()],    // React sólo en las islas que lo pidan
  vite: { plugins: [tailwind()] },
});
