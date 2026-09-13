// @ts-check
import { defineConfig } from 'astro/config';

// En GitHub Pages el sitio cuelga de /svea-sitio/. En producción irá en la raíz.
const BASE = process.env.BASE_URL || '/';

export default defineConfig({
  site: 'https://sveaconsultores.cl',
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  output: 'static',
  compressHTML: false,   // el HTML original se copia tal cual
});
