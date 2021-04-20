import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-success')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="spacing">
        <vaadin-button theme="primary success">Primary</vaadin-button>
        <vaadin-button theme="secondary success">Secondary</vaadin-button>
        <vaadin-button theme="tertiary success">Tertiary</vaadin-button>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
