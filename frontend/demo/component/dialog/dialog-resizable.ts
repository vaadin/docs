import '../../init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import { render } from 'lit-html';
import { guard } from 'lit-html/directives/guard';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

import { applyTheme } from 'themes/theme-generated.js';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { getPeople } from '../../domain/DataService';

@customElement('dialog-resizable')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private dialogOpened = false;

  @internalProperty()
  private people: Person[] | undefined;

  async firstUpdated() {
    this.people = await getPeople(50);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        aria-label="simple"
        resizable
        .opened=${this.dialogOpened}
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-vertical-layout
                theme="spacing"
                style="max-width: 100%; min-width: 300px; height: 100%; align-items: stretch;"
              >
                <h2 style="margin: var(--lumo-space-m) 0 0 0; font-size: 1.5em; font-weight: bold;">
                  Employees
                </h2>
                <vaadin-grid .items=${this.people} style=" min-height: 300px; flex: 1;">
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
        @opened-changed=${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}
      ></vaadin-dialog>
      <!-- end::snippet[]  -->
      <vaadin-button @click=${() => (this.dialogOpened = true)}> Show dialog </vaadin-button>
    `;
  }
}
