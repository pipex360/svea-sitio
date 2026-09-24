/**
 * La tarjeta de contacto: a la izquierda el titular, el texto y los datos de
 * contacto; a la derecha, lo que se le pase como hijo (el formulario).
 *
 * Adaptada del contact-card de 21st.dev con tres cambios:
 *
 * 1. El titular es un <h2>, no un <h1>. La portada ya tiene su h1 en el hero
 *    y una página con dos h1 es una página con ninguno.
 * 2. Cada dato de contacto puede ser un enlace (`href`): el correo abre el
 *    cliente de correo y el WhatsApp abre la conversación. En el original
 *    eran texto plano.
 * 3. Las cruces de las esquinas van `aria-hidden`: son decoración.
 */
import { PlusIcon } from 'lucide-react';
import type React from 'react';

import { cn } from '@/lib/utils';

type ContactInfoProps = React.ComponentProps<'div'> & {
  /** de lucide o propio, como el logotipo de WhatsApp */
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  /** para el WhatsApp: abre en pestaña nueva con `rel="noopener"` */
  externo?: boolean;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  eyebrow?: string;
  title?: string;
  titleId?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  eyebrow,
  title = 'Contáctanos',
  titleId,
  description,
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        'relative grid w-full border border-border bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)] md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      {...props}
    >
      <PlusIcon aria-hidden="true" className="absolute -left-3 -top-3 h-6 w-6 text-black/40" />
      <PlusIcon aria-hidden="true" className="absolute -right-3 -top-3 h-6 w-6 text-black/40" />
      <PlusIcon aria-hidden="true" className="absolute -bottom-3 -left-3 h-6 w-6 text-black/40" />
      <PlusIcon aria-hidden="true" className="absolute -bottom-3 -right-3 h-6 w-6 text-black/40" />

      <div className="flex flex-col lg:col-span-2">
        {/* el titular arriba y los datos de contacto abajo: la altura la da el
            formulario de al lado, y así la columna no queda con un hueco */}
        <div className="relative flex h-full flex-col gap-4 px-5 py-8 md:p-10">
          {eyebrow && (
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              {eyebrow}
            </p>
          )}
          <h2
            id={titleId}
            className="text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
          >
            {title}
          </h2>
          {description && (
            <p className="max-w-xl text-base leading-relaxed text-black/75 md:text-lg">
              {description}
            </p>
          )}
          <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactInfo?.map((info) => (
              <ContactInfo key={info.label} {...info} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          'flex h-full w-full items-center border-t border-border bg-hoja p-5 md:col-span-1 md:border-l md:border-t-0 md:p-6',
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({ icon: Icon, label, value, href, externo, className, ...props }: ContactInfoProps) {
  const cuerpo = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-hoja text-black">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-black">{label}</span>
        <span className="block text-xs leading-snug text-black/60">{value}</span>
      </span>
    </>
  );
  return (
    <div className={cn('py-2', className)} {...props}>
      {href ? (
        <a
          href={href}
          target={externo ? '_blank' : undefined}
          rel={externo ? 'noopener' : undefined}
          className="group/dato flex items-center gap-3 no-underline"
        >
          {cuerpo}
        </a>
      ) : (
        <span className="flex items-center gap-3">{cuerpo}</span>
      )}
    </div>
  );
}

export default ContactCard;
