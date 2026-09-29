'use client';

/**
 * «Sigue por aquí», con las tarjetas con foto de fondo de la CTI y el ECC
 * (TarjetaFoto). Todos los enlaces y textos del original se conservan: los
 * que eran varios destinos en una tarjeta van como píldoras dentro de ella.
 */

import { BookOpenIcon, Building2Icon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { TarjetaFoto } from '@/components/ui/tarjeta-foto';

export function PcSiguiente({ base = '' }: { base?: string }) {
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
              foto="brigada-simulacro-incendio-plan-de-emergencia"
              alt="Brigada en un simulacro de incendio, parte de un plan de emergencia"
              icono={Building2Icon}
              pildora="Servicios complementarios"
              titulo="¿Tu condominio tiene áreas comerciales, bodegas o salas técnicas?"
              verificado
              acciones={[
                { texto: 'Ver Plan Industrial', href: `${base}/planes-de-emergencia-y-evacuacion/` },
                { texto: 'Ver Estudio Carga de Combustible', href: `${base}/estudio-de-carga-de-combustible/` },
              ]}
              arriba="pt-14"
            >
              Si tu comunidad cuenta con locales, bodegas o zonas con mayor riesgo (calderas,
              generadores, estacionamientos subterráneos), podemos apoyarte con servicios
              complementarios según el caso.
            </TarjetaFoto>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <TarjetaFoto
              href={`${base}/plan-de-emergencia-condominio-chile/`}
              base={base}
              foto="senal-salida-evacuacion-plan-emergencia"
              alt="Señalética de salida de evacuación de un plan de emergencia"
              icono={BookOpenIcon}
              pildora="Guía completa en nuestro blog"
              titulo="Plan de Emergencia Condominio Chile: Guía Definitiva 2026"
              boton="Leer guía"
              arriba="pt-40"
            >
              Ley 21.442, multas de 1 a 10 UTM, contenido obligatorio, responsables y proceso paso a paso.
            </TarjetaFoto>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default PcSiguiente;
