import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { getCountries } from 'Frontend/demo/domain/DataService';
import Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('combo-box-filtering-2')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private allItems: Country[] = [];

  @state()
  private filteredItems: Country[] = [];

  async firstUpdated() {
    this.allItems = this.filteredItems = await getCountries();
  }

  render() {
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

  private filterChanged(e: CustomEvent) {
    const filter = e.detail.value as string;
    this.filteredItems = this.allItems.filter((country) => {
      return country.name.toLowerCase().startsWith(filter.toLowerCase());
    });
  }
}
// end::snippet[]
