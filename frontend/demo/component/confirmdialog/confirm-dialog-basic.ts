import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import '@vaadin/vaadin-confirm-dialog/vaadin-confirm-dialog';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('confirm-dialog-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private dialogOpened = false;

  @internalProperty()
  private status = '';

  render() {
    return html`
      <vaadin-button @click=${() => (this.dialogOpened = true)}>
        Open confirm dialog
      </vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-confirm-dialog
        cancel
        reject
        header="Unsaved changes"
        confirm-text="Save"
        reject-text="Discard"
        .opened=${this.dialogOpened}
        @opened-changed=${this.openedChanged}
        @confirm=${() => (this.status = 'Saved')}
        @reject=${() => {
          this.status = 'Discarded';
        }}
        @cancel=${() => {
          this.status = 'Canceled';
        }}
      >
        Do you want to save or discard your changes before navigating away?
      </vaadin-confirm-dialog>
      <!-- end::snippet[] -->

      <span>${this.status}</span>
    `;
  }

  openedChanged(e: CustomEvent) {
    this.dialogOpened = e.detail.value;
    if (this.dialogOpened) {
      this.status = '';
    }
  }
}
