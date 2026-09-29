'use client';

/**
 * «Sigue por aquí»: la venta cruzada del Estudio de Carga de Combustible y
 * el enlace a la guía del blog, que en el WordPress eran dos franjas sueltas
 * separadas por las preguntas frecuentes.
 *
 * Las dos hacen lo mismo —mandar al visitante a otra página del sitio— así
 * que van juntas, una al lado de la otra. Los dos enlaces se conservan tal
 * cual; el de la guía conecta el servicio con su artículo.
 */

import { ArrowRightIcon, BookOpenIcon, CheckIcon, FlameIcon } from 'lucide-react';

import { Foto } from '@/components/ui/foto';
import { Reveal } from '@/components/ui/reveal';

export function CtiSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* El ECC, con la tarjeta de profile-hover-card (21st.dev): la foto del
              servicio a sangre, un velo blanco que sube desde abajo y el texto
              encima. Adaptada: sin framer-motion (el realce es CSS), el titular
              no se parte letra por letra (Google lo leería roto), sin los
              seguidores inventados del original, y toda la tarjeta es el enlace. */}
          <Reveal className="h-full">
            <a
              href={`${base}/estudio-de-carga-de-combustible/`}
              className="group/ecc relative flex h-full min-h-[640px] sm:min-h-[520px] flex-col justify-end overflow-hidden rounded-3xl border border-[#d8d3c7] no-underline shadow-[0_18px_34px_-16px_rgba(55,47,36,0.35)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
            >
              <Foto
                nombre="bodega-estanterias-estudio-carga-combustible"
                alt="Bodega con estanterías evaluada en un Estudio de Carga de Combustible"
                tamano="(min-width: 1024px) 560px, 100vw"
                base={base}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover/ecc:scale-105 motion-reduce:transition-none"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-white/90 via-white/60 to-transparent backdrop-blur-[1px]" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/85 via-white/40 to-transparent backdrop-blur-sm" />

              <div className="relative space-y-4 p-7">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-svea/20 bg-white/80 px-3 py-1.5 text-xs font-semibold text-svea">
                  <FlameIcon className="size-3.5" aria-hidden="true" />
                  Servicio complementario
                </span>
                <h3 className="flex items-start gap-2 text-2xl font-bold tracking-tight text-black">
                  ¿Necesitas también un Estudio de Carga de Combustible?
                  <span aria-hidden="true" className="mt-1.5 grid size-4 shrink-0 place-items-center rounded-full bg-svea text-white">
                    <CheckIcon className="size-2.5" strokeWidth={3} />
                  </span>
                </h3>
                <p className="text-base leading-relaxed text-black/75">
                  La mayoría de las empresas que requieren Calificación Técnica Industrial también
                  necesitan un Estudio de Carga de Combustible (ECC) para cumplir con la OGUC y la
                  norma NCh 1916. Te cotizamos ambos servicios juntos con condiciones preferenciales.
                </p>
                <span className="flex h-12 w-full items-center justify-center rounded-full bg-black text-base font-medium text-white transition-colors duration-200 group-hover/ecc:bg-[#1f2937]">
                  Conocer ECC
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href={`${base}/calificacion-tecnica-industrial-chile/`}
              className="group/enlace flex h-full flex-col rounded-2xl border border-border bg-hoja p-7 no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0"
            >
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-black/70">
                <BookOpenIcon className="size-3.5" aria-hidden="true" />
                Guía completa en nuestro blog
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                Calificación Técnica Industrial Chile: Guía Definitiva 2026
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Requisitos SEREMI, documentos, categorías de clasificación, plazos, costos y errores
                comunes que debes evitar.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black">
                Leer guía
                <ArrowRightIcon
                  className="size-4 transition-transform duration-200 group-hover/enlace:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default CtiSiguiente;
