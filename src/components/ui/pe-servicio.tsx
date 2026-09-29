'use client';

/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu Plan de
 * Emergencia?», con el formato de cti-servicio.tsx y ecc-servicio.tsx.
 * Texto idéntico al WordPress.
 */
import {
  ClipboardCheckIcon,
  FileSearchIcon,
  FileTextIcon,
  MapIcon,
  PackageCheckIcon,
  PencilRulerIcon,
  SirenIcon,
  TruckIcon,
  UsersIcon,
} from 'lucide-react';

import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const INCLUYE = [
  {
    titulo: 'Informe de Análisis de Riesgos',
    descripcion: 'Identificación y evaluación de amenazas específicas de tu instalación',
    icono: FileSearchIcon,
  },
  {
    titulo: 'Plan de Evacuación Personalizado',
    descripcion: 'Protocolos de actuación claros adaptados a la realidad de tu empresa',
    icono: FileTextIcon,
  },
  {
    titulo: 'Planos de Evacuación Visual',
    descripcion: 'Mapas con rutas de escape, puntos de reunión y ubicación de equipos de emergencia',
    icono: MapIcon,
  },
  {
    titulo: 'Procedimientos Operativos de Emergencia',
    descripcion: 'Asignación de roles, responsabilidades y sistemas de comunicación efectivos',
    icono: UsersIcon,
  },
  {
    titulo: 'Gestión con Bomberos (si se requiere)',
    descripcion: 'Apoyo en coordinación y observaciones del revisor, según requisitos del proyecto',
    icono: SirenIcon,
  },
  // 25-sep: la sexta tarjeta cierra la rejilla (eran 3+2 en pantalla ancha)
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu Plan de Emergencia y Evacuación, sin compromiso',
    icono: ClipboardCheckIcon,
  },
];

export const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Visita Técnica', descripcion: 'Inspección presencial para análisis de riesgos', icono: TruckIcon },
  { titulo: 'Análisis y Diseño', descripcion: 'Evaluación de riesgos y diseño de protocolos', icono: PencilRulerIcon },
  { titulo: 'Elaboración', descripcion: 'Plan completo con planos y procedimientos', icono: FileTextIcon },
  { titulo: 'Entrega', descripcion: 'Recibes tu plan listo para implementar', icono: PackageCheckIcon },
];

const tarjeta = cn(
  'group/tarjeta relative overflow-hidden rounded-xl border border-border bg-white p-5',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

export function PeServicio() {
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

export default PeServicio;
