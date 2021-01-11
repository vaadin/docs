import '../../init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import '@vaadin/vaadin-confirm-dialog/vaadin-confirm-dialog';
import { applyTheme } from 'themes/theme-generated.js';

// tag::snippet[]
@customElement('confirm-dialog-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private dialogOpened = false;

  @internalProperty()
  private status = '';

  render() {
    return html`
      <vaadin-button @click=${() => (this.dialogOpened = true)}> Open dialog </vaadin-button>

      <vaadin-confirm-dialog
        header="Meeting starting"
        confirm-text="OK"
        .opened=${this.dialogOpened}
        @opened-changed=${this.openedChanged}
        @confirm=${() => (this.status = 'Confirmed')}
      >
        Your next meeting starts in 5 minutes
      </vaadin-confirm-dialog>

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
// end::snippet[]
