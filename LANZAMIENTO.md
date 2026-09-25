# Lanzamiento de sveaconsultores.cl

El repositorio construye DOS sitios distintos con el mismo código:

| Comando | Qué sale | Para qué |
|---|---|---|
| `npm run build` | **copia de trabajo**: sin medición, formularios apagados (`action="#"`), todo `noindex`, `robots.txt` con `Disallow: /` y la franja «COPIA DE TRABAJO» abajo | revisar cambios (GitHub Pages, preview local) |
| `npm run build:produccion` | **el sitio real**: GTM-NGVMRNDM + GA4, formularios a Web3Forms, robots de cada página, `robots.txt` abierto con el sitemap, `_redirects` | sveaconsultores.cl |

La diferencia la hace la variable `SVEA_PRODUCCION=1`, que tienen que ver
**los dos pasos** (`scripts/preparar-original.mjs` y `astro build`).
`build:produccion` ya la pasa a ambos.

## 1. El hosting DEBE usar `build:produccion`

- **Vercel:** `vercel.json` ya lo fija (`"buildCommand": "npm run build:produccion"`,
  `"outputDirectory": "dist"`). No sobrescribir el comando en el panel del
  proyecto; si se hace, que sea `npm run build:produccion`.
- **Netlify / Cloudflare Pages / otro:** comando de build `npm run build:produccion`,
  carpeta de salida `dist`. Alternativa equivalente: comando `npm run build`
  con la variable de entorno `SVEA_PRODUCCION=1` definida en el hosting.
- **Nunca** publicar en el dominio un `dist/` hecho con `npm run build` a secas:
  saldría bloqueado a Google y sin un solo lead.

## 2. Verificar el build antes de apuntar el dominio

```sh
SVEA_PRODUCCION=1 node scripts/preparar-original.mjs
SVEA_PRODUCCION=1 npx astro build --outDir /tmp/svea-prod
node scripts/verificar-produccion.mjs /tmp/svea-prod     # robots, aviso, GTM, forms
python3 scripts/chequeo-lanzamiento.py /tmp/svea-prod    # contra el WordPress vivo
npm run build                                            # deja dist/ como copia otra vez
```

`scripts/verificar-produccion.mjs` falla si `robots.txt` tiene un `Disallow`
o no nombra el sitemap, si alguna página trae «aviso-copia» / «COPIA DE
TRABAJO», si a alguna le falta `GTM-NGVMRNDM` o si algún `<form>` tiene
`action="#"`. `chequeo-lanzamiento.py` compara URL por URL con el WordPress
vivo (formulario, access_key, asunto dinámico, from_name, redirect, robots,
canónica) y la medición (un GTM y un GA4 por página, sin conversiones inline);
tiene que terminar en **0 con problemas**.

Después del deploy, a mano en el dominio:

- `https://sveaconsultores.cl/robots.txt` → `Allow: /` y la línea `Sitemap:`.
- Ver código fuente de la portada: sin «COPIA DE TRABAJO» y con `GTM-NGVMRNDM`.
- GTM en modo vista previa (Tag Assistant): dispara el Google tag de Ads y,
  al llegar a `/gracias/`, la conversión del formulario.
- `https://sveaconsultores.cl/una-url-que-no-existe/` → la 404 propia.

## 3. Redirecciones 301

Fuente única: `src/data/redirecciones.json` (tabla y motivos en
`REDIRECCIONES.md`).

- **Vercel:** `vercel.json` (`redirects`). `preparar-original.mjs` corta el
  build si no calza con el JSON.
- **Netlify / Cloudflare Pages:** `public/_redirects`, que el build de
  producción escribe solo y queda en `dist/_redirects`.
- **Apache / Nginx / otro:** traducir la tabla a mano.

Probar después del deploy: `curl -sI https://sveaconsultores.cl/inicio/` →
`301` con `location: /`. Igual con `/calificacion-inofensiva-seremi-2026/`.

**Barra final:** todas las URL terminan en `/` (como en el WordPress, que
redirige `/x` → `/x/`). En Vercel lo hace `"trailingSlash": true` de
`vercel.json`; en otro hosting hay que configurar el mismo 301. Probar:
`curl -sI https://sveaconsultores.cl/cotiza-calificacion-tecnica-industrial`
→ `308`/`301` con `location: /cotiza-calificacion-tecnica-industrial/`.

## 4. Search Console

1. Propiedad de dominio `sveaconsultores.cl` (ya existe la del WordPress).
2. Sitemaps → enviar `https://sveaconsultores.cl/sitemap-index.xml` y quitar el
   `sitemap_index.xml` de Rank Math si sigue listado.
3. Inspección de URL → pedir indexación de la portada, los 8 servicios y las
   guías nuevas.
4. A la semana: Páginas → revisar «Excluida por noindex» (sólo deben estar
   `/cotiza-*`, `/gracias/` y la 404) y «No encontrada (404)».

## 5. Pruebas de formularios (en producción, tras el deploy)

Un envío real por tipo, con datos de prueba y el teléfono de Carlos
(+56 9 8665 5982), revisando que llegue el correo de Web3Forms, que n8n lo
clasifique por la palabra del asunto y que termine en `/gracias/`:

- Portada (`form-home`): elegir «Informe Sanitario» y «Permisos ambientales y
  SEIA» (opciones nuevas del 24-sep) además de una de siempre.
- Un servicio (p. ej. `/calificacion-tecnica-industrial/`).
- Una landing de Ads (`/cotiza-plan-emergencia/`) con `?gclid=prueba&utm_source=prueba`
  en la URL: el correo debe traer gclid y utm_*.
- Una guía (`article-lead-form`).
- El selector de listas (portada, landings, guías): con teclado (Tab, flechas,
  Enter, Esc) y en el teléfono; el valor elegido debe llegar en el correo.
