import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-no-padding')
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
        theme="no-padding"
        aria-label="Create new employee"
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-vertical-layout
                style="align-items: stretch; height: 100%; max-height: 420px; width: 320px;"
              >
                <header
                  class="draggable"
                  style="border-bottom: 1px solid var(--lumo-contrast-10pct); padding: var(--lumo-space-m) var(--lumo-space-l);"
                >
                  <h2
                    style="font-size: var(--lumo-font-size-xl); font-weight: 600; line-height: var(--lumo-line-height-xs); margin: 0;"
                  >
                    Create new employee
                  </h2>
                </header>
                <vaadin-scroller scroll-direction="vertical" style="padding: var(--lumo-space-l);">
                  <vaadin-vertical-layout
                    aria-labelledby="personal-title"
                    role="region"
                    style="align-items: stretch; margin-bottom: var(--lumo-space-xl);"
                  >
                    <h3
                      id="personal-title"
                      style="font-size: var(--lumo-font-size-l); font-weight: 600; line-height: var(--lumo-line-height-xs); margin: 0 0 var(--lumo-space-s) 0;"
                    >
                      Personal information
                    </h3>
                    <vaadin-text-field label="First name"></vaadin-text-field>
                    <vaadin-text-field label="Last name"></vaadin-text-field>
                    <vaadin-date-picker
                      initial-position="1990-01-01"
                      label="Birthdate"
                    ></vaadin-date-picker>
                  </vaadin-vertical-layout>
                  <vaadin-vertical-layout
                    aria-labelledby="employment-title"
                    role="region"
                    style="align-items: stretch;"
                  >
                    <h3
                      id="employment-title"
                      style="font-size: var(--lumo-font-size-l); font-weight: 600; line-height: var(--lumo-line-height-xs); margin: 0 0 var(--lumo-space-s) 0;"
                    >
                      Employment information
                    </h3>
                    <vaadin-text-field label="Position"></vaadin-text-field>
                    <vaadin-text-area label="Additional information"></vaadin-text-area>
                  </vaadin-vertical-layout>
                </vaadin-scroller>
                <footer
                  style="background-color: var(--lumo-contrast-5pct); padding: var(--lumo-space-s) var(--lumo-space-m); text-align: right;"
                >
                  <vaadin-button
                    theme="tertiary"
                    style="margin-inline-end: var(--lumo-space-m);"
                    @click="${() => (this.dialogOpened = false)}"
                  >
                    Cancel
                  </vaadin-button>
                  <vaadin-button theme="primary" @click="${() => (this.dialogOpened = false)}">
                    Save
                  </vaadin-button>
                </footer>
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
