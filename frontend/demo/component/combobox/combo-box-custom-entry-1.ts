import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';

@customElement('combo-box-custom-entry-1')
export class Example extends LitElement {
  @property({ type: Array })
  private items = ['Chrome', 'Edge', 'Firefox', 'Safari'];

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-combo-box
        allow-custom-value
        label="State"
        helper-text="Select or type a browser"
        .items="${this.items}"
      ></vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
