import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import '@vaadin/multi-select-combo-box';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { CheckboxChangeEvent } from '@vaadin/checkbox';
import type { MultiSelectComboBoxSelectedItemsChangedEvent } from '@vaadin/multi-select-combo-box';
import { getCountries } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

@customElement('multi-select-combo-box-collapse-chips')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Country[] = [];

  @state()
  private selectedCountries: Country[] = [];

  @state()
  private collapseChips = true;

  protected override async firstUpdated() {
    const countries = await getCountries();
    this.items = countries
    this.selectedCountries = countries.slice(0, 3);
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-multi-select-combo-box
          label="Countries"
          item-label-path="name"
          item-id-path="id"
          item-value-path="id"
          .items="${this.items}"
          ?collapse-chips="${this.collapseChips}"
          .selectedItems="${this.selectedCountries}"
          @selected-items-changed="${(e: MultiSelectComboBoxSelectedItemsChangedEvent<Country>) => {
            this.selectedCountries = e.detail.value;
          }}"
          style="width: 250px"
        ></vaadin-multi-select-combo-box>
        <!-- end::snippet[] -->
        <vaadin-checkbox
          label="Collapse chips"
          .checked="${this.collapseChips}"
          @change="${(e: CheckboxChangeEvent) => {
            this.collapseChips = e.target.checked;
          }}"
        ></vaadin-checkbox>
      </vaadin-vertical-layout>
    `;
  }
}
