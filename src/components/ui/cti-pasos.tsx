'use client';

/**
 * «¿Cómo obtienes tu Calificación Técnica Industrial?»: los cinco pasos del
 * trámite con el mismo formato de «¿Cómo Trabajamos?» de la portada (la
 * sección «Issues» de arup.com), con fotos elegidas para cada paso de la
 * CTI. Los títulos y descripciones son los del original.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';

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

export function CtiPasos({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="pasos-cti"
      copete="Paso a paso"
      titulo="¿Cómo obtienes tu Calificación Técnica Industrial?"
      pasos={PASOS.map((p, i) => ({ ...p, numero: String(i + 1).padStart(2, '0'), ...COLORES_FRANJA[i] }))}
    />
  );
}

export default CtiPasos;
