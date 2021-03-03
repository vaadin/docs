import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import './hint-badge'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty, query } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';
import { GridElement } from '@vaadin/vaadin-grid/vaadin-grid';

@customElement('context-menu-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];
  // end::snippet[]

  @query('vaadin-grid')
  private grid?: GridElement;

  @internalProperty()
  private gridItems: Person[] = [];

  async firstUpdated() {
    this.gridItems = await getPeople();
  }

  render() {
    return html`
      <hint-badge
        message="Open the Context Menu by focusing a Grid row and pressing Space or Enter."
      ></hint-badge>
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu open-on="open-context-menu" .items=${this.items}>
        <vaadin-grid
          .items=${this.gridItems}
          @active-item-changed="${this.activeItemChanged}"
          @keydown="${this.onKeyDown}"
        >
          <vaadin-grid-column label="First name" path="firstName"></vaadin-grid-column>
          <vaadin-grid-column label="Last name" path="lastName"></vaadin-grid-column>
          <vaadin-grid-column label="Email" path="email"></vaadin-grid-column>
          <vaadin-grid-column label="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  activeItemChanged(e: CustomEvent) {
    // Used for demonstration purposes.
    const item = e.detail.value;
    this.grid && (this.grid.selectedItems = item ? [item] : []);
  }

  onKeyDown(e: KeyboardEvent) {
    if ((e.key === 'Space' || e.key === ' ' || e.key === 'Enter') && e.target) {
      const { x, y } = (e.composedPath()[0] as HTMLElement).getBoundingClientRect();
      e.target.dispatchEvent(
        new CustomEvent('open-context-menu', { detail: { x, y, e }, bubbles: true })
      );

      e.preventDefault();
      e.stopPropagation();
    }
  }
}
