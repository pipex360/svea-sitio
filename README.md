# Sitio SVEA Consultores

Sitio estático en Astro. Cada push a `main` lo construye, pasa el control de
calidad y lo publica.

- `src/pages/` — las 27 URLs, generadas desde `src/data/paginas.json`
- `src/components/Medicion.astro` — bloques de medición (no se tocan)
- `scripts/verificar.mjs` — control de calidad; falla si algo de la lista roja cambia
- `mejoras/fotos/` — las fotos de contenido, UNA vez cada una, la más grande que
  se tenga, con nombre descriptivo en español y la palabra clave de su página
  (`bodega-productos-estudio-carga-combustible.webp`). `node scripts/fotos.mjs`
  genera las variantes (AVIF + WebP a 640/1080/1600 px, y 1920 en las de hero;
  la del hero se sirve sólo en WebP porque el AVIF se decodifica más lento y
  atrasa el LCP) en `mejoras/img/fotos/`, el og:image de 1200×630 en `mejoras/img/og/` y el
  manifiesto `src/data/fotos.json`. Las páginas nombran la foto y `<Foto>`
  (`src/components/Foto.astro`, `src/components/ui/foto.tsx`) o `fotoHtml()`
  (`src/lib/fotos.ts`) pintan el `<picture>` con `sizes`, width/height y carga
  diferida. Para una foto nueva: dejarla en `mejoras/fotos/`, correr el script
  y nombrarla donde vaya.

    npm install && npm run dev
