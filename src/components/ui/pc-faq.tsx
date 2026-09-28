/**
 * Preguntas frecuentes del Plan para Condominios: las seis del WordPress,
 * con su texto exacto, en acordeones nativos (mismo formato que cti-faq.tsx
 * y ecc-faq.tsx).
 */

import { ChevronDownIcon } from 'lucide-react';

export const PREGUNTAS = [
  {
    p: '¿Qué incluye un plan de emergencia y evacuación para condominios?',
    r: 'Incluye análisis de riesgos del recinto, procedimientos de respuesta, rutas y puntos de encuentro, roles para administración/comité, protocolos para conserjería y comunicación interna para evacuar de forma ordenada y segura.',
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
    p: '¿Con qué frecuencia debe actualizarse el plan?',
    r: 'Se recomienda revisarlo al menos una vez al año o cuando existan cambios relevantes (obras, modificaciones en accesos, nuevas instalaciones, cambios en equipamiento o señalética) para mantenerlo vigente y aplicable.',
  },
  {
    p: '¿Cuánto cuesta el servicio?',
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
