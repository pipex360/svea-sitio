'use client';

/**
 * «Sigue por aquí» del Plan para Condominios: los servicios complementarios
 * (Plan Industrial y Estudio de Carga de Combustible, los dos enlaces del
 * WordPress) y la guía del blog, con el formato de cti-siguiente.tsx y
 * ecc-siguiente.tsx.
 */
import { ArrowRightIcon, BookOpenIcon, Building2Icon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

const enlaceFlecha =
  'group/enlace inline-flex items-center gap-2 text-sm font-semibold text-black no-underline hover:text-svea';

function Flecha() {
  return (
    <ArrowRightIcon
      className="size-4 transition-transform duration-200 group-hover/enlace:translate-x-1 motion-reduce:transition-none"
      aria-hidden="true"
    />
  );
}

export function PcSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* dos enlaces en la misma tarjeta, como en el original: la tarjeta
              no puede ser un solo <a> */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-hoja p-7 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-svea/20 bg-svea/5 px-3 py-1.5 text-xs font-semibold text-svea">
                <Building2Icon className="size-3.5" aria-hidden="true" />
                Servicios complementarios
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                ¿Tu condominio tiene áreas comerciales, bodegas o salas técnicas?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Si tu comunidad cuenta con locales, bodegas o zonas con mayor riesgo (calderas,
                generadores, estacionamientos subterráneos), podemos apoyarte con servicios
                complementarios según el caso.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a href={`${base}/planes-de-emergencia-y-evacuacion/`} className={enlaceFlecha}>
                  Ver Plan Industrial
                  <Flecha />
                </a>
                <a href={`${base}/estudio-de-carga-de-combustible/`} className={enlaceFlecha}>
                  Ver Estudio Carga de Combustible
                  <Flecha />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href={`${base}/plan-de-emergencia-condominio-chile/`}
              className="group/enlace flex h-full flex-col rounded-2xl border border-border bg-hoja p-7 no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0"
            >
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-black/70">
                <BookOpenIcon className="size-3.5" aria-hidden="true" />
                Guía completa en nuestro blog
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                Plan de Emergencia Condominio Chile: Guía Definitiva 2026
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Ley 21.442, multas de 1 a 10 UTM, contenido obligatorio, responsables y proceso paso a paso.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black">
                Leer guía
                <Flecha />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default PcSiguiente;
