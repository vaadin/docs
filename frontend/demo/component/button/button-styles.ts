import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-button theme="primary">Primary</vaadin-button>
        <vaadin-button theme="secondary">Secondary</vaadin-button>
        <vaadin-button theme="tertiary">Tertiary</vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
