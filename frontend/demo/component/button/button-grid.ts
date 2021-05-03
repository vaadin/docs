import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
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
      <vaadin-vertical-layout theme="spacing" style="align-items: stretch;">
        <vaadin-horizontal-layout style="align-items: center;">
          <h2 style="margin: 0 auto 0 0;">Users</h2>
          <vaadin-button>Add user</vaadin-button>
        </vaadin-horizontal-layout>

        <vaadin-grid
          .items="${this.items}"
          @selected-items-changed="${(ev: any) =>
            (this.selectedItems = ev.target ? [...ev.target.selectedItems] : this.selectedItems)}"
        >
          <vaadin-grid-selection-column
            auto-select
            @select-all-changed="${(ev: CustomEvent) =>
              (this.selectedItems = ev.detail.value ? this.items : this.selectedItems)}"
          ></vaadin-grid-selection-column>
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
        </vaadin-grid>

        <vaadin-horizontal-layout theme="spacing" style="flex-wrap: wrap;">
          <vaadin-button ?disabled="${this.selectedItems.length !== 1}">Edit profile</vaadin-button>
          <vaadin-button ?disabled="${this.selectedItems.length !== 1}">
            Manage permissions
          </vaadin-button>
          <vaadin-button ?disabled="${this.selectedItems.length !== 1}">
            Reset password
          </vaadin-button>
          <vaadin-button
            theme="error"
            ?disabled="${this.selectedItems.length === 0}"
            style="margin-inline-start: auto;"
          >
            Delete
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
