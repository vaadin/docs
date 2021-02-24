import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import './hint-badge'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('context-menu-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items = [
    { text: 'View' },
    { component: 'hr' },
    { text: 'Edit' },
    { text: 'Delete' },
    { component: 'hr' },
    { text: 'Email' },
    { text: 'Call' }
  ];
  // end:snippet[]

  @internalProperty()
  private gridItems: Person[] = [];

  async firstUpdated() {
    this.gridItems = await getPeople();
  }

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <hint-badge></hint-badge>
      <vaadin-context-menu .items=${this.items}>
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
}
