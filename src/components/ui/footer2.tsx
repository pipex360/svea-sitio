/**
 * El pie de página de la portada.
 *
 * Es el Footer2 de shadcnblocks.com con los contenidos del pie que hoy sirve
 * el WordPress: el mismo texto de presentación, la dirección, el teléfono y el
 * correo, y los mismos enlaces internos (los seis servicios, con sus URL
 * exactas). Cinco cambios sobre el original:
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
 * 5. Va sobre el verde en movimiento de las tarjetas de «Cumplimiento» y del
 *    CTA (Velaris), con el texto en blanco. El logo es la variante blanca
 *    (mejoras/img/logo-svea-blanco.webp): el texto negro del logo original
 *    desaparecería sobre el fondo oscuro; la hoja verde se conserva.
 *
 * Se hidrata (`client:idle`) por el Velaris; sin WebGL queda el verde plano.
 */

import { Velaris } from '@/components/ui/velaris';
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
  logo = { url: `${base}/`, src: `${base}/img/logo-svea-blanco.webp`, alt: 'SVEA Consultores' },
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
    <footer className={cn('relative overflow-hidden bg-[#081c15] py-16 text-white md:py-24', className)}>
      <Velaris className="absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2 mb-8 lg:mb-0">
            <a href={logo.url} className="inline-block">
              <img src={logo.src} alt={logo.alt} width={404} height={137} className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/80">{tagline}</p>
            <address className="mt-6 space-y-1.5 text-sm not-italic text-white/65">
              <p>{contacto.direccion}</p>
              <p>
                <a href={`tel:${contacto.telefono}`} className="no-underline transition-colors hover:text-white">
                  {contacto.telefono}
                </a>
              </p>
              <p>
                <a href={`mailto:${contacto.correo}`} className="no-underline transition-colors hover:text-white">
                  {contacto.correo}
                </a>
              </p>
            </address>
          </div>

          {menuItems.map((section) => (
            <div key={section.title} className={section.span === 2 ? 'col-span-2' : undefined}>
              <h3 className="mb-4 text-base font-bold text-white">{section.title}</h3>
              <ul className="space-y-3 text-sm text-white/65">
                {section.links.map((link) => (
                  <li key={link.text} className="font-medium">
                    <a href={link.url} className="no-underline transition-colors hover:text-white">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/15 pt-8 text-sm font-medium text-white/65 md:flex-row md:items-center">
          <p>{copyright}</p>
          <ul className="flex gap-4">
            {bottomLinks.map((link) => (
              <li key={link.text} className="underline underline-offset-4 transition-colors hover:text-white">
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
