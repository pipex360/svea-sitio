import { createRequire } from 'node:module'; const sharp = createRequire(process.cwd() + '/package.json')('sharp');
import { writeFileSync, statSync } from 'node:fs';
const S = process.argv[2];
const U = 'https://sveaconsultores.cl/wp-content/uploads/';
// original -> [destino (relativo a /img/), nombre nuevo o null si ya existe]
const fotos = {
  '2025/03/truck-with-excavator-loading-for-removal-of-waste-building-demolition-debris-construction.jpg': 'camion-excavadora-residuos',
  '2025/03/dump-truck-driving-on-highway-scene-top-view-of-dump-truck-on-highway-in-summer-truckers-and-dump.jpg': 'camion-tolva-carretera',
  '2025/03/petrochemical-oil-refinery-in-bangkok-city-thaila-2024-10-18-22-56-40-utc-scaled.jpg': 'refineria-petroquimica',
  '2025/03/aerial-view-of-large-commercial-distribution-center-with-many-trucks.jpg': 'centro-distribucion-aereo',
  '2025/03/chemical-oil-refinery-plant-power-plant-and-metal-2024-12-08-00-52-34-utc-scaled.jpg': 'planta-quimica',
  '2025/03/empty-warehouse-in-logistic-center-warehouse-for-storage-and-distribution-centers-.jpg': 'bodega-centro-logistico',
  '2025/03/gaseous-substances-container-row-.jpg': 'contenedores-sustancias-gaseosas',
  '2025/03/warehousing-engineering-concept-hazardous-waste-storage.jpg': 'bodega-residuos-peligrosos',
  '2025/03/emergency-exit-sign-on-the-platform-of-the-railway-repair-station-.jpg': 'senal-salida-emergencia',
  '2025/03/basic-fire-fighting-and-evacuation-simulation-for-safety-in-emergency-situation.jpg': 'simulacro-evacuacion',
  '2025/06/Sento-Angamos-scaled-1.jpg': 'edificio-sento-angamos',
  '2025/03/warehouse-products-storage.jpg': 'bodega-productos',
  '2025/11/logo_25_m.png': 'logo-25m',
};
const yaEstan = {
  '2025/11/gespania-300x152-1.webp': 'clientes/gespania.webp',
  '2025/11/LOGO_GrupoMBO_Nuevo_4.png': 'clientes/grupo-mbo.webp',
  '2025/11/Logo-nuevopudahuel.png': 'clientes/nuevo-pudahuel.webp',
  '2025/11/logo_nature-300x220-1.png': 'clientes/natures-farm.webp',
  '2025/11/logo_comprimido_big.972a9837.png': 'clientes/blt-mini-bodegas.webp',
  '2025/11/DBsantasalo_logo.png': 'clientes/db-santasalo.webp',
  '2026/02/animalservices_sl.png': 'clientes/animal-services.webp',
  '2026/02/lira.png': 'clientes/lira.webp',
  '2026/02/Logo-Fuchs-Lubricants-SpA-exp-2024.jpg': 'clientes/fuchs.webp',
  '2026/02/DelArt-Chocolat-11.webp': 'clientes/delart-chocolat.webp',
  '2026/02/novametal.png': 'clientes/novametal.webp',
  '2025/03/Diseno_sin_titulo-removebg-preview.png': 'logo-svea.webp',
};
const mapa = {};
for (const [orig, nombre] of Object.entries(fotos)) {
  const src = `${S}/dl/${orig.split('/').pop()}`;
  const dest = `mejoras/img/articulos/${nombre}.webp`;
  const logo = nombre.startsWith('logo');
  let q = logo ? 90 : 72, info;
  for (;;) {
    info = await sharp(src).rotate().resize({ width: logo ? 400 : 1200, withoutEnlargement: true }).webp({ quality: q, effort: 6 }).toFile(dest);
    if (statSync(dest).size <= 115 * 1024 || q <= 40) break;
    q -= 6;
  }
  mapa[U + orig] = { ruta: `/img/articulos/${nombre}.webp`, ancho: info.width, alto: info.height };
  console.log(nombre, info.width, info.height, Math.round(statSync(dest).size / 1024) + ' KB', 'q' + q);
}
for (const [orig, dest] of Object.entries(yaEstan)) {
  const m = await sharp(`mejoras/img/${dest}`).metadata();
  mapa[U + orig] = { ruta: `/img/${dest}`, ancho: m.width, alto: m.height };
}
writeFileSync(`${S}/imagenes.json`, JSON.stringify(mapa, null, 2));
