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

  // The bottom row of buttons should only show when a single item is selected.
  // this component must be updated when the grid's selection changes.
  private refresh = () => {
    const grid = this.shadowRoot?.querySelector('vaadin-grid');
    if (grid) {
      this.selectedItems = grid.selectedItems as Person[];
    }
    this.requestUpdate();
  };

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;

    // we need to manually refresh the component when selection changes
    // so that the buttons at the bottom hide or show when we want them to
    const grid = this.shadowRoot?.querySelector('vaadin-grid');
    if (grid) {
      // select the third item just to show how it looks like
      grid.selectedItems = [this.items[2]];
    }
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <div style="display: flex; justify-content: space-between;">
        <h2 style="margin: 0 0 var(--lumo-space-m) 0; font-size: 1.5em; font-weight: bold;">
          Users
        </h2>
        <vaadin-button style="margin: 0 0 var(--lumo-space-m) 0;">Add user</vaadin-button>
      </div>
      <vaadin-grid .items=${this.items} @selected-items-changed=${() => this.refresh()}>
        <vaadin-grid-selection-column width="60px"></vaadin-grid-selection-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
      <div
        id="#footer"
        style="margin-top: var(--lumo-space-s)"
        ?hidden="${this.selectedItems.length !== 1}"
      >
        <vaadin-button>Edit profile</vaadin-button>
        <vaadin-button>Manage permissions</vaadin-button>
        <vaadin-button>Reset password</vaadin-button>
        <vaadin-horizontal-layout style="float: right">
          <vaadin-button theme="error" style="float: right">Delete</vaadin-button>
        </vaadin-horizontal-layout>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
