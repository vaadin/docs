import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/crud';
import type { Crud, CrudNewEvent } from '@vaadin/crud';
import '@vaadin/email-field';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-item-initialization')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-crud')
  private accessor crud!: Crud<Partial<Person>>;

  @state()
  private accessor items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  // tag::snippet[]
  handleNewItem(e: CrudNewEvent) {
    // Cancel event to allow setting a custom item instance
    e.preventDefault();
    this.crud.editedItem = {
      email: '@vaadin.com',
      profession: 'Developer',
    };
  }

  protected override render() {
    return html`
      <vaadin-crud
        include="firstName, lastName, email, profession"
        .items="${this.items}"
        @new="${this.handleNewItem}"
      ></vaadin-crud>
    `;
  }

  // end::snippet[]
}
