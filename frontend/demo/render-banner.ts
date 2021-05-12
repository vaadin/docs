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
    const imgSrc = (document.querySelector('.toc-banner-source img') as HTMLImageElement)?.src;
    const text = document.querySelector('.toc-banner-source-text')?.innerHTML;
    const link = document.querySelector('.toc-banner-source-link')?.textContent;

    const bannerHtml = `<div class='toc-banner'>
        <a href='${link}'>
          <img src='${imgSrc}' alt='banner-image' />
          <div class='toc-banner--content'>${text}</div>
        </a>
      </div>`;

    bannerWrapper.innerHTML = bannerHtml;
  }
}
