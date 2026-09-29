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

import { BookOpenIcon, CheckIcon, FlameIcon } from 'lucide-react';

import { Foto } from '@/components/ui/foto';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

/**
 * Tarjeta con foto de fondo, adaptada de profile-hover-card (21st.dev): la
 * foto a sangre, un velo y un aura blancos que suben desde abajo y el texto
 * encima. Sin framer-motion (el realce es CSS), el titular no se parte letra
 * por letra (Google lo leería roto), sin los seguidores inventados del
 * original, y toda la tarjeta es el enlace.
 */
function TarjetaFoto({
  href,
  base,
  foto,
  alt,
  icono: Icono,
  pildora,
  titulo,
  verificado = false,
  boton,
  arriba,
  children,
}: {
  href: string;
  base: string;
  foto: string;
  alt: string;
  icono: React.ComponentType<{ className?: string }>;
  pildora: string;
  titulo: string;
  verificado?: boolean;
  boton: string;
  /** en el teléfono, cuánta foto queda a la vista sobre la píldora */
  arriba: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group/tarjeta relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-[#d8d3c7] no-underline shadow-[0_18px_34px_-16px_rgba(55,47,36,0.35)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 sm:min-h-[520px]"
    >
      <Foto
        nombre={foto}
        alt={alt}
        tamano="(min-width: 1024px) 560px, 100vw"
        base={base}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover/tarjeta:scale-105 motion-reduce:transition-none"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
      {/* aura blanca detrás del título: aclara la foto justo donde empieza el texto */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[92%] bg-[radial-gradient(ellipse_95%_55%_at_35%_40%,rgba(255,255,255,0.85),rgba(255,255,255,0.45)_55%,transparent_85%)] sm:h-[85%] sm:bg-[radial-gradient(ellipse_90%_60%_at_30%_55%,rgba(255,255,255,0.85),rgba(255,255,255,0.4)_55%,transparent_80%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-white/90 via-white/60 to-transparent backdrop-blur-[1px]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/85 via-white/40 to-transparent backdrop-blur-sm" />

      <div className={cn('relative space-y-3 p-7 sm:space-y-4 sm:pt-7', arriba)}>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black">
          <Icono className="size-3.5" aria-hidden="true" />
          {pildora}
        </span>
        <h3 className="flex items-start gap-2 text-2xl font-bold tracking-tight text-black">
          {titulo}
          {verificado && (
            <span aria-hidden="true" className="mt-1.5 grid size-4 shrink-0 place-items-center rounded-full bg-svea text-white">
              <CheckIcon className="size-2.5" strokeWidth={3} />
            </span>
          )}
        </h3>
        <p className="text-base leading-relaxed text-black/75">{children}</p>
        <span className="flex h-12 w-full items-center justify-center rounded-full bg-black text-base font-medium text-white transition-colors duration-200 group-hover/tarjeta:bg-[#1f2937]">
          {boton}
        </span>
      </div>
    </a>
  );
}

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
