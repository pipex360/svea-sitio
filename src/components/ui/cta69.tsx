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
 *
 * Es el cierre común de TODAS las páginas (portada, servicios, landings,
 * guías, blog y páginas sueltas) y desde el 25-sep el texto es uno solo
 * (src/data/cierre.ts): Carlos pidió que «la parte final sea siempre igual».
 * La página sólo dice a dónde lleva el botón (`destino`) y, si quiere, el
 * enlace de WhatsApp (`whatsapp`, las landings precargan su propio texto).
 * El fondo es Velaris en su versión `suave`: verde SVEA sin la viñeta que en
 * una franja ancha lo dejaba casi negro.
 */

import { Badge7 } from '@/components/ui/cta69-utils/badge7';
import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { Reveal } from '@/components/ui/reveal';
import { Velaris } from '@/components/ui/velaris';
import { CIERRE } from '@/data/cierre';
import { cn } from '@/lib/utils';

interface Cta69Props {
  /** a dónde lleva «Solicitar cotización»: el formulario de la página */
  destino?: string;
  /** el enlace de WhatsApp (por defecto, el del sitio) */
  whatsapp?: string;
  className?: string;
  /**
   * Textos propios de la página (portada y CTI). Si vienen, el cierre usa
   * éstos en vez del común de src/data/cierre.ts y se ve como el original:
   * un solo botón y la letra chica debajo, sin el de WhatsApp.
   */
  badge?: { label: string };
  heading?: string;
  button?: { label: string; href: string };
  labels?: { marqueePhrase?: string; note?: string; footnote?: string };
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

export function Cta69({
  destino,
  whatsapp = CIERRE.whatsapp,
  className,
  badge,
  heading,
  button,
  labels,
}: Cta69Props) {
  const propio = Boolean(heading);
  const frase = propio ? labels?.marqueePhrase : CIERRE.cinta;
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
        <Badge7 label={badge?.label ?? CIERRE.badge} className="border-white/25 bg-white/10 text-white" />

        <h2 className="mt-8 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
          {heading ?? CIERRE.titulo}
        </h2>

        {(propio ? labels?.note : CIERRE.nota) && (
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/80 md:text-xl">
            {propio ? labels?.note : CIERRE.nota}
          </p>
        )}

        <div className="mt-12 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a href={button?.href ?? destino} className="btn-flecha inversa">
            <span>{button?.label ?? CIERRE.boton}</span>
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
          {!propio && (
            <a href={whatsapp} target="_blank" rel="noopener" className="btn-whatsapp">
              <IconoWhatsApp className="size-5" />
              {CIERRE.whatsappTexto}
            </a>
          )}
        </div>

        {propio ? (
          labels?.footnote && <p className="mt-8 text-base text-white/60">{labels.footnote}</p>
        ) : (
          <p className="mt-8 text-base text-white/60">
            {CIERRE.pie} ·{' '}
            <a href={CIERRE.telefono.href} className="whitespace-nowrap text-white/80 no-underline hover:text-white">
              {CIERRE.telefono.texto}
            </a>
          </p>
        )}
      </Reveal>
    </section>
  );
}

export default Cta69;
