'use client';

/**
 * «¿Qué es un Plan de Emergencia y Evacuación para Condominios?», «¿Quién
 * necesita un Plan de Emergencia y Evacuación?» y «¿Qué tipos de emergencias
 * cubre?», con el mismo formato que la CTI y el ECC (cti-que-es.tsx,
 * ecc-que-es.tsx): la definición con la foto fija al lado, debajo los nueve
 * tipos de comunidad y los seis tipos de emergencia. Texto idéntico al
 * WordPress.
 */
import {
  ActivityIcon,
  Building2Icon,
  CircleParkingIcon,
  CloudRainWindIcon,
  CogIcon,
  ConciergeBellIcon,
  FlameIcon,
  HomeIcon,
  ShieldAlertIcon,
  StoreIcon,
  TriangleAlertIcon,
  UsersIcon,
  UsersRoundIcon,
  ZapIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';

/** Los cuatro párrafos del original: los dos primeros sobre qué es el plan
 *  y de qué se construye, con el plan de evacuación; los dos últimos sobre
 *  qué incluye y para qué sirve, con las escaleras de emergencia. */
const bloques = (base: string): BloqueScroll[] => {
  const plan = {
    media: `${base}/img/pc/plan-emergencia-evacuacion.webp`,
    alt: 'Plan de Emergencia y Evacuación para Condominios - SVEA Consultores',
  };
  const escaleras = {
    media: `${base}/img/pc/escaleras-de-emergencia.webp`,
    alt: 'Escaleras de emergencia en condominio - SVEA Consultores',
  };
  return [
    {
      texto:
        'El Plan de Emergencia y Evacuación para Condominios es un documento técnico-operativo que define cómo debe actuar la comunidad ante emergencias, priorizando la seguridad de los residentes, visitas y personal del edificio.',
      ...plan,
    },
    {
      texto:
        'Se construye desde un análisis de riesgos del recinto (torres, pisos, escaleras, subterráneos, salas técnicas, accesos) y contempla amenazas frecuentes como incendios, sismos, fallas eléctricas, fugas y otras contingencias.',
      ...plan,
    },
    {
      texto:
        'Incluye rutas y procedimientos de evacuación, puntos de encuentro, roles para brigadas/encargados, comunicación interna y acciones preventivas para disminuir el riesgo y acelerar la respuesta.',
      ...escaleras,
    },
    {
      texto:
        'Su implementación ayuda a reducir incidentes, ordenar la evacuación y demostrar gestión responsable por parte del Comité y la Administración.',
      ...escaleras,
    },
  ];
};

const QUIENES = [
  { texto: 'Edificios residenciales', icono: Building2Icon },
  { texto: 'Condominios horizontales', icono: HomeIcon },
  { texto: 'Comités de administración', icono: UsersIcon },
  { texto: 'Comunidades con alta concurrencia', icono: UsersRoundIcon },
  { texto: 'Con subterráneos/estacionamientos', icono: CircleParkingIcon },
  { texto: 'Con salas técnicas (caldera/generador)', icono: CogIcon },
  { texto: 'Con locales en primer piso', icono: StoreIcon },
  { texto: 'Conserjería 24/7', icono: ConciergeBellIcon },
];

const EMERGENCIAS = [
  { texto: 'Incendios (departamentos/áreas comunes)', icono: FlameIcon },
  { texto: 'Sismos', icono: ActivityIcon },
  { texto: 'Amenazas externas / evacuación preventiva', icono: ShieldAlertIcon },
  { texto: 'Cortes eléctricos y fallas críticas', icono: ZapIcon },
  { texto: 'Accidentes en áreas comunes', icono: TriangleAlertIcon },
  { texto: 'Eventos climáticos (inundación/viento)', icono: CloudRainWindIcon },
];

const ficha =
  'flex items-center gap-3 rounded-xl border border-border bg-hoja p-4 transition-colors duration-200 hover:border-black/30';

export function PcQueEs({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" id="que-es" aria-labelledby="titulo-que-es">
      <div className="mx-auto max-w-6xl">
        <Scroll01
          bloques={bloques(base)}
          encabezado={
            <h2
              id="titulo-que-es"
              className="mb-6 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
            >
              ¿Qué es un{' '}
              <span className="font-black text-svea">Plan de Emergencia y Evacuación para Condominios?</span>
            </h2>
          }
        />

        <Reveal className="mt-20">
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Quién necesita un Plan de Emergencia y Evacuación?
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUIENES.map(({ texto, icono: Icono }) => (
              <li key={texto} className={ficha}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-svea">
                  <Icono className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-black">{texto}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Cobertura integral
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Qué tipos de emergencias cubre?
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EMERGENCIAS.map(({ texto, icono: Icono }) => (
              <li key={texto} className={ficha}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-svea">
                  <Icono className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-black">{texto}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default PcQueEs;
