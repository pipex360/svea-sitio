/**
 * Preguntas frecuentes sobre el manejo de residuos peligrosos: las seis del
 * WordPress, con su texto exacto, en acordeones nativos (mismo formato que
 * cti-faq.tsx / ecc-faq.tsx).
 */

import { ChevronDownIcon } from 'lucide-react';

export const PREGUNTAS = [
  {
    p: '¿Cuáles son los residuos peligrosos que deben ser gestionados bajo normativa?',
    r: 'Los residuos peligrosos que deben gestionarse incluyen materiales inflamables, tóxicos, corrosivos y reactivos, así como residuos industriales como metales pesados, solventes, aceites y productos químicos desechados. Estas sustancias deben manejarse según los Decretos 43/2015 y 148/2003 del MINSAL.',
  },
  {
    p: '¿Es obligatorio contar con un plan de manejo de residuos peligrosos?',
    r: 'Sí, según la normativa vigente, toda empresa que genere o manipule sustancias peligrosas debe contar con un plan de manejo aprobado que cumpla con los Decretos 43/2015 y 148/2003 del MINSAL.',
  },
  {
    p: '¿Qué pasa si mi empresa no cumple con la normativa?',
    r: 'La empresa podría enfrentar sanciones económicas, multas y clausuras por incumplimiento ambiental o sanitario. Además, un manejo inapropiado puede generar riesgos de contaminación, incendios e intoxicaciones.',
  },
  {
    p: '¿Por qué es importante el manejo de residuos peligrosos?',
    r: 'El manejo adecuado de residuos peligrosos es crucial para proteger la salud pública, el medio ambiente y prevenir accidentes laborales. Un manejo inapropiado puede generar riesgos de contaminación a largo plazo en el ecosistema.',
  },
  {
    p: '¿Qué normativas regulan el manejo de sustancias peligrosas en Chile?',
    r: 'En Chile, el manejo de residuos peligrosos está regulado principalmente por el Decreto 43/2015 (almacenamiento de sustancias peligrosas) y el Decreto 148/2003 del MINSAL (reglamento sanitario sobre manejo de residuos peligrosos), que establecen los requisitos para su almacenamiento, transporte y disposición.',
  },
  {
    p: '¿Cuánto cuesta el servicio?',
    r: 'El costo varía según la complejidad de la instalación, los tipos de residuos generados y el volumen de operación. Contáctanos para una cotización personalizada sin compromiso. Respondemos en menos de 24 horas.',
  },
];

export function RpFaq() {
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

export default RpFaq;
