import { html, LitElement } from 'lit';
import { iframeResizer } from 'iframe-resizer';

customElements.define(
  'dspublisher-header',
  class extends LitElement {
    createRenderRoot() {
      return this;
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
      // Don't render HaaS in development (avoid noise in analytics)
      if (process.env.NODE_ENV === 'development') {
        return html``;
      }

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
);

customElements.define(
  'dspublisher-article-footer',
  class extends LitElement {
    createRenderRoot() {
      return this;
    }

    // connectedCallback() {
    //   super.connectedCallback();
    //   window.addEventListener('on-location-change', this._locationChange);
    // }
    //
    // disconnectedCallback() {
    //   super.disconnectedCallback();
    //   window.removeEventListener('on-location-change', this._locationChange);
    // }
    //
    // _locationChange() {
    //   this.requestUpdate();
    // }

    updated() {
      iframeResizer({ log: true }, '#discussion-iframe');
    }

    render() {
      // Drop '/docs' from the beginning of the pathname
      const id = btoa(document.location.pathname.substring(5));
      const url = encodeURI(document.location.pathname.substring(5));
      const name = encodeURI(document.title);

      return html`
      <style>
        .discussion-wrapper {
          margin-top: 3rem;
          padding: 2rem 0;
          border-top: 1px solid var(--docs-divider-color-1);
        }

        .discussion-wrapper p b {
          color: var(--docs-heading-text-color);
        }

        .discussion-wrapper iframe {
          border: 0;
          margin: 0 -8px;
          width: calc(100% + 16px);
          max-width: none;
        }
      </style>
      <section class="discussion-wrapper">
        <p><b>Was this page helpful?</b><br>Leave a comment or a question below. You can also join the <a href="https://discord.gg/MYFq5RTbBn" rel="noopened">chat on Discord</a> or <a href="https://stackoverflow.com/questions/tagged/vaadin" rel="noopened">ask questions on StackOverflow</a>.</p>
        <iframe id="discussion-iframe" src="https://preview.vaadin.com/vaadincom/discussion-service/embed.html?root=DOCS&id=${id}&url=${url}&name=${name}&description=">
      </section>
    `;
    }
  }
);
