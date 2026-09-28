import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/popover';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { html, LitElement, nothing } from 'lit';
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
  deprecated?: boolean;
  replacement?: string;
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
  deprecated?: boolean;
  replacement?: string;
  isBrand?: boolean;
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

  @state()
  showDeprecated = false;

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
        deprecated: meta?.deprecated,
        replacement: meta?.replacement,
        isBrand: meta?.categories?.includes('Brand'),
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
    const visibleEntries = (this.iconEntries ?? []).filter(
      (entry) => this.showDeprecated || !entry.deprecated
    );
    const matches = isSearching
      ? visibleEntries.filter((entry) => entry.searchText.includes(term))
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

        .docs-icon-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--docs-space-m);
        }

        .docs-icon-deprecated-toggle {
          display: flex;
          align-items: center;
          gap: 0.25em;
          font-size: var(--docs-font-size-s);
          color: var(--docs-body-text-color);
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

        .docs-icon-scroll.docs-icon-scroll {
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
          padding-block: var(--docs-space-m);
          line-height: 1;
        }

        .docs-icon-preview > div > vaadin-icon {
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

        .docs-icon-deprecated > div {
          position: relative;

          &:not(:hover, :focus) {
            opacity: 0.4;

            &::before {
              opacity: 0;
            }
          }

          &::before {
            content: 'Deprecated';
            position: absolute;
            top: -1.7lh;
            left: 50%;
            translate: -50%;
            font-size: var(--docs-font-size-2xs);
            font-weight: var(--docs-font-weight-strong);
            color: var(--docs-secondary-text-color);
            background: var(--docs-surface-color-1);
            border: 1px solid var(--docs-divider-color-1);
            padding: 0.2em 0.3em;
            border-radius: 0.3em;
            letter-spacing: -0.05em;
          }
        }

        .docs-icon-replacement {
          display: flex;
          align-items: center;
          gap: var(--docs-space-s);
          font-size: var(--docs-font-size-xs);

          code {
            font-family: var(--docs-font-family-monospace);
          }

          > vaadin-icon {
            flex: none;
          }
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
        <div class="docs-icon-filters">
          <input
            class="docs-icon-search"
            type="search"
            aria-label="Search all icons"
            placeholder="Search all icons"
          />
          ${
            this.iconsetType === 'vaadin'
              ? html`
                  <label id="docs-show-deprecated" class="docs-icon-deprecated-toggle">
                    <input
                      type="checkbox"
                      .checked=${this.showDeprecated}
                      @change=${(event: Event) => {
                        this.showDeprecated = (event.target as HTMLInputElement).checked;
                      }}
                    />
                    Show deprecated
                  </label>
                  <vaadin-popover
                    for="docs-show-deprecated"
                    .trigger=${['hover', 'focus']}
                    position="top"
                    theme="arrow"
                  >
                    <a
                      href="https://github.com/vaadin/web-components/pull/12452"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More about the deprecations
                    </a>
                  </vaadin-popover>
                `
              : ''
          }
        </div>
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
            : this.renderGrid(visibleEntries)
      }
    `;
  }

  private renderGrid(entries: IconEntry[]) {
    return html`
      <ul class="docs-icon-scroll docs-icon-grid">
        ${entries.map((icon, index) => this.renderIcon(icon, `search-${index}`))}
      </ul>
    `;
  }

  private renderIcon(icon: IconEntry, idSuffix: string) {
    const targetId = `docs-icon-${this.iconsetType}-${idSuffix}`;
    const replacementFullName = `${this.iconsetType}:${icon.replacement}`;
    const hasPopover = Boolean(icon.deprecated && [icon.isBrand, icon.replacement].some(Boolean));

    return html`
      <li class="docs-icon-preview${icon.deprecated ? ' docs-icon-deprecated' : ''}">
        <div id=${targetId} tabindex=${hasPopover ? '0' : nothing}>
          <vaadin-icon icon="${icon.fullName}"></vaadin-icon>
          <span class="docs-icon-preview-name">${icon.fullName}</span>
          ${icon.code ? html`<span class="docs-icon-preview-code">\\${icon.code}</span>` : ''}
        </div>
        ${
          hasPopover
            ? html`
                <vaadin-popover
                  for=${targetId}
                  .trigger=${['hover', 'focus']}
                  position="bottom"
                  theme="arrow"
                  aria-label="Deprecation guidance"
                >
                  ${
                    icon.isBrand
                      ? html`
                          <span>
                            Use
                            <a
                              href="https://simpleicons.org"
                              target="_blank"
                              rel="noopener noreferrer"
                              >simpleicons.org</a
                            >
                            instead
                          </span>
                        `
                      : html`
                          <div class="docs-icon-replacement">
                            <span>Use <code>${replacementFullName}</code> instead</span>
                            <vaadin-icon icon=${replacementFullName}></vaadin-icon>
                          </div>
                        `
                  }
                </vaadin-popover>
              `
            : ''
        }
      </li>
    `;
  }

  private renderCategorized() {
    return html`
      <div class="docs-icon-scroll">
        ${
          this.categorizedIcons &&
          [...this.categorizedIcons.entries()].map(([category, icons], categoryIndex) => {
            const visibleIcons = icons.filter((icon) => this.showDeprecated || !icon.deprecated);
            return visibleIcons.length
              ? html`
                  <section class="docs-icon-category">
                    <h3 class="docs-icon-category-heading">${category}</h3>
                    <ul class="docs-icon-grid">
                      ${visibleIcons.map((icon, iconIndex) =>
                        this.renderIcon(icon, `category-${categoryIndex}-${iconIndex}`)
                      )}
                    </ul>
                  </section>
                `
              : '';
          })
        }
      </div>
    `;
  }
}
