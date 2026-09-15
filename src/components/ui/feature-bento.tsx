'use client';

/**
 * «Cumplimiento Ambiental Sin Complicaciones» en rejilla bento.
 *
 * Adaptado del componente de 21st.dev. Cinco cambios:
 *
 * 1. Sus degradados de color —azules, morados, rosas— se reemplazan por dos
 *    fotos del propio sitio. Eran relleno decorativo; la foto sitúa de qué se
 *    está hablando.
 * 2. Foto sólo en una de las cinco tarjetas. Con foto en todas, las cifras
 *    dejarían de leerse de un vistazo, que es justamente para lo que sirven.
 *    «Innovación Constante» lleva de fondo el Gateway Flow —líneas que
 *    convergen al centro— y las de cifras van en negro liso y en blanco con
 *    trama.
 * 3. Los textos y las cifras son los del sitio actual, palabra por palabra.
 *    Las cifras suben desde cero cuando entran en pantalla.
 * 4. Las cinco tarjetas llenan la rejilla sin huecos: la primera ocupa dos
 *    columnas y dos filas, y abajo una ocupa dos columnas y la otra una.
 * 5. El punto que late va en blanco, no en verde.
 *
 * El 100% aparecía dos veces en el sitio —«Tasa de Aprobación» y «100%
 * Cumplimiento · En trámites realizados» dentro de Innovación Constante—.
 * Aquí es una sola cifra que conserva los dos rótulos.
 */

import { animate, useInView, useMotionValue, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { GatewayFlow } from '@/components/ui/gateway-flow';

const WP = 'https://sveaconsultores.cl/wp-content/uploads/2025/03';
const FOTO_EQUIPO = `${WP}/group-of-business-advisor-showing-plan-of-investment-to-clients-in-the-consultancy-office.jpg`;

/** Cifra que sube desde cero la primera vez que se ve. */
function Cifra({ meta, sufijo = '' }: { meta: number; sufijo?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.5 });
  const valor = useMotionValue(0);
  const reducido = useReducedMotion();
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    if (!enVista) return;
    if (reducido) {
      setN(meta);
      return;
    }
    const control = animate(valor, meta, {
      duration: 1.4,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return control.stop;
  }, [enVista, meta, reducido, valor]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {sufijo}
    </span>
  );
}

const ITEMS = ['Calidad Técnica', 'Eficiencia en Tiempos', 'Profesionalismo', 'Transparencia Total'];

export function FeatureBento() {
  return (
    <div className="mx-auto grid max-w-7xl auto-rows-[minmax(260px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
      {/* Compromiso y Garantía — la grande, con la foto del equipo */}
      <div className="group relative flex flex-col justify-end overflow-hidden rounded-3xl p-8 text-white md:col-span-2 md:row-span-2 md:p-10">
        <img
          src={FOTO_EQUIPO}
          alt="Equipo de SVEA revisando un proyecto con un cliente"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/94 via-black/75 to-black/45"
        />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="size-2 animate-pulse rounded-full bg-white motion-reduce:animate-none"
            />
            Compromiso y Garantía
          </span>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/90 md:text-xl">
            Nos especializamos en la satisfacción del cliente. No solo entregamos documentos;
            aseguramos la viabilidad y el cumplimiento normativo de su proyecto industrial.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trámites Gestionados — negro liso, para que la cifra mande */}
      <div className="flex flex-col justify-center rounded-3xl bg-neutral-950 p-8 text-white">
        <span className="text-5xl font-black leading-none tracking-tight">
          <Cifra meta={250} sufijo="+" />
        </span>
        <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">
          Trámites Gestionados
        </p>
      </div>

      {/* Tasa de Aprobación — blanco con trama, para que no sean tres negras */}
      <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-border bg-white p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        <div className="relative z-10">
          <span className="text-5xl font-black leading-none tracking-tight text-black">
            <Cifra meta={100} sufijo="%" />
          </span>
          <p className="mt-3 text-sm font-semibold text-black">Tasa de Aprobación</p>
          <p className="mt-0.5 text-xs text-black/50">En trámites realizados</p>
        </div>
      </div>

      {/* Innovación Constante — ancha, con las líneas convergiendo al centro */}
      <div className="relative flex flex-col justify-end overflow-hidden rounded-3xl bg-neutral-950 p-8 text-white md:col-span-2">
        <GatewayFlow className="absolute inset-0 h-full w-full" />
        {/* un velo suave para que el texto no compita con las partículas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent"
        />
        <div className="relative z-10">
          <h3 className="text-2xl font-bold tracking-tight">Innovación Constante</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
            Adaptamos metodologías modernas para agilizar trámites y reducir riesgos operativos.
          </p>
          <p className="mt-5 text-2xl font-bold leading-none tracking-tight">
            5-10 <span className="text-sm font-medium text-white/70">días hábiles</span>
          </p>
          <p className="mt-1 text-xs text-white/60">Informe técnico listo para revisión</p>
        </div>
      </div>

      {/* Tiempo de Cotización */}
      <div className="flex flex-col justify-center rounded-3xl bg-neutral-950 p-8 text-white">
        <span className="text-5xl font-black leading-none tracking-tight">
          <Cifra meta={24} sufijo=" hrs" />
        </span>
        <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">
          Tiempo de Cotización
        </p>
      </div>
    </div>
  );
}

export default FeatureBento;
