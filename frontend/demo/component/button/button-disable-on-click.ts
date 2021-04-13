import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-disable-on-click')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button @click=${this.performAction}>Perform Action</vaadin-button>
      <!-- end::snippet[] -->
    `;
  }

  performAction() {
    const button = this.shadowRoot?.querySelector('vaadin-button');
    if (button) {
      button.disabled = true;
    }
  }
}
