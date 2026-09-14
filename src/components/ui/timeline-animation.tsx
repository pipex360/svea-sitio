'use client';

/**
 * TimelineContent: envoltorio que anima su contenido cuando el bloque al que
 * apunta `timelineRef` entra en pantalla.
 *
 * El componente de 21st.dev lo importaba de aquí pero no venía en el paquete,
 * así que está escrito a partir de cómo se usa: `as` elige la etiqueta,
 * `animationNum` es el número que reciben las variantes por `custom` —de ahí
 * salen los retrasos escalonados— y `customVariants` son las variantes.
 *
 * Añadido propio: con `prefers-reduced-motion` no hay desplazamiento ni
 * desenfoque; el contenido aparece y punto.
 */

import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import * as React from 'react';

type Etiqueta = 'div' | 'span' | 'p' | 'li' | 'figure' | 'h2' | 'h3' | 'a';

interface TimelineContentProps extends React.HTMLAttributes<HTMLElement> {
  as?: Etiqueta;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants: Variants;
  once?: boolean;
  amount?: number;
  href?: string;
}

const SIN_MOVIMIENTO: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

export function TimelineContent({
  as = 'div',
  animationNum,
  timelineRef,
  customVariants,
  once = true,
  amount = 0.2,
  children,
  ...props
}: TimelineContentProps) {
  const enVista = useInView(timelineRef, { once, amount });
  const reducido = useReducedMotion();
  const Comp = motion[as] as React.ElementType;

  return (
    <Comp
      custom={animationNum}
      initial="hidden"
      animate={enVista ? 'visible' : 'hidden'}
      variants={reducido ? SIN_MOVIMIENTO : customVariants}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default TimelineContent;
