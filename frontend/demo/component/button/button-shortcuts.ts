import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-shortcuts')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private globalClickCounter = 0;

  @internalProperty()
  private firstName = '';

  @internalProperty()
  private lastName = '';

  // shortcut listener for the global enter button
  private globalEnterListener = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter') {
      this.increaseGlobalCounter();
    }
  };

  firstUpdated() {
    // add global shortcut listener to first button
    document.addEventListener('keydown', this.globalEnterListener);
  }

  disconnectedCallback(): void {
    // clear global event listener to avoid memory leak
    document.removeEventListener('keydown', this.globalEnterListener);
  }

  increaseGlobalCounter(): void {
    this.globalClickCounter++;
  }

  clearFields(): void {
    this.firstName = '';
    this.lastName = '';
  }

  clearFieldsShortcutListener(ev: KeyboardEvent): void {
    if (ev.altKey && ev.code === 'KeyL') {
      ev.preventDefault();
      this.clearFields();
    }
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout>
        <vaadin-button @click="${this.increaseGlobalCounter}">Global Enter shortcut</vaadin-button>

        <vaadin-text-field
          label="First name"
          .value="${this.firstName}"
          @value-changed="${(ev: CustomEvent) => (this.firstName = ev.detail.value)}"
          @keydown="${this.clearFieldsShortcutListener}"
        >
        </vaadin-text-field>

        <vaadin-text-field
          label="Last name"
          .value="${this.lastName}"
          @value-changed="${(ev: CustomEvent) => (this.lastName = ev.detail.value)}"
          @keydown="${this.clearFieldsShortcutListener}"
        >
        </vaadin-text-field>

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
