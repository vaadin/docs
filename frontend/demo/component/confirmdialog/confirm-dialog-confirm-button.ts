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
        header="Export failed"
        confirm-text="OK"
        .opened=${this.dialogOpened}
        @opened-changed=${this.openedChanged}
        @confirm=${() => (this.status = 'Acknowledged')}
      >
        An error occurred while exporting <b>Report Q4.</b> Please try again. If the problem
        persists, please contact support@company.com.
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
