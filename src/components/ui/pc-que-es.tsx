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
  BadgeCheckIcon,
  Building2Icon,
  CalendarClockIcon,
  CircleParkingIcon,
  CloudRainWindIcon,
  CogIcon,
  ConciergeBellIcon,
  FileSignatureIcon,
  FlameIcon,
  GavelIcon,
  HomeIcon,
  SendIcon,
  ShieldAlertIcon,
  StoreIcon,
  TriangleAlertIcon,
  UsersIcon,
  UsersRoundIcon,
  ZapIcon,
} from 'lucide-react';

import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';
import { ServiceGrid, type Ficha } from '@/components/ui/service-grid';

/** Los cuatro párrafos del original: los dos primeros sobre qué es el plan
 *  y de qué se construye, con los condominios y la cordillera; los dos últimos sobre
 *  qué incluye y para qué sirve, con los edificios de Las Condes. */
const bloques = (): BloqueScroll[] => {
  const plan = {
    foto: 'condominios-santiago-cordillera-ley-21442',
    alt: 'Condominios de Santiago con la cordillera al fondo, comunidades que deben tener plan de emergencia según la Ley 21.442',
  };
  const escaleras = {
    foto: 'condominios-las-condes-plan-de-emergencia',
    alt: 'Edificios de departamentos de Las Condes vistos desde lo alto, condominios cuyo comité de administración aprueba el plan de emergencia',
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

const QUIENES: Ficha[] = [
  { nombre: 'Edificios residenciales', icono: Building2Icon },
  { nombre: 'Condominios horizontales', icono: HomeIcon },
  { nombre: 'Comités de administración', icono: UsersIcon },
  { nombre: 'Comunidades con alta concurrencia', icono: UsersRoundIcon },
  { nombre: 'Con subterráneos/estacionamientos', icono: CircleParkingIcon },
  { nombre: 'Con salas técnicas (caldera/generador)', icono: CogIcon },
  { nombre: 'Con locales en primer piso', icono: StoreIcon },
  { nombre: 'Conserjería 24/7', icono: ConciergeBellIcon },
];

/**
 * 3-nov (SEO tanda 1): «Qué exige la Ley 21.442». Cada punto sale TEXTUAL de
 * la guía /plan-de-emergencia-condominio-chile/ (tabla de normativa, FAQ y
 * «Multas y sanciones»): si la guía cambia, esto se revisa con ella.
 */
const LEY: Ficha[] = [
  { nombre: 'Plan obligatorio (art. 40)', descripcion: 'Todo condominio debe tener un plan de emergencia.', icono: BadgeCheckIcon },
  { nombre: 'Firma de un ingeniero en prevención de riesgos', descripcion: 'Lo elabora y suscribe; sin esa firma el plan no tiene validez legal.', icono: FileSignatureIcon },
  { nombre: 'Actualización', descripcion: 'Cuando cambian las condiciones de seguridad; el plan de evacuación, al menos una vez al año.', icono: CalendarClockIcon },
  { nombre: 'Copia a Bomberos y Carabineros', descripcion: 'Las actualizaciones, dentro de 15 días corridos desde su firma (DS 7, art. 35).', icono: SendIcon },
  { nombre: 'Multas al administrador (art. 88)', descripcion: 'De 1 a 4 UTM (menos graves) y de 5 a 10 UTM (graves y gravísimas).', icono: GavelIcon },
];

const EMERGENCIAS: Ficha[] = [
  { nombre: 'Incendios (departamentos/áreas comunes)', icono: FlameIcon },
  { nombre: 'Sismos', icono: ActivityIcon },
  { nombre: 'Amenazas externas / evacuación preventiva', icono: ShieldAlertIcon },
  { nombre: 'Cortes eléctricos y fallas críticas', icono: ZapIcon },
  { nombre: 'Accidentes en áreas comunes', icono: TriangleAlertIcon },
  { nombre: 'Eventos climáticos (inundación/viento)', icono: CloudRainWindIcon },
];


export function PcQueEs({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" id="que-es" aria-labelledby="titulo-que-es">
      <div className="mx-auto max-w-6xl">
        <Scroll01
          base={base}
          bloques={bloques()}
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

        <ServiceGrid
          className="mt-20"
          columnas="sm:grid-cols-3"
          titulo={
            <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
              ¿Qué exige la Ley 21.442 a tu condominio o edificio?
            </h3>
          }
          subtitulo="Aplica a todos los condominios y edificios de Chile. El comité de administración somete el plan a la asamblea de copropietarios y el administrador firma sus actualizaciones junto al presidente del comité."
          fichas={LEY}
        />
        <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-black/70">
          Para el detalle de lo que tu comunidad debe cumplir, lee nuestra{' '}
          <a href={`${base}/plan-de-emergencia-condominio-chile/`} className="font-semibold text-svea underline">
            guía completa de la Ley 21.442 para condominios
          </a>
          .
        </p>

        <ServiceGrid
          className="mt-20"
          columnas="sm:grid-cols-3 lg:grid-cols-4"
          titulo={
            <>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Quién necesita un Plan de Emergencia y Evacuación?
          </h3>
            </>
          }
          fichas={QUIENES}
        />

        <ServiceGrid
          className="mt-16"
          columnas="sm:grid-cols-3"
          titulo={
            <>
          <p className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Cobertura integral
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Qué tipos de emergencias cubre?
          </h3>
            </>
          }
          fichas={EMERGENCIAS}
        />
      </div>
    </section>
  );
}

export default PcQueEs;
