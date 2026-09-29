'use client';

/**
 * «Sigue por aquí»: la venta cruzada de la Calificación Técnica Industrial y
 * el enlace a la guía del blog, con las mismas tarjetas con foto de fondo de
 * la CTI (TarjetaFoto). Los dos enlaces y sus textos se conservan tal cual.
 */

import { BookOpenIcon, FactoryIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { TarjetaFoto } from '@/components/ui/tarjeta-foto';

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
      </div>
    </section>
  );
}

export default EccSiguiente;
