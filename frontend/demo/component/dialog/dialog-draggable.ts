import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-draggable')
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
        aria-label="Add note"
        draggable
        modeless
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-vertical-layout
                theme="spacing"
                style="width: 300px; max-width: 100%; align-items: stretch;"
              >
                <vaadin-horizontal-layout
                  class="draggable"
                  style="border-bottom: 1px solid var(--lumo-contrast-20pct); cursor: move; padding: var(--lumo-space-m) var(--lumo-space-l); margin: calc(var(--lumo-space-s) * -1) calc(var(--lumo-space-l) * -1) 0"
                >
                  <h2 style="margin: 0; font-size: 1.5em; font-weight: bold;">Add note</h2>
                </vaadin-horizontal-layout>
                <vaadin-vertical-layout style="align-items: stretch;">
                  <vaadin-text-field label="Title"></vaadin-text-field>
                  <vaadin-text-area label="Description"></vaadin-text-area>
                </vaadin-vertical-layout>
                <vaadin-horizontal-layout theme="spacing" style="justify-content: flex-end">
                  <vaadin-button @click="${() => (this.dialogOpened = false)}">
                    Cancel
                  </vaadin-button>
                  <vaadin-button theme="primary" @click="${() => (this.dialogOpened = false)}">
                    Add note
                  </vaadin-button>
                </vaadin-horizontal-layout>
              </vaadin-vertical-layout>
            `,
            root
          );
        })}"
      ></vaadin-dialog>
      <!-- end::snippet[]  -->
      <vaadin-button @click="${() => (this.dialogOpened = true)}"> Show dialog </vaadin-button>
    `;
  }
}
