'use client';

import { CheckIcon } from 'lucide-react';

import { Foto } from '@/components/ui/foto';
import { cn } from '@/lib/utils';

/**
 * Tarjeta con foto de fondo, adaptada de profile-hover-card (21st.dev): la
 * foto a sangre, un velo y un aura blancos que suben desde abajo y el texto
 * encima. Sin framer-motion (el realce es CSS), el titular no se parte letra
 * por letra (Google lo leería roto), sin los seguidores inventados del
 * original, y toda la tarjeta es el enlace.
 */
/** Un enlace dentro de la tarjeta, cuando la tarjeta entera no es un enlace. */
export type AccionTarjeta = { texto: string; href: string };

export function TarjetaFoto({
  href,
  base,
  foto,
  alt,
  icono: Icono,
  pildora,
  titulo,
  verificado = false,
  boton,
  acciones,
  pie,
  arriba,
  children,
}: {
  /** si viene, la tarjeta entera es el enlace; si no, lleva sus `acciones` */
  href?: string;
  base: string;
  foto: string;
  alt: string;
  icono: React.ComponentType<{ className?: string }>;
  pildora: string;
  titulo: string;
  verificado?: boolean;
  boton?: string;
  /** varios destinos: van como píldoras blancas, cada una su enlace */
  acciones?: AccionTarjeta[];
  /** lo que va al final (p. ej. una lista de guías) */
  pie?: React.ReactNode;
  /** en el teléfono, cuánta foto queda a la vista sobre la píldora */
  arriba: string;
  children?: React.ReactNode;
}) {
  const Caja = href ? 'a' : 'div';
  return (
    <Caja
      {...(href ? { href } : {})}
      className="group/tarjeta relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-[#d8d3c7] no-underline shadow-[0_18px_34px_-16px_rgba(55,47,36,0.35)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 sm:min-h-[520px]"
    >
      <Foto
        nombre={foto}
        alt={alt}
        tamano="(min-width: 1024px) 560px, 100vw"
        base={base}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover/tarjeta:scale-105 motion-reduce:transition-none"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
      {/* aura blanca detrás del título: aclara la foto justo donde empieza el texto */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[92%] bg-[radial-gradient(ellipse_95%_55%_at_35%_40%,rgba(255,255,255,0.85),rgba(255,255,255,0.45)_55%,transparent_85%)] sm:h-[85%] sm:bg-[radial-gradient(ellipse_90%_60%_at_30%_55%,rgba(255,255,255,0.85),rgba(255,255,255,0.4)_55%,transparent_80%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-white/90 via-white/60 to-transparent backdrop-blur-[1px]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/85 via-white/40 to-transparent backdrop-blur-sm" />

      <div className={cn('relative space-y-3 p-7 sm:space-y-4 sm:pt-7', arriba)}>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black">
          <Icono className="size-3.5" aria-hidden="true" />
          {pildora}
        </span>
        <h3 className="flex items-start gap-2 text-2xl font-bold tracking-tight text-black">
          {titulo}
          {verificado && (
            <span aria-hidden="true" className="mt-1.5 grid size-4 shrink-0 place-items-center rounded-full bg-svea text-white">
              <CheckIcon className="size-2.5" strokeWidth={3} />
            </span>
          )}
        </h3>
        {children && <p className="text-base leading-relaxed text-black/75">{children}</p>}
        {acciones && (
          <ul className="flex flex-wrap gap-2 pt-1">
            {acciones.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white no-underline transition-colors duration-200 hover:bg-[#1f2937]"
                >
                  {a.texto}
                </a>
              </li>
            ))}
          </ul>
        )}
        {pie}
        {boton && (
          <span className="flex h-12 w-full items-center justify-center rounded-full bg-black text-base font-medium text-white transition-colors duration-200 group-hover/tarjeta:bg-[#1f2937]">
            {boton}
          </span>
        )}
      </div>
    </Caja>
  );
}

export default TarjetaFoto;
