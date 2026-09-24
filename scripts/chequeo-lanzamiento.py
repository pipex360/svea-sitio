#!/usr/bin/env python3
"""Chequeo antes de cambiar el dominio al sitio nuevo.

Compara, URL por URL, lo que hoy publica WordPress contra el sitio nuevo
construido en modo producción, y lista todo lo que se perdería o cambiaría.

Arquitectura de medición del sitio nuevo (24-sep, ver
src/components/MedicionSitio.astro):
  · Google Ads va SÓLO por GTM-NGVMRNDM (etiqueta, vinculador y las dos
    conversiones). En el HTML no puede quedar ninguna etiqueta de conversión
    AW-…/… ni un send_to: el WordPress las mandaba además inline y contaba
    cada lead dos veces. Por eso las señales «Ads» del vivo NO se exigen.
  · GA4 G-FWQ05WDLZ3 por gtag.js. Cada página nueva debe traer el GTM y el
    GA4, exactamente una vez cada uno.

Lo que sí debe ser igual al vivo: el formulario (Web3Forms, access_key, id del
asunto dinámico, from_name, Servicio, redirect, id del form), el robots y que
la URL exista. La canónica puede cambiar sólo si apunta a la propia URL.

No modifica nada. Uso:

    SVEA_PRODUCCION=1 node scripts/preparar-original.mjs
    SVEA_PRODUCCION=1 npx astro build --outDir /tmp/svea-prod
    python3 scripts/chequeo-lanzamiento.py /tmp/svea-prod
"""
import json, re, sys, html
from pathlib import Path

DIST = Path(sys.argv[1] if len(sys.argv) > 1 else 'dist')
VIVO = 'https://sveaconsultores.cl'
paginas = json.load(open(Path(__file__).parent.parent / 'src/data/paginas.json', encoding='utf-8'))
rutas = ['/', '/gracias/'] + [p['ruta'] for p in paginas if p['ruta'] not in ('/', '/gracias/')]

# robots cambiado a propósito: la página de gracias no debe salir en Google
# (en el WordPress estaba indexable); paginas.json la marca noindex.
ROBOTS_A_PROPOSITO = {'/gracias/': 'noindex'}

GTM = 'GTM-NGVMRNDM'
GA4 = 'G-FWQ05WDLZ3'


def senales(h):
    """Lo que debe sobrevivir al cambio: formulario, robots y canónica."""
    h = html.unescape(h)
    s = set()
    if 'api.web3forms.com/submit' in h: s.add('Formulario → Web3Forms')
    s |= {'access_key ' + x[:8] for x in re.findall(r'name="access_key"\s+value="([^"]+)"', h)}
    s |= {'asunto id=' + x for x in re.findall(r'id="(dynamic-subject-[^"]+)"', h)}
    s |= {'from_name ' + x for x in re.findall(r'name="from_name"\s+value="([^"]+)"', h)}
    s |= {'Servicio ' + x for x in re.findall(r'name="Servicio"\s+value="([^"]+)"', h)}
    s |= {'form id=' + x for x in re.findall(r'<form[^>]+id="([^"]+)"', h)}
    s |= {'redirect ' + x for x in re.findall(r'name="redirect"\s+value="([^"]+)"', h)}
    rob = re.findall(r'<meta[^>]+name="robots"[^>]+content="([^"]+)"', h)
    # Rank Math escribe «follow, index, max-snippet…»: sólo importa index/noindex
    if rob: s.add('robots ' + ('noindex' if 'noindex' in rob[0].lower() else 'index'))
    can = re.findall(r'<link rel="canonical" href="([^"]+)"', h)
    if can: s.add('canonical ' + can[0])
    return s


def medicion(h):
    """Problemas de medición del sitio nuevo (vacío = bien)."""
    p = []
    n_gtm = len(re.findall(r"gtm\.js\?id='\+i\+dl[\s\S]{0,200}?'" + GTM + "'", h))
    n_ns = h.count('ns.html?id=' + GTM)
    n_ga4 = len(re.findall(r"gtag\('config',\s*'" + GA4 + r"'\)", h))
    n_lib = h.count('gtag/js?id=' + GA4)
    if n_gtm != 1: p.append(f'GTM {GTM}: {n_gtm} (se espera 1)')
    if n_ns != 1: p.append(f'<noscript> del GTM: {n_ns} (se espera 1)')
    if n_ga4 != 1: p.append(f"gtag('config','{GA4}'): {n_ga4} (se espera 1)")
    if n_lib != 1: p.append(f'gtag.js de {GA4}: {n_lib} (se espera 1)')
    etiquetas = sorted(set(re.findall(r'AW-\d+/[A-Za-z0-9_-]+', h)))
    if etiquetas: p.append('conversión de Ads inline (debe ir por GTM): ' + ', '.join(etiquetas))
    if 'send_to' in h: p.append('send_to inline (debe ir por GTM)')
    return p


def vivo(ruta):
    import subprocess
    r = subprocess.run(['curl', '-s', '-L', '-w', '\n%{http_code}', VIVO + ruta], capture_output=True, timeout=60)
    cuerpo, _, codigo = r.stdout.decode('utf-8', 'ignore').rpartition('\n')
    if codigo.strip() != '200':
        raise RuntimeError(f'HTTP {codigo.strip()} en el sitio vivo (URL nueva)')
    return cuerpo


problemas = 0
avisos = 0
for ruta in rutas:
    f = DIST / (ruta.strip('/') + '/index.html' if ruta != '/' else 'index.html')
    if not f.exists():
        print(f'✗ {ruta}  NO EXISTE en el sitio nuevo'); problemas += 1; continue
    nuevo = f.read_text(encoding='utf-8', errors='ignore')
    malos = medicion(nuevo)
    try:
        antes = senales(vivo(ruta))
    except Exception as e:
        antes = None
        aviso = f'no se pudo leer el sitio vivo ({e})'
    ahora = senales(nuevo)
    falta = [] if antes is None else sorted(antes - ahora)
    # canónica cambiada a propósito (24-sep): cada página apunta a sí misma
    if f'canonical {VIVO}{ruta}' in ahora:
        falta = [x for x in falta if not x.startswith('canonical ')]
    if ruta in ROBOTS_A_PROPOSITO and f'robots {ROBOTS_A_PROPOSITO[ruta]}' in ahora:
        falta = [x for x in falta if not x.startswith('robots ')]
    if falta or malos:
        problemas += 1
        print(f'✗ {ruta}')
        for x in malos: print(f'     medición: {x}')
        for x in falta: print(f'     falta: {x}')
    elif antes is None:
        avisos += 1
        print(f'? {ruta}  medición OK · {aviso}')
    else:
        print(f'✓ {ruta}')

print(f'\n{len(rutas)} URLs revisadas · {problemas} con problemas · {avisos} sin comparar con el vivo')
sys.exit(1 if problemas else 0)
