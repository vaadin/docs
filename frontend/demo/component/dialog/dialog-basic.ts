import '../../init'; // hidden-full-source-line

import { html, LitElement, property, customElement } from 'lit-element';
import { render } from 'lit-html';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-button/vaadin-button';

// tag::snippet[]
@customElement('dialog-basic')
export class Example extends LitElement {
  @property() dialogOpened = false;

  render() {
    return html`
      <vaadin-dialog
        aria-label="simple"
        .opened=${this.dialogOpened}
        .renderer="${this.dialogRenderer}"
        @opened-changed=${(e: CustomEvent) =>
          (this.dialogOpened = e.detail.value)}
      ></vaadin-dialog>

      <vaadin-button @click=${() => (this.dialogOpened = true)}>
        Show dialog
      </vaadin-button>
    `;
  }

  dialogRenderer(root: HTMLElement) {
    render(
      html`
        <div>
          This simple dialog will close by pressing the Esc key, or by a mouse
          click anywhere outside the dialog area
        </div>
      `,
      root
    );
  }
}
// end::snippet[]
