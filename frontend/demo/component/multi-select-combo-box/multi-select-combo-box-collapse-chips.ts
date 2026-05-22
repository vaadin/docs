import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import '@vaadin/multi-select-combo-box';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { CheckboxChangeEvent } from '@vaadin/checkbox';
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
  private collapseChips = true;

  protected override async firstUpdated() {
    this.items = await getCountries();
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
          .selectedItems="${this.items.slice(0, 3)}"
          style="width: 250px"
          ?collapse-chips="${this.collapseChips}"
        ></vaadin-multi-select-combo-box>
        <!-- end::snippet[] -->
        <vaadin-checkbox
          label="Toggle collapse chips"
          .checked="${this.collapseChips}"
          @change="${(e: CheckboxChangeEvent) => {
            this.collapseChips = e.target.checked;
          }}"
        ></vaadin-checkbox>
      </vaadin-vertical-layout>
    `;
  }
}
