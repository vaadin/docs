import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-crud/vaadin-crud';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid';
import type { CrudEditedItemChangedEvent } from '@vaadin/vaadin-crud';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-open-editor')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
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
        @edited-item-changed="${(e: CrudEditedItemChangedEvent<Person>) =>
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
    const target = e.currentTarget as GridElement;
    this.editedItem = (target.getEventContext(e) as GridEventContext<Person>).item;
  }
}
