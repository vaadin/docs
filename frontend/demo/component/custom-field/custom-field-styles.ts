import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/custom-field';
import '@vaadin/horizontal-layout';
import '@vaadin/select';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('custom-field-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private currencies = [
    { label: 'AUD', value: 'aud' },
    { label: 'CAD', value: 'cad' },
    { label: 'CHF', value: 'chf' },
    { label: 'EUR', value: 'eur' },
    { label: 'GBP', value: 'gbp' },
    { label: 'JPY', value: 'jpy' },
    { label: 'USD', value: 'usd' },
  ];

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field label="Price" helper-text="Helper text" theme="small helper-above-field">
        <vaadin-horizontal-layout style="gap: var(--vaadin-gap-s);">
          <vaadin-text-field accessible-name="Amount" theme="small"></vaadin-text-field>
          <vaadin-select
            accessible-name="Currency"
            .items="${this.currencies}"
            theme="small"
            style="width: 6em;"
          ></vaadin-select>
        </vaadin-horizontal-layout>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
