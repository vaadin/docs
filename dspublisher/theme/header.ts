import { html, LitElement } from 'lit';

const discussion = document.createElement('section');
discussion.classList.add('discussion-wrapper');
discussion.innerHTML = `
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
  border: 0;
  margin: 0 -8px;
  width: calc(100% + 16px);
  max-width: none;
}
</style>
<p><b>Was this page helpful?</b><br>Leave a comment or a question below. You can also join the <a href="https://discord.gg/MYFq5RTbBn" rel="noopened">chat on Discord</a> or <a href="https://stackoverflow.com/questions/tagged/vaadin" rel="noopened">ask questions on StackOverflow</a>.</p>
<iframe></iframe>
`;

export default class Example extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('on-location-change', this._locationChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('on-location-change', this._locationChange);
  }

  _locationChange() {
    // The discussion element needs to be re-attached after every page change, since React is not
    // aware of its existence and clears it from the DOM. Attach it lazily.
    setTimeout(() => {
      document.querySelector('main > article').append(discussion);
      // Drop '/docs' from the beginning of the pathname
      const id = btoa(document.location.pathname.substring(5));
      const url = encodeURI(document.location.pathname.substring(5));
      const name = encodeURI(document.title);
      discussion.querySelector(
        'iframe'
      ).src = `https://preview.vaadin.com/vaadincom/discussion-service/embed.html?root=DOCS&id=${id}&url=${url}&name=${name}&description=`;
    }, 1000);
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
