import '@vaadin/vaadin-lumo-styles/icons';
import './lumo-tokens';
import './icons-preview';

export default class LumoIcons extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<icons-preview name="lumo"></icons-preview>`;
  }
}

customElements.define('lumo-icons', LumoIcons);
