'use client';

/**
 * «Objetivo» y «Alcance» de Permisos Ambientales y Pertinencias del SEIA, con
 * el formato de tarjetas de ecc-servicio.tsx: el objetivo destacado arriba y
 * las tres tareas del alcance como tarjetas numeradas. El botón «Solicitar
 * asesoría» del original llevaba al formulario de la portada, y ahí sigue
 * llevando: esta página no tiene formulario propio.
 *
 * Texto del WordPress con un cambio: «Garantizar el cumplimiento» pasó a
 * «Velar por el cumplimiento» (la aprobación la decide la autoridad).
 */
import { ArrowRightIcon, FileSearchIcon, FileTextIcon, RouteIcon, TargetIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const ALCANCE = [
  { titulo: 'Confección de informe de evaluación de pertinencia del SEIA', icono: FileSearchIcon },
  { titulo: 'Elaboración de permisos ambientales', icono: FileTextIcon },
  { titulo: 'Seguimiento de tramitación ante el SEA', icono: RouteIcon },
];

const tarjeta = cn(
  'group/tarjeta relative overflow-hidden rounded-xl border border-border bg-white p-6',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

export function SeiaAlcance({ base = '' }: { base?: string }) {
  return (
    <section className="bg-hoja px-6 py-20" id="alcance" aria-labelledby="titulo-objetivo">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-16 max-w-4xl">
          <div className="rounded-2xl border border-border bg-white p-7 md:p-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-svea/20 bg-svea/5 px-3 py-1.5 text-xs font-semibold text-svea">
              <TargetIcon className="size-3.5" aria-hidden="true" />
              SEIA
            </p>
            <h2
              id="titulo-objetivo"
              className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
            >
              <span className="font-black text-svea">Objetivo</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-black/75 md:text-lg">
              Velar por el cumplimiento de los requisitos del Sistema de Evaluación de Impacto
              Ambiental (SEIA) para empresas, proyectos de infraestructura e industrias que puedan
              generar impactos ambientales significativos. A través de un análisis detallado,
              evaluamos la pertinencia del proyecto, gestionamos la tramitación de permisos
              ambientales ante las autoridades competentes y elaboramos los informes necesarios,
              asegurando que cada proyecto cumpla con la normativa ambiental vigente y minimice su
              impacto en el entorno.
            </p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl">
            <span className="font-black text-svea">Alcance</span>
          </h2>
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-3">
          {ALCANCE.map(({ titulo, icono: Icono }, i) => (
            <Reveal as="li" key={titulo} delay={i * 0.08} className={tarjeta}>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-svea transition-transform duration-300 ease-out group-hover/tarjeta:scale-x-100 motion-reduce:transition-none"
              />
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid size-10 place-items-center rounded-lg bg-hoja text-svea">
                  <Icono className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-semibold text-black/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-base font-bold leading-snug tracking-tight text-black md:text-lg">
                {titulo}
              </h3>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 flex justify-center">
          <a
            href={`${base}/#form-home`}
            className="group/boton inline-flex items-center gap-2 rounded-full bg-[#0e7a3c] px-6 py-3 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-svea"
          >
            Solicitar asesoría
            <ArrowRightIcon
              className="size-4 transition-transform duration-200 group-hover/boton:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default SeiaAlcance;
