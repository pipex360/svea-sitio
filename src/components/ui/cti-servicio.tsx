'use client';

/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu CTI?», que en el
 * WordPress eran dos secciones seguidas y aquí van en una: las seis cosas
 * que hacemos y, debajo, los cinco pasos del trámite con su copete original
 * «Proceso CTI paso a paso».
 *
 * Las seis van en la rejilla de ruixen-bento-cards (21st.dev), adaptada:
 *
 * 1. Sin `next/image` ni `next/link`: esto es Astro, y las tarjetas no son
 *    enlaces —el original mandaba todas a ruixen.com con utm propios—.
 * 2. El titular grande abajo a la derecha es el h2 de siempre, «¿Qué incluye
 *    nuestro servicio de CTI?». En el HTML va ANTES de las tarjetas (así el
 *    h2 precede a sus h3 para Google y para quien lee con lector de
 *    pantalla) y la rejilla lo coloca abajo a la derecha en escritorio. El
 *    original lo subía con un margen negativo sobre el hueco; aquí ocupa su
 *    celda, sin montarse sobre nada.
 * 3. Seis tarjetas en vez de cinco, repartidas para que la última fila deje
 *    el hueco del titular: 3 alta + 3 + 3 / 4 + 2 / 2 + titular.
 * 4. Sin modo oscuro, sin `container` (Tailwind 4 no lo trae configurado):
 *    el ancho de las demás secciones. Las cruces de las esquinas y el borde
 *    discontinuo son los del original; al pasar el cursor, verde SVEA.
 * 5. Cada tarjeta lleva arriba su icono, que el original no tiene: sin él
 *    la tarjeta alta quedaba con media altura vacía.
 * 6. Entrada con Reveal: nada nace en opacity 0 en el HTML del servidor.
 *
 * Ni un título ni una descripción cambian de texto.
 */

import {
  BadgeCheckIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  HandshakeIcon,
  LandmarkIcon,
  SearchIcon,
  ShieldCheckIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const INCLUYE = [
  {
    titulo: 'Evaluación Técnica de la Infraestructura',
    descripcion: 'Levantamiento completo de tu instalación, planos y entorno según normativa vigente',
    icono: SearchIcon,
    celda: 'lg:col-span-3 lg:row-span-2',
  },
  {
    titulo: 'Elaboración del Informe CTI',
    descripcion: 'Informe técnico completo listo en 3-5 días hábiles',
    icono: FileTextIcon,
    celda: 'lg:col-span-3',
  },
  {
    titulo: 'Gestión y Presentación ante la SEREMI de Salud',
    descripcion: 'Ingresamos el expediente y te representamos ante la autoridad sanitaria',
    icono: LandmarkIcon,
    celda: 'lg:col-span-3',
  },
  {
    titulo: 'Asesoramiento en Adecuaciones Normativas',
    descripcion: 'Si hay observaciones, te guiamos en los ajustes para lograr la aprobación',
    icono: ShieldCheckIcon,
    celda: 'lg:col-span-4',
  },
  {
    titulo: 'Acompañamiento hasta la Resolución Aprobada',
    descripcion: 'No terminamos hasta que tengas tu resolución para tramitar la patente municipal',
    icono: HandshakeIcon,
    celda: 'lg:col-span-2',
  },
  // 25-sep: la sexta tarjeta cierra la rejilla
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu Calificación Técnica Industrial, sin compromiso',
    icono: ClipboardCheckIcon,
    celda: 'lg:col-span-2',
  },
];

const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Antecedentes', descripcion: 'Recopilamos planos, patente anterior y datos de tu instalación', icono: SearchIcon },
  { titulo: 'Informe CTI', descripcion: 'Elaboramos el informe técnico en 3-5 días hábiles', icono: FileTextIcon },
  { titulo: 'Gestión SEREMI', descripcion: 'Ingresamos el expediente ante la SEREMI de Salud', icono: LandmarkIcon },
  { titulo: 'Resolución', descripcion: 'Recibes tu resolución aprobada para tramitar tu patente', icono: BadgeCheckIcon },
];

const Cruz = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    aria-hidden="true"
    className={cn(
      'absolute size-6 text-black transition-colors duration-200 group-hover/tarjeta:text-svea',
      className,
    )}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

export function CtiServicio() {
  return (
    <section className="bg-hoja px-6 py-20" id="servicio" aria-labelledby="titulo-servicio">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {/* el titular: primero en el HTML, abajo a la derecha en escritorio */}
        <Reveal className="mb-6 sm:col-span-2 lg:col-span-4 lg:col-start-3 lg:row-start-4 lg:mb-0 lg:self-end lg:pl-6 lg:text-right">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px] lg:justify-end">
            <span aria-hidden="true" className="h-px w-8 bg-black/20" />
            Proceso CTI paso a paso
          </p>
          <h2
            id="titulo-servicio"
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-black md:text-6xl"
          >
            ¿Qué incluye nuestro <span className="text-svea">servicio de CTI?</span>
          </h2>
        </Reveal>

        {INCLUYE.map(({ titulo, descripcion, icono: Icono, celda }, i) => (
          <Reveal
            key={titulo}
            delay={i * 0.06}
            className={cn(
              'group/tarjeta relative flex min-h-[200px] flex-col justify-between gap-8 rounded-lg border border-dashed border-zinc-400 bg-white p-6',
              'transition-colors duration-200 hover:border-svea',
              i === 0 ? 'lg:row-start-1' : '',
              celda,
            )}
          >
            <Cruz className="-left-3 -top-3" />
            <Cruz className="-right-3 -top-3" />
            <Cruz className="-bottom-3 -left-3" />
            <Cruz className="-bottom-3 -right-3" />

            <span className="grid size-11 place-items-center rounded-lg bg-hoja text-svea">
              <Icono className="size-5" aria-hidden="true" />
            </span>
            <div className="relative z-10 space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-black">{titulo}</h3>
              <p className="text-base leading-relaxed text-black/70">{descripcion}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-20 max-w-6xl">
        <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
          ¿Cómo obtienes tu Calificación Técnica Industrial?
        </h3>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {PASOS.map(({ titulo, descripcion, icono: Icono }, i) => (
            <li key={titulo} className="rounded-xl border border-border bg-white p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-hoja text-black">
                  <Icono className="size-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-semibold text-black/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h4 className="text-base font-bold tracking-tight text-black">{titulo}</h4>
              <p className="mt-1 text-sm leading-relaxed text-black/60">{descripcion}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

export default CtiServicio;
