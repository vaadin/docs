import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';

@customElement('select-placeholder')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select
        label="Sort by"
        .renderer=${(root: HTMLElement) =>
          render(
            html`
              <vaadin-list-box placeholder="Select size">
                <vaadin-item>XS</vaadin-item>
                <vaadin-item>S</vaadin-item>
                <vaadin-item>M</vaadin-item>
                <vaadin-item>L</vaadin-item>
                <vaadin-item>XL</vaadin-item>
              </vaadin-list-box>
            `,
            root
          )}
      ></vaadin-select>
      <!-- tag::snippet[] -->
    `;
  }
}
