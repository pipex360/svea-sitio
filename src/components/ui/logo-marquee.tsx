/**
 * Carrusel de logos de clientes, con desenfoque en los bordes.
 *
 * Adaptado del InfiniteSlider de 21st.dev con un cambio de fondo: el
 * desplazamiento es una animación CSS, no JavaScript. El original movía la
 * cinta con motion (`animate` sobre un motion value): cada cuadro escribía
 * un `transform` en línea y, como la cinta no tenía capa propia, Chrome
 * repintaba la página entera 60 veces por segundo mientras la cinta estaba
 * cerca de la pantalla. En el teléfono se sentía como un scroll que se
 * atasca al bajar del hero (medido: 130 repintados en 2 s de scroll; sin la
 * cinta, 7). Con `@keyframes` sobre `transform` lo mueve el compositor y el
 * hilo principal no interviene.
 *
 * El bucle son dos mitades idénticas; correr media anchura deja la segunda
 * exactamente donde estaba la primera, así que no se ve el salto (el mismo
 * truco de la cinta del CTA). Cada mitad lleva el hueco al final para que
 * las dos midan lo mismo.
 *
 * Se pierde el cambio de velocidad al pasar el cursor del original: cambiar
 * la duración de una animación CSS en marcha la hace saltar. Con
 * `prefers-reduced-motion` la cinta se queda quieta.
 *
 * No lleva estado: Astro lo dibuja en el servidor y no viaja JavaScript.
 */

import { cn } from '@/lib/utils';

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** proporción ancho/alto del archivo, para equilibrar el tamaño óptico */
  ratio?: number;
};

/** Los logos de SVEA van de proporción 1,1 a 4,3. Con una altura fija los
 *  cuadrados quedarían diminutos, así que se calcula a partir de su proporción. */
const alto = (logo: Logo) => `${Math.round(40 / Math.pow(logo.ratio ?? 2, 0.35))}px`;

const Mitad = ({ logos, oculta }: { logos: Logo[]; oculta?: boolean }) => (
  <div className="flex shrink-0 items-center gap-[42px] pr-[42px]" aria-hidden={oculta || undefined}>
    {logos.map((logo, i) => (
      <img
        key={`${logo.alt}-${i}`}
        alt={oculta ? '' : logo.alt}
        src={logo.src}
        loading="lazy"
        className="pointer-events-none w-auto select-none object-contain"
        style={{ height: alto(logo) }}
      />
    ))}
  </div>
);

export function LogoMarquee({ logos, className }: { logos: Logo[]; className?: string }) {
  return (
    <div
      className={cn(
        'mx-auto max-w-7xl overflow-hidden py-4',
        '[mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]',
        className,
      )}
    >
      <div className="logos-cinta flex w-max items-center">
        <Mitad logos={logos} />
        <Mitad logos={logos} oculta />
      </div>
    </div>
  );
}

export default LogoMarquee;
