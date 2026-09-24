'use client';

/**
 * «¿Qué incluye nuestro servicio de ECC?» y «¿Cómo obtienes tu Estudio de
 * Carga de Combustible?», con el formato de cti-servicio.tsx. Texto
 * idéntico al WordPress.
 */
import {
  CalculatorIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  FlameIcon,
  LightbulbIcon,
  PackageSearchIcon,
  SearchIcon,
  TruckIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

const INCLUYE = [
  {
    titulo: 'Identificación y Análisis de Materiales Combustibles',
    descripcion: 'Inventario detallado de todos los materiales combustibles presentes en tu instalación',
    icono: PackageSearchIcon,
  },
  {
    titulo: 'Evaluación del Nivel de Riesgo de Incendio',
    descripcion: 'Clasificación de sectores según nivel de carga térmica conforme a OGUC y NCh 1916',
    icono: FlameIcon,
  },
  {
    titulo: 'Cálculo de Carga de Combustible',
    descripcion: 'Cuantificación precisa en Mcal/m² para cada sector de tu instalación',
    icono: CalculatorIcon,
  },
  {
    titulo: 'Elaboración de Informe Técnico Detallado',
    descripcion: 'Documento completo con planos, cálculos y conclusiones listo para presentar ante la autoridad',
    icono: FileTextIcon,
  },
  {
    titulo: 'Recomendaciones para Optimización del Almacenamiento',
    descripcion: 'Medidas correctivas y preventivas para reducir el riesgo y cumplir la normativa',
    icono: LightbulbIcon,
  },
];

const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Visita Técnica', descripcion: 'Inspección presencial para identificar materiales combustibles', icono: TruckIcon },
  { titulo: 'Cálculo y Análisis', descripcion: 'Cuantificación de carga térmica por sector según OGUC', icono: SearchIcon },
  { titulo: 'Informe ECC', descripcion: 'Elaboramos el informe técnico en 3-5 días hábiles', icono: FileTextIcon },
  { titulo: 'Entrega', descripcion: 'Recibes tu informe con recomendaciones para cumplir la normativa', icono: ClipboardCheckIcon },
];

const tarjeta = cn(
  'group/tarjeta relative overflow-hidden rounded-xl border border-border bg-white p-5',
  'transition-[transform,box-shadow,border-color] duration-200 ease-out',
  'hover:-translate-y-1 hover:border-black/30',
  'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
  'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
);

export function EccServicio() {
  return (
    <section className="bg-hoja px-6 py-20" id="servicio" aria-labelledby="titulo-servicio">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Proceso ECC paso a paso
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2
          id="titulo-servicio"
          className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          ¿Qué incluye nuestro <span className="font-black text-svea">servicio de ECC?</span>
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
          ¿Cómo obtienes tu Estudio de Carga de Combustible?
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
          Informe ECC listo en 3-5 días hábiles · Cotización en menos de 24 horas
        </p>
      </Reveal>
    </section>
  );
}

export default EccServicio;
