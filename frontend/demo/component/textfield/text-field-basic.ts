import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-icons/vaadin-icons';

@customElement('text-field-basic')
export class TextFieldBasic extends LitElement {

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field label="Street Address" value="Ruukinkatu 2" clear-button-visible >
        <iron-icon slot="prefix" icon="vaadin:map-marker"></iron-icon
      </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
