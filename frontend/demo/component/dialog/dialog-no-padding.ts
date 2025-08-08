import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-no-padding')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = false;

  @state()
  private people: Person[] | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 50 });
    this.people = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        theme="no-padding"
        header-title="Filter reports by users:"
        .opened="${this.dialogOpened}"
        @closed="${() => {
          this.dialogOpened = false;
        }}"
        ${dialogRenderer(
          () => html`
            <vaadin-grid .items="${this.people}" style="width: 500px; max-width: 100%;">
              <vaadin-grid-selection-column></vaadin-grid-selection-column>
              <vaadin-grid-column
                header="Name"
                ${columnBodyRenderer<Person>(
                  (item) => html`${item.firstName} ${item.lastName}`,
                  []
                )}
              ></vaadin-grid-column>
            </vaadin-grid>
          `,
          this.people
        )}
        ${dialogFooterRenderer(
          () => html`
            <vaadin-button theme="primary" @click="${this.close}">Filter</vaadin-button>
          `,
          []
        )}
      ></vaadin-dialog>
      <!-- end::snippet[] -->
      <vaadin-button @click="${this.open}">Show dialog</vaadin-button>
    `;
  }

  private open() {
    this.dialogOpened = true;
  }

  private close() {
    this.dialogOpened = false;
  }
}
