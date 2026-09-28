'use client';

/**
 * «Sigue por aquí» de residuos peligrosos, con el formato de ecc-siguiente.tsx:
 * a la izquierda los servicios complementarios (el original trae tres
 * enlaces: transporte, CTI y plan de emergencia), a la derecha la guía del
 * blog. El párrafo de la guía es el quinto de «¿Qué es…?» del WordPress, con
 * su enlace en el mismo texto.
 */
import { ArrowRightIcon, BookOpenIcon, TruckIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

const COMPLEMENTARIOS = [
  { texto: 'Transporte de Residuos', ruta: '/autorizacion-de-transporte-de-residuos/' },
  { texto: 'Calificación Técnica Industrial', ruta: '/calificacion-tecnica-industrial/' },
  { texto: 'Plan de Emergencia Industrial', ruta: '/planes-de-emergencia-y-evacuacion/' },
];

const tarjeta =
  'flex h-full flex-col rounded-2xl border border-border bg-hoja p-7 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0';

export function RpSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className={tarjeta}>
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-svea/20 bg-svea/5 px-3 py-1.5 text-xs font-semibold text-svea">
                <TruckIcon className="size-3.5" aria-hidden="true" />
                Servicios complementarios
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                ¿Necesitas también transportar residuos peligrosos?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Si tu empresa genera residuos que deben ser trasladados a un destino autorizado,
                necesitas la Autorización de Transporte de Residuos. También podemos ayudarte con
                Calificación Técnica Industrial y Planes de Emergencia.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {COMPLEMENTARIOS.map(({ texto, ruta }) => (
                  <li key={ruta}>
                    <a
                      href={`${base}${ruta}`}
                      className="group/enlace inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-black no-underline transition-colors duration-200 hover:border-black/30"
                    >
                      {texto}
                      <ArrowRightIcon
                        className="size-4 transition-transform duration-200 group-hover/enlace:translate-x-1 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href={`${base}/manejo-de-residuos-peligrosos-chile/`}
              className={`group/enlace ${tarjeta} no-underline`}
            >
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-black/70">
                <BookOpenIcon className="size-3.5" aria-hidden="true" />
                Guía completa
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                Manejo de residuos peligrosos en Chile
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Para conocer en detalle la normativa, obligaciones de declaración SIDREP, sanciones
                y todo lo que tu empresa necesita saber, revisa nuestra{' '}
                <span className="font-semibold text-svea underline underline-offset-2">
                  guía completa sobre manejo de residuos peligrosos en Chile
                </span>
                .
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

export default RpSiguiente;
