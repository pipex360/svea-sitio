/**
 * El pie de página de la portada.
 *
 * Es el Footer2 de shadcnblocks.com con los contenidos del pie que hoy sirve
 * el WordPress: el mismo texto de presentación, la dirección, el teléfono y el
 * correo, y los mismos enlaces internos (los seis servicios, con sus URL
 * exactas). Cuatro cambios sobre el original:
 *
 * 1. El logo de SVEA va solo, sin el título de texto al lado: el logo ya
 *    lleva el nombre y quedaría «SVEA SVEA».
 * 2. Las anclas «Nosotros» y «Contacto» apuntan a las secciones nuevas
 *    (#nosotros y #contacto); en el WordPress iban a #Nosotros y #Formulario,
 *    que ya no existen en esta portada.
 * 3. Abajo queda sólo «Política de privacidad», que es una página real del
 *    sitio. «Term of use» y «Cookie Policy» apuntaban a «#» —enlaces muertos
 *    y en inglés— y no hay página detrás: se retiran.
 * 4. `container` no existe en Tailwind 4 sin configurarlo; se usa el ancho
 *    de las demás secciones (max-w-7xl).
 *
 * No lleva estado: Astro lo dibuja en el servidor y no viaja JavaScript.
 */

import { cn } from '@/lib/utils';

interface MenuItem {
  title: string;
  /** cuántas columnas ocupa en pantalla ancha */
  span?: 1 | 2;
  links: { text: string; url: string }[];
}

interface Footer2Props {
  base?: string;
  logo?: { url: string; src: string; alt: string };
  tagline?: string;
  contacto?: { direccion: string; telefono: string; correo: string };
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: { text: string; url: string }[];
  className?: string;
}

const CORREO = 'contacto@sveaconsultores.cl';

export function Footer2({
  base = '',
  logo = { url: `${base}/`, src: `${base}/img/logo-svea.webp`, alt: 'SVEA Consultores' },
  tagline = 'Expertos en gestión y tramitación de permisos para industrias, asegurando cumplimiento normativo y seguridad operativa.',
  contacto = {
    direccion: 'Apoquindo #6410, Oficina 605, Las Condes, Santiago de Chile.',
    telefono: '+56929947924',
    correo: CORREO,
  },
  menuItems = [
    {
      title: 'Empresa',
      links: [
        { text: 'Nosotros', url: `${base}/#nosotros` },
        { text: 'Contacto', url: `${base}/#contacto` },
        { text: 'Trabaje con Nosotros', url: `mailto:${CORREO}?subject=Trabajar%20en%20SVEA` },
      ],
    },
    {
      title: 'Servicios',
      span: 2,
      links: [
        { text: 'Calificación Técnica Industrial', url: `${base}/calificacion-tecnica-industrial/` },
        { text: 'Estudio de Carga de Combustible', url: `${base}/estudio-de-carga-de-combustible/` },
        { text: 'Planes de Emergencia y Evacuación Industrial', url: `${base}/planes-de-emergencia-y-evacuacion/` },
        { text: 'Manejo de Sustancias y Residuos Peligrosos', url: `${base}/manejo-de-residuos-peligrosos/` },
        { text: 'Autorización de Transporte de Residuos Peligrosos y no Peligrosos', url: `${base}/autorizacion-de-transporte-de-residuos/` },
        { text: 'Planes de Emergencia y Evacuación para Condominios', url: `${base}/planes-de-emergencia-y-evacuacion-condominios/` },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} SVEA Consultores. Todos los derechos reservados.`,
  bottomLinks = [{ text: 'Política de privacidad', url: `${base}/politica-de-privacidad/` }],
  className,
}: Footer2Props) {
  return (
    <footer className={cn('border-t border-border bg-white py-16 md:py-24', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2 mb-8 lg:mb-0">
            <a href={logo.url} className="inline-block">
              <img src={logo.src} alt={logo.alt} width={404} height={137} className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-black/75">{tagline}</p>
            <address className="mt-6 space-y-1.5 text-sm not-italic text-black/60">
              <p>{contacto.direccion}</p>
              <p>
                <a href={`tel:${contacto.telefono}`} className="no-underline transition-colors hover:text-svea">
                  {contacto.telefono}
                </a>
              </p>
              <p>
                <a href={`mailto:${contacto.correo}`} className="no-underline transition-colors hover:text-svea">
                  {contacto.correo}
                </a>
              </p>
            </address>
          </div>

          {menuItems.map((section) => (
            <div key={section.title} className={section.span === 2 ? 'col-span-2' : undefined}>
              <h3 className="mb-4 text-base font-bold text-black">{section.title}</h3>
              <ul className="space-y-3 text-sm text-black/60">
                {section.links.map((link) => (
                  <li key={link.text} className="font-medium">
                    <a href={link.url} className="no-underline transition-colors hover:text-svea">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border pt-8 text-sm font-medium text-black/60 md:flex-row md:items-center">
          <p>{copyright}</p>
          <ul className="flex gap-4">
            {bottomLinks.map((link) => (
              <li key={link.text} className="underline underline-offset-4 transition-colors hover:text-svea">
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer2;
