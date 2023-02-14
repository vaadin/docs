import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/vertical-layout';
import { dialogRenderer } from '@vaadin/dialog/lit.js';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-closing')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = false;

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        aria-label="System maintenance notice"
        .opened="${this.dialogOpened}"
        @opened-changed="${(event: DialogOpenedChangedEvent) => {
          this.dialogOpened = event.detail.value;
        }}"
        ${dialogRenderer(
          () => html`
            <vaadin-vertical-layout
              theme="spacing"
              style="width: 300px; max-width: 100%; align-items: stretch;"
            >
              <h2 style="margin: var(--lumo-space-m) 0; font-size: 1.5em; font-weight: bold;">
                System maintenance
              </h2>
              <p>
                System maintenance will begin at 3 PM. It is schedule to conclude at 5PM. We
                apologise for any inconvenience.
              </p>
              <vaadin-button @click="${this.close}" style="align-self: flex-end;">
                Close
              </vaadin-button>
            </vaadin-vertical-layout>
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
