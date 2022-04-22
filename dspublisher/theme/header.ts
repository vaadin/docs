import { html, LitElement } from 'lit';

const discussionFrame = document.createElement('iframe');
discussionFrame.style.border = '0';
discussionFrame.style.width = '100%';
discussionFrame.style.marginTop = '3rem';
discussionFrame.style.borderTop = '1px solid var(--docs-divider-color-1)';

export default class Example extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('on-location-change', this._locationChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('on-location-change', this._locationChange);
  }

  _locationChange() {
    // The discussion frame needs to be re-attached after every page change, since React is not
    // aware of its existence, so it clears it from the DOM. Attach the discussion frame lazily.
    setTimeout(() => {
      document.querySelector('main > article').append(discussionFrame);
      // Drop '/docs' from the beginning of the pathname
      const id = btoa(document.location.pathname.substring(5));
      const url = encodeURI(document.location.pathname.substring(5));
      const name = encodeURI(document.title);
      discussionFrame.src = `https://preview.vaadin.com/vaadincom/discussion-service/embed.html?root=DOCS&id=${id}&url=${url}&name=${name}&description=`;
    }, 1000);
  }

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

  render() {
    return html`
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap"
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
      ${this.haasImportScript()}
    `;
  }
}
