import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/custom-field';
import '@vaadin/horizontal-layout';
import '@vaadin/select';
import '@vaadin/text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('custom-field-size-variants')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('#amount > input')
  private amount!: HTMLInputElement;

  @query('#currency > [slot="value"]')
  private currency!: HTMLElement;

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

  protected override firstUpdated() {
    // Set `aria-label` for screen readers
    this.amount.setAttribute('aria-label', 'Amount');
    this.amount.removeAttribute('aria-labelledby');

    this.currency.setAttribute('aria-label', 'Currency');
    this.currency.removeAttribute('aria-labelledby');
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field label="Price" theme="small">
        <vaadin-horizontal-layout theme="spacing-s">
          <vaadin-text-field id="amount" theme="small"></vaadin-text-field>
          <vaadin-select
            id="currency"
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
