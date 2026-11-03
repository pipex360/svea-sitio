/**
 * Preguntas frecuentes del Plan para Condominios: las seis del WordPress,
 * con su texto exacto, en acordeones nativos (mismo formato que cti-faq.tsx
 * y ecc-faq.tsx).
 *
 * 3-nov (SEO tanda 1): tres preguntas nuevas (quién firma, multa, plazo) y
 * dos ajustadas (actualización, valor) con lo que la gente busca. Lo legal
 * sale TEXTUAL de las preguntas de la guía /plan-de-emergencia-condominio-chile/.
 * Sin precio: no hay precio publicado en el sitio.
 */

import { ChevronDownIcon } from 'lucide-react';

export const PREGUNTAS = [
  {
    p: '¿Qué incluye un plan de emergencia y evacuación para condominios?',
    r: 'Incluye análisis de riesgos del recinto, procedimientos de respuesta, rutas y puntos de encuentro, roles para administración/comité, protocolos para conserjería y comunicación interna para evacuar de forma ordenada y segura.',
  },
  {
    p: '¿Quién firma el plan de emergencia de un condominio?',
    r: 'La Ley 21.442 exige que el plan sea elaborado y suscrito por un ingeniero en prevención de riesgos; sin esa firma no tiene validez legal. El administrador firma las actualizaciones junto al presidente del comité. En SVEA entregamos el plan firmado por ingeniero.',
  },
  {
    p: '¿Quién debe liderar la implementación dentro del condominio?',
    r: 'Generalmente la Administración, en coordinación con el Comité, con apoyo de conserjería y responsables designados. El plan define roles para asegurar una respuesta coordinada en emergencias.',
  },
  {
    p: '¿Por qué es importante contar con un plan en una comunidad residencial?',
    r: 'Porque permite evacuar de forma rápida y ordenada, reduce el pánico, define responsabilidades y mejora la gestión de seguridad del condominio, protegiendo a residentes, visitas y personal.',
  },
  {
    p: '¿Qué emergencias se consideran típicamente?',
    r: 'Incendios, sismos, cortes eléctricos relevantes, eventos climáticos, accidentes en áreas comunes y evacuaciones preventivas por amenazas externas, siempre ajustado a los riesgos del recinto.',
  },
  {
    p: '¿Cada cuánto se actualiza el plan de emergencia del condominio?',
    r: 'La Ley 21.442 (art. 40) exige actualizar el plan de emergencia cuando cambian las condiciones de seguridad del edificio, y el plan de evacuación al menos una vez al año, con sus simulacros de evacuación. Según el reglamento (DS 7 del MINVU, art. 35), las actualizaciones deben entregarse a Bomberos y Carabineros dentro de 15 días corridos desde su suscripción.',
  },
  {
    p: '¿Qué multa hay si el condominio no tiene plan de emergencia?',
    r: 'Según el art. 88 de la Ley 21.442, las multas al administrador van de 1 a 4 UTM (infracciones menos graves) y de 5 a 10 UTM (graves y gravísimas), con posibilidad de suspensión o eliminación del Registro Nacional de Administradores.',
  },
  {
    p: '¿Cuánto demora SVEA en entregar el plan?',
    r: 'Entre 5 y 10 días hábiles para el plan completo. La cotización te llega en menos de 24 horas.',
  },
  {
    p: '¿Cuánto cuesta y de qué depende el valor?',
    r: 'El costo depende de la complejidad del condominio (torres/pisos, subterráneos, salas técnicas, aforo). Contáctanos para una cotización personalizada sin compromiso. Respondemos en menos de 24 horas.',
  },
];

export function PcFaq() {
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

export default PcFaq;
