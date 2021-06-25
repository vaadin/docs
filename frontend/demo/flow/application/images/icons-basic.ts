import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-text-field/vaadin-text-field';

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
