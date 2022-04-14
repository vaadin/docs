import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import { ifDefined } from 'lit/directives/if-defined';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';

import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('dialog-header')
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
  private user?: Person;

  async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.user = people[0];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        header-title="User details"
        .headerRenderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-button theme="tertiary" @click="${() => (this.dialogOpened = false)}">
                <vaadin-icon icon="lumo:cross"></vaadin-icon>
              </vaadin-button>
            `,
            root
          );
        })}"
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .renderer="${guard(this.user, () => this.dialogRenderer)}"
      ></vaadin-dialog>
      <!-- end::snippet[]  -->
      <vaadin-button @click="${() => (this.dialogOpened = true)}"> Show dialog </vaadin-button>
    `;
  }

  dialogRenderer = (root: HTMLElement) => {
    render(
      html`
        <vaadin-vertical-layout
          theme="spacing"
          style="width: 300px; max-width: 100%; align-items: stretch;"
        >
          <vaadin-vertical-layout style="align-items: stretch;">
            <vaadin-text-field
              label="Name"
              value="${`${this.user?.firstName} ${this.user?.lastName}`}"
              readonly
              style="padding-top: 0;"
            ></vaadin-text-field>
            <vaadin-text-field
              label="Email"
              value="${ifDefined(this.user?.email)}"
              readonly
            ></vaadin-text-field>
            <vaadin-text-field
              label="Address"
              value="${this.addressDescription()}"
              readonly
            ></vaadin-text-field>
          </vaadin-vertical-layout>
        </vaadin-vertical-layout>
      `,
      root
    );
  };

  addressDescription() {
    if (!this.user) {
      return '';
    }
    const { address } = this.user;
    return `${address.street}, ${address.city}, ${address.country}`;
  }
}
