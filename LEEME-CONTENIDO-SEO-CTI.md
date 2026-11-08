# Contenido SEO «Datos CTI» · rama `contenido-seo-cti` · para Ignacio

Preparado el 7 de noviembre de 2026 por SVEA (Carlos) con apoyo de Claude. **Nada de esto está publicado**: la rama se entrega para que la revises en local, la compiles y la publiques en dos olas. No hay push; Carlos sube la rama.

## 1. Qué es

107 páginas nuevas con **datos propios** sobre la Calificación Técnica Industrial (CTI, que la gente busca como «calificación industrial», «patente» y «SEREMI en Línea»): cuánto se tramita, cuánto se rechaza y por qué, cuánto demora la SEREMI y qué exige después, por región, comuna, rubro y situación. Todas siguen la estructura de las guías del sitio (`src/layouts/Articulo.astro`): cabecera con cifras, índice, cuerpo con tablas, formulario, FAQ, servicio relacionado, otras guías.

| Tipo | Páginas | Dónde cuelgan |
|---|---|---|
| Artículos (7 de situación + ranking + «SEREMI en Línea paso a paso») | 9 | raíz: `/<slug>/`, salvo el ranking en `/cti/tasa-de-rechazo/` |
| Informe anual «Calificación Industrial Chile 2026» | 1 | `/informe-cti-chile-2026/` |
| Hubs (índices con `ItemList`) | 2 | `/cti/` y `/despues-de-la-cti/` |
| Regiones | 13 | `/cti/region/<region>/` |
| Comunas (40 o más resoluciones) | 54 | `/cti/<comuna>/` |
| Rubros (Región Metropolitana) | 22 | `/cti/<rubro>/` |
| Servicios posteriores (sólo los que vende SVEA y tienen página de servicio) | 6 | `/despues-de-la-cti/<servicio>/` |
| **Total** | **107** | ola 1: 34 · ola 2: 73 |

Las regiones, comunas, rubros y servicios llevan `oculta: true` en `guias.ts`: tienen página, canónica y entran al sitemap, pero **no salen en /blog/, en «Otras guías» ni en la 404** (se llega a ellas desde los hubs y los artículos). En /blog/ aparece el tema nuevo «Datos CTI» con los 12 artículos, el informe y los dos hubs.

## 2. De dónde salen los datos

Resoluciones públicas de CTI de las SEREMI de Salud de 13 regiones: 11.225 resoluciones entre enero de 2023 y septiembre de 2026, 10.564 con decisión. SVEA las descarga, lee y clasifica cada mes en una base propia (`seremi.db`, en el equipo de Carlos; **no va en el repo**). En el sitio sólo hay **agregados**: nunca nombres de titulares, RUT, representantes ni direcciones. Antes de entregar se corrió una barrida automática de todo lo que entra al repo (JSON, .astro, paginas.json, guias.ts, CSV) contra 13.583 nombres y 9.100 direcciones de la base más el patrón de RUT: **0 coincidencias**. Si editas un JSON a mano, no agregues datos de empresas o personas.

Convención de todas las cifras: «tasa de rechazo» = rechazadas sobre resoluciones **con decisión** (calificada, rechazada o «no ha lugar»); la tasa «sobre publicadas» (incluye desistimientos) se indica cuando se usa. Corte: noviembre 2026; aparece en cada página («Actualizado el …») y en el JSON (`datosCti.corte`).

## 3. Qué archivos cambian en el repo

Nuevos (generados; **no editar a mano**, ver §9):

- `src/contenido/articulos/<slug>.json` · 107 archivos, mismo formato que las guías (bloques html, formulario, faq, relacionados, asunto…) más un campo `datosCti` {tipo, ola, corte, generado}.
- `src/pages/<ruta>.astro` · 107 páginas de una línea: `<Articulo slug="…" />` (los hubs son `index.astro` dentro de `cti/` y `despues-de-la-cti/`).
- `src/pages/datos/cti-chile-agregado.csv.ts` + `src/data/cti-chile-agregado.csv` · el CSV agregado (región × año) que sirven `/datos/cti-chile-agregado.csv`; lo citan los `Dataset`.

Modificados (lo mínimo para que el layout acepte rutas anidadas y páginas ocultas; revísalos en el diff):

- `src/contenido/articulos/guias.ts` · tema nuevo `Datos CTI`; campos opcionales `ruta` y `oculta` en el tipo `Guia`; helper `rutaGuia(g)`; bloque generado de 107 entradas entre las marcas `// --- DATOS CTI (generado…) ---` y `// --- fin DATOS CTI ---`.
- `src/layouts/Articulo.astro` · busca la página en `paginas.json` por `rutaGuia(esta)` (antes `/<slug>/`); «Otras guías» y la URL de compartir usan la ruta propia y saltan las ocultas.
- `src/pages/blog.astro` y `src/pages/404.astro` · listan sólo las guías no ocultas y enlazan por `rutaGuia`.
- `src/data/paginas.json` · una entrada por página nueva (`nueva: true`, `datosCti: true`): title, description, canonical, og_image y el JSON-LD propio (`Dataset`; en los hubs además `CollectionPage` + `ItemList`). `SeoHead.astro` no se tocó: arma como siempre el `Article`, el `BreadcrumbList` (Inicio › Guías › título) y el `FAQPage` desde las preguntas visibles.

Lo que **no** cambia: las 20 guías existentes y sus URL, las páginas de servicio, el menú, el pie, `SeoHead.astro`, `astro.config.mjs` (el sitemap lo arma `@astrojs/sitemap` en producción y toma las 107 rutas solas). No hay redirecciones nuevas.

## 4. Cómo revisarlo en local

```bash
git fetch && git checkout contenido-seo-cti
npm install            # si hace falta
npm run build          # compila los 144 HTML (37 existentes + 107 nuevos); hoy compila sin errores
npm run preview        # http://localhost:4321/cti/ , /cti/quilicura/ , /despues-de-la-cti/ , /seremi-en-linea-calificacion-industrial/ , /blog/
```

Qué mirar: que las tablas se apilen en el teléfono (el layout les pone `data-label`), que el formulario del pie muestre el campo oculto `Origen = Datos CTI - <slug>` y el `Servicio` correcto (CTI en casi todas; plan de emergencia, residuos peligrosos, carga de combustible, transporte de residuos o informe sanitario en las de «después de la CTI»), que /blog/ muestre la sección «Datos CTI» con 12 tarjetas y que la 404 no liste las ocultas. `npm run build:produccion` genera además el sitemap y el robots de producción; `verificar-produccion.mjs` y `chequeo-lanzamiento.py` corren como siempre.

## 5. Las dos olas

Carlos decidió publicar en **dos olas en 3-4 semanas**, no en tandas de meses. La ola 1 conviene publicarla **antes de enero** (pico de búsquedas de «patente municipal / comercial» por el pago semestral: enero y julio, según Trends) y reforzar en junio-julio con un post y la actualización mensual.

### Ola 1 · 34 páginas (artículos, ranking, SEREMI en Línea, hubs, 13 regiones, 6 comunas y 4 rubros más fuertes)

| # | Tipo | URL | Title | Archivo del sitio | Archivo .md de origen |
|---|---|---|---|---|---|
| 1 | Artículo | `/cti-condominio-industrial/` | Patente en condominio industrial: 58 % de rechazo SEREMI | `src/contenido/articulos/cti-condominio-industrial.json` | `articulo_condominios_industriales_cti.md` |
| 2 | Artículo | `/cti-no-cumple-normativa/` | Rechazo SEREMI «no cumple normativa»: qué revisa en 2026 | `src/contenido/articulos/cti-no-cumple-normativa.json` | `articulo_no_cumple_normativa_2026.md` |
| 3 | Artículo | `/cti-persona-natural/` | Patente MEF y persona natural: por qué se rechaza el 64 % | `src/contenido/articulos/cti-persona-natural.json` | `articulo_cti_persona_natural.md` |
| 4 | Artículo | `/plazo-seremi-cti/` | Cuánto demora la SEREMI: plazo de la calificación industrial | `src/contenido/articulos/plazo-seremi-cti.json` | `articulo_plazo_seremi_cti.md` |
| 5 | Artículo | `/por-que-rechazan-la-cti/` | Por qué la SEREMI rechaza la calificación industrial (RM) | `src/contenido/articulos/por-que-rechazan-la-cti.json` | `articulo_por_que_rechazan_cti.md` |
| 6 | Artículo | `/rechazo-cti-que-hacer/` | Rechazo SEREMI de la calificación industrial: qué hacer | `src/contenido/articulos/rechazo-cti-que-hacer.json` | `articulo_rechazo_cti_que_hacer.md` |
| 7 | Artículo | `/regularizar-cti-actividad-existente/` | Regularizar una actividad sin patente: 42 % de rechazo | `src/contenido/articulos/regularizar-cti-actividad-existente.json` | `articulo_regularizar_cti_actividad_existente.md` |
| 8 | Artículo | `/seremi-en-linea-calificacion-industrial/` | Calificación industrial en SEREMI en Línea: paso a paso | `src/contenido/articulos/seremi-en-linea-calificacion-industrial.json` | `articulo_seremi_en_linea_calificacion_industrial.md` |
| 9 | Artículo | `/cti/tasa-de-rechazo/` | Rechazo SEREMI de la calificación industrial 2026: ranking | `src/contenido/articulos/tasa-rechazo-cti-ranking.json` | `articulo_tasa_rechazo_cti_ranking.md` |
| 10 | Hub | `/cti/` | Calificación industrial: datos SEREMI por región y comuna | `src/contenido/articulos/cti-hub.json` | `paginas/cti-hub.md` |
| 11 | Hub | `/despues-de-la-cti/` | Después de la calificación industrial: DS 44, DS 43, SIDREP | `src/contenido/articulos/despues-de-la-cti-hub.json` | `paginas/despues-de-la-cti-hub.md` |
| 12 | Región | `/cti/region/antofagasta/` | Calificación industrial SEREMI Antofagasta: rechazo y plazo | `src/contenido/articulos/cti-region-antofagasta.json` | `paginas/cti-region-antofagasta.md` |
| 13 | Región | `/cti/region/araucania/` | Calificación industrial SEREMI Araucanía: rechazo y plazo | `src/contenido/articulos/cti-region-araucania.json` | `paginas/cti-region-araucania.md` |
| 14 | Región | `/cti/region/arica-y-parinacota/` | Permiso SEREMI Arica y Parinacota: calificación industrial | `src/contenido/articulos/cti-region-arica-y-parinacota.json` | `paginas/cti-region-arica-y-parinacota.md` |
| 15 | Región | `/cti/region/atacama/` | Calificación industrial SEREMI Atacama: rechazo y plazo | `src/contenido/articulos/cti-region-atacama.json` | `paginas/cti-region-atacama.md` |
| 16 | Región | `/cti/region/aysen/` | Calificación industrial SEREMI Aysén: rechazo y plazo | `src/contenido/articulos/cti-region-aysen.json` | `paginas/cti-region-aysen.md` |
| 17 | Región | `/cti/region/coquimbo/` | Calificación industrial SEREMI Coquimbo: rechazo y plazo | `src/contenido/articulos/cti-region-coquimbo.json` | `paginas/cti-region-coquimbo.md` |
| 18 | Región | `/cti/region/los-lagos/` | Calificación industrial SEREMI Los Lagos: rechazo y plazo | `src/contenido/articulos/cti-region-los-lagos.json` | `paginas/cti-region-los-lagos.md` |
| 19 | Región | `/cti/region/los-rios/` | Calificación industrial SEREMI Los Ríos: rechazo y plazo | `src/contenido/articulos/cti-region-los-rios.json` | `paginas/cti-region-los-rios.md` |
| 20 | Región | `/cti/region/magallanes/` | Calificación industrial SEREMI Magallanes: rechazo y plazo | `src/contenido/articulos/cti-region-magallanes.json` | `paginas/cti-region-magallanes.md` |
| 21 | Región | `/cti/region/maule/` | Calificación industrial SEREMI Maule: rechazo y plazo | `src/contenido/articulos/cti-region-maule.json` | `paginas/cti-region-maule.md` |
| 22 | Región | `/cti/region/metropolitana/` | Permiso SEREMI Metropolitana: calificación industrial | `src/contenido/articulos/cti-region-metropolitana.json` | `paginas/cti-region-metropolitana.md` |
| 23 | Región | `/cti/region/tarapaca/` | Calificación industrial SEREMI Tarapacá: rechazo y plazo | `src/contenido/articulos/cti-region-tarapaca.json` | `paginas/cti-region-tarapaca.md` |
| 24 | Región | `/cti/region/valparaiso/` | Calificación industrial SEREMI Valparaíso: rechazo y plazo | `src/contenido/articulos/cti-region-valparaiso.json` | `paginas/cti-region-valparaiso.md` |
| 25 | Comuna | `/cti/la-pintana/` | Patente y permiso SEREMI en La Pintana: requisitos | `src/contenido/articulos/cti-la-pintana.json` | `paginas/cti-la-pintana.md` |
| 26 | Comuna | `/cti/lampa/` | Patente y permiso SEREMI en Lampa: requisitos | `src/contenido/articulos/cti-lampa.json` | `paginas/cti-lampa.md` |
| 27 | Comuna | `/cti/quilicura/` | Patente y permiso SEREMI en Quilicura: requisitos | `src/contenido/articulos/cti-quilicura.json` | `paginas/cti-quilicura.md` |
| 28 | Comuna | `/cti/quinta-normal/` | Patente y permiso SEREMI en Quinta Normal: requisitos | `src/contenido/articulos/cti-quinta-normal.json` | `paginas/cti-quinta-normal.md` |
| 29 | Comuna | `/cti/renca/` | Patente y permiso SEREMI en Renca: requisitos | `src/contenido/articulos/cti-renca.json` | `paginas/cti-renca.md` |
| 30 | Comuna | `/cti/san-bernardo/` | Patente y permiso SEREMI en San Bernardo: requisitos | `src/contenido/articulos/cti-san-bernardo.json` | `paginas/cti-san-bernardo.md` |
| 31 | Rubro | `/cti/alimentos/` | Patente y permiso SEREMI para alimentos: requisitos | `src/contenido/articulos/cti-alimentos.json` | `paginas/cti-alimentos.md` |
| 32 | Rubro | `/cti/bodegas/` | Patente y permiso SEREMI para bodegas: requisitos | `src/contenido/articulos/cti-bodegas.json` | `paginas/cti-bodegas.md` |
| 33 | Rubro | `/cti/materiales-construccion/` | Permiso SEREMI para materiales de construcción: requisitos | `src/contenido/articulos/cti-materiales-construccion.json` | `paginas/cti-materiales-construccion.md` |
| 34 | Rubro | `/cti/metalmecanica/` | Patente y permiso SEREMI para metalmecánica: requisitos | `src/contenido/articulos/cti-metalmecanica.json` | `paginas/cti-metalmecanica.md` |

### Ola 2 · 73 páginas (informe anual, resto de comunas y rubros, 6 servicios posteriores) · una semana después de revisar la ola 1 en Search Console

| # | Tipo | URL | Title | Archivo del sitio | Archivo .md de origen |
|---|---|---|---|---|---|
| 1 | Informe anual | `/informe-cti-chile-2026/` | Informe Calificación Industrial Chile 2026: 13 SEREMI | `src/contenido/articulos/informe-cti-chile-2026.json` | `informe_cti_chile_2026.md` |
| 2 | Comuna | `/cti/antofagasta/` | Patente y permiso SEREMI en Antofagasta: requisitos | `src/contenido/articulos/cti-antofagasta.json` | `paginas/cti-antofagasta.md` |
| 3 | Comuna | `/cti/arica/` | Patente y permiso SEREMI en Arica: requisitos | `src/contenido/articulos/cti-arica.json` | `paginas/cti-arica.md` |
| 4 | Comuna | `/cti/buin/` | Patente y permiso SEREMI en Buin: requisitos | `src/contenido/articulos/cti-buin.json` | `paginas/cti-buin.md` |
| 5 | Comuna | `/cti/cerrillos/` | Patente y permiso SEREMI en Cerrillos: requisitos | `src/contenido/articulos/cti-cerrillos.json` | `paginas/cti-cerrillos.md` |
| 6 | Comuna | `/cti/cerro-navia/` | Patente y permiso SEREMI en Cerro Navia: requisitos | `src/contenido/articulos/cti-cerro-navia.json` | `paginas/cti-cerro-navia.md` |
| 7 | Comuna | `/cti/colina/` | Patente y permiso SEREMI en Colina: requisitos | `src/contenido/articulos/cti-colina.json` | `paginas/cti-colina.md` |
| 8 | Comuna | `/cti/conchali/` | Patente y permiso SEREMI en Conchalí: requisitos | `src/contenido/articulos/cti-conchali.json` | `paginas/cti-conchali.md` |
| 9 | Comuna | `/cti/concon/` | Patente y permiso SEREMI en Concón: requisitos | `src/contenido/articulos/cti-concon.json` | `paginas/cti-concon.md` |
| 10 | Comuna | `/cti/copiapo/` | Patente y permiso SEREMI en Copiapó: requisitos | `src/contenido/articulos/cti-copiapo.json` | `paginas/cti-copiapo.md` |
| 11 | Comuna | `/cti/coquimbo/` | Patente y permiso SEREMI en Coquimbo: requisitos | `src/contenido/articulos/cti-coquimbo.json` | `paginas/cti-coquimbo.md` |
| 12 | Comuna | `/cti/curico/` | Patente y permiso SEREMI en Curicó: requisitos | `src/contenido/articulos/cti-curico.json` | `paginas/cti-curico.md` |
| 13 | Comuna | `/cti/estacion-central/` | Patente y permiso SEREMI en Estación Central: requisitos | `src/contenido/articulos/cti-estacion-central.json` | `paginas/cti-estacion-central.md` |
| 14 | Comuna | `/cti/huechuraba/` | Patente y permiso SEREMI en Huechuraba: requisitos | `src/contenido/articulos/cti-huechuraba.json` | `paginas/cti-huechuraba.md` |
| 15 | Comuna | `/cti/independencia/` | Patente y permiso SEREMI en Independencia: requisitos | `src/contenido/articulos/cti-independencia.json` | `paginas/cti-independencia.md` |
| 16 | Comuna | `/cti/iquique/` | Patente y permiso SEREMI en Iquique: requisitos | `src/contenido/articulos/cti-iquique.json` | `paginas/cti-iquique.md` |
| 17 | Comuna | `/cti/la-cisterna/` | Patente y permiso SEREMI en La Cisterna: requisitos | `src/contenido/articulos/cti-la-cisterna.json` | `paginas/cti-la-cisterna.md` |
| 18 | Comuna | `/cti/la-florida/` | Patente y permiso SEREMI en La Florida: requisitos | `src/contenido/articulos/cti-la-florida.json` | `paginas/cti-la-florida.md` |
| 19 | Comuna | `/cti/la-granja/` | Patente y permiso SEREMI en La Granja: requisitos | `src/contenido/articulos/cti-la-granja.json` | `paginas/cti-la-granja.md` |
| 20 | Comuna | `/cti/la-reina/` | Patente y permiso SEREMI en La Reina: requisitos | `src/contenido/articulos/cti-la-reina.json` | `paginas/cti-la-reina.md` |
| 21 | Comuna | `/cti/la-serena/` | Patente y permiso SEREMI en La Serena: requisitos | `src/contenido/articulos/cti-la-serena.json` | `paginas/cti-la-serena.md` |
| 22 | Comuna | `/cti/las-condes/` | Patente y permiso SEREMI en Las Condes: requisitos | `src/contenido/articulos/cti-las-condes.json` | `paginas/cti-las-condes.md` |
| 23 | Comuna | `/cti/lo-espejo/` | Patente y permiso SEREMI en Lo Espejo: requisitos | `src/contenido/articulos/cti-lo-espejo.json` | `paginas/cti-lo-espejo.md` |
| 24 | Comuna | `/cti/los-andes/` | Patente y permiso SEREMI en Los Andes: requisitos | `src/contenido/articulos/cti-los-andes.json` | `paginas/cti-los-andes.md` |
| 25 | Comuna | `/cti/macul/` | Patente y permiso SEREMI en Macul: requisitos | `src/contenido/articulos/cti-macul.json` | `paginas/cti-macul.md` |
| 26 | Comuna | `/cti/maipu/` | Patente y permiso SEREMI en Maipú: requisitos | `src/contenido/articulos/cti-maipu.json` | `paginas/cti-maipu.md` |
| 27 | Comuna | `/cti/melipilla/` | Patente y permiso SEREMI en Melipilla: requisitos | `src/contenido/articulos/cti-melipilla.json` | `paginas/cti-melipilla.md` |
| 28 | Comuna | `/cti/nunoa/` | Patente y permiso SEREMI en Ñuñoa: requisitos | `src/contenido/articulos/cti-nunoa.json` | `paginas/cti-nunoa.md` |
| 29 | Comuna | `/cti/osorno/` | Patente y permiso SEREMI en Osorno: requisitos | `src/contenido/articulos/cti-osorno.json` | `paginas/cti-osorno.md` |
| 30 | Comuna | `/cti/paine/` | Patente y permiso SEREMI en Paine: requisitos | `src/contenido/articulos/cti-paine.json` | `paginas/cti-paine.md` |
| 31 | Comuna | `/cti/penaflor/` | Patente y permiso SEREMI en Peñaflor: requisitos | `src/contenido/articulos/cti-penaflor.json` | `paginas/cti-penaflor.md` |
| 32 | Comuna | `/cti/penalolen/` | Patente y permiso SEREMI en Peñalolén: requisitos | `src/contenido/articulos/cti-penalolen.json` | `paginas/cti-penalolen.md` |
| 33 | Comuna | `/cti/pudahuel/` | Patente y permiso SEREMI en Pudahuel: requisitos | `src/contenido/articulos/cti-pudahuel.json` | `paginas/cti-pudahuel.md` |
| 34 | Comuna | `/cti/puente-alto/` | Patente y permiso SEREMI en Puente Alto: requisitos | `src/contenido/articulos/cti-puente-alto.json` | `paginas/cti-puente-alto.md` |
| 35 | Comuna | `/cti/puerto-montt/` | Patente y permiso SEREMI en Puerto Montt: requisitos | `src/contenido/articulos/cti-puerto-montt.json` | `paginas/cti-puerto-montt.md` |
| 36 | Comuna | `/cti/punta-arenas/` | Patente y permiso SEREMI en Punta Arenas: requisitos | `src/contenido/articulos/cti-punta-arenas.json` | `paginas/cti-punta-arenas.md` |
| 37 | Comuna | `/cti/quilpue/` | Patente y permiso SEREMI en Quilpué: requisitos | `src/contenido/articulos/cti-quilpue.json` | `paginas/cti-quilpue.md` |
| 38 | Comuna | `/cti/recoleta/` | Patente y permiso SEREMI en Recoleta: requisitos | `src/contenido/articulos/cti-recoleta.json` | `paginas/cti-recoleta.md` |
| 39 | Comuna | `/cti/san-antonio/` | Patente y permiso SEREMI en San Antonio: requisitos | `src/contenido/articulos/cti-san-antonio.json` | `paginas/cti-san-antonio.md` |
| 40 | Comuna | `/cti/san-joaquin/` | Patente y permiso SEREMI en San Joaquín: requisitos | `src/contenido/articulos/cti-san-joaquin.json` | `paginas/cti-san-joaquin.md` |
| 41 | Comuna | `/cti/san-miguel/` | Patente y permiso SEREMI en San Miguel: requisitos | `src/contenido/articulos/cti-san-miguel.json` | `paginas/cti-san-miguel.md` |
| 42 | Comuna | `/cti/san-ramon/` | Patente y permiso SEREMI en San Ramón: requisitos | `src/contenido/articulos/cti-san-ramon.json` | `paginas/cti-san-ramon.md` |
| 43 | Comuna | `/cti/santiago/` | Patente y permiso SEREMI en Santiago: requisitos | `src/contenido/articulos/cti-santiago.json` | `paginas/cti-santiago.md` |
| 44 | Comuna | `/cti/talca/` | Patente y permiso SEREMI en Talca: requisitos | `src/contenido/articulos/cti-talca.json` | `paginas/cti-talca.md` |
| 45 | Comuna | `/cti/temuco/` | Patente y permiso SEREMI en Temuco: requisitos | `src/contenido/articulos/cti-temuco.json` | `paginas/cti-temuco.md` |
| 46 | Comuna | `/cti/valdivia/` | Patente y permiso SEREMI en Valdivia: requisitos | `src/contenido/articulos/cti-valdivia.json` | `paginas/cti-valdivia.md` |
| 47 | Comuna | `/cti/valparaiso/` | Patente y permiso SEREMI en Valparaíso: requisitos | `src/contenido/articulos/cti-valparaiso.json` | `paginas/cti-valparaiso.md` |
| 48 | Comuna | `/cti/vina-del-mar/` | Patente y permiso SEREMI en Viña del Mar: requisitos | `src/contenido/articulos/cti-vina-del-mar.json` | `paginas/cti-vina-del-mar.md` |
| 49 | Comuna | `/cti/vitacura/` | Patente y permiso SEREMI en Vitacura: requisitos | `src/contenido/articulos/cti-vitacura.json` | `paginas/cti-vitacura.md` |
| 50 | Rubro | `/cti/alimentos-para-animales/` | Permiso SEREMI para alimentos para animales: requisitos | `src/contenido/articulos/cti-alimentos-para-animales.json` | `paginas/cti-alimentos-para-animales.md` |
| 51 | Rubro | `/cti/bebidas/` | Patente y permiso SEREMI para bebidas: requisitos | `src/contenido/articulos/cti-bebidas.json` | `paginas/cti-bebidas.md` |
| 52 | Rubro | `/cti/caucho/` | Patente y permiso SEREMI para caucho: requisitos | `src/contenido/articulos/cti-caucho.json` | `paginas/cti-caucho.md` |
| 53 | Rubro | `/cti/electricos-electronicos/` | Permiso SEREMI para eléctricos y electrónicos: requisitos | `src/contenido/articulos/cti-electricos-electronicos.json` | `paginas/cti-electricos-electronicos.md` |
| 54 | Rubro | `/cti/infraestructura-energetica/` | Permiso SEREMI para infraestructura energética: requisitos | `src/contenido/articulos/cti-infraestructura-energetica.json` | `paginas/cti-infraestructura-energetica.md` |
| 55 | Rubro | `/cti/locales-comerciales/` | Permiso SEREMI para locales comerciales: requisitos | `src/contenido/articulos/cti-locales-comerciales.json` | `paginas/cti-locales-comerciales.md` |
| 56 | Rubro | `/cti/locales-publicos/` | Patente y permiso SEREMI para locales públicos: requisitos | `src/contenido/articulos/cti-locales-publicos.json` | `paginas/cti-locales-publicos.md` |
| 57 | Rubro | `/cti/madera-muebles/` | Patente y permiso SEREMI para madera y muebles: requisitos | `src/contenido/articulos/cti-madera-muebles.json` | `paginas/cti-madera-muebles.md` |
| 58 | Rubro | `/cti/minerales-no-metalicos/` | Permiso SEREMI para minerales no metálicos: requisitos | `src/contenido/articulos/cti-minerales-no-metalicos.json` | `paginas/cti-minerales-no-metalicos.md` |
| 59 | Rubro | `/cti/papel-carton-imprentas/` | Permiso SEREMI para papel, cartón e imprentas: requisitos | `src/contenido/articulos/cti-papel-carton-imprentas.json` | `paginas/cti-papel-carton-imprentas.md` |
| 60 | Rubro | `/cti/plasticos/` | Patente y permiso SEREMI para plásticos: requisitos | `src/contenido/articulos/cti-plasticos.json` | `paginas/cti-plasticos.md` |
| 61 | Rubro | `/cti/quimicos/` | Patente y permiso SEREMI para químicos: requisitos | `src/contenido/articulos/cti-quimicos.json` | `paginas/cti-quimicos.md` |
| 62 | Rubro | `/cti/residuos/` | Patente y permiso SEREMI para residuos: requisitos | `src/contenido/articulos/cti-residuos.json` | `paginas/cti-residuos.md` |
| 63 | Rubro | `/cti/rubro-automotor/` | Patente y permiso SEREMI para rubro automotor: requisitos | `src/contenido/articulos/cti-rubro-automotor.json` | `paginas/cti-rubro-automotor.md` |
| 64 | Rubro | `/cti/servicios/` | Patente y permiso SEREMI para servicios: requisitos | `src/contenido/articulos/cti-servicios.json` | `paginas/cti-servicios.md` |
| 65 | Rubro | `/cti/talleres-mecanicos/` | Patente y permiso SEREMI para talleres mecánicos: requisitos | `src/contenido/articulos/cti-talleres-mecanicos.json` | `paginas/cti-talleres-mecanicos.md` |
| 66 | Rubro | `/cti/textil/` | Patente y permiso SEREMI para textil: requisitos | `src/contenido/articulos/cti-textil.json` | `paginas/cti-textil.md` |
| 67 | Rubro | `/cti/vidrio/` | Patente y permiso SEREMI para vidrio: requisitos | `src/contenido/articulos/cti-vidrio.json` | `paginas/cti-vidrio.md` |
| 68 | Servicio posterior | `/despues-de-la-cti/autorizacion-sanitaria-alimentos/` | Resolución sanitaria para alimentos: autorización SEREMI | `src/contenido/articulos/despues-cti-autorizacion-sanitaria-alimentos.json` | `paginas/despues-cti-autorizacion-sanitaria-alimentos.md` |
| 69 | Servicio posterior | `/despues-de-la-cti/plan-de-emergencia/` | Plan de emergencia DS 44: cuándo lo exige la SEREMI | `src/contenido/articulos/despues-cti-plan-de-emergencia.json` | `paginas/despues-cti-plan-de-emergencia.md` |
| 70 | Servicio posterior | `/despues-de-la-cti/proteccion-contra-incendio/` | Extintores y estudio de carga combustible: exigencias SEREMI | `src/contenido/articulos/despues-cti-proteccion-contra-incendio.json` | `paginas/despues-cti-proteccion-contra-incendio.md` |
| 71 | Servicio posterior | `/despues-de-la-cti/residuos-no-peligrosos-sinader/` | SINADER y retiro de residuos: qué exige la SEREMI | `src/contenido/articulos/despues-cti-residuos-no-peligrosos-sinader.json` | `paginas/despues-cti-residuos-no-peligrosos-sinader.md` |
| 72 | Servicio posterior | `/despues-de-la-cti/residuos-peligrosos-ds-148/` | SIDREP y residuos peligrosos tras la calificación industrial | `src/contenido/articulos/despues-cti-residuos-peligrosos-ds-148.json` | `paginas/despues-cti-residuos-peligrosos-ds-148.md` |
| 73 | Servicio posterior | `/despues-de-la-cti/sustancias-peligrosas-ds-43/` | Bodega de sustancias peligrosas DS 43 (SUSPEL) y la SEREMI | `src/contenido/articulos/despues-cti-sustancias-peligrosas-ds-43.json` | `paginas/despues-cti-sustancias-peligrosas-ds-43.md` |

Cómo publicar sólo la ola 1: las 73 páginas de la ola 2 ya están en la rama; la forma simple es marcar `robots: "noindex, follow"` en sus entradas de `paginas.json` (campo `datosCti.ola == 2` en el JSON de contenido y columna «ola» en `paquete/indice_paginas.json`) y volverlas a `index, follow` al publicar la ola 2; `astro.config.mjs` excluye del sitemap lo que `paginas.json` marca noindex. Alternativa: borrar temporalmente sus `.astro`. Lo que no conviene es publicar las 73 sin el `noindex` y «esconderlas»: Google las rastrea igual.

## 6. Estructura de rutas y enlazado interno

```
/calificacion-tecnica-industrial/   (servicio existente) ◄── CTA «Cotizar la calificación industrial» desde TODAS las páginas nuevas
/seremi-en-linea-calificacion-industrial/   pilar: cómo se tramita en SEREMI en Línea (ASDigital), enlazado desde todas
/por-que-rechazan-la-cti/ · /rechazo-cti-que-hacer/ · /plazo-seremi-cti/ · /cti-persona-natural/
/regularizar-cti-actividad-existente/ · /cti-no-cumple-normativa/ · /cti-condominio-industrial/ · /informe-cti-chile-2026/
/cti/                      hub «calificación industrial por región, comuna y rubro» (CollectionPage + ItemList)
   /cti/tasa-de-rechazo/   ranking (enlazado desde el hub, «por qué rechazan» y cada región/comuna/rubro)
   /cti/region/<region>/   13
   /cti/<comuna>/          54 (comparadas con su región)
   /cti/<rubro>/           22 (RM)
/despues-de-la-cti/        hub de exigencias posteriores → /despues-de-la-cti/<servicio>/ (6), cada una con CTA a su página de servicio
```

Reglas que ya cumplen los archivos: toda página nueva enlaza una vez al servicio CTI y al pilar de SEREMI en Línea; cada comuna enlaza a su región y al hub; cada región a sus comunas con página y a los rubros; cada rubro a sus comunas; cada servicio posterior a su página de servicio SVEA (`/planes-de-emergencia-y-evacuacion/`, `/manejo-de-residuos-peligrosos/`, `/estudio-de-carga-de-combustible/`, `/autorizacion-de-transporte-de-residuos/`, `/informe-sanitario/`) y a la guía relacionada (D.S. 43, SIDREP/SINADER); región, comuna y rubro enlazan al ranking. El conversor comprobó que **todos los enlaces internos tienen destino**.

Lo que falta y es trabajo del sitio (cambios de una línea, cuando Ignacio quiera): desde la guía `/calificacion-tecnica-industrial-chile/` enlazar a `/por-que-rechazan-la-cti/` y `/cti/`; desde `/rechazo-observaciones-seremi/` a `/rechazo-cti-que-hacer/`; desde el servicio CTI al pilar y al hub; desde la guía D.S. 43 a `/despues-de-la-cti/sustancias-peligrosas-ds-43/`; desde la guía SIDREP a `/despues-de-la-cti/residuos-peligrosos-ds-148/`; desde el servicio plan de emergencia a `/despues-de-la-cti/plan-de-emergencia/`; una entrada «Datos CTI» en el menú de guías (`GUIAS_MENU`) y en `llms.txt` si el sitio lo tiene.

## 7. Palabras clave (Planificador de Google Ads, Chile, oct-2025 → sep-2026) y qué página las trabaja

La CTI casi no se busca por su nombre («calificacion tecnica industrial» 70/mes). La gente llega por la **patente**, por **SEREMI en Línea** y por los **decretos** de los servicios. Por eso los títulos usan «calificación industrial» como término principal y «CTI» como sigla, y las páginas de comuna y rubro se titulan «Patente y permiso SEREMI…».

| Página o grupo | Palabra principal | Búsquedas/mes (Chile) | Secundarias |
|---|---|---|---|
| `/seremi-en-linea-calificacion-industrial/` (artículo pilar, ola 1) | seremi en linea | 18.100 | seremi en línea asdigital 880 · asdigital seremi 320 · tramites en linea seremi de salud 260 · seremi en línea resolución sanitaria 720 |
| Páginas de **comuna** (54) y **rubro** (22): «Patente y permiso SEREMI en/para…» | patente municipal / patente comercial | 2.400 / 2.400 | patente provisoria 320 · tipos de patentes comerciales 140 · calificacion industrial 210 · calificacion industrial seremi 50 |
| Páginas de **región** (13) y hub `/cti/` | calificacion industrial | 210 | calificacion industrial seremi 50 · calificacion tecnica industrial 70 · cti 480 (ambiguo) · «cti seremi <región>» sin volumen medible |
| `/cti-persona-natural/` (patente MEF) | patente microempresa familiar / patente mef | 140 / 140 | ley 19.749 microempresa familiar 10 |
| `/regularizar-cti-actividad-existente/` | patente provisoria | 320 | patente municipal 2.400 · permiso de funcionamiento 10 |
| `/por-que-rechazan-la-cti/`, `/rechazo-cti-que-hacer/`, `/cti-no-cumple-normativa/` | resolución sanitaria (rechazada / observaciones SEREMI) | 4.400 (resolución sanitaria) · 1.000 (resolucion sanitaria seremi) | «me rechazaron la cti», «recurso de reposición seremi»: sin volumen medible; se mantienen por intención (grupo Ads «Rechazados») |
| `/plazo-seremi-cti/` | cuánto demora la seremi / seremi en linea | 18.100 (seremi en linea) | plazo calificación industrial: sin volumen medible |
| `/cti/tasa-de-rechazo/` (ranking) e `/informe-cti-chile-2026/` | calificacion industrial + seremi de salud (datos) | 210 · 22.200 (navegacional) | recurso enlazable: prensa, gremios, asistentes de IA |
| `/despues-de-la-cti/plan-de-emergencia/` | ds 44 | 12.100 | plan de emergencia 880 · plan de emergencia y evacuación 210 · plan de emergencia ds 44 140 |
| `/despues-de-la-cti/sustancias-peligrosas-ds-43/` | ds 43 | 2.400 | sustancias peligrosas 880 · bodega suspel 320 · hojas de seguridad hds 40 |
| `/despues-de-la-cti/residuos-peligrosos-ds-148/` | sidrep | 1.900 | residuos peligrosos 1.000 |
| `/despues-de-la-cti/residuos-no-peligrosos-sinader/` | sinader | 1.300 | transporte de residuos 50 |
| `/despues-de-la-cti/proteccion-contra-incendio/` | estudio de carga combustible | 140 | carga de fuego 30 |
| `/despues-de-la-cti/autorizacion-sanitaria-alimentos/` | resolución sanitaria / autorizacion sanitaria | 4.400 / 590 | permiso sanitario 320 · informe sanitario 210 · resolución sanitaria alimentos 90 · permiso para elaborar alimentos 10 |
| `/cti-condominio-industrial/` | patente comercial (bodega en condominio) | 2.400 | canal B2B (administradores de condominios), no sólo SEO |

Los títulos, descripciones, H1 y palabras objetivo de las 107 páginas están en `paquete/titulos_y_palabras.md` (una fila por página) para ajustarlos con Search Console sin tocar el cuerpo: se cambia el front-matter del `.md` de origen y se vuelve a correr el conversor (§9).

## 8. JSON-LD por tipo de página (lo que ya trae `paginas.json`)

Todas: `Article` + `BreadcrumbList` + `FAQPage` (los arma `SeoHead.astro` como en las guías) y un **`Dataset`** propio con `spatialCoverage` (región, comuna o Chile), `temporalCoverage` 2023-01-01/2026-09-30, `license` CC BY 4.0, `creator`/`publisher` = `#organization`, `variableMeasured`, `dateModified` y, en artículos, hubs, regiones, ranking e informe, `distribution` → `/datos/cti-chile-agregado.csv`. Los hubs agregan `CollectionPage` con `mainEntity: ItemList` de sus páginas hijas. Las páginas de «después de la CTI» **no** declaran `Service`: lo declara la página de servicio enlazada. Ejemplo (comuna):

```json
{"@context":"https://schema.org","@type":"Dataset","@id":"https://sveaconsultores.cl/cti/quilicura/#dataset",
 "name":"Patente y permiso SEREMI en Quilicura: requisitos (datos SEREMI, SVEA Consultores)",
 "spatialCoverage":{"@type":"Place","name":"Quilicura, Metropolitana","containedInPlace":{"@type":"Country","name":"Chile"}},
 "temporalCoverage":"2023-01-01/2026-09-30","license":"https://creativecommons.org/licenses/by/4.0/",
 "creator":{"@id":"https://sveaconsultores.cl/#organization"},"dateModified":"2026-11-07",
 "variableMeasured":["resoluciones de CTI con decisión","tasa de rechazo","antecedentes faltantes","días de trámite"]}
```

## 9. Actualización mensual (cómo vendrán los cambios)

La base se actualiza los días 5-10 de cada mes en el equipo de Carlos (`actualizar.sh`). Después, tres comandos en `~/svea/datos_seremi/seo/` regeneran todo y vuelven a escribir los mismos archivos del repo (mismos slugs y rutas; cambian las cifras, `dateModified`, «Actualizado el…» y el CSV):

```bash
python3 generar_paginas_seo.py          # 97 .md programáticos + _indice.json + barrida (falla si encuentra un nombre/RUT/dirección)
python3 generar_informe_y_ranking.py    # ranking, informe y CSV agregado
python3 convertir_a_sitio.py --sitio ~/svea/svea-sitio-seo   # JSON + .astro + paginas.json + guias.ts + paquete/
python3 barrer_paquete.py               # barrida final sobre lo que entra al repo
```

Ignacio recibe el commit (o los archivos) y sólo compila y publica. Páginas nuevas aparecen cuando una comuna cruza 40 resoluciones; ninguna se borra. Si un mes cambia más de 5 puntos el rechazo o más de 10 días el plazo de una página, Carlos la revisa antes de enviarla (suele ser error de carga). Los artículos redactados a mano (`articulo_*.md`) tienen cifras fijas marcadas con el corte; se revisan trimestralmente y el informe se reedita cada año en la misma URL.

## 10. Checklist de publicación

1. `npm run build:produccion` sin errores; `node scripts/verificar-produccion.mjs dist`; `python3 scripts/chequeo-lanzamiento.py`.
2. Revisar en el preview 5 páginas al azar de cada tipo: título, H1, cifras de cabecera, tablas en móvil, FAQ desplegable, formulario con `Origen` correcto, enlaces a servicio y hubs.
3. Ola 2 en `noindex, follow` hasta su fecha (§5).
4. Subir, verificar en vivo (`https://sveaconsultores.cl/cti/`, `/cti/quilicura/`, `/datos/cti-chile-agregado.csv` descarga, `/sitemap-index.xml` incluye las rutas nuevas).
5. Search Console: enviar el sitemap de nuevo e inspeccionar (URL sin www) el hub `/cti/`, el pilar de SEREMI en Línea, el ranking, dos regiones y dos comunas; pedir indexación.
6. Un post en redes por página pilar (skill `svea-rrss`) enlazando al hub.
7. Comprobar el primer lead con `Origen = Datos CTI - …` en n8n → `gmail_leads_historico`.

## 11. Control en Search Console después de la ola 1 (una semana, antes de la ola 2)

- Cobertura › Páginas: las 34 URL de la ola 1 «indexadas» o «rastreadas, pendientes»; ninguna «duplicada, canónica distinta». Meta a 4 semanas: 80 % indexadas.
- Rendimiento › filtrar por URL `/cti/` y por los slugs de los artículos: impresiones > 0 y consultas nuevas («patente quilicura», «seremi en linea calificacion industrial», «ds 44 plan de emergencia»). Anotar posición inicial para comparar a 4 y 8 semanas.
- Consultas: si una página recibe impresiones por una palabra distinta a la del título, ajustar title/H1 en el `.md` de origen (§7) y regenerar; no reescribir el cuerpo.
- Canibalización: si una consulta muestra dos URL del sitio (p. ej. `/rechazo-observaciones-seremi/` y `/rechazo-cti-que-hacer/`), la de datos cede con un enlace destacado o `canonical`.
- Mejoras › datos estructurados: sin errores en `Dataset`, `FAQPage`, `BreadcrumbList`.
- Si la ola 1 no tiene impresiones a las 4 semanas, la ola 2 se publica igual pero se consolida: las comunas chicas pueden quedar en `noindex` y sólo en las tablas del hub.

## 12. Dudas que decide Carlos, no Ignacio

Las páginas NO publican resultados de clientes de SVEA, ni precio de SVEA, ni cantidades de empresas, titulares o RUT (sólo porcentajes y cantidades de resoluciones), ni nombran la fuente exacta de los datos. Las páginas comparan SEREMI (Antofagasta 146 días, Atacama 52 %) siempre como medición con fuente y método, nunca como crítica, y ningún CTA promete la calificación.
