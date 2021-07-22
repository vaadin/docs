import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('select-placeholder')
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
      <vaadin-select
        label="Size"
        placeholder="Select size"
        .renderer="${guard(
          [],
          () => (root: HTMLElement) =>
            render(
              html`
                <vaadin-list-box>
                  <vaadin-item value="xs">XS</vaadin-item>
                  <vaadin-item value="s">S</vaadin-item>
                  <vaadin-item value="m">M</vaadin-item>
                  <vaadin-item value="l">L</vaadin-item>
                  <vaadin-item value="xl">XL</vaadin-item>
                </vaadin-list-box>
              `,
              root
            )
        )}"
      ></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }
}
