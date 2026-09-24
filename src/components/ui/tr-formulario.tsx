'use client';

/**
 * «Solicita tu Cotización», el formulario de esta página. Mismo formato y
 * mismas reglas que cti-formulario.tsx (LISTA ROJA: id, campos ocultos,
 * nombres y asunto idénticos al WordPress; los compara verificar.mjs).
 */
import { ClockIcon, MailIcon, ShieldCheckIcon } from 'lucide-react';
import { useRef } from 'react';

import { ContactCard } from '@/components/ui/contact-card';
import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reveal } from '@/components/ui/reveal';
import { Textarea } from '@/components/ui/textarea';
import { CamposOrigen } from '@/components/ui/campos-origen';

/** Los mismos enlaces del WordPress: el de WhatsApp lo cuenta el listener de GTM. */
const WHATSAPP =
  'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20asesor%C3%ADa%20en%20Autorizaci%C3%B3n%20de%20Transporte%20de%20Residuos';
const CORREO = 'contacto@sveaconsultores.cl';

export function TrFormulario({ copia = false }: { copia?: boolean }) {
  const asuntoRef = useRef<HTMLInputElement>(null);

  const alEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    // idéntico al <script> del WordPress
    const nombre = ((form.querySelector('input[name="Nombre"]') as HTMLInputElement)?.value || '').trim() || 'Sin nombre';
    const empresa = ((form.querySelector('input[name="Empresa"]') as HTMLInputElement)?.value || '').trim();
    const ahora = new Date();
    const fecha =
      ahora.toLocaleDateString('es-CL') +
      ' ' +
      ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    const asunto = 'Cotización Transporte Residuos - ' + nombre + (empresa ? ' | ' + empresa : '') + ' - ' + fecha;
    if (asuntoRef.current) asuntoRef.current.value = asunto;
    if (copia) e.preventDefault();
  };

  return (
    <section className="bg-hoja px-6 py-20" id="formulario-tr" aria-labelledby="titulo-form-tr">
      <Reveal className="mx-auto max-w-6xl">
        <ContactCard
          title="Solicita tu Cotización"
          titleId="titulo-form-tr"
          description="Te enviaremos tu cotización en menos de 24 horas · Autorización de Transporte de Residuos"
          contactInfo={[
            { icon: IconoWhatsApp, label: 'WhatsApp directo', value: '+56 9 2994 7924', href: WHATSAPP, externo: true },
            { icon: MailIcon, label: 'Correo', value: CORREO, href: `mailto:${CORREO}` },
            { icon: ClockIcon, label: 'Respuesta en 24h', value: 'Cotización automática por email' },
          ]}
        >
          <form
            id="form-transporte-residuos"
            action={copia ? '#' : 'https://api.web3forms.com/submit'}
            method={copia ? undefined : 'POST'}
            data-copia={copia ? '1' : undefined}
            onSubmit={alEnviar}
            className="w-full space-y-3"
          >
            {/* LISTA ROJA: campos ocultos, tal cual el original */}
            <input type="hidden" name="access_key" value="076a0f9a-9911-48f6-880e-dd9d44c3063b" />
            <input
              ref={asuntoRef}
              type="hidden"
              name="subject"
              id="dynamic-subject-tr"
              defaultValue="Nueva cotización Autorización Transporte de Residuos - SVEA Consultores"
            />
            <input type="hidden" name="from_name" value="SVEA Consultores Web" />
            <input type="hidden" name="redirect" value="https://sveaconsultores.cl/gracias/" />
            <input type="hidden" name="Servicio" value="Autorización de Transporte de Residuos Peligrosos y No Peligrosos" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
            {/* gclid y utm_*: los rellena la medición (MedicionSitio.astro) */}
            <CamposOrigen />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tr-nombre">Nombre</Label>
              <Input id="tr-nombre" type="text" name="Nombre" required placeholder="Nombre" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tr-telefono">Teléfono</Label>
              <Input id="tr-telefono" type="tel" name="Teléfono" required placeholder="Teléfono (+56 9 XXXX XXXX)" autoComplete="tel" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tr-email">Email</Label>
              <Input id="tr-email" type="email" name="Email" required placeholder="Email" autoComplete="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tr-empresa">Empresa</Label>
              <Input id="tr-empresa" type="text" name="Empresa" required placeholder="Empresa / Razón social" autoComplete="organization" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tr-mensaje">Mensaje</Label>
              <Textarea
                id="tr-mensaje"
                name="Mensaje"
                placeholder="Mensaje (opcional). Ej: tipo de residuos, cantidad de vehículos, rutas, etc."
                rows={3}
                className="resize-none"
              />
            </div>

            <button type="submit" className="btn-flecha ancha">
              <span>Solicitar Cotización</span>
              <span className="circulo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>

            <p className="flex items-center justify-center gap-5 pt-2 text-xs text-black/55">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
                Datos seguros
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="size-3.5" aria-hidden="true" />
                Respuesta en 24h
              </span>
            </p>
          </form>
        </ContactCard>
      </Reveal>
    </section>
  );
}

export default TrFormulario;
