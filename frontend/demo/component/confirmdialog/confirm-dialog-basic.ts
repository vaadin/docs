import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/confirm-dialog';
import '@vaadin/horizontal-layout';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('confirm-dialog-basic')
export class Example extends LitElement {
  static override styles = css`
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

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = true;

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
          header="Unsaved changes"
          cancel-button-visible
          reject-button-visible
          reject-text="Discard"
          confirm-text="Save"
          .opened="${this.dialogOpened}"
          @closed="${this.onClosed}"
          @confirm="${() => {
            this.status = 'Saved';
          }}"
          @cancel="${() => {
            this.status = 'Canceled';
          }}"
          @reject="${() => {
            this.status = 'Discarded';
          }}"
        >
          There are unsaved changes. Do you want to discard or save them?
        </vaadin-confirm-dialog>
        <!-- end::snippet[] -->

        <span ?hidden="${this.status === ''}">Status: ${this.status}</span>
      </vaadin-horizontal-layout>
    `;
  }

  onClosed() {
    this.dialogOpened = false;
  }

  private open() {
    this.dialogOpened = true;
    this.status = '';
  }
}
