/**
 * La misma <Foto> de src/components/Foto.astro, para las islas de React
 * (Scroll01 y las secciones «¿Qué es?»). Mismos atributos, misma fuente:
 * src/lib/fotos.ts y el manifiesto src/data/fotos.json.
 */
import { atributosFoto, type Tamano } from '@/lib/fotos';

export type FotoProps = {
  nombre: string;
  alt: string;
  tamano: Tamano | string;
  /** la ruta base del sitio (import.meta.env.BASE_URL sin la barra final) */
  base?: string;
  /** la del hero / LCP: carga inmediata con prioridad alta */
  prioridad?: boolean;
  /** carga diferida (lazy); false para lo que se ve al abrir la página sin ser el LCP */
  diferida?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function Foto({ nombre, alt, tamano, base = '', prioridad = false, diferida = !prioridad, className, style }: FotoProps) {
  // con prioridad (el hero) va sólo en WebP: el AVIF tarda más en decodificar y atrasa el LCP (ver src/lib/fotos.ts)
  const a = atributosFoto(nombre, tamano, base, prioridad);
  return (
    <picture>
      {a.srcsetAvif && <source type="image/avif" srcSet={a.srcsetAvif} sizes={a.sizes} />}
      <source type="image/webp" srcSet={a.srcsetWebp} sizes={a.sizes} />
      <img
        src={a.src}
        width={a.width}
        height={a.height}
        alt={alt}
        className={className}
        style={style}
        decoding="async"
        loading={diferida && !prioridad ? 'lazy' : undefined}
        fetchPriority={prioridad ? 'high' : undefined}
      />
    </picture>
  );
}

export default Foto;
