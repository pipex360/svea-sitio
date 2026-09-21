/**
 * El pie de página de la portada.
 *
 * Es el Footer2 de shadcnblocks.com con los contenidos del pie que hoy sirve
 * el WordPress: el mismo texto de presentación, la dirección, el teléfono y el
 * correo, y los mismos enlaces internos (los seis servicios, con sus URL
 * exactas), más la columna «Recursos y guías» con los enlaces que el menú
 * del WordPress vivo lleva bajo ese nombre. Cinco cambios sobre el original:
 *
 * 1. El logo de SVEA va solo, sin el título de texto al lado: el logo ya
 *    lleva el nombre y quedaría «SVEA SVEA».
 * 2. Las anclas «Nosotros» y «Contacto» apuntan a las secciones nuevas
 *    (#nosotros y #contacto); en el WordPress iban a #Nosotros y #Formulario,
 *    que ya no existen en esta portada.
 * 3. Abajo van «Política de privacidad», que es una página real del sitio, y
 *    el LinkedIn de SVEA, que en el WordPress vive en la barra superior de
 *    la cabecera y no estaba en ninguna parte de la portada nueva.
 *    «Term of use» y «Cookie Policy» apuntaban a «#» —enlaces muertos y en
 *    inglés— y no hay página detrás: se retiran.
 * 4. `container` no existe en Tailwind 4 sin configurarlo; se usa el ancho
 *    de las demás secciones (max-w-7xl).
 * 5. Va sobre el verde en movimiento de las tarjetas de «Cumplimiento» y del
 *    CTA (Velaris), con el texto en blanco. El logo es la variante blanca
 *    (mejoras/img/logo-svea-blanco.webp): el texto negro del logo original
 *    desaparecería sobre el fondo oscuro; la hoja verde se conserva.
 *
 * 6. En el teléfono las tres columnas se pliegan. Eran 19 enlaces apilados:
 *    1.712 px de pie, dos pantallas completas. Cada grupo es un <details>
 *    que el HTML entrega **abierto** —así lo ven Google y quien no tenga
 *    JavaScript, y en escritorio no cambia nada— y que se cierra al hidratar
 *    sólo si la pantalla es de teléfono. Ningún enlace se quita: son los
 *    enlaces internos que el menú desplegable de la cabecera no deja en el
 *    HTML, y sacarlos sería tocar el SEO.
 *
 * Se hidrata (`client:idle`) por el Velaris y por ese plegado; sin WebGL
 * queda el verde plano y sin JavaScript el pie queda desplegado.
 */

import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

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
const LINKEDIN = 'https://www.linkedin.com/company/svea-consultores/about/';

/** El logotipo de LinkedIn (trazado de Simple Icons), en el color del texto. */
const IconoLinkedIn = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

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
        { text: 'Informe Sanitario', url: `${base}/informe-sanitario/` },
        { text: 'Permisos ambientales y SEIA', url: `${base}/permisos-ambientales-y-pertinencias-del-seia/` },
      ],
    },
    {
      // Los mismos enlaces que lleva el menú del WordPress vivo bajo «Recursos y
      // Guías». El menú desplegable de la cabecera (Radix) sólo dibuja su
      // contenido al abrirse, así que estos enlaces no están en el HTML: aquí
      // sí, para que Google los siga desde la portada como hasta ahora.
      title: 'Recursos y guías',
      span: 2,
      links: [
        { text: 'Guías de cumplimiento', url: `${base}/blog/` },
        { text: '¿Qué es el Informe Sanitario?', url: `${base}/que-es-informe-sanitario/` },
        { text: 'Calificación Técnica Industrial en Chile', url: `${base}/calificacion-tecnica-industrial-chile/` },
        { text: 'Estudio de Carga de Combustible en Chile', url: `${base}/estudio-de-carga-combustible-chile/` },
        { text: 'Manejo de Residuos Peligrosos en Chile', url: `${base}/manejo-de-residuos-peligrosos-chile/` },
        { text: 'Plan de Emergencia para Empresas', url: `${base}/plan-de-emergencia-empresa-chile/` },
        { text: 'Plan de Emergencia para Condominios', url: `${base}/plan-de-emergencia-condominio-chile/` },
        { text: 'Autorización de Transporte de Residuos en Chile', url: `${base}/autorizacion-transporte-residuos-chile/` },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} SVEA Consultores. Todos los derechos reservados.`,
  bottomLinks = [{ text: 'Política de privacidad', url: `${base}/politica-de-privacidad/` }],
  className,
}: Footer2Props) {
  const grupos = useRef<(HTMLDetailsElement | null)[]>([]);

  // El `open` va en el HTML y aquí sólo se quita en pantallas de teléfono:
  // pre-hidratación el pie está desplegado, que es lo correcto para quien no
  // ejecuta JavaScript. Después de esto mandan los toques del visitante.
  useEffect(() => {
    const consulta = window.matchMedia('(max-width: 767px)');
    const aplicar = () => grupos.current.forEach((d) => d && (d.open = !consulta.matches));
    aplicar();
    consulta.addEventListener('change', aplicar);
    return () => consulta.removeEventListener('change', aplicar);
  }, []);

  return (
    <footer className={cn('relative overflow-hidden bg-[#081c15] py-14 text-white md:py-16', className)}>
      <Velaris className="absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-0 lg:grid-cols-7 lg:gap-8">
          <div className="col-span-2 mb-6 lg:mb-0">
            <a href={logo.url} className="inline-block">
              <img src={logo.src} alt={logo.alt} width={404} height={137} className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/80">{tagline}</p>
            <address className="mt-5 space-y-1 text-sm not-italic text-white/65">
              <p>{contacto.direccion}</p>
              <p>
                {/* el número se escribe agrupado, como en la cabecera y en
                    «Contáctanos»; el href lleva el crudo */}
                <a href={`tel:${contacto.telefono}`} className="inline-block py-1.5 no-underline transition-colors hover:text-white">
                  +56 9 2994 7924
                </a>
              </p>
              <p>
                <a href={`mailto:${contacto.correo}`} className="inline-block py-1.5 no-underline transition-colors hover:text-white">
                  {contacto.correo}
                </a>
              </p>
            </address>
          </div>

          {menuItems.map((section, i) => (
            <details
              key={section.title}
              open
              ref={(el) => {
                grupos.current[i] = el;
              }}
              className={cn(
                'pie-grupo group col-span-2 border-t border-white/10 md:border-0',
                section.span === 2 ? 'lg:col-span-2' : 'lg:col-span-1',
              )}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 py-3 md:py-0">
                <h3 className="text-base font-bold text-white">{section.title}</h3>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-white/50 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none md:hidden"
                />
              </summary>
              <ul className="space-y-0.5 pb-2 text-sm text-white/65 md:mt-4 md:pb-0">
                {section.links.map((link) => (
                  <li key={link.text} className="font-medium">
                    {/* py-2.5 en el teléfono: 37 px de alto, para el dedo */}
                    <a
                      href={link.url}
                      className="inline-block py-2.5 no-underline transition-colors hover:text-white md:py-1.5"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        {/* md:pr-44 deja sitio al botón flotante de WhatsApp, que va abajo a la derecha */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-sm font-medium text-white/65 md:flex-row md:items-center md:pr-44">
          <p>{copyright}</p>
          <div className="flex items-center gap-5">
            <ul className="flex gap-4">
              {bottomLinks.map((link) => (
                <li key={link.text} className="underline underline-offset-4 transition-colors hover:text-white">
                  <a href={link.url} className="inline-block py-2.5">{link.text}</a>
                </li>
              ))}
            </ul>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener"
              aria-label="SVEA Consultores en LinkedIn"
              className="grid size-11 shrink-0 place-items-center rounded-full text-white/65 no-underline transition-colors hover:text-white"
            >
              <IconoLinkedIn className="size-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer2;
