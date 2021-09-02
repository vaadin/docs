// Use this custom element to modify the dspublisher header content
// Use an empty file to not show a header
export default class Example extends HTMLElement {
  __initialized = false;

  private haasImportScript() {
    const script = document.createElement('script');
    script.onload = () => (window as any).haas.loader.initMenu();
    script.src =
      window.location.hostname == 'preview.vaadin.com'
        ? 'https://preview.vaadin.com/vaadincom/haas-service/v2/haas-loader.js'
        : 'https://vaadin.com/vaadincom/haas-service/v2/haas-loader.js';
    return script;
  }

  connectedCallback() {
    if (!this.__initialized) {
      this.__initialized = true;

      this.innerHTML = `
        <div class="vcom-header" id="haas-container"></div>
        <div class="eol-notice">
          <p>
            <span>Vaadin 8 reaches End of Life on February 21, 2022.</span>
            <a href="https://vaadin.com/vaadin-8">Discover how to make your Vaadin 8 app futureproof →</a>
          </p>
        </div>
      `;

      const haasImportScriptElement = this.haasImportScript();
      document.head.appendChild(haasImportScriptElement);
    }
  }
}
