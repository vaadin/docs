import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/crud';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('crud-toolbar')
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
      <!-- tag::snippet[] -->
      <vaadin-crud
        include="firstName, lastName"
        .items="${this.items}"
        @size-changed="${() => this.requestUpdate()}"
      >
        <vaadin-horizontal-layout slot="toolbar" style="align-items: center; flex-grow: 1;">
          <span>Total: <b>${this.items.length}</b> employees</span>
        </vaadin-horizontal-layout>
        <vaadin-button theme="tertiary" slot="new-button">
          <vaadin-icon slot="prefix" icon="vaadin:plus"></vaadin-icon>
          New employee
        </vaadin-button>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
