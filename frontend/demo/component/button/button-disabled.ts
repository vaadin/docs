import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-disabled')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-button theme="primary" disabled>Primary</vaadin-button>
        <vaadin-button theme="secondary" disabled>Secondary</vaadin-button>
        <vaadin-button theme="tertiary" disabled>Tertiary</vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
