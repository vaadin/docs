class Header extends HTMLElement {
  __initialized = false;

  private haasImportScript() {
    const script = document.createElement("script");
    script.onload = () => (window as any).haas.loader.initMenu();
    script.defer = true;
    script.src =
      window.location.hostname == "preview.vaadin.com"
        ? "https://preview.vaadin.com/vaadincom/haas-service/v2/haas-loader.js"
        : "https://vaadin.com/vaadincom/haas-service/v2/haas-loader.js";
    return script;
  }
  connectedCallback() {
    if (!this.__initialized) {
      this.__initialized = true;

      this.innerHTML = `
        <link
          rel="stylesheet"
          href="https://cdn.vaadin.com/website/antlers/v2/assets/fonts/nbinternationalpro/stylesheet.css"
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
      `;

      const haasImportScriptElement = this.haasImportScript();
      document.head.appendChild(haasImportScriptElement);
    }
  }
}

customElements.define("dspublisher-header", Header);
