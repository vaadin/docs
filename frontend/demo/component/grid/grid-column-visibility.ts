import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/context-menu';
import type { ContextMenuItem, ContextMenuItemSelectedEvent } from '@vaadin/context-menu';
import '@vaadin/grid';
import '@vaadin/horizontal-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-column-visibility')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Person[] = [];

  @state()
  private contextMenuItems: Array<ContextMenuItem & { key: string }> = [
    { text: 'First name', checked: true, key: 'firstName', keepOpen: true },
    { text: 'Last name', checked: true, key: 'lastName', keepOpen: true },
    { text: 'Email', checked: true, key: 'email', keepOpen: true },
    { text: 'Phone', checked: true, key: 'phone', keepOpen: true },
    { text: 'Profession', checked: true, key: 'profession', keepOpen: true },
  ];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout style="align-items: baseline">
        <strong style="flex: 1;">Employees</strong>
        <vaadin-context-menu
          open-on="click"
          .items="${this.contextMenuItems}"
          @item-selected="${(e: ContextMenuItemSelectedEvent) => {
            const item = e.detail.value;
            item.checked = !item.checked;
            this.contextMenuItems = [...this.contextMenuItems];
          }}"
        >
          <vaadin-button theme="tertiary">Show/Hide Columns</vaadin-button>
        </vaadin-context-menu>
      </vaadin-horizontal-layout>

      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column
          path="firstName"
          .hidden="${!this.contextMenuItems[0].checked}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="lastName"
          .hidden="${!this.contextMenuItems[1].checked}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="email"
          .hidden="${!this.contextMenuItems[2].checked}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="address.phone"
          .hidden="${!this.contextMenuItems[3].checked}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="profession"
          .hidden="${!this.contextMenuItems[4].checked}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
