import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-crud/vaadin-crud';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-toolbar')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = (await getPeople()).people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud
        include="firstName, lastName"
        .items="${this.items}"
        @size-changed="${() => this.requestUpdate()}"
      >
        <vaadin-horizontal-layout
          slot="toolbar"
          style="align-items: center; flex-grow: 1; justify-content: space-between;"
        >
          <span>Total: <b>${this.items.length}</b> employees</span>
          <vaadin-button theme="tertiary" new-button>
            <vaadin-icon slot="prefix" icon="vaadin:plus"></vaadin-icon>
            New employee
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
