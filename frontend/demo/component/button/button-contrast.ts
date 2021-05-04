import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-contrast')
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
        <vaadin-button theme="primary contrast">Primary</vaadin-button>
        <vaadin-button theme="secondary contrast">Secondary</vaadin-button>
        <vaadin-button theme="tertiary contrast">Tertiary (avoid)</vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
