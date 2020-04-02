import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';

// tag::snippet[]
@customElement('select-basic')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-select
        label="City"
        .renderer=${(root: HTMLElement) =>
          render(
            html`
              <vaadin-list-box>
                <vaadin-item>London</vaadin-item>
                <vaadin-item>New York</vaadin-item>
                <vaadin-item>Tokyo</vaadin-item>
              </vaadin-list-box>
            `,
            root
          )}
      ></vaadin-select>
    `;
  }
}
// end::snippet[]
