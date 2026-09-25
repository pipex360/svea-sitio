'use client';

/**
 * «¿Qué es la Autorización de Transporte de Residuos?», «¿Quién necesita la
 * autorización de transporte?» y «¿Qué tipos de residuos cubrimos?», con el
 * mismo formato que la CTI (cti-que-es.tsx): la definición con la foto fija
 * al lado y debajo las dos listas. Texto idéntico al WordPress.
 */
import {
  BuildingIcon,
  DropletIcon,
  FactoryIcon,
  FlaskConicalIcon,
  FuelIcon,
  HardHatIcon,
  HospitalIcon,
  RecycleIcon,
  Trash2Icon,
  TriangleAlertIcon,
  TruckIcon,
  WarehouseIcon,
  WrenchIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';

/** Los cuatro párrafos del original: los dos primeros sobre qué es el
 *  permiso, con el camión tolva cargado de escombros; los dos últimos sobre el riesgo de
 *  no tenerlo y lo que hace SVEA, con el camión cisterna y su rombo de peligro. */
const bloques = (): BloqueScroll[] => {
  const carretera = {
    foto: 'camion-tolva-escombros-transporte-residuos',
    alt: 'Camión tolva cargado de escombros, transporte de residuos que requiere autorización de la SEREMI de Salud',
  };
  const carga = {
    foto: 'camion-cisterna-transporte-residuos-peligrosos',
    alt: 'Camión cisterna con el rombo de materiales peligrosos, vehículo con autorización sanitaria de transporte de residuos',
  };
  return [
    {
      texto:
        'La Autorización de Transporte de Residuos es el permiso otorgado por la SEREMI de Salud que habilita a empresas y transportistas para trasladar residuos peligrosos y no peligrosos de manera legal y segura.',
      ...carretera,
    },
    {
      texto:
        'Este permiso es obligatorio para toda empresa que genere residuos y necesite transportarlos a un destino autorizado, ya sea para tratamiento, reciclaje o disposición final, conforme a las normativas sanitarias y ambientales vigentes.',
      ...carretera,
    },
    {
      texto:
        'Transportar residuos sin autorización expone a la empresa a multas, sumarios sanitarios y paralización de operaciones por parte de la autoridad sanitaria.',
      ...carga,
    },
    {
      texto:
        'En SVEA Consultores nos encargamos de todo el proceso: desde la clasificación de residuos hasta la obtención del permiso y la entrega de la documentación completa.',
      ...carga,
    },
  ];
};

const QUIENES = [
  { texto: 'Fábricas e industrias', icono: FactoryIcon },
  { texto: 'Centros de almacenamiento', icono: WarehouseIcon },
  { texto: 'Talleres industriales', icono: WrenchIcon },
  { texto: 'Empresas de construcción', icono: BuildingIcon },
  { texto: 'Empresas de transporte', icono: TruckIcon },
  { texto: 'Centros de salud', icono: HospitalIcon },
  { texto: 'Estaciones de servicio', icono: FuelIcon },
  { texto: 'Plantas de reciclaje', icono: RecycleIcon },
];

const TIPOS = [
  { texto: 'Residuos peligrosos (RESPEL)', icono: TriangleAlertIcon },
  { texto: 'Residuos industriales no peligrosos', icono: Trash2Icon },
  { texto: 'Aceites usados e hidrocarburos', icono: DropletIcon },
  { texto: 'Residuos químicos y solventes', icono: FlaskConicalIcon },
  { texto: 'Escombros y residuos de construcción', icono: HardHatIcon },
  { texto: 'Residuos hospitalarios y biomédicos', icono: HospitalIcon },
];

const item =
  'flex items-center gap-3 rounded-xl border border-border bg-hoja p-4 transition-colors duration-200 hover:border-black/30';

export function TrQueEs({ base = '' }: { base?: string }) {
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
              ¿Qué es la <span className="font-black text-svea">Autorización de Transporte de Residuos?</span>
            </h2>
          }
        />

        <Reveal className="mt-20">
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Quién necesita la autorización de transporte?
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUIENES.map(({ texto, icono: Icono }) => (
              <li key={texto} className={item}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-svea">
                  <Icono className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-black">{texto}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Cobertura integral
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-black md:text-2xl">
            ¿Qué tipos de residuos cubrimos?
          </h3>
          <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TIPOS.map(({ texto, icono: Icono }) => (
              <li key={texto} className={item}>
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

export default TrQueEs;
