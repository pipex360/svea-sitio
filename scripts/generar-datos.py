#!/usr/bin/env python3
"""Arma sitio/src/data/paginas.json desde las fuentes del repositorio.
Nada de esto se escribe a mano: title, meta, robots, canonical y JSON-LD salen
de 04-seo-por-url/, y los formularios de la extracción literal de las páginas vivas.
"""
import csv, json, os, re

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DOM  = 'https://sveaconsultores.cl'

seo   = list(csv.DictReader(open(f'{RAIZ}/04-seo-por-url/seo-por-url.csv', encoding='utf-8')))
schema= json.load(open(f'{RAIZ}/04-seo-por-url/schema-jsonld-por-url.json', encoding='utf-8'))
forms = json.load(open(f'{RAIZ}/00-respuesta-felipe/formularios-inventario.json', encoding='utf-8'))

# medición: valores exactos leídos de las landings publicadas (no se inventan)
MEDICION = {
  '/cotiza-calificacion-tecnica-industrial/': ('Calificación Técnica Industrial', '[ADS] Cotización CTI - ',              'form-landing-cti', 'dynamic-subject-lcti'),
  '/cotiza-estudio-de-carga-de-combustible/': ('Estudio de Carga de Combustible',  '[ADS] Cotización ECC - ',              'form-landing-ecc', 'dynamic-subject-lecc'),
  '/cotiza-informe-sanitario/':               ('Informe Sanitario Favorable',      '[ADS] Cotización Informe Sanitario - ','form-landing-is',  'dynamic-subject-lis'),
  '/cotiza-plan-emergencia-condominio/':      ('Plan de Emergencia Condominios',   '[ADS] Cotización Plan Condominios - ', 'form-landing-pc',  'dynamic-subject-lpc'),
  '/cotiza-plan-emergencia/':                 ('Plan de Emergencia y Evacuación',  '[ADS] Cotización Plan Emergencia - ',  'form-landing-pe',  'dynamic-subject-lpe'),
}

def ruta(url):  return url.replace(DOM, '') or '/'
def slug(r):    return 'home' if r == '/' else r.strip('/').split('/')[-1]

paginas = []
for f in seo:
    r = ruta(f['url'])
    s = slug(r)
    cont = f'{RAIZ}/sitio/src/contenido/{s}.html'
    p = {
      'ruta': r, 'slug': s, 'tipo': f['tipo'],
      'title': f['title_rank_math'],
      'description': f['meta_description'],
      # arreglo 6: /gracias/ nace noindex, sólo debe verla quien envió un formulario
      'robots': 'noindex, follow' if r == '/gracias/' else f['robots'],
      'canonical': f['canonical_correcto'],
      'h1': re.sub(r'<[^>]+>', ' ', f['h1']).strip(),
      'h1_html': f['h1'],
      'og_image': f['og_image'],
      'palabras_origen': int(f['palabras']),
      'jsonld': schema.get(f['url'], []),
      'contenido': f'{s}.html' if os.path.exists(cont) else None,
      'formularios': [x for x in forms if x['url'] == r],
    }
    if r in MEDICION:
        serv, pref, fid, sid = MEDICION[r]
        p['medicion'] = {'servicio': serv, 'prefijo_asunto': pref, 'form_id': fid, 'subject_id': sid}
    paginas.append(p)

# la landing nueva de transporte de residuos (sección 7 del plan), clon de CTI
paginas.append({
  'ruta': '/cotiza-autorizacion-transporte-residuos/', 'slug': 'cotiza-autorizacion-transporte-residuos',
  'tipo': 'landings-ads',
  'title': 'Autorización de Transporte de Residuos | SVEA Consultores',
  'description': 'Tramitamos la autorización SEREMI para transporte de residuos peligrosos y no peligrosos. Cotización en menos de 24 horas.',
  'robots': 'noindex, follow',
  'canonical': f'{DOM}/cotiza-autorizacion-transporte-residuos/',
  'h1': 'Autorización de Transporte de Residuos Peligrosos y No Peligrosos',
  'h1_html': 'Autorización de Transporte de Residuos<br><em>Peligrosos y No Peligrosos</em>',
  'og_image': '', 'palabras_origen': 0, 'jsonld': [], 'contenido': None,
  'formularios': [], 'pendiente': 'Hero a la espera de los títulos del anuncio (sección 10)',
  'medicion': {'servicio': 'Autorización Transporte de Residuos',
               'prefijo_asunto': '[ADS] Cotización Transporte Residuos - ',
               'form_id': 'form-landing-tr', 'subject_id': 'dynamic-subject-ltr'},
})

json.dump(paginas, open(f'{RAIZ}/sitio/src/data/paginas.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

ind = [p for p in paginas if 'noindex' not in p['robots'] and p['ruta'] != '/gracias/']
print(f"{len(paginas)} páginas · {len(ind)} indexables · {sum(len(p['formularios']) for p in paginas)} formularios")
print("sin contenido extraído:", [p['slug'] for p in paginas if not p['contenido']])
print("noindex:", [p['ruta'] for p in paginas if 'noindex' in p['robots']])
