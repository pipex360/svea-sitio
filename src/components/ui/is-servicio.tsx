'use client';

/**
 * «¿Qué incluye nuestro servicio?», «Marco normativo aplicable» y «¿Cómo
 * obtienes tu Informe Sanitario Favorable?», con el formato de
 * ecc-servicio.tsx. El marco normativo no existe en las otras páginas: va
 * como un bloque más de tarjetas, con el mismo estilo. Texto idéntico al
 * WordPress.
 */
import {
  BookOpenIcon,
  BuildingIcon,
  ClipboardCheckIcon,
  DropletsIcon,
  FileCheckIcon,
  FileTextIcon,
  FlaskConicalIcon,
  HardHatIcon,
  LandmarkIcon,
  MapIcon,
  MapPinnedIcon,
  ScaleIcon,
  SearchIcon,
  SendIcon,
  ShieldCheckIcon,
  WorkflowIcon,
  ZapIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const INCLUYE = [
  {
    titulo: 'Evaluación de Infraestructura y Construcción',
    descripcion: 'Revisamos pisos, muros, cielos, ventilación y condiciones constructivas del recinto.',
    icono: BuildingIcon,
  },
  {
    titulo: 'Análisis de Procesos y Actividades',
    descripcion: 'Evaluamos los procesos productivos, almacenamiento y manejo de materiales.',
    icono: WorkflowIcon,
  },
  {
    titulo: 'Verificación de Servicios Básicos',
    descripcion: 'Agua potable, alcantarillado, electricidad y gestión de residuos.',
    icono: DropletsIcon,
  },
  {
    titulo: 'Compatibilidad de Uso de Suelo',
    descripcion: 'Verificamos que la actividad sea compatible con la zonificación del plan regulador.',
    icono: MapPinnedIcon,
  },
  {
    titulo: 'Seguridad y Control de Riesgos',
    descripcion: 'Extintores, señalización, vías de evacuación y medidas de prevención.',
    icono: ShieldCheckIcon,
  },
  {
    titulo: 'Tramitación ante SEREMI',
    descripcion: 'Presentamos el informe, gestionamos observaciones y obtenemos la resolución.',
    icono: SendIcon,
  },
];

const NORMAS = [
  {
    titulo: 'Código Sanitario (DFL N°725)',
    descripcion: 'Marco legal principal que regula las condiciones sanitarias para el funcionamiento de establecimientos.',
    icono: ScaleIcon,
  },
  {
    titulo: 'D.S. N°594/1999',
    descripcion: 'Reglamento sobre condiciones sanitarias y ambientales básicas en los lugares de trabajo.',
    icono: BookOpenIcon,
  },
  {
    titulo: 'Plan Regulador Comunal (PRC)',
    descripcion: 'Define la zonificación y usos de suelo permitidos para cada tipo de actividad económica.',
    icono: MapIcon,
  },
  {
    titulo: 'D.S. N°43 (Sustancias peligrosas)',
    descripcion: 'Reglamento de almacenamiento de sustancias peligrosas, cuando la actividad lo requiera.',
    icono: FlaskConicalIcon,
  },
  {
    titulo: 'Ley 16.744',
    descripcion: 'Norma sobre seguridad laboral, prevención de accidentes del trabajo y enfermedades profesionales.',
    icono: HardHatIcon,
  },
  {
    titulo: 'Normativa SEC',
    descripcion: 'Regulación de la Superintendencia de Electricidad y Combustibles para instalaciones eléctricas y de gas.',
    icono: ZapIcon,
  },
];

const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Evaluación', descripcion: 'Visitamos e inspeccionamos tu establecimiento', icono: SearchIcon },
  { titulo: 'Informe técnico', descripcion: 'Preparamos toda la documentación requerida', icono: FileTextIcon },
  { titulo: 'Gestión SEREMI', descripcion: 'Ingresamos el expediente y gestionamos el proceso', icono: LandmarkIcon },
  { titulo: 'Resolución favorable', descripcion: 'Informe sanitario aprobado por la SEREMI', icono: FileCheckIcon },
];

const tarjeta = cn(
  'group/tarjeta relative overflow-hidden rounded-xl border border-border bg-white p-5',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

const copete =
  'mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]';

type Tarjeta = { titulo: string; descripcion: string; icono: typeof BuildingIcon };

function Tarjetas({ items }: { items: Tarjeta[] }) {
  return (
    <ul className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(({ titulo, descripcion, icono: Icono }, i) => (
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
  );
}

export function IsServicio() {
  return (
    <section className="bg-hoja px-6 py-20" id="servicio" aria-labelledby="titulo-servicio">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <p className={copete}>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Nuestro servicio
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2
          id="titulo-servicio"
          className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          ¿Qué incluye <span className="font-black text-svea">nuestro servicio?</span>
        </h2>
      </Reveal>

      <Tarjetas items={INCLUYE} />

      <Reveal className="mx-auto mb-10 mt-20 max-w-3xl text-center">
        <p className={copete}>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Regulación
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2 className="text-balance text-2xl font-medium tracking-tight text-black md:text-4xl">
          Marco normativo <span className="font-black text-svea">aplicable</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-black/65">
          El informe sanitario se rige por un conjunto de normativas que verificamos integralmente para
          asegurar el cumplimiento de tu establecimiento.
        </p>
      </Reveal>

      <Tarjetas items={NORMAS} />

      <Reveal className="mx-auto mt-16 max-w-6xl">
        <p className={copete}>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Proceso paso a paso
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
          ¿Cómo obtienes tu Informe Sanitario Favorable?
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
        <p className="mt-6 text-center text-sm text-black/60">
          Cotización en menos de 24 horas · Gestión integral hasta la resolución favorable
        </p>
      </Reveal>
    </section>
  );
}

export default IsServicio;
