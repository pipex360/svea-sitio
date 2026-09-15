/**
 * Trama de puntos de fondo, copiada de 21st.dev sin cambios de estructura.
 *
 * Sólo se cambia el color por defecto: el original usa `fill-neutral-400/80`,
 * un gris que sobre blanco se ve sucio a esta densidad. Aquí los puntos van
 * en el verde del logo muy diluido, que a 16 px de separación se lee como
 * textura y no como suciedad.
 *
 * No lleva estado: Astro la dibuja en el servidor y no viaja JavaScript.
 */
import { useId } from 'react';

import { cn } from '@/lib/utils';

interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  [key: string]: unknown;
}

function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full fill-svea/25', className)}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

export { DotPattern };
