/**
 * Los logos de clientes, en un solo lugar.
 *
 * Es el carrusel de la portada (los 12 del WordPress más los que se sumaron
 * después) y de aquí salen TODAS las cintas de logos del sitio: la portada,
 * las landings de Ads (src/layouts/Landing.astro) y las guías (el formulario
 * y el recuadro «Cotizar» del cuerpo, src/layouts/Articulo.astro). Todas se
 * dibujan con el mismo componente, LogoMarquee, así que se ven y se mueven
 * igual. Para sumar o quitar un cliente se toca sólo esta lista (y su archivo
 * en public/img/clientes/).
 *
 * `ratio` es ancho/alto del archivo: LogoMarquee lo usa para equilibrar el
 * tamaño óptico de cada logo.
 *
 * Fuera quedó «Logo 25M» (public/img/articulos/logo-25m.webp), que venía en
 * las cintas de las guías del WordPress y no está en la portada.
 */
import type { Logo } from '../components/ui/logo-marquee';

export const CLIENTES = [
  { archivo: 'db-santasalo', alt: 'DB Santasalo', ratio: 3.06 },
  { archivo: 'grupo-mbo', alt: 'Grupo MBO', ratio: 1.34 },
  { archivo: 'nuevo-pudahuel', alt: 'Nuevo Pudahuel', ratio: 4.27 },
  { archivo: 'gespania', alt: 'Gespania', ratio: 2.01 },
  { archivo: 'natures-farm', alt: "Nature's Farm", ratio: 1.32 },
  { archivo: 'blt-mini-bodegas', alt: 'BLT Mini Bodegas', ratio: 2.35 },
  { archivo: 'sungrow', alt: 'Sungrow', ratio: 4.21 },
  { archivo: 'fuchs', alt: 'Fuchs Lubricants', ratio: 2.25 },
  { archivo: 'novametal', alt: 'Novametal', ratio: 1.36 },
  { archivo: 'lira', alt: 'Lira', ratio: 1.1 },
  { archivo: 'animal-services', alt: 'Animal Services', ratio: 1.33 },
  { archivo: 'delart-chocolat', alt: 'DelArt Chocolat', ratio: 2.01 },
  { archivo: 'myv', alt: 'Martínez y Valdivieso', ratio: 3.0 },
  { archivo: 'bodegas-san-francisco', alt: 'Bodegas San Francisco', ratio: 2.39 },
  { archivo: 'newrest', alt: 'Newrest Catering Chile', ratio: 4.16 },
  { archivo: 'flexpark', alt: 'Flexpark', ratio: 4.42 },
  { archivo: 'galilea-centro', alt: 'Inmobiliaria Galilea Centro', ratio: 1.06 },
  { archivo: 'dcp-logistica', alt: 'DCP Logística · Distribuidora y Comercial Pacífico', ratio: 2.56 },
] as const;

/** Los logos listos para LogoMarquee, con la base del sitio en la ruta. */
export const logosClientes = (base: string): Logo[] =>
  CLIENTES.map((c) => ({ src: `${base}/img/clientes/${c.archivo}.webp`, alt: c.alt, ratio: c.ratio }));
