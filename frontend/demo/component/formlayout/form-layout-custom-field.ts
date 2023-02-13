import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/form-layout';
import '@vaadin/form-layout/vaadin-form-item';
import '@vaadin/select';
import '@vaadin/custom-field';
import '@vaadin/horizontal-layout';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('form-layout-custom-field')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  get months() {
    return Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
  }

  get years() {
    return Array.from({ length: 11 }, (_, i) => `${i + new Date().getFullYear()}`);
  }

  render() {
    return html`
      <vaadin-form-layout>
        <vaadin-form-item>
          <label slot="label">Expiration</label>
          <vaadin-custom-field
            .parseValue="${(value: string) => {
              return value ? value.split('/') : ['', ''];
            }}"
            .formatValue="${(values: unknown[]) => {
              return values[0] && values[1] ? values.join('/') : '';
            }}"
          >
            <vaadin-horizontal-layout theme="spacing-xs">
              <vaadin-select
                title="Month"
                placeholder="Month"
                .items="${this.months.map((month) => ({ label: month, value: month }))}"
              ></vaadin-select>
              <vaadin-select
                title="Year"
                placeholder="Year"
                .items="${this.years.map((year) => ({ label: year, value: year }))}"
              ></vaadin-select>
            </vaadin-horizontal-layout>
          </vaadin-custom-field>
        </vaadin-form-item>
      </vaadin-form-layout>
    `;
  }
  // end::snippet[]
}
