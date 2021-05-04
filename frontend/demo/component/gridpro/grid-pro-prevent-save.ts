import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridProConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro-edit-column';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-pro-prevent-save')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid-pro .items="${this.items}" @item-property-changed="${this.itemPropertyListener}">
        <vaadin-grid-pro-edit-column path="firstName"> </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="lastName"> </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="email"> </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="address.phone"> </vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }

  private itemPropertyListener(event: CustomEvent<{ value: string; path: string }>) {
    switch (event.detail.path) {
      case 'address.phone':
        if (!/^[0-9-]+$/.test(event.detail.value)) {
          // phone is not correct
          event.preventDefault();
        }
        break;
      case 'email':
        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(event.detail.value)) {
          // email is not correct
          event.preventDefault();
        }
        break;
    }
  }
}
