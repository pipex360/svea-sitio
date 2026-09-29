'use client';

/**
 * ¿Cómo obtienes tu Informe de Manejo de Residuos?: los pasos del servicio con el formato de «¿Cómo Trabajamos?»
 * de la portada (la sección «Issues» de arup.com), igual que en la CTI y el
 * ECC. Los títulos y descripciones son los de siempre (rp-servicio.tsx);
 * aquí sólo se eligen las fotos.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';
import { PASOS } from '@/components/ui/rp-servicio';

const FOTOS = [
  { foto: 'firma-solicitud-seremi-en-linea', alt: "Firma de la solicitud de cotización" },
  { foto: 'tambores-plasticos-sustancias-peligrosas-ds-43', alt: "Tambores de sustancias peligrosas evaluados en el levantamiento" },
  { foto: 'inspeccion-bodega-calificacion-tecnica-industrial', alt: "Clasificación de los residuos en bodega según la normativa" },
  { foto: 'preparacion-descargos-sumario-sanitario', alt: "Elaboración del plan de manejo y sus procedimientos" },
  { foto: 'tecnicos-casco-revision-calificacion-tecnica-industrial', alt: "Técnicos revisan el informe que acredita el cumplimiento" },
];

export function RpPasos({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="pasos-rp"
      copete="Paso a paso"
      titulo="¿Cómo obtienes tu Informe de Manejo de Residuos?"
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

export default RpPasos;
