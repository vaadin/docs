export class RenderBanner extends HTMLElement {
  connectedCallback() {
    this.renderBanner();
  }

  renderBanner() {
    let bannerWrapper = document.getElementById('tocBanner');

    if (bannerWrapper) {
      return;
    }

    let tocEl = document.getElementById('toc');

    // Add an empty ToC div in case page doesn't have one.
    if (!tocEl) {
      const pageTitle = document.querySelector(
        'main > article > header[class^=PageHeader-module--pageHeader]'
      );
      tocEl = document.createElement('div');
      tocEl.classList.add('toc');

      pageTitle?.insertAdjacentElement('afterend', tocEl);
    }

    // Prepare banner container
    bannerWrapper = document.createElement('div');
    bannerWrapper.id = 'tocBanner';
    tocEl?.appendChild(bannerWrapper);

    // Banner elements
    const text = document.querySelector('.toc-banner-source-text')?.innerHTML;
    const link = document.querySelector('.toc-banner-source-link')?.textContent;

    const bannerHtml = `<div class='toc-banner'>
          <a href='${link}'>
            <div class="toc-banner--img"></div>
            <div class='toc-banner--content'>${text}</div>
          </a>
        </div>`;

    bannerWrapper.innerHTML = bannerHtml;

    // Add banner image
    const imgSource = document.querySelector('.toc-banner-source .image');
    const imgTarget = bannerWrapper.querySelector('.toc-banner--img');

    if (imgSource && imgTarget) {
      imgTarget.appendChild(imgSource);
    }
  }
}
