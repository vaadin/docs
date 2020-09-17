import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, query } from 'lit-element';
import { FormLayoutElement } from '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-select';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-item';

@customElement('input-field-required')
export class Example extends LitElement {
  @query('vaadin-form-layout') layout?: FormLayoutElement;

  render() {
    // tag::snippet[]
    return html`
      <vaadin-form-layout .responsiveSteps=${[{ minWidth: 0, columns: 2 }]}>
        <vaadin-text-field label="Name" required></vaadin-text-field>
        <vaadin-date-picker label="Date of birth"></vaadin-date-picker>
        <vaadin-email-field label="Email address" required></vaadin-email-field>
        <vaadin-select label="Location">
          <template>
            <vaadin-list-box>
              <vaadin-item>Finland</vaadin-item>
              <vaadin-item>Germany</vaadin-item>
              <vaadin-item>USA</vaadin-item>
            </vaadin-list-box>
          </template>
        </vaadin-select>
      </vaadin-form-layout>
    `;
    // end::snippet[]
  }
}
