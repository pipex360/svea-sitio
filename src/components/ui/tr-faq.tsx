/**
 * Preguntas frecuentes sobre la Autorización de Transporte de Residuos: las
 * seis del WordPress, con su texto exacto, en acordeones nativos (mismo
 * formato que cti-faq.tsx).
 */

import { ChevronDownIcon } from 'lucide-react';

const PREGUNTAS = [
  {
    p: '¿Cómo obtengo el permiso de transporte ante la SEREMI de Salud?',
    r: 'El permiso se obtiene gestionando la solicitud de autorización a través de la SEREMI de Salud. Este proceso incluye la clasificación de los residuos, la presentación de la documentación necesaria y el cumplimiento de los requisitos establecidos por la autoridad sanitaria. En SVEA Consultores nos encargamos de todo el proceso.',
  },
  {
    p: '¿Qué sanciones existen por transportar residuos sin autorización?',
    r: 'Las empresas que transporten residuos sin la autorización correspondiente se exponen a multas, sumarios sanitarios y la paralización de sus operaciones por parte de la autoridad sanitaria. Las sanciones pueden incluir clausuras temporales o definitivas.',
  },
  {
    p: '¿Cuánto demora el proceso de autorización?',
    r: 'Los plazos dependen del tipo de residuo y la documentación presentada. En SVEA Consultores gestionamos el proceso completo para que obtenga su autorización en el menor tiempo posible, optimizando cada etapa del trámite.',
  },
  {
    p: '¿Qué información necesito para solicitar la autorización?',
    r: 'Se requiere información detallada sobre los tipos de residuos, volúmenes generados, procedimientos de manejo y transporte, datos del transportista, rutas de transporte y un plan de manejo de residuos conforme a las regulaciones vigentes.',
  },
  {
    p: '¿Es obligatorio para todas las empresas gestionar el transporte de residuos con la SEREMI?',
    r: 'Sí, todas las empresas que generen residuos peligrosos o no peligrosos y necesiten transportarlos deben cumplir con la normativa vigente de la SEREMI de Salud. Esto asegura que el transporte sea seguro y conforme a las regulaciones ambientales y sanitarias.',
  },
  {
    p: '¿Cuánto cuesta el servicio?',
    r: 'El costo varía según la complejidad de la instalación, el tipo de residuo a transportar y la cantidad de vehículos involucrados. Contáctanos para una cotización personalizada sin compromiso. Respondemos en menos de 24 horas.',
  },
];

export function TrFaq() {
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

export default TrFaq;
