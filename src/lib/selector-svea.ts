/**
 * <svea-select>: la lista desplegable con el diseño del sitio.
 *
 * El <select> nativo se ve gris y distinto en cada sistema. Este elemento
 * envuelve al <select> REAL —el que viaja en el envío y el que compara la
 * huella de la LISTA ROJA en scripts/verificar.mjs— y le pone encima un
 * selector propio: mismo alto, borde y radio que los inputs, lista blanca con
 * sombra suave, hover verde SVEA, visto verde en la opción elegida y chevron
 * propio.
 *
 *   <svea-select><select name="…" required>…</select></svea-select>
 *
 * Cómo:
 *   · Shadow DOM: el botón y la lista viven en la sombra y el <select> queda
 *     en el DOM normal (un <slot>). Así React (portada, guías) hidrata su
 *     <select> sin ver nada extraño, y el HTML del servidor no cambia.
 *   · El <select> se sigue enviando: queda invisible bajo el botón, fuera del
 *     orden de tabulación, y cada elección lo actualiza y dispara `input` y
 *     `change`. Si cambia por fuera (reset del formulario), el botón se pone
 *     al día.
 *   · Accesible (patrón «select-only combobox» de la APG): role=combobox con
 *     aria-expanded/aria-controls/aria-activedescendant, role=listbox y
 *     role=option con aria-selected. Teclado: flechas, Inicio/Fin, RePág/AvPág,
 *     Enter/Espacio, Esc, Tab y búsqueda por letras. El <label for> del
 *     <select> da el nombre accesible y, al hacer clic, lleva el foco al botón.
 *   · La lista se abre en la capa superior (Popover API) para que ningún
 *     overflow:hidden la recorte; sin Popover, cae a posición absoluta.
 *   · Obligatorio: si el <select> es required y está vacío al enviar, se
 *     marca en rojo, se avisa debajo y el foco va al botón.
 *   · Sin JavaScript se ve el <select> nativo, que funciona igual.
 *
 * Las medidas salen de variables CSS del anfitrión (tailwind.css):
 * --ss-alto, --ss-radio, --ss-fuente, --ss-borde.
 */

const CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
const VISTO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

const ESTILO = `
:host{display:block;position:relative}
.caja{position:relative}
.boton{box-sizing:border-box;display:flex;align-items:center;width:100%;height:var(--ss-alto,44px);padding:0 38px 0 12px;
  border:1px solid var(--ss-borde,#e6e8e4);border-radius:var(--ss-radio,6px);background:#fff;color:#000;
  font:inherit;font-size:var(--ss-fuente,14px);line-height:1.2;text-align:left;cursor:pointer;
  transition:border-color .15s,box-shadow .15s;-webkit-tap-highlight-color:transparent;user-select:none}
.boton:hover{border-color:rgba(0,0,0,.25)}
.boton:focus{outline:none}
.boton:focus-visible,:host([abierto]) .boton{border-color:#0e7a3c;box-shadow:0 0 0 2px rgba(14,122,60,.25)}
:host([invalido]) .boton{border-color:#a32f26;box-shadow:0 0 0 2px rgba(163,47,38,.15)}
.texto{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.texto.vacio{color:rgba(0,0,0,.4)}
.chevron{position:absolute;right:12px;top:50%;width:16px;height:16px;margin-top:-8px;color:rgba(0,0,0,.5);pointer-events:none;transition:transform .2s}
.chevron svg,.visto svg{display:block;width:100%;height:100%}
:host([abierto]) .chevron{transform:rotate(180deg);color:#0e7a3c}
.lista{box-sizing:border-box;margin:0;padding:6px;list-style:none;background:#fff;color:#000;
  border:1px solid #e6e8e4;border-radius:10px;box-shadow:0 18px 40px -16px rgba(0,0,0,.28),0 2px 8px rgba(0,0,0,.06);
  max-height:288px;overflow:auto;overscroll-behavior:contain;font:inherit;font-size:var(--ss-fuente,14px);z-index:60}
.lista:not([popover]){position:absolute;left:0;right:0;top:calc(100% + 6px)}
.lista:not([popover]).arriba{top:auto;bottom:calc(100% + 6px)}
.lista[popover]{position:fixed;inset:auto;margin:0}
.lista[hidden]{display:none}
.op{display:flex;align-items:center;gap:10px;min-height:40px;padding:9px 10px 9px 12px;border-radius:6px;cursor:pointer;line-height:1.35}
.op .t{flex:1;min-width:0}
.op.activa{background:rgba(14,122,60,.08);color:#0e7a3c}
.op[aria-selected="true"]{font-weight:600}
.op[aria-disabled="true"]{color:rgba(0,0,0,.35);cursor:default;background:none}
.visto{width:16px;height:16px;flex:none;color:#0e7a3c;visibility:hidden}
.op[aria-selected="true"] .visto{visibility:visible}
.aviso{margin:6px 0 0;font-size:13px;color:#a32f26}
.aviso[hidden]{display:none}
@media (pointer:coarse){.op{min-height:44px}}
@media (prefers-reduced-motion:reduce){.boton,.chevron{transition:none}}
`;

let contador = 0;
const sinTildes = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const POPOVER = typeof HTMLElement !== 'undefined' && 'popover' in HTMLElement.prototype;

class SveaSelect extends HTMLElement {
  private sel!: HTMLSelectElement;
  private boton!: HTMLDivElement;
  private texto!: HTMLSpanElement;
  private lista!: HTMLUListElement;
  private aviso!: HTMLParagraphElement;
  private ops: { el: HTMLLIElement; op: HTMLOptionElement }[] = [];
  private activa = -1;
  private busca = '';
  private buscaHasta = 0;
  private listo = false;

  connectedCallback() {
    if (this.listo) return;
    const sel = this.querySelector('select');
    if (!sel) {
      // el <select> todavía no está (render del cliente): esperar a que llegue
      const mo = new MutationObserver(() => { if (this.querySelector('select')) { mo.disconnect(); this.connectedCallback(); } });
      mo.observe(this, { childList: true });
      return;
    }
    this.listo = true;
    this.sel = sel;
    const n = ++contador;
    const raiz = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    raiz.innerHTML = `<style>${ESTILO}</style>
      <slot></slot>
      <div class="caja">
        <div class="boton" role="combobox" tabindex="0" aria-haspopup="listbox" aria-expanded="false" aria-controls="ss-lista-${n}">
          <span class="texto"></span><span class="chevron">${CHEVRON}</span>
        </div>
        <ul class="lista" id="ss-lista-${n}" role="listbox" tabindex="-1" hidden></ul>
      </div>
      <p class="aviso" role="alert" hidden>Selecciona una opción de la lista.</p>`;
    this.boton = raiz.querySelector('.boton')!;
    this.texto = raiz.querySelector('.texto')!;
    this.lista = raiz.querySelector('.lista')!;
    this.aviso = raiz.querySelector('.aviso')!;
    if (POPOVER) this.lista.setAttribute('popover', 'manual');

    // el <select> real: fuera del foco y de la vista, pero en el formulario
    sel.tabIndex = -1;
    sel.setAttribute('aria-hidden', 'true');

    // nombre accesible: el <label for> del <select>
    const etiqueta = sel.id ? document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(sel.id)}"]`) : null;
    const nombre = (etiqueta?.textContent || sel.getAttribute('aria-label') || sel.name || '').replace(/\s*\*\s*$/, '').trim();
    if (nombre) this.boton.setAttribute('aria-label', nombre);
    if (sel.required) this.boton.setAttribute('aria-required', 'true');

    this.armarOpciones();
    this.pintar();

    this.boton.addEventListener('click', () => (this.estaAbierto() ? this.cerrar() : this.abrir()));
    this.boton.addEventListener('keydown', (e) => this.tecla(e));
    this.boton.addEventListener('blur', () => { if (this.estaAbierto()) setTimeout(() => { if (!this.contiene(document.activeElement)) this.cerrar(); }, 0); });
    this.lista.addEventListener('pointerdown', (e) => e.preventDefault());   // el foco no deja el botón
    this.lista.addEventListener('click', (e) => {
      const li = (e.target as Element).closest('li');
      const i = this.ops.findIndex((o) => o.el === li);
      if (i >= 0 && !this.ops[i].op.disabled) { this.elegir(i); this.cerrar(); this.boton.focus(); }
    });
    this.lista.addEventListener('pointermove', (e) => {
      const li = (e.target as Element).closest('li');
      const i = this.ops.findIndex((o) => o.el === li);
      if (i >= 0 && i !== this.activa && !this.ops[i].op.disabled) this.marcar(i, false);
    });
    // el <label for> enfoca el <select>: el foco pasa al botón
    sel.addEventListener('focus', () => this.boton.focus());
    sel.addEventListener('change', () => this.pintar());
    sel.addEventListener('invalid', (e) => {
      e.preventDefault();
      this.setAttribute('invalido', '');
      this.aviso.hidden = false;
      if (sel.form?.querySelector(':invalid') === sel) this.boton.focus();
    });
    sel.form?.addEventListener('reset', () => setTimeout(() => this.pintar(), 0));
    document.addEventListener('pointerdown', (e) => {
      if (this.estaAbierto() && !e.composedPath().includes(this)) this.cerrar();
    });
    const reubicar = () => { if (this.estaAbierto()) this.ubicar(); };
    window.addEventListener('resize', reubicar);
    window.addEventListener('scroll', reubicar, { capture: true, passive: true });
    // si alguien cambia las opciones del <select>, la lista se rehace
    new MutationObserver(() => { this.armarOpciones(); this.pintar(); }).observe(sel, { childList: true, subtree: true, characterData: true });
  }

  private contiene(el: Element | null) { return !!el && (el === this || this.contains(el) || this.shadowRoot!.contains(el)); }
  private estaAbierto() { return this.hasAttribute('abierto'); }

  private armarOpciones() {
    this.lista.textContent = '';
    this.ops = [];
    Array.from(this.sel.options).forEach((op, i) => {
      // el «Selecciona…» (vacío y deshabilitado) es el marcador del botón, no una opción
      if (op.value === '' && op.disabled) return;
      const li = document.createElement('li');
      li.className = 'op';
      li.id = `${this.lista.id}-op-${i}`;
      li.setAttribute('role', 'option');
      if (op.disabled) li.setAttribute('aria-disabled', 'true');
      const t = document.createElement('span');
      t.className = 't';
      t.textContent = op.textContent ?? '';
      li.append(t);
      li.insertAdjacentHTML('beforeend', `<span class="visto">${VISTO}</span>`);
      this.lista.append(li);
      this.ops.push({ el: li, op });
    });
  }

  private pintar() {
    const op = this.sel.selectedOptions[0];
    const vacio = !op || op.value === '';
    const marcador = Array.from(this.sel.options).find((o) => o.value === '');
    this.texto.textContent = vacio ? (marcador?.textContent ?? 'Selecciona…') : (op.textContent ?? '');
    this.texto.classList.toggle('vacio', vacio);
    for (const o of this.ops) o.el.setAttribute('aria-selected', String(o.op === op && !vacio));
    if (!vacio) { this.removeAttribute('invalido'); this.aviso.hidden = true; }
  }

  private indiceElegido() { return this.ops.findIndex((o) => o.op.selected && o.op.value !== ''); }

  private abrir(desde?: number) {
    if (this.estaAbierto()) return;
    this.setAttribute('abierto', '');
    this.boton.setAttribute('aria-expanded', 'true');
    this.lista.hidden = false;
    if (POPOVER) { try { this.lista.showPopover(); } catch { /* ya abierta */ } }
    this.ubicar();
    const i = desde ?? this.indiceElegido();
    this.marcar(i >= 0 ? i : this.siguiente(-1, 1), true);
  }

  private cerrar() {
    if (!this.estaAbierto()) return;
    this.removeAttribute('abierto');
    this.boton.setAttribute('aria-expanded', 'false');
    this.boton.removeAttribute('aria-activedescendant');
    if (POPOVER) { try { this.lista.hidePopover(); } catch { /* ya cerrada */ } }
    this.lista.hidden = true;
    this.lista.classList.remove('arriba');
  }

  /** abajo del botón si cabe; si no, arriba; y a lo más el espacio que haya */
  private ubicar() {
    const r = this.boton.getBoundingClientRect();
    const alto = Math.min(this.lista.scrollHeight, 288);
    const abajo = window.innerHeight - r.bottom - 12;
    const arriba = r.top - 12;
    const haciaArriba = abajo < alto && arriba > abajo;
    const max = Math.max(120, Math.min(288, haciaArriba ? arriba - 6 : abajo - 6));
    this.lista.style.maxHeight = `${max}px`;
    if (POPOVER) {
      const h = Math.min(alto, max);
      this.lista.style.left = `${r.left}px`;
      this.lista.style.width = `${r.width}px`;
      this.lista.style.top = `${haciaArriba ? r.top - 6 - h : r.bottom + 6}px`;
    } else {
      this.lista.classList.toggle('arriba', haciaArriba);
    }
  }

  private marcar(i: number, centrar: boolean) {
    if (i < 0 || i >= this.ops.length) return;
    if (this.activa >= 0 && this.ops[this.activa]) this.ops[this.activa].el.classList.remove('activa');
    this.activa = i;
    const li = this.ops[i].el;
    li.classList.add('activa');
    this.boton.setAttribute('aria-activedescendant', li.id);
    // que se vea, moviendo sólo la lista (no la página)
    const l = this.lista;
    if (li.offsetTop < l.scrollTop) l.scrollTop = li.offsetTop - (centrar ? l.clientHeight / 2 : 6);
    else if (li.offsetTop + li.offsetHeight > l.scrollTop + l.clientHeight)
      l.scrollTop = li.offsetTop + li.offsetHeight - l.clientHeight + (centrar ? l.clientHeight / 2 : 6);
  }

  /** la próxima opción habilitada desde i en la dirección d */
  private siguiente(i: number, d: number) {
    for (let j = i + d; j >= 0 && j < this.ops.length; j += d) if (!this.ops[j].op.disabled) return j;
    return i;
  }

  private elegir(i: number) {
    const { op } = this.ops[i];
    if (op.disabled) return;
    const cambio = !op.selected;
    op.selected = true;
    this.pintar();
    if (cambio) {
      this.sel.dispatchEvent(new Event('input', { bubbles: true }));
      this.sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  private buscar(letra: string) {
    const ahora = Date.now();
    this.busca = ahora < this.buscaHasta ? this.busca + letra : letra;
    this.buscaHasta = ahora + 600;
    const q = sinTildes(this.busca);
    const desde = this.estaAbierto() ? this.activa : this.indiceElegido();
    const orden = [...this.ops.keys()].map((k) => (k + Math.max(desde, 0) + (this.busca.length === 1 ? 1 : 0)) % this.ops.length);
    const i = orden.find((k) => !this.ops[k].op.disabled && sinTildes(this.ops[k].op.textContent ?? '').startsWith(q));
    if (i === undefined) return;
    if (this.estaAbierto()) this.marcar(i, false);
    else this.elegir(i);
  }

  private tecla(e: KeyboardEvent) {
    const abierto = this.estaAbierto();
    const k = e.key;
    if (!abierto) {
      if (k === 'ArrowDown' || k === 'ArrowUp' || k === 'Enter' || k === ' ') { e.preventDefault(); this.abrir(); return; }
      if (k === 'Home') { e.preventDefault(); this.abrir(this.siguiente(-1, 1)); return; }
      if (k === 'End') { e.preventDefault(); this.abrir(this.siguiente(this.ops.length, -1)); return; }
      if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); this.buscar(k); }
      return;
    }
    switch (k) {
      case 'ArrowDown': e.preventDefault(); if (e.altKey) break; this.marcar(this.siguiente(this.activa, 1), false); break;
      case 'ArrowUp':
        e.preventDefault();
        if (e.altKey) { this.elegir(this.activa); this.cerrar(); break; }
        this.marcar(this.siguiente(this.activa, -1), false); break;
      case 'Home': e.preventDefault(); this.marcar(this.siguiente(-1, 1), false); break;
      case 'End': e.preventDefault(); this.marcar(this.siguiente(this.ops.length, -1), false); break;
      case 'PageDown': e.preventDefault(); this.marcar(Math.min(this.activa + 6, this.siguiente(this.ops.length, -1)), false); break;
      case 'PageUp': e.preventDefault(); this.marcar(Math.max(this.activa - 6, this.siguiente(-1, 1)), false); break;
      case 'Enter': case ' ':
        if (k === ' ' && Date.now() < this.buscaHasta) { e.preventDefault(); this.buscar(' '); break; }
        e.preventDefault(); if (this.activa >= 0) this.elegir(this.activa); this.cerrar(); break;
      case 'Escape': e.preventDefault(); this.cerrar(); break;
      case 'Tab': if (this.activa >= 0) this.elegir(this.activa); this.cerrar(); break;
      default:
        if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); this.buscar(k); }
    }
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('svea-select')) {
  customElements.define('svea-select', SveaSelect);
}
