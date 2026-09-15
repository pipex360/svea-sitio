/**
 * Fondo de toda la web: una cuadrícula fina y un resplandor al centro.
 *
 * Adaptado del componente de 21st.dev. Tres cambios:
 *
 * 1. El resplandor es el verde del logo (#0e7a3c), no el morado del original.
 * 2. Mucho más flojo. El original pone la cuadrícula a 0,3 de opacidad y el
 *    resplandor a 0,25: sobre una página de trabajo eso no es un fondo, es un
 *    elemento más compitiendo con el contenido. Aquí la cuadrícula va a 0,05
 *    y el resplandor arranca en 0,07.
 * 3. Va fija y detrás de todo, no dentro de una caja. El original es el fondo
 *    de un bloque; aquí tiene que servir a la página entera, así que se ancla
 *    a la ventana y no se desplaza con el scroll: las secciones pasan por
 *    delante de un fondo quieto, en vez de arrastrar cada una el suyo.
 *
 * Es decorativo: va oculto para los lectores de pantalla y no intercepta el
 * cursor. No lleva estado, así que Astro lo dibuja en el servidor.
 */

import { cn } from '@/lib/utils';

export function FondoSvea({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-0 -z-10 bg-white', className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(14, 122, 60, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(14, 122, 60, 0.05) 1px, transparent 1px),
          radial-gradient(circle at 50% 42%, rgba(14, 122, 60, 0.07) 0%, rgba(14, 122, 60, 0.03) 40%, transparent 78%)
        `,
        backgroundSize: '32px 32px, 32px 32px, 100% 100%',
      }}
    />
  );
}

export default FondoSvea;
