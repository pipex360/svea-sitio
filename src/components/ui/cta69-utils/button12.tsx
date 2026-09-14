/**
 * El botón del CTA.
 *
 * El original tampoco venía en el paquete, y se usaba con `asChild` y un
 * `<Link>` de Next. Aquí es un enlace y punto: no hay router que interceptar
 * en un sitio estático, y `asChild` necesitaría Radix Slot, que el proyecto
 * no trae.
 *
 * La flecha se separa al pasar el cursor, como en el CTA de 21st.dev.
 */
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export function Button12({
  label,
  href,
  className,
}: {
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex h-14 items-center gap-2.5 rounded-full bg-black px-9',
        'text-base font-semibold text-white no-underline',
        'transition-[gap,background-color,box-shadow] duration-300 ease-out',
        'hover:gap-5 hover:bg-black/85 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)]',
        className,
      )}
    >
      {label}
      <ArrowRight className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

export default Button12;
