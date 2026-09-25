import {
  BookOpenIcon,
  BuildingIcon,
  ClipboardCheckIcon,
  FactoryIcon,
  FileCheckIcon,
  FileSpreadsheetIcon,
  FileWarningIcon,
  FlameIcon,
  FlaskConicalIcon,
  GavelIcon,
  LeafIcon,
  type LucideIcon,
  RecycleIcon,
  SirenIcon,
  StoreIcon,
  TruckIcon,
} from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { GUIAS_MENU, TEMAS, VER_TODAS_LAS_GUIAS } from '@/contenido/articulos/guias';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export type Entrada = { title: string; href: string; description: string; icon: LucideIcon };

export const servicios: Entrada[] = [
  {
    title: 'Calificación Técnica Industrial',
    href: '/calificacion-tecnica-industrial/',
    description: 'Cumple los estándares de la SEREMI de Salud y obtén tu patente municipal.',
    icon: FactoryIcon,
  },
  {
    title: 'Estudio de Carga de Combustible',
    href: '/estudio-de-carga-de-combustible/',
    description: 'Evaluamos el riesgo de incendio calculando la carga de combustible según materiales.',
    icon: FlameIcon,
  },
  {
    title: 'Planes de Emergencia Industrial',
    href: '/planes-de-emergencia-y-evacuacion/',
    description: 'Planes conforme al DS 44 que protegen a las personas y la continuidad operativa.',
    icon: SirenIcon,
  },
  {
    title: 'Planes de Emergencia Condominios',
    href: '/planes-de-emergencia-y-evacuacion-condominios/',
    description: 'Protocolos claros según la Ley 21.442 para resguardar a los residentes.',
    icon: BuildingIcon,
  },
  {
    title: 'Sustancias y Residuos Peligrosos',
    href: '/manejo-de-residuos-peligrosos/',
    description: 'Manejo seguro y legal de sustancias peligrosas, con menos riesgo operativo.',
    icon: FlaskConicalIcon,
  },
  {
    title: 'Autorización Transporte de Residuos',
    href: '/autorizacion-de-transporte-de-residuos/',
    description: 'Tramitamos la autorización para transportar residuos peligrosos y no peligrosos.',
    icon: TruckIcon,
  },
];

export const masTramites: Entrada[] = [
  {
    title: 'Informe Sanitario',
    href: '/informe-sanitario/',
    description: 'La resolución sanitaria que la SEREMI exige para que tu instalación opere.',
    icon: FileCheckIcon,
  },
  {
    title: 'Permisos ambientales y SEIA',
    href: '/permisos-ambientales-y-pertinencias-del-seia/',
    description: 'Definimos si tu proyecto debe ingresar al SEIA y tramitamos los permisos.',
    icon: LeafIcon,
  },
];

export const guias: Entrada[] = [
  {
    title: 'Calificación inofensiva SEREMI',
    href: '/calificacion-inofensiva-seremi/',
    description: 'Cómo obtener el certificado de actividad inofensiva y tu patente.',
    icon: FileCheckIcon,
  },
  {
    title: 'Calificación Técnica Industrial',
    href: '/calificacion-tecnica-industrial-chile/',
    description: 'Guía completa del trámite: quién lo necesita, plazos y documentos.',
    icon: FactoryIcon,
  },
  {
    title: 'Estudio de carga de combustible',
    href: '/estudio-de-carga-combustible-chile/',
    description: 'Cómo se calcula la carga de fuego y cuándo la exige la OGUC.',
    icon: FlameIcon,
  },
  {
    title: 'Plan de emergencia DS 44',
    href: '/plan-de-emergencia-ds-44-empresas-chile/',
    description: 'Qué exige el decreto, contenido obligatorio, simulacros y sanciones.',
    icon: SirenIcon,
  },
  {
    title: 'Plan de emergencia en condominios',
    href: '/plan-de-emergencia-condominio-chile/',
    description: 'Lo que la Ley 21.442 pide a la administración de tu comunidad.',
    icon: BuildingIcon,
  },
  {
    title: 'Transporte de residuos',
    href: '/autorizacion-transporte-residuos-chile/',
    description: 'Peligrosos y no peligrosos: qué resolución necesitas y cómo se obtiene.',
    icon: TruckIcon,
  },
  {
    title: 'Patente definitiva',
    href: '/patente-definitiva-permisos-seremi/',
    description: 'Qué permisos de la SEREMI te piden para dejar la patente provisoria.',
    icon: StoreIcon,
  },
  {
    title: 'Checklist DS 44',
    href: '/checklist-ds-44-fiscalizacion/',
    description: 'Lo que revisa la Dirección del Trabajo en una fiscalización.',
    icon: ClipboardCheckIcon,
  },
  {
    title: 'Transporte de residuos no peligrosos',
    href: '/autorizacion-transporte-residuos-no-peligrosos/',
    description: 'La autorización paso a paso en SEREMI en Línea.',
    icon: RecycleIcon,
  },
  {
    title: 'Declaración SIDREP y SINADER',
    href: '/declaracion-residuos-sidrep-sinader/',
    description: 'Quién declara residuos, en qué sistema y en qué plazo.',
    icon: FileSpreadsheetIcon,
  },
  {
    title: 'Sumario sanitario',
    href: '/sumario-sanitario-seremi/',
    description: 'Qué hacer si la SEREMI te levanta un acta o te multa.',
    icon: GavelIcon,
  },
  {
    title: 'Rechazo u observaciones SEREMI',
    href: '/rechazo-observaciones-seremi/',
    description: 'Cómo responder, qué recursos tienes y en qué plazos.',
    icon: FileWarningIcon,
  },
  {
    title: 'Sustancias peligrosas DS 43',
    href: '/plan-manejo-sustancias-peligrosas-ds-43/',
    description: 'Cuándo exigen autorización y qué incluye el plan de manejo.',
    icon: FlaskConicalIcon,
  },
];

/**
 * El menú «Recursos y guías» muestra sólo las seis guías principales y un
 * enlace a /blog/, donde están todas agrupadas por tema. Las seis salen de
 * GUIAS_MENU (src/contenido/articulos/guias.ts), la misma lista que usa la
 * columna del pie: menú y pie no pueden diferir. De `guias` (la lista
 * completa) se toma sólo el icono.
 */
export const guiasPrincipales: Entrada[] = GUIAS_MENU.map((g) => ({
  title: g.rotulo,
  href: `/${g.slug}/`,
  description: g.descripcion,
  icon: guias.find((e) => e.href === `/${g.slug}/`)?.icon ?? BookOpenIcon,
}));

/** `base` es la subcarpeta donde vive el sitio (en GitHub Pages, /svea-sitio). */
export default function MenuSvea({ base = '' }: { base?: string }) {
  const url = (href: string) => `${base}${href}`;

  // en móvil el menú se esconde: los enlaces están en el pie
  return (
    <NavigationMenu className="z-20 max-md:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href={url('/')}>
            Inicio
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
          <NavigationMenuContent className="px-0 py-1">
            <div className="grid w-[900px] grid-cols-3 gap-3 divide-x divide-border p-4">
              <div className="col-span-2 pe-2">
                <h6 className="pl-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Servicios
                </h6>
                <ul className="mt-2.5 grid grid-cols-2 gap-1">
                  {servicios.map((s) => (
                    <ListItem key={s.title} href={url(s.href)} icon={s.icon} title={s.title}>
                      {s.description}
                    </ListItem>
                  ))}
                </ul>
              </div>

              <div className="pl-4">
                <h6 className="pl-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Más trámites
                </h6>
                <ul className="mt-2.5 grid gap-1">
                  {masTramites.map((s) => (
                    <ListItem key={s.title} href={url(s.href)} icon={s.icon} title={s.title}>
                      {s.description}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Recursos y guías</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4">
            <h6 className="pl-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Guías de cumplimiento normativo
            </h6>
            <ul className="mt-2.5 grid w-[400px] gap-1 md:w-[560px] md:grid-cols-2">
              {guiasPrincipales.map((g) => (
                <ListItem key={g.title} href={url(g.href)} icon={g.icon} title={g.title}>
                  {g.description}
                </ListItem>
              ))}
            </ul>
            <NavigationMenuLink asChild>
              <a
                href={url(VER_TODAS_LAS_GUIAS.ruta)}
                className="mt-2 flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-accent"
              >
                {VER_TODAS_LAS_GUIAS.rotulo}
                <span className="text-right text-xs font-medium text-muted-foreground">{TEMAS.map((t) => t.nombre).join(' · ')} →</span>
              </a>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href={url('/#form-home')}>
            Contacto
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon: LucideIcon }
>(({ className, title, children, icon: Icon, ...props }, ref) => (
  <li className="m-0 list-none p-0">
    <NavigationMenuLink asChild>
      <a
        className={cn(
          'block select-none flex-col items-start rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2 text-sm font-semibold normal-case leading-none tracking-tight text-foreground">
          <Icon className="h-5 w-5 shrink-0 text-primary" />
          {title}
        </div>
        <p className="mt-2 line-clamp-2 text-[13px] font-normal leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';
