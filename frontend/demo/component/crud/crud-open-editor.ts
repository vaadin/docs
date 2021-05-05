import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid';
import { CrudEditedItemChanged } from '@vaadin/vaadin-crud';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-open-editor')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  @internalProperty()
  private editedItem?: Person;

  async firstUpdated() {
    this.items = (await getPeople()).people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud
        include="firstName, lastName, email, profession"
        .items="${this.items}"
        .editedItem="${this.editedItem as any}"
        @edited-item-changed="${(e: CrudEditedItemChanged<Person>) =>
          (this.editedItem = e.detail.value)}"
      >
        <vaadin-grid slot="grid" @dblclick="${this.onDblClick}">
          <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
          <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
          <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
          <vaadin-grid-column path="profession" header="Profession"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }

  onDblClick(e: MouseEvent) {
    this.editedItem = ((e.currentTarget as GridElement).getEventContext(e) as GridEventContext)
      .item as Person;
  }
}
