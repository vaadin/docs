// Use this custom element to modify the dspublisher header content
// Use an empty file to not show a header
export default class Example extends HTMLElement {
  __initialized = false;

  private haasImportScript() {
    const script = document.createElement('script');
    script.onload = () => (window as any).haas.loader.initMenu();
    script.defer = true;
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
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@600;700&display=swap"
        />
        <link
          rel="preload"
          as="style"
          href="https://cdn.vaadin.com/website/antlers/v2/assets/icons/css/line-awesome.min.css"
        />
        <link
          rel="preload"
          as="style"
          href="https://cdn.vaadin.com/website/hubspot-theme/v2/haas/css/haas.css"
        />
        <div id="haas-container"></div>
        <div class="old-version-notice">
          <p>
            <span>
              This docs is for an older Vaadin version. Check out the
              <a href="https://vaadin.com/docs/latest/">
                documentation for the latest Vaadin version</a
              >.
            </span>
          </p>
        </div>
      `;

      const haasImportScriptElement = this.haasImportScript();
      document.head.appendChild(haasImportScriptElement);
    }
  }
}
