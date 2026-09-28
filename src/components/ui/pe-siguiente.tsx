'use client';

/**
 * «Sigue por aquí» del Plan de Emergencia: la venta cruzada de la CTI y el
 * ECC (dos enlaces, como en el WordPress) y la guía del blog, con el formato
 * de cti-siguiente.tsx y ecc-siguiente.tsx.
 */
import { ArrowRightIcon, BookOpenIcon, FactoryIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

const enlaceCruzado =
  'group/enlace inline-flex items-center gap-2 text-sm font-semibold text-black no-underline hover:text-svea';

export function PeSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-hoja p-7 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-svea/20 bg-svea/5 px-3 py-1.5 text-xs font-semibold text-svea">
                <FactoryIcon className="size-3.5" aria-hidden="true" />
                Servicios complementarios
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                ¿Necesitas también CTI o Estudio de Carga de Combustible?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Muchas empresas que requieren un Plan de Emergencia también necesitan una Calificación
                Técnica Industrial (CTI) o un Estudio de Carga de Combustible (ECC). Te cotizamos todos
                los servicios juntos con condiciones preferenciales.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <a href={`${base}/calificacion-tecnica-industrial/`} className={enlaceCruzado}>
                  Conocer CTI
                  <ArrowRightIcon
                    className="size-4 transition-transform duration-200 group-hover/enlace:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
                <a href={`${base}/estudio-de-carga-de-combustible/`} className={enlaceCruzado}>
                  Conocer ECC
                  <ArrowRightIcon
                    className="size-4 transition-transform duration-200 group-hover/enlace:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href={`${base}/plan-de-emergencia-empresa-chile/`}
              className="group/enlace flex h-full flex-col rounded-2xl border border-border bg-hoja p-7 no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0"
            >
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-black/70">
                <BookOpenIcon className="size-3.5" aria-hidden="true" />
                Guía completa en nuestro blog
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                Plan de emergencia para empresas: qué debe incluir y cómo se elabora
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Normativa DS 594 y DS 44, multas de hasta 1.000 UTM (SEREMI), contenido obligatorio y proceso paso a paso.
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

export default PeSiguiente;
