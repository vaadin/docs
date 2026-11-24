import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import '@vaadin/message-input';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { CheckboxCheckedChangedEvent } from '@vaadin/checkbox';
import type { MessageInputSubmitEvent } from '@vaadin/message-input';
import { Notification } from '@vaadin/notification';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('message-input-submit-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private submitDisabled = true;

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing" style="align-items: stretch">
        <!-- tag::snippet[] -->
        <vaadin-message-input
          ?submit-disabled="${this.submitDisabled}"
          @submit="${this._handleSubmit}"
        ></vaadin-message-input>

        <vaadin-checkbox
          label="Submit disabled"
          .checked="${this.submitDisabled}"
          @checked-changed="${(event: CheckboxCheckedChangedEvent) => {
            this.submitDisabled = event.detail.value;
          }}"
        ></vaadin-checkbox>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }

  _handleSubmit(event: MessageInputSubmitEvent) {
    Notification.show(`Message received: ${event.detail.value}`, {
      position: 'middle',
      duration: 3000,
    });
  }
}
