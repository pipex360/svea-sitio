'use client';

/**
 * «Sigue por aquí»: la venta cruzada del Estudio de Carga de Combustible y
 * el enlace a la guía del blog, que en el WordPress eran dos franjas sueltas
 * separadas por las preguntas frecuentes.
 *
 * Las dos hacen lo mismo —mandar al visitante a otra página del sitio— así
 * que van juntas, una al lado de la otra. Los dos enlaces se conservan tal
 * cual; el de la guía conecta el servicio con su artículo.
 */

import { BookOpenIcon, FlameIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { TarjetaFoto } from '@/components/ui/tarjeta-foto';

export function CtiSiguiente({ base = '' }: { base?: string }) {
  return (
    <section className="bg-white px-6 py-20" aria-labelledby="titulo-siguiente">
      <div className="mx-auto max-w-6xl">
        <h2 id="titulo-siguiente" className="sr-only">
          Sigue por aquí
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <TarjetaFoto
              href={`${base}/estudio-de-carga-de-combustible/`}
              base={base}
              foto="bodega-estanterias-estudio-carga-combustible"
              alt="Bodega con estanterías evaluada en un Estudio de Carga de Combustible"
              icono={FlameIcon}
              pildora="Servicio complementario"
              titulo="¿Necesitas también un Estudio de Carga de Combustible?"
              verificado
              boton="Conocer ECC"
              arriba="pt-14"
            >
              La mayoría de las empresas que requieren Calificación Técnica Industrial también
              necesitan un Estudio de Carga de Combustible (ECC) para cumplir con la OGUC y la
              norma NCh 1916. Te cotizamos ambos servicios juntos con condiciones preferenciales.
            </TarjetaFoto>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <TarjetaFoto
              href={`${base}/calificacion-tecnica-industrial-chile/`}
              base={base}
              foto="inspeccion-planta-fiscalizacion-seremi"
              alt="Profesional revisa con su carpeta una planta industrial, evaluación para la calificación técnica industrial"
              icono={BookOpenIcon}
              pildora="Guía completa en nuestro blog"
              titulo="Calificación Técnica Industrial Chile: Guía Definitiva 2026"
              boton="Leer guía"
              arriba="pt-40"
            >
              Requisitos SEREMI, documentos, categorías de clasificación, plazos, costos y errores
              comunes que debes evitar.
            </TarjetaFoto>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default CtiSiguiente;
