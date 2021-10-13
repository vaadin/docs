import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/email-field';
import '@vaadin/horizontal-layout';
import '@vaadin/text-field';
import { TextFieldValueChangedEvent } from '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-labels')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      vaadin-horizontal-layout {
        align-items: baseline;
      }
    `;
  }

  @state()
  private primaryEmail = 'foo@example.com';

  @state()
  private secondaryEmail = 'bar@example.com';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-horizontal-layout theme="spacing">
          <vaadin-text-field
            id="primary-email"
            label="Primary email address"
            .value="${this.primaryEmail}"
            @value-changed="${(e: TextFieldValueChangedEvent) =>
              (this.primaryEmail = e.detail.value)}"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove primary email address"
            @click="${() => (this.primaryEmail = '')}"
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-text-field
            id="secondary-email"
            label="Secondary email address"
            .value="${this.secondaryEmail}"
            @value-changed="${(e: TextFieldValueChangedEvent) =>
              (this.secondaryEmail = e.detail.value)}"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove secondary email address"
            @click="${() => (this.secondaryEmail = '')}"
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
