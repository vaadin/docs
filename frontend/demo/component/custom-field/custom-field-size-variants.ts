import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/custom-field';
import '@vaadin/horizontal-layout';
import '@vaadin/select';
import '@vaadin/text-field';
import { selectRenderer } from '@vaadin/select/lit.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('custom-field-size-variants')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  firstUpdated() {
    // aria-label for screen readers
    const amount = this.renderRoot.querySelector('#amount > input') as HTMLInputElement;
    amount.setAttribute('aria-label', 'Amount');
    amount.removeAttribute('aria-labelledby');

    const currency = this.renderRoot.querySelector('#currency > [slot="value"]') as HTMLElement;
    currency.setAttribute('aria-label', 'Currency');
    currency.removeAttribute('aria-labelledby');
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field label="Price" theme="small">
        <vaadin-horizontal-layout theme="spacing-s">
          <vaadin-text-field id="amount" theme="small"></vaadin-text-field>
          <vaadin-select
            id="currency"
            theme="small"
            style="width: 6em;"
            ${selectRenderer(
              () =>
                html`
                  <vaadin-list-box>
                    <vaadin-item value="eur">AUD</vaadin-item>
                    <vaadin-item value="eur">CAD</vaadin-item>
                    <vaadin-item value="eur">CHF</vaadin-item>
                    <vaadin-item value="eur">EUR</vaadin-item>
                    <vaadin-item value="gbp">GBP</vaadin-item>
                    <vaadin-item value="gbp">JPY</vaadin-item>
                    <vaadin-item value="usd">USD</vaadin-item>
                  </vaadin-list-box>
                `,
              []
            )}
          ></vaadin-select>
        </vaadin-horizontal-layout>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
