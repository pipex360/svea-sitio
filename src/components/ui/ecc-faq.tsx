/**
 * Preguntas frecuentes sobre el ECC: las seis del WordPress, con su texto
 * exacto, en acordeones nativos (mismo formato que cti-faq.tsx).
 */

import { ChevronDownIcon } from 'lucide-react';

export const PREGUNTAS = [
  {
    p: '¿En qué consiste el Estudio de Carga de Combustible?',
    r: 'Es un análisis técnico que determina la cantidad de material combustible presente en una instalación, permitiendo evaluar el nivel de riesgo de incendio y establecer medidas de seguridad adecuadas conforme a la OGUC y la norma NCh 1916.',
  },
  {
    p: '¿Quiénes deben realizar este estudio?',
    r: 'Empresas industriales, bodegas, centros logísticos, centros comerciales y cualquier instalación con almacenamiento de materiales combustibles o inflamables que requiera cumplir con la normativa de seguridad contra incendios.',
  },
  {
    p: '¿Es obligatorio contar con este estudio?',
    r: 'Sí, es un requisito para cumplir con normativas de seguridad contra incendios establecidas en la OGUC y para la obtención de permisos municipales y sectoriales. También puede ser exigido por la autoridad sanitaria o por compañías de seguros.',
  },
  {
    p: '¿Qué pasa si mi carga de combustible supera los límites permitidos?',
    r: 'Se deben implementar medidas correctivas, como reducción de materiales combustibles, instalación de sistemas contra incendios, redistribución del almacenamiento o sectorización de la instalación. En SVEA te asesoramos en las adecuaciones necesarias.',
  },
  {
    p: '¿Este estudio tiene vigencia o debe renovarse?',
    r: 'No tiene una vigencia fija, pero se recomienda actualizarlo si hay cambios en la distribución de los materiales, ampliaciones en la infraestructura o modificaciones en los procesos que alteren la cantidad de materiales combustibles almacenados.',
  },
  {
    p: '¿Cuánto cuesta el Estudio de Carga de Combustible?',
    r: 'El costo varía según la complejidad y tamaño de la instalación. Contáctanos para una cotización personalizada sin compromiso. Respondemos en menos de 24 horas.',
  },
];

export function EccFaq() {
  return (
    <section className="bg-hoja px-6 py-20" id="preguntas" aria-labelledby="titulo-faq">
      <div className="mx-auto max-w-3xl">
        <h2
          id="titulo-faq"
          className="mb-10 text-balance text-center text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          Preguntas Frecuentes <span className="font-black text-svea">sobre el ECC</span>
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

export default EccFaq;
