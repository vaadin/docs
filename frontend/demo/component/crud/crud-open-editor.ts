import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty, query } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid';

@customElement('crud-open-editor')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  @query('vaadin-grid')
  private grid?: GridElement;

  async firstUpdated() {
    this.items = await getPeople();
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud include="firstName, lastName, email, profession" .items=${this.items}>
        <vaadin-grid slot="grid" @dblclick="${this.onDblClick}">
          <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
          <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
          <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
          <vaadin-grid-column path="profession" header="Profession"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }

  onDblClick(e: MouseEvent) {
    const item = (this.grid?.getEventContext(e) as GridEventContext).item;
    if (item) {
      this.grid?.dispatchEvent(new CustomEvent('edit', { detail: { item: item } }));
    }
  }
}
