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

// "Items" is a one-icon typo for "Item" in the upstream icon metadata.
const CATEGORY_ALIASES: Record<string, string> = {
  Items: 'Item',
};

const vaadinIconMetaByName = new Map<string, VaadinIconMeta>(
  (vaadinFontIcons as VaadinIconMeta[]).map((icon) => [icon.name, icon])
);

interface IconEntry {
  fullName: string;
  searchText: string;
  code?: string;
}

const ICON_SIZES = [16, 20, 24, 32];
const DEFAULT_ICON_SIZE = 24;

@customElement('icons-preview')
export class IconsPreview extends LitElement {
  @state()
  iconEntries: IconEntry[] | undefined;

  @state()
  categorizedIcons: Map<string, IconEntry[]> | undefined;

  @state()
  searchTerm = '';

  @state()
  iconSize = DEFAULT_ICON_SIZE;

  @property({ type: String, attribute: 'iconset-type' })
  iconsetType: IconSetType = 'vaadin';

  @query('input.docs-icon-search')
  private search!: HTMLInputElement;

  @query('.docs-icon-size-picker')
  private sizePicker!: HTMLFieldSetElement;

  protected override createRenderRoot() {
    return this;
  }

  protected firstUpdated() {
    const bareNames = Object.keys(IconSets[this.iconsetType]._icons);

    this.iconEntries = bareNames.map((name) => {
      const meta = this.iconsetType === 'vaadin' ? vaadinIconMetaByName.get(name) : undefined;
      return {
        fullName: `${this.iconsetType}:${name}`,
        searchText: [name, ...(meta?.meta ?? [])].join(' ').toLowerCase(),
        code: meta?.code,
      };
    });

    if (this.iconsetType === 'vaadin') {
      const categories = new Map<string, IconEntry[]>();
      this.iconEntries.forEach((entry, i) => {
        const meta = vaadinIconMetaByName.get(bareNames[i]);
        const iconCategories = (meta?.categories?.length ? meta.categories : [OTHER_CATEGORY]).map(
          (category) => CATEGORY_ALIASES[category] ?? category
        );
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
      this.searchTerm = this.search.value;
    });

    this.sizePicker.addEventListener('change', (event) => {
      this.iconSize = Number((event.target as HTMLInputElement).value);
      this.style.setProperty('--vaadin-icon-size', `${this.iconSize}px`);
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    this.classList.add('icons-preview');
    this.style.setProperty('--vaadin-icon-size', `${this.iconSize}px`);
  }

  protected override render() {
    const term = this.searchTerm.trim().toLowerCase();
    const isSearching = term.length > 0;
    const matches = isSearching
      ? (this.iconEntries ?? []).filter((entry) => entry.searchText.includes(term))
      : [];

    return html`
      <style>
        .icons-preview {
          display: flex !important;
          flex-direction: column;
          align-items: center;
          border: 1px solid var(--docs-divider-color-1);
          border-radius: var(--docs-border-radius-l);
        }

        .docs-icon-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--docs-space-m);
          margin: var(--docs-space-m) var(--docs-space-s);
          justify-content: space-between;
          width: 96%;
        }

        .docs-icon-size-picker {
          display: flex;
          align-items: center;
          gap: var(--docs-space-s);
          margin: 0;
          padding: 0;
          border: none;
        }

        .docs-icon-size-picker legend {
          padding: 0;
          font-size: var(--docs-font-size-s);
          color: var(--docs-secondary-text-color);
        }

        .docs-icon-size-picker label {
          display: flex;
          align-items: center;
          gap: 0.25em;
          font-size: var(--docs-font-size-s);
          color: var(--docs-body-text-color);
        }

        .icons-preview .docs-icon-result-count {
          margin: 0 var(--docs-space-s) var(--docs-space-s);
          font-size: var(--docs-font-size-2xs);
          color: var(--docs-secondary-text-color);
          text-align: center;
        }

        .docs-icon-scroll {
          width: 100%;
          max-height: 60vh;
          margin: 0;
          padding: 1px;
          overflow: auto;
        }

        .docs-icon-grid {
          display: grid;
          list-style: none;
          grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .docs-icon-category .docs-icon-grid {
          padding-top: 20px;
          padding-inline-start: 0;
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
          height: var(--vaadin-icon-size, 24px);
          width: var(--vaadin-icon-size, 24px);
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
          font: inherit;
          font-size: var(--docs-font-size-m);
          border: 1px solid var(--docs-divider-color-2);
          background: var(--docs-surface-color-1);
          color: var(--docs-body-text-color);
          border-radius: var(--docs-border-radius-m);
          padding: var(--docs-space-xs) var(--docs-space-s);
        }
      </style>

      <div class="docs-icon-toolbar">
        <input
          class="docs-icon-search"
          type="search"
          aria-label="Search all icons"
          placeholder="Search all icons"
        />
        <fieldset class="docs-icon-size-picker">
          ${ICON_SIZES.map(
            (size) => html`
              <label>
                <input
                  type="radio"
                  name="icon-size-${this.iconsetType}"
                  value="${size}"
                  ?checked=${size === this.iconSize}
                />
                ${size}px
              </label>
            `
          )}
        </fieldset>
      </div>

      ${
        isSearching
          ? html`
              <p class="docs-icon-result-count">
                ${matches.length} icon${matches.length === 1 ? '' : 's'} found
              </p>
              ${this.renderGrid(matches)}
            `
          : this.iconsetType === 'vaadin'
            ? this.renderCategorized()
            : this.renderGrid(this.iconEntries ?? [])
      }
    `;
  }

  private renderGrid(entries: IconEntry[]) {
    return html`
      <ul class="docs-icon-scroll docs-icon-grid">
        ${entries.map(
          (icon) => html`
            <li class="docs-icon-preview">
              <vaadin-icon icon="${icon.fullName}"></vaadin-icon>
              <span class="docs-icon-preview-name">${icon.fullName}</span>
              ${icon.code ? html`<span class="docs-icon-preview-code">\\${icon.code}</span>` : ''}
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
                      <li class="docs-icon-preview">
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
