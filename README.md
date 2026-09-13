# Sitio SVEA Consultores

Sitio estático en Astro. Cada push a `main` lo construye, pasa el control de
calidad y lo publica.

- `src/pages/` — las 27 URLs, generadas desde `src/data/paginas.json`
- `src/components/Medicion.astro` — bloques de medición (no se tocan)
- `scripts/verificar.mjs` — control de calidad; falla si algo de la lista roja cambia

    npm install && npm run dev
