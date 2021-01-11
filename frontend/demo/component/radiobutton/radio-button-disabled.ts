import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('radio-button-disabled')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Status" disabled>
        <vaadin-radio-button value="inProgress" checked>In progress</vaadin-radio-button>
        <vaadin-radio-button value="done">Done</vaadin-radio-button>
        <vaadin-radio-button value="cancelled">Cancelled</vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
