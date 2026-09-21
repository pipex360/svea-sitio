'use client';

/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu CTI?», que en el
 * WordPress eran dos secciones seguidas y aquí van en una: las cinco cosas
 * que hacemos y, debajo, los cinco pasos del trámite con su copete original
 * «Proceso CTI paso a paso».
 *
 * Las dos listas describen lo mismo desde dos ángulos —qué entregamos y en
 * qué orden—, así que se leen mejor juntas. Ni un título ni una descripción
 * cambian de texto.
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
  },
  {
    titulo: 'Elaboración del Informe CTI',
    descripcion: 'Informe técnico completo listo en 5-10 días hábiles',
    icono: FileTextIcon,
  },
  {
    titulo: 'Gestión y Presentación ante la SEREMI de Salud',
    descripcion: 'Ingresamos el expediente y te representamos ante la autoridad sanitaria',
    icono: LandmarkIcon,
  },
  {
    titulo: 'Asesoramiento en Adecuaciones Normativas',
    descripcion: 'Si hay observaciones, te guiamos en los ajustes para lograr la aprobación',
    icono: ShieldCheckIcon,
  },
  {
    titulo: 'Acompañamiento hasta la Resolución Aprobada',
    descripcion: 'No terminamos hasta que tengas tu resolución para tramitar la patente municipal',
    icono: HandshakeIcon,
  },
];

const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Antecedentes', descripcion: 'Recopilamos planos, patente anterior y datos de tu instalación', icono: SearchIcon },
  { titulo: 'Informe CTI', descripcion: 'Elaboramos el informe técnico en 5-10 días hábiles', icono: FileTextIcon },
  { titulo: 'Gestión SEREMI', descripcion: 'Ingresamos el expediente ante la SEREMI de Salud', icono: LandmarkIcon },
  { titulo: 'Resolución', descripcion: 'Recibes tu resolución aprobada para tramitar tu patente', icono: BadgeCheckIcon },
];

const tarjeta = cn(
  'group/tarjeta relative overflow-hidden rounded-xl border border-border bg-white p-5',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

export function CtiServicio() {
  return (
    <section className="bg-hoja px-6 py-20" id="servicio" aria-labelledby="titulo-servicio">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Proceso CTI paso a paso
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2
          id="titulo-servicio"
          className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          ¿Qué incluye nuestro <span className="font-black text-svea">servicio de CTI?</span>
        </h2>
      </Reveal>

      <ul className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INCLUYE.map(({ titulo, descripcion, icono: Icono }, i) => (
          <Reveal as="li" key={titulo} delay={i * 0.08} className={tarjeta}>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-svea transition-transform duration-300 ease-out group-hover/tarjeta:scale-x-100 motion-reduce:transition-none"
            />
            <span className="mb-3 grid size-10 place-items-center rounded-lg bg-hoja text-svea">
              <Icono className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-base font-bold tracking-tight text-black">{titulo}</h3>
            <p className="mt-1 text-sm leading-relaxed text-black/65">{descripcion}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mx-auto mt-16 max-w-6xl">
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
