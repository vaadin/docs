import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-crud/vaadin-crud';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
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
        .items=${this.items}
        @size-changed=${() => this.requestUpdate()}
      >
        <vaadin-horizontal-layout
          slot="toolbar"
          style="align-items: center; flex-grow: 1; justify-content: space-between;"
        >
          <span>Total: <b>${this.items.length}</b> employees</span>
          <vaadin-button theme="tertiary" new-button>
            <iron-icon slot="prefix" icon="vaadin:plus"></iron-icon>
            New employee
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
