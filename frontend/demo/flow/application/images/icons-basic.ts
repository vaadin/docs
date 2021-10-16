import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';

@customElement('fusion-application-icons-basic')
export class IconsBasic extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-icon icon="vaadin:airplane"></vaadin-icon>

        <vaadin-text-field label="Street Address" value="Ruukinkatu 2" clear-button-visible>
          <vaadin-icon slot="prefix" icon="vaadin:map-marker"></vaadin-icon>
        </vaadin-text-field>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
