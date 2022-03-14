import 'Frontend/demo/init'; // hidden-source-line

import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/confirm-dialog';
import '@vaadin/horizontal-layout';
import '@vaadin/button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('confirm-dialog-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = true;

  @state()
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

  static styles = css`
    /* Center the button within the example */
    :host {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex !important;
      align-items: center;
      justify-content: center;
    }
  `;
}
