import React, { type ComponentPropsWithoutRef, useRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * Marquee de 21st.dev, con dos cambios:
 *
 * 1. `motion-reduce:animate-none` en cada pista. Una pared de tarjetas
 *    desplazándose en tres ejes es justo lo que `prefers-reduced-motion`
 *    existe para evitar; sin esto el componente la ignora.
 * 2. Sin `tabIndex={0}` ni `aria-live`. El original hace focalizable un
 *    contenedor decorativo y lo anuncia como región viva: quien navega con
 *    teclado se queda atrapado en una caja que no hace nada, y el lector de
 *    pantalla lee las tarjetas cada vez que se mueven. Las tarjetas de
 *    dentro sí se leen, en su orden.
 */
interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  ariaLabel?: string;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ariaLabel,
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      ref={marqueeRef}
      data-slot="marquee"
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        { 'flex-row': !vertical, 'flex-col': vertical },
        className,
      )}
      aria-label={ariaLabel}
    >
      {React.useMemo(
        () => (
          <>
            {Array.from({ length: repeat }, (_, i) => (
              <div
                key={i}
                aria-hidden={i > 0 ? true : undefined}
                className={cn(
                  !vertical ? 'flex-row [gap:var(--gap)]' : 'flex-col [gap:var(--gap)]',
                  'flex shrink-0 justify-around',
                  !vertical && 'animate-marquee flex-row',
                  vertical && 'animate-marquee-vertical flex-col',
                  'motion-reduce:animate-none',
                  pauseOnHover && 'group-hover:[animation-play-state:paused]',
                  reverse && '[animation-direction:reverse]',
                )}
              >
                {children}
              </div>
            ))}
          </>
        ),
        [repeat, children, vertical, pauseOnHover, reverse],
      )}
    </div>
  );
}

export default Marquee;
