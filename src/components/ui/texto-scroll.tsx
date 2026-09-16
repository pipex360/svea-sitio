'use client';

/**
 * Un párrafo que se va leyendo con el scroll: cada palabra pasa de gris
 * claro a su color a medida que el párrafo cruza la pantalla, ligado a la
 * posición —no a un temporizador—, así que subir lo «des-lee».
 *
 * Adaptado del Scroll word reveal del catálogo oficial de motion.dev con
 * dos cambios:
 *
 * 1. **El HTML llega con el texto entero y en su color.** El original
 *    escribe la opacidad inicial de cada palabra en el servidor, y Google y
 *    quien no tenga JavaScript reciben un párrafo en gris al 18 %. Aquí las
 *    palabras nacen en opacidad 1 y sólo tras hidratar se enganchan al
 *    scroll.
 * 2. Cada palabra va seguida de un espacio de verdad, no de un margen: al
 *    copiar el párrafo salen las palabras separadas, y los lectores de
 *    pantalla lo leen como una frase.
 *
 * Con `prefers-reduced-motion` no se engancha: el párrafo queda quieto y
 * entero.
 */

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/** Opacidad de una palabra que todavía no se «leyó». */
const SIN_LEER = 0.18;

const Palabra = ({
  texto,
  progreso,
  desde,
  hasta,
  activa,
}: {
  texto: string;
  progreso: MotionValue<number>;
  desde: number;
  hasta: number;
  activa: boolean;
}) => {
  const opacidad = useTransform(progreso, [desde, hasta], [SIN_LEER, 1]);
  return (
    <>
      <motion.span style={{ opacity: activa ? opacidad : 1 }}>{texto}</motion.span>{' '}
    </>
  );
};

export function TextoScroll({
  texto,
  className,
  id,
}: {
  texto: string;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const quieto = useReducedMotion();
  const [hidratado, setHidratado] = useState(false);
  useEffect(() => setHidratado(true), []);

  // de cuando el párrafo asoma por abajo hasta que pasa la mitad de la pantalla
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });

  const palabras = texto.split(' ');
  const activa = hidratado && !quieto;

  return (
    <p ref={ref} id={id} className={className}>
      {palabras.map((palabra, i) => (
        <Palabra
          key={`${i}-${palabra}`}
          texto={palabra}
          progreso={scrollYProgress}
          desde={i / palabras.length}
          hasta={(i + 1) / palabras.length}
          activa={activa}
        />
      ))}
    </p>
  );
}

export default TextoScroll;
