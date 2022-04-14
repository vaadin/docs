import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/button';
import '@vaadin/dialog';

import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('dialog-footer')
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
        header-title="${`Delete user "${this.user?.firstName} ${this.user?.lastName}"?`}"
        .footerRenderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-button
                theme="primary error"
                @click="${() => (this.dialogOpened = false)}"
                style="margin-right: auto;"
              >
                Delete
              </vaadin-button>
              <vaadin-button theme="tertiary" @click="${() => (this.dialogOpened = false)}"
                >Cancel</vaadin-button
              >
            `,
            root
          );
        })}"
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(html`Are you sure you want to delete this user permanently?`, root);
        })}"
      ></vaadin-dialog>
      <!-- end::snippet[]  -->
      <vaadin-button @click="${() => (this.dialogOpened = true)}"> Show dialog </vaadin-button>
    `;
  }

  addressDescription() {
    if (!this.user) {
      return '';
    }
    const { address } = this.user;
    return `${address.street}, ${address.city}, ${address.country}`;
  }
}
