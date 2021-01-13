import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('progress-bar-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-progress-bar value="0.5"></vaadin-progress-bar>
      <!-- end::snippet[] -->
    `;
  }
}
