/**
 * El título de la franja de logos de clientes («Con la confianza de más de
 * 250 empresas en todo Chile»). Uno solo para la portada, las landings y el
 * formulario de las guías, para que el texto no se desvíe entre páginas.
 * `como` elige la etiqueta: h2 donde la franja es una sección propia, p donde
 * va dentro de otra (el formulario de una guía) y no debe sumar un título.
 * `quienes` cambia sólo el sustantivo: la landing de condominios dice «clientes», porque a un
 * administrador de edificio «empresas» le suena a que el servicio no es para él.
 */
import { cn } from '@/lib/utils';

export function TituloClientes({ como: Etiqueta = 'h2', className, quienes = 'empresas' }: { como?: 'h2' | 'p'; className?: string; quienes?: string }) {
  return (
    <Etiqueta className={cn('mb-5 text-center text-lg font-medium text-foreground md:text-2xl', className)}>
      Con la confianza de <span className="font-black tracking-tight text-svea">{`más de 250 ${quienes}`}</span> en todo Chile
    </Etiqueta>
  );
}

export default TituloClientes;
