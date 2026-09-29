'use client';

/**
 * «Sigue por aquí», con las tarjetas con foto de fondo de la CTI y el ECC
 * (TarjetaFoto). Todos los enlaces y textos del original se conservan: los
 * que eran varios destinos en una tarjeta van como píldoras dentro de ella.
 */

import { BookOpenIcon, FactoryIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { TarjetaFoto } from '@/components/ui/tarjeta-foto';

export function PeSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <TarjetaFoto
              base={base}
              foto="instalacion-industrial-calificacion-tecnica-industrial"
              alt="Instalación industrial vista desde el aire, que requiere CTI y estudio de carga de combustible"
              icono={FactoryIcon}
              pildora="Servicios complementarios"
              titulo="¿Necesitas también CTI o Estudio de Carga de Combustible?"
              verificado
              acciones={[
                { texto: 'Conocer CTI', href: `${base}/calificacion-tecnica-industrial/` },
                { texto: 'Conocer ECC', href: `${base}/estudio-de-carga-de-combustible/` },
              ]}
              arriba="pt-14"
            >
              Muchas empresas que requieren un Plan de Emergencia también necesitan una Calificación
              Técnica Industrial (CTI) o un Estudio de Carga de Combustible (ECC). Te cotizamos todos
              los servicios juntos con condiciones preferenciales.
            </TarjetaFoto>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <TarjetaFoto
              href={`${base}/plan-de-emergencia-empresa-chile/`}
              base={base}
              foto="taller-metalmecanico-calificacion-tecnica-industrial"
              alt="Taller industrial, empresa que debe contar con plan de emergencia"
              icono={BookOpenIcon}
              pildora="Guía completa en nuestro blog"
              titulo="Plan de emergencia para empresas: qué debe incluir y cómo se elabora"
              boton="Leer guía"
              arriba="pt-40"
            >
              Normativa DS 594 y DS 44, multas de hasta 1.000 UTM (SEREMI), contenido obligatorio y proceso paso a paso.
            </TarjetaFoto>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default PeSiguiente;
