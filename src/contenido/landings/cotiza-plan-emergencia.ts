/**
 * /cotiza-plan-emergencia/ · landing de Google Ads.
 *
 * Texto, formulario y asunto extraídos del bloque HTML del original
 * (originales-wp/landings-ads/cotiza-plan-emergencia.html). No se retoca a mano sin
 * revisar el original: el cruce palabra por palabra lo compara.
 */
import type { Landing } from './tipos';

const landing: Landing = {
  "ruta": "/cotiza-plan-emergencia/",
  "urgencia": "<strong>Fiscalización activa DS 594</strong> — La SEREMI está cursando multas. Regulariza tu empresa ahora.",
  "badge": "Cotización en menos de 24 horas",
  "h1": "Plan de Emergencia<br>y Evacuación<br><em>conforme al DS 594 y DS 44</em>",
  "subtitulo": "También denominado <em>plan de contingencia</em> · Exigido por DS 594 y DS 44",
  "bajada": "Elaboramos tu <strong>Plan de Emergencia y Contingencia</strong>: informe técnico, planos de evacuación, protocolos y legalización ante SEREMI, Bomberos y Carabineros. Tú no tienes que hacer nada.",
  "pills": [
    "Conforme al DS 594 y DS 44",
    "Correcciones sin costo hasta la aprobación",
    "Plan de contingencia incluido",
    "Listo en 5-10 días hábiles"
  ],
  "cifras": [
    {
      "valor": "250+",
      "texto": "Planes elaborados"
    },
    {
      "valor": "15-30",
      "texto": "Días legalización"
    },
    {
      "valor": "24h",
      "texto": "Cotización"
    }
  ],
  "formulario": {
    "titulo": "Cotiza tu Plan Ahora",
    "bajada": "Sin compromiso · Respuesta en <strong>&lt; 24 horas</strong>",
    "id": "form-landing-pe",
    "ocultos": [
      {
        "name": "access_key",
        "value": "076a0f9a-9911-48f6-880e-dd9d44c3063b"
      },
      {
        "name": "subject",
        "value": "[LANDING ADS] Cotización Plan de Emergencia - SVEA",
        "id": "dynamic-subject-lpe"
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
        "value": "Plan de Emergencia y Evacuación"
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
            "value": "Oficinas",
            "texto": "Oficinas"
          },
          {
            "value": "Local comercial",
            "texto": "Local comercial"
          },
          {
            "value": "Taller mecánico / industrial",
            "texto": "Taller mecánico / industrial"
          },
          {
            "value": "Condominio / Edificio",
            "texto": "Condominio / Edificio"
          },
          {
            "value": "Educacional",
            "texto": "Educacional"
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
        "placeholder": "¿Necesitas el plan por fiscalización, patente u otro motivo?"
      }
    ],
    "boton": "SOLICITAR COTIZACIÓN GRATUITA →",
    "confianza": "Datos protegidos · Sin compromiso",
    "garantia": {
      "titulo": "Te acompañamos hasta la aprobación",
      "texto": "Si la autoridad pide correcciones, las hacemos sin costo adicional"
    }
  },
  "riesgos": {
    "copete": "Riesgos reales",
    "titulo": "¿Qué pasa si <em>no tienes</em> tu plan?",
    "bajada": "Las consecuencias son inmediatas y pueden paralizar tu operación.",
    "items": [
      {
        "titulo": "Multas de hasta 1.000 UTM",
        "texto": "La SEREMI puede aplicar sanciones económicas severas por incumplimiento del DS 594."
      },
      {
        "titulo": "Clausura de tu establecimiento",
        "texto": "Una fiscalización negativa puede significar cierre temporal hasta que regularices."
      },
      {
        "titulo": "Rechazo de patente municipal",
        "texto": "Sin plan vigente no puedes obtener ni renovar tu patente municipal."
      },
      {
        "titulo": "Responsabilidad penal",
        "texto": "Ante un accidente, el empleador enfrenta demandas civiles y penales por negligencia."
      }
    ],
    "llamado": "No esperes a que te fiscalicen. Regulariza hoy.",
    "boton": "Cotizar mi Plan ahora"
  },
  "incluye": {
    "copete": "Servicio integral",
    "titulo": "¿Qué incluye <em>nuestro servicio</em>?",
    "bajada": "Desde la visita técnica hasta la aprobación final. Sin complicaciones.",
    "items": [
      {
        "icono": "<circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/>",
        "titulo": "Visita Técnica",
        "texto": "Inspección de riesgos, rutas de evacuación y elementos de protección."
      },
      {
        "icono": "<path d=\"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/>",
        "titulo": "Informe Técnico",
        "texto": "Análisis de vulnerabilidades y recomendaciones documentadas."
      },
      {
        "icono": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>",
        "titulo": "Plan de Emergencia y Contingencia",
        "texto": "Protocolos para incendios, sismos, derrames y emergencias críticas. Tu plan de contingencia operacional ante cualquier escenario."
      },
      {
        "icono": "<polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/>",
        "titulo": "Planos de Evacuación",
        "texto": "Vías de escape, zonas de seguridad, extintores y equipos."
      },
      {
        "icono": "<path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/>",
        "titulo": "Brigada y Roles",
        "texto": "Comité de emergencia con funciones claras para tu equipo."
      },
      {
        "icono": "<polyline points=\"9 11 12 14 22 4\"/><path d=\"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11\"/>",
        "titulo": "Legalización Completa",
        "texto": "Gestión ante SEREMI, Bomberos y Carabineros incluida."
      }
    ]
  },
  "proceso": {
    "copete": "5 pasos",
    "titulo": "Simple, rápido y <em>sin complicaciones</em>",
    "pasos": [
      {
        "titulo": "Cotización",
        "texto": "En menos de 24h"
      },
      {
        "titulo": "Visita Técnica",
        "texto": "Inspección en terreno"
      },
      {
        "titulo": "Elaboración",
        "texto": "Informe + planos"
      },
      {
        "titulo": "Legalización",
        "texto": "SEREMI + Bomberos"
      },
      {
        "titulo": "Entrega",
        "texto": "Plan aprobado"
      }
    ]
  },
  "normativa": {
    "copete": "Marco legal",
    "titulo": "Cumplimiento <em>normativo</em>",
    "bajada": "Tu plan de emergencia y contingencia cumplirá con toda la legislación vigente.",
    "items": [
      {
        "sigla": "DS 44",
        "titulo": "Sustancias Peligrosas",
        "texto": "Exige plan de emergencia y contingencia para instalaciones que almacenen sustancias peligrosas."
      },
      {
        "sigla": "DS 594",
        "titulo": "Condiciones Sanitarias",
        "texto": "Obliga a mantener condiciones de seguridad y planes de evacuación actualizados."
      },
      {
        "sigla": "Art. 184",
        "titulo": "Código del Trabajo",
        "texto": "El empleador debe proteger eficazmente la vida y salud de sus trabajadores."
      }
    ]
  },
  "faq": {
    "copete": "Preguntas frecuentes",
    "titulo": "Resolvemos tus <em>dudas</em>",
    "items": [
      {
        "p": "¿Cuánto demora el plan completo?",
        "r": "El informe técnico toma entre 5 y 10 días hábiles. La legalización ante SEREMI y Bomberos puede sumar 15 a 30 días adicionales, dependiendo de la autoridad. Si tienes urgencia por fiscalización, contamos con servicio express."
      },
      {
        "p": "¿Qué pasa si la autoridad pide correcciones?",
        "r": "Las realizamos sin costo adicional hasta obtener la aprobación definitiva. La aprobación la otorgan la SEREMI y Bomberos; nosotros preparamos el plan para que cumpla lo que exigen."
      },
      {
        "p": "¿El plan es obligatorio por ley?",
        "r": "Sí. El DS 594 y el Art. 184 del Código del Trabajo obligan a toda empresa con trabajadores a contar con un plan de emergencia vigente, sin importar su tamaño."
      },
      {
        "p": "¿Cuál es la diferencia entre Plan de Emergencia y Plan de Contingencia?",
        "r": "En Chile ambos términos se usan de forma intercambiable. El Plan de Emergencia (exigido por DS 594) regula los protocolos de actuación ante siniestros como incendios, sismos y evacuaciones. El Plan de Contingencia abarca también la continuidad operacional frente a cualquier evento disruptivo. Nuestro servicio integra ambos componentes en un único documento, cumpliendo con toda la normativa vigente."
      },
      {
        "p": "¿Incluye la legalización ante SEREMI y Bomberos?",
        "r": "Sí. Nuestro servicio incluye la gestión completa: elaboración del plan, planos de evacuación, y tramitación ante SEREMI, Bomberos y Carabineros."
      },
      {
        "p": "¿Cuánto cuesta?",
        "r": "Depende del tamaño y complejidad de la instalación. Solicita tu cotización personalizada sin compromiso y la recibirás en menos de 24 horas."
      }
    ]
  },
  "cierre": {
    "titulo": "Protege a tu equipo <em>hoy</em>",
    "texto": "Obtén tu Plan de Emergencia, Evacuación y Contingencia con respaldo profesional. Cotización en menos de 24 horas, plan completo en 5-10 días hábiles, conforme al DS 594 y DS 44.",
    "boton": "Cotiza tu Plan ahora",
    "whatsapp": "https://api.whatsapp.com/send?phone=56929947924&text=Hola%2C%20necesito%20cotizar%20un%20Plan%20de%20Emergencia%20y%20Evacuaci%C3%B3n%20para%20mi%20empresa.%20Llego%20desde%20Google.",
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
            "href": "https://sveaconsultores.cl/manejo-de-residuos-peligrosos/",
            "texto": "Manejo de Sustancias y Residuos Peligrosos"
          },
          {
            "href": "https://sveaconsultores.cl/autorizacion-de-transporte-de-residuos/",
            "texto": "Autorización de Transporte de Residuos Peligrosos y no Peligrosos"
          },
          {
            "href": "https://sveaconsultores.cl/planes-de-emergencia-y-evacuacion-condominios/",
            "texto": "Planes de Emergencia y Evacuación para Condominios"
          }
        ]
      }
    ],
    "presentacion": "Expertos en gestión y tramitación de permisos para industrias, asegurando cumplimiento normativo y seguridad operativa.",
    "contacto": true
  },
  "foto": "servicio-pe",
  "medicion": {
    "servicio": "Plan de Emergencia y Evacuación",
    "prefijoAsunto": "[ADS] Cotización Plan Emergencia - ",
    "subjectId": "dynamic-subject-lpe",
    "eventoGA4": true,
    "eventoWhatsApp": true,
    "origen": "paginas.json: el bloque del original no traía medición propia (sólo el GTM del WordPress); el asunto sí es el del original"
  }
};

export default landing;
