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

import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';
import { ServiceGrid, type Ficha } from '@/components/ui/service-grid';

/** Los cuatro párrafos del original: los dos primeros sobre qué es el
 *  permiso, con el camión tolva descargando; los dos últimos sobre el riesgo de
 *  no tenerlo y lo que hace SVEA, con los semirremolques cisterna de acero. */
const bloques = (): BloqueScroll[] => {
  const carretera = {
    foto: 'camion-tolva-descarga-residuos-autorizados',
    alt: 'Camión tolva descargando residuos, transporte que requiere autorización de la SEREMI de Salud',
  };
  const carga = {
    foto: 'camion-cisterna-inflamable-transporte-residuos-peligrosos',
    alt: 'Camión cisterna con rombo de inflamable clase 3 y la leyenda «Transporta material inflamable», vehículo que requiere autorización sanitaria de transporte de residuos peligrosos',
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

const QUIENES: Ficha[] = [
  { nombre: 'Fábricas e industrias', icono: FactoryIcon },
  { nombre: 'Centros de almacenamiento', icono: WarehouseIcon },
  { nombre: 'Talleres industriales', icono: WrenchIcon },
  { nombre: 'Empresas de construcción', icono: BuildingIcon },
  { nombre: 'Empresas de transporte', icono: TruckIcon },
  { nombre: 'Centros de salud', icono: HospitalIcon },
  { nombre: 'Estaciones de servicio', icono: FuelIcon },
  { nombre: 'Plantas de reciclaje', icono: RecycleIcon },
];

const TIPOS: Ficha[] = [
  { nombre: 'Residuos peligrosos (RESPEL)', icono: TriangleAlertIcon },
  { nombre: 'Residuos industriales no peligrosos', icono: Trash2Icon },
  { nombre: 'Aceites usados e hidrocarburos', icono: DropletIcon },
  { nombre: 'Residuos químicos y solventes', icono: FlaskConicalIcon },
  { nombre: 'Escombros y residuos de construcción', icono: HardHatIcon },
  { nombre: 'Residuos hospitalarios y biomédicos', icono: HospitalIcon },
];


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

        <ServiceGrid
          className="mt-20"
          columnas="sm:grid-cols-3 lg:grid-cols-4"
          titulo={
            <>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Quién necesita la autorización de transporte?
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
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Cobertura integral
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Qué tipos de residuos cubrimos?
          </h3>
            </>
          }
          fichas={TIPOS}
        />
      </div>
    </section>
  );
}

export default TrQueEs;
