import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/form-layout';
import '@vaadin/text-area';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dialogFooterRenderer, dialogHeaderRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('dialog-draggable')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
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
        @closed="${() => {
          this.dialogOpened = false;
        }}"
        ${dialogHeaderRenderer(
          () => html`
            <h2
              class="draggable"
              style="flex: 1; cursor: move; margin: 0; font-size: 1.5em; font-weight: bold; padding: var(--vaadin-gap-m) 0;"
            >
              Add note
            </h2>
          `,
          []
        )}
        ${dialogRenderer(
          () => html`
            <vaadin-form-layout auto-responsive column-width="18rem" expand-fields>
              <vaadin-text-field label="Title"></vaadin-text-field>
              <vaadin-text-area label="Description"></vaadin-text-area>
            </vaadin-form-layout>
          `,
          []
        )}
        ${dialogFooterRenderer(
          () => html`
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
