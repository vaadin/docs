import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/form-layout';
import '@vaadin/text-field';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('dialog-basic')
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

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        header-title="New employee"
        .opened="${this.dialogOpened}"
        @closed="${() => {
          this.dialogOpened = false;
        }}"
        ${dialogRenderer(this.renderDialog, [])}
        ${dialogFooterRenderer(this.renderFooter, [])}
      ></vaadin-dialog>

      <vaadin-button
        @click="${() => {
          this.dialogOpened = true;
        }}"
      >
        Show dialog
      </vaadin-button>
      <!-- end::snippet[] -->
    `;
  }

  private renderDialog = () => html`
    <vaadin-form-layout auto-responsive column-width="18rem" expand-fields>
      <vaadin-text-field label="First name"></vaadin-text-field>
      <vaadin-text-field label="Last name"></vaadin-text-field>
    </vaadin-form-layout>
  `;

  private renderFooter = () => html`
    <vaadin-button @click="${this.close}">Cancel</vaadin-button>
    <vaadin-button theme="primary" @click="${this.close}">Add</vaadin-button>
  `;

  private close() {
    this.dialogOpened = false;
  }
}
