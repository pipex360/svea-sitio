/**
 * La forma de una landing de Google Ads (src/layouts/Landing.astro).
 *
 * Los campos terminados en «Html» —y los que lo dicen en su comentario—
 * llevan el marcado del original (<strong>, <em>, <br>) y se pintan con
 * set:html. El resto es texto plano.
 *
 * Los cinco archivos de las landings que existían en el WordPress
 * (cotiza-*.ts) se extrajeron una sola vez, con un script, del bloque HTML
 * de cada original (originales-wp/landings-ads/<slug>.html, el segundo
 * <!DOCTYPE html>): el texto es el del original, sin retoques. La sexta
 * (transporte de residuos) no tiene original y se armó a mano.
 */

export type Opcion = { value: string; texto: string; placeholder?: boolean };

export type Campo =
  | { control: 'input'; label: string; name: string; type: string; placeholder: string; required?: boolean; mitad?: boolean }
  | { control: 'textarea'; label: string; name: string; placeholder: string; required?: boolean; mitad?: boolean }
  | { control: 'select'; label: string; name: string; opciones: Opcion[]; required?: boolean; mitad?: boolean };

export type Oculto = { name: string; value: string; id?: string };

export interface Landing {
  /** la ruta de paginas.json, con barras */
  ruta: string;
  /** la franja de urgencia de arriba (html) */
  urgencia: string;
  /** el sello sobre el titular */
  badge: string;
  /** el H1 tal cual el original (html: <br>, <em>) */
  h1: string;
  /** la línea chica dentro del H1 de algunas landings («También conocido como…») */
  h1Alterno?: string;
  /** la línea chica bajo el H1 (html) */
  subtitulo?: string;
  /** la bajada del hero (html) */
  bajada: string;
  pills: string[];
  cifras: { valor: string; texto: string }[];

  formulario: {
    titulo: string;
    /** html */
    bajada: string;
    /** LISTA ROJA: id del <form>, ocultos, campos y opciones idénticos al original */
    id: string;
    ocultos: Oculto[];
    campos: Campo[];
    boton: string;
    confianza: string;
    garantia: { titulo: string; texto: string };
  };

  /** Sección opcional «¿Qué es?» con foto (sólo la landing nueva de transporte). */
  queEs?: {
    copete: string;
    titulo: string; // html
    parrafos: string[]; // html
    foto: { archivo: string; alt: string; ancho: number; alto: number };
  };

  riesgos: {
    copete: string;
    titulo: string; // html
    bajada: string; // html
    items: { titulo: string; texto: string /* html */ }[];
    llamado: string;
    boton: string;
  };

  /** Listas de chips opcionales («¿Quién lo necesita?», «Tipos de residuos»). */
  listas?: { copete: string; titulo: string /* html */; items: string[] }[];

  incluye: {
    copete: string;
    titulo: string; // html
    bajada: string; // html
    /** icono: el interior del <svg> de 24×24 del original (trazo) */
    items: { icono: string; titulo: string; texto: string /* html */ }[];
  };

  proceso: {
    copete: string;
    titulo: string; // html
    pasos: { titulo: string; texto: string }[];
  };

  normativa: {
    copete: string;
    titulo: string; // html
    bajada: string; // html
    items: { sigla: string; titulo: string; texto: string /* html */ }[];
  };

  faq: {
    copete: string;
    titulo: string; // html
    items: { p: string; r: string /* html */ }[];
  };

  cierre: {
    titulo: string; // html
    texto: string; // html
    boton: string;
    whatsapp: string;
    whatsappTexto: string;
  };

  pie: {
    presentacion?: string;
    columnas: { titulo: string; enlaces: { href: string; texto: string }[] }[];
    contacto: boolean;
  };

  /** foto del servicio (mejoras/img/hero/<foto>-1080.webp), en el cierre */
  foto: string;

  /**
   * Medición de producción, con los valores del <script> del original.
   * Sólo se emite cuando no es la copia de trabajo.
   */
  medicion: {
    /** valor `servicio` del evento GA4 form_submit_cotizacion */
    servicio: string;
    prefijoAsunto: string;
    subjectId: string;
    /** el original manda el evento GA4 form_submit_cotizacion (todas menos condominios) */
    eventoGA4: boolean;
    /** condominios manda las conversiones con value 1.0 CLP */
    valorConversion?: number;
    /** el clic de WhatsApp manda además el evento GA4 clic_whatsapp */
    eventoWhatsApp: boolean;
    /** de dónde salen los valores: el <script> del original o paginas.json */
    origen: string;
  };
}
