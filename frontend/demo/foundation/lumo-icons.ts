import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-lumo-styles/typography';
import '@vaadin/vaadin-lumo-styles/sizing';
import './icons-preview';

export default class LumoIcons extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<icons-preview name="lumo"></icons-preview>`;
  }
}

customElements.define('lumo-icons', LumoIcons);
