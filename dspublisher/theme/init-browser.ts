import { html, LitElement, nothing } from 'lit';

// Import all Lumo CSS custom properties into the global style scope
import '@vaadin/vaadin-lumo-styles/color.js';
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
      ${this.haasImportScript()}
    `;
  }
}

customElements.define('dspublisher-header', Header);

class Footer extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const id = document.querySelector('.discussion-id')?.textContent;

    // Don't render if no discussion ID is set
    if (!id) return nothing;

    return html`
      <style>
        .forum-discussions {
          margin-top: 3rem;
          padding: 2rem 0;
          border-top: 1px solid var(--docs-divider-color-1);
        }
        .forum-discussions-title {
          font-weight: 600;
        }
        .forum-discussions p {
          color: var(--docs-heading-text-color);
          margin-bottom: 1.5rem;
          margin-top: 0.5rem;
        }
        .forum-discussions a {
          letter-spacing: 0;
          padding-left: 2rem;
          padding-right: 2rem;
          text-transform: uppercase;
        }
      </style>
      <section class="forum-discussions">
        <span class="forum-discussions-title">Have a question or want to share your approach?</span>
        <p>Join the conversation in our community forum. You'll find the Vaadin team and other developers sharing questions, answers, and code examples. Search what's been asked before, or start a new thread.</p>
        <a href="https://vaadin.com/forum/latest" class="button primary water">Vaadin Forum</a>
      </section>
    `;
  }
}

customElements.define('dspublisher-article-footer', Footer);
