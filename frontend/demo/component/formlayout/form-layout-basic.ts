import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';

import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';

// tag::snippet[]
@customElement('form-layout-basic')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-form-layout>
        <vaadin-text-field label="First Name"></vaadin-text-field>
        <vaadin-text-field label="Last Name"></vaadin-text-field>
        <vaadin-text-field label="City"></vaadin-text-field>
        <vaadin-email-field label="Email"> </vaadin-email-field>
        <vaadin-text-area label="Bio" colspan="2"> </vaadin-text-area>
      </vaadin-form-layout>
    `;
  }
}
// end::snippet[]
