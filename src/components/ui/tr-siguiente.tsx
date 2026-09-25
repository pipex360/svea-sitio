'use client';

/**
 * «Sigue por aquí» de la Autorización de Transporte de Residuos. En el
 * WordPress esta página no tiene guía del blog: el bloque es uno solo,
 * «Servicios complementarios», con un párrafo y tres enlaces (Manejo de
 * Residuos Peligrosos, CTI y Plan de Emergencia). Va con el formato de
 * ecc-siguiente.tsx: la tarjeta a la izquierda y los tres enlaces como
 * tarjetas a la derecha. Texto y enlaces idénticos al original; desde el
 * 24-sep la tarjeta suma las dos guías de transporte (RESPEL y no peligrosos).
 */
import { ArrowRightIcon, BookOpenIcon, FactoryIcon, ShieldAlertIcon, SirenIcon, TriangleAlertIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

// guías del blog sobre el mismo trámite (enlace informativo, 24-sep)
const GUIAS = [
  { texto: 'Guía: autorización de transporte de residuos peligrosos (RESPEL) y no peligrosos', ruta: '/autorizacion-transporte-residuos-chile/' },
  { texto: 'Guía: transporte de residuos no peligrosos, paso a paso', ruta: '/autorizacion-transporte-residuos-no-peligrosos/' },
];

const ENLACES = [
  { texto: 'Manejo de Residuos Peligrosos', ruta: '/manejo-de-residuos-peligrosos/', icono: TriangleAlertIcon },
  { texto: 'Calificación Técnica Industrial', ruta: '/calificacion-tecnica-industrial/', icono: FactoryIcon },
  { texto: 'Plan de Emergencia Industrial', ruta: '/planes-de-emergencia-y-evacuacion/', icono: SirenIcon },
];

export function TrSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-hoja p-7">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-svea/20 bg-svea/5 px-3 py-1.5 text-xs font-semibold text-svea">
                <ShieldAlertIcon className="size-3.5" aria-hidden="true" />
                Servicios complementarios
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                ¿Generas residuos peligrosos en tu instalación?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Si tu empresa genera residuos peligrosos, también necesitas un{' '}
                <strong className="font-semibold text-black">Plan de Manejo de Residuos Peligrosos</strong> conforme
                al D.S. 43 y D.S. 148. Además, podemos ayudarte con la{' '}
                <strong className="font-semibold text-black">Calificación Técnica Industrial</strong> y{' '}
                <strong className="font-semibold text-black">Planes de Emergencia</strong>.
              </p>
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-black/50">Guías para entender el trámite</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {GUIAS.map(({ texto, ruta }) => (
                    <li key={ruta}>
                      <a
                        href={`${base}${ruta}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-black underline decoration-svea/40 underline-offset-4 transition-colors hover:decoration-svea"
                      >
                        <BookOpenIcon className="size-4 shrink-0 text-svea" aria-hidden="true" />
                        {texto}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <ul className="flex flex-col gap-3">
            {ENLACES.map(({ texto, ruta, icono: Icono }, i) => (
              <Reveal as="li" key={ruta} delay={0.08 * (i + 1)} className="flex-1">
                <a
                  href={`${base}${ruta}`}
                  className="group/enlace flex h-full items-center gap-4 rounded-2xl border border-border bg-hoja p-5 no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-svea">
                    <Icono className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-base font-bold tracking-tight text-black">{texto}</span>
                  <ArrowRightIcon
                    className="size-4 shrink-0 text-black transition-transform duration-200 group-hover/enlace:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TrSiguiente;
