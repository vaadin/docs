export default class FusionRedirect extends HTMLElement {
  connectedCallback() {
    const params = new URLSearchParams(window.location.search);
    let path = params.get('path') ?? '';

    if (path.includes('overview')) {
      path = path.replace('overview', '');
    } else if (path.startsWith('guide/quick-start')) {
      path = 'quickstart';
    } else if (path.startsWith('forms')) {
      path = path.replace('forms', 'data-binding');
    }

    const link = document.querySelector<HTMLAnchorElement>('.hilla-docs-link');
    if (link) {
      link.href += path;
    }
  }
}

customElements.define('fusion-redirect', FusionRedirect);
