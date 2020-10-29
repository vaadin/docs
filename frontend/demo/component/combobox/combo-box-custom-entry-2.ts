import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';

// tag::snippet[]
@customElement('combo-box-custom-entry-2')
export class Example extends LitElement {
  @property({ type: Array })
  private items = ['Chrome', 'Edge', 'Firefox', 'Safari'];

  render() {
    return html`
      <vaadin-combo-box
        label="State"
        helper-text="Select or type a browser"
        .items=${this.items}
        allow-custom-value
        @custom-value-set=${(e: CustomEvent) => (this.items = [...this.items, e.detail])}
      ></vaadin-combo-box>
    `;
  }
}
// end::snippet[]
