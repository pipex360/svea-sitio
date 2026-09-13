// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sveaconsultores.cl',

  // Las 26 URLs no cambian: barra final obligatoria y una carpeta con index.html
  // por página, igual que las sirve WordPress hoy.
  trailingSlash: 'always',
  build: { format: 'directory' },

  // Sin adaptador: salida 100 % estática.
  output: 'static',
  compressHTML: true,

  // El sitio no necesita JavaScript de framework. Lo único que viaja es GTM
  // y los bloques de medición del anexo, marcados is:inline para que Astro
  // no los agrupe ni les cambie el orden.
});
