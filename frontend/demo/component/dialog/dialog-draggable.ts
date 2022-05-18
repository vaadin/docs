import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/text-area';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';

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
        .headerRenderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <h2
                class="draggable"
                style="flex: 1; cursor: move; margin: 0; font-size: 1.5em; font-weight: bold; padding: var(--lumo-space-m) 0;"
              >
                Add note
              </h2>
            `,
            root
          );
        })}"
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
                <vaadin-vertical-layout style="align-items: stretch;">
                  <vaadin-text-field label="Title"></vaadin-text-field>
                  <vaadin-text-area label="Description"></vaadin-text-area>
                </vaadin-vertical-layout>
              </vaadin-vertical-layout>
            `,
            root
          );
        })}"
        .footerRenderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`<vaadin-button @click="${() => (this.dialogOpened = false)}">
                Cancel
              </vaadin-button>
              <vaadin-button theme="primary" @click="${() => (this.dialogOpened = false)}">
                Add note
              </vaadin-button>`,
            root
          );
        })}"
      ></vaadin-dialog>
      <!-- end::snippet[]  -->
      <vaadin-button @click="${() => (this.dialogOpened = true)}"> Show dialog </vaadin-button>
    `;
  }
}
