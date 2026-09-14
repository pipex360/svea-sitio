'use client';

/**
 * Texto que sube desde debajo de su propia línea, palabra por palabra.
 *
 * Adaptado del componente de danielpetho. Cuatro cambios:
 *
 * 1. Usa `motion/react`, no `framer-motion`: es la misma biblioteca con el
 *    nombre nuevo, y el proyecto ya la trae.
 * 2. El tipo del `transition` sale del propio `motion.span` en vez de
 *    importar `DynamicAnimationOptions`, que cambió de sitio entre versiones.
 * 3. `arranca` sustituye a `autoStart`: la animación espera a que el texto
 *    entre en pantalla. El original arranca al montar, que en un bloque a
 *    cuatro mil píxeles del hero significa no verla nunca.
 * 4. Con `prefers-reduced-motion` el texto aparece quieto y en su sitio.
 *
 * El original traía además un fallo: al partir por líneas hacía `split()` con
 * un salto de línea literal dentro de la cadena en vez de `'\n'`.
 */

import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type Transicion = React.ComponentProps<typeof motion.span>['transition'];

interface TextProps {
  children: React.ReactNode;
  reverse?: boolean;
  transition?: Transicion;
  splitBy?: 'words' | 'characters' | 'lines' | string;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  onComplete?: () => void;
  /** cuándo empieza; falso la deja esperando */
  arranca?: boolean;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

function parteEnGrafemas(texto: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmentador = new Intl.Segmenter('es', { granularity: 'grapheme' });
    return Array.from(segmentador.segment(texto), ({ segment }) => segment);
  }
  return Array.from(texto);
}

export function VerticalCutReveal({
  children,
  reverse = false,
  transition = { type: 'spring', stiffness: 190, damping: 22 },
  splitBy = 'words',
  staggerDuration = 0.2,
  staggerFrom = 'first',
  containerClassName,
  wordLevelClassName,
  elementLevelClassName,
  onComplete,
  arranca = true,
}: TextProps) {
  const texto = typeof children === 'string' ? children : (children?.toString() ?? '');
  const reducido = useReducedMotion();

  const elementos = React.useMemo(() => {
    const palabras = texto.split(' ');
    if (splitBy === 'characters') {
      return palabras.map((palabra, i) => ({
        characters: parteEnGrafemas(palabra),
        needsSpace: i !== palabras.length - 1,
      }));
    }
    if (splitBy === 'words') return palabras;
    if (splitBy === 'lines') return texto.split('\n');
    return texto.split(splitBy);
  }, [texto, splitBy]);

  const retraso = React.useCallback(
    (indice: number) => {
      const total =
        splitBy === 'characters'
          ? (elementos as WordObject[]).reduce(
              (acc, p) => acc + p.characters.length + (p.needsSpace ? 1 : 0),
              0,
            )
          : elementos.length;
      if (staggerFrom === 'first') return indice * staggerDuration;
      if (staggerFrom === 'last') return (total - 1 - indice) * staggerDuration;
      if (staggerFrom === 'center')
        return Math.abs(Math.floor(total / 2) - indice) * staggerDuration;
      if (staggerFrom === 'random')
        return Math.abs(Math.floor(Math.random() * total) - indice) * staggerDuration;
      return Math.abs(staggerFrom - indice) * staggerDuration;
    },
    [elementos, splitBy, staggerFrom, staggerDuration],
  );

  const variantes = {
    oculto: { y: reverse ? '-100%' : '100%' },
    visible: (i: number) => ({
      y: 0,
      transition: {
        ...(transition as Record<string, unknown>),
        delay: ((transition as { delay?: number })?.delay ?? 0) + retraso(i),
      },
    }),
  };

  if (reducido) return <span className={containerClassName}>{texto}</span>;

  const grupos: WordObject[] =
    splitBy === 'characters'
      ? (elementos as WordObject[])
      : (elementos as string[]).map((el, i) => ({
          characters: [el],
          needsSpace: i !== elementos.length - 1,
        }));

  return (
    <span
      className={cn(
        containerClassName,
        'flex flex-wrap whitespace-pre-wrap',
        splitBy === 'lines' && 'flex-col',
      )}
    >
      <span className="sr-only">{texto}</span>

      {grupos.map((grupo, iPalabra, todos) => {
        const previos = todos
          .slice(0, iPalabra)
          .reduce((suma, p) => suma + p.characters.length, 0);

        return (
          <span
            key={iPalabra}
            aria-hidden="true"
            className={cn('inline-flex overflow-hidden', wordLevelClassName)}
          >
            {grupo.characters.map((letra, iLetra) => (
              <span key={iLetra} className={cn(elementLevelClassName, 'relative whitespace-pre-wrap')}>
                <motion.span
                  custom={previos + iLetra}
                  initial="oculto"
                  animate={arranca ? 'visible' : 'oculto'}
                  variants={variantes}
                  onAnimationComplete={
                    iPalabra === grupos.length - 1 && iLetra === grupo.characters.length - 1
                      ? onComplete
                      : undefined
                  }
                  className="inline-block"
                >
                  {letra}
                </motion.span>
              </span>
            ))}
            {grupo.needsSpace && <span> </span>}
          </span>
        );
      })}
    </span>
  );
}

export default VerticalCutReveal;
