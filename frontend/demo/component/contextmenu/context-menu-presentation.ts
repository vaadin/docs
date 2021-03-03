import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import './hint-badge'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-icons/vaadin-icons';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('context-menu-presentation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private gridItems: Person[] = [];

  // tag::snippet[]
  async firstUpdated() {
    this.gridItems = await getPeople();
    const itemsArray = this.createItemsArray(this.gridItems.slice(0, 6));

    const contextMenu = this.shadowRoot?.querySelector('vaadin-context-menu');
    if (contextMenu) {
      contextMenu.items = [
        { component: this.createItem('vaadin:file-search', 'Open') },
        {
          component: this.createItem('vaadin:user-check', 'Assign'),
          children: [
            { text: 'Managers', component: this.createHeader() },
            { component: itemsArray[0] },
            { component: itemsArray[1] },
            { component: itemsArray[2] },
            { text: 'Senior Managers', component: this.createHeader() },
            { component: itemsArray[3] },
            { component: itemsArray[4] },
            { component: itemsArray[5] }
          ]
        },
        {
          component: this.createItem('vaadin:clipboard-check', 'Status'),
          children: [{ text: 'Assigned' }, { text: 'Promoted' }]
        },
        { component: 'hr' },
        { component: this.createItem('vaadin:trash', 'Delete') }
      ];
    }
  }
  // end::snippet[]

  render() {
    return html`
      <hint-badge></hint-badge>
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu>
        <vaadin-grid .items=${this.gridItems}>
          <vaadin-grid-column label="First name" path="firstName"></vaadin-grid-column>
          <vaadin-grid-column label="Last name" path="lastName"></vaadin-grid-column>
          <vaadin-grid-column label="Email" path="email"></vaadin-grid-column>
          <vaadin-grid-column label="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  createItemsArray(people: Person[]) {
    return people.map((person, index) => {
      const item = document.createElement('vaadin-item');
      index == 0 && item.setAttribute('selected', '');
      render(
        html`
          <div style="display: flex;">
            <img
              style="height: var(--lumo-size-m); margin-right: var(--lumo-space-s);"
              src=${person.pictureUrl}
              alt="Portrait of ${person.firstName} ${person.lastName}"
            />
            <div>
              ${person.firstName} ${person.lastName}
              <div
                style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
              >
                ${Math.floor(Math.random() * 20) + 1} applications
              </div>
            </div>
          </div>
        `,
        item
      );
      return item;
    });
  }

  createItem(iconName: string, text: string) {
    const item = window.document.createElement('vaadin-context-menu-item');
    const icon = window.document.createElement('iron-icon');

    icon.style.width = 'var(--lumo-icon-size-s)';
    icon.style.height = 'var(--lumo-icon-size-s)';
    icon.style.marginRight = 'var(--lumo-space-s)';

    icon.setAttribute('icon', iconName);
    item.appendChild(icon);
    text && item.appendChild(window.document.createTextNode(text));
    return item;
  }

  createHeader() {
    const header = document.createElement('h6');
    header.style.marginBottom = '0';
    header.style.color = 'gray';
    return header;
  }
}
