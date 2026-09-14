import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** La función que esperan todos los componentes de shadcn y de 21st.dev. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
