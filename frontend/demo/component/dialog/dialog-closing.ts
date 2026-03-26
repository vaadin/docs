import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/dialog';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('dialog-closing')
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
        header-title="System maintenance"
        .opened="${this.dialogOpened}"
        @closed="${() => {
          this.dialogOpened = false;
        }}"
        ${dialogRenderer(
          () => html`
            <p style="max-width: 300px">
              System maintenance will begin at 3 PM. It is schedule to conclude at 5PM. We apologise
              for any inconvenience.
            </p>
          `,
          []
        )}
        ${dialogFooterRenderer(
          () => html`<vaadin-button @click="${this.close}">Close</vaadin-button>`,
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
