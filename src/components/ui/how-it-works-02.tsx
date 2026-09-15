/**
 * «¿Cómo Trabajamos?» — los cinco pasos sobre el riel punteado de 21st.dev.
 *
 * Los títulos y las descripciones son los del sitio actual, palabra por
 * palabra.
 *
 * Dos cambios respecto del componente original:
 *
 * 1. No trae su propio encabezado. El copete, el titular y la entrada se
 *    quedan en la página, con el mismo tratamiento que «Nuestros Servicios» y
 *    «Cumplimiento Ambiental»: dos líneas cortas a los lados del copete. Si
 *    el componente pusiera el suyo, esta sección sería la única de la home
 *    con otro estilo de encabezado.
 * 2. Son cinco pasos, no cuatro, y el acento es negro.
 *
 * Los iconos son de lucide, que el proyecto ya trae. No lleva estado ni
 * efectos, así que Astro lo dibuja en el servidor: no viaja JavaScript.
 */

import { BadgeCheck, FileText, Landmark, PencilRuler, Search } from 'lucide-react';

const PASOS = [
  {
    icon: FileText,
    title: 'Cotización',
    body: 'Recibe tu cotización en menos de 24 horas',
  },
  {
    icon: Search,
    title: 'Diagnóstico',
    body: 'Evaluamos tu caso y requerimientos específicos',
  },
  {
    icon: PencilRuler,
    title: 'Desarrollo',
    body: 'Elaboramos la documentación técnica en 5-10 días hábiles',
  },
  {
    icon: Landmark,
    title: 'Gestión',
    body: 'Tramitamos ante la autoridad competente',
  },
  {
    icon: BadgeCheck,
    title: 'Entrega',
    body: 'Recibes tu documentación aprobada',
  },
];

export function HowItWorks02() {
  return (
    <ol className="relative mx-auto flex max-w-3xl flex-col gap-6 border-l border-dashed border-black/20 pl-10 sm:pl-12">
      {PASOS.map((paso, i) => (
        <li key={paso.title} className="relative">
          <span className="absolute -left-[3.65rem] top-1 grid size-9 place-items-center rounded-full border border-border bg-white font-mono text-xs font-semibold text-black shadow-sm shadow-black/5 sm:-left-[4.15rem]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition-colors duration-200 hover:border-black/30 sm:p-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-black/5 text-black">
              <paso.icon className="size-4" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold tracking-tight text-black">{paso.title}</h3>
              <p className="text-sm leading-relaxed text-black/65">{paso.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default HowItWorks02;
