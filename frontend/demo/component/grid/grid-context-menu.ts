import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/context-menu';
import { contextMenuRenderer } from '@vaadin/context-menu/lit.js';
import type { ContextMenuLitRenderer } from '@vaadin/context-menu/lit.js';
import '@vaadin/grid';
import type { Grid } from '@vaadin/grid';
import '@vaadin/item';
import '@vaadin/list-box';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-context-menu')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
  private renderMenu: ContextMenuLitRenderer = (context, menu) => {
    const { sourceEvent } = context.detail as { sourceEvent: Event };
    const grid = menu.firstElementChild as Grid<Person>;

    const eventContext = grid.getEventContext(sourceEvent);
    const person = eventContext.item!;

    const clickHandler = (_action: string) => () => {
      // console.log(`${action}: ${person.firstName} ${person.lastName}`);
    };

    return html`
      <vaadin-list-box>
        <vaadin-item @click="${clickHandler('Edit')}">Edit</vaadin-item>
        <vaadin-item @click="${clickHandler('Delete')}">Delete</vaadin-item>
        <hr />
        <vaadin-item @click="${clickHandler('Email')}">Email (${person.email})</vaadin-item>
        <vaadin-item @click="${clickHandler('Call')}">Call (${person.address.phone})</vaadin-item>
      </vaadin-list-box>
    `;
  };

  protected override render() {
    return html`
      <vaadin-context-menu ${contextMenuRenderer(this.renderMenu, [])}>
        <vaadin-grid .items="${this.items}" @vaadin-contextmenu="${this.onContextMenu}">
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column path="profession"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
    `;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    if ((e.currentTarget as Grid).getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  }
  // end::snippet[]
}
