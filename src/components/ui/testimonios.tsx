/**
 * «Lo que dicen nuestros clientes» — muro de testimonios en tres dimensiones.
 *
 * ————————————————————————————————————————————————————————————————
 * LAS FRASES ESTÁN PENDIENTES, A PROPÓSITO.
 *
 * Esta sección no lleva testimonios inventados. Una reseña fabricada que se
 * presenta como real es publicidad engañosa —Ley 19.496— y quien responde es
 * SVEA. Además no hace falta: la empresa dice atender a más de 250 clientes y
 * ya publica dieciocho logos en el carrusel de arriba.
 *
 * Lo que sí está armado es todo lo demás: las nueve tarjetas llevan empresas
 * que el propio sitio ya declara como clientes y el servicio que les
 * corresponde. Falta una frase por empresa. Cuando lleguen, se reemplaza la
 * línea `frase` de cada una y la sección queda lista.
 * ————————————————————————————————————————————————————————————————
 *
 * Tres cambios respecto del componente de 21st.dev:
 *
 * 1. Sin @radix-ui/react-avatar. El Avatar sólo hace un círculo con imagen y
 *    un respaldo con iniciales; aquí no hay fotos de personas que poner, así
 *    que van las iniciales de la empresa. Un paquete menos y ninguna cara de
 *    banco de imágenes haciéndose pasar por un cliente.
 * 2. La pared se endereza en pantallas chicas y la perspectiva se suaviza en
 *    las grandes. El original usa 300 px de perspectiva sobre un bloque de
 *    mil doscientos de ancho: la tercera parte izquierda queda casi de canto
 *    y no se lee. A 900 px el giro se mantiene y las tarjetas se leen todas.
 * 3. Con `prefers-reduced-motion` las pistas se detienen, desde el Marquee.
 */

import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';

type Testimonio = {
  empresa: string;
  persona: string;
  servicio: string;
  frase: string;
};

/** Empresas que el propio sitio ya declara como clientes, en el carrusel. */
const TESTIMONIOS: Testimonio[] = [
  {
    empresa: 'DB Santasalo',
    persona: 'Pendiente',
    servicio: 'Calificación Técnica Industrial',
    frase: 'Pendiente: la frase de este cliente.',
  },
  {
    empresa: 'Grupo MBO',
    persona: 'Pendiente',
    servicio: 'Estudio de Carga de Combustible',
    frase: 'Pendiente: la frase de este cliente.',
  },
  {
    empresa: 'Nuevo Pudahuel',
    persona: 'Pendiente',
    servicio: 'Planes de Emergencia y Evacuación',
    frase: 'Pendiente: la frase de este cliente.',
  },
  {
    empresa: 'Bodegas San Francisco',
    persona: 'Pendiente',
    servicio: 'Estudio de Carga de Combustible',
    frase: 'Pendiente: la frase de este cliente.',
  },
  {
    empresa: 'Flexpark',
    persona: 'Pendiente',
    servicio: 'Calificación Técnica Industrial',
    frase: 'Pendiente: la frase de este cliente.',
  },
  {
    empresa: 'Martínez y Valdivieso',
    persona: 'Pendiente',
    servicio: 'Sustancias y Residuos Peligrosos',
    frase: 'Pendiente: la frase de este cliente.',
  },
  {
    empresa: 'Newrest Catering Chile',
    persona: 'Pendiente',
    servicio: 'Informe Sanitario',
    frase: 'Pendiente: la frase de este cliente.',
  },
  {
    empresa: 'Fuchs Lubricants',
    persona: 'Pendiente',
    servicio: 'Autorización Transporte de Residuos',
    frase: 'Pendiente: la frase de este cliente.',
  },
  {
    empresa: 'Inmobiliaria Galilea Centro',
    persona: 'Pendiente',
    servicio: 'Planes de Emergencia para Condominios',
    frase: 'Pendiente: la frase de este cliente.',
  },
];

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

function TarjetaTestimonio({ empresa, persona, servicio, frase }: Testimonio) {
  return (
    <Card className="w-64 shadow-[0_10px_28px_-18px_rgba(0,0,0,.25)]">
      <CardContent className="p-5">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-svea/10 text-xs font-bold text-svea"
          >
            {iniciales(empresa)}
          </span>
          <div className="flex min-w-0 flex-col">
            <figcaption className="truncate text-sm font-semibold text-black">{empresa}</figcaption>
            <p className="truncate text-xs text-black/50">{servicio}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm leading-relaxed text-black/70">{frase}</blockquote>
        <p className="mt-2 text-xs text-black/40">{persona}</p>
      </CardContent>
    </Card>
  );
}

const Pista = ({ reverse }: { reverse?: boolean }) => (
  <Marquee vertical pauseOnHover reverse={reverse} repeat={3} className="[--duration:48s]">
    {TESTIMONIOS.map((t) => (
      <TarjetaTestimonio key={t.empresa} {...t} />
    ))}
  </Marquee>
);

export function Testimonios() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="titulo-testimonios">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/60 md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Lo que dicen nuestros clientes
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </p>
          <h2
            id="titulo-testimonios"
            className="mb-4 text-balance text-3xl font-medium tracking-tight text-black md:text-5xl"
          >
            Más de 250 empresas <span className="font-black text-svea">ya lo resolvieron</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-black/75 md:text-lg">
            Industrias, bodegas, centros logísticos y condominios que hoy operan con sus permisos al
            día.
          </p>
        </div>

        <div className="relative flex h-[26rem] w-full flex-row items-center justify-center gap-1.5 overflow-hidden lg:[perspective:900px]">
          {/* el giro en tres ejes sólo a partir de lg: más abajo deja las
              tarjetas de los bordes ilegibles */}
          <div
            className="flex flex-row items-center gap-4 lg:[transform:translateX(-40px)_translateY(0px)_translateZ(-60px)_rotateX(16deg)_rotateY(-8deg)_rotateZ(14deg)]"
          >
            <Pista />
            <Pista reverse />
            <Pista />
            <Pista reverse />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"
          />
        </div>
      </div>
    </section>
  );
}

export default Testimonios;
