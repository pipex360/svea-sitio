// Comparison 3 de Hirael <https://hirael.com/blocks/comparison/comparison-03>
// MIT · Mohammad Shehadeh · https://github.com/MohammadShehadeh/hirael

/**
 * «Lo que nos diferencia» — las dos columnas enfrentadas.
 *
 * La izquierda es el trámite hecho por cuenta propia, tachado. La derecha, el
 * mismo trámite con SVEA. Abajo, tres cifras y el botón.
 *
 * Qué sale de dónde:
 *
 * - El copete, el titular y el párrafo son los del sitio actual, palabra por
 *   palabra, igual que los cuatro puntos de la columna derecha y las tres
 *   cifras de abajo.
 * - Los cuatro puntos de la columna izquierda son nuevos. No existían en el
 *   sitio: son el reverso de cada ventaja. Hablan de hacer el trámite por
 *   cuenta propia, no de la competencia; afirmar cómo trabajan otras
 *   consultoras sería una afirmación sobre terceros que nadie puede sostener.
 *
 * Tres cambios respecto del componente original:
 *
 * 1. El botón es un <a>, no el Button de shadcn. Ese Button trae
 *    @radix-ui/react-slot y class-variance-authority sólo para resolver su
 *    `asChild`, y aquí el botón es un enlace: no hace falta ninguna de las dos.
 * 2. El titular usa la tipografía de la casa, no `font-serif`, que en esta
 *    página no existe.
 * 3. Se añade el párrafo de entrada, que el original no tiene y el sitio sí.
 *
 * No lleva estado: Astro lo dibuja en el servidor y no viaja JavaScript.
 */

import { ArrowRight, Check, CircleAlert, CircleCheck, Minus } from 'lucide-react';

const POR_TU_CUENTA = [
  'Esperas días por un presupuesto, y llega por teléfono y sin detalle',
  'Llamas tú para averiguar en qué va el trámite',
  'Preparas el informe técnico sin saber qué va a pedir la autoridad',
  'Vas tú a la ventanilla, y la aprobación queda de tu cuenta',
] as const;

const CON_SVEA = [
  'Cotización en menos de 24 horas: la propuesta detallada llega por email automáticamente',
  'Seguimiento por WhatsApp: te mantenemos informado del avance de tu trámite en tiempo real',
  'Elaboramos la documentación técnica en 5-10 días hábiles',
  'Gestión completa ante la autoridad: desde el informe hasta la aprobación final',
] as const;

const CIFRAS: { value: string; label: string; verde?: boolean }[] = [
  { value: '24 hrs', label: 'para tu cotización' },
  { value: '5-10 días', label: 'hábiles el informe técnico' },
  { value: '100%', label: 'de aprobación en trámites realizados', verde: true },
];

export function Comparison03({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="titulo-diferencia">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/50">
            Lo que nos diferencia
          </p>
          <h2
            id="titulo-diferencia"
            className="mt-3 text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Cotización Automática y <span className="font-black text-svea">Seguimiento Digital</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70">
            Somos la única consultora ambiental en Chile con cotización automática en menos de 24
            horas y seguimiento digital de tu trámite. Sin llamadas de seguimiento, sin
            incertidumbre.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
          <div className="bg-white p-7 sm:p-8">
            <div className="flex items-center gap-2">
              <CircleAlert aria-hidden className="size-4 text-black/40" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/50">
                Haciendo el trámite por tu cuenta
              </h3>
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {POR_TU_CUENTA.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-black/55">
                  <Minus aria-hidden className="mt-0.5 size-4 shrink-0 text-black/25" />
                  <span className="line-through decoration-black/20">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black/[0.02] p-7 sm:p-8">
            <div className="flex items-center gap-2">
              <CircleCheck aria-hidden className="size-4 text-svea" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-svea">
                Con SVEA Consultores
              </h3>
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {CON_SVEA.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-black">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-svea" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {CIFRAS.map((cifra) => (
              <div key={cifra.value} className="flex items-baseline gap-2">
                <dt className="text-xs text-black/55">{cifra.label}</dt>
                <dd
                  className={`order-first font-mono text-sm font-semibold tracking-tight ${
                    cifra.verde ? 'text-svea' : 'text-black'
                  }`}
                >
                  {cifra.value}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={`${base}/#form-home`}
            className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-border bg-white px-4 text-sm font-medium text-black no-underline transition-colors hover:border-black/30 hover:bg-black/[0.03]"
          >
            Solicitar cotización
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Comparison03;
