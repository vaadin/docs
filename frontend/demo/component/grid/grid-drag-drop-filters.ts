import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, query } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import {
  GridDataProviderCallback,
  GridDataProviderParams,
  GridElement,
  GridItemModel,
} from '@vaadin/vaadin-grid/vaadin-grid';
import { html } from 'lit-html';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-drag-drop-filters')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @query('vaadin-grid')
  private grid?: GridElement;

  @internalProperty()
  private draggedItem?: Person;

  @internalProperty()
  private items: Person[] = [];

  @internalProperty()
  private managers: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
    this.managers = this.items.filter((item) => item.manager);
    this.grid?.clearCache();
  }

  private dataProvider = async (
    params: GridDataProviderParams,
    callback: GridDataProviderCallback
  ) => {
    const { page, pageSize, parentItem } = params;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const result = parentItem
      ? this.items.filter((item) => item.managerId === (parentItem as Person).id)
      : this.managers.slice(startIndex, endIndex);
    callback(result, result.length);
  };

  @internalProperty()
  private expandedItems: unknown[] = [];

  render() {
    return html`
      <vaadin-grid
        .dataProvider=${this.dataProvider}
        .itemIdPath=${'id'}
        .expandedItems=${this.expandedItems}
        ?rows-draggable="${true}"
        drop-mode="on-top"
        @grid-dragstart="${(event: CustomEvent) => {
          this.draggedItem = event.detail.draggedItems[0];
        }}"
        @grid-dragend="${() => {
          delete this.draggedItem;
        }}"
        @grid-drop="${(event: CustomEvent) => {
          const { dropTargetItem: manager } = event.detail;
          if (this.draggedItem) {
            this.draggedItem.managerId = manager.id;
            this.grid?.clearCache();
          }
        }}"
        .dragFilter="${(model: GridItemModel) => {
          const item = model.item as Person;
          return !item.manager; // only drag non-managers
        }}"
        .dropFilter="${(model: GridItemModel) => {
          const item = model.item as Person;
          return (
            item.manager && // can only drop on a supervisor
            item.id !== this.draggedItem?.managerId
          ); // disallow dropping on the same manager
        }}"
      >
        <vaadin-grid-tree-column
          path="firstName"
          item-has-children-path="manager"
        ></vaadin-grid-tree-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
// end::snippet[]
