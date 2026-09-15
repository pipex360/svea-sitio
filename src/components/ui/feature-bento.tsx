/**
 * «Nuestros Servicios» en rejilla bento, con la foto de cada servicio al fondo.
 *
 * Adaptado del componente de 21st.dev. Cinco cambios:
 *
 * 1. Los degradados de color del original —azules, morados, rosas— se
 *    reemplazan por la foto que encabeza la página de cada servicio. Eran
 *    relleno decorativo; la foto dice de qué trata la tarjeta antes de leerla,
 *    y es la misma que verá quien pinche.
 * 2. Las seis tarjetas son enlaces, no cajas. En el original sólo una insinúa
 *    ser pulsable; aquí las seis llevan a su página.
 * 3. Cada tarjeta lleva su texto completo del sitio actual. El original mezcla
 *    tarjetas de cifras con tarjetas de texto; aquí todas son del mismo tipo,
 *    porque los seis servicios pesan lo mismo.
 * 4. Las filas crecen con el contenido (`minmax(280px,auto)`) en vez de medir
 *    280 px fijos: dos de las descripciones son largas y se cortarían.
 * 5. El punto que late del original va en blanco, no en verde.
 *
 * El primer servicio ocupa la tarjeta grande por ser el que más se busca: es
 * el que da la patente municipal, y del que cuelga el resto del trámite.
 *
 * No lleva estado: Astro lo dibuja en el servidor y no viaja JavaScript.
 */

import {
  BuildingIcon,
  FactoryIcon,
  FlameIcon,
  FlaskConicalIcon,
  type LucideIcon,
  SirenIcon,
  TruckIcon,
} from 'lucide-react';

const WP = 'https://sveaconsultores.cl/wp-content/uploads';

type Servicio = {
  titulo: string;
  descripcion: string;
  href: string;
  foto: string;
  alt: string;
  Icono: LucideIcon;
};

const SERVICIOS: Servicio[] = [
  {
    titulo: 'Calificación Técnica Industrial',
    descripcion:
      'Aseguramos que cumplas los estándares técnicos y normativos de la SEREMI de Salud, facilitando la obtención de tu patente municipal.',
    href: '/calificacion-tecnica-industrial/',
    foto: `${WP}/2025/03/chemical-plant.jpg`,
    alt: 'Planta química',
    Icono: FactoryIcon,
  },
  {
    titulo: 'Estudio de Carga de Combustible',
    descripcion:
      'Evaluamos el riesgo de incendio en instalaciones comerciales e industriales, calculando la carga de combustible según materiales.',
    href: '/estudio-de-carga-de-combustible/',
    foto: `${WP}/2025/03/warehouse-products-storage.jpg`,
    alt: 'Bodega con productos almacenados',
    Icono: FlameIcon,
  },
  {
    titulo: 'Manejo de Sustancias y Residuos Peligrosos',
    descripcion:
      'Garantizamos la seguridad, legalidad y sostenibilidad en el manejo de sustancias peligrosas, minimizando riesgos operativos.',
    href: '/manejo-de-residuos-peligrosos/',
    foto: `${WP}/2025/03/warehousing-engineering-concept-hazardous-waste-storage.jpg`,
    alt: 'Bodega de almacenamiento de residuos peligrosos',
    Icono: FlaskConicalIcon,
  },
  {
    titulo: 'Planes de Emergencia y Evacuación Industrial',
    descripcion:
      'Desarrollamos planes personalizados que aseguran la protección de personas y la continuidad ante situaciones de riesgo.',
    href: '/planes-de-emergencia-y-evacuacion/',
    foto: `${WP}/2025/03/basic-fire-fighting-and-evacuation-simulation-for-safety-in-emergency-situation.jpg`,
    alt: 'Simulacro de evacuación y combate de incendios',
    Icono: SirenIcon,
  },
  {
    titulo: 'Autorización Transporte de Residuos',
    descripcion:
      'Gestionamos la autorización para el transporte seguro de residuos peligrosos y no peligrosos, cumpliendo las normativas.',
    href: '/autorizacion-de-transporte-de-residuos/',
    foto: `${WP}/2025/03/dump-truck-driving-on-highway-scene-top-view-of-dump-truck-on-highway-in-summer-truckers-and-dump.jpg`,
    alt: 'Camión de transporte de residuos en carretera',
    Icono: TruckIcon,
  },
  {
    titulo: 'Planes de Emergencia y Evacuación para Condominios',
    descripcion:
      'Diseñamos planes a medida con protocolos claros para actuar con rapidez, resguardando la vida de los residentes.',
    href: '/planes-de-emergencia-y-evacuacion-condominios/',
    foto: `${WP}/2025/06/plan-emergencia-evacuacion.jpg`,
    alt: 'Plan de emergencia y evacuación de un edificio',
    Icono: BuildingIcon,
  },
];

function Tarjeta({
  servicio,
  numero,
  base,
  grande = false,
}: {
  servicio: Servicio;
  numero: number;
  base: string;
  grande?: boolean;
}) {
  const { titulo, descripcion, href, foto, alt, Icono } = servicio;

  return (
    <a
      href={`${base}${href}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl p-8 text-white no-underline ${
        grande ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <img
        src={foto}
        alt={alt}
        loading={numero <= 2 ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      {/* el velo sostiene el texto sobre cualquier foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/70 to-black/45"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <Icono className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          {grande && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-white motion-reduce:animate-none" />
              El más solicitado
            </span>
          )}
        </div>

        <div className={`mt-auto space-y-2 ${grande ? 'pt-10' : 'pt-8'}`}>
          <h3
            className={`font-bold tracking-tight ${grande ? 'text-3xl md:text-4xl' : 'text-xl'}`}
          >
            {titulo}
          </h3>
          <p
            className={`leading-relaxed text-white/85 ${grande ? 'max-w-lg text-lg' : 'text-sm'}`}
          >
            {descripcion}
          </p>
          <span className="inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-white">
            Conocer más
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

export function FeatureBento({ base = '' }: { base?: string }) {
  return (
    <div className="mx-auto grid max-w-7xl auto-rows-[minmax(280px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
      {SERVICIOS.map((servicio, i) => (
        <Tarjeta
          key={servicio.titulo}
          servicio={servicio}
          numero={i + 1}
          base={base}
          grande={i === 0}
        />
      ))}
    </div>
  );
}

export default FeatureBento;
