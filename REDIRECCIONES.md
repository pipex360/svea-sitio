# Redirecciones 301

Las URLs que cambiaron o desaparecieron al pasar del WordPress al sitio en
Astro. Todas son permanentes (301) para que Google traspase la autoridad a la
URL nueva.

| Desde | Hacia | Motivo |
|---|---|---|
| `/calificacion-inofensiva-seremi-2026/` | `/calificacion-inofensiva-seremi/` | slug sin año (24-sep-2026, aprobado por Carlos) |
| `/lp/plan-de-emergencia/` | `/planes-de-emergencia-y-evacuacion/` | landing vieja del WordPress |
| `/plan-de-emergencia/` | `/planes-de-emergencia-y-evacuacion/` | URL vieja del WordPress |
| `/inicio/` | `/` | página «Inicio» duplicada del WordPress |
| `/category/uncategorized/` | `/blog/` | archivo de categoría del WordPress |
| `/author/admin/` | `/blog/` | archivo de autor del WordPress |
| `/cotiza-plan-condominios/` | `/cotiza-plan-emergencia-condominio/` | landing de Ads renombrada |

Cada regla va con y sin barra final (`/inicio/` y `/inicio`).

## Dónde viven

- **Fuente única:** `src/data/redirecciones.json`.
- **Netlify / Cloudflare Pages:** `scripts/preparar-original.mjs` escribe
  `public/_redirects` sólo en el build de producción (`SVEA_PRODUCCION=1`);
  Astro lo copia a la raíz de `dist/`. La copia de trabajo no lleva redirecciones.
- **Vercel:** `vercel.json` en la raíz del repositorio, con las mismas reglas
  (`statusCode: 301`). `preparar-original.mjs` falla si `vercel.json` no calza
  con `src/data/redirecciones.json`, así que al agregar una redirección hay que
  tocar los dos archivos.
- **Otro hosting (Apache, Nginx, GitHub Pages):** ninguno de los dos archivos
  sirve; hay que traducir la tabla de arriba a la configuración del servidor.
  GitHub Pages no permite 301 del lado del servidor.

## Al renombrar una página

1. Renombrar `src/pages/<slug>.astro`, `src/contenido/articulos/<slug>.json`
   y, si tiene copia del WordPress, `originales-wp/articulos/<slug>.html`.
2. Cambiar la ruta, la canónica y el JSON-LD en `src/data/paginas.json`, la
   entrada de `src/contenido/articulos/guias.ts`, el menú
   (`src/components/ui/navigation-menu-06.tsx`) y los enlaces internos
   (`grep -rn <slug-viejo> src scripts`).
3. Agregar la fila a `src/data/redirecciones.json` y a `vercel.json`, y a la
   tabla de este archivo.
4. En `scripts/chequeo-lanzamiento.py`, anotar la ruta en `RENOMBRADAS` para que
   se compare contra la URL vieja del sitio en vivo.
