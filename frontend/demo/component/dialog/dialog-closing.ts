import '../../init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import { render } from 'lit-html';
import { guard } from 'lit-html/directives/guard';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

import { applyTheme } from 'themes/theme-generated.js';

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
              <vaadin-vertical-layout
                theme="spacing"
                style="width: 300px; max-width: 100%; align-items: stretch;"
              >
                <h2 style="margin: var(--lumo-space-m) 0; font-size: 1.5em; font-weight: bold;">
                  System maintenance
                </h2>
                <p>
                  System maintenance will begin at 3 PM. It is schedule to conclude at 5PM. We
                  apologise for any inconvenience.
                </p>
                <vaadin-button
                  @click=${() => (this.dialogOpened = false)}
                  style="align-self: flex-end;"
                >
                  Close
                </vaadin-button>
              </vaadin-vertical-layout>
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
