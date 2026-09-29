'use client';

/**
 * ¿Cómo obtienes tu Autorización de Transporte?: los pasos del servicio con el formato de «¿Cómo Trabajamos?»
 * de la portada (la sección «Issues» de arup.com), igual que en la CTI y el
 * ECC. Los títulos y descripciones son los de siempre (tr-servicio.tsx);
 * aquí sólo se eligen las fotos.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';
import { PASOS } from '@/components/ui/tr-servicio';

const FOTOS = [
  { foto: 'firma-solicitud-seremi-en-linea', alt: "Firma de la solicitud de cotización" },
  { foto: 'tambores-plasticos-sustancias-peligrosas-ds-43', alt: "Residuos en tambores, evaluados y categorizados" },
  { foto: 'preparacion-descargos-sumario-sanitario', alt: "Preparación del expediente y del plan de manejo" },
  { foto: 'revision-expediente-observaciones-seremi', alt: "Presentación y seguimiento del expediente ante la SEREMI de Salud" },
  { foto: 'camion-tolva-escombros-obra-autorizacion-transporte', alt: "Camión tolva con su autorización de transporte aprobada" },
];

export function TrPasos({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="pasos-tr"
      copete="Paso a paso"
      titulo="¿Cómo obtienes tu Autorización de Transporte?"
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

export default TrPasos;
