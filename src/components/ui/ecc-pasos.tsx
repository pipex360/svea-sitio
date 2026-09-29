'use client';

/**
 * «¿Cómo obtienes tu Estudio de Carga de Combustible?»: los cinco pasos con
 * el formato de «¿Cómo Trabajamos?» de la portada (la sección «Issues» de
 * arup.com), igual que en la CTI, con fotos elegidas para cada paso del
 * ECC. Los títulos y descripciones son los del original.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';

const PASOS = [
  {
    id: 'cotizacion',
    titulo: 'Cotización',
    descripcion: 'Recibe tu cotización en menos de 24 horas',
    foto: 'firma-solicitud-seremi-en-linea',
    alt: 'Firma de la solicitud de cotización del Estudio de Carga de Combustible',
  },
  {
    id: 'visita',
    titulo: 'Visita Técnica',
    descripcion: 'Inspección presencial para identificar materiales combustibles',
    foto: 'inspeccion-bodega-calificacion-tecnica-industrial',
    alt: 'Profesional inspecciona una bodega e identifica los materiales combustibles',
  },
  {
    id: 'calculo',
    titulo: 'Cálculo y Análisis',
    descripcion: 'Cuantificación de carga térmica por sector según OGUC',
    foto: 'preparacion-descargos-sumario-sanitario',
    alt: 'Profesional con calculadora cuantificando la carga térmica por sector',
  },
  {
    id: 'informe',
    titulo: 'Informe ECC',
    descripcion: 'Elaboramos el informe técnico en 3-5 días hábiles',
    foto: 'revision-expediente-observaciones-seremi',
    alt: 'Revisión del informe técnico del Estudio de Carga de Combustible',
  },
  {
    id: 'entrega',
    titulo: 'Entrega',
    descripcion: 'Recibes tu informe con recomendaciones para cumplir la normativa',
    foto: 'operario-transpaleta-racks-estudio-carga-combustible',
    alt: 'Bodega con racks operando con su estudio de carga de combustible al día',
  },
];

export function EccPasos({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="pasos-ecc"
      copete="Paso a paso"
      titulo="¿Cómo obtienes tu Estudio de Carga de Combustible?"
      pasos={PASOS.map((p, i) => ({ ...p, numero: String(i + 1).padStart(2, '0'), ...COLORES_FRANJA[i] }))}
    />
  );
}

export default EccPasos;
