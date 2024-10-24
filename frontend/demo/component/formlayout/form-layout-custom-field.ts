import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/custom-field';
import '@vaadin/form-layout';
import '@vaadin/form-layout/vaadin-form-item';
import '@vaadin/horizontal-layout';
import '@vaadin/select';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
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
  @state()
  private months = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));

  @state()
  private years = Array.from({ length: 11 }, (_, i) => `${i + new Date().getFullYear()}`);

  render() {
    return html`
      <vaadin-form-layout>
        <vaadin-form-item>
          <label slot="label">Expiration</label>
          <vaadin-custom-field
            .parseValue="${(value: string) => (value ? value.split('/') : ['', ''])}"
            .formatValue="${(values: unknown[]) =>
              values[0] && values[1] ? values.join('/') : ''}"
          >
            <vaadin-horizontal-layout theme="spacing-xs">
              <vaadin-select
                accessible-name="Month"
                placeholder="Month"
                .items="${this.months.map((month) => ({ label: month, value: month }))}"
              ></vaadin-select>
              <vaadin-select
                accessible-name="Year"
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
