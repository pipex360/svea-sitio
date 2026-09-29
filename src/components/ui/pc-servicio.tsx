'use client';

/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu Plan para
 * Condominio?», con el formato de cti-servicio.tsx y ecc-servicio.tsx. Texto
 * idéntico al WordPress.
 */
import {
  ClipboardCheckIcon,
  FileTextIcon,
  FireExtinguisherIcon,
  MapIcon,
  PackageCheckIcon,
  SearchIcon,
  ShieldAlertIcon,
  TruckIcon,
  UsersIcon,
  ClipboardListIcon,
} from 'lucide-react';

import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const INCLUYE = [
  {
    titulo: 'Informe de Análisis de Riesgos',
    descripcion: 'Evaluación del condominio: accesos, escaleras, subterráneos, salas técnicas y amenazas',
    icono: ShieldAlertIcon,
  },
  {
    titulo: 'Plan de Evacuación Personalizado',
    descripcion: 'Protocolos claros para residentes, visitas, conserjería y administración',
    icono: ClipboardListIcon,
  },
  {
    titulo: 'Mapas / Planos de Evacuación',
    descripcion: 'Rutas, puntos de encuentro y zonas críticas del condominio',
    icono: MapIcon,
  },
  {
    titulo: 'Roles, Responsables y Comunicación',
    descripcion: 'Funciones para Comité/Administración, brigadas y coordinación en emergencias',
    icono: UsersIcon,
  },
  {
    titulo: 'Gestión con Bomberos (si se requiere)',
    descripcion: 'Apoyo en coordinación y observaciones del revisor, según requisitos del condominio',
    icono: FireExtinguisherIcon,
  },
  // 25-sep: la sexta tarjeta cierra la rejilla (eran 3+2 en pantalla ancha)
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor del plan de tu condominio, sin compromiso',
    icono: ClipboardCheckIcon,
  },
];

export const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Levantamiento', descripcion: 'Visita/recopilación de información del condominio', icono: TruckIcon },
  { titulo: 'Análisis de Riesgos', descripcion: 'Amenazas, puntos críticos y medidas preventivas', icono: SearchIcon },
  { titulo: 'Elaboración', descripcion: 'Plan, roles, procedimientos y mapas', icono: FileTextIcon },
  { titulo: 'Entrega', descripcion: 'Recibes tu plan listo para implementar', icono: PackageCheckIcon },
];

const tarjeta = cn(
  'group/tarjeta relative overflow-hidden rounded-xl border border-border bg-white p-5',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

export function PcServicio() {
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

export default PcServicio;
