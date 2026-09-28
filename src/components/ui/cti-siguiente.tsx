/**
 * «Sigue por aquí»: la venta cruzada del Estudio de Carga de Combustible y
 * el enlace a la guía del blog. Dos columnas de texto separadas por un
 * filete, sin tarjetas: rótulo, titular enlazado en serif, párrafo y el
 * enlace en texto. Los dos destinos se conservan tal cual.
 */

export function CtiSiguiente({ base = '' }: { base?: string }) {
  const ecc = `${base}/estudio-de-carga-de-combustible/`;
  const guia = `${base}/calificacion-tecnica-industrial-chile/`;
  const titular = 'serif mt-3 text-2xl leading-tight md:text-3xl';
  const enlace = 'text-black no-underline hover:underline underline-offset-4';
  const rotulo = 'text-sm font-semibold uppercase tracking-[0.08em] text-svea';
  const mas = 'mt-5 inline-block text-base font-semibold text-svea underline underline-offset-4';

  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl border-t border-black pt-10">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className={rotulo}>Servicio complementario</p>
            <h3 className={titular}>
              <a href={ecc} className={enlace}>
                ¿Necesitas también un Estudio de Carga de Combustible?
              </a>
            </h3>
            <p className="mt-4 text-base leading-7 text-black/75">
              La mayoría de las empresas que requieren Calificación Técnica Industrial también
              necesitan un Estudio de Carga de Combustible (ECC) para cumplir con la OGUC y la
              norma NCh 1916. Te cotizamos ambos servicios juntos con condiciones preferenciales.
            </p>
            <a href={ecc} className={mas}>
              Conocer ECC →
            </a>
          </div>
          <div>
            <p className={rotulo}>Guía completa en nuestro blog</p>
            <h3 className={titular}>
              <a href={guia} className={enlace}>
                Calificación Técnica Industrial Chile: Guía Definitiva 2026
              </a>
            </h3>
            <p className="mt-4 text-base leading-7 text-black/75">
              Requisitos SEREMI, documentos, categorías de clasificación, plazos, costos y errores
              comunes que debes evitar.
            </p>
            <a href={guia} className={mas}>
              Leer guía →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtiSiguiente;
