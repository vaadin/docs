import 'Frontend/demo/init'; // hidden-full-source-line

import { css, html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-labels')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private primaryEmail = 'foo@example.com';

  @internalProperty()
  private secondaryEmail1 = 'bar@example.com';

  @internalProperty()
  private secondaryEmail2 = 'baz@example.com';

  static get styles() {
    return css`
      vaadin-horizontal-layout {
        align-items: baseline;
      }
      vaadin-button {
        margin-left: 0.5rem;
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-horizontal-layout>
          <vaadin-text-field
            id="primary-email"
            label="Primary email address"
            .value="${this.primaryEmail}"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove primary email address"
            @click="${this.clearPrimaryEmail}"
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout>
          <vaadin-text-field
            id="secondary-email-1"
            label="Secondary email address 1"
            .value="${this.secondaryEmail1}"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove secondary email address 1"
            @click="${this.clearSecondaryEmail1}"
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout>
          <vaadin-text-field
            id="secondary-email-2"
            label="Secondary email address 2"
            .value="${this.secondaryEmail2}"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove secondary email address 2"
            @click="${() => this.clearSecondaryEmail2()}"
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }

  clearPrimaryEmail(): void {
    this.primaryEmail = '';
  }

  clearSecondaryEmail1(): void {
    this.secondaryEmail1 = '';
  }

  clearSecondaryEmail2(): void {
    console.log('clearing secondary email 2...');
    this.secondaryEmail2 = '';
  }
}
