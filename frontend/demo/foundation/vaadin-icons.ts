import '@vaadin/icons/vaadin-iconset.js';
import './icons-preview';

export default class VaadinIcons extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<icons-preview name="vaadin"></icons-preview>`;
  }
}

customElements.define('vaadin-icons', VaadinIcons);
