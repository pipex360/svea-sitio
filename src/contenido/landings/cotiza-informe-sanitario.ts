/**
 * /cotiza-informe-sanitario/ · landing de Google Ads.
 *
 * Texto, formulario y asunto extraídos del bloque HTML del original
 * (originales-wp/landings-ads/cotiza-informe-sanitario.html). No se retoca a mano sin
 * revisar el original: el cruce palabra por palabra lo compara.
 *
 * Única diferencia de texto con el original: los plazos de SVEA, cambiados
 * el 24-sep por decisión de Carlos (3-5 días hábiles en todos los servicios,
 * 5-10 en Plan de Emergencia empresa y condominios). Los plazos de la
 * autoridad (SEREMI, Bomberos) quedan como estaban.
 */
import type { Landing } from './tipos';

const landing: Landing = {
  "ruta": "/cotiza-informe-sanitario/",
  "urgencia": "<strong>¿Necesitas tu informe sanitario / resolución sanitaria?</strong> — Sin autorización sanitaria de la SEREMI no puedes operar legalmente. Regulariza hoy.",
  "badge": "Cotización en menos de 24 horas",
  "h1": "Informe Sanitario Favorable ante <em>SEREMI de Salud</em>",
  "h1Alterno": "También conocido como Resolución Sanitaria · Autorización Sanitaria",
  "bajada": "Gestionamos tu <strong>informe sanitario favorable</strong>, <strong>resolución sanitaria</strong> y la <strong>autorización sanitaria</strong> completa ante la SEREMI de Salud: evaluación, expediente técnico y tramitación. Tú no tienes que hacer nada.",
  "pills": [
    "Informe / Resolución Sanitaria SEREMI",
    "Correcciones sin costo hasta la resolución",
    "Entrega en 3-5 días hábiles"
  ],
  "cifras": [
    {
      "valor": "250+",
      "texto": "Proyectos realizados"
    },
    {
      "valor": "15-45",
      "texto": "Días SEREMI (referencial)"
    },
    {
      "valor": "24h",
      "texto": "Cotización"
    }
  ],
  "formulario": {
    "titulo": "Cotiza tu Informe / Resolución Sanitaria",
    "bajada": "Sin compromiso · Respuesta en <strong>&lt; 24 horas</strong>",
    "id": "form-landing-is",
    "ocultos": [
      {
        "name": "access_key",
        "value": "076a0f9a-9911-48f6-880e-dd9d44c3063b"
      },
      {
        "name": "subject",
        "value": "[LANDING ADS] Cotización Informe Sanitario - SVEA",
        "id": "dynamic-subject-lis"
      },
      {
        "name": "from_name",
        "value": "SVEA Landing Ads"
      },
      {
        "name": "redirect",
        "value": "https://sveaconsultores.cl/gracias/"
      },
      {
        "name": "Servicio",
        "value": "Informe Sanitario / Resolución Sanitaria / Autorización Sanitaria"
      },
      {
        "name": "Fuente",
        "value": "Google Ads Landing"
      },
      {
        "name": "gclid",
        "value": "",
        "id": "field-gclid"
      },
      {
        "name": "utm_source",
        "value": "",
        "id": "field-utm_source"
      },
      {
        "name": "utm_medium",
        "value": "",
        "id": "field-utm_medium"
      },
      {
        "name": "utm_campaign",
        "value": "",
        "id": "field-utm_campaign"
      },
      {
        "name": "utm_content",
        "value": "",
        "id": "field-utm_content"
      },
      {
        "name": "utm_term",
        "value": "",
        "id": "field-utm_term"
      }
    ],
    "campos": [
      {
        "control": "input",
        "label": "Nombre completo *",
        "name": "Nombre",
        "type": "text",
        "placeholder": "Ej: María González",
        "required": true
      },
      {
        "control": "input",
        "label": "Teléfono *",
        "name": "Teléfono",
        "type": "tel",
        "placeholder": "+569 1234 5678",
        "required": true,
        "mitad": true
      },
      {
        "control": "input",
        "label": "Email *",
        "name": "Email",
        "type": "email",
        "placeholder": "correo@empresa.cl",
        "required": true,
        "mitad": true
      },
      {
        "control": "input",
        "label": "Empresa *",
        "name": "Empresa",
        "type": "text",
        "placeholder": "Nombre de tu empresa",
        "required": true
      },
      {
        "control": "select",
        "label": "Tipo de establecimiento",
        "name": "Tipo de Establecimiento",
        "opciones": [
          {
            "value": "",
            "texto": "Selecciona...",
            "placeholder": true
          },
          {
            "value": "Fábrica / Industria",
            "texto": "Fábrica / Industria"
          },
          {
            "value": "Bodega / Centro logístico",
            "texto": "Bodega / Centro logístico"
          },
          {
            "value": "Taller mecánico / industrial",
            "texto": "Taller mecánico / industrial"
          },
          {
            "value": "Planta de alimentos",
            "texto": "Planta de alimentos"
          },
          {
            "value": "Local comercial",
            "texto": "Local comercial"
          },
          {
            "value": "Restaurante / Servicio de alimentación",
            "texto": "Restaurante / Servicio de alimentación"
          },
          {
            "value": "Centro médico / Clínica",
            "texto": "Centro médico / Clínica"
          },
          {
            "value": "Otro",
            "texto": "Otro"
          }
        ]
      },
      {
        "control": "textarea",
        "label": "Mensaje (opcional)",
        "name": "Mensaje",
        "placeholder": "¿Necesitas informe sanitario favorable, resolución sanitaria o autorización sanitaria para tu patente?"
      }
    ],
    "boton": "SOLICITAR COTIZACIÓN GRATUITA →",
    "confianza": "Datos protegidos · Sin compromiso",
    "garantia": {
      "titulo": "Te acompañamos hasta la resolución",
      "texto": "Si la SEREMI pide correcciones o antecedentes, los preparamos sin costo adicional"
    }
  },
  "riesgos": {
    "copete": "Riesgos reales",
    "titulo": "Sin informe sanitario favorable <em>no puedes operar</em>",
    "bajada": "La <strong>resolución sanitaria</strong> (también llamada autorización sanitaria) de la SEREMI es obligatoria para iniciar actividades en tu establecimiento.",
    "items": [
      {
        "titulo": "Sin patente municipal",
        "texto": "El informe sanitario favorable es requisito para obtener tu patente comercial o industrial. Sin resolución sanitaria, la municipalidad no aprueba tu solicitud."
      },
      {
        "titulo": "Multas y clausura",
        "texto": "Operar sin autorización sanitaria expone a multas de la SEREMI de Salud, sumarios sanitarios y cierre temporal o definitivo del establecimiento."
      },
      {
        "titulo": "Rechazo por antecedentes incompletos",
        "texto": "La SEREMI rechaza solicitudes con documentación insuficiente o no conforme al Código Sanitario. Pierdes tiempo, dinero y aranceles."
      },
      {
        "titulo": "Problemas de uso de suelo",
        "texto": "Si tu actividad no es compatible con la zonificación del Plan Regulador Comunal, la resolución sanitaria será rechazada sin asesoría previa."
      }
    ],
    "llamado": "No arriesgues tu operación. Obtén tu informe sanitario favorable hoy.",
    "boton": "Cotizar mi informe sanitario ahora"
  },
  "incluye": {
    "copete": "Servicio integral",
    "titulo": "¿Qué incluye la <em>evaluación sanitaria</em>?",
    "bajada": "Desde la evaluación en terreno hasta el informe sanitario favorable (resolución sanitaria) aprobado por SEREMI. Sin complicaciones.",
    "items": [
      {
        "icono": "<path d=\"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/>",
        "titulo": "Infraestructura y Construcción",
        "texto": "Evaluación de estructura soportante, materialidad de pisos y muros, cubierta, zonas de carga y estacionamientos."
      },
      {
        "icono": "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z\"/>",
        "titulo": "Procesos y Actividades",
        "texto": "Análisis de actividades, materias primas, productos almacenados, maquinaria y capacidad máxima de almacenamiento."
      },
      {
        "icono": "<path d=\"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z\"/><path d=\"M2 12h20\"/><path d=\"M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z\"/>",
        "titulo": "Servicios Básicos",
        "texto": "Verificación de agua potable, sistema de evacuación de aguas servidas y antecedentes de respaldo."
      },
      {
        "icono": "<polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/>",
        "titulo": "Compatibilidad Uso de Suelo",
        "texto": "Evaluación de la zonificación vigente y uso de suelo permitido según el Plan Regulador Comunal."
      },
      {
        "icono": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>",
        "titulo": "Seguridad y Control de Riesgos",
        "texto": "Identificación de riesgos, medidas de control, protección contra incendios y condiciones de almacenamiento."
      },
      {
        "icono": "<path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/>",
        "titulo": "Tramitación SEREMI",
        "texto": "Presentación del expediente, pago de aranceles y gestión directa ante la Autoridad Sanitaria hasta la aprobación."
      }
    ]
  },
  "proceso": {
    "copete": "5 pasos",
    "titulo": "Tu informe sanitario favorable, <em>sin complicaciones</em>",
    "pasos": [
      {
        "titulo": "Cotización",
        "texto": "En menos de 24h"
      },
      {
        "titulo": "Evaluación",
        "texto": "Visita técnica en terreno"
      },
      {
        "titulo": "Expediente",
        "texto": "Informe sanitario + planos"
      },
      {
        "titulo": "Tramitación",
        "texto": "Gestión ante SEREMI"
      },
      {
        "titulo": "Aprobación",
        "texto": "Resolución sanitaria favorable"
      }
    ]
  },
  "normativa": {
    "copete": "Marco legal",
    "titulo": "Informe sanitario con <em>cumplimiento normativo total</em>",
    "bajada": "Tu expediente cumplirá con toda la normativa que exige la SEREMI para la autorización sanitaria.",
    "items": [
      {
        "sigla": "Cód. Sanitario",
        "titulo": "Código Sanitario",
        "texto": "DFL N°725: Marco legal principal que regula las condiciones sanitarias de establecimientos y actividades en Chile."
      },
      {
        "sigla": "DS 594",
        "titulo": "Condiciones Sanitarias",
        "texto": "Reglamento sobre condiciones sanitarias y ambientales básicas en los lugares de trabajo. Base de la evaluación sanitaria."
      },
      {
        "sigla": "PRC",
        "titulo": "Plan Regulador Comunal",
        "texto": "Determina la compatibilidad de uso de suelo y zonificación para tu actividad económica en el territorio comunal."
      }
    ]
  },
  "faq": {
    "copete": "Preguntas frecuentes",
    "titulo": "Sobre el informe sanitario, resolución y <em>autorización sanitaria</em>",
    "items": [
      {
        "p": "¿Informe sanitario, resolución sanitaria o autorización sanitaria?",
        "r": "Los tres nombres se refieren al <strong>mismo trámite</strong> ante la SEREMI de Salud. \"<strong>Informe Sanitario Favorable</strong>\" es el nombre técnico del documento, \"<strong>Resolución Sanitaria</strong>\" es como se lo conoce popularmente, y \"<strong>Autorización Sanitaria</strong>\" es el término usado en el proceso administrativo. En SVEA tramitamos los tres — es un único servicio."
      },
      {
        "p": "¿Qué es el informe sanitario favorable?",
        "r": "El <strong>informe sanitario favorable</strong> es la resolución que emite la SEREMI de Salud que certifica que tu establecimiento cumple con las condiciones sanitarias, ambientales y de seguridad exigidas por la normativa vigente. Es requisito obligatorio para obtener la patente municipal y operar legalmente."
      },
      {
        "p": "¿Qué diferencia hay entre informe sanitario y autorización sanitaria?",
        "r": "El <strong>informe sanitario</strong> es el resultado de la evaluación técnica del establecimiento. Cuando es favorable, la SEREMI emite la <strong>autorización sanitaria</strong> (resolución sanitaria), que es el documento oficial que te habilita para operar. Nosotros gestionamos ambos procesos."
      },
      {
        "p": "¿Cuánto demora obtener el informe sanitario favorable?",
        "r": "El expediente técnico lo preparamos en <strong>3 a 5 días hábiles</strong>. La tramitación ante la SEREMI puede tomar 15 a 45 días adicionales (plazo referencial según nuestra experiencia), dependiendo de la autoridad y complejidad del establecimiento. Nosotros gestionamos todo el proceso."
      },
      {
        "p": "¿Qué documentación necesito entregar?",
        "r": "Necesitarás: plano general o croquis de la instalación, descripción de características constructivas, descripción de procesos y actividades, antecedentes de servicios básicos, y certificado de uso de suelo municipal. Nosotros te guiamos en cada paso y preparamos la documentación técnica."
      },
      {
        "p": "¿Cuánto cuesta el informe sanitario?",
        "r": "Depende del tamaño, tipo de actividad y complejidad del establecimiento. Además del servicio profesional, existe un <strong>arancel administrativo de la SEREMI</strong> (aprox. $124.300 + 0,5% del capital declarado). Solicita tu cotización sin compromiso y la recibirás en menos de 24 horas."
      },
      {
        "p": "¿Puedo operar sin autorización sanitaria?",
        "r": "No. La autorización sanitaria es un requisito legal para operar. Sin el informe sanitario favorable, no obtendrás la patente municipal y te expones a multas, sumarios sanitarios y clausura del establecimiento."
      }
    ]
  },
  "cierre": {
    "titulo": "Obtén tu informe sanitario / resolución sanitaria <em>hoy</em>",
    "texto": "Evaluación sanitaria profesional con respaldo normativo. Cotización en menos de 24 horas, expediente en 3-5 días hábiles y gestión ante la SEREMI hasta la resolución.",
    "boton": "Cotiza tu informe sanitario ahora",
    "whatsapp": "https://api.whatsapp.com/send?phone=56929947924&text=Hola%2C%20necesito%20cotizar%20un%20informe%20sanitario%20%2F%20resoluci%C3%B3n%20sanitaria%20%2F%20autorizaci%C3%B3n%20sanitaria%20para%20mi%20empresa.%20Llego%20desde%20Google.",
    "whatsappTexto": "WhatsApp directo"
  },
  "pie": {
    "columnas": [
      {
        "titulo": "Empresa",
        "enlaces": [
          {
            "href": "https://sveaconsultores.cl/#Nosotros",
            "texto": "Nosotros"
          },
          {
            "href": "https://sveaconsultores.cl/#Formulario",
            "texto": "Contacto"
          },
          {
            "href": "https://sveaconsultores.cl/#Formulario",
            "texto": "Trabaje con Nosotros"
          }
        ]
      },
      {
        "titulo": "Servicios",
        "enlaces": [
          {
            "href": "https://sveaconsultores.cl/calificacion-tecnica-industrial/",
            "texto": "Calificación Técnica Industrial"
          },
          {
            "href": "https://sveaconsultores.cl/estudio-de-carga-de-combustible/",
            "texto": "Estudio de Carga de Combustible"
          },
          {
            "href": "https://sveaconsultores.cl/planes-de-emergencia-y-evacuacion/",
            "texto": "Planes de Emergencia y Evacuación Industrial"
          },
          {
            "href": "https://sveaconsultores.cl/informe-sanitario/",
            "texto": "Informe Sanitario / Resolución Sanitaria"
          },
          {
            "href": "https://sveaconsultores.cl/manejo-de-residuos-peligrosos/",
            "texto": "Manejo de Sustancias y Residuos Peligrosos"
          },
          {
            "href": "https://sveaconsultores.cl/autorizacion-de-transporte-de-residuos/",
            "texto": "Autorización de Transporte de Residuos"
          }
        ]
      }
    ],
    "presentacion": "Expertos en informes sanitarios, resolución sanitaria y autorización sanitaria ante SEREMI. Cumplimiento normativo y seguridad operativa.",
    "contacto": true
  },
  "foto": 'flota-camiones-autorizacion-transporte-residuos',
  "medicion": {
    "servicio": "Informe Sanitario Favorable",
    "prefijoAsunto": "[ADS] Cotización Informe Sanitario - ",
    "subjectId": "dynamic-subject-lis",
    "eventoGA4": true,
    "eventoWhatsApp": true,
    "origen": "<script> del original"
  }
};

export default landing;
