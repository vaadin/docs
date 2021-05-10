export function renderBanner(image: string, content: string, link: string) {
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

  const bannerHtml = `<div class='toc-banner'>
      <a href='${link}'>
        <img src='${image}' alt='banner-image' />
        <div class='toc-banner--content'><p>${content}</p></div>
      </a>
    </div>`;

  bannerWrapper.innerHTML = bannerHtml;
}
