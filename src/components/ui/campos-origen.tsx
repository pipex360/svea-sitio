/**
 * Los seis campos ocultos de origen del lead: gclid y los cinco utm_*.
 *
 * Los rellena src/components/MedicionSitio.astro (en producción) con lo que
 * trajo la URL de llegada, guardado en sessionStorage, y Web3Forms los manda
 * en el correo junto con el resto del formulario. Las landings de Ads ya los
 * traían en el WordPress (con estos mismos `id="field-…"`); aquí se suman a
 * los formularios de la portada, de los servicios y de las guías.
 *
 * 3-nov (SEO tanda 1, cambio 1.7): un séptimo oculto, `page_url`, con la
 * página donde se llenó el formulario (sin ?consulta ni #ancla: el gclid y
 * los utm ya viajan aparte). Lo pone el propio formulario al hidratarse, así
 * que no depende de la medición ni del aviso de cookies. Hasta ahora los
 * leads orgánicos llegaban sin saber de qué página venían.
 *
 * No son LISTA ROJA del original: scripts/verificar.mjs los deja fuera de la
 * huella al comparar con el WordPress, y comprueba aparte que estén.
 * Un solo formulario por página: los id no se repiten.
 */
import { useEffect, useRef } from 'react';

export const CAMPOS_ORIGEN = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export function CamposOrigen() {
  const pagina = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (pagina.current && !pagina.current.value) pagina.current.value = location.origin + location.pathname;
  }, []);
  return (
    <>
      {CAMPOS_ORIGEN.map((n) => (
        <input key={n} type="hidden" name={n} id={`field-${n}`} defaultValue="" />
      ))}
      <input ref={pagina} type="hidden" name="page_url" id="field-page_url" defaultValue="" />
    </>
  );
}
