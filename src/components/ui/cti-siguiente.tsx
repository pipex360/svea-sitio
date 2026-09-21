'use client';

/**
 * «Sigue por aquí»: la venta cruzada del Estudio de Carga de Combustible y
 * el enlace a la guía del blog, que en el WordPress eran dos franjas sueltas
 * separadas por las preguntas frecuentes.
 *
 * Las dos hacen lo mismo —mandar al visitante a otra página del sitio— así
 * que van juntas, una al lado de la otra. Los dos enlaces se conservan tal
 * cual, y el de la guía importa el doble: es la canónica de esta página.
 */

import { ArrowRightIcon, BookOpenIcon, FlameIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

export function CtiSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <a
              href={`${base}/estudio-de-carga-de-combustible/`}
              className="group/enlace flex h-full flex-col rounded-2xl border border-border bg-hoja p-7 no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0"
            >
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-svea/20 bg-svea/5 px-3 py-1.5 text-xs font-semibold text-svea">
                <FlameIcon className="size-3.5" aria-hidden="true" />
                Servicio complementario
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                ¿Necesitas también un Estudio de Carga de Combustible?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                La mayoría de las empresas que requieren Calificación Técnica Industrial también
                necesitan un Estudio de Carga de Combustible (ECC) para cumplir con la OGUC y la
                norma NCh 1916. Te cotizamos ambos servicios juntos con condiciones preferenciales.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black">
                Conocer ECC
                <ArrowRightIcon
                  className="size-4 transition-transform duration-200 group-hover/enlace:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
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
