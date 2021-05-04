import 'Frontend/demo/init'; // hidden-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon/iron-icon';

@customElement('binding-overview')
export class DataBindingExample extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout>
        <vaadin-vertical-layout>
          <vaadin-form-layout>
            <vaadin-text-field label="Street Address" value="Ruukinkatu 2" clear-button-visible>
              <iron-icon slot="prefix" icon="vaadin:map-marker"></iron-icon>
            </vaadin-text-field>
          </vaadin-form-layout>
          <vaadin-button>Save</vaadin-button>
        </vaadin-vertical-layout>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
