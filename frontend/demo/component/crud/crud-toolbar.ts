import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-button/vaadin-button';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-toolbar')
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
      <vaadin-crud
        include="firstName, lastName"
        .items="${this.items}"
        @size-changed="${() => this.requestUpdate()}"
      >
        <div slot="toolbar" style="flex: 1;">Total: <b>${this.items.length}</b> employees</div>
        <vaadin-button theme="tertiary" slot="toolbar" new-button>
          <iron-icon slot="prefix" icon="vaadin:plus"></iron-icon>
          New employee
        </vaadin-button>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
