/**
 * El cierre común de TODAS las páginas (el bloque verde Cta69, justo antes
 * del pie). Carlos pidió (25-sep) que «la parte final sea siempre igual»:
 * el mismo titular, la misma nota, el mismo botón y la misma cinta de fondo
 * en la portada, los servicios, las landings, las guías, el blog y las
 * páginas sueltas. Lo único que cambia de una página a otra es a dónde
 * lleva el botón (el formulario de la página, o el de la portada si la
 * página no tiene uno) y, en las landings, el texto que precarga el enlace
 * de WhatsApp (el que cuenta GTM).
 *
 * Va en tuteo, como todo el sitio.
 */
export const CIERRE = {
  badge: 'Último paso',
  titulo: '¿Listo para comenzar tu proyecto?',
  nota: 'Deja la complejidad normativa en nuestras manos. Cotización en menos de 24 horas y acompañamiento de nuestro equipo hasta la resolución.',
  boton: 'Solicitar cotización',
  whatsappTexto: 'WhatsApp directo',
  /** el mismo enlace de la barra del teléfono y del botón flotante */
  whatsapp: 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20t%C3%A9cnica',
  cinta: 'Cumplimiento',
  pie: 'Proceso simple y transparente',
  telefono: { texto: '+56 9 2994 7924', href: 'tel:+56929947924' },
} as const;
