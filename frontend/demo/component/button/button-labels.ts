import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/email-field';
import type { EmailFieldValueChangedEvent } from '@vaadin/email-field';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-labels')
export class Example extends LitElement {
  static override styles = css`
    vaadin-horizontal-layout {
      align-items: baseline;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private primaryEmail = 'foo@example.com';

  @state()
  private secondaryEmail = 'bar@example.com';

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-horizontal-layout theme="spacing">
          <vaadin-email-field
            id="primary-email"
            label="Primary email address"
            .value="${this.primaryEmail}"
            @value-changed="${(event: EmailFieldValueChangedEvent) => {
              this.primaryEmail = event.detail.value;
            }}"
          ></vaadin-email-field>
          <vaadin-button
            arial-label="Remove primary email address"
            @click="${() => {
              this.primaryEmail = '';
            }}"
          >
            Remove
          </vaadin-button>
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-email-field
            id="secondary-email"
            label="Secondary email address"
            .value="${this.secondaryEmail}"
            @value-changed="${(event: EmailFieldValueChangedEvent) => {
              this.secondaryEmail = event.detail.value;
            }}"
          ></vaadin-email-field>
          <vaadin-button
            arial-label="Remove secondary email address"
            @click="${() => {
              this.secondaryEmail = '';
            }}"
          >
            Remove
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
