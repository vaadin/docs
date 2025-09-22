import './icons-preview.js';

export class LumoIconsPreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<icons-preview iconset-type="lumo"></icons-preview>`;
  }
}

customElements.define('lumo-icons-preview', LumoIconsPreview);
