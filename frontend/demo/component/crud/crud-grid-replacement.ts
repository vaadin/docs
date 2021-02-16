import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('crud-grid-replacement')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople();
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud include="firstName, lastName" .items=${this.items}>
        <vaadin-grid slot="grid">
          <vaadin-crud-edit-column></vaadin-crud-edit-column>
          <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
          <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
          <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
          <vaadin-grid-column path="profession" header="Profession"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
