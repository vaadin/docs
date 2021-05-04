import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-focus')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button focus-ring>Keyboard focus</vaadin-button>
      <!-- end::snippet[] -->
    `;
  }
}
