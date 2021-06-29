import { IconsetElement } from '@vaadin/vaadin-icon/vaadin-iconset';
import '@vaadin/vaadin-icon/vaadin-icon';

const DEPRECATED_ICONS: Record<string, string> = {
  buss: 'bus',
  palete: 'palette',
  funcion: 'function',
  megafone: 'megaphone',
  'trendind-down': 'trending-down',
};

export class IconsPreview extends HTMLElement {
  connectedCallback() {
    const iconsetName = this.getAttribute('name')!;
    const iconset = IconsetElement.getIconset(iconsetName);

    // A hack to get the `_icons` property computed.
    // https://github.com/vaadin/web-components/blob/447e95e0e08d396167af9a42f68b04529b412ebd/packages/vaadin-icon/src/vaadin-iconset.js#L90
    iconset.applyIcon('');

    // @ts-ignore
    const iconNames = Object.keys(iconset._icons);

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

        .docs-icon-preview.deprecated {
          text-decoration: line-through;
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
      let title = '';
      const isDeprecated = name in DEPRECATED_ICONS;

      if (isDeprecated) {
        title = `Since Vaadin 21, '${name}' is deprecated. Please use '${DEPRECATED_ICONS[name]}' instead.`;
      }

      html += `
        <div
          class="docs-icon-preview icon-${name} ${isDeprecated ? 'deprecated' : ''}"
          title="${title}"
        >
          <vaadin-icon icon="${iconsetName}:${name}"></vaadin-icon>
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
