import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';

// tag::snippet[]
@customElement('combo-box-basic')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-combo-box
        label="Element"
        .items=${['Hydrogen', 'Helium', 'Lithium']}
      ></vaadin-combo-box>
    `;
  }
}
// end::snippet[]
