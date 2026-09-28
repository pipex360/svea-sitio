/**
 * Rejilla de servicios con realce al pasar el cursor.
 *
 * Adaptado del componente de 21st.dev. Tres cambios respecto del original:
 *
 * 1. Los iconos son de lucide-react, no de @tabler/icons-react. El menú de
 *    arriba ya usa lucide para estos mismos seis servicios; dos juegos de
 *    iconos distintos para el mismo servicio en la misma pantalla se nota.
 * 2. Los bordes los pone la rejilla (borde izquierdo y superior en el
 *    contenedor, derecho e inferior en cada celda) en vez de calcularse por
 *    índice. Así cuadran igual con una, dos o tres columnas; la fórmula por
 *    índice del original sólo cuadra a cuatro columnas.
 * 3. El acento del realce es negro, donde el original ponía azul.
 *
 * Los textos son los del sitio actual, palabra por palabra, y cada tarjeta
 * conserva su enlace a la página del servicio: son enlaces internos que el
 * SEO ya tiene contados.
 *
 * No lleva estado ni efectos: Astro lo dibuja en el servidor y no viaja
 * JavaScript al navegador. El realce es CSS.
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
import * as React from 'react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

type Servicio = {
  titulo: string;
  descripcion: string;
  href: string;
  Icono: LucideIcon;
};

const SERVICIOS: Servicio[] = [
  {
    titulo: 'Calificación Técnica Industrial',
    descripcion:
      'Aseguramos que cumplas los estándares técnicos y normativos de la SEREMI de Salud, facilitando la obtención de tu patente municipal.',
    href: '/calificacion-tecnica-industrial/',
    Icono: FactoryIcon,
  },
  {
    titulo: 'Estudio de Carga de Combustible',
    descripcion:
      'Evaluamos el riesgo de incendio en instalaciones comerciales e industriales, calculando la carga de combustible según materiales.',
    href: '/estudio-de-carga-de-combustible/',
    Icono: FlameIcon,
  },
  {
    titulo: 'Manejo de Sustancias y Residuos Peligrosos',
    descripcion:
      'Garantizamos la seguridad, legalidad y sostenibilidad en el manejo de sustancias peligrosas, minimizando riesgos operativos.',
    href: '/manejo-de-residuos-peligrosos/',
    Icono: FlaskConicalIcon,
  },
  {
    titulo: 'Planes de Emergencia y Evacuación Industrial',
    descripcion:
      'Desarrollamos planes personalizados que aseguran la protección de personas y la continuidad ante situaciones de riesgo.',
    href: '/planes-de-emergencia-y-evacuacion/',
    Icono: SirenIcon,
  },
  {
    titulo: 'Autorización Transporte de Residuos',
    descripcion:
      'Gestionamos la autorización para el transporte seguro de residuos peligrosos y no peligrosos, cumpliendo las normativas.',
    href: '/autorizacion-de-transporte-de-residuos/',
    Icono: TruckIcon,
  },
  {
    titulo: 'Planes de Emergencia y Evacuación para Condominios',
    descripcion:
      'Diseñamos planes a medida con protocolos claros para actuar con rapidez, resguardando la vida de los residentes.',
    href: '/planes-de-emergencia-y-evacuacion-condominios/',
    Icono: BuildingIcon,
  },
];

export function FeaturesSectionWithHoverEffects({
  base = '',
  className,
}: {
  base?: string;
  className?: string;
}) {
  return (
    // El panel: un bloque blanco con esquinas redondas sobre la hoja gris de
    // la sección. La rejilla va un píxel más ancha y más alta (-mr-px, -mb-px)
    // para que el filete derecho de la última columna y el inferior de la
    // última fila caigan fuera y los recorte el panel: así ningún borde se
    // duplica con el del panel, en cualquier número de columnas.
    <div
      className={cn(
        'relative z-10 mx-auto max-w-7xl overflow-hidden rounded-2xl border border-border bg-white',
        className,
      )}
    >
      <div className="-mb-px -mr-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {SERVICIOS.map((servicio, i) => (
          <Reveal key={servicio.titulo} delay={i * 0.08} className="flex">
            <Servicio {...servicio} numero={i + 1} base={base} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

const Servicio = ({
  titulo,
  descripcion,
  href,
  Icono,
  numero,
  base,
}: Servicio & { numero: number; base: string }) => (
  <a
    href={`${base}${href}`}
    className="group/servicio relative flex w-full flex-col border-b border-r border-border bg-white py-10 no-underline transition-colors"
  >
    {/* el realce entra desde abajo, en negro muy diluido */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-black/[0.07] to-transparent opacity-0 transition duration-200 group-hover/servicio:opacity-100"
    />

    <div className="relative z-10 mb-4 flex items-center gap-3 px-8">
      <Icono className="h-6 w-6 text-[#677c77]" strokeWidth={1.5} aria-hidden="true" />
      <span className="text-xs font-medium tabular-nums tracking-widest text-black/45">
        {String(numero).padStart(2, '0')}
      </span>
    </div>

    <h3 className="relative z-10 mb-2 px-8 text-lg font-bold normal-case tracking-normal text-black">
      {/* la barra de la izquierda crece y se tiñe al pasar el cursor */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 my-auto h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-border transition-all duration-200 group-hover/servicio:h-10 group-hover/servicio:bg-svea"
      />
      <span className="inline-block transition duration-200 group-hover/servicio:translate-x-2">
        {titulo}
      </span>
    </h3>

    <p className="relative z-10 px-8 text-sm leading-relaxed text-black/80">
      {descripcion}
    </p>

    <span className="relative z-10 mt-auto px-8 pt-6 text-sm font-medium text-black">
      Conocer más
      <span
        aria-hidden="true"
        className="ml-1 inline-block transition-transform duration-200 group-hover/servicio:translate-x-1"
      >
        →
      </span>
    </span>
  </a>
);

export default FeaturesSectionWithHoverEffects;
