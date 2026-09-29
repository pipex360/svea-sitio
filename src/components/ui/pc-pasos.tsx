'use client';

/**
 * ¿Cómo obtienes tu Plan para Condominio?: los pasos del servicio con el formato de «¿Cómo Trabajamos?»
 * de la portada (la sección «Issues» de arup.com), igual que en la CTI y el
 * ECC. Los títulos y descripciones son los de siempre (pc-servicio.tsx);
 * aquí sólo se eligen las fotos.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';
import { PASOS } from '@/components/ui/pc-servicio';

const FOTOS = [
  { foto: 'firma-solicitud-seremi-en-linea', alt: "Firma de la solicitud de cotización del plan de emergencia del condominio" },
  { foto: 'revision-expediente-observaciones-seremi', alt: "Recopilación de la información del condominio" },
  { foto: 'gabinete-extintor-red-humeda-plan-emergencia', alt: "Gabinete de red húmeda y extintor: puntos críticos del análisis de riesgos" },
  { foto: 'preparacion-descargos-sumario-sanitario', alt: "Elaboración del plan, roles, procedimientos y mapas" },
  { foto: 'simulacro-extintor-brigada-plan-emergencia', alt: "Brigada con extintor: el plan listo para implementar" },
];

export function PcPasos({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="pasos-pc"
      copete="Paso a paso"
      titulo="¿Cómo obtienes tu Plan para Condominio?"
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

export default PcPasos;
