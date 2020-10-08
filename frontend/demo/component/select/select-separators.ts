import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';

@customElement('select-separators')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select
        label="Sort by"
        .renderer=${(root: HTMLElement) =>
          render(
            html`
              <vaadin-list-box>
                <vaadin-item>Most recent first</vaadin-item>
                <hr>
                <vaadin-item>Rating: high to low</vaadin-item>
                <vaadin-item>Rating: low to high</vaadin-item>
                <hr>
                <vaadin-item>Price: high to low</vaadin-item>
                <vaadin-item>Price: low to high</vaadin-item>
              </vaadin-list-box>
            `,
            root
          )}
      ></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }
}
