import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

import { applyTheme } from 'Frontend/generated/theme';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

@customElement('dialog-resizable')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = false;

  @state()
  private people?: Person[];

  async firstUpdated() {
    const { people } = await getPeople({ count: 50 });
    this.people = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        aria-label="Employee list"
        resizable
        draggable
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-vertical-layout
                theme="spacing"
                style="max-width: 100%; min-width: 300px; height: 100%; align-items: stretch;"
              >
                <h2 style="margin: var(--lumo-space-m) 0 0 0; font-size: 1.5em; font-weight: bold;">
                  Employee list
                </h2>
                <vaadin-grid .items="${this.people}">
                  <vaadin-grid-column path="firstName" title="First name"></vaadin-grid-column>
                  <vaadin-grid-column path="lastName" title="Last name"></vaadin-grid-column>
                  <vaadin-grid-column path="email" title="Email"></vaadin-grid-column>
                  <vaadin-grid-column path="profession" title="Profession"></vaadin-grid-column>
                  <vaadin-grid-column path="membership" title="Membership"></vaadin-grid-column>
                </vaadin-grid>
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
