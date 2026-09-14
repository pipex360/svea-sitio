import { PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Logo = {
  archivo: string;
  alt: string;
  /** proporción ancho/alto ya recortada, para equilibrar el tamaño óptico */
  ratio: number;
};

/**
 * Los clientes que hoy pasan en el carrusel de la home, ahora en rejilla.
 * Son 12, así que el tablero queda parejo: 4 columnas × 3 filas en
 * escritorio, 2 × 6 en móvil.
 */
const LOGOS: Logo[] = [
  { archivo: 'db-santasalo', alt: 'DB Santasalo', ratio: 3.06 },
  { archivo: 'grupo-mbo', alt: 'Grupo MBO', ratio: 1.34 },
  { archivo: 'nuevo-pudahuel', alt: 'Nuevo Pudahuel', ratio: 4.27 },
  { archivo: 'gespania', alt: 'Gespania', ratio: 2.01 },
  { archivo: 'natures-farm', alt: "Nature's Farm", ratio: 1.32 },
  { archivo: 'blt-mini-bodegas', alt: 'BLT Mini Bodegas', ratio: 2.35 },
  { archivo: 'sungrow', alt: 'Sungrow', ratio: 4.21 },
  { archivo: 'fuchs', alt: 'Fuchs Lubricants', ratio: 2.25 },
  { archivo: 'novametal', alt: 'Novametal', ratio: 1.36 },
  { archivo: 'lira', alt: 'Lira', ratio: 1.10 },
  { archivo: 'animal-services', alt: 'Animal Services', ratio: 1.33 },
  { archivo: 'delart-chocolat', alt: 'DelArt Chocolat', ratio: 2.01 },
];

const COLUMNAS = 4; // en escritorio

type LogoCloudProps = React.ComponentProps<'div'> & { logos?: Logo[]; base?: string };

export function LogoCloud({ className, logos = LOGOS, base = '', ...props }: LogoCloudProps) {
  const filas = Math.ceil(logos.length / COLUMNAS);

  return (
    <div className={cn('relative grid grid-cols-2 border-x border-border md:grid-cols-4', className)} {...props}>
      {/* las líneas de arriba y abajo se salen del contenedor, como en el original */}
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-border" />

      {logos.map((logo, i) => {
        const fila = Math.floor(i / COLUMNAS);
        const columna = i % COLUMNAS;
        const ultimaColumna = columna === COLUMNAS - 1;
        const ultimaFila = fila === filas - 1;

        return (
          <LogoCard
            key={logo.alt}
            logo={logo}
            base={base}
            className={cn(
              'relative',
              // tablero de ajedrez: una casilla sí y otra no
              (fila + columna) % 2 === 0 ? 'bg-secondary' : 'bg-background',
              // en móvil sólo hay dos columnas, así que el tablero se recalcula
              i % 2 === 0 ? 'max-md:bg-secondary' : 'max-md:bg-background',
              !ultimaColumna && 'md:border-r',
              i % 2 === 0 && 'max-md:border-r',
              !ultimaFila && 'border-b',
            )}
          >
            {/* la crucecita marca cada cruce interior de la rejilla */}
            {!ultimaColumna && !ultimaFila && (
              <PlusIcon
                className="-right-[12.5px] -bottom-[12.5px] absolute z-10 hidden size-6 text-border md:block"
                strokeWidth={1}
              />
            )}
          </LogoCard>
        );
      })}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-border" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<'div'> & { logo: Logo; base: string };

function LogoCard({ logo, base, className, children, ...props }: LogoCardProps) {
  return (
    <div className={cn('flex items-center justify-center border-border bg-background px-4 py-8 md:p-8', className)} {...props}>
      {/*
        Los logos van de proporción 1,1 a 4,3 y vienen recortados, sin
        transparente alrededor. Para que pesen parecido a la vista, los
        anchos se limitan por el área: un logo ancho puede estirarse más,
        uno cuadrado se deja más alto.
      */}
      <img
        alt={logo.alt}
        className="pointer-events-none w-auto select-none object-contain opacity-85 transition-opacity hover:opacity-100"
        loading="lazy"
        src={`${base}/img/clientes/${logo.archivo}.webp`}
        style={{ height: `${Math.min(46, Math.round(150 / Math.sqrt(logo.ratio)))}px`, maxWidth: '150px' }}
      />
      {children}
    </div>
  );
}
