import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-text-field';

@customElement('input-field-focus')
export class Example extends LitElement {
  render() {
    // tag::snippet[]
    return html`
      <vaadin-form-layout .responsiveSteps=${[{ minWidth: 0, columns: 2 }]}>
        <vaadin-text-field label="First name"></vaadin-text-field>
        <vaadin-text-field label="Last name"></vaadin-text-field>
        <vaadin-text-field label="Username" colspan="2"></vaadin-text-field>
        <vaadin-password-field label="Password"></vaadin-password-field>
        <vaadin-password-field label="Confirm password"></vaadin-password-field>
      </vaadin-form-layout>
    `;
    // end::snippet[]
  }
}
