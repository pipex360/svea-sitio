/**
 * «Nuestros Servicios» como galería que se abre al pasar el cursor.
 *
 * Adaptado del componente de 21st.dev. Cinco cambios:
 *
 * 1. Fuera el bloque <style> del original. Ese bloque importaba Poppins y la
 *    aplicaba con el selector `*`, que no respeta el borde del componente:
 *    habría cambiado la tipografía de la página entera, hero y menú incluidos.
 * 2. Cada panel lleva el nombre del servicio, su descripción y su enlace. El
 *    original son fotos y nada más; aquí la foto sin el texto no sirve, ni
 *    para el visitante ni para el SEO.
 * 3. El texto vive siempre en el HTML, sólo cambia su opacidad. Si se montara
 *    y desmontara al pasar el cursor, Google no lo vería y un lector de
 *    pantalla tampoco.
 * 4. En el teléfono no hay cursor, así que la fila se convierte en columna y
 *    los seis paneles se muestran abiertos.
 * 5. Los títulos cerrados van en vertical: con seis paneles, cada uno mide
 *    unos doscientos píxeles en reposo y un título horizontal no cabría.
 *
 * Cada foto es la que encabeza la página de ese servicio en el sitio actual,
 * así que el panel y la página a la que lleva enseñan lo mismo: quien pincha
 * reconoce dónde llegó.
 */

const WP = 'https://sveaconsultores.cl/wp-content/uploads';

const SERVICIOS = [
  {
    titulo: 'Calificación Técnica Industrial',
    descripcion:
      'Aseguramos que cumplas los estándares técnicos y normativos de la SEREMI de Salud, facilitando la obtención de tu patente municipal.',
    href: '/calificacion-tecnica-industrial/',
    foto: `${WP}/2025/03/chemical-plant.jpg`,
    alt: 'Planta química',
  },
  {
    titulo: 'Estudio de Carga de Combustible',
    descripcion:
      'Evaluamos el riesgo de incendio en instalaciones comerciales e industriales, calculando la carga de combustible según materiales.',
    href: '/estudio-de-carga-de-combustible/',
    foto: `${WP}/2025/03/warehouse-products-storage.jpg`,
    alt: 'Bodega con productos almacenados',
  },
  {
    titulo: 'Manejo de Sustancias y Residuos Peligrosos',
    descripcion:
      'Garantizamos la seguridad, legalidad y sostenibilidad en el manejo de sustancias peligrosas, minimizando riesgos operativos.',
    href: '/manejo-de-residuos-peligrosos/',
    foto: `${WP}/2025/03/warehousing-engineering-concept-hazardous-waste-storage.jpg`,
    alt: 'Bodega de almacenamiento de residuos peligrosos',
  },
  {
    titulo: 'Planes de Emergencia y Evacuación Industrial',
    descripcion:
      'Desarrollamos planes personalizados que aseguran la protección de personas y la continuidad ante situaciones de riesgo.',
    href: '/planes-de-emergencia-y-evacuacion/',
    foto: `${WP}/2025/03/basic-fire-fighting-and-evacuation-simulation-for-safety-in-emergency-situation.jpg`,
    alt: 'Simulacro de evacuación y combate de incendios',
  },
  {
    titulo: 'Autorización Transporte de Residuos',
    descripcion:
      'Gestionamos la autorización para el transporte seguro de residuos peligrosos y no peligrosos, cumpliendo las normativas.',
    href: '/autorizacion-de-transporte-de-residuos/',
    foto: `${WP}/2025/03/dump-truck-driving-on-highway-scene-top-view-of-dump-truck-on-highway-in-summer-truckers-and-dump.jpg`,
    alt: 'Camión de transporte de residuos en carretera',
  },
  {
    titulo: 'Planes de Emergencia y Evacuación para Condominios',
    descripcion:
      'Diseñamos planes a medida con protocolos claros para actuar con rapidez, resguardando la vida de los residentes.',
    href: '/planes-de-emergencia-y-evacuacion-condominios/',
    foto: `${WP}/2025/06/plan-emergencia-evacuacion.jpg`,
    alt: 'Plan de emergencia y evacuación de un edificio',
  },
];

export function GaleriaServicios({ base = '' }: { base?: string }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-3 md:h-[440px] md:flex-row md:gap-2">
      {SERVICIOS.map((s, i) => (
        <a
          key={s.titulo}
          href={`${base}${s.href}`}
          className="group relative h-64 w-full overflow-hidden rounded-lg no-underline md:h-full md:w-56 md:flex-grow md:transition-all md:duration-500 md:ease-out md:hover:w-full"
        >
          <img
            src={s.foto}
            alt={s.alt}
            loading={i < 2 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {/* El velo hace legible el texto encima de cualquier foto. En el
              teléfono el panel es más bajo y la descripción cae sobre la parte
              clara de la imagen, así que el degradado tiene que ser firme. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/20 md:via-black/50 md:to-black/10"
          />

          {/* cerrado: sólo el nombre, en vertical */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-sm font-semibold tracking-tight text-white transition-opacity duration-300 md:block md:group-hover:opacity-0"
          >
            {s.titulo}
          </span>

          {/* abierto: el nombre, la descripción y la llamada */}
          <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 md:opacity-0 md:delay-150 md:group-hover:opacity-100">
            <h3 className="text-lg font-bold tracking-tight text-white md:text-xl">{s.titulo}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">{s.descripcion}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white">
              Conocer más
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default GaleriaServicios;
