import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { ButtonElement } from '@vaadin/vaadin-button/vaadin-button';

@customElement('button-shortcuts')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private globalClickCounter = 0;

  // shortcut listener for the global enter button
  private globalEnterListener = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter') {
      this.shadowRoot?.querySelector('vaadin-button')?.click();
    }
  };

  // shortcut listener for the clear field button
  private clearFieldListener = (ev: KeyboardEvent) => {
    if (ev.altKey && ev.code === 'KeyL') {
      ev.preventDefault();
      const clearFieldsBtn = this.shadowRoot?.querySelector('#clear-fields-btn') as ButtonElement;
      clearFieldsBtn?.click();
    }
  };

  firstUpdated() {
    // add shortcut listeners to all buttons
    document.addEventListener('keydown', this.globalEnterListener);
    this.shadowRoot?.querySelectorAll('vaadin-text-field').forEach((textField) => {
      textField.addEventListener('keydown', this.clearFieldListener);
    });
  }

  disconnectedCallback(): void {
    // clear event listeners to avoid memory leaks
    document.removeEventListener('keydown', this.globalEnterListener);
    this.shadowRoot?.querySelectorAll('vaadin-text-field').forEach((textField) => {
      textField.removeEventListener('keydown', this.clearFieldListener);
    });
  }

  clearFields(): void {
    const fields = this.shadowRoot?.querySelectorAll('vaadin-text-field');
    fields?.forEach((field) => field.clear());
  }

  increaseGlobalCounter(): void {
    this.globalClickCounter++;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-button @click="${this.increaseGlobalCounter}">Global Enter shortcut</vaadin-button>
        <vaadin-text-field label="First name"></vaadin-text-field>
        <vaadin-text-field label="Last name"></vaadin-text-field>
        <vaadin-button id="clear-fields-btn" @click="${this.clearFields}"
          >Clear fields</vaadin-button
        >
        <p>
          Button "Clear fields"'s shortcut <kbd>ALT</kbd>+<kbd>L</kbd> works only within the text
          fields.
        </p>
        <p>Button "Global Enter shortcut" was clicked ${this.globalClickCounter} times.</p>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
