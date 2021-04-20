import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-sizes')
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
        <vaadin-button theme="large">Large</vaadin-button>
        <vaadin-button theme="normal">Normal</vaadin-button>
        <vaadin-button theme="small">Small</vaadin-button>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
