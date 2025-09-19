import './icons-preview.js';

export class VaadinIconsPreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<icons-preview iconset-type="vaadin"></icons-preview>`;
  }
}

customElements.define('vaadin-icons-preview', VaadinIconsPreview);
