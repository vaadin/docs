export function renderBanner(image: string, content: string, link: string) {
  let bannerWrapper = document.getElementById("tocBanner");

  if (bannerWrapper) {
    return;
  }

  let tocEl = document.getElementById("toc");

  // Add an empty ToC div in case page doesn't have one.
  if (!tocEl) {
    const pageTitle = document.querySelector(
      "main > article > header[class^=PageHeader-module--pageHeader]"
    );
    tocEl = document.createElement("div");
    tocEl.classList.add("toc");

    pageTitle?.insertAdjacentElement("afterend", tocEl);
  }

  // Prepare banner container
  bannerWrapper = document.createElement("div");
  bannerWrapper.id = "tocBanner";
  tocEl?.appendChild(bannerWrapper);

  const bannerHtml = `<div class="toc-banner">
        <img src="${image}" />
        <div class="toc-banner--content">
            ${content}
        </div>
        <a href="${link}"></a>
    </div>`;

  bannerWrapper.innerHTML = bannerHtml;
}
