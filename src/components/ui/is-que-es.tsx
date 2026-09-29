'use client';

/**
 * «¿Qué es el Informe Sanitario Favorable?» y «¿Quién necesita este
 * servicio?», con el mismo formato que la CTI y el ECC (ecc-que-es.tsx): la
 * definición con la foto fija al lado y debajo los ocho tipos de
 * establecimiento. Aquí cada tipo trae su descripción, como en el WordPress.
 * Texto idéntico al original.
 */
import {
  BuildingIcon,
  FactoryIcon,
  GraduationCapIcon,
  StethoscopeIcon,
  StoreIcon,
  UtensilsIcon,
  WarehouseIcon,
  WrenchIcon,
} from 'lucide-react';

import { Scroll01, type BloqueScroll } from '@/components/ui/scroll-01';
import { ServiceGrid, type Ficha } from '@/components/ui/service-grid';

/** Los tres párrafos del original: los dos primeros sobre qué es el informe,
 *  con la bodega; el último sobre lo que hace SVEA, con la escena industrial. */
const bloques = (): BloqueScroll[] => {
  const bodega = {
    foto: 'cocina-industrial-acero-informe-sanitario',
    alt: 'Cocina industrial de acero inoxidable, establecimiento que requiere informe sanitario de la SEREMI de Salud',
  };
  const industria = {
    foto: 'manipulacion-alimentos-informe-sanitario',
    alt: 'Operaria con delantal blanco y guantes en una planta de alimentos evaluada para el informe sanitario',
  };
  return [
    {
      texto:
        'El Informe Sanitario Favorable es el documento emitido por la SEREMI de Salud que certifica que un establecimiento cumple con las condiciones sanitarias, ambientales y de seguridad necesarias para su funcionamiento.',
      ...bodega,
    },
    {
      texto:
        'Este informe es un requisito obligatorio para la obtención de la patente municipal en la mayoría de las actividades comerciales e industriales. Sin él, la municipalidad no puede otorgar la autorización de funcionamiento.',
      ...bodega,
    },
    {
      texto:
        'En SVEA Consultores nos encargamos de todo el proceso: desde la evaluación inicial de tu establecimiento hasta la resolución de la SEREMI, asegurando el cumplimiento de toda la normativa vigente.',
      ...industria,
    },
  ];
};

const QUIENES: Ficha[] = [
  {
    nombre: 'Industrias y fábricas',
    descripcion: 'Plantas de producción, manufactura y procesamiento industrial.',
    icono: FactoryIcon,
  },
  {
    nombre: 'Bodegas y centros de distribución',
    descripcion: 'Almacenamiento, logística y distribución de productos.',
    icono: WarehouseIcon,
  },
  {
    nombre: 'Talleres mecánicos e industriales',
    descripcion: 'Talleres de reparación, mantención y servicios técnicos.',
    icono: WrenchIcon,
  },
  {
    nombre: 'Locales comerciales',
    descripcion: 'Tiendas, supermercados, ferreterías y comercio en general.',
    icono: StoreIcon,
  },
  {
    nombre: 'Restaurantes y servicios de alimentación',
    descripcion: 'Cocinas, cafeterías, panaderías y servicios de catering.',
    icono: UtensilsIcon,
  },
  {
    nombre: 'Centros médicos y clínicas',
    descripcion: 'Consultas, laboratorios, centros de salud y clínicas veterinarias.',
    icono: StethoscopeIcon,
  },
  {
    nombre: 'Establecimientos educacionales',
    descripcion: 'Colegios, jardines infantiles, institutos y universidades.',
    icono: GraduationCapIcon,
  },
  {
    nombre: 'Cualquier actividad con patente',
    descripcion: 'Todo establecimiento que requiera patente municipal para funcionar.',
    icono: BuildingIcon,
  },
];


const copete =
  'mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]';

export function IsQueEs({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" id="que-es" aria-labelledby="titulo-que-es">
      <div className="mx-auto max-w-6xl">
        <Scroll01
          base={base}
          bloques={bloques()}
          encabezado={
            <>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
                Definición
              </p>
              <h2
                id="titulo-que-es"
                className="mb-6 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
              >
                ¿Qué es el Informe <span className="font-black text-svea">Sanitario Favorable?</span>
              </h2>
            </>
          }
        />

        <ServiceGrid
          className="mt-20"
          columnas="sm:grid-cols-3 lg:grid-cols-4"
          titulo={
            <>
          <p className={copete}>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Aplicabilidad
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h3 className="text-balance text-2xl font-bold tracking-tight text-black md:text-3xl">
            ¿Quién necesita este servicio?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-black/65">
            El informe sanitario favorable es requerido por una amplia variedad de establecimientos que
            necesitan obtener o renovar su patente municipal.
          </p>
            </>
          }
          fichas={QUIENES}
        />
      </div>
    </section>
  );
}

export default IsQueEs;
