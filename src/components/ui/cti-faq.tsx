/**
 * Preguntas frecuentes sobre la CTI: las seis del WordPress, con su texto
 * exacto, en acordeones nativos.
 *
 * Usa `<details>` como el pie: sin JavaScript, con el teclado funcionando y
 * con las respuestas dentro del HTML, que es lo que leen Google y los
 * buscadores con IA. La primera viene abierta para que la sección no
 * arranque como una lista de títulos mudos.
 *
 * No lleva estado: Astro lo dibuja en el servidor y no viaja JavaScript.
 */

import { ChevronDownIcon } from 'lucide-react';

const PREGUNTAS = [
  {
    p: '¿Qué pasa si mi infraestructura no cumple con los requisitos para la CTI?',
    r: 'En caso de observaciones, te brindamos una asesoría detallada sobre los cambios necesarios para cumplir con la normativa y facilitar su aprobación. Te acompañamos en todo el proceso de adecuación hasta lograr la resolución favorable.',
  },
  {
    p: '¿Puedo operar sin la Calificación Técnica Industrial?',
    r: 'No. La Calificación Técnica Industrial es un requisito obligatorio para obtener la Patente Municipal. Operar sin ella puede resultar en multas, clausuras y la imposibilidad de formalizar tu negocio.',
  },
  {
    p: '¿Es obligatorio contar con la CTI antes de solicitar la Patente Municipal?',
    r: 'Sí, la Calificación Técnica Industrial es un requisito fundamental para obtener la Patente Municipal, ya que certifica que la infraestructura cumple con la normativa vigente y es apta para el funcionamiento de la empresa.',
  },
  {
    p: '¿La Calificación Técnica Industrial tiene vigencia o debe renovarse?',
    r: 'La CTI no tiene una fecha de vencimiento fija, pero debe actualizarse si se realizan modificaciones significativas en la infraestructura, se cambia el giro de la actividad o la autoridad lo solicita.',
  },
  {
    p: '¿Cuáles son las principales razones por las que se rechaza una CTI?',
    r: 'Las principales causas de rechazo incluyen: incompatibilidad del uso de suelo con el Plan Regulador Comunal, documentación incompleta o desactualizada, incumplimiento de normativas sanitarias o ambientales, y falta de permisos complementarios como el Estudio de Carga de Combustible.',
  },
  {
    p: '¿Qué es la calificación como actividad inofensiva?',
    r: 'La calificación como actividad inofensiva (Circular B32/04) certifica que una actividad económica no genera riesgos para la salud ni el medio ambiente. Es requerida por la SEREMI de Salud y es necesaria para obtener la patente municipal en actividades de bajo impacto. En SVEA gestionamos ambos tipos de calificación.',
  },
];

export function CtiFaq() {
  return (
    <section className="bg-hoja px-6 py-20" id="preguntas" aria-labelledby="titulo-faq">
      <div className="mx-auto max-w-3xl">
        <h2
          id="titulo-faq"
          className="mb-10 text-balance text-center text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          Preguntas Frecuentes <span className="font-black text-svea">sobre la CTI</span>
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

export default CtiFaq;
