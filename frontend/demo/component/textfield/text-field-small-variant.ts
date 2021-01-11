import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon/iron-icon';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('text-field-small-variant')
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
        <vaadin-text-field label="Default size" value="Value"></vaadin-text-field>
        <!-- tag::snippet[] -->
        <vaadin-text-field theme="small" label="Small size" value="Value"></vaadin-text-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
