import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/combo-box';
import type { ComboBoxFilterChangedEvent } from '@vaadin/combo-box';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('combo-box-filtering-2')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private allItems: Country[] = [];

  @state()
  private filteredItems: Country[] = [];

  protected override async firstUpdated() {
    const countries = await getCountries();
    this.allItems = countries;
    this.filteredItems = countries;
  }

  protected override render() {
    return html`
      <vaadin-combo-box
        label="Country"
        item-label-path="name"
        item-value-path="id"
        .filteredItems="${this.filteredItems}"
        @filter-changed="${this.filterChanged}"
      ></vaadin-combo-box>
    `;
  }

  private filterChanged(event: ComboBoxFilterChangedEvent) {
    const filter = event.detail.value;
    this.filteredItems = this.allItems.filter(({ name }) =>
      name.toLowerCase().startsWith(filter.toLowerCase())
    );
  }
}
// end::snippet[]
