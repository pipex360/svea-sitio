"""Convierte los 9 artículos del WordPress en datos limpios para Astro.

Salida: src/contenido/articulos/<slug>.json
"""
import json, re, os
import lxml.html as LH
from lxml import etree

REPO = os.path.expanduser('~/Desktop/svea-sitio')
ORIG = f'{REPO}/originales-wp/articulos'
DEST = f'{REPO}/src/contenido/articulos'
IMGMAP = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'imagenes.json')))
os.makedirs(DEST, exist_ok=True)

SLUGS = [
    'autorizacion-transporte-residuos-chile', 'calificacion-inofensiva-seremi-2026',
    'calificacion-tecnica-industrial-chile', 'estudio-de-carga-combustible-chile',
    'manejo-de-residuos-peligrosos-chile', 'plan-de-emergencia-condominio-chile',
    'plan-de-emergencia-ds-44-empresas-chile', 'plan-de-emergencia-empresa-chile',
    'que-es-informe-sanitario',
]

# Promesas que no se publican tal cual (regla 2). (slug|*, texto original, reemplazo)
PROMESAS = [
    ('*', 'y cómo obtenerla sin rechazos', 'y cómo obtenerla evitando los rechazos más comunes'),
    ('*', 'y cómo obtenerla ante la SEREMI de Salud sin rechazos', 'y cómo obtenerla ante la SEREMI de Salud evitando los rechazos más comunes'),
    ('*', 'y cómo obtener tu informe de carga de fuego sin rechazos', 'y cómo obtener tu informe de carga de fuego evitando los rechazos más comunes'),
    ('*', 'Obtén tu calificación inofensiva sin rechazos', 'Obtén tu calificación inofensiva evitando los rechazos más comunes'),
    ('*', 'que garantiza un plan completo, aprobable y funcional', 'pensado para entregar un plan completo, aprobable y funcional'),
]
# Plazos propios de SVEA (decisión de Carlos, 24-sep): 3-5 días hábiles en todos
# los servicios salvo planes de emergencia (empresa, DS 44, condominios: 5-10).
# Los plazos de la autoridad (SEREMI, ley) no se tocan.
PLAZOS = [
    ('autorizacion-transporte-residuos-chile', 'Informe listo en 5-10 días hábiles.', 'Informe listo en 3-5 días hábiles.'),
    ('calificacion-inofensiva-seremi-2026', 'Informe en 5-10 días hábiles.', 'Informe en 3-5 días hábiles.'),
    ('calificacion-tecnica-industrial-chile', 'Informe listo en 5-10 días hábiles.', 'Informe listo en 3-5 días hábiles.'),
    ('calificacion-tecnica-industrial-chile', 'Expediente profesional en 5-10 días.', 'Expediente profesional en 3-5 días hábiles.'),
    ('estudio-de-carga-combustible-chile', 'Listo en 5-10 días hábiles.', 'Listo en 3-5 días hábiles.'),
    ('estudio-de-carga-combustible-chile', 'Informe profesional en 5-10 días.', 'Informe profesional en 3-5 días hábiles.'),
    ('que-es-informe-sanitario', 'La elaboración del expediente técnico profesional demora entre 5 y 10 días hábiles.', 'La elaboración del expediente técnico profesional demora entre 3 y 5 días hábiles.'),
    ('que-es-informe-sanitario', 'Entre 5 y 10 días hábiles desde la visita en terreno', 'Entre 3 y 5 días hábiles desde la visita en terreno'),
]
# Multas del plan de emergencia empresa (verificado por el coordinador, 24-sep):
# en Chile se expresan en UTM, no en UF; DT art. 506 CT, SEREMI art. 174 CS.
MULTAS = [
    ('plan-de-emergencia-empresa-chile',
     'El DS 44 establece que las multas pueden ir <strong>desde 10 a 200 UF</strong>, y además el incumplimiento puede generar',
     'Las multas se expresan en UTM: la Dirección del Trabajo las aplica según el tamaño de la empresa (Código del Trabajo, art. 506) y la SEREMI de Salud puede multar <strong>entre 0,1 y 1.000 UTM</strong> (Código Sanitario, art. 174). Además, el incumplimiento puede generar'),
    ('plan-de-emergencia-empresa-chile',
     'van <strong>desde 10 a 200 UTM</strong> (aproximadamente $700.000 a $14.000.000 CLP al valor actual de la UTM), dependiendo de la gravedad de la infracción y la reincidencia.',
     'se expresan en UTM y dependen de la gravedad, la reincidencia y el tamaño de la empresa; la SEREMI de Salud puede aplicar <strong>hasta 1.000 UTM</strong> (Código Sanitario, art. 174).'),
    ('plan-de-emergencia-empresa-chile',
     'Las multas van desde 10 a 200 UTM (aproximadamente $700.000 a $14.000.000 CLP), dependiendo de la gravedad.',
     'Las multas se expresan en UTM y dependen de la gravedad, la reincidencia y el tamaño de la empresa; la SEREMI de Salud puede aplicar hasta 1.000 UTM (Código Sanitario, art. 174).'),
]
PLAZOS = PLAZOS + MULTAS
PROMESAS_APLICADAS = []
PLAZOS_APLICADOS = set()
LOGOS_ROTOS = []

DOM = 'https://sveaconsultores.cl'


def txt(el):
    return re.sub(r'\s+', ' ', el.text_content()).strip() if el is not None else ''


def inner(el):
    s = (el.text or '')
    for c in el:
        s += etree.tostring(c, encoding='unicode', method='html')
    return s.strip()


def outer(el):
    return etree.tostring(el, encoding='unicode', method='html')


def local_href(h):
    if not h:
        return h
    if h == DOM or h == DOM + '/':
        return '/'
    if h.startswith(DOM + '/'):
        return h[len(DOM):]
    return h


def limpiar(el):
    """Quita estilos de presentación, clases de animación y manejadores."""
    for n in el.iter():
        if not isinstance(n.tag, str):
            continue
        for a in list(n.attrib):
            if a.startswith('on') or a in ('loading', 'decoding'):
                del n.attrib[a]
        cls = n.get('class')
        if cls is not None:
            c = ' '.join(x for x in cls.split() if x != 'reveal')
            if c:
                n.set('class', c)
            else:
                del n.attrib['class']
        st = n.get('style')
        if st is not None:
            del n.attrib['style']
            m = re.search(r'background:\s*(#[0-9a-fA-F]{3,6})', st)
            if m and 'emergency-card-letter' in (n.get('class') or ''):
                n.set('style', f'--letra:{m.group(1)}')
            m = re.search(r'(?:^|;)\s*color:\s*(#[0-9a-fA-F]{3,6})', st)
            if m and n.tag == 'strong':
                n.set('style', f'color:{m.group(1)}')
        if n.tag == 'a' and n.get('href'):
            n.set('href', local_href(n.get('href')))
            if n.get('target') == '_blank':
                n.set('rel', 'noopener')
        if n.tag == 'img':
            src = n.get('src')
            if src in IMGMAP:
                d = IMGMAP[src]
                n.set('src', d['ruta'])
                n.set('width', str(d['ancho']))
                n.set('height', str(d['alto']))
            n.set('loading', 'lazy')
            n.set('decoding', 'async')
    return el


def promesas(slug, s):
    for sl, a, b in PLAZOS:
        if sl == slug and a in s:
            s = s.replace(a, b)
            PLAZOS_APLICADOS.add((slug, a, b))
    for sl, a, b in PROMESAS:
        if sl in ('*', slug) and a in s:
            s = s.replace(a, b)
            PROMESAS_APLICADAS.append((slug, a, b))
    return s


def logos_de(el):
    track = el.find_class('logo-track')
    if not track:
        return []
    vistos, out = set(), []
    for im in track[0].findall('.//img'):
        src = im.get('src')
        if src in vistos:
            break  # la segunda mitad del carrusel repite la primera
        vistos.add(src)
        if src not in IMGMAP:
            LOGOS_ROTOS.append(src)
            continue  # 404 en el sitio vivo (AES): no se ve ni allá
        d = IMGMAP[src]
        out.append({'src': d['ruta'], 'alt': im.get('alt', ''), 'ancho': d['ancho'], 'alto': d['alto']})
    return out


def logos_html(logos):
    if not logos:
        return ''
    def mitad(oculta):
        imgs = ''.join(
            f'<img src="{l["src"]}" alt="{"" if oculta else l["alt"]}" width="{l["ancho"]}" height="{l["alto"]}" loading="lazy" decoding="async">'
            for l in logos)
        extra = ' aria-hidden="true"' if oculta else ''
        return f'<div class="art-logos-mitad"{extra}>{imgs}</div>'
    return f'<div class="art-logos" aria-label="Empresas que confían en SVEA"><div class="logos-cinta art-logos-cinta">{mitad(False)}{mitad(True)}</div></div>'


def cta_intermedio(el):
    h3 = el.find('.//h3')
    p = el.find('.//p')
    botones = []
    for a in el.find_class('cta-buttons')[0].findall('a'):
        href = local_href(a.get('href'))
        botones.append({'texto': txt(a), 'href': href.replace('&', '&amp;'), 'externo': a.get('target') == '_blank',
                        'tipo': 'primario' if 'btn-primary' in a.get('class', '') else 'secundario'})
    flecha = '<span class="circulo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>'
    bts = ''
    for b in botones:
        ext = ' target="_blank" rel="noopener"' if b['externo'] else ''
        if b['tipo'] == 'primario':
            texto = b['texto'].rstrip(' →')  # la flecha ya va en el círculo
            bts += f'<a class="btn-flecha" href="{b["href"]}"{ext}><span>{texto}</span>{flecha}</a>'
        else:
            bts += f'<a class="art-boton-linea" href="{b["href"]}"{ext}>{b["texto"]}</a>'
    return (f'<aside class="art-cta" aria-label="Cotizar">'
            f'<h3>{inner(h3)}</h3><p>{inner(p)}</p>'
            f'<div class="art-cta-botones">{bts}</div>'
            f'{logos_html(logos_de(el))}</aside>')


def formulario(el):
    cab = el.find_class('standalone-form-header')[0]
    form = el.find('.//form')
    ocultos, campos = [], []
    for n in form.iter():
        if isinstance(n.tag, str) and n.tag == 'input' and n.get('type') == 'hidden':
            o = {'name': n.get('name'), 'value': n.get('value')}
            if n.get('id'):
                o['id'] = n.get('id')
            ocultos.append(o)
    for f in form.find_class('form-field'):
        lab = f.find('.//label')
        ctl = f.find('.//input')
        if ctl is None:
            ctl = f.find('.//select')
        if ctl is None:
            ctl = f.find('.//textarea')
        c = {'label': txt(lab), 'id': ctl.get('id'), 'name': ctl.get('name'),
             'tipo': ctl.tag if ctl.tag != 'input' else ctl.get('type', 'text'),
             'requerido': ctl.get('required') is not None,
             'placeholder': ctl.get('placeholder'),
             'ancho': 'form-field--full' in f.get('class', '')}
        if ctl.tag == 'textarea':
            c['filas'] = int(ctl.get('rows', '3'))
        if ctl.tag == 'select':
            c['opciones'] = [{'value': o.get('value'), 'texto': txt(o),
                              'seleccionada': o.get('selected') is not None,
                              'desactivada': o.get('disabled') is not None} for o in ctl.findall('option')]
        campos.append(c)
    return {
        'titulo': txt(cab.find('h3')), 'bajada': txt(cab.find('p')),
        'ocultos': ocultos, 'campos': campos, 'boton': txt(form.find('.//button')),
        'confianza': [txt(x) for x in el.find_class('form-trust-item')],
        'logos': logos_de(el),
    }


def asunto(html_completo):
    for s in re.findall(r'<script[^>]*>([\s\S]*?)</script>', html_completo):
        if 'dynamic-subject' in s:
            pref = re.search(r"var asunto = '([^']*)' \+ nombre", s)
            ident = re.search(r"getElementById\('([^']+)'\)\.value", s).group(1)
            segundo = re.search(r"var (\w+) = \(form\.querySelector\('input\[name=\"(\w+)\"\]'\)", s.split('var nombre')[1])
            return {'prefijo': pref.group(1), 'campo': segundo.group(2), 'id': ident}
    return None


def extraer(slug):
    raw = open(f'{ORIG}/{slug}.html', encoding='utf-8').read()
    ini = raw.find('<header class="article-hero">')
    fin = raw.find('</article>') + len('</article>')
    doc = LH.fromstring('<div>' + raw[ini:fin] + '</div>')
    hero = doc.find_class('article-hero')[0]
    art = doc.find('.//article')

    bc = hero.find_class('article-breadcrumb')[0]
    migas = [{'texto': txt(a), 'href': local_href(a.get('href'))} for a in bc.findall('a')]
    meta = [txt(x) for x in hero.find_class('article-meta-item')]
    datos = {
        'slug': slug,
        'ruta': f'/{slug}/',
        'migasOriginal': migas,
        'migaFinal': (bc.getchildren()[-1].tail or '').strip(),
        'categoria': txt(hero.find_class('article-category')[0]),
        'h1': txt(hero.find('.//h1')),
        'bajada': promesas(slug, txt(hero.find_class('article-hero-subtitle')[0])),
        'fecha': meta[0], 'lectura': meta[1], 'autor': meta[2],
    }

    bloques, html_actual = [], []

    def cerrar():
        if html_actual:
            bloques.append({'tipo': 'html', 'html': promesas(slug, '\n'.join(html_actual))})
            html_actual.clear()

    hijos = [c for c in art if isinstance(c.tag, str)]
    i = 0
    relacionados = None
    while i < len(hijos):
        c = hijos[i]
        cls = c.get('class', '')
        if 'key-stats' in cls:
            est = []
            for k in c.find_class('key-stat'):
                n = txt(k.find_class('key-stat-number')[0])
                l = txt(k.find_class('key-stat-label')[0])
                if (n, l) == ('100%', 'Tasa aprobación'):
                    PROMESAS_APLICADAS.append((slug, 'cifra «100% Tasa aprobación»', 'cifra «3-5 Días hábiles expediente»'))
                    n, l = '3-5', 'Días hábiles expediente'
                if slug == 'estudio-de-carga-combustible-chile' and (n, l) == ('5-10', 'Días hábiles'):
                    PLAZOS_APLICADOS.add((slug, 'cifra «5-10 Días hábiles»', 'cifra «3-5 Días hábiles»'))
                    n = '3-5'
                est.append({'n': n, 'l': l})
            datos['cifras'] = est
        elif c.tag == 'nav' and 'toc' in cls:
            datos['indiceTitulo'] = txt(c.find_class('toc-title')[0])
            datos['indice'] = [{'href': a.get('href'), 'texto': txt(a)} for a in c.findall('.//a')]
        elif 'standalone-form-wrapper' in cls:
            cerrar()
            datos['formulario'] = formulario(c)
            bloques.append({'tipo': 'formulario'})
        elif 'faq-section' in cls:
            cerrar()
            items = []
            for it in c.find_class('faq-item'):
                q = it.find_class('faq-question')[0]
                for s in q.find_class('faq-icon'):
                    s.drop_tree()
                a = it.find_class('faq-answer-inner')[0]
                limpiar(a)
                r = promesas(slug, inner(a))
                items.append({'p': txt(q), 'r': r, 'rTexto': re.sub(r'\s+', ' ', LH.fromstring(f'<div>{r}</div>').text_content()).strip()})
            datos['faq'] = {'id': c.get('id'), 'titulo': txt(c.find('h2')), 'items': items}
        elif (c.tag == 'h2' and i + 1 < len(hijos) and 'related-services' in hijos[i + 1].get('class', '')) or \
             (c.tag == 'section' and c.find_class('related-services')):
            intro = ''
            if c.tag == 'h2':
                titulo, cont = txt(c), hijos[i + 1]
                i += 1
            else:
                titulo, cont = txt(c.find('h2')), c.find_class('related-services')[0]
                otros = [x for x in c if isinstance(x.tag, str) and x.tag != 'h2' and x is not cont]
                assert all(x.tag == 'p' for x in otros), [x.tag for x in otros]
                intro = ''.join(inner(limpiar(x)) for x in otros)
            tarjetas = []
            for card in cont.find_class('related-card'):
                limpiar(card)
                ult = card.findall('a')[-1]
                tarjetas.append({'titulo': txt(card.find('h4')), 'texto': inner(card.find('p')),
                                 'href': ult.get('href'), 'enlace': txt(ult)})
            relacionados = {'titulo': titulo, 'intro': intro, 'tarjetas': tarjetas}
        elif 'author-box' in cls:
            info = c.find_class('author-info')[0]
            datos['autorCaja'] = {'inicial': txt(c.find_class('author-logo')[0]), 'nombre': txt(info.find('h4')),
                                  'texto': inner(limpiar(info.find('p')))}
        elif 'share-bar' in cls:
            enl = []
            for a in c:
                if not isinstance(a.tag, str) or a.tag == 'span':
                    continue
                if a.tag == 'a':
                    enl.append({'href': a.get('href'), 'texto': txt(a), 'titulo': a.get('title') or a.get('aria-label') or '',
                                'externo': a.get('target') == '_blank'})
                elif a.tag == 'button':
                    url = re.search(r"writeText\('([^']+)'\)", a.get('onclick')).group(1)
                    enl.append({'copiar': url, 'texto': txt(a), 'titulo': a.get('title') or ''})
            datos['compartir'] = {'titulo': txt(c.find('span')), 'enlaces': enl}
        elif 'article-cta' in cls:
            html_actual.append(cta_intermedio(c))
        else:
            limpiar(c)
            if c.tag == 'p' and not bloques and not html_actual:
                c.set('class', 'art-entrada')
            for t in list(c.iter('table')):
                envoltura = etree.Element('div')
                envoltura.set('class', 'art-tabla')
                t.addprevious(envoltura)
                envoltura.append(t)
            html_actual.append(outer(c))
        i += 1
    cerrar()
    datos['bloques'] = bloques
    datos['relacionados'] = relacionados
    datos['asunto'] = asunto(raw)

    json.dump(datos, open(f'{DEST}/{slug}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    return datos


for s in SLUGS:
    d = extraer(s)
    print(s, len(d['bloques']), 'faq', len(d['faq']['items']), 'rel', len(d['relacionados']['tarjetas']), 'asunto', bool(d['asunto']))
print('logos rotos:', set(LOGOS_ROTOS))
print('\nPROMESAS:')
for p in PROMESAS_APLICADAS:
    print(' ', p)
print('\nPLAZOS:')
for p in sorted(PLAZOS_APLICADOS):
    print(' ', p)
print('PLAZOS SIN APLICAR:', [p for p in PLAZOS if p not in PLAZOS_APLICADOS])
