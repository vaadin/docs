import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, render } from 'lit';
import { customElement } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-select/vaadin-select';
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
    const amount = this.shadowRoot
      ?.getElementById('amount')
      ?.shadowRoot?.querySelector('[part="value"]');
    amount?.setAttribute('aria-label', 'Amount');
    amount?.removeAttribute('aria-labelledby');

    const currency = this.shadowRoot
      ?.getElementById('currency')
      ?.shadowRoot?.querySelector('vaadin-select-text-field')
      ?.shadowRoot?.querySelector('[part="input-field"]');
    currency?.setAttribute('aria-label', 'Currency');
    currency?.removeAttribute('aria-labelledby');
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
            .renderer="${guard(
              [],
              () => (root: HTMLElement) =>
                render(
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
                  root
                )
            )}"
          ></vaadin-select>
        </vaadin-horizontal-layout>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
