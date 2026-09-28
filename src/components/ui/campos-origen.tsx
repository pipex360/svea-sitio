/**
 * Los seis campos ocultos de origen del lead: gclid y los cinco utm_*.
 *
 * Los rellena src/components/MedicionSitio.astro (en producción) con lo que
 * trajo la URL de llegada, guardado en sessionStorage, y Web3Forms los manda
 * en el correo junto con el resto del formulario. Las landings de Ads ya los
 * traían en el WordPress (con estos mismos `id="field-…"`); aquí se suman a
 * los formularios de la portada, de los servicios y de las guías.
 *
 * No son LISTA ROJA del original: scripts/verificar.mjs los deja fuera de la
 * huella al comparar con el WordPress, y comprueba aparte que estén.
 * Un solo formulario por página: los id no se repiten.
 */
export const CAMPOS_ORIGEN = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export function CamposOrigen() {
  return (
    <>
      {CAMPOS_ORIGEN.map((n) => (
        <input key={n} type="hidden" name={n} id={`field-${n}`} defaultValue="" />
      ))}
    </>
  );
}
