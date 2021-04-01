import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import {
  ContextMenuItem,
  ContextMenuItemSelected,
} from '@vaadin/vaadin-context-menu/vaadin-context-menu';

// tag::snippet[]
@customElement('grid-column-visibility')
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

  private contextMenuItems: (ContextMenuItem & { key: string })[] = [
    { text: 'First name', checked: true, key: 'firstName' },
    { text: 'Last name', checked: true, key: 'lastName' },
    { text: 'Email', checked: true, key: 'email' },
    { text: 'Phone', checked: true, key: 'phone' },
    { text: 'Profession', checked: true, key: 'profession' },
  ];

  @internalProperty()
  private visibleColumns = {
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    profession: true,
  };

  render() {
    return html`
      <vaadin-horizontal-layout>
        <strong style="flex: 1;">Employees</strong>
        <vaadin-context-menu
          open-on="click"
          .items="${this.contextMenuItems}"
          @item-selected="${(e: ContextMenuItemSelected) => {
            const value = e.detail.value as ContextMenuItem & { key: string };
            this.contextMenuItems = this.contextMenuItems.map((item) =>
              item.key === value.key ? { ...item, checked: !value.checked } : item
            );
            this.visibleColumns = { ...this.visibleColumns, [value.key]: !value.checked };
          }}"
        >
          <vaadin-button theme="tertiary">Show/Hide Columns</vaadin-button>
        </vaadin-context-menu>
      </vaadin-horizontal-layout>

      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column
          path="firstName"
          .hidden="${!this.visibleColumns.firstName}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="lastName"
          .hidden="${!this.visibleColumns.lastName}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="email"
          .hidden="${!this.visibleColumns.email}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="address.phone"
          .hidden="${!this.visibleColumns.phone}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="profession"
          .hidden="${!this.visibleColumns.profession}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
// end::snippet[]
