'use client';

/**
 * La barra que aparece al salir del hero: logo, menú y «Solicitar cotización».
 *
 * Mientras el hero está en pantalla no existe —el hero ya trae su cabecera—.
 * Cuando el hero termina de pasar, baja desde arriba y acompaña el resto de
 * la página, para que el botón de cotizar esté siempre a mano. Es blanca y
 * sólida, sin vidrio.
 *
 * Escondida va `inert` y `aria-hidden`: si sólo se corriera fuera de la
 * pantalla, el teclado seguiría cayendo en sus enlaces. Con
 * `prefers-reduced-motion` aparece y desaparece sin deslizarse.
 *
 * El menú es el mismo del hero (MenuSvea), que en el teléfono se esconde
 * solo; ahí quedan el logo y el menú ☰ (MenuMovil). El botón de cotizar no
 * va en el teléfono: ya está en la barra de abajo, en la zona del pulgar.
 */

import { useEffect, useState } from 'react';

import { MenuMovil } from '@/components/ui/menu-movil';
import MenuSvea from '@/components/ui/navigation-menu-06';
import { cn } from '@/lib/utils';

export function BarraPegajosa({ base = '' }: { base?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('#inicio');
    if (!hero) return;
    const observador = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting));
    observador.observe(hero);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b border-border bg-white shadow-[0_8px_24px_-18px_rgba(0,0,0,0.35)]',
        'transition-transform duration-300 ease-out motion-reduce:transition-none',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
      aria-hidden={!visible}
      inert={!visible || undefined}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <a href={`${base}/`} aria-label="SVEA Consultores, inicio" className="shrink-0">
          <img src={`${base}/img/logo-svea.webp`} width={404} height={137} alt="SVEA Consultores" className="block h-8 w-auto" />
        </a>
        <MenuSvea base={base} />
        {/* en el teléfono, el ☰; el botón de cotizar ya está en la barra de abajo */}
        <a className="btn-flecha chica max-md:hidden" href={`${base}/#form-home`} style={{ gap: 0 }}>
          <span>Solicitar cotización</span>
        </a>
        <MenuMovil base={base} />
      </div>
    </div>
  );
}

export default BarraPegajosa;
