import { Iconset } from '@vaadin/icon/vaadin-iconset.js';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';

const DEPRECATED_ICONS: Record<string, string> = {
  'vaadin:buss': 'vaadin:bus',
  'vaadin:palete': 'vaadin:palette',
  'vaadin:funcion': 'vaadin:function',
  'vaadin:megafone': 'vaadin:megaphone',
  'vaadin:trendind-down': 'vaadin:trending-down',
};

export class IconsPreview extends HTMLElement {
  connectedCallback() {
    const lumoIconset = Iconset.getIconset('lumo');
    const vaadinIconset = Iconset.getIconset('vaadin');

    // A hack to get the `_icons` property computed.
    // https://github.com/vaadin/web-components/blob/447e95e0e08d396167af9a42f68b04529b412ebd/packages/vaadin-icon/src/vaadin-iconset.js#L90
    lumoIconset.applyIcon('');
    vaadinIconset.applyIcon('');

    // @ts-ignore
    let iconNames = Object.keys(lumoIconset._icons).map((name) => 'lumo:' + name);
    // @ts-ignore
    iconNames = iconNames.concat(Object.keys(vaadinIconset._icons).map((name) => 'vaadin:' + name));

    this.classList.add('icons-preview');
    let html = `
      <style>
        .icons-preview {
          display: flex !important;
          flex-direction: column;
          align-items: center;
          border: 1px solid var(--docs-divider-color-1);
          border-radius: var(--docs-border-radius-l);
        }

        .icons-preview ul {
          display: grid;
          list-style: none;
          grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
          width: 100%;
          max-height: 60vh;
          margin: 0;
          padding: 1px;
          overflow: auto;
        }

        .icons-preview li {
          display: block;
        }

        .docs-icon-preview {
          text-align: center;
          padding-bottom: var(--docs-space-l);
          line-height: 1;
        }

        .docs-icon-preview vaadin-icon {
          outline: 1px dashed var(--docs-divider-color-2);
          margin-bottom: 0.5em;
        }

        .docs-icon-preview.deprecated {
          text-decoration: line-through;
        }

        .docs-icon-preview.hidden {
          display: none;
        }

        .docs-icon-preview-name {
          display: block;
          font-size: var(--docs-font-size-2xs);
          color: var(--docs-secondary-text-color);
        }

        .docs-icon-search {
          flex: none;
          max-width: 20em;
          margin: var(--docs-space-m) auto;
          font: inherit;
          font-size: var(--docs-font-size-m);
          border: 1px solid var(--docs-divider-color-2);
          background: var(--docs-surface-color-1);
          color: var(--docs-body-text-color);
          border-radius: var(--docs-border-radius-m);
          padding: var(--docs-space-xs) var(--docs-space-s);
        }
      </style>

      <input class="docs-icon-search" type="search" aria-label="Search all icons" placeholder="Search all icons">
      <ul>
    `;

    iconNames.forEach((name: string) => {
      let title = '';
      const isDeprecated = name in DEPRECATED_ICONS;

      if (isDeprecated) {
        title = `Since Vaadin 21, '${name}' is deprecated. Please use '${DEPRECATED_ICONS[name]}' instead.`;
      }

      html += `
        <li
          class="docs-icon-preview icon-${name} ${isDeprecated ? 'deprecated' : ''}"
          title="${title}"
        >
          <vaadin-icon icon="${name}"></vaadin-icon>
          <span class="docs-icon-preview-name">${name}</div>
        </li>`;
    });

    html += '</ul>';

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
