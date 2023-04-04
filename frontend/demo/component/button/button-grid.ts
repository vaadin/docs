import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import type { GridSelectedItemsChangedEvent } from '@vaadin/grid';
import type { GridSelectionColumnSelectAllChangedEvent } from '@vaadin/grid/vaadin-grid-selection-column';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('button-grid')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private selectedItems: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout theme="spacing" style="align-items: stretch;">
        <vaadin-horizontal-layout style="align-items: center;">
          <h2 style="margin: 0 auto 0 0;">Users</h2>
          <vaadin-button>Add user</vaadin-button>
        </vaadin-horizontal-layout>

        <vaadin-grid
          .items="${this.items}"
          @selected-items-changed="${(event: GridSelectedItemsChangedEvent<Person>) => {
            this.selectedItems = event.target ? [...event.detail.value] : this.selectedItems;
          }}"
        >
          <vaadin-grid-selection-column
            auto-select
            @select-all-changed="${(event: GridSelectionColumnSelectAllChangedEvent) => {
              this.selectedItems = event.detail.value ? this.items : this.selectedItems;
            }}"
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
