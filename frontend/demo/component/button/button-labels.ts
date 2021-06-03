import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
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
  private secondaryEmail1 = 'bar@example.com';

  @state()
  private secondaryEmail2 = 'baz@example.com';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-horizontal-layout theme="spacing">
          <vaadin-text-field
            id="primary-email"
            label="Primary email address"
            .value="${this.primaryEmail}"
            @value-changed="${(e: CustomEvent) => (this.primaryEmail = e.detail.value)}"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove primary email address"
            @click="${() => (this.primaryEmail = '')}"
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-text-field
            id="secondary-email-1"
            label="Secondary email address 1"
            .value="${this.secondaryEmail1}"
            @value-changed="${(e: CustomEvent) => (this.secondaryEmail1 = e.detail.value)}"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove secondary email address 1"
            @click="${() => (this.secondaryEmail1 = '')}"
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-text-field
            id="secondary-email-2"
            label="Secondary email address 2"
            .value="${this.secondaryEmail2}"
            @value-changed="${(e: CustomEvent) => (this.secondaryEmail2 = e.detail.value)}"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove secondary email address 2"
            @click="${() => (this.secondaryEmail2 = '')}"
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
