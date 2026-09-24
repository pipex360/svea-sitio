/**
 * /cotiza-plan-emergencia-condominio/ · landing de Google Ads.
 *
 * Texto, formulario y asunto extraídos del bloque HTML del original
 * (originales-wp/landings-ads/cotiza-plan-emergencia-condominio.html). No se retoca a mano sin
 * revisar el original: el cruce palabra por palabra lo compara.
 *
 * Única diferencia de texto con el original: los plazos de SVEA, cambiados
 * el 24-sep por decisión de Carlos (3-5 días hábiles en todos los servicios,
 * 5-10 en Plan de Emergencia empresa y condominios). Los plazos de la
 * autoridad (SEREMI, Bomberos) quedan como estaban.
 */
import type { Landing } from './tipos';

const landing: Landing = {
  "ruta": "/cotiza-plan-emergencia-condominio/",
  "urgencia": "<strong>Ley 21.442 vigente</strong> — Tu condominio necesita un plan de emergencia y evacuación. Cotízalo hoy.",
  "badge": "Cotización plan de emergencia en 24 horas",
  "h1": "Plan de Emergencia<br>Condominio y Edificio<br><em>Ley 21.442</em>",
  "subtitulo": "Plan de emergencia condominio · Plan de emergencia edificio · Ley 21.442 y OGUC",
  "bajada": "Nuestro <strong>plan de emergencia y evacuación</strong> para condominios cubre análisis de riesgos, protocolos de evacuación y roles para comité y administración. Tu <strong>plan de seguridad para condominios</strong> con respaldo profesional y aprobación normativa.",
  "pills": [
    "Plan adaptado a tu edificio",
    "Correcciones sin costo incluidas",
    "Listo en 5-10 días hábiles"
  ],
  "cifras": [
    {
      "valor": "250+",
      "texto": "Planes elaborados"
    },
    {
      "valor": "21.442",
      "texto": "Ley de copropiedad"
    },
    {
      "valor": "24h",
      "texto": "Cotización"
    }
  ],
  "formulario": {
    "titulo": "Cotiza tu Plan de Emergencia",
    "bajada": "Sin compromiso · Respuesta en <strong>&lt; 24 horas</strong>",
    "id": "form-landing-pc",
    "ocultos": [
      {
        "name": "access_key",
        "value": "076a0f9a-9911-48f6-880e-dd9d44c3063b"
      },
      {
        "name": "subject",
        "value": "[LANDING ADS] Cotización Plan Condominios - SVEA",
        "id": "dynamic-subject-lpc"
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
        "value": "Plan de Emergencia Condominios"
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
        "placeholder": "correo@ejemplo.cl",
        "required": true,
        "mitad": true
      },
      {
        "control": "input",
        "label": "Nombre del Condominio / Edificio *",
        "name": "Condominio",
        "type": "text",
        "placeholder": "Ej: Edificio Los Arrayanes",
        "required": true
      },
      {
        "control": "select",
        "label": "Tipo de condominio",
        "name": "Tipo de Condominio",
        "opciones": [
          {
            "value": "",
            "texto": "Selecciona...",
            "placeholder": true
          },
          {
            "value": "Edificio residencial",
            "texto": "Edificio residencial"
          },
          {
            "value": "Condominio horizontal (casas)",
            "texto": "Condominio horizontal (casas)"
          },
          {
            "value": "Edificio con locales comerciales",
            "texto": "Edificio con locales comerciales"
          },
          {
            "value": "Edificio con subterráneo",
            "texto": "Edificio con subterráneo"
          },
          {
            "value": "Condominio mixto",
            "texto": "Condominio mixto (residencial + comercial)"
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
        "placeholder": "¿Cuántos pisos y departamentos tiene? ¿Tiene subterráneo? ¿Necesitas el plan de emergencia por fiscalización u otro motivo?"
      }
    ],
    "boton": "COTIZAR PLAN DE EMERGENCIA GRATIS →",
    "confianza": "Datos protegidos · Sin compromiso",
    "garantia": {
      "titulo": "Plan de emergencia 100% adaptado a tu condominio",
      "texto": "Incluye correcciones sin costo adicional hasta tu conformidad"
    }
  },
  "riesgos": {
    "copete": "Riesgos reales",
    "titulo": "¿Qué pasa si tu condominio <em>no tiene plan de emergencia</em>?",
    "bajada": "Sin un <strong>plan de emergencia condominio</strong> vigente, tu comunidad queda expuesta a multas, responsabilidades legales y riesgos de seguridad para los residentes.",
    "items": [
      {
        "titulo": "Sin plan de evacuación definido",
        "texto": "Sin un plan de emergencia y evacuación, los residentes no saben qué hacer ni por dónde evacuar ante un sismo o incendio en el edificio."
      },
      {
        "titulo": "Responsabilidad del Comité",
        "texto": "Ante un accidente, el Comité de Administración puede enfrentar responsabilidad civil por no contar con un plan de seguridad para condominios vigente."
      },
      {
        "titulo": "Riesgo para adultos mayores y niños",
        "texto": "Las personas vulnerables del condominio necesitan rutas de evacuación y procedimientos adaptados. Sin plan de emergencia edificio, quedan desprotegidas."
      },
      {
        "titulo": "Observaciones de Bomberos y Seremi",
        "texto": "Bomberos y la Seremi de Salud pueden exigir un plan de emergencia actualizado para emitir certificados o aprobar instalaciones del edificio."
      }
    ],
    "llamado": "No esperes una emergencia. Protege a tu comunidad con un plan de emergencia condominio profesional.",
    "boton": "Cotizar mi Plan de Emergencia"
  },
  "incluye": {
    "copete": "Plan de emergencia y evacuación completo",
    "titulo": "¿Qué incluye nuestro <em>plan de emergencia condominio</em>?",
    "bajada": "Tu plan de emergencia edificio completo: desde el levantamiento de riesgos hasta la entrega final con protocolos de evacuación aprobados.",
    "items": [
      {
        "icono": "<circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/>",
        "titulo": "Análisis de Riesgos del Edificio",
        "texto": "Evaluación completa del condominio: accesos, escaleras, subterráneos y amenazas específicas de tu edificio."
      },
      {
        "icono": "<path d=\"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/>",
        "titulo": "Plan de Evacuación",
        "texto": "Protocolos de evacuación claros para residentes, visitas, conserjería y administración del condominio."
      },
      {
        "icono": "<polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/>",
        "titulo": "Mapas y Planos de Evacuación",
        "texto": "Rutas de evacuación por piso, puntos de encuentro y zonas críticas del edificio."
      },
      {
        "icono": "<path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/>",
        "titulo": "Roles y Responsables",
        "texto": "Funciones para Comité de Administración, brigadas de seguridad y coordinación en emergencias del condominio."
      },
      {
        "icono": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>",
        "titulo": "Protocolos por Tipo de Emergencia",
        "texto": "Plan de emergencia para incendios, sismos, cortes eléctricos, inundaciones y evacuación preventiva del edificio."
      },
      {
        "icono": "<polyline points=\"9 11 12 14 22 4\"/><path d=\"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11\"/>",
        "titulo": "Gestión con Bomberos y Seremi",
        "texto": "Apoyo en coordinación y respuesta a observaciones del revisor para la aprobación del plan de emergencia condominio."
      }
    ]
  },
  "proceso": {
    "copete": "Cotización plan de emergencia en 5 pasos",
    "titulo": "Simple, rápido y <em>sin complicaciones</em>",
    "pasos": [
      {
        "titulo": "Cotización",
        "texto": "En menos de 24h"
      },
      {
        "titulo": "Levantamiento",
        "texto": "Info del condominio"
      },
      {
        "titulo": "Análisis",
        "texto": "Riesgos y puntos críticos"
      },
      {
        "titulo": "Elaboración",
        "texto": "Plan + mapas + roles"
      },
      {
        "titulo": "Entrega",
        "texto": "Plan de emergencia listo"
      }
    ]
  },
  "normativa": {
    "copete": "Marco legal del plan de emergencia",
    "titulo": "Respaldo <em>normativo</em>",
    "bajada": "Tu plan de emergencia condominio se elabora conforme a toda la normativa vigente aplicable a condominios y edificios.",
    "items": [
      {
        "sigla": "Ley 21.442",
        "titulo": "Ley de Copropiedad Inmobiliaria",
        "texto": "Establece obligaciones de seguridad y plan de emergencia para condominios y comunidades de copropietarios."
      },
      {
        "sigla": "OGUC",
        "titulo": "Ordenanza de Urbanismo",
        "texto": "Define requisitos de seguridad del edificio, vías de evacuación y protección contra incendio para condominios."
      },
      {
        "sigla": "DS 50",
        "titulo": "Reglamento de Copropiedad",
        "texto": "Obliga al comité a establecer normas de seguridad, plan de evacuación y emergencia para la comunidad."
      }
    ]
  },
  "faq": {
    "copete": "Preguntas sobre plan de emergencia condominio",
    "titulo": "Resolvemos tus <em>dudas</em>",
    "items": [
      {
        "p": "¿Cuánto demora el plan de emergencia condominio completo?",
        "r": "El plan de emergencia completo se entrega en 5 a 10 días hábiles, dependiendo del tamaño y complejidad del condominio o edificio. La cotización del plan de emergencia la recibes en menos de 24 horas."
      },
      {
        "p": "¿Sirve para cualquier tipo de edificio o condominio?",
        "r": "Sí. Elaboramos planes de emergencia para edificios residenciales, condominios horizontales (casas), edificios con subterráneos, locales comerciales en primer piso y condominios mixtos. Cada plan de emergencia edificio se adapta a la configuración específica."
      },
      {
        "p": "¿El plan de emergencia y evacuación incluye protocolos para incendio y sismo?",
        "r": "Sí. El plan de emergencia y evacuación cubre todos los escenarios críticos: incendio, sismo, corte eléctrico, inundación y evacuación preventiva. Cada protocolo incluye roles, rutas de evacuación y puntos de encuentro específicos para tu condominio."
      },
      {
        "p": "¿Necesitan visitar el condominio para elaborar el plan?",
        "r": "Depende del caso. En muchos condominios trabajamos con planos, fotografías y la información que nos entrega la administración para elaborar el plan de emergencia. Si se requiere visita presencial al edificio, la coordinamos directamente."
      },
      {
        "p": "¿Qué es un plan de seguridad para condominios y por qué es obligatorio?",
        "r": "Un plan de seguridad para condominios —también llamado plan de emergencia condominio— es un documento que establece protocolos de evacuación, roles del comité y procedimientos ante emergencias. Es obligatorio según la Ley 21.442 de Copropiedad Inmobiliaria y protege tanto a residentes como al comité de administración ante responsabilidades legales."
      },
      {
        "p": "¿Cuánto cuesta un plan de emergencia para edificio?",
        "r": "El costo del plan de emergencia edificio depende del número de pisos, departamentos y complejidad de la instalación. Solicita tu cotización plan de emergencia sin compromiso y la recibirás en menos de 24 horas."
      }
    ]
  },
  "cierre": {
    "titulo": "Tu plan de emergencia condominio <em>listo hoy</em>",
    "texto": "Obtén tu <strong>plan de emergencia y evacuación</strong> para condominios y edificios con respaldo profesional y conforme a la Ley 21.442. Cotización plan de emergencia gratis en menos de 24 horas.",
    "boton": "Cotiza tu Plan de Emergencia",
    "whatsapp": "https://api.whatsapp.com/send?phone=56929947924&text=Hola%2C%20necesito%20cotizar%20un%20Plan%20de%20Emergencia%20para%20mi%20condominio.%20Llego%20desde%20Google.",
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
            "texto": "Plan de Emergencia y Evacuación Industrial"
          },
          {
            "href": "https://sveaconsultores.cl/manejo-de-residuos-peligrosos/",
            "texto": "Manejo de Sustancias y Residuos Peligrosos"
          },
          {
            "href": "https://sveaconsultores.cl/autorizacion-de-transporte-de-residuos/",
            "texto": "Autorización de Transporte de Residuos Peligrosos y no Peligrosos"
          },
          {
            "href": "https://sveaconsultores.cl/planes-de-emergencia-y-evacuacion-condominios/",
            "texto": "Plan de Emergencia y Evacuación para Condominios"
          }
        ]
      }
    ],
    "presentacion": "Expertos en elaboración de planes de emergencia para condominios y edificios, asegurando cumplimiento normativo y seguridad para tu comunidad.",
    "contacto": true
  },
  "foto": "servicio-pc",
  "medicion": {
    "servicio": "Plan de Emergencia Condominios",
    "prefijoAsunto": "[ADS] Cotización Plan Condominios - ",
    "subjectId": "dynamic-subject-lpc",
    "eventoGA4": false,
    "valorConversion": 1.0,
    "eventoWhatsApp": false,
    "origen": "<script> del original (conversiones con value 1.0 CLP y sin eventos GA4)"
  }
};

export default landing;
