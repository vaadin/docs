import '../../init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import { render } from 'lit-html';
import { guard } from 'lit-html/directives/guard';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'generated/theme';

// tag::snippet[]
@customElement('dialog-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private dialogOpened = false;

  render() {
    return html`
      <vaadin-dialog
        aria-label="simple"
        .opened=${this.dialogOpened}
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <div>
                This simple dialog will close by pressing the Esc key, or by a mouse click anywhere
                outside the dialog area
              </div>
            `,
            root
          );
        })}"
        @opened-changed=${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}
      ></vaadin-dialog>

      <vaadin-button @click=${() => (this.dialogOpened = true)}> Show dialog </vaadin-button>
    `;
  }
}
// end::snippet[]
