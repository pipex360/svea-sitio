'use client';

/**
 * «Solicita tu Cotización», el formulario del Plan de Emergencia. Mismo
 * formato y mismas reglas que cti-formulario.tsx (LISTA ROJA: id, campos
 * ocultos, nombres y asunto idénticos al WordPress; los compara
 * verificar.mjs). Como en el original, entre Empresa y Mensaje va el rótulo
 * fijo del servicio con el candado.
 */
import { ClockIcon, LockIcon, MailIcon, ShieldCheckIcon } from 'lucide-react';
import { useRef } from 'react';

import { ContactCard } from '@/components/ui/contact-card';
import { IconoWhatsApp } from '@/components/ui/icono-whatsapp';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reveal } from '@/components/ui/reveal';
import { Textarea } from '@/components/ui/textarea';
import { CamposOrigen } from '@/components/ui/campos-origen';

/** Los mismos enlaces del WordPress: el de WhatsApp lo cuenta el listener de GTM. */
const WHATSAPP = 'https://api.whatsapp.com/send/?phone=56929947924&text=Hola%2C%20necesito%20un%20Plan%20de%20Emergencia%20y%20Evacuaci%C3%B3n%20Industrial';
const CORREO = 'contacto@sveaconsultores.cl';

export function PeFormulario({ copia = false }: { copia?: boolean }) {
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
    const asunto = 'Cotización Plan Emergencia Industrial - ' + nombre + (empresa ? ' | ' + empresa : '') + ' - ' + fecha;
    if (asuntoRef.current) asuntoRef.current.value = asunto;
    if (copia) e.preventDefault();
  };

  return (
    <section className="bg-hoja px-6 py-20" id="formulario-pe" aria-labelledby="titulo-form-pe">
      <Reveal className="mx-auto max-w-6xl">
        <ContactCard
          title="Solicita tu Cotización"
          titleId="titulo-form-pe"
          description="Te enviaremos tu cotización en menos de 24 horas. Cuéntanos de tu instalación y te respondemos con el plazo y el valor de tu Plan de Emergencia y Evacuación Industrial."
          beneficios={["Obtén tu Plan de Emergencia y Evacuación con respaldo profesional.", "Plan completo en 5-10 días hábiles, conforme al DS 594 y DS 44.", "Protege a tu equipo hoy: cotiza ahora y recibe la cotización en menos de 24 horas."]}
          contactInfo={[
            { icon: IconoWhatsApp, label: 'WhatsApp directo', value: '+56 9 2994 7924', href: WHATSAPP, externo: true },
            { icon: MailIcon, label: 'Correo', value: CORREO, href: `mailto:${CORREO}` },
            { icon: ClockIcon, label: 'Respuesta en 24h', value: 'Cotización automática por email' },
          ]}
        >
          <form
            id="form-pe-industrial"
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
              id="dynamic-subject-pe"
              defaultValue="Nueva cotización Plan de Emergencia - SVEA Consultores"
            />
            <input type="hidden" name="from_name" value="SVEA Consultores Web" />
            <input type="hidden" name="redirect" value="https://sveaconsultores.cl/gracias/" />
            <input type="hidden" name="Servicio" value="Plan de Emergencia y Evacuación Industrial" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
            {/* gclid y utm_*: los rellena la medición (MedicionSitio.astro) */}
            <CamposOrigen />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pe-nombre">Nombre</Label>
              <Input id="pe-nombre" type="text" name="Nombre" required placeholder="Nombre" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pe-telefono">Teléfono</Label>
              <Input id="pe-telefono" type="tel" name="Teléfono" required placeholder="Teléfono (+56 9 XXXX XXXX)" autoComplete="tel" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pe-email">Email</Label>
              <Input id="pe-email" type="email" name="Email" required placeholder="Email" autoComplete="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pe-empresa">Empresa</Label>
              <Input id="pe-empresa" type="text" name="Empresa" required placeholder="Nombre de tu empresa" autoComplete="organization" />
            </div>
            <p className="flex items-center gap-2 rounded-xl border border-svea/20 bg-svea/5 px-4 py-3 text-sm font-medium text-black">
              <LockIcon className="size-4 shrink-0 text-svea" aria-hidden="true" />
              Plan de Emergencia y Evacuación Industrial
            </p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pe-mensaje">Mensaje</Label>
              <Textarea id="pe-mensaje" name="Mensaje" placeholder="Mensaje (opcional)" rows={3} className="resize-none" />
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

export default PeFormulario;
