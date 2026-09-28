/**
 * Preguntas frecuentes de Permisos Ambientales y Pertinencias del SEIA: las
 * cuatro del WordPress, con su texto exacto, en acordeones nativos (mismo
 * formato que ecc-faq.tsx).
 */

import { ChevronDownIcon } from 'lucide-react';

export const PREGUNTAS = [
  {
    p: '¿Qué es el SEIA y por qué es importante para mi proyecto?',
    r: 'El Sistema de Evaluación de Impacto Ambiental (SEIA) es un proceso legal y técnico utilizado en Chile para evaluar los impactos ambientales que un proyecto podría generar. Es importante para asegurar que cualquier actividad que pueda tener efectos negativos sobre el medio ambiente cumpla con las regulaciones vigentes y adopte medidas para mitigar dichos impactos.',
  },
  {
    p: '¿Quién debe solicitar la evaluación de pertinencia ante el SEIA?',
    r: 'Cualquier empresa o proyecto que tenga el potencial de generar impactos ambientales significativos, como construcciones, ampliaciones, modificaciones de infraestructuras industriales o comerciales, debe solicitar la evaluación de pertinencia ante el SEIA para determinar si requiere un Estudio de Impacto Ambiental (EIA) o una Declaración de Impacto Ambiental (DIA).',
  },
  {
    p: '¿Qué documentos necesito para solicitar un permiso ambiental en el SEIA?',
    r: 'Los documentos requeridos incluyen la descripción del proyecto, el informe de pertinencia del SEIA, entre otros. Además, dependiendo de la actividad, pueden ser necesarios otros estudios técnicos relacionados con el impacto ambiental y las medidas de mitigación.',
  },
  {
    p: '¿Cuánto cuesta el servicio?',
    r: 'Depende de la magnitud del proyecto y la tramitación requerida. Contáctanos para más detalles.',
  },
];

export function SeiaFaq() {
  return (
    <section className="bg-hoja px-6 py-20" id="preguntas" aria-labelledby="titulo-faq">
      <div className="mx-auto max-w-3xl">
        <h2
          id="titulo-faq"
          className="mb-10 text-balance text-center text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          Preguntas <span className="font-black text-svea">Frecuentes</span>
        </h2>

        <div className="space-y-3">
          {PREGUNTAS.map(({ p, r }, i) => (
            <details
              key={p}
              open={i === 0}
              className="acordeon group rounded-xl border border-border bg-white px-5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left">
                <h3 className="text-base font-bold tracking-tight text-black">{p}</h3>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-black/40 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="pb-5 text-base leading-relaxed text-black/70">{r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeiaFaq;
