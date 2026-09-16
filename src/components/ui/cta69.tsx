/**
 * CTA con una palabra gigante deslizándose de fondo.
 *
 * Adaptado del componente de 21st.dev. Cuatro cambios, todos porque el
 * original está escrito para Next y esto es Astro:
 *
 * 1. `Badge7` no venía en el paquete. Está escrito en `cta69-utils/`, con
 *    los tokens de SVEA.
 * 2. El botón es un `<a>`, no un `<Link>` de Next. No instalé `next`: son
 *    varios megabytes de framework para resolver un enlace en un sitio que
 *    se sirve como HTML estático.
 * 3. Los fotogramas del deslizamiento viven en `tailwind.css`, no en un
 *    `<style jsx>`: styled-jsx es de Next y aquí no hay quien lo compile.
 * 4. Con `prefers-reduced-motion` la palabra de fondo se queda quieta. Es un
 *    bloque enorme moviéndose despacio de un lado a otro: justo lo que esa
 *    preferencia existe para evitar.
 * 5. Va sobre fondo oscuro: el verde del logo en movimiento (Velaris, el
 *    mismo de las tarjetas de «Cumplimiento»), con el texto en blanco y el
 *    botón invertido. Es el ancla oscura a mitad de la portada: parte la
 *    hoja blanca en dos. Si no hay WebGL queda el verde plano de respaldo.
 *
 * El botón es el mismo de la casa (`.btn-flecha`, el del hero), invertido.
 * Se hidrata (`client:idle`) por el Velaris y el revelado al bajar.
 */

import { Badge7 } from '@/components/ui/cta69-utils/badge7';
import { Reveal } from '@/components/ui/reveal';
import { Velaris } from '@/components/ui/velaris';
import { cn } from '@/lib/utils';

interface Cta69Props {
  badge?: { label: string };
  heading?: string;
  button?: { label: string; href: string };
  labels?: {
    /** la frase que se repite deslizándose de fondo */
    marqueePhrase?: string;
    /** la línea de apoyo bajo el titular */
    note?: string;
    /** la letra chica bajo el botón */
    footnote?: string;
  };
  className?: string;
}

/**
 * Cuántas veces se escribe la frase en cada mitad del deslizamiento.
 *
 * El bucle son dos mitades idénticas corridas exactamente media anchura, así
 * que sólo se lee como infinito mientras una mitad sea más ancha que la
 * pantalla. Una frase corta escrita una vez no lo es: llega al borde derecho
 * y arrastra un hueco por toda la sección hasta que la animación reinicia.
 * Repetirla es lo que cierra ese hueco.
 */
const REPETICIONES = 8;

export function Cta69({ badge, heading, button, labels = {}, className }: Cta69Props) {
  const frase = labels.marqueePhrase;
  // El separador va dentro de la frase y no como relleno entre los <span>:
  // el relleno sólo se aplica entre elementos, así que dejaba un hueco ancho
  // por copia en vez del mismo hueco pequeño entre cada repetición.
  const linea = frase ? `${frase} · `.repeat(REPETICIONES) : '';

  return (
    <section className={cn('relative w-full overflow-hidden bg-[#081c15] py-16 md:py-24', className)}>
      <Velaris className="absolute inset-0" />

      {frase && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex select-none items-center overflow-hidden"
        >
          {/* La cinta va en el verde del logo, igual de diluida que cuando era
              negra. Sube de 0,06 a 0,10 porque el verde a la misma opacidad
              casi no se distingue del blanco: así las dos versiones pesan lo
              mismo en pantalla. */}
          <div className="cta69-cinta flex w-max shrink-0 whitespace-nowrap text-white/[0.08]">
            {[0, 1].map((copia) => (
              <span
                key={copia}
                className="text-[22vw] font-bold leading-none tracking-tighter md:text-[16vw]"
              >
                {linea}
              </span>
            ))}
          </div>
        </div>
      )}

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center md:px-6">
        {badge && (
          <Badge7 label={badge.label} className="border-white/25 bg-white/10 text-white" />
        )}

        {heading && (
          <h2 className="mt-8 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            {heading}
          </h2>
        )}

        {labels.note && (
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/80 md:text-xl">
            {labels.note}
          </p>
        )}

        {button && (
          <div className="mt-12">
            <a href={button.href} className="btn-flecha inversa">
              <span>{button.label}</span>
              <span className="circulo">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        )}

        {labels.footnote && <p className="mt-8 text-base text-white/60">{labels.footnote}</p>}
      </Reveal>
    </section>
  );
}

export default Cta69;
