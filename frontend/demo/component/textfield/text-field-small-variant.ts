import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon/iron-icon';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-field-small-variant')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
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
