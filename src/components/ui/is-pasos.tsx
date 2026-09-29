'use client';

/**
 * ¿Cómo obtienes tu Informe Sanitario Favorable?: los pasos del servicio con el formato de «¿Cómo Trabajamos?»
 * de la portada (la sección «Issues» de arup.com), igual que en la CTI y el
 * ECC. Los títulos y descripciones son los de siempre (is-servicio.tsx);
 * aquí sólo se eligen las fotos.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';
import { PASOS } from '@/components/ui/is-servicio';

const FOTOS = [
  { foto: 'firma-solicitud-seremi-en-linea', alt: "Firma de la solicitud de cotización del informe sanitario" },
  { foto: 'inspeccion-planta-fiscalizacion-seremi', alt: "Visita e inspección del establecimiento" },
  { foto: 'preparacion-descargos-sumario-sanitario', alt: "Preparación de la documentación requerida" },
  { foto: 'revision-expediente-observaciones-seremi', alt: "Ingreso y gestión del expediente ante la SEREMI" },
  { foto: 'cocina-industrial-acero-informe-sanitario', alt: "Cocina industrial operando con su informe sanitario aprobado" },
];

export function IsPasos({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="pasos-is"
      copete="Paso a paso"
      titulo="¿Cómo obtienes tu Informe Sanitario Favorable?"
      pasos={PASOS.map(({ titulo, descripcion }, i) => ({
        id: `paso-${i + 1}`,
        numero: String(i + 1).padStart(2, '0'),
        titulo,
        descripcion,
        ...FOTOS[i],
        ...COLORES_FRANJA[i],
      }))}
    />
  );
}

export default IsPasos;
