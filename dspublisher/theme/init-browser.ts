import { html, LitElement, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { iframeResizer } from 'iframe-resizer';

// Highlights PR changes on preview deployments (no-op on the production site)
import './preview-diff';

// Import banner image
import tocBanner from './images/toc-banner.webp';

if (!localStorage.getItem('vaadin.docsApp.preferredExample')) {
  localStorage.setItem('vaadin.docsApp.preferredExample', 'Java');
}

declare global {
  interface Window {
    DiscourseEmbed?: {
      discourseUrl: string;
      topicId?: number;
      discourseEmbedUrl?: string;
    };
  }
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
  private topicId: number | null = null;

  private static readonly FORUM_URL = window.location.hostname == 'vaadin.com' ? 'https://vaadin.com/forum/' : 'https://preview.vaadin.com/forum/';

  connectedCallback() {
    super.connectedCallback();

    const discussionId = document
      .querySelector('.discussion-id')
      ?.textContent?.trim();

    if (discussionId && process.env.NODE_ENV !== 'development') {
      this.resolveTopicId(discussionId);
    }
  }
  
  private async resolveTopicId(discussionId: string): Promise<void> {
    try {
      const res = await fetch(
        `${Footer.FORUM_URL}t/external_id/${discussionId}.json`,
        { credentials: 'include' }
      );
      if (!res.ok) {
        console.warn(`No topic for ${discussionId} (${res.status})`);
        return;
      }
      const data = await res.json();
      this.topicId = data.id;
    } catch (err) {
      console.error('Discourse resolve failed:', err);
    }
  }
  
  protected async updated(changed: Map<string, unknown>) {
    super.updated(changed);
    
    if (!changed.has('topicId') || this.topicId === null) return;
    
    const topicId = this.topicId;
    await this.updateComplete;

    if (document.querySelector(
      `script[src="${Footer.FORUM_URL}javascripts/embed.js"]`
    )) return;

    window.DiscourseEmbed = {
      discourseUrl: Footer.FORUM_URL,
      topicId
    };
    const d = document.createElement('script');
    d.async = true;
    d.src = Footer.FORUM_URL + 'javascripts/embed.js';
    document.head.appendChild(d);
  }
    
  render() {
    // Don't render discussions in development builds or if no discussion ID is set
    if (process.env.NODE_ENV === 'development' || !this.topicId) {
      return nothing;
    }

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
      </style>
      <section class="discussion-wrapper">
        <p>
          <b>Was this page helpful?</b><br />Join the forum discussion below or go browse <a href="https://vaadin.com/forum/" rel="noopener">other discussions</a>.
        </p>
        <div id="discourse-comments"></div>
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
                <img src=${tocBanner.src} alt="Learn by watching">
              </div>
            </a>
          </div>
          `;
  }
}

customElements.define('dspublisher-toc-footer', TocFooter);
