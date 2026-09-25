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

## 6. Privacidad (Ley 21.719, vigente desde el 1-dic-2026)

Informe de respaldo: `Drive Mac/Svea Consultores/Página Web/Revisión política de
privacidad (Ley 21.719).md`.

- **Política 2.0** en `src/pages/politica-de-privacidad.astro` (fecha y versión
  arriba; la versión 1 del WordPress, íntegra y plegada al final). Al cambiarla:
  subir `VERSION` y `ACTUALIZADA`, mover la versión vigente a «Versión anterior»
  y actualizar `dateModified` en `src/data/paginas.json`.
- **Aviso bajo el botón** de los 31 formularios: `src/components/ui/aviso-formulario.tsx`
  (y su texto en `LandingFormulario.astro`). Es informativo, sin casilla: la base
  para cotizar es el art. 13 c).

### Pendiente para el 1-dic-2026

- [ ] **Nombre del representante legal** en la política (sección 1). Hoy dice
      «el representante legal de Svea Consultores»; el lugar está marcado con
      `<!-- Ley 21.719 (vigente 1-dic-2026): agregar aquí el nombre del representante legal … -->`.
      El art. 14 ter b) pide identificarlo.
- [ ] Aceptar y archivar los DPA de Google, Vercel, Web3Forms, n8n y Supabase
      (la sección 5 de la política dice que las transferencias se amparan en ellos).
- [ ] Programar el borrado de los leads que no compran a los 24 meses del último
      contacto (Gmail, `gmail_leads_historico`, CRM): la política ya lo promete.
- [ ] Procedimiento para responder solicitudes en 30 días y planilla de incidentes.

### Aviso de cookies (Consent Mode v2): preparado y APAGADO

Piezas: `src/lib/aviso-cookies.ts` (interruptor), `src/components/AvisoCookies.astro`
(la barra) y el bloque `AVISO_COOKIES` de `src/components/MedicionSitio.astro`.

**Apagado (hoy)** no se pinta nada: ni la barra, ni `gtag('consent', …)`. La
medición es la misma de antes (lo único nuevo en los scripts son dos guardas
`window.sveaCookiesRechazadas` que nunca se cumplen).

**Encendido:**

1. Activar de una de estas dos formas:
   - en el hosting (Vercel → Settings → Environment Variables), `SVEA_AVISO_COOKIES=1`
     para Production, y volver a desplegar; o
   - en el código, `const ENCENDIDO = true;` en `src/lib/aviso-cookies.ts`.
2. Qué hace:
   - En el `<head>`, ANTES de cargar GTM y GA4, `gtag('consent','default',…)` en
     las dos colas (`dataLayer` del GTM y `dataLayerGA` de GA4): `ad_storage`,
     `analytics_storage`, `ad_user_data` y `ad_personalization` en **granted**,
     salvo que el visitante ya haya rechazado (`localStorage.svea_cookies =
     'rechazadas'`), en cuyo caso los cuatro van en **denied**.
   - La barra (abajo; en escritorio a la izquierda, lejos del WhatsApp) ofrece
     «Rechazar» y «Aceptar». Al elegir: `gtag('consent','update',…)` en las dos
     colas y se guarda la elección. Mientras está abierta, la barra fija del
     teléfono y el WhatsApp flotante suben lo que mide.
   - Si rechaza: no se guarda `svea_user_data` ni se empuja `user_data` en
     /gracias/ (conversiones mejoradas). El evento `form_submit_cotizacion` y la
     conversión de /gracias/ siguen saliendo, sin cookies (pings de Consent Mode).
   - La política muestra el botón «Cambiar mi elección de cookies» (`data-cc-abrir`).
3. Probarlo antes: `SVEA_AVISO_COOKIES=1 SVEA_PRODUCCION=1 npx astro build --outDir /tmp/svea-cc`
   y en Tag Assistant ver el estado de consentimiento («Consent» en cada evento).
   `verificar-produccion.mjs` y `chequeo-lanzamiento.py` deben seguir en OK.
4. **Ojo con el diseño:** con el valor por defecto en *granted*, el aviso es
   de «oposición» (interés legítimo, rechazar desactiva), no de consentimiento
   previo. Para pedir consentimiento previo (lo seguro para remarketing y
   conversiones mejoradas según el informe) basta cambiar el `estado(!rechazo)`
   del `default` por `estado(aceptada)` en `MedicionSitio.astro`, y ajustar la
   sección 3 de la política.

**Medir el efecto 2 a 4 semanas después de encender:**

- Anotar la fecha de encendido. Comparar, por semana, las 4 semanas antes y
  las 2-4 después:
  - conversiones «formulario» de Google Ads vs. leads reales en
    `gmail_leads_historico` (la fuente de verdad);
  - `form_submit_cotizacion` en GA4 vs. esos mismos leads;
  - tamaño de las listas de remarketing y el % de conversiones mejoradas
    («Diagnóstico» de la acción de conversión en Google Ads).
- Tasa de rechazo: en GA4 los usuarios que rechazan no aparecen (o aparecen
  modelados); una estimación es `1 − (conversiones Ads ÷ leads reales)` antes
  vs. después.
- Si la caída de conversiones medidas es grande y la cuenta no alcanza los
  umbrales para modelar, la atribución sigue saliendo del gclid/utm que llegan
  en el correo de cada formulario.
