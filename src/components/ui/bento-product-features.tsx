'use client';

/**
 * Rejilla bento de seis huecos.
 *
 * Adaptado del componente de 21st.dev. Tres cambios respecto del original:
 *
 * 1. La animación viene de `motion/react`, no de `framer-motion`. Es la misma
 *    biblioteca —framer-motion se renombró a motion— y el proyecto ya la trae
 *    por el carrusel de logos. Instalar la otra sería duplicarla.
 * 2. Las tarjetas entran cuando la sección aparece en pantalla
 *    (`whileInView`), no al cargar la página. Esta sección está muy por debajo
 *    del hero: con `animate` la animación ocurría sin que nadie la viera.
 * 3. Respeta `prefers-reduced-motion`: si el sistema lo pide, las tarjetas
 *    aparecen sin desplazamiento.
 * 4. La columna alta ocupa dos filas, no tres. Con el reparto original
 *    quedaba con trescientos ochenta píxeles de vacío: su contenido no da
 *    para tres filas.
 * 5. La banda de abajo es opcional. Aquí el cierre salió de la rejilla para
 *    ocupar su propia franja a todo el ancho, así que la rejilla se queda en
 *    dos filas y cinco huecos.
 */

import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const contenedorVariantes = {
  oculto: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const piezaVariantes = {
  oculto: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 14 },
  },
};

const piezaQuieta = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

interface BentoGridShowcaseProps {
  /** columna alta de la izquierda */
  integration: React.ReactNode;
  /** arriba centro */
  trackers: React.ReactNode;
  /** arriba derecha */
  statistic: React.ReactNode;
  /** medio centro */
  focus: React.ReactNode;
  /** medio derecha */
  productivity: React.ReactNode;
  /** banda ancha de abajo; si no viene, la rejilla se queda en dos filas */
  shortcuts?: React.ReactNode;
  className?: string;
}

export const BentoGridShowcase = ({
  integration,
  trackers,
  statistic,
  focus,
  productivity,
  shortcuts,
  className,
}: BentoGridShowcaseProps) => {
  const reducido = useReducedMotion();
  const pieza = reducido ? piezaQuieta : piezaVariantes;

  return (
    <motion.div
      variants={contenedorVariantes}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={cn(
        'grid w-full grid-cols-1 gap-6 md:grid-cols-3',
        shortcuts ? 'md:grid-rows-3' : 'md:grid-rows-2',
        'auto-rows-[minmax(180px,auto)]',
        className,
      )}
    >
      <motion.div variants={pieza} className="md:col-span-1 md:row-span-2">
        {integration}
      </motion.div>

      <motion.div variants={pieza} className="md:col-span-1 md:row-span-1">
        {trackers}
      </motion.div>

      <motion.div variants={pieza} className="md:col-span-1 md:row-span-1">
        {statistic}
      </motion.div>

      <motion.div variants={pieza} className="md:col-span-1 md:row-span-1">
        {focus}
      </motion.div>

      <motion.div variants={pieza} className="md:col-span-1 md:row-span-1">
        {productivity}
      </motion.div>

      {shortcuts && (
        <motion.div variants={pieza} className="md:col-span-3 md:row-span-1">
          {shortcuts}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BentoGridShowcase;
