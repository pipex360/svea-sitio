'use client';

/**
 * «¿Cómo obtienes tu Calificación Técnica Industrial?» y «¿Qué incluye
 * nuestro servicio de CTI?», en una sola sección.
 *
 * Arriba, los cinco pasos del trámite con el formato de «¿Cómo Trabajamos?»
 * de la portada (la sección «Issues» de arup.com). Debajo, en la misma
 * sección negra, las seis cosas que incluye el servicio en una rejilla con
 * filetes. Antes eran dos secciones seguidas que contaban lo mismo desde dos
 * lados; todos sus títulos y descripciones se conservan palabra por palabra.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';
import { Reveal } from '@/components/ui/reveal';
import { rangosHtml } from '@/lib/utils';

const PASOS = [
  {
    id: 'cotizacion',
    titulo: 'Cotización',
    descripcion: 'Recibe tu cotización en menos de 24 horas',
    foto: 'firma-solicitud-seremi-en-linea',
    alt: 'Firma de la solicitud de cotización de la Calificación Técnica Industrial',
  },
  {
    id: 'antecedentes',
    titulo: 'Antecedentes',
    descripcion: 'Recopilamos planos, patente anterior y datos de tu instalación',
    foto: 'tecnicos-casco-planta-cumplimiento-normativo',
    alt: 'Técnicos con casco recopilan en planta los antecedentes de la instalación',
  },
  {
    id: 'informe',
    titulo: 'Informe CTI',
    descripcion: 'Elaboramos el informe técnico en 3-5 días hábiles',
    foto: 'preparacion-descargos-sumario-sanitario',
    alt: 'Profesional elaborando el informe técnico de la CTI',
  },
  {
    id: 'seremi',
    titulo: 'Gestión SEREMI',
    descripcion: 'Ingresamos el expediente ante la SEREMI de Salud',
    foto: 'revision-expediente-observaciones-seremi',
    alt: 'Revisión del expediente CTI en el mesón de la SEREMI de Salud',
  },
  {
    id: 'resolucion',
    titulo: 'Resolución',
    descripcion: 'Recibes tu resolución aprobada para tramitar tu patente',
    foto: 'operarios-grua-horquilla-bodega-calificacion-tecnica',
    alt: 'Bodega operando con su calificación técnica industrial aprobada',
  },
];

const INCLUYE = [
  {
    titulo: 'Evaluación Técnica de la Infraestructura',
    descripcion: 'Levantamiento completo de tu instalación, planos y entorno según normativa vigente',
  },
  { titulo: 'Elaboración del Informe CTI', descripcion: 'Informe técnico completo listo en 3-5 días hábiles' },
  {
    titulo: 'Gestión y Presentación ante la SEREMI de Salud',
    descripcion: 'Ingresamos el expediente y te representamos ante la autoridad sanitaria',
  },
  {
    titulo: 'Asesoramiento en Adecuaciones Normativas',
    descripcion: 'Si hay observaciones, te guiamos en los ajustes para lograr la aprobación',
  },
  {
    titulo: 'Acompañamiento hasta la Resolución Aprobada',
    descripcion: 'No terminamos hasta que tengas tu resolución para tramitar la patente municipal',
  },
  {
    titulo: 'Cotización en menos de 24 horas',
    descripcion: 'Recibes por correo el plazo y el valor de tu Calificación Técnica Industrial, sin compromiso',
  },
];

export function CtiPasos({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="pasos-cti"
      copete="Proceso CTI paso a paso"
      titulo="¿Cómo obtienes tu Calificación Técnica Industrial?"
      linea="Informe técnico en 3-5 días hábiles · Cotización en menos de 24 horas"
      pasos={PASOS.map((p, i) => ({ ...p, numero: String(i + 1).padStart(2, '0'), ...COLORES_FRANJA[i] }))}
    >
      <div id="servicio" className="mt-20 lg:mt-24">
        <Reveal>
          <h3 className="font-[Manrope,Inter,sans-serif] text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-white md:text-5xl">
            ¿Qué incluye nuestro servicio de CTI?
          </h3>
        </Reveal>
        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUYE.map(({ titulo, descripcion }, i) => (
            <Reveal as="li" key={titulo} delay={i * 0.05} className="border-t border-white/20 py-6">
              <p className="text-sm font-medium text-white/50">{String(i + 1).padStart(2, '0')}</p>
              <h4 className="mt-3 text-xl font-semibold tracking-tight text-white">{titulo}</h4>
              <p
                className="mt-2 text-base leading-relaxed text-white/70"
                dangerouslySetInnerHTML={{ __html: rangosHtml(descripcion) }}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </PasoAPaso>
  );
}

export default CtiPasos;
