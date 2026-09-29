'use client';

/**
 * «¿Cómo obtienes tu Calificación Técnica Industrial?»: los cinco pasos del
 * trámite con el formato de «¿Cómo Trabajamos?» de la portada (la sección
 * «Issues» de arup.com). Cada tarjeta lleva también lo que incluye el
 * servicio en ese paso: antes era una sección aparte que repetía lo mismo.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';

/**
 * Cada tarjeta muestra la frase corta del paso; lo que incluye el servicio en
 * ese paso va plegado bajo «Qué incluye +» (antes era una sección aparte que
 * repetía lo mismo). Todos los textos del original siguen en la página.
 */
const PASOS = [
  {
    id: 'cotizacion',
    titulo: 'Cotización',
    descripcion: 'Recibe tu cotización en menos de 24 horas',
    incluye: [
      {
        titulo: 'Cotización en menos de 24 horas',
        descripcion: 'Recibes por correo el plazo y el valor de tu Calificación Técnica Industrial, sin compromiso',
      },
    ],
    foto: 'firma-solicitud-seremi-en-linea',
    alt: 'Firma de la solicitud de cotización de la Calificación Técnica Industrial',
  },
  {
    id: 'antecedentes',
    titulo: 'Antecedentes',
    descripcion: 'Recopilamos planos, patente anterior y datos de tu instalación',
    incluye: [
      {
        titulo: 'Evaluación Técnica de la Infraestructura',
        descripcion: 'Levantamiento completo de tu instalación, planos y entorno según normativa vigente',
      },
    ],
    foto: 'tecnicos-casco-planta-cumplimiento-normativo',
    alt: 'Técnicos con casco recopilan en planta los antecedentes de la instalación',
  },
  {
    id: 'informe',
    titulo: 'Informe CTI',
    descripcion: 'Elaboramos el informe técnico en 3-5 días hábiles',
    incluye: [{ titulo: 'Elaboración del Informe CTI', descripcion: 'Informe técnico completo listo en 3-5 días hábiles' }],
    foto: 'preparacion-descargos-sumario-sanitario',
    alt: 'Profesional elaborando el informe técnico de la CTI',
  },
  {
    id: 'seremi',
    titulo: 'Gestión SEREMI',
    descripcion: 'Ingresamos el expediente ante la SEREMI de Salud',
    incluye: [
      {
        titulo: 'Gestión y Presentación ante la SEREMI de Salud',
        descripcion: 'Ingresamos el expediente y te representamos ante la autoridad sanitaria',
      },
      {
        titulo: 'Asesoramiento en Adecuaciones Normativas',
        descripcion: 'Si hay observaciones, te guiamos en los ajustes para lograr la aprobación',
      },
    ],
    foto: 'revision-expediente-observaciones-seremi',
    alt: 'Revisión del expediente CTI en el mesón de la SEREMI de Salud',
  },
  {
    id: 'resolucion',
    titulo: 'Resolución',
    descripcion: 'Recibes tu resolución aprobada para tramitar tu patente',
    incluye: [
      {
        titulo: 'Acompañamiento hasta la Resolución Aprobada',
        descripcion: 'No terminamos hasta que tengas tu resolución para tramitar la patente municipal',
      },
    ],
    foto: 'operarios-grua-horquilla-bodega-calificacion-tecnica',
    alt: 'Bodega operando con su calificación técnica industrial aprobada',
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
    />
  );
}

export default CtiPasos;
