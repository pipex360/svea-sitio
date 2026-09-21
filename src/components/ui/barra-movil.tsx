'use client';

/**
 * Los accesos de contacto que acompañan toda la página.
 *
 * - En el teléfono: una barra fija abajo con dos botones, WhatsApp y
 *   Cotizar. No está mientras el hero se ve —el hero trae su propio botón y
 *   la barra le tapaba las cifras de abajo— ni mientras el formulario de
 *   contacto está a la vista, para no taparlo.
 * - En escritorio: el botón flotante de WhatsApp abajo a la derecha.
 *
 * Reemplaza al botón del plugin «Click to Chat» del WordPress, que venía
 * con su propio JavaScript. Los enlaces van a api.whatsapp.com con el mismo
 * texto que el enlace de contacto del sitio: es lo que cuenta el listener
 * de conversiones de GTM, así que no cambia.
 *
 * `copia`: en la copia de trabajo hay un aviso fijo abajo; la barra y el
 * botón se levantan lo que mide para no montarse encima.
 */

import { useEffect, useState } from 'react';

import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { cn } from '@/lib/utils';

const WHATSAPP = 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20t%C3%A9cnica';
/** altura del aviso «COPIA DE TRABAJO» */
const AVISO = 31;


export function BarraMovil({ base = '', copia = false, cotizar }: { base?: string; copia?: boolean; cotizar?: string }) {
  const destino = cotizar ?? `${base}/#form-home`;
  const [formularioALaVista, setFormularioALaVista] = useState(false);
  const [heroALaVista, setHeroALaVista] = useState(true);

  useEffect(() => {
    const contacto = document.querySelector('#contacto, #formulario-cti');
    const hero = document.querySelector('#inicio');
    const observadores: IntersectionObserver[] = [];
    if (contacto) {
      const o = new IntersectionObserver(([e]) => setFormularioALaVista(e.isIntersecting), { threshold: 0.25 });
      o.observe(contacto);
      observadores.push(o);
    }
    if (hero) {
      const o = new IntersectionObserver(([e]) => setHeroALaVista(e.isIntersecting));
      o.observe(hero);
      observadores.push(o);
    }
    return () => observadores.forEach((o) => o.disconnect());
  }, []);

  const escondida = heroALaVista || formularioALaVista;
  const abajo = copia ? AVISO : 0;

  return (
    <>
      {/* teléfono */}
      <div
        className={cn(
          'fixed inset-x-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-white p-2 md:hidden',
          'pb-[max(8px,env(safe-area-inset-bottom))]',
          'transition-transform duration-300 ease-out motion-reduce:transition-none',
          escondida ? 'translate-y-[120%]' : 'translate-y-0',
        )}
        style={{ bottom: abajo }}
        aria-hidden={escondida}
        inert={escondida || undefined}
      >
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] text-sm font-semibold text-white no-underline"
        >
          <IconoWhatsApp className="size-5" />
          WhatsApp
        </a>
        <a
          href={destino}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-black text-sm font-semibold text-white no-underline"
        >
          Cotizar
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* escritorio */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener"
        className="fixed right-6 z-40 hidden h-14 items-center gap-3 rounded-full bg-[#25d366] pl-4 pr-6 text-sm font-semibold text-white no-underline shadow-[0_12px_30px_-10px_rgba(37,211,102,0.6)] transition-transform duration-200 hover:scale-[1.03] motion-reduce:transition-none md:flex"
        style={{ bottom: abajo + 24 }}
      >
        <IconoWhatsApp className="size-6" />
        Hablemos
      </a>
    </>
  );
}

export default BarraMovil;
