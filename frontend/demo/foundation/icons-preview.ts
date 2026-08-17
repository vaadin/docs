import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Iconset } from '@vaadin/icon/vaadin-iconset.js';
import vaadinFontIcons from '@vaadin/icons/assets/vaadin-font-icons.json';

type VaadinIconset = Iconset & { _icons: string[] };

const lumoIconset = Iconset.getIconset('lumo') as VaadinIconset;
const vaadinIconset = Iconset.getIconset('vaadin') as VaadinIconset;

const IconSets = {
  lumo: lumoIconset,
  vaadin: vaadinIconset,
};

export type IconSetType = 'lumo' | 'vaadin';

interface VaadinIconMeta {
  name: string;
  code: string;
  categories: string[];
  meta: string[];
}

const OTHER_CATEGORY = 'Other';

const vaadinIconMetaByName = new Map<string, VaadinIconMeta>(
  (vaadinFontIcons as VaadinIconMeta[]).map((icon) => [icon.name, icon])
);

interface IconEntry {
  fullName: string;
  searchText: string;
  code?: string;
}

@customElement('icons-preview')
export class IconsPreview extends LitElement {
  @state()
  iconNames: string[] | undefined;

  @state()
  categorizedIcons: Map<string, IconEntry[]> | undefined;

  @property({ type: String, attribute: 'iconset-type' })
  iconsetType: IconSetType = 'vaadin';

  @query('input')
  private search!: HTMLInputElement;

  protected override createRenderRoot() {
    return this;
  }

  protected firstUpdated() {
    const bareNames = Object.keys(IconSets[this.iconsetType]._icons);
    this.iconNames = bareNames.map((name) => `${this.iconsetType}:${name}`);

    if (this.iconsetType === 'vaadin') {
      const categories = new Map<string, IconEntry[]>();
      bareNames.forEach((name) => {
        const meta = vaadinIconMetaByName.get(name);
        const entry: IconEntry = {
          fullName: `${this.iconsetType}:${name}`,
          searchText: [name, ...(meta?.meta ?? [])].join(' ').toLowerCase(),
          code: meta?.code,
        };
        const iconCategories = meta?.categories?.length ? meta.categories : [OTHER_CATEGORY];
        iconCategories.forEach((category) => {
          if (!categories.has(category)) {
            categories.set(category, []);
          }
          categories.get(category)!.push(entry);
        });
      });
      this.categorizedIcons = new Map(
        [...categories.entries()].sort(([a], [b]) => {
          if (a === OTHER_CATEGORY) return 1;
          if (b === OTHER_CATEGORY) return -1;
          return a.localeCompare(b);
        })
      );
    }

    this.search.addEventListener('input', () => {
      const term = this.search.value.toLowerCase();
      this.querySelectorAll('.docs-icon-preview').forEach((icon) => {
        const searchText = (icon as HTMLElement).dataset.search ?? '';
        icon.classList.toggle('hidden', !searchText.includes(term));
      });
      this.querySelectorAll('.docs-icon-category').forEach((section) => {
        const hasVisibleIcon = section.querySelector('.docs-icon-preview:not(.hidden)');
        section.classList.toggle('hidden', !hasVisibleIcon);
      });
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    this.classList.add('icons-preview');
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

        .docs-icon-scroll {
          width: 100%;
          max-height: 60vh;
          margin: 0;
          padding: 1px;
          overflow: auto;
        }

        .docs-icon-category .docs-icon-grid {
          display: grid;
          list-style: none;
          grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
          width: 100%;
          margin: 0;
          padding: 0;
          padding-top: 20px;
          padding-inline-end: 0;
          border-top: 1px solid var(--docs-divider-color-1);
        }

        .icons-preview li {
          display: block;
        }

        .docs-icon-category {
          border: 1px solid var(--docs-divider-color-1);
          border-radius: var(--docs-border-radius-l);
          margin: 10px;
        }

        .docs-icon-category.hidden {
          display: none;
        }

        .docs-icon-category .docs-icon-category-heading {
          padding: var(--docs-space-m) var(--docs-space-m);
          margin: 0;
          font-size: var(--docs-font-size-m);
          font-weight: var(--docs-font-weight-strong);
          color: var(--docs-body-text-color);
        }

        .docs-icon-category:first-of-type .docs-icon-category-heading {
          margin-top: 0;
        }

        .docs-icon-preview {
          text-align: center;
          padding-bottom: var(--docs-space-l);
          line-height: 1;
        }

        .docs-icon-preview vaadin-icon {
          margin-bottom: 0.5em;
          height: 24px;
          width: 24px;
        }

        .docs-icon-preview.hidden {
          display: none;
        }

        .docs-icon-preview-name {
          display: block;
          font-size: var(--docs-font-size-2xs);
          color: var(--docs-secondary-text-color);
        }

        .docs-icon-preview-code {
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
      ${this.iconsetType === 'vaadin' ? this.renderCategorized() : this.renderFlat()}
    `;
  }

  private renderFlat() {
    return html`
      <ul class="docs-icon-scroll docs-icon-grid">
        ${this.iconNames?.map(
          (name: string) => html`
            <li class="docs-icon-preview icon-${name}" data-search="${name.toLowerCase()}">
              <vaadin-icon icon="${name}"></vaadin-icon>
              <span class="docs-icon-preview-name">${name}</span>
            </li>
          `
        )}
      </ul>
    `;
  }

  private renderCategorized() {
    return html`
      <div class="docs-icon-scroll">
        ${
          this.categorizedIcons &&
          [...this.categorizedIcons.entries()].map(
            ([category, icons]) => html`
              <section class="docs-icon-category">
                <h3 class="docs-icon-category-heading">${category}</h3>
                <ul class="docs-icon-grid">
                  ${icons.map(
                    (icon) => html`
                      <li
                        class="docs-icon-preview icon-${icon.fullName}"
                        data-search="${icon.searchText}"
                      >
                        <vaadin-icon icon="${icon.fullName}"></vaadin-icon>
                        <span class="docs-icon-preview-name">${icon.fullName}</span>
                        ${
                          icon.code
                            ? html`<span class="docs-icon-preview-code">\\${icon.code}</span>`
                            : ''
                        }
                      </li>
                    `
                  )}
                </ul>
              </section>
            `
          )
        }
      </div>
    `;
  }
}
