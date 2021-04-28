import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, css } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render, html } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-drag-rows-between-grids')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      .grids-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      .grid1,
      .grid2 {
        width: 300px;
        height: 300px;
        margin-left: 0.5rem;
        margin-top: 0.5rem;
        align-self: unset;
      }
    `;
  }

  @internalProperty()
  private draggedItem?: Person;

  @internalProperty()
  private grid1Items: Person[] = [];

  @internalProperty()
  private grid2Items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 10 });
    this.grid1Items = people.slice(0, 5);
    this.grid2Items = people.slice(5);
  }

  render() {
    return html`
      <div class="grids-container">
        <vaadin-grid
          .items="${this.grid1Items}"
          class="grid1"
          ?rows-draggable="${true}"
          drop-mode="on-grid"
          @grid-dragstart="${(event: CustomEvent) => {
            this.draggedItem = event.detail.draggedItems[0];
          }}"
          @grid-dragend="${() => {
            delete this.draggedItem;
          }}"
          @grid-drop="${(event: CustomEvent) => {
            const { dropTargetItem } = event.detail;
            const draggedPerson = this.draggedItem as Person;
            if (dropTargetItem !== draggedPerson) {
              const draggedItemIndex = this.grid2Items.indexOf(draggedPerson);
              if (draggedItemIndex >= 0) {
                // remove the item from its previous position
                this.grid2Items.splice(draggedItemIndex, 1);
                // re-assign the array to refresh the grid
                this.grid2Items = [...this.grid2Items];
                // re-assign the array to refresh the grid
                this.grid1Items = [...this.grid1Items, draggedPerson];
              }
            }
          }}"
        >
          <vaadin-grid-column
            header="Full name"
            .renderer="${this.fullNameRenderer}"
          ></vaadin-grid-column>
          <vaadin-grid-column path="profession"></vaadin-grid-column>
        </vaadin-grid>

        <vaadin-grid
          .items="${this.grid2Items}"
          class="grid2"
          ?rows-draggable="${true}"
          drop-mode="on-grid"
          @grid-dragstart="${(event: CustomEvent) => {
            this.draggedItem = event.detail.draggedItems[0];
          }}"
          @grid-dragend="${() => {
            delete this.draggedItem;
          }}"
          @grid-drop="${(event: CustomEvent) => {
            const { dropTargetItem } = event.detail;
            const draggedPerson = this.draggedItem as Person;
            if (dropTargetItem !== draggedPerson) {
              const draggedItemIndex = this.grid1Items.indexOf(draggedPerson);
              if (draggedItemIndex >= 0) {
                // remove the item from its previous position
                this.grid1Items.splice(draggedItemIndex, 1);
                // re-assign the array to refresh the grid
                this.grid1Items = [...this.grid1Items];
                // re-assign the array to refresh the grid
                this.grid2Items = [...this.grid2Items, draggedPerson];
              }
            }
          }}"
        >
          <vaadin-grid-column
            header="Full name"
            .renderer="${this.fullNameRenderer}"
          ></vaadin-grid-column>
          <vaadin-grid-column path="profession"></vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
  }

  private fullNameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const person: Person = model.item as Person;
    render(html`${person.firstName} ${person.lastName}`, root);
  };
}
// end::snippet[]
