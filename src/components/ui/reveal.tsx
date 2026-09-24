'use client';

/**
 * Revelado de casa: lo que envuelve entra con un fundido corto, una subida
 * de 20 px y un desenfoque que se aclara, una sola vez, cuando llega a la
 * vista. Los hermanos se escalonan con `delay`.
 *
 * Adaptado del Reveal de asanshay y el Scroll Reveal de cnippet (21st.dev)
 * con un cambio de fondo: **el HTML llega con todo visible**. Los dos
 * originales arrancan en `initial={{ opacity: 0 }}`, y eso Astro lo
 * escribe en el HTML del servidor: Google y quien tenga JavaScript apagado
 * reciben una página en opacity 0. Aquí no hay `initial`: el elemento nace
 * visible y, ya hidratado, se oculta sólo si está por debajo del borde de
 * la pantalla —donde nadie lo ve— y se revela al entrar. Lo que ya estaba
 * a la vista al hidratar se queda como está, sin parpadeo.
 *
 * Con `prefers-reduced-motion` no se arma nunca: todo aparece sin moverse.
 */

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/** Fracción de la pantalla bajo la cual algo cuenta como «todavía no visto». */
const UMBRAL = 0.88;

const VARIANTES = {
  oculto: { opacity: 0, y: 20, filter: 'blur(6px)', transition: { duration: 0 } },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const, delay },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  /** Segundos de espera antes de entrar; sirve para escalonar hermanos. */
  delay?: number;
  className?: string;
  /** `li` para los hijos de una lista: un <div> dentro de <ol> no es HTML válido. */
  as?: 'div' | 'li';
}) {
  const Caja = as === 'li' ? motion.li : motion.div;
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const quieto = useReducedMotion();
  const margen = `0px 0px -${Math.round((1 - UMBRAL) * 100)}% 0px` as const;
  const enVista = useInView(ref, { once: true, margin: margen as `${number}px ${number}px ${number}% ${number}px` });
  const [armado, setArmado] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || quieto) return;
    // sólo se oculta lo que está bajo el borde: nadie lo ve desaparecer
    if (el.getBoundingClientRect().top > window.innerHeight * UMBRAL) setArmado(true);
  }, [quieto]);

  return (
    <Caja
      ref={ref}
      initial={false}
      animate={armado && !enVista ? 'oculto' : 'visible'}
      custom={delay}
      variants={VARIANTES}
      className={className}
    >
      {children}
    </Caja>
  );
}

export default Reveal;
