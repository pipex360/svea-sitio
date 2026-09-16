'use client';

/**
 * El menú del teléfono: un botón ☰ en la cabecera que abre un panel a
 * pantalla completa con Inicio, los servicios, los recursos y guías,
 * Contacto, y abajo WhatsApp y el teléfono.
 *
 * En escritorio no existe (`md:hidden`): ahí está el menú desplegable
 * (MenuSvea), y las entradas son las mismas —salen del mismo archivo—, así
 * que no hay dos listas que mantener.
 *
 * El panel es un <dialog> nativo abierto con showModal(): el foco queda
 * atrapado dentro, Escape lo cierra y el fondo queda inerte, todo sin
 * JavaScript propio ni dependencias. Tocar fuera del panel también lo
 * cierra. Mientras está abierto, la página de atrás no se desplaza.
 */

import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { guias, masTramites, servicios } from '@/components/ui/navigation-menu-06';

const WHATSAPP = 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20t%C3%A9cnica';
const TELEFONO = '+56929947924';

export function MenuMovil({ base = '' }: { base?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);
  const url = (href: string) => `${base}${href}`;

  const abrir = () => {
    ref.current?.showModal();
    setAbierto(true);
  };
  const cerrar = () => ref.current?.close();

  // el <dialog> avisa cuando se cierra (X, Escape o clic fuera): se
  // sincroniza el estado y se libera el scroll
  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    const alCerrar = () => setAbierto(false);
    dialogo.addEventListener('close', alCerrar);
    return () => dialogo.removeEventListener('close', alCerrar);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = abierto ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [abierto]);

  const enlace =
    'flex min-h-11 items-center rounded-lg px-2 py-2.5 text-base text-black no-underline transition-colors active:bg-hoja';

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={abrir}
        aria-label="Abrir menú"
        aria-expanded={abierto}
        aria-haspopup="dialog"
        className="grid size-11 place-items-center rounded-full bg-transparent text-black"
      >
        <MenuIcon className="size-6" aria-hidden="true" />
      </button>

      <dialog
        ref={ref}
        aria-label="Menú"
        onClick={(e) => {
          if (e.target === e.currentTarget) cerrar();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-white p-0 text-black backdrop:bg-black/30"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
            <a href={url('/')} aria-label="SVEA Consultores, inicio" onClick={cerrar}>
              <img src={url('/img/logo-svea.webp')} width={404} height={137} alt="SVEA Consultores" className="block h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar menú"
              className="grid size-11 place-items-center rounded-full bg-transparent text-black"
            >
              <XIcon className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Menú principal">
            <a href={url('/')} className={`${enlace} font-semibold`} onClick={cerrar}>
              Inicio
            </a>

            <h3 className="mt-4 px-2 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-black/50">Servicios</h3>
            <ul>
              {[...servicios, ...masTramites].map((s) => (
                <li key={s.href}>
                  <a href={url(s.href)} className={enlace} onClick={cerrar}>
                    <s.icon className="mr-3 size-5 shrink-0 text-black/50" aria-hidden="true" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-4 px-2 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
              Recursos y guías
            </h3>
            <ul>
              {guias.map((g) => (
                <li key={g.href}>
                  <a href={url(g.href)} className={enlace} onClick={cerrar}>
                    <g.icon className="mr-3 size-5 shrink-0 text-black/50" aria-hidden="true" />
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>

            <a href={url('/#contacto')} className={`${enlace} mt-4 font-semibold`} onClick={cerrar}>
              Contacto
            </a>
          </nav>

          <div className="shrink-0 space-y-2 border-t border-border p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] text-sm font-semibold text-white no-underline"
            >
              <IconoWhatsApp className="size-5" />
              Escribir por WhatsApp
            </a>
            <a href={`tel:${TELEFONO}`} className="block py-2 text-center text-sm text-black/60 no-underline">
              {TELEFONO}
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default MenuMovil;
