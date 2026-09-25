'use client';

/**
 * El formulario de cotización de los artículos («article-lead-form»).
 *
 * LISTA ROJA, igual que los de las páginas de servicio. Web3Forms manda el
 * correo y el flujo de n8n lo clasifica por el remitente, el asunto y los
 * campos ocultos: si cambia un `name`, un oculto, el `access_key` o el
 * `redirect`, los leads desaparecen sin dar error. Por eso este componente
 * no decide nada: dibuja lo que trae el JSON del artículo, que salió del
 * HTML del WordPress sin tocar (src/contenido/articulos/<slug>.json):
 *
 * - `id="article-lead-form"`, `action` y `method` son los del original.
 * - Los ocultos van en el mismo orden, con el mismo `name`, el mismo `value`
 *   y, cuando lo tenían, el mismo `id` (el `subject` con asunto dinámico).
 * - Los campos visibles van en el orden del original, con su `id`, `name`,
 *   `type`, `required`, `placeholder` y, en el select, las mismas opciones
 *   con la misma elegida de partida.
 * - Si el artículo armaba el asunto al enviar, se arma igual: prefijo +
 *   nombre + « | » + empresa (o condominio) + « - » + fecha y hora es-CL.
 *   Si no lo armaba, el asunto queda fijo, como allá.
 *
 * Cambia sólo la ropa: la tarjeta de «Contáctanos» de la portada, como en
 * las páginas de servicio.
 */

import { ClockIcon, MailIcon, ShieldCheckIcon, CheckIcon } from 'lucide-react';
import { useRef } from 'react';

import { ContactCard } from '@/components/ui/contact-card';
import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CamposOrigen } from '@/components/ui/campos-origen';
import { LogoMarquee } from '@/components/ui/logo-marquee';
import { logosClientes } from '@/data/clientes';
import { TituloClientes } from '@/components/ui/titulo-clientes';

export type Campo = {
  label: string;
  id: string;
  name: string;
  tipo: string;
  requerido: boolean;
  placeholder: string | null;
  ancho: boolean;
  filas?: number;
  opciones?: { value: string; texto: string; seleccionada: boolean; desactivada: boolean }[];
};

export type DatosFormulario = {
  titulo: string;
  bajada: string;
  ocultos: { name: string; value: string; id?: string }[];
  campos: Campo[];
  boton: string;
  confianza: string[];
};

export type Asunto = { prefijo: string; campo: string; id: string } | null;

const WHATSAPP = 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20t%C3%A9cnica';
const CORREO = 'contacto@sveaconsultores.cl';
const ICONOS = [ShieldCheckIcon, ClockIcon, CheckIcon];

/** «SOLICITAR COTIZACIÓN GRATUITA» → «Solicitar cotización gratuita» */
const aOracion = (t: string) => (t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t);

export function ArticuloFormulario({
  datos,
  asunto,
  copia = false,
  base = '',
}: {
  datos: DatosFormulario;
  asunto: Asunto;
  copia?: boolean;
  base?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const alEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (asunto) {
      // idéntico al <script> del WordPress
      const valor = (n: string) => ((form.querySelector(`input[name="${n}"]`) as HTMLInputElement)?.value || '').trim();
      const nombre = valor('Nombre') || 'Sin nombre';
      const segundo = valor(asunto.campo);
      const ahora = new Date();
      const fecha =
        ahora.toLocaleDateString('es-CL') +
        ' ' +
        ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
      const campoAsunto = form.querySelector(`#${asunto.id}`) as HTMLInputElement | null;
      if (campoAsunto) campoAsunto.value = asunto.prefijo + nombre + (segundo ? ' | ' + segundo : '') + ' - ' + fecha;
    }
    if (copia) e.preventDefault();
  };

  return (
    <section className="art-formulario" id="contacto" aria-labelledby="titulo-form-articulo">
      <div id="article-lead-form-wrapper">
        <ContactCard
          title={datos.titulo}
          titleId="titulo-form-articulo"
          description={datos.bajada}
          contactInfo={[
            { icon: IconoWhatsApp, label: 'WhatsApp directo', value: '+56 9 2994 7924', href: WHATSAPP, externo: true },
            { icon: MailIcon, label: 'Correo', value: CORREO, href: `mailto:${CORREO}` },
            { icon: ClockIcon, label: 'Cotización sin compromiso', value: 'Por email o WhatsApp' },
          ]}
        >
          <form
            ref={formRef}
            id="article-lead-form"
            action={copia ? '#' : 'https://api.web3forms.com/submit'}
            method={copia ? undefined : 'POST'}
            data-copia={copia ? '1' : undefined}
            onSubmit={alEnviar}
            className="grid w-full gap-3"
          >
            {/* LISTA ROJA: campos ocultos, tal cual el original */}
            {datos.ocultos.map((o) =>
              o.id ? (
                <input key={o.name} type="hidden" name={o.name} id={o.id} defaultValue={o.value} />
              ) : (
                <input key={o.name} type="hidden" name={o.name} value={o.value} />
              ),
            )}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
            {/* gclid y utm_*: los rellena la medición (MedicionSitio.astro) */}
            <CamposOrigen />

            {datos.campos.map((c) => (
              <div key={c.id} className="flex flex-col gap-1.5">
                <Label htmlFor={c.id}>{c.label}</Label>
                {c.tipo === 'select' ? (
                  <select
                    id={c.id}
                    name={c.name}
                    required={c.requerido || undefined}
                    defaultValue={(c.opciones ?? []).find((o) => o.seleccionada)?.value}
                    className="flex h-11 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-black focus-visible:border-svea focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-svea/25"
                  >
                    {(c.opciones ?? []).map((o) => (
                      <option key={o.value} value={o.value} disabled={o.desactivada || undefined}>
                        {o.texto}
                      </option>
                    ))}
                  </select>
                ) : c.tipo === 'textarea' ? (
                  <Textarea
                    id={c.id}
                    name={c.name}
                    required={c.requerido || undefined}
                    placeholder={c.placeholder ?? undefined}
                    rows={c.filas ?? 3}
                    className="resize-none"
                  />
                ) : (
                  <Input
                    id={c.id}
                    type={c.tipo}
                    name={c.name}
                    required={c.requerido || undefined}
                    placeholder={c.placeholder ?? undefined}
                    autoComplete={
                      c.tipo === 'email' ? 'email' : c.tipo === 'tel' ? 'tel' : c.name === 'Nombre' ? 'name' : c.name === 'Empresa' ? 'organization' : undefined
                    }
                  />
                )}
              </div>
            ))}

            <button type="submit" className="btn-flecha ancha">
              {/* el WordPress lo escribía en mayúsculas y con «→»: la flecha ya está en el círculo */}
              <span>{aOracion(datos.boton.replace(/\s*→\s*$/, ''))}</span>
              <span className="circulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>

            <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 pt-2 text-xs text-black/55">
              {datos.confianza.map((t, i) => {
                const Icono = ICONOS[i % ICONOS.length];
                return (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Icono className="size-3.5" aria-hidden="true" />
                    {t}
                  </span>
                );
              })}
            </p>
          </form>
        </ContactCard>
      </div>
      {/* los mismos clientes, el mismo título y la misma cinta que la portada
          (src/data/clientes.ts); fuera del contenedor del formulario para que
          ocupe el mismo ancho que allá (max-w-7xl) */}
      <div className="mt-10" role="group" aria-label="Empresas que confían en SVEA">
        <TituloClientes como="p" />
        <LogoMarquee logos={logosClientes(base)} />
      </div>
    </section>
  );
}

export default ArticuloFormulario;
