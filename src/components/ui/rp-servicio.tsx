'use client';

/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu Informe de Manejo de
 * Residuos?», con el formato de cti-servicio.tsx / ecc-servicio.tsx. Texto
 * idéntico al WordPress.
 */
import {
  ClipboardCheckIcon,
  FileCheckIcon,
  FileTextIcon,
  ListChecksIcon,
  PackageSearchIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from 'lucide-react';

import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const INCLUYE = [
  {
    titulo: 'Evaluación de Sustancias y Residuos',
    descripcion: 'Identificación y clasificación de todos los residuos peligrosos generados en la operación',
    icono: PackageSearchIcon,
  },
  {
    titulo: 'Plan de Manejo Personalizado',
    descripcion: 'Lineamientos para almacenamiento seguro, transporte y disposición final según D.S. 43 y D.S. 148',
    icono: ClipboardCheckIcon,
  },
  {
    titulo: 'Informe de Cumplimiento Normativo',
    descripcion: 'Documentación técnica que acredita conformidad con la normativa vigente',
    icono: ShieldCheckIcon,
  },
  {
    titulo: 'Procedimientos Operativos Estándar',
    descripcion: 'Protocolos claros para la manipulación, etiquetado, almacenamiento y emergencias',
    icono: ListChecksIcon,
  },
  {
    titulo: 'Informe de Mejora Continua',
    descripcion: 'Recomendaciones de optimización de almacenamiento y reducción de riesgos',
    icono: TrendingUpIcon,
  },
  // 25-sep: la sexta tarjeta cierra la rejilla (eran 3+2 en pantalla ancha)
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu informe de manejo de residuos, sin compromiso',
    icono: ClipboardCheckIcon,
  },
];

export const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Levantamiento', descripcion: 'Evaluación de sustancias y residuos generados en tu operación', icono: ScanSearchIcon },
  { titulo: 'Clasificación', descripcion: 'Identificación y categorización según normativa vigente', icono: ListChecksIcon },
  { titulo: 'Elaboración', descripcion: 'Plan de manejo, procedimientos y recomendaciones', icono: FileTextIcon },
  { titulo: 'Entrega', descripcion: 'Informe técnico listo para acreditar cumplimiento', icono: FileCheckIcon },
];

const tarjeta = cn(
  'group/tarjeta relative overflow-hidden rounded-xl border border-border bg-white p-5',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

export function RpServicio() {
  return (
    <section className="bg-hoja px-4 py-20" id="servicio" aria-labelledby="titulo-servicio">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Proceso paso a paso
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2
          id="titulo-servicio"
          className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          ¿Qué incluye nuestro <span className="font-black text-svea">servicio?</span>
        </h2>
      </Reveal>

      <FeaturesSectionWithHoverEffects
        servicios={INCLUYE.map(({ titulo, descripcion, icono }) => ({ titulo, descripcion, Icono: icono }))}
      />
    </section>
  );
}

export default RpServicio;
