import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/grid';
import '@vaadin/vertical-layout';
import { dialogRenderer } from '@vaadin/dialog/lit.js';

import { applyTheme } from 'Frontend/generated/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';

@customElement('dialog-resizable')
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
        header-title="Employee list"
        resizable
        draggable
        .opened="${this.dialogOpened}"
        @opened-changed="${(event: DialogOpenedChangedEvent) => {
          this.dialogOpened = event.detail.value;
        }}"
        ${dialogRenderer(
          () => html`
            <vaadin-vertical-layout
              theme="spacing"
              style="max-width: 100%; min-width: 300px; height: 100%; align-items: stretch;"
            >
              <vaadin-grid .items="${this.people}">
                <vaadin-grid-column path="firstName" title="First name"></vaadin-grid-column>
                <vaadin-grid-column path="lastName" title="Last name"></vaadin-grid-column>
                <vaadin-grid-column path="email" title="Email"></vaadin-grid-column>
                <vaadin-grid-column path="profession" title="Profession"></vaadin-grid-column>
                <vaadin-grid-column path="membership" title="Membership"></vaadin-grid-column>
              </vaadin-grid>
            </vaadin-vertical-layout>
          `,
          this.people
        )}
      ></vaadin-dialog>
      <!-- end::snippet[] -->
      <vaadin-button @click="${this.open}">Show dialog</vaadin-button>
    `;
  }

  private open() {
    this.dialogOpened = true;
  }
}
