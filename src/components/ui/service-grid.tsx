'use client';

/**
 * Rejilla de fichas con icono grande y un rótulo debajo.
 *
 * Adaptada del service-grid de 21st.dev con cinco cambios:
 *
 * 1. **Iconos, no imágenes.** El original pide un `imageUrl` por ficha y el
 *    ejemplo las trae de un CDN ajeno. Esta portada no carga un solo recurso
 *    externo, así que cada ficha recibe un componente de icono —los de
 *    lucide, que ya viajan con la página— y no hay diez descargas más.
 * 2. Sin `framer-motion`: el proyecto ya usa `motion`, que es la misma
 *    biblioteca con otro nombre de paquete. Una dependencia menos.
 * 3. **Las fichas no son enlaces.** En el original cada una es un `<a>`. Aquí
 *    son tipos de empresa, no destinos; ponerles enlace obligaría a
 *    inventarse a dónde llevan. Va una lista, que es lo que son.
 * 4. La entrada se hace con Reveal y no con `initial="hidden"`: así el HTML
 *    del servidor sale con todo visible y sólo se oculta, ya hidratado, lo
 *    que está bajo el borde de la pantalla. Con `initial` Astro escribe
 *    `opacity:0` en el HTML y Google recibe una sección en blanco.
 * 5. `container` no existe en Tailwind 4 sin configurarlo; se usa el ancho de
 *    las demás secciones.
 *
 * El salto al pasar el cursor es el del original —la ficha sube y crece con
 * un resorte—, y se anula con `prefers-reduced-motion`.
 */

import { motion, useReducedMotion } from 'motion/react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

export type Ficha = {
  nombre: string;
  icono: React.ComponentType<{ className?: string }>;
};

export function ServiceGrid({
  titulo,
  subtitulo,
  fichas,
  className,
  columnas = 'sm:grid-cols-3 lg:grid-cols-4',
}: {
  titulo?: React.ReactNode;
  subtitulo?: string;
  fichas: Ficha[];
  className?: string;
  columnas?: string;
}) {
  const quieto = useReducedMotion() ?? false;

  return (
    <div className={cn('mx-auto w-full max-w-6xl', className)}>
      {(titulo || subtitulo) && (
        <Reveal className="mb-10 text-center">
          {titulo}
          {subtitulo && (
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">
              {subtitulo}
            </p>
          )}
        </Reveal>
      )}

      <ul className={cn('grid grid-cols-2 gap-6 md:gap-8', columnas)}>
        {fichas.map(({ nombre, icono: Icono }, i) => (
          <Reveal as="li" key={nombre} delay={i * 0.06}>
            <motion.div
              whileHover={quieto ? undefined : { scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="group/ficha flex flex-col items-center gap-3 text-center"
            >
              <span className="grid size-24 place-items-center rounded-2xl border border-border bg-hoja text-svea transition-colors duration-200 group-hover/ficha:border-svea/40 group-hover/ficha:bg-white sm:size-28">
                <Icono className="size-10 sm:size-12" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium leading-snug text-black">{nombre}</span>
            </motion.div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default ServiceGrid;
