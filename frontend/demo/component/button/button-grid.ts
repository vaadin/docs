import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('button-grid')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  @internalProperty()
  private selectedItems: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout
        style="display: flex; justify-content: space-between; margin: 0 0 var(--lumo-space-m) 0;"
      >
        <h2 style="margin: 0; font-size: 1.5em; font-weight: bold;">Users</h2>
        <vaadin-button style="margin: 0;">Add user</vaadin-button>
      </vaadin-horizontal-layout>

      <vaadin-grid
        .items=${this.items}
        @selected-items-changed="${(ev: any) =>
          (this.selectedItems = ev.target ? [...ev.target.selectedItems] : this.selectedItems)}"
      >
        <vaadin-grid-selection-column
          width="60px"
          @select-all-changed="${(ev: CustomEvent) =>
            (this.selectedItems = ev.detail.value ? this.items : this.selectedItems)}"
        ></vaadin-grid-selection-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>

      <vaadin-horizontal-layout theme="spacing" style="margin-top: var(--lumo-space-s)">
        <vaadin-horizontal-layout
          theme="spacing"
          style="overflow-x: auto;"
          ?hidden="${this.selectedItems.length !== 1}"
        >
          <vaadin-button>Edit profile</vaadin-button>
          <vaadin-button>Manage permissions</vaadin-button>
          <vaadin-button>Reset password</vaadin-button>
        </vaadin-horizontal-layout>
        <div style="flex-grow: 1" ?hidden="${this.selectedItems.length === 0}">
          <vaadin-button theme="error" style="float: right;">Delete</vaadin-button>
        </div>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
