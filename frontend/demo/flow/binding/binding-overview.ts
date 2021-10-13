import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/form-layout';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons/vaadin-iconset.js';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';

@customElement('binding-overview')
export class DataBindingExample extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout>
        <vaadin-vertical-layout>
          <vaadin-form-layout>
            <vaadin-text-field label="Street Address" value="Ruukinkatu 2" clear-button-visible>
              <vaadin-icon slot="prefix" icon="vaadin:map-marker"></vaadin-icon>
            </vaadin-text-field>
          </vaadin-form-layout>
          <vaadin-button>Save</vaadin-button>
        </vaadin-vertical-layout>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
