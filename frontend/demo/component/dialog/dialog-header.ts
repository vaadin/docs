import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/email-field';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { dialogHeaderRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('dialog-header')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = false;

  @state()
  private user: Person | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.user = people[0];
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        header-title="User details"
        .opened="${this.dialogOpened}"
        @opened-changed="${(event: DialogOpenedChangedEvent) => {
          this.dialogOpened = event.detail.value;
        }}"
        ${dialogHeaderRenderer(
          () => html`
            <vaadin-button theme="tertiary" @click="${this.close}">
              <vaadin-icon icon="lumo:cross"></vaadin-icon>
            </vaadin-button>
          `,
          []
        )}
        ${dialogRenderer(this.renderDialog, this.user)}
      ></vaadin-dialog>
      <!-- end::snippet[] -->
      <vaadin-button @click="${this.open}">Show dialog</vaadin-button>
    `;
  }

  private renderDialog = () => html`
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
        <vaadin-email-field
          label="Email"
          value="${ifDefined(this.user?.email)}"
          readonly
        ></vaadin-email-field>
        <vaadin-text-field
          label="Address"
          value="${this.addressDescription()}"
          readonly
        ></vaadin-text-field>
      </vaadin-vertical-layout>
    </vaadin-vertical-layout>
  `;

  addressDescription() {
    if (!this.user) {
      return '';
    }
    const { address } = this.user;
    return `${address.street}, ${address.city}, ${address.country}`;
  }

  private open() {
    this.dialogOpened = true;
  }

  private close() {
    this.dialogOpened = false;
  }
}
