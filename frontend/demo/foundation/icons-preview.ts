import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { Iconset } from '@vaadin/icon/vaadin-iconset.js';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

type VaadinIconset = Iconset & { _icons: string[] };

const lumoIconset = Iconset.getIconset('lumo') as VaadinIconset;
const vaadinIconset = Iconset.getIconset('vaadin') as VaadinIconset;

const IconSets = {
  lumo: lumoIconset,
  vaadin: vaadinIconset,
};

export type IconSetType = 'lumo' | 'vaadin';

@customElement('icons-preview')
export class IconsPreview extends LitElement {
  @state()
  iconNames: string[] | undefined;

  @property({ type: String, attribute: 'iconset-type' })
  iconsetType: IconSetType = 'vaadin';

  @query('input')
  private search!: HTMLInputElement;

  protected override createRenderRoot() {
    return this;
  }

  protected firstUpdated() {
    this.iconNames = Object.keys(IconSets[this.iconsetType]._icons).map(
      (name) => `${this.iconsetType}:${name}`
    );
    this.search.addEventListener('input', () => {
      this.querySelectorAll('.docs-icon-preview').forEach((icon) => {
        icon.classList.toggle(
          'hidden',
          !icon.className.toLowerCase().includes(this.search.value.toLowerCase())
        );
      });
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    this.classList.add('icons-preview');

    const search = this.querySelector('input');
    console.log(search);
    search?.addEventListener('input', () => {
      this.querySelectorAll('.docs-icon-preview').forEach((icon) => {
        icon.classList.toggle(
          'hidden',
          !icon.className.toLowerCase().includes(search.value.toLowerCase())
        );
      });
    });
  }

  protected override render() {
    return html`
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

      <input
        class="docs-icon-search"
        type="search"
        aria-label="Search all icons"
        placeholder="Search all icons"
      />
      <ul>
        ${this.iconNames?.map(
          (name: string) =>
            html`
              <li class="docs-icon-preview icon-${name}">
                <vaadin-icon icon="${name}"></vaadin-icon>
                <span class="docs-icon-preview-name">${name}</span>
              </li>
            `
        )}
      </ul>
    `;
  }
}
