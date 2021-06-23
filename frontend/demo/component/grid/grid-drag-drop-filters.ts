import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line (Grid's connector)

import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import type {
  GridDataProviderCallback,
  GridDataProviderParams,
  GridDragStartEvent,
  GridDropEvent,
  GridElement,
  GridExpandedItemsChangedEvent,
  GridItemModel,
} from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-drag-drop-filters')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-grid')
  private grid!: GridElement;

  @state()
  private draggedItem?: Person;

  @state()
  private items: Person[] = [];

  @state()
  private managers: Person[] = [];

  @state()
  private expandedItems: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
    this.managers = this.items.filter((item) => item.manager);
    // avoid using this method
    this.grid.clearCache();
  }

  private dataProvider = async (
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ) => {
    const { page, pageSize, parentItem } = params;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    /*
    We cannot change the underlying data in this demo so this dataProvider uses
    a local field to fetch its values. This allows us to keep a reference to the
    modified list instead of loading a new list every time the dataProvider gets
    called. In a real application, you should always access your data source 
    here and avoid using grid.clearCache() whenever possible.
    */
    const result = parentItem
      ? this.items.filter((item) => item.managerId === parentItem.id)
      : this.managers.slice(startIndex, endIndex);

    callback(result, result.length);
  };

  render() {
    return html`
      <vaadin-grid
        .dataProvider="${this.dataProvider}"
        .itemIdPath="${'id'}"
        .expandedItems="${this.expandedItems}"
        @expanded-items-changed="${(event: GridExpandedItemsChangedEvent<Person>) => {
          this.expandedItems = event.detail.value;
        }}"
        ?rows-draggable="${true}"
        drop-mode="on-top"
        @grid-dragstart="${(event: GridDragStartEvent<Person>) => {
          this.draggedItem = event.detail.draggedItems[0];
        }}"
        @grid-dragend="${() => {
          delete this.draggedItem;
        }}"
        @grid-drop="${(event: GridDropEvent<Person>) => {
          const manager = event.detail.dropTargetItem;
          if (this.draggedItem) {
            // in a real aplpication, when using a data provider, you should
            // change the persisted data instead of updating a field
            this.draggedItem.managerId = manager.id;
            // avoid using this method
            this.grid.clearCache();
          }
        }}"
        .dragFilter="${(model: GridItemModel<Person>) => {
          const item = model.item;
          return !item.manager; // only drag non-managers
        }}"
        .dropFilter="${(model: GridItemModel<Person>) => {
          const item = model.item;
          return (
            item.manager && // can only drop on a supervisor
            item.id !== this.draggedItem?.managerId // disallow dropping on the same manager
          );
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
