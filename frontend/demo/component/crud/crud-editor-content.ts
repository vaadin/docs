import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-editor-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = (await getPeople()).people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud include="firstName, lastName, email, profession" .items="${this.items}">
        <vaadin-form-layout slot="form">
          <vaadin-text-field path="firstName" label="First name" required></vaadin-text-field>
          <vaadin-text-field path="lastName" label="Last name" required></vaadin-text-field>
          <vaadin-email-field path="email" label="Email" required></vaadin-email-field>
          <vaadin-combo-box
            path="profession"
            label="Profession"
            .items="${[...new Set(this.items.map((i) => i.profession))]}"
          ></vaadin-combo-box>
        </vaadin-form-layout>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
