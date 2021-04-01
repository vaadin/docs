import { html, LitElement } from 'lit-element';

export default class Example extends LitElement {
  createRenderRoot() {
    return this;
  }

  private haasImportScript() {
    const script = document.createElement('script');
    script.onload = () => (window as any).haas.loader.initMenu();
    script.src =
      window.location.hostname == 'preview.vaadin.com'
        ? 'https://preview.vaadin.com/vaadincom/haas-service/haas-loader.js'
        : 'https://vaadin.com/vaadincom/haas-service/haas-loader.js';
    return script;
  }

  render() {
    return html`
      <div class="vcom-header" id="haas-container"></div>
      ${this.haasImportScript()}
    `;
  }
}
