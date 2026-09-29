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

import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
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

export const PASOS = [
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
    <FeaturesSectionWithHoverEffects
      servicios={items.map(({ titulo, descripcion, icono }) => ({ titulo, descripcion, Icono: icono }))}
    />
  );
}

export function IsServicio() {
  return (
    <section className="bg-hoja px-4 py-20" id="servicio" aria-labelledby="titulo-servicio">
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
    </section>
  );
}

export default IsServicio;
