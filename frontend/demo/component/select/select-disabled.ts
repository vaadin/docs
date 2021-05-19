import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import { render } from 'lit-html';
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('select-disabled')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select
        label="Size"
        value="xl"
        .renderer="${guard(
          [],
          () => (root: HTMLElement) =>
            render(
              html`
                <vaadin-list-box>
                  <vaadin-item value="xs" disabled>XS (out of stock)</vaadin-item>
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
