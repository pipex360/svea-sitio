import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

type Logo = {
  archivo: string;
  alt: string;
  /** proporción ancho/alto del archivo ya recortado */
  ratio: number;
};

/** Los 12 clientes que hoy pasan en el carrusel de la home. */
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
  { archivo: 'lira', alt: 'Lira', ratio: 1.1 },
  { archivo: 'animal-services', alt: 'Animal Services', ratio: 1.33 },
  { archivo: 'delart-chocolat', alt: 'DelArt Chocolat', ratio: 2.01 },
];

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos?: Logo[];
  base?: string;
};

export function LogoCloud({ logos = LOGOS, base = '' }: LogoCloudProps) {
  return (
    <div className="relative mx-auto max-w-3xl bg-gradient-to-r from-secondary via-transparent to-secondary py-6 md:border-x md:border-border">
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-border" />

      {/* El original pasa speed/speedOnHover, que este InfiniteSlider no
          recibe: sus props son duration y durationOnHover (segundos por
          vuelta). Se traducen: más lento al pasar el mouse. */}
      <InfiniteSlider gap={42} reverse duration={60} durationOnHover={140}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none w-auto select-none object-contain"
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={`${base}/img/clientes/${logo.archivo}.webp`}
            /* los logos van de proporción 1,1 a 4,3: con una altura fija los
               cuadrados se verían diminutos, así que se compensa */
            style={{ height: `${Math.round(30 / Math.pow(logo.ratio, 0.35))}px` }}
          />
        ))}
      </InfiniteSlider>

      {/* en una pantalla de 390 px, 160 px de desenfoque a cada lado dejan
          sin ver el centro: en móvil se reducen */}
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[70px] md:w-[160px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[70px] md:w-[160px]"
        direction="right"
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-border" />
    </div>
  );
}
