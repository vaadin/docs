import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-lumo-styles/icons';
import '@polymer/iron-icon';

@customElement('input-field-aria-label')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field aria-label="search" placeholder="Search" clear-button-visible>
        <iron-icon icon="lumo:search" slot="prefix"></iron-icon>
      </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
