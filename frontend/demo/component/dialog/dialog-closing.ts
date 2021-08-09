import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-closing')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = false;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        aria-label="System maintenance notice"
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
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
                  @click="${() => (this.dialogOpened = false)}"
                  style="align-self: flex-end;"
                >
                  Close
                </vaadin-button>
              </vaadin-vertical-layout>
            `,
            root
          );
        })}"
      ></vaadin-dialog>
      <!-- end::snippet[] -->

      <vaadin-button @click="${() => (this.dialogOpened = true)}"> Show dialog </vaadin-button>
    `;
  }
}
