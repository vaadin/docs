import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import '@vaadin/vaadin-icons/vaadin-icons';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('crud-toolbar')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople();
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud include="firstName, lastName" .items=${this.items}>
        <div slot="toolbar" style="flex: 1;">Total: <b>${this.items.length}</b> employees</div>
        <a slot="toolbar" new-button href="javascript:"
          ><iron-icon style="height: calc(var(--lumo-size-xs) / 2);" icon="vaadin:plus"></iron-icon
          >New employee</a
        >
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
