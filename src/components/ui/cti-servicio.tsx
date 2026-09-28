'use client';

/**
 * «¿Qué incluye nuestro servicio?» y «¿Cómo obtienes tu CTI?», que en el
 * WordPress eran dos secciones seguidas y aquí van en una: las seis cosas
 * que hacemos y, debajo, los cinco pasos del trámite con su copete original
 * «Proceso CTI paso a paso».
 *
 * Las seis van con el mismo diseño de «Nuestros Servicios» de la portada
 * (FeaturesSectionWithHoverEffects): panel blanco con filetes, número, barra
 * que se tiñe de verde y realce al pasar el cursor. Aquí las tarjetas no
 * llevan enlace ni «Conocer más»: son lo que incluye el servicio, no
 * destinos. El encabezado también copia el de la portada.
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

import { FeaturesSectionWithHoverEffects, type Servicio } from '@/components/ui/feature-section-with-hover-effects';
import { Reveal } from '@/components/ui/reveal';

const INCLUYE: Servicio[] = [
  {
    titulo: 'Evaluación Técnica de la Infraestructura',
    descripcion: 'Levantamiento completo de tu instalación, planos y entorno según normativa vigente',
    Icono: SearchIcon,
  },
  {
    titulo: 'Elaboración del Informe CTI',
    descripcion: 'Informe técnico completo listo en 3-5 días hábiles',
    Icono: FileTextIcon,
  },
  {
    titulo: 'Gestión y Presentación ante la SEREMI de Salud',
    descripcion: 'Ingresamos el expediente y te representamos ante la autoridad sanitaria',
    Icono: LandmarkIcon,
  },
  {
    titulo: 'Asesoramiento en Adecuaciones Normativas',
    descripcion: 'Si hay observaciones, te guiamos en los ajustes para lograr la aprobación',
    Icono: ShieldCheckIcon,
  },
  {
    titulo: 'Acompañamiento hasta la Resolución Aprobada',
    descripcion: 'No terminamos hasta que tengas tu resolución para tramitar la patente municipal',
    Icono: HandshakeIcon,
  },
  // 25-sep: la sexta tarjeta cierra la rejilla
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu Calificación Técnica Industrial, sin compromiso',
    Icono: ClipboardCheckIcon,
  },
];

const PASOS = [
  { titulo: 'Cotización', descripcion: 'Recibe tu cotización en menos de 24 horas', icono: ClipboardCheckIcon },
  { titulo: 'Antecedentes', descripcion: 'Recopilamos planos, patente anterior y datos de tu instalación', icono: SearchIcon },
  { titulo: 'Informe CTI', descripcion: 'Elaboramos el informe técnico en 3-5 días hábiles', icono: FileTextIcon },
  { titulo: 'Gestión SEREMI', descripcion: 'Ingresamos el expediente ante la SEREMI de Salud', icono: LandmarkIcon },
  { titulo: 'Resolución', descripcion: 'Recibes tu resolución aprobada para tramitar tu patente', icono: BadgeCheckIcon },
];

export function CtiServicio() {
  return (
    <section className="bg-hoja px-4 py-20" id="servicio" aria-labelledby="titulo-servicio">
      <Reveal className="mx-auto mb-12 max-w-7xl px-4 text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Proceso CTI paso a paso
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2 id="titulo-servicio" className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl">
          ¿Qué incluye nuestro <span className="font-black text-svea">servicio de CTI?</span>
        </h2>
      </Reveal>

      <FeaturesSectionWithHoverEffects servicios={INCLUYE} />

      <Reveal className="mx-auto mt-16 max-w-7xl px-2">
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
