import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** La función que esperan todos los componentes de shadcn y de 21st.dev. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Los rangos de cifras («3-5 días hábiles», «15-45», «5-10 días») no se
 * pueden partir al final de una línea: quedaba «3-» arriba y «5» abajo. El
 * guion no separable (U+2011) no está en el subconjunto de Inter/Manrope
 * que sirve el sitio, así que el rango va en un <span> que no se corta.
 * Sólo para texto: no se aplica sobre HTML con atributos.
 */
const RANGO = /\d+(?:[.,]\d+)?-\d+(?:\s+(?:días|hrs|horas|semanas|meses)(?:\s+hábiles)?)?/g;
export function rangosHtml(texto: string) {
  return texto.replace(/(<[^>]*>)|([^<]+)/g, (_t, etiqueta, txt) =>
    etiqueta ?? txt.replace(RANGO, (m: string) => `<span class="whitespace-nowrap">${m}</span>`),
  );
}
