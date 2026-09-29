'use client';

/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu Autorización de
 * Transporte?», con el formato de cti-servicio.tsx. Texto idéntico al
 * WordPress.
 */
import {
  BadgeCheckIcon,
  ClipboardCheckIcon,
  FileCheckIcon,
  FileTextIcon,
  FolderOpenIcon,
  LandmarkIcon,
  RouteIcon,
  SendIcon,
  TagsIcon,
} from 'lucide-react';

import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const INCLUYE = [
  {
    titulo: 'Evaluación y Clasificación de Residuos',
    descripcion: 'Identificación del tipo de residuo (peligroso o no peligroso) según normativa vigente',
    icono: TagsIcon,
  },
  {
    titulo: 'Solicitud de Autorización ante SEREMI',
    descripcion: 'Preparación y presentación de toda la documentación requerida por la autoridad sanitaria',
    icono: SendIcon,
  },
  {
    titulo: 'Obtención del Permiso de Transporte',
    descripcion: 'Seguimiento y gestión hasta la aprobación del permiso por la SEREMI de Salud',
    icono: BadgeCheckIcon,
  },
  {
    titulo: 'Plan de Manejo y Transporte',
    descripcion: 'Protocolos de carga, transporte, rutas autorizadas y procedimientos de emergencia',
    icono: RouteIcon,
  },
  {
    titulo: 'Informe de Seguimiento y Cumplimiento',
    descripcion: 'Documentación que acredita el cumplimiento normativo ante fiscalizaciones',
    icono: FileCheckIcon,
  },
  // 25-sep: la sexta tarjeta cierra la rejilla (eran 3+2 en pantalla ancha)
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu autorización de transporte, sin compromiso',
    icono: ClipboardCheckIcon,
  },
];

export const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Clasificación', descripcion: 'Evaluación y categorización de tus residuos', icono: TagsIcon },
  { titulo: 'Documentación', descripcion: 'Preparación del expediente y plan de manejo', icono: FolderOpenIcon },
  { titulo: 'Gestión SEREMI', descripcion: 'Presentación y seguimiento ante la autoridad sanitaria', icono: LandmarkIcon },
  { titulo: 'Autorización', descripcion: 'Resolución de la SEREMI + documentación completa', icono: FileTextIcon },
];

const tarjeta = cn(
  'group/tarjeta relative overflow-hidden rounded-xl border border-border bg-white p-5',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

export function TrServicio() {
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

export default TrServicio;
