import { IronMeta } from '@polymer/iron-meta';

export class IconsPreview extends HTMLElement {
  connectedCallback() {
    const collectionName = this.getAttribute('name');

    const collection = new IronMeta({ type: 'iconset', value: null }).list.find(
      (i: any) => i.name === collectionName
    );

    const iconNames = collection.getIconNames().map((name: string) => name.split(':')[1]);

    let html = `
      <style>
        icons-preview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
          max-height: 80vh;
          overflow: auto;
          border: 1px solid var(--docs-divider-color-1);
          border-radius: var(--docs-border-radius-l);
          margin: 2rem 0;
        }

        .docs-icon-preview {
          text-align: center;
          padding-bottom: var(--docs-space-l);
          line-height: 1;
        }

        .docs-icon-preview.hidden {
          display: none;
        }

        .docs-icon-preview svg {
          width: 24px !important;
          height: 24px !important;
          display: inline-block !important;
          fill: currentColor;
        }

        .docs-icon-preview-name {
          display: block;
          font-size: var(--docs-font-size-2xs);
          color: var(--docs-secondary-text-color);
        }

        .docs-icon-search {
          grid-column: 1 / -1;
          max-width: 20em;
          margin: var(--docs-space-xl) auto;
          font: inherit;
          font-size: var(--docs-font-size-m);
          border: 1px solid var(--docs-divider-color-2);
          background: var(--docs-surface-color-1);
          color: var(--docs-body-text-color);
          border-radius: var(--docs-border-radius-m);
          padding: var(--docs-space-xs) var(--docs-space-s);
        }
      </style>

      <input class="docs-icon-search" type="search" aria-label="Search icons" placeholder="Search icons…">
    `;

    iconNames.forEach((name: string) => {
      const svg = collection._cloneIcon(name);
      html += `
        <div class="docs-icon-preview icon-${name}">
          ${svg.outerHTML}
          <span class="docs-icon-preview-name">${name}</div>
        </div>`;
    });

    this.innerHTML = html;

    const search = this.querySelector('input');
    search?.addEventListener('input', () => {
      this.querySelectorAll('.docs-icon-preview').forEach((icon) => {
        icon.classList.toggle(
          'hidden',
          icon.className.toLowerCase().indexOf(search.value.toLowerCase()) === -1
        );
      });
    });
  }
}

customElements.define('icons-preview', IconsPreview);
