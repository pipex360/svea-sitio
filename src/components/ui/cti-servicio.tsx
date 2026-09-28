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

      {/* «¿Cómo obtienes tu CTI?»: la línea de tiempo de
          path-to-resilience-orbital-timeline (21st.dev). A la izquierda el
          título y el botón, que se quedan fijos mientras bajan los pasos;
          a la derecha los cinco pasos colgados de una línea vertical.
          Colores de la casa en vez de fucsia y cian; el botón es el del
          hero y lleva al formulario de la página. */}
      <div className="mx-auto mt-24 grid max-w-6xl gap-12 px-2 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="max-w-xl lg:sticky lg:top-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-svea md:text-[13px]">
              Paso a paso
            </p>
            <h3 className="mt-4 text-balance text-3xl font-bold tracking-tight text-black md:text-4xl">
              ¿Cómo obtienes tu Calificación Técnica Industrial?
            </h3>
            <a href="#formulario-cti" className="btn-flecha mt-8">
              <span>Cotiza tu CTI ahora</span>
              <span className="circulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>

        <ol className="relative space-y-5 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-svea/25">
          {PASOS.map(({ titulo, descripcion, icono: Icono }, i) => (
            <Reveal as="li" key={titulo} delay={i * 0.06} className="relative pl-14 sm:pl-16">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 grid size-10 place-items-center rounded-full bg-svea text-sm font-bold text-white ring-8 ring-hoja"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <article className="rounded-2xl border border-border bg-white p-6 transition-colors duration-200 hover:border-svea/40">
                <div className="flex items-start gap-3">
                  <Icono aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-svea" />
                  <div>
                    <h4 className="text-lg font-semibold text-black">{titulo}</h4>
                    <p className="mt-2 text-sm leading-6 text-black/65">{descripcion}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default CtiServicio;
