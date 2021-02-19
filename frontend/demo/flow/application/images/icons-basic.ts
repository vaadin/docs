import { LitElement, html, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@polymer/iron-icon/iron-icon';

@customElement('fusion-application-icons-basic')
export class IconsBasic extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <iron-icon icon="vaadin:airplane"></iron-icon>

        <vaadin-text-field label="Street Address" value="Ruukinkatu 2" clear-button-visible>
          <iron-icon slot="prefix" icon="vaadin:map-marker"></iron-icon>
        </vaadin-text-field>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
