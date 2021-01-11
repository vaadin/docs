import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-text-field';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('input-field-focus-styles')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-text-field label="Pointer focus" focused></vaadin-text-field>
        <vaadin-text-field label="Keyboard focus" focused focus-ring></vaadin-text-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
