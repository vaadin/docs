import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { applyTheme } from 'themes/theme-generated.js';

// tag::snippet[]
@customElement('checkbox-trigger')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-checkbox>Enabled</vaadin-checkbox>
    `;
  }
}
// end::snippet[]
