import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/confirm-dialog';
import '@vaadin/horizontal-layout';
import type { ConfirmDialogOpenedChangedEvent } from '@vaadin/confirm-dialog';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('confirm-dialog-cancel-button')
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
          header='Delete "Report Q4"?'
          cancel-button-visible
          confirm-text="Delete"
          confirm-theme="error primary"
          .opened="${this.dialogOpened}"
          @opened-changed="${this.openedChanged}"
          @cancel="${() => {
            this.status = 'Canceled';
          }}"
          @confirm="${() => {
            this.status = 'Deleted';
          }}"
        >
          Are you sure you want to permanently delete this item?
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
