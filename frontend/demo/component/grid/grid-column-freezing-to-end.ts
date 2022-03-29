import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/grid';
import '@vaadin/horizontal-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-column-freezing-to-end')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items?: Person[];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="address.street" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="address.phone" auto-width></vaadin-grid-column>
        <!-- tag::snippet[] -->
        <vaadin-grid-column path="profession" auto-width frozen-to-end></vaadin-grid-column>
        <!-- end::snippet[] -->
      </vaadin-grid>
    `;
  }
}
