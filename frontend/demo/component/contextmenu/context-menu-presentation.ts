import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/context-menu';
import type { ContextMenuItem } from '@vaadin/context-menu';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { Grid } from '@vaadin/grid';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-presentation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private gridItems: Person[] = [];

  @state()
  private items: ContextMenuItem[] | undefined;

  // tag::snippet[]
  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 10 });

    this.gridItems = people.slice(0, 5);
    const itemsArray = this.createItemsArray(people.slice(5, 10));

    this.items = [
      { component: this.createItem('vaadin:file-search', 'Open') },
      {
        component: this.createItem('vaadin:user-check', 'Assign'),
        children: [
          { component: itemsArray[0] },
          { component: itemsArray[1] },
          { component: itemsArray[2] },
          { component: itemsArray[3] },
          { component: itemsArray[4] },
        ],
      },
      { component: 'hr' },
      { component: this.createItem('vaadin:trash', 'Delete') },
    ];
  }
  // end::snippet[]

  protected override render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .items=${this.items}>
        <vaadin-grid
          all-rows-visible
          .items=${this.gridItems}
          @vaadin-contextmenu=${this.onContextMenu}
        >
          <vaadin-grid-column
            header="Applicant"
            ${columnBodyRenderer<Person>(
              (person) => html`<span>${person.firstName} ${person.lastName}</span>`,
              []
            )}
          ></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column header="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  createItemsArray(people: Person[]) {
    return people.map((person, index) => {
      const item = document.createElement('vaadin-context-menu-item');
      if (index === 0) {
        item.setAttribute('selected', '');
      }
      render(
        html`
          <vaadin-horizontal-layout
            style="align-items: center; line-height: var(--lumo-line-height-m)"
            theme="spacing"
          >
            <vaadin-avatar
              .img=${person.pictureUrl}
              .name=${`${person.firstName} ${person.lastName}`}
            ></vaadin-avatar>
            <vaadin-vertical-layout>
              <span> ${person.firstName} ${person.lastName} </span>
              <span
                style="color: var(--lumo-secondary-text-color); font-size: var(--lumo-font-size-s);"
              >
                ${Math.floor(Math.random() * 20) + 1} applications
              </span>
            </vaadin-vertical-layout>
          </vaadin-horizontal-layout>
        `,
        item
      );
      return item;
    });
  }

  createItem(iconName: string, text: string) {
    const item = document.createElement('vaadin-context-menu-item');
    const icon = document.createElement('vaadin-icon');

    icon.style.color = 'var(--lumo-secondary-text-color)';
    icon.style.marginInlineEnd = 'var(--lumo-space-s)';
    icon.style.padding = 'var(--lumo-space-xs)';

    icon.setAttribute('icon', iconName);
    item.appendChild(icon);
    if (text) {
      item.appendChild(document.createTextNode(text));
    }
    return item;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    const target = e.currentTarget as Grid<Person>;
    if (target.getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  }
}
