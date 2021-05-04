import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox>I accept the terms and conditions</vaadin-checkbox>
      <!-- end::snippet[] -->
    `;
  }
}
