/**
 * Preguntas frecuentes sobre el Informe Sanitario: las seis del WordPress,
 * con su texto exacto, en acordeones nativos (mismo formato que
 * ecc-faq.tsx). Las respuestas van en texto plano porque también alimentan
 * el FAQPage de SeoHead; las negritas del original se pierden, no el texto.
 */

import { ChevronDownIcon } from 'lucide-react';

export const PREGUNTAS = [
  {
    p: '¿Qué es el informe sanitario favorable?',
    r: 'El informe sanitario favorable es un documento oficial emitido por la SEREMI de Salud que certifica que un establecimiento cumple con todas las condiciones sanitarias, ambientales y de seguridad exigidas por la normativa vigente. Es un requisito previo e indispensable para la obtención de la patente municipal de funcionamiento.',
  },
  {
    p: '¿Qué diferencia hay entre informe sanitario y autorización sanitaria?',
    r: 'El informe sanitario favorable es el pronunciamiento técnico de la SEREMI de Salud sobre las condiciones de un establecimiento, generalmente solicitado como requisito para la patente municipal. La autorización sanitaria es un permiso más específico que se exige a ciertos rubros regulados (como alimentos, productos farmacéuticos o establecimientos de salud) y que habilita directamente el funcionamiento de la actividad. En muchos casos, ambos trámites se gestionan de forma complementaria.',
  },
  {
    p: '¿Cuánto demora obtener el informe sanitario?',
    r: 'El plazo depende de la complejidad del establecimiento y de la carga de trabajo de la SEREMI de Salud correspondiente. El plazo de la SEREMI varía según la región y la carga de trabajo; en nuestra experiencia, desde la presentación del expediente, el proceso suele tomar entre 15 y 45 días hábiles. En SVEA nos encargamos de preparar una presentación completa desde el inicio para minimizar observaciones y acelerar los tiempos de resolución.',
  },
  {
    p: '¿Qué documentos necesito para el informe sanitario?',
    r: 'Los documentos varían según el tipo de actividad, pero generalmente se requiere: plano de planta del establecimiento, escritura o contrato de arriendo, certificado de informaciones previas, patente provisoria o solicitud municipal, declaración de actividad y documentos de la empresa (RUT, representante legal). Nosotros te indicamos exactamente qué necesitas según tu caso particular.',
  },
  {
    p: '¿Es obligatorio el informe sanitario para obtener la patente municipal?',
    r: 'Sí, es obligatorio para la gran mayoría de actividades comerciales, industriales y de servicios. La municipalidad exige el pronunciamiento favorable de la SEREMI de Salud antes de otorgar la patente definitiva. Sin este informe, no es posible obtener la autorización de funcionamiento legal del establecimiento.',
  },
  {
    p: '¿Cuánto cuesta el servicio de informe sanitario?',
    r: 'El costo depende del tipo de establecimiento, la superficie, la actividad económica y la complejidad del proyecto. Cada caso se evalúa de forma individual para entregar una cotización personalizada y transparente. Contáctanos para recibir tu cotización sin compromiso en menos de 24 horas.',
  },
];

export function IsFaq() {
  return (
    <section className="bg-hoja px-6 py-20" id="preguntas" aria-labelledby="titulo-faq">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Preguntas frecuentes
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2
          id="titulo-faq"
          className="mb-10 text-balance text-center text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          Resuelve <span className="font-black text-svea">tus dudas</span>
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

export default IsFaq;
