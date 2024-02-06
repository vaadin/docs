import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/crud';
import type { CrudEditedItemChangedEvent } from '@vaadin/crud';
import type { Grid } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-open-editor')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private editedItem: Person | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud
        include="firstName, lastName, email, profession"
        .items="${this.items}"
        .editedItem="${this.editedItem as any}"
        @edited-item-changed="${(event: CrudEditedItemChangedEvent<Person>) => {
          this.editedItem = event.detail.value;
        }}"
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
    const target = e.currentTarget as Grid<Person>;
    this.editedItem = target.getEventContext(e).item;
  }
}
