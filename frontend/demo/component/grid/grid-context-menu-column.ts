import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/context-menu';
import '@vaadin/grid';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type { ContextMenu, ContextMenuItemSelectedEvent } from '@vaadin/context-menu';
import type { Grid } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('grid-context-menu-column')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  // tag::snippet[]
  @query('vaadin-context-menu')
  private menu!: ContextMenu;

  private person?: Person;

  protected override render() {
    return html`
      <vaadin-context-menu @item-selected="${this.onItemSelected}">
        <vaadin-grid .items="${this.items}" @vaadin-contextmenu="${this.onContextMenu}">
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column path="address.phone" header="Phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
    `;
  }

  onContextMenu(e: MouseEvent) {
    const { item, column, section } = (e.currentTarget as Grid<Person>).getEventContext(e);
    if (section !== 'body' || !item) {
      e.stopPropagation();
      return;
    }

    this.person = item;
    const path = column?.path;
    this.menu.items = [
      { text: 'Edit' },
      ...(path === 'email' ? [{ text: 'Send email' }] : []),
      ...(path === 'address.phone' ? [{ text: 'Call' }] : []),
    ];
  }

  onItemSelected(e: ContextMenuItemSelectedEvent) {
    const person = this.person;
    console.log(`${e.detail.value.text}: ${person?.firstName} ${person?.lastName}`);
  }
  // end::snippet[]
}
