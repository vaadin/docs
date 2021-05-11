import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-icons/vaadin-icons';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render, html } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import {
  ContextMenuElement,
  ContextMenuRendererContext,
} from '@vaadin/vaadin-context-menu/vaadin-context-menu';
import { guard } from 'lit-html/directives/guard';

@customElement('grid-context-menu')
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

  // tag::snippet[]
  private contextMenuRenderer =
    () => (root: HTMLElement, elem: ContextMenuElement, context: ContextMenuRendererContext) => {
      const { sourceEvent } = context.detail! as { sourceEvent: Event };
      const grid = elem.firstElementChild as GridElement;

      const eventContext = grid.getEventContext(sourceEvent) as GridEventContext;
      const person = eventContext.item as Person;

      render(
        html`<vaadin-list-box style="color: var(--lumo-contrast-70pct);">
          <h6 style="margin: 0 var(--lumo-space-m)">${person.firstName} ${person.lastName}</h6>
          ${this.createItem('vaadin:pencil', 'Edit')} ${this.createItem('vaadin:trash', 'Delete')}
          <hr />
          ${this.createItem('vaadin:envelope-o', 'Email')}
          ${this.createItem('vaadin:phone', 'Call')}
        </vaadin-list-box>`,
        root
      );
    };

  render() {
    return html`
      <vaadin-context-menu .renderer="${guard([], this.contextMenuRenderer)}">
        <vaadin-grid .items="${this.items}" @vaadin-contextmenu="${this.onContextMenu}">
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column path="profession"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
    `;
  }

  createItem(icon: string, text: string) {
    return html`<vaadin-item style="font-size: var(--lumo-font-size-s)"
      ><iron-icon
        icon="${icon}"
        style="width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); margin-right: var(--lumo-space-s)"
      ></iron-icon
      >${text}</vaadin-item
    > `;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    if (
      ((e.currentTarget as GridElement).getEventContext(e) as GridEventContext).section !== 'body'
    ) {
      e.stopPropagation();
    }
  }
  // end::snippet[]
}
