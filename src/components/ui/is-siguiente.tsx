'use client';

/**
 * «Sigue por aquí» del Informe Sanitario. En el WordPress esta página no
 * enlaza guía del blog: el bloque es uno solo, «Servicios complementarios»,
 * con un párrafo y tres servicios (CTI, Plan de Emergencia Industrial y
 * Estudio de Carga Combustible), cada uno con su descripción y «Ver
 * servicio». Formato de tr-siguiente.tsx. Texto y enlaces idénticos.
 */
import { ArrowRightIcon, FactoryIcon, FlameIcon, ShieldCheckIcon, SirenIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

const ENLACES = [
  {
    titulo: 'Calificación Técnica Industrial',
    descripcion: 'Clasificación de tu actividad industrial ante la SEREMI de Salud según su nivel de riesgo ambiental.',
    ruta: '/calificacion-tecnica-industrial/',
    icono: FactoryIcon,
  },
  {
    titulo: 'Plan de Emergencia Industrial',
    descripcion: 'Plan de emergencia y evacuación exigido para establecimientos industriales y comerciales.',
    ruta: '/planes-de-emergencia-y-evacuacion/',
    icono: SirenIcon,
  },
  {
    titulo: 'Estudio de Carga Combustible',
    descripcion:
      'Cálculo de la carga de combustible del establecimiento para cumplir con la normativa de protección contra incendios.',
    ruta: '/estudio-de-carga-de-combustible/',
    icono: FlameIcon,
  },
];

export function IsSiguiente({ base = '' }: { base?: string }) {
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
                <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
                Servicios complementarios
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black md:text-2xl">
                ¿Necesitas otros permisos para tu establecimiento?
              </h3>
              <p className="mt-3 text-base leading-relaxed text-black/70">
                Además del informe sanitario, muchos establecimientos requieren permisos complementarios. En
                SVEA te ayudamos con todos ellos.
              </p>
            </div>
          </Reveal>

          <ul className="flex flex-col gap-3">
            {ENLACES.map(({ titulo, descripcion, ruta, icono: Icono }, i) => (
              <Reveal as="li" key={ruta} delay={0.08 * (i + 1)} className="flex-1">
                <a
                  href={`${base}${ruta}`}
                  className="group/enlace flex h-full items-start gap-4 rounded-2xl border border-border bg-hoja p-5 no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-svea">
                    <Icono className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-base font-bold tracking-tight text-black">{titulo}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-black/65">{descripcion}</span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-black">
                      Ver servicio
                      <ArrowRightIcon
                        className="size-4 transition-transform duration-200 group-hover/enlace:translate-x-1 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default IsSiguiente;
