import { html, LitElement, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { iframeResizer } from 'iframe-resizer';

// Import banner image
import tocBanner from './images/toc-banner.webp';

if (!localStorage.getItem('vaadin.docsApp.preferredExample')) {
  localStorage.setItem('vaadin.docsApp.preferredExample', 'Java');
}

// Add stylesheet links to document head once
if (process.env.NODE_ENV !== 'development') {
  const stylesheets = [
    {
      rel: 'stylesheet',
      href: 'https://cdn.vaadin.com/website/antlers/v2/assets/fonts/nbinternationalpro/stylesheet.css',
    },
    {
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.vaadin.com/website/antlers/v2/assets/icons/css/line-awesome.min.css',
    },
    {
      rel: 'preload',
      as: 'style',
      href: 'https://cdn.vaadin.com/website/hubspot-theme/v2/haas/css/haas.css',
    },
  ];

  stylesheets.forEach(({ rel, href, as }) => {
    // Check if link already exists to prevent duplicates
    if (!document.head.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) {
        link.setAttribute('as', as);
      }
      document.head.appendChild(link);
    }
  });
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
          <b>Was this page helpful?</b><br />Leave a comment below or <a href="https://vaadin.com/forum/" rel="noopened">join our forum</a> for further discussions, questions, and sharing your code examples.
        </p>
        <iframe id="discussion-iframe" src="${iframeSrc}"></iframe>
      </section>
    `;
  }
}

customElements.define('dspublisher-article-footer', Footer);

class TocFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
          <style>
            .toc-footer {
              margin-top: 2rem;
              width: 11.25rem;
            }

            .toc-footer--img img {
              margin-top: 1rem; 
              width: 100%;
              height: auto;
              border-radius: 0.25rem;
            }

            .toc-footer--content {
              line-height: 1.5;
              font-size: var(--docs-font-size-2xs);
              color: var(--docs-secondary-text-color);
            }

            .toc-footer--heading {
              font-weight: 600;
              color: var(--docs-heading-text-color) !important;
            }
           
            .toc-footer > a::after {
              content: none !important;
            }
            
            /* Hide the footer on mobile when the TOC is closed */
            @media screen and (max-width: 65rem) {
              .toctoggle:not([open]) + .toc > dspublisher-toc-footer {
                  display: none;
              }

              .toc-footer {
                width: auto;
                display: flex;
                flex-direction: row-reverse;
                align-items: flex-start;
                gap: 1rem; 
                justify-content: flex-end;
              }

              .toc-footer--img {
                flex-shrink: 0; 
                width: 4rem; 
              }

              .toc-footer--img img {
                margin-top: 0;
                width: 100%;
                height: auto;
                border-radius: 0.25rem;
              }

              .toc-footer--content {
                flex: 1;
                padding-top: 0.25rem; 
              }
            }
          </style>

          <div class="toc-footer">
            <a href="https://vaadin.com/learn/training" class="toc-footer--link">

              <div class="toc-footer--heading">UI Training & Certification</div>
              <div class="toc-footer--content">
                Master your Java web app development skills and become a certified Vaadin developer.
              </div>

              <div class="toc-footer--img">
                <img src=${tocBanner.src} alt="Learn by watching"
              </div>
            </a>
          </div>
          `;
  }
}

customElements.define('dspublisher-toc-footer', TocFooter);