import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/multi-select-combo-box';
import type { MultiSelectComboBoxSelectedItemsChangedEvent } from '@vaadin/multi-select-combo-box';
import '@vaadin/text-area';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('multi-select-combo-box-selection-change')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Country[] = [];

  protected override async firstUpdated() {
    this.items = await getCountries();
  }

  // tag::snippet[]
  @state()
  private selectedCountries: Country[] = [];

  private get selectedCountriesText(): string {
    return this.selectedCountries.map((country) => country.name).join(', ');
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <vaadin-multi-select-combo-box
          label="Countries"
          item-label-path="name"
          item-id-path="id"
          .items="${this.items}"
          .selectedItems="${this.selectedCountries}"
          @selected-items-changed="${(e: MultiSelectComboBoxSelectedItemsChangedEvent<Country>) => {
            this.selectedCountries = e.detail.value;
          }}"
        ></vaadin-multi-select-combo-box>
        <vaadin-text-area
          label="Selected Countries"
          readonly
          .value="${this.selectedCountriesText}"
        ></vaadin-text-area>
      </vaadin-horizontal-layout>
    `;
  }

  // end::snippet[]
}
