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
      <vaadin-horizontal-layout
        style="align-items: center; justify-content: center;"
        theme="spacing"
      >
        <vaadin-button @click="${() => (this.dialogOpened = true)}">
          Open confirm dialog
        </vaadin-button>

        <!-- tag::snippet[] -->
        <vaadin-confirm-dialog
          header="Unsaved changes"
          cancel
          @cancel="${() => (this.status = 'Canceled')}"
          reject
          reject-text="Discard"
          @reject="${() => (this.status = 'Discarded')}"
          confirm-text="Save"
          @confirm="${() => (this.status = 'Saved')}"
          .opened="${this.dialogOpened}"
          @opened-changed="${this.openedChanged}"
        >
          There are unsaved changes. Do you want to discard or save them?
        </vaadin-confirm-dialog>
        <!-- end::snippet[] -->

        <span ?hidden="${this.status == ''}">Status: ${this.status}</span>
      </vaadin-horizontal-layout>
    `;
  }

  openedChanged(e: CustomEvent) {
    this.dialogOpened = e.detail.value;
    if (this.dialogOpened) {
      this.status = '';
    }
  }
}
