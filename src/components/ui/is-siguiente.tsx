'use client';

/**
 * «Sigue por aquí», con las tarjetas con foto de fondo de la CTI y el ECC
 * (TarjetaFoto). Todos los enlaces y textos del original se conservan: los
 * que eran varios destinos en una tarjeta van como píldoras dentro de ella.
 */

import { BookOpenIcon, ShieldCheckIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import { TarjetaFoto } from '@/components/ui/tarjeta-foto';

const GUIAS = [
  { texto: '¿Qué es el Informe Sanitario? Quién lo necesita y cómo se tramita', ruta: '/que-es-informe-sanitario/' },
  { texto: 'Patente definitiva: qué permisos de la SEREMI necesitas', ruta: '/patente-definitiva-permisos-seremi/' },
];

const ENLACES = [
  {
    titulo: 'Calificación Técnica Industrial',
    descripcion: 'Clasificación de tu actividad industrial ante la SEREMI de Salud según su nivel de riesgo ambiental.',
    ruta: '/calificacion-tecnica-industrial/',
  },
  {
    titulo: 'Plan de Emergencia Industrial',
    descripcion: 'Plan de emergencia y evacuación exigido para establecimientos industriales y comerciales.',
    ruta: '/planes-de-emergencia-y-evacuacion/',
  },
  {
    titulo: 'Estudio de Carga Combustible',
    descripcion:
      'Cálculo de la carga de combustible del establecimiento para cumplir con la normativa de protección contra incendios.',
    ruta: '/estudio-de-carga-de-combustible/',
  },
];

export function IsSiguiente({ base = '' }: { base?: string }) {
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
              alt="Instalación industrial que además del informe sanitario requiere otros permisos"
              icono={ShieldCheckIcon}
              pildora="Servicios complementarios"
              titulo="¿Necesitas otros permisos para tu establecimiento?"
              verificado
              pie={
                <ul className="space-y-3 border-t border-black/10 pt-4">
                  {ENLACES.map(({ titulo, descripcion, ruta }) => (
                    <li key={ruta}>
                      <a
                        href={`${base}${ruta}`}
                        className="text-base font-bold text-black underline decoration-svea/40 underline-offset-4 hover:decoration-svea"
                      >
                        {titulo}
                      </a>
                      <p className="mt-1 text-sm leading-snug text-black/65">{descripcion}</p>
                    </li>
                  ))}
                </ul>
              }
              arriba="pt-14"
            >
              Además del informe sanitario, muchos establecimientos requieren permisos complementarios. En
              SVEA te ayudamos con todos ellos.
            </TarjetaFoto>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <TarjetaFoto
              base={base}
              foto="inspeccion-bodega-calificacion-tecnica-industrial"
              alt="Inspección de un establecimiento para el informe sanitario"
              icono={BookOpenIcon}
              pildora="Guía completa en nuestro blog"
              titulo="Guías para entender el trámite"
              acciones={GUIAS.map(({ texto, ruta }) => ({ texto, href: `${base}${ruta}` }))}
              arriba="pt-40"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default IsSiguiente;
