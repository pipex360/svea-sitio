/**
 * «¿Qué es la Calificación Técnica Industrial?» y «¿Quién necesita una
 * CTI?», como en un documento y no como en una plantilla: un titular en
 * serif, el primer párrafo grande a modo de entrada, los otros tres en
 * columna de lectura, y al lado una sola foto grande con su pie. Debajo,
 * los ocho tipos de establecimiento en una lista con filetes, sin iconos.
 *
 * Sin JavaScript: Astro lo dibuja entero en el servidor. Los cuatro
 * párrafos y los ocho nombres son los del original, palabra por palabra.
 */

import { Foto } from '@/components/ui/foto';

const PARRAFOS = [
  'La Calificación Técnica Industrial (CTI) es un informe fundamental emitido por la SEREMI de Salud, cuyo objetivo es certificar que una industria, empresa o establecimiento cumple con los requisitos normativos, técnicos y territoriales necesarios para operar legalmente dentro de una comuna.',
  'Este documento es clave para demostrar que la actividad se encuentra correctamente emplazada, de acuerdo con el uso de suelo establecido por el Plan Regulador Comunal, y que su funcionamiento no representa riesgos sanitarios o ambientales para la comunidad.',
  'En SVEA Consultores nos encargamos de evaluar detalladamente las características de tu infraestructura, levantamos toda la información requerida y preparamos el expediente técnico completo que exige la SEREMI de Salud. Además, gestionamos directamente la tramitación del informe, representándote ante la autoridad sanitaria y facilitando la regularización de tu actividad.',
  'Ya sea que estés comenzando un proyecto o necesites regularizar una instalación existente, te ayudamos a cumplir con la normativa de forma segura, ágil y con respaldo profesional. También gestionamos la calificación como actividad inofensiva ante la SEREMI de Salud (Circular B32/04).',
];

/** Los ocho del original. */
const QUIENES = [
  'Fábricas e industrias',
  'Bodegas y centros de distribución',
  'Talleres mecánicos e industriales',
  'Empresas con modificaciones',
  'Locales comerciales regulados',
  'Centros de almacenamiento',
  'Cambios de giro o ampliaciones',
  'Actividades inofensivas (B32/04)',
];

export function CtiQueEs({ base = '' }: { base?: string }) {
  const [entrada, ...resto] = PARRAFOS;
  return (
    <section className="bg-white px-6 py-20 md:py-28" id="que-es" aria-labelledby="titulo-que-es">
      <div className="mx-auto max-w-6xl">
        <h2
          id="titulo-que-es"
          className="max-w-3xl text-balance text-4xl leading-[1.08] text-black md:text-6xl"
        >
          ¿Qué es la Calificación Técnica Industrial?
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="text-xl leading-relaxed text-black md:text-2xl md:leading-[1.5]">{entrada}</p>
            {resto.map((p) => (
              <p key={p.slice(0, 24)} className="mt-6 text-base leading-7 text-black/80 md:text-[17px] md:leading-8">
                {p}
              </p>
            ))}
          </div>
          <figure className="self-start md:sticky md:top-28 md:col-span-5">
            <Foto
              nombre="planta-quimica-calificacion-tecnica-industrial"
              alt="Calificación técnica industrial - planta química evaluada por SVEA Consultores"
              tamano="mitad"
              base={base}
              className="w-full rounded-sm"
            />
            <figcaption className="serif mt-3 text-base italic text-black/60">
              Planta química evaluada por SVEA Consultores.
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 border-t border-black pt-8 md:grid md:grid-cols-12 md:gap-10">
          <h3 className="serif text-2xl leading-tight text-black md:col-span-5 md:text-3xl">
            ¿Quién necesita una Calificación Técnica Industrial?
          </h3>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 md:col-span-7 md:mt-0">
            {QUIENES.map((q) => (
              <li key={q} className="border-b border-black/15 py-3 text-base text-black">
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CtiQueEs;
