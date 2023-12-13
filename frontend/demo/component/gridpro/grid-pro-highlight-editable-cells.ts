import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid/vaadin-grid-column.js';
import '@vaadin/grid-pro';
import '@vaadin/grid-pro/vaadin-grid-pro-edit-column.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-pro-highlight-editable-cells')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
      <!-- tag::snippet[] -->
      <vaadin-grid-pro theme="highlight-editable-cells" .items="${this.items}">
        <!-- end::snippet[] -->
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="membership"></vaadin-grid-column>
        <vaadin-grid-pro-edit-column
          path="email"
          header="Email (Editable)"
        ></vaadin-grid-pro-edit-column>
        <!-- tag::snippet[] -->
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }
}
