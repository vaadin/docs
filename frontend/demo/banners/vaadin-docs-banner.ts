import { LitElement, customElement, html, property, css } from 'lit-element';

@customElement('vaadin-docs-banner')
export class VaadinDocsBanner extends LitElement {
  @property()
  image = '';

  @property()
  link = '';

  static styles = css`
    .toc-banner {
      margin-top: 2rem;
      position: relative;
      width: 11.25rem;
    }

    .toc-banner > img {
      width: 100%;
      height: auto;
    }

    .toc-banner--content {
      margin-top: 1rem;
      line-height: 1.5;
    }

    .toc-banner > a {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`<div class="toc-banner">
      <img src="${this.image}" />
      <div class="toc-banner--content">
        <slot></slot>
      </div>
      <a href="${this.link}"></a>
    </div>`;
  }
}

export function renderBanner(image: string, content: string, link: string) {
  let bannerWrapper = document.getElementById('tocBanner');

  if (bannerWrapper) {
    return;
  }

  let tocEl = document.getElementById('toc');

  // Add an empty ToC div in case page doesn't have one.
  if (!tocEl) {
    const pageTitle = document.querySelector("main > article > header[class^=PageHeader-module--pageHeader]");
    tocEl = document.createElement("div");
    tocEl.classList.add("toc");

    pageTitle?.insertAdjacentElement("afterend", tocEl);
  }

  bannerWrapper = document.createElement('div');
  bannerWrapper.id = 'tocBanner';
  tocEl?.appendChild(bannerWrapper);

  const bannerComponent = document.createElement('vaadin-docs-banner');
  bannerComponent.setAttribute('image', image);
  bannerComponent.setAttribute('link', link);
  bannerComponent.innerHTML = content;
  bannerWrapper.appendChild(bannerComponent);
}
