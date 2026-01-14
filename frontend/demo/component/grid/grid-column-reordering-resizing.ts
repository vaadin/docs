import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column-group.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
@customElement('grid-column-reordering-resizing')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <vaadin-grid .items="${this.items}" column-reordering-allowed>
        <vaadin-grid-column-group header="Name">
          <vaadin-grid-column path="firstName" resizable></vaadin-grid-column>
          <vaadin-grid-column path="lastName" resizable></vaadin-grid-column>
        </vaadin-grid-column-group>
        <vaadin-grid-column-group header="Address">
          <vaadin-grid-column path="address.street" resizable></vaadin-grid-column>
          <vaadin-grid-column path="address.city" resizable></vaadin-grid-column>
          <vaadin-grid-column path="address.zip" resizable></vaadin-grid-column>
          <vaadin-grid-column path="address.state" resizable></vaadin-grid-column>
        </vaadin-grid-column-group>
      </vaadin-grid>
    `;
  }
}
// end::snippet[]
