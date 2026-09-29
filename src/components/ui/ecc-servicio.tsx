'use client';

/**
 * «¿Qué incluye nuestro servicio de ECC?», con el mismo diseño de «Nuestros
 * Servicios» de la portada (FeaturesSectionWithHoverEffects), igual que en
 * la CTI. Las tarjetas no llevan enlace: son lo que incluye el servicio. Los
 * pasos del trámite van aparte, en EccPasos. Ni un título ni una descripción
 * cambian de texto.
 */

import {
  CalculatorIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  FlameIcon,
  LightbulbIcon,
  PackageSearchIcon,
} from 'lucide-react';

import { FeaturesSectionWithHoverEffects, type Servicio } from '@/components/ui/feature-section-with-hover-effects';
import { Reveal } from '@/components/ui/reveal';

const INCLUYE: Servicio[] = [
  {
    titulo: 'Identificación y Análisis de Materiales Combustibles',
    descripcion: 'Inventario detallado de todos los materiales combustibles presentes en tu instalación',
    Icono: PackageSearchIcon,
  },
  {
    titulo: 'Evaluación del Nivel de Riesgo de Incendio',
    descripcion: 'Clasificación de sectores según nivel de carga térmica conforme a OGUC y NCh 1916',
    Icono: FlameIcon,
  },
  {
    titulo: 'Cálculo de Carga de Combustible',
    descripcion: 'Cuantificación precisa en Mcal/m² para cada sector de tu instalación',
    Icono: CalculatorIcon,
  },
  {
    titulo: 'Elaboración de Informe Técnico Detallado',
    descripcion: 'Documento completo con planos, cálculos y conclusiones listo para presentar ante la autoridad',
    Icono: FileTextIcon,
  },
  {
    titulo: 'Recomendaciones para Optimización del Almacenamiento',
    descripcion: 'Medidas correctivas y preventivas para reducir el riesgo y cumplir la normativa',
    Icono: LightbulbIcon,
  },
  // 25-sep: la sexta tarjeta cierra la rejilla (eran 3+2 en pantalla ancha)
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu Estudio de Carga de Combustible, sin compromiso',
    Icono: ClipboardCheckIcon,
  },
];

export function EccServicio() {
  return (
    <section className="bg-hoja px-4 py-20" id="servicio" aria-labelledby="titulo-servicio">
      <Reveal className="mx-auto mb-12 max-w-7xl px-4 text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Proceso ECC paso a paso
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2 id="titulo-servicio" className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl">
          ¿Qué incluye nuestro <span className="font-black text-svea">servicio de ECC?</span>
        </h2>
      </Reveal>

      <FeaturesSectionWithHoverEffects servicios={INCLUYE} />
    </section>
  );
}

export default EccServicio;
