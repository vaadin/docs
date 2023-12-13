import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/multi-select-combo-box';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('multi-select-combo-box-auto-expand')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Country[] = [];

  protected override async firstUpdated() {
    this.items = await getCountries();
  }

  protected override render() {
    return html`
      <vaadin-multi-select-combo-box
        label="Countries"
        item-label-path="name"
        item-id-path="id"
        .items="${this.items}"
        auto-expand-horizontally
        auto-expand-vertically
        .selectedItems="${this.items.slice(0, 4)}"
      ></vaadin-multi-select-combo-box>
    `;
  }
  // end::snippet[]
}
