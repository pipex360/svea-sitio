'use client';

/**
 * «Sigue por aquí»: la venta cruzada de la Calificación Técnica Industrial y
 * el enlace a la guía del blog, con las mismas tarjetas con foto de fondo de
 * la CTI (TarjetaFoto). Los dos enlaces y sus textos se conservan tal cual.
 *
 * 29-sep: debajo de las dos tarjetas, las tres guías del clúster de carga de
 * combustible (GUIAS_ECC), para que la página de servicio sea el pilar que
 * enlaza a todas.
 */

import { BookOpenIcon, CalculatorIcon, ClipboardListIcon, FactoryIcon, ShieldIcon, type LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { TarjetaFoto } from '@/components/ui/tarjeta-foto';

/** Las tres guías del clúster del estudio de carga de combustible. */
export const GUIAS_ECC: { href: string; titulo: string; texto: string; icono: LucideIcon }[] = [
  {
    href: '/calculo-carga-de-fuego-nch-1916/',
    titulo: 'Cómo se calcula la carga de fuego según la NCh 1916',
    texto: 'Fórmula, calores de combustión, densidad media y puntual, y un ejemplo numérico de una bodega.',
    icono: CalculatorIcon,
  },
  {
    href: '/cuando-piden-estudio-de-carga-de-combustible/',
    titulo: 'Cuándo te piden el estudio de carga de combustible',
    texto: 'DOM, SEREMI de Salud, patente municipal, bodegas con sustancias peligrosas y seguros.',
    icono: ClipboardListIcon,
  },
  {
    href: '/resistencia-al-fuego-oguc/',
    titulo: 'Resistencia al fuego según la OGUC',
    texto: 'Tipos a, b, c y d, la tabla del art. 4.3.3 y cómo se determina el tipo de una bodega.',
    icono: ShieldIcon,
  },
];

export function EccSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <TarjetaFoto
              href={`${base}/calificacion-tecnica-industrial/`}
              base={base}
              foto="instalacion-industrial-calificacion-tecnica-industrial"
              alt="Instalación industrial vista desde el aire, que requiere calificación técnica industrial"
              icono={FactoryIcon}
              pildora="Servicio complementario"
              titulo="¿Necesitas también una Calificación Técnica Industrial?"
              verificado
              boton="Conocer CTI"
              arriba="pt-14"
            >
              La mayoría de las empresas que requieren Estudio de Carga de Combustible también
              necesitan una Calificación Técnica Industrial (CTI) para obtener su patente municipal.
              Te cotizamos ambos servicios juntos con condiciones preferenciales.
            </TarjetaFoto>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <TarjetaFoto
              href={`${base}/estudio-de-carga-combustible-chile/`}
              base={base}
              foto="bodega-centro-logistico-carga-combustible"
              alt="Centro logístico con mercadería almacenada, objeto de un estudio de carga de combustible"
              icono={BookOpenIcon}
              pildora="Guía completa 2026"
              titulo="Estudio de Carga Combustible en Chile: Todo lo que necesitas saber"
              boton="Leer guía"
              arriba="pt-40"
            >
              Normativa OGUC, categorías de resistencia al fuego, metodología NCh 1916, cuándo es
              obligatorio y errores comunes.
            </TarjetaFoto>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-6 rounded-2xl border border-black/10 bg-[#f6f7f5] p-6 md:p-8">
            <h3 className="text-lg font-semibold tracking-tight text-black md:text-xl">
              Más guías sobre el estudio de carga de combustible
            </h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {GUIAS_ECC.map((g) => (
                <li key={g.href} className="m-0 list-none p-0">
                  <a
                    href={`${base}${g.href}`}
                    className="group flex h-full flex-col gap-2 rounded-xl border border-black/10 bg-white p-4 no-underline transition-colors hover:border-black/30"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-black">
                      <g.icono className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      {g.titulo}
                    </span>
                    <span className="text-[13px] leading-snug text-black/70">{g.texto}</span>
                    <span className="mt-auto text-sm font-semibold text-black underline-offset-4 group-hover:underline">Leer guía →</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default EccSiguiente;
