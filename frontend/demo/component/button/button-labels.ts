import 'Frontend/demo/init'; // hidden-full-source-line

import { css, html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { TextFieldElement } from '@vaadin/vaadin-text-field/vaadin-text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-labels')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

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
            value="foo@example.com"
          ></vaadin-text-field>
          <vaadin-button arial-label="Remove primary email address" @click=${this.clearPrimaryEmail}
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout>
          <vaadin-text-field
            id="secondary-email-1"
            label="Secondary email address 1"
            value="bar@example.com"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove secondary email address 1"
            @click=${this.clearSecondaryEmail1}
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout>
          <vaadin-text-field
            id="secondary-email-2"
            label="Secondary email address 2"
            value="baz@example.com"
          ></vaadin-text-field>
          <vaadin-button
            arial-label="Remove secondary email address 2"
            @click=${this.clearSecondaryEmail2}
            >Remove</vaadin-button
          >
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }

  clearPrimaryEmail(): void {
    const primaryEmailField = this.shadowRoot.querySelector('#primary-email') as TextFieldElement;
    primaryEmailField.value = '';
  }

  clearSecondaryEmail1(): void {
    const primaryEmailField = this.shadowRoot.querySelector(
      '#secondary-email-1'
    ) as TextFieldElement;
    primaryEmailField.value = '';
  }

  clearSecondaryEmail2(): void {
    const primaryEmailField = this.shadowRoot.querySelector(
      '#secondary-email-2'
    ) as TextFieldElement;
    primaryEmailField.value = '';
  }
}
