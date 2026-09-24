/**
 * Preguntas frecuentes sobre el Plan de Emergencia: las seis del WordPress,
 * con su texto exacto, en acordeones nativos (mismo formato que cti-faq.tsx).
 */

import { ChevronDownIcon } from 'lucide-react';

const PREGUNTAS = [
  {
    p: '¿Qué incluye un plan de emergencia y evacuación?',
    r: 'Un plan de emergencia y evacuación incluye procedimientos detallados para actuar ante emergencias, rutas de evacuación, puntos de reunión, asignación de roles y responsabilidades, y medidas de protección para garantizar la seguridad de los ocupantes de la instalación.',
  },
  {
    p: '¿Quién debe implementar un plan de emergencia y evacuación?',
    r: 'Toda empresa, industria o instalación con riesgos operacionales significativos, como fábricas, almacenes, oficinas, centros comerciales y cualquier lugar donde haya concentración de personas, debe implementar un plan de emergencia y evacuación para cumplir con las normativas de seguridad.',
  },
  {
    p: '¿Por qué es importante tener un plan de emergencia y evacuación?',
    r: 'Es crucial para proteger la vida de las personas, minimizar daños a las instalaciones y cumplir con las normativas legales. Un plan bien diseñado permite que la evacuación sea rápida, organizada y segura, reduciendo los riesgos ante situaciones de emergencia.',
  },
  {
    p: '¿Qué tipo de emergencias cubre un plan de evacuación?',
    r: 'Un plan de evacuación cubre una amplia gama de emergencias, como incendios, terremotos, derrames de sustancias peligrosas, evacuación por amenazas externas, accidentes industriales, entre otros, adaptándose a los riesgos específicos de cada instalación.',
  },
  {
    p: '¿Con qué frecuencia debe actualizarse el plan de emergencia?',
    r: 'El plan de emergencia y evacuación debe revisarse y actualizarse al menos una vez al año o cada vez que se realicen modificaciones significativas en la instalación, como cambios estructurales o la incorporación de nuevos equipos, para asegurarse de que siga siendo efectivo y cumpla con las normativas vigentes.',
  },
  {
    p: '¿Cuánto cuesta el servicio?',
    r: 'El costo varía según la complejidad y tamaño de la instalación. Contáctanos para una cotización personalizada sin compromiso. Respondemos en menos de 24 horas.',
  },
];

export function PeFaq() {
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

export default PeFaq;
