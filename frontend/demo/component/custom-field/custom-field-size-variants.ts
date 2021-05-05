import 'Frontend/demo/init'; // hidden-full-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-select/vaadin-select';
import { applyTheme } from 'Frontend/generated/theme';
import { guard } from 'lit-html/directives/guard';
import { render } from 'lit-html';

@customElement('custom-field-size-variants')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field label="Price" theme="small">
        <vaadin-horizontal-layout theme="spacing-s">
          <vaadin-text-field theme="small"></vaadin-text-field>
          <vaadin-select
            theme="small"
            style="width: 6em;"
            .renderer="${guard([], () => (root: HTMLElement) =>
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
