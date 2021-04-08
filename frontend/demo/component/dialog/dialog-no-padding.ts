import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import { render } from 'lit-html';
import { guard } from 'lit-html/directives/guard';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('dialog-no-padding')
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
      <!-- tag::snippet[] -->
      <vaadin-dialog
        theme="no-padding"
        aria-label="simple"
        .opened=${this.dialogOpened}
        @opened-changed=${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-vertical-layout
                theme="spacing"
                style="width: 300px; max-width: 100%; max-height: 450px; align-items: stretch;"
              >
                <vaadin-horizontal-layout
                  class="draggable"
                  style="border-bottom: 1px solid var(--lumo-contrast-20pct);"
                >
                  <h2
                    style="margin: 0; font-size: 1.5em; font-weight: bold; width: 100%; text-align: center;"
                  >
                    New employee
                  </h2>
                </vaadin-horizontal-layout>
                <vaadin-scroller
                  scroll-direction="vertical"
                  style="border-bottom: 1px solid var(--lumo-contrast-20pct); overflow: auto; max-height: 300px; padding: 0 var(--lumo-space-s); margin-top: 0"
                >
                  <section aria-labelledby="personal-title">
                    <h3 id="personal-title">Personal information</h3>
                    <vaadin-text-field style="width: 100%;" label="First name"></vaadin-text-field>
                    <vaadin-text-field style="width: 100%;" label="Last name"></vaadin-text-field>
                    <vaadin-date-picker
                      initial-position="1990-01-01"
                      label="Birthdate"
                      style="width: 100%;"
                    ></vaadin-date-picker>
                  </section>
                  <section aria-labelledby="employment-title">
                    <h3 id="employment-title">Employment information</h3>
                    <vaadin-text-field style="width: 100%;" label="Position"></vaadin-text-field>
                    <vaadin-text-area
                      style="width: 100%;"
                      label="Additional information"
                    ></vaadin-text-area>
                  </section>
                </vaadin-scroller>
                <vaadin-horizontal-layout
                  theme="spacing padding"
                  style="justify-content: flex-end; margin-top: 0"
                >
                  <vaadin-button @click=${() => (this.dialogOpened = false)}>
                    Cancel
                  </vaadin-button>
                  <vaadin-button theme="primary" @click=${() => (this.dialogOpened = false)}>
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
      <vaadin-button @click=${() => (this.dialogOpened = true)}> Show dialog </vaadin-button>
    `;
  }
}
