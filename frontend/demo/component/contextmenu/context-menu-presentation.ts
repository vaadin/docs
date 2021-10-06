import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import type { ContextMenuItem } from '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import type { GridElement, GridEventContext, GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-presentation')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private gridItems: Person[] = [];

  @state()
  private items?: ContextMenuItem[];

  // tag::snippet[]
  async firstUpdated() {
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

  render() {
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
            .renderer=${this.nameRenderer}
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
      const item = document.createElement('vaadin-item');
      index == 0 && item.setAttribute('selected', '');
      render(
        html`
          <vaadin-horizontal-layout
            style="align-items: center; line-height: var(--lumo-line-height-m)"
            theme="spacing"
          >
            <vaadin-avatar
              .img=${person.pictureUrl}
              .name=${`${person.firstName} ${person.lastName}`}
            >
            </vaadin-avatar>
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
    const item = window.document.createElement('vaadin-context-menu-item');
    const icon = window.document.createElement('vaadin-icon');

    icon.style.color = 'var(--lumo-secondary-text-color)';
    icon.style.marginInlineEnd = 'var(--lumo-space-s)';
    icon.style.padding = 'var(--lumo-space-xs)';

    icon.setAttribute('icon', iconName);
    item.appendChild(icon);
    text && item.appendChild(window.document.createTextNode(text));
    return item;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    const target = e.currentTarget as GridElement;
    if ((target.getEventContext(e) as GridEventContext<Person>).section !== 'body') {
      e.stopPropagation();
    }
  }

  private nameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    if (model?.item) {
      const person = model.item;
      render(html` <span>${person.firstName} ${person.lastName}</span> `, root);
    }
  };
}
