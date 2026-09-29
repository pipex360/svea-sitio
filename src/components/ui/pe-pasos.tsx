'use client';

/**
 * ¿Cómo obtienes tu Plan de Emergencia?: los pasos del servicio con el formato de «¿Cómo Trabajamos?»
 * de la portada (la sección «Issues» de arup.com), igual que en la CTI y el
 * ECC. Los títulos y descripciones son los de siempre (pe-servicio.tsx);
 * aquí sólo se eligen las fotos.
 */

import { COLORES_FRANJA, PasoAPaso } from '@/components/ui/proceso';
import { PASOS } from '@/components/ui/pe-servicio';

const FOTOS = [
  { foto: 'firma-solicitud-seremi-en-linea', alt: "Firma de la solicitud de cotización del plan de emergencia" },
  { foto: 'inspeccion-planta-fiscalizacion-seremi', alt: "Visita técnica a la planta para el análisis de riesgos" },
  { foto: 'senal-salida-emergencia-evacuacion', alt: "Señalética de salida de emergencia, parte del diseño de protocolos" },
  { foto: 'preparacion-descargos-sumario-sanitario', alt: "Profesional elaborando el plan con planos y procedimientos" },
  { foto: 'simulacro-incendio-extintor-plan-de-emergencia', alt: "Simulacro con extintor: el plan listo para implementar" },
];

export function PePasos({ base = '' }: { base?: string }) {
  return (
    <PasoAPaso
      base={base}
      id="pasos-pe"
      copete="Paso a paso"
      titulo="¿Cómo obtienes tu Plan de Emergencia?"
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

export default PePasos;
