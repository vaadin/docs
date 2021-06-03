import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-text-field/vaadin-text-field';
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

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field label="Amount" theme="small">
        <vaadin-text-field theme="small"></vaadin-text-field>
        <vaadin-select
          theme="small"
          style="width: 6em;"
          .renderer="${guard(
            [],
            () => (root: HTMLElement) =>
              render(
                html`
                  <vaadin-list-box>
                    <vaadin-item value="usd">USD</vaadin-item>
                    <vaadin-item value="eur">EUR</vaadin-item>
                    <vaadin-item value="gbp">GBP</vaadin-item>
                  </vaadin-list-box>
                `,
                root
              )
          )}"
        ></vaadin-select>
      </vaadin-custom-field>

      <!-- end::snippet[] -->
    `;
  }
}
