#!/usr/bin/env python3
"""Chequeo antes de cambiar el dominio al sitio nuevo.

Compara, URL por URL, lo que hoy publica WordPress contra el sitio nuevo
construido en modo producción, y lista todo lo que se perdería: medición
(GTM, GA4, Google Ads y sus etiquetas de conversión), formularios (Web3Forms,
asunto dinámico, from_name, Servicio) y SEO (canonical, robots, que la URL exista).

No modifica nada. Uso:

    SVEA_PRODUCCION=1 npx astro build --outDir /tmp/svea-prod
    python3 scripts/chequeo-lanzamiento.py /tmp/svea-prod
"""
import json, re, sys, html
from pathlib import Path

DIST = Path(sys.argv[1] if len(sys.argv) > 1 else 'dist')
VIVO = 'https://sveaconsultores.cl'
paginas = json.load(open(Path(__file__).parent.parent / 'src/data/paginas.json', encoding='utf-8'))
rutas = ['/', '/gracias/'] + [p['ruta'] for p in paginas if p['ruta'] not in ('/', '/gracias/')]

def senales(h):
    h = html.unescape(h)
    s = set()
    s |= {'GTM ' + x for x in re.findall(r'GTM-[A-Z0-9]{6,}', h)}
    s |= {'GA4 ' + x for x in re.findall(r'\bG-[A-Z0-9]{8,}', h)}
    s |= {'Ads ' + x for x in re.findall(r'AW-\d+(?:/[A-Za-z0-9_-]+)?', h)}
    if 'api.web3forms.com/submit' in h: s.add('Formulario → Web3Forms')
    s |= {'access_key ' + x[:8] for x in re.findall(r'name="access_key"\s+value="([^"]+)"', h)}
    s |= {'asunto id=' + x for x in re.findall(r'id="(dynamic-subject-[^"]+)"', h)}
    s |= {'from_name ' + x for x in re.findall(r'name="from_name"\s+value="([^"]+)"', h)}
    s |= {'Servicio ' + x for x in re.findall(r'name="Servicio"\s+value="([^"]+)"', h)}
    s |= {'form id=' + x for x in re.findall(r'<form[^>]+id="([^"]+)"', h)}
    s |= {'redirect ' + x for x in re.findall(r'name="redirect"\s+value="([^"]+)"', h)}
    can = re.findall(r'<link rel="canonical" href="([^"]+)"', h)
    if can: s.add('canonical ' + can[0])
    return s

def vivo(ruta):
    import subprocess
    r = subprocess.run(['curl', '-s', '-L', '-w', '\n%{http_code}', VIVO + ruta], capture_output=True, timeout=60)
    cuerpo, _, codigo = r.stdout.decode('utf-8', 'ignore').rpartition('\n')
    if codigo.strip() != '200':
        raise RuntimeError(f'HTTP {codigo.strip()} en el sitio vivo (URL nueva)')
    return cuerpo

problemas = 0
for ruta in rutas:
    f = DIST / (ruta.strip('/') + '/index.html' if ruta != '/' else 'index.html')
    if not f.exists():
        print(f'✗ {ruta}  NO EXISTE en el sitio nuevo'); problemas += 1; continue
    try:
        antes = senales(vivo(ruta))
    except Exception as e:
        print(f'? {ruta}  no se pudo leer el sitio vivo ({e})'); continue
    ahora = senales(f.read_text(encoding='utf-8', errors='ignore'))
    falta = sorted(antes - ahora)
    # canónica cambiada a propósito (24-sep): cada página apunta a sí misma
    if f'canonical {VIVO}{ruta}' in ahora:
        falta = [x for x in falta if not x.startswith('canonical ')]
    if falta:
        problemas += 1
        print(f'✗ {ruta}')
        for x in falta: print(f'     falta: {x}')
    else:
        print(f'✓ {ruta}')

print(f'\n{len(rutas)} URLs revisadas · {problemas} con problemas')
sys.exit(1 if problemas else 0)
