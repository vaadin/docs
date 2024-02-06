import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/confirm-dialog';
import '@vaadin/horizontal-layout';
import type { ConfirmDialogOpenedChangedEvent } from '@vaadin/confirm-dialog';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('confirm-dialog-confirm-button')
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
  private status = '';

  protected override render() {
    return html`
      <vaadin-horizontal-layout
        style="align-items: center; justify-content: center;"
        theme="spacing"
      >
        <vaadin-button @click="${this.open}">Open confirm dialog</vaadin-button>

        <!-- tag::snippet[] -->
        <vaadin-confirm-dialog
          header="Export failed"
          confirm-text="OK"
          .opened="${this.dialogOpened}"
          @opened-changed="${this.openedChanged}"
          @confirm="${() => {
            this.status = 'Acknowledged';
          }}"
        >
          An error occurred while exporting <b>Report Q4</b>. Please try again. If the problem
          persists, contact <a href="mailto:support@company.com">support@company.com</a>.
        </vaadin-confirm-dialog>
        <!-- end::snippet[] -->

        <span ?hidden="${this.status === ''}">Status: ${this.status}</span>
      </vaadin-horizontal-layout>
    `;
  }

  openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.dialogOpened = e.detail.value;
    if (this.dialogOpened) {
      this.status = '';
    }
  }

  private open() {
    this.dialogOpened = true;
  }
}
