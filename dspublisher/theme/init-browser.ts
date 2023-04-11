import { html, LitElement, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { iframeResizer } from 'iframe-resizer';

// Import all Lumo CSS custom properties into the global style scope
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
// Import all Material CSS custom properties into the global style scope
import '@vaadin/vaadin-material-styles/color';
import '@vaadin/vaadin-material-styles/typography';

if (!localStorage.getItem('vaadin.docsApp.preferredExample')) {
  localStorage.setItem('vaadin.docsApp.preferredExample', 'Java');
}

class Header extends LitElement {
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

customElements.define('dspublisher-header', Header);

class Footer extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state()
  private documentTitle = document.title;

  private __titleObserver = new MutationObserver(() => {
    this.documentTitle = document.title;
  });

  connectedCallback() {
    super.connectedCallback();

    const titleElement = document.head.querySelector('title');
    if (titleElement) {
      this.__titleObserver.observe(titleElement, {
        subtree: true,
        characterData: true,
        childList: true,
      });
    } else {
      console.warn('No title element found in the document');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.__titleObserver.disconnect();
  }

  protected firstUpdated() {
    iframeResizer({ log: true }, '#discussion-iframe');
  }

  render() {
    const id = document.querySelector('.discussion-id')?.textContent;

    // Don't render discussions in development builds and if no discussion ID is set
    if (process.env.NODE_ENV === 'development' || !id) {
      return nothing;
    }

    const url = encodeURI(document.location.pathname);

    let iframeSrc =
      window.location.hostname == 'preview.vaadin.com'
        ? 'https://preview.vaadin.com'
        : 'https://vaadin.com';

    iframeSrc += `/vaadincom/discussion-service/embed.html?root=DOCS&id=${id}&url=${url}&name=${encodeURI(
      this.documentTitle
    )}&description=`;

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
          color-scheme: normal;
          border: 0;
          margin: 0 -8px;
          width: calc(100% + 16px);
          max-width: none;
        }
      </style>
      <section class="discussion-wrapper">
        <p>
          <b>Was this page helpful?</b><br />Leave a comment or ask a question, or share your own
          code examples. You can also join the
          <a href="https://discord.gg/MYFq5RTbBn" rel="noopened">chat on Discord</a> or
          <a href="https://stackoverflow.com/questions/tagged/vaadin" rel="noopened"
            >ask questions on StackOverflow</a
          >.
        </p>
        <iframe id="discussion-iframe" src="${iframeSrc}"></iframe>
      </section>
    `;
  }
}

customElements.define('dspublisher-article-footer', Footer);
