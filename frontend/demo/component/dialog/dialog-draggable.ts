import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/text-area';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { dialogFooterRenderer, dialogHeaderRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-draggable')
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
        aria-label="Add note"
        draggable
        modeless
        .opened="${this.dialogOpened}"
        @opened-changed="${(event: DialogOpenedChangedEvent) => {
          this.dialogOpened = event.detail.value;
        }}"
        ${dialogHeaderRenderer(
          () => html`
            <h2
              class="draggable"
              style="flex: 1; cursor: move; margin: 0; font-size: 1.5em; font-weight: bold; padding: var(--lumo-space-m) 0;"
            >
              Add note
            </h2>
          `,
          []
        )}
        ${dialogRenderer(
          () => html`
            <vaadin-vertical-layout
              theme="spacing"
              style="width: 300px; max-width: 100%; align-items: stretch;"
            >
              <vaadin-vertical-layout style="align-items: stretch;">
                <vaadin-text-field label="Title"></vaadin-text-field>
                <vaadin-text-area label="Description"></vaadin-text-area>
              </vaadin-vertical-layout>
            </vaadin-vertical-layout>
          `,
          []
        )}
        ${dialogFooterRenderer(
          () =>
            html`
              <vaadin-button @click="${this.close}">Cancel</vaadin-button>
              <vaadin-button theme="primary" @click="${this.close}">Add note</vaadin-button>
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
