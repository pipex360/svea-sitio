/**
 * shadcn/ui label, sin Radix.
 *
 * El original envuelve `@radix-ui/react-label` sólo para que el texto no se
 * seleccione al hacer doble clic. Un <label> a secas hace lo mismo con
 * `select-none`, y no trae un paquete nuevo para eso.
 */
import * as React from 'react';

import { cn } from '@/lib/utils';

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'select-none text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = 'Label';

export { Label };
