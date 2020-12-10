import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon/iron-icon';

@customElement('text-field-min-max-input-length')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-text-field
          minlength="5"
          maxlength="5"
          label="Zip code"
          style="width: 6em"
        ></vaadin-text-field>

        <vaadin-text-field
          label="Username"
          helper-text="Max 16 characters"
          minlength="1"
          maxlength="16"
        >
        </vaadin-text-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
