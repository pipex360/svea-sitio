'use client';

/**
 * «¿Cómo Trabajamos?»: el encabezado centrado, el esquema de nodos y la lista
 * de los cinco pasos.
 *
 * El esquema es la parte visual y va marcado como decorativo: sólo aparece a
 * partir de `md`, donde hay ancho para que los cinco nodos y sus rótulos no
 * se pisen. La lista de abajo lleva el texto de verdad —los cinco títulos con
 * su descripción— y está siempre, en cualquier tamaño de pantalla: es lo que
 * leen Google y los lectores de pantalla.
 *
 * Las tarjetas responden al paso del cursor igual que las de «Cumplimiento
 * Ambiental»: se levantan un píxel con su sombra, y además se pintan de verde
 * la barra de arriba y el número. Con `prefers-reduced-motion` no se levantan
 * ni corre la barra —el color queda, el movimiento no—.
 */

import { Esquema, MarcoEsquema, PASOS } from '@/components/ui/integration-card';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

export function Proceso({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" id="proceso" aria-labelledby="titulo-proceso">
      <Reveal className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Proceso simple y transparente
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2
          id="titulo-proceso"
          className="mb-4 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
        >
          ¿Cómo <span className="font-black text-svea">Trabajamos?</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-black/75 md:text-lg">
          Desde la cotización hasta la resolución aprobada, gestionamos todo el proceso para que tú
          te concentres en tu negocio.
        </p>
      </Reveal>

      <Reveal className="mx-auto hidden max-w-5xl md:block">
        <MarcoEsquema>
          <Esquema base={base} />
        </MarcoEsquema>
      </Reveal>

      {/* El texto de los cinco pasos, siempre presente */}
      <ol className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        {PASOS.map((paso) => {
          const Icono = paso.icono;
          const ultimo = paso.id === 'entrega';
          return (
            <Reveal
              as="li"
              key={paso.id}
              delay={PASOS.indexOf(paso) * 0.08}
              className={cn(
                'group/paso relative overflow-hidden rounded-xl border border-border bg-white p-5',
                'transition-[transform,box-shadow,border-color] duration-200 ease-out',
                'hover:-translate-y-1 hover:border-black/30',
                'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3),0_2px_8px_-4px_rgba(0,0,0,0.12)]',
                'motion-reduce:transition-[box-shadow,border-color] motion-reduce:hover:translate-y-0',
              )}
            >
              {/* la barra del borde superior, que se pinta de verde al pasar */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-svea transition-transform duration-300 ease-out group-hover/paso:scale-x-100 motion-reduce:transition-none"
              />
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-200 md:hidden',
                    ultimo ? 'bg-svea/10 text-svea' : 'bg-black/5 text-black',
                  )}
                >
                  <Icono className="size-4" />
                </span>
                <span className="font-mono text-[11px] font-semibold text-black/40 transition-colors duration-200 group-hover/paso:text-svea">
                  {paso.numero}
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-black">{paso.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-black/60">{paso.descripcion}</p>
            </Reveal>
          );
        })}
      </ol>

      <p className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-bold text-black">
        <span>Informe técnico listo en 5-10 días hábiles</span>
        <span aria-hidden="true" className="font-normal text-black/25">
          ·
        </span>
        <span>Cotización en menos de 24 horas</span>
      </p>
    </section>
  );
}

export default Proceso;
