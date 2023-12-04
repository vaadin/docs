import 'Frontend/demo/init'; // hidden-source-line

import { Binder, field, ObjectModel } from '@hilla/form';
import NewsletterSubscriptionModel from 'Frontend/generated/com/vaadin/demo/fusion/forms/dialogs/NewsletterSubscriptionModel';
import { NewsletterEndpoint } from 'Frontend/generated/endpoints';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/checkbox';
import '@vaadin/dialog';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import type { Dialog, DialogOpenedChangedEvent } from '@vaadin/dialog';
import { Notification } from '@vaadin/notification';

// @ts-ignore // hidden-source-line
NewsletterSubscriptionModel.createEmptyValue = ObjectModel.createEmptyValue; // hidden-source-line

@customElement('newsletter-dialog')
export class NewsletterDialog extends LitElement {
  // tag::snippet[]
  private binder = new Binder(this, NewsletterSubscriptionModel, {
    onChange: () => {
      // Does the update outside the dialog, remove it if not needed
      this.requestUpdate();
      // Does the update inside the dialog
      this.dialog?.requestContentUpdate();
    },
  });
  // end::snippet[]

  @state()
  private accessor dialogOpened = false;

  @query('vaadin-dialog')
  private accessor dialog: Dialog | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
  }

  render() {
    return html`
      <vaadin-dialog
        header-title="Newsletter subscription"
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: DialogOpenedChangedEvent) => (this.dialogOpened = e.detail.value)}"
        ${dialogRenderer(this.renderDialog, [])}
        ${dialogFooterRenderer(this.renderFooter, [])}
      ></vaadin-dialog>

      <vaadin-button @click="${() => (this.dialogOpened = true)}">
        Subscribe to our newsletter
      </vaadin-button>
    `;
  }

  private renderDialog = () => html`
    <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%;">
      <vaadin-text-field
        label="Your Email Address"
        ${field(this.binder.model.email)}
      ></vaadin-text-field>
      <vaadin-checkbox
        label="Accept Privacy Policy"
        ${field(this.binder.model.privacyAccepted)}
      ></vaadin-checkbox>
    </vaadin-vertical-layout>
  `;

  private renderFooter = () => html`
    <vaadin-button @click="${this.close}">Cancel</vaadin-button>
    <vaadin-button theme="primary" @click="${this.subscribe}">Subscribe</vaadin-button>
  `;

  private close() {
    this.dialogOpened = false;
  }

  private async subscribe() {
    Notification.show(await this.binder.submitTo(NewsletterEndpoint.subscribe), {
      theme: 'success',
    });
    this.close();
  }
}
