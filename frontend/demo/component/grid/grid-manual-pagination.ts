import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/select';
import '@vaadin/avatar';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { html, LitElement, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { TextFieldValueChangedEvent } from '@vaadin/text-field';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/demo/theme';

type PersonEnhanced = Person & { displayName: string };

@customElement('grid-manual-pagination')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private gridItems: PersonEnhanced[] = [];

  @query('grid-pagination-controls')
  private paginationControls!: GridPaginationControls;

  private allItems: PersonEnhanced[] = [];
  private currentSearchTerm = '';
  private itemsFilteredByTermCount: number = 0;

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.allItems = people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.updateGridItems();
  }

  private updateGridItems() {
    const itemsFilteredByTerm = this.allItems.filter(
      ({ displayName, email, profession }) =>
        !this.currentSearchTerm ||
        this.matchesTerm(displayName) ||
        this.matchesTerm(email) ||
        this.matchesTerm(profession)
    );

    this.itemsFilteredByTermCount = itemsFilteredByTerm.length;

    const offset = this.paginationControls.calculateOffset();
    const limit = this.paginationControls.pageSize;
    this.gridItems = itemsFilteredByTerm.slice(offset, offset + limit);
  }

  private matchesTerm(value: string): boolean {
    return value.toLowerCase().includes(this.currentSearchTerm.toLowerCase());
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <vaadin-text-field
          placeholder="Search"
          style="width: 50%;"
          @value-changed="${(e: TextFieldValueChangedEvent) => {
            this.currentSearchTerm = (e.detail.value || '').trim();
            this.updateGridItems();
          }}"
        >
          <vaadin-icon slot="prefix" icon="vaadin:search"></vaadin-icon>
        </vaadin-text-field>
        <vaadin-vertical-layout style="width: 100%;" theme="spacing-xs">
          <!-- tag::snippet[] -->
          <vaadin-grid .items="${this.gridItems}" all-rows-visible>
            <vaadin-grid-column
              header="Name"
              flex-grow="0"
              width="230px"
              ${columnBodyRenderer(this.nameRenderer, [])}
            ></vaadin-grid-column>
            <vaadin-grid-column path="email"></vaadin-grid-column>
            <vaadin-grid-column path="profession"></vaadin-grid-column>
          </vaadin-grid>
          <grid-pagination-controls
            style="width: 100%;"
            .totalItemCount="${this.itemsFilteredByTermCount}"
            @page-changed="${(_: CustomEvent) => {
              this.updateGridItems();
            }}"
          ></grid-pagination-controls>
          <!-- end::snippet[] -->
        </vaadin-vertical-layout>
      </vaadin-vertical-layout>
    `;
  }

  private nameRenderer: GridColumnBodyLitRenderer<PersonEnhanced> = (person) => html`
    <vaadin-horizontal-layout style="align-items: center;" theme="spacing">
      <vaadin-avatar img="${person.pictureUrl}" .name="${person.displayName}"></vaadin-avatar>
      <span> ${person.displayName} </span>
    </vaadin-horizontal-layout>
  `;
}

@customElement('grid-pagination-controls')
export class GridPaginationControls extends LitElement {
  @property()
  totalItemCount = 0;

  @property()
  pageSize = 10;

  @state()
  private pageCount = 1;

  @state()
  private currentPage = 1;

  calculateOffset(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('totalItemCount')) {
      this.updatePageCount();
    }
  }

  private updatePageCount() {
    if (this.totalItemCount === 0) {
      this.pageCount = 1; // we still want to display one page even though there are no items
    } else {
      this.pageCount = Math.ceil(this.totalItemCount / this.pageSize);
    }
    if (this.currentPage > this.pageCount) {
      this.currentPage = this.pageCount;
    }
    this.dispatchPageChanged();
  }

  private dispatchPageChanged() {
    this.dispatchEvent(
      new CustomEvent('page-changed', {
        detail: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout style="align-items: center; gap: 0.3rem; width: 100%">
        <vaadin-horizontal-layout style="align-items: center" theme="spacing-s">
          <span id="page-size-label" class="text-s">Page size</span>
          <vaadin-select
            theme="small"
            aria-labelledby="page-size-label"
            style="width: 4.8rem; --vaadin-input-field-value-font-size: var(--lumo-font-size-s);"
            .items="${['10', '15', '25', '50', '100'].map((it) => ({ label: it, value: it }))}"
            .value="${this.pageSize}"
            @value-changed="${(e: CustomEvent) => {
              this.pageSize = parseInt(e.detail.value);
              this.updatePageCount();
            }}"
          ></vaadin-select>
        </vaadin-horizontal-layout>
        <vaadin-button
          theme="small icon"
          slot="end"
          aria-label="Go to first page"
          ?disabled="${this.currentPage === 1}"
          @click="${() => {
            this.currentPage = 1;
            this.dispatchPageChanged();
          }}"
        >
          <vaadin-icon icon="vaadin:angle-double-left"></vaadin-icon>
        </vaadin-button>
        <vaadin-button
          theme="small icon"
          slot="end"
          aria-label="Go to previous page"
          ?disabled="${this.currentPage === 1}"
          @click="${() => {
            this.currentPage -= 1;
            this.dispatchPageChanged();
          }}"
        >
          <vaadin-icon icon="vaadin:angle-left"></vaadin-icon>
        </vaadin-button>
        <span class="text-s px-s" slot="end"> Page ${this.currentPage} of ${this.pageCount} </span>
        <vaadin-button
          theme="small icon"
          slot="end"
          aria-label="Go to next page"
          ?disabled="${this.currentPage === this.pageCount}"
          @click="${() => {
            this.currentPage += 1;
            this.dispatchPageChanged();
          }}"
        >
          <vaadin-icon icon="vaadin:angle-right"></vaadin-icon>
        </vaadin-button>
        <vaadin-button
          theme="small icon"
          slot="end"
          aria-label="Go to last page"
          ?disabled="${this.currentPage === this.pageCount}"
          @click="${() => {
            this.currentPage = this.pageCount;
            this.dispatchPageChanged();
          }}"
        >
          <vaadin-icon icon="vaadin:angle-double-right"></vaadin-icon>
        </vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }
}
