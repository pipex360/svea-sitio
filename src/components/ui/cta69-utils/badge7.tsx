/**
 * La etiqueta que va sobre el titular del CTA.
 *
 * El componente original la importaba de `cta69-utils/badge7`, que no venía
 * en el paquete. Ésta es la misma pieza escrita con los tokens de SVEA: una
 * píldora de línea fina, en negro, como el copete de «Nuestros Servicios».
 */
import { cn } from '@/lib/utils';

export function Badge7({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5',
        'text-xs font-semibold uppercase tracking-[0.12em] text-black',
        className,
      )}
    >
      {label}
    </span>
  );
}

export default Badge7;
